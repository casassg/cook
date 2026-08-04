# /// script
# requires-python = ">=3.11"
# dependencies = ["python-frontmatter", "jsonschema", "pyyaml"]
# ///

import json
import re
import sys
from pathlib import Path
from collections import defaultdict

import frontmatter
import jsonschema
from jsonschema import Draft202012Validator

REPO_ROOT = Path(__file__).parent.parent
SCHEMA_PATH = REPO_ROOT / "schema" / "recipe.schema.json"
RECIPES_GLOB = "content/recipes/*/index*.md"

# Keys that must not appear in translation files
STRUCTURAL_KEYS = {"ingredients", "tools", "variants", "portion", "image", "categories", "author", "source"}

# Regex patterns
STEP_RE = re.compile(r"^\s*\d+\.\s+(.*)$")
INLINE_REF_RE = re.compile(r"\[([^\]]*)\]\(([^)]+)\)")
VARIANT_MARKER_RE = re.compile(r"\{variant:\s*([^}]+)\}$")
DURATION_RE = re.compile(r"^(\d+h)?(\d+m)?(\d+s)?$")


def valid_duration(dur: str) -> bool:
    m = DURATION_RE.match(dur)
    return bool(m) and any(m.group(i) for i in (1, 2, 3))


def parse_steps(body: str):
    """Return list of step texts for ordered list items."""
    steps = []
    for line in body.splitlines():
        m = STEP_RE.match(line)
        if m:
            steps.append(m.group(1).strip())
    return steps


def extract_refs(step_text: str):
    """Extract (type, target) tuples and variant marker keys from a step."""
    variant_keys = []
    vm = VARIANT_MARKER_RE.search(step_text)
    if vm:
        variant_keys = vm.group(1).split()
        step_text = step_text[: vm.start()].strip()

    refs = []
    for m in INLINE_REF_RE.finditer(step_text):
        target = m.group(2)
        if target.startswith("i:"):
            refs.append(("i", target[2:]))
        elif target.startswith("tool:"):
            refs.append(("tool", target[5:]))
        elif target.startswith("t:"):
            refs.append(("t", target[2:]))

    return refs, variant_keys


def load_post(path: Path):
    """Parse frontmatter+body; return (meta dict, body str)."""
    post = frontmatter.load(str(path))
    return dict(post.metadata), post.content


def check_i18n_maps(meta: dict, tag: str) -> list[str]:
    """Verify every i18n-map field in the base has an 'en' entry."""
    errors = []

    def check_field(value, location: str):
        if isinstance(value, dict) and not isinstance(value, list):
            if "en" not in value:
                errors.append(f"{tag}: i18n map at '{location}' missing required 'en' key")

    for ing in meta.get("ingredients", []):
        iid = ing.get("id", "?")
        for field in ("item", "note", "group"):
            if field in ing:
                check_field(ing[field], f"ingredients[{iid}].{field}")

    for tool in meta.get("tools", []):
        tid = tool.get("id", "?")
        if "name" in tool:
            check_field(tool["name"], f"tools[{tid}].name")

    for variant in meta.get("variants", []):
        vk = variant.get("key", "?")
        if "name" in variant:
            check_field(variant["name"], f"variants[{vk}].name")

    return errors


def validate_base(path: Path, schema_base: dict) -> tuple[dict, str, list[str]]:
    """Validate a base (EN) file. Returns (meta, body, errors)."""
    tag = str(path.relative_to(REPO_ROOT))
    errors = []

    try:
        meta, body = load_post(path)
    except Exception as e:
        return {}, "", [f"{tag}: failed to parse: {e}"]

    # Schema validation
    validator = Draft202012Validator(schema_base)
    for err in sorted(validator.iter_errors(meta), key=lambda e: list(e.path)):
        loc = ".".join(str(p) for p in err.absolute_path) or "<root>"
        errors.append(f"{tag}: schema error at '{loc}': {err.message}")

    if errors:
        return meta, body, errors

    # i18n map completeness check
    errors.extend(check_i18n_maps(meta, tag))

    ingredient_ids = {ing["id"] for ing in meta.get("ingredients", [])}
    tool_ids = {t["id"] for t in meta.get("tools", [])}
    variant_keys = {v["key"] for v in meta.get("variants", [])}

    # defaultVariant must be a declared key
    if "defaultVariant" in meta and meta["defaultVariant"] not in variant_keys:
        errors.append(
            f"{tag}: defaultVariant '{meta['defaultVariant']}' not in declared variants"
        )

    # onlyForVariation entries must be declared
    for ing in meta.get("ingredients", []):
        for vk in ing.get("onlyForVariation", []):
            if vk not in variant_keys:
                errors.append(
                    f"{tag}: ingredient '{ing['id']}' onlyForVariation key '{vk}' not declared"
                )

    # Body step validation
    steps = parse_steps(body)
    for step_num, step_text in enumerate(steps, 1):
        refs, vm_keys = extract_refs(step_text)
        for ref_type, ref_id in refs:
            if ref_type == "i" and ref_id not in ingredient_ids:
                errors.append(f"{tag}: step {step_num}: ingredient ref 'i:{ref_id}' not declared")
            elif ref_type == "tool" and ref_id not in tool_ids:
                errors.append(f"{tag}: step {step_num}: tool ref 'tool:{ref_id}' not declared")
            elif ref_type == "t" and not valid_duration(ref_id):
                errors.append(f"{tag}: step {step_num}: invalid timer duration 't:{ref_id}'")
        for vk in vm_keys:
            if vk not in variant_keys:
                errors.append(f"{tag}: step {step_num}: variant marker key '{vk}' not declared")

    return meta, body, errors


def validate_translation(
    path: Path,
    schema_translation: dict,
    base_meta: dict,
) -> tuple[dict, str, list[str]]:
    """Validate a translation file. Returns (meta, body, errors)."""
    tag = str(path.relative_to(REPO_ROOT))
    errors = []

    try:
        meta, body = load_post(path)
    except Exception as e:
        return {}, "", [f"{tag}: failed to parse: {e}"]

    # Structural keys must not appear in translation files
    found_structural = STRUCTURAL_KEYS & meta.keys()
    for key in sorted(found_structural):
        errors.append(f"{tag}: translation file must not contain structural key '{key}'")

    # Schema validation
    validator = Draft202012Validator(schema_translation)
    for err in sorted(validator.iter_errors(meta), key=lambda e: list(e.path)):
        loc = ".".join(str(p) for p in err.absolute_path) or "<root>"
        errors.append(f"{tag}: schema error at '{loc}': {err.message}")

    if errors:
        return meta, body, errors

    base_ingredient_ids = {ing["id"] for ing in base_meta.get("ingredients", [])}
    base_tool_ids = {t["id"] for t in base_meta.get("tools", [])}
    base_variant_keys = {v["key"] for v in base_meta.get("variants", [])}

    # Body step validation uses base structure for ref id lookups
    steps = parse_steps(body)
    for step_num, step_text in enumerate(steps, 1):
        refs, vm_keys = extract_refs(step_text)
        for ref_type, ref_id in refs:
            if ref_type == "i" and ref_id not in base_ingredient_ids:
                errors.append(f"{tag}: step {step_num}: ingredient ref 'i:{ref_id}' not in base")
            elif ref_type == "tool" and ref_id not in base_tool_ids:
                errors.append(f"{tag}: step {step_num}: tool ref 'tool:{ref_id}' not in base")
            elif ref_type == "t" and not valid_duration(ref_id):
                errors.append(f"{tag}: step {step_num}: invalid timer duration 't:{ref_id}'")
        for vk in vm_keys:
            if vk not in base_variant_keys:
                errors.append(f"{tag}: step {step_num}: variant marker key '{vk}' not in base")

    return meta, body, errors


def check_step_parity(
    en_path: Path,
    trans_path: Path,
    en_body: str,
    trans_body: str,
) -> list[str]:
    """Check step count and per-step ref/variant parity between EN and a translation."""
    errors = []
    tag = str(trans_path.relative_to(REPO_ROOT))
    lang = trans_path.stem.split(".")[-1]

    en_steps = parse_steps(en_body)
    trans_steps = parse_steps(trans_body)

    if len(trans_steps) != len(en_steps):
        errors.append(
            f"{tag}: step count differs from EN: EN={len(en_steps)} {lang}={len(trans_steps)}"
        )
        return errors

    for step_num, (en_text, trans_text) in enumerate(zip(en_steps, trans_steps), 1):
        en_refs, en_vms = extract_refs(en_text)
        trans_refs, trans_vms = extract_refs(trans_text)

        if trans_refs != en_refs:
            errors.append(
                f"{tag}: step {step_num}: refs differ from EN: EN={en_refs} {lang}={trans_refs}"
            )
        if sorted(trans_vms) != sorted(en_vms):
            errors.append(
                f"{tag}: step {step_num}: variant markers differ from EN: EN={en_vms} {lang}={trans_vms}"
            )

    return errors


def main():
    full_schema = json.loads(SCHEMA_PATH.read_text())
    # Build standalone schemas from $defs, carrying $defs so $ref resolution works
    schema_base = {
        "$schema": full_schema["$schema"],
        "$defs": full_schema["$defs"],
        **full_schema["$defs"]["base"],
    }
    schema_translation = {
        "$schema": full_schema["$schema"],
        "$defs": full_schema["$defs"],
        **full_schema["$defs"]["translation"],
    }

    lang_re = re.compile(r"index\.([a-z]{2,3})\.md$")
    all_files = sorted(REPO_ROOT.glob(RECIPES_GLOB))
    if not all_files:
        print("No recipe files found.")
        sys.exit(0)

    # Group by recipe folder. index.md (no lang suffix) is the EN base.
    folders: dict[Path, dict[str, Path]] = defaultdict(dict)
    for path in all_files:
        if path.name == "index.md":
            folders[path.parent]["en"] = path
        else:
            m = lang_re.match(path.name)
            if m:
                folders[path.parent][m.group(1)] = path

    all_errors: list[str] = []
    total_files = 0

    for folder in sorted(folders):
        langs = folders[folder]
        folder_tag = str(folder.relative_to(REPO_ROOT))

        en_path = langs.get("en")
        if en_path is None:
            all_errors.append(f"{folder_tag}: missing required index.md")
            for lang, path in langs.items():
                total_files += 1
                _, _, errs = validate_translation(path, schema_translation, {})
                all_errors.extend(errs)
            continue

        # Validate base
        total_files += 1
        en_meta, en_body, errs = validate_base(en_path, schema_base)
        all_errors.extend(errs)

        # Validate translations
        for lang, path in sorted(langs.items()):
            if lang == "en":
                continue
            total_files += 1
            _, trans_body, errs = validate_translation(path, schema_translation, en_meta)
            all_errors.extend(errs)
            all_errors.extend(check_step_parity(en_path, path, en_body, trans_body))

    if all_errors:
        print(f"FAILED: {len(all_errors)} error(s) found:\n")
        for e in all_errors:
            print(f"  ✗ {e}")
        sys.exit(1)
    else:
        print(f"OK: validated {total_files} file(s), all passed.")
        sys.exit(0)


if __name__ == "__main__":
    main()
