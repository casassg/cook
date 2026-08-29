---
date: 2026-08-29T12:00:00-05:00
title: "Risotto"
description: "Creamy porcini mushroom risotto with Parmesan broth. A classic stovetop method plus an Instant Pot alternative — default is the classic."
image: main.webp
categories: [mains]
author: [GialloZafferano]
source: "https://www.giallozafferano.com/recipes/porcini-mushroom-risotto.html"
defaultVariant: classic
variants:
  - key: classic
    name: { en: "Classic (stovetop)", ca: "Clàssic (fogons)", es: "Clásico (fogones)" }
  - key: instant_pot
    name: { en: "Instant Pot", ca: "Olla de pressió", es: "Olla a presión" }
portion:
  type: servings
  value: 4
  unit: servings
subRecipes:
  - id: parmesan_broth
    recipe: /recipes/parmesan-broth
    servings: 4
tools:
  - id: saucepan
    icon: "🍲"
    name: { en: "heavy-bottomed saucepan", ca: "cassola de fons gruixut", es: "cacerola de fondo grueso" }
  - id: wooden_spoon
    icon: "🥄"
    name: { en: "wooden spoon", ca: "cullera de fusta", es: "cuchara de madera" }
  - id: instant_pot
    icon: "🍚"
    name: { en: "pressure cooker", ca: "olla de pressió", es: "olla a presión" }
    note: { en: "Instant Pot or similar", ca: "Instant Pot o similar", es: "Instant Pot o similar" }
groups:
  - key: base
    name: { en: "Base", ca: "Base", es: "Base" }
  - key: mushrooms
    name: { en: "Mushrooms", ca: "Bolets", es: "Setas" }
  - key: flavor
    name: { en: "Aromatics", ca: "Aromes", es: "Aromáticos" }
  - key: finish
    name: { en: "To finish", ca: "Per acabar", es: "Para terminar" }
ingredients:
  - id: rice
    emoji: "🍚"
    amount: 320
    unit: g
    group: base
    item: { en: "Carnaroli rice (or Arborio)", ca: "arròs Carnaroli (o Arborio)", es: "arroz Carnaroli (o Arborio)" }
    note:
      en: "about 1¾ cup"
      ca: "unes 1¾ tasses"
      es: "unas 1¾ tazas"
  - id: olive_oil
    emoji: "🫒"
    amount: 15
    unit: ml
    group: base
    item: { en: "extra-virgin olive oil", ca: "oli d'oliva verge extra", es: "aceite de oliva virgen extra" }
  - id: butter
    emoji: "🧈"
    amount: 30
    unit: g
    group: base
    item: { en: "butter", ca: "mantega", es: "mantequilla" }
    note:
      en: "about 2 tbsp, divided"
      ca: "unes 2 cullerades, repartida"
      es: "unas 2 cucharadas, dividida"
  - id: porcini
    emoji: "🍄"
    amount: 400
    unit: g
    group: mushrooms
    item: { en: "porcini mushrooms", ca: "bolets porcini", es: "setas porcini" }
    note:
      en: "cleaned and sliced 7-8 mm thick; save the trimmed stalks for the Parmesan broth"
      ca: "nets i llescats de 7-8 mm; guarda les tiges retallades per al brou de parmesà"
      es: "limpias y cortadas en láminas de 7-8 mm; guarda los tallos recortados para el caldo de parmesano"
  - id: onion
    amount: 1
    unit: unit
    group: flavor
    item: { en: "yellow onion", ca: "ceba groga", es: "cebolla amarilla" }
    note: { en: "finely chopped", ca: "ben picada", es: "bien picada" }
  - id: garlic
    amount: 1
    unit: clove
    group: flavor
    item: { en: "garlic clove", ca: "all", es: "diente de ajo" }
    note: { en: "crushed", ca: "aixafat", es: "machacado" }
  - id: white_wine
    emoji: "🍷"
    amount: 60
    unit: ml
    group: flavor
    item: { en: "dry white wine", ca: "vi blanc sec", es: "vino blanco seco" }
    onlyForVariation: [instant_pot]
  - id: parmesan
    emoji: "🧀"
    amount: 30
    unit: g
    group: finish
    item: { en: "Parmesan", ca: "parmesà", es: "parmesano" }
    note:
      en: "freshly grated, plus more for serving"
      ca: "acabat de ratllar, i més per servir"
      es: "recién rallado, y más para servir"
  - id: parsley
    emoji: "🌿"
    amount: 0
    unit: as_needed
    group: finish
    item: { en: "fresh parsley", ca: "julivert fresc", es: "perejil fresco" }
    note: { en: "chopped, to garnish", ca: "picat, per guarnir", es: "picado, para decorar" }
  - id: salt
    emoji: "🧂"
    amount: 0
    unit: to_taste
    group: finish
    item: { en: "salt", ca: "sal", es: "sal" }
  - id: black_pepper
    emoji: "🧂"
    amount: 0
    unit: to_taste
    group: finish
    item: { en: "black pepper", ca: "pebre negre", es: "pimienta negra" }
---

1. Make the [Parmesan broth](sub:parmesan_broth) and keep it warm. Clean the [porcini](i:porcini): trim the base, scrape off any soil, wipe with a damp cloth, then slice about 7-8 mm thick, keeping the whole section intact where possible. Set the trimmed stalks aside for the broth.

2. Heat the [olive oil](i:olive_oil) in a [saucepan](tool:saucepan) and briefly fry the crushed [garlic](i:garlic). Turn up the heat, add the [porcini](i:porcini) and sauté for about [10 min](t:10m) until they brown, then season with [salt](i:salt) and [black pepper](i:black_pepper) and remove from the heat. {variant: classic}

3. Meanwhile, melt half the [butter](i:butter) in the [saucepan](tool:saucepan), add the [onion](i:onion) and cook over low heat for 10-15 minutes, adding a ladle of broth if it dries out. When the onion has softened, add the [rice](i:rice) and toast for a couple of minutes. {variant: classic}

4. When the rice has become almost translucent, cook it by adding one ladle of broth at a time, stirring frequently with the [wooden spoon](tool:wooden_spoon). Keep the bubbles constant and the heat moderate. A few minutes before the rice is al dente, add back the [porcini](i:porcini) and finish cooking, adjusting the [salt](i:salt) and [black pepper](i:black_pepper) if necessary. {variant: classic}

5. When cooked, stir the risotto over low heat, adding the remaining [butter](i:butter) and the grated [parmesan](i:parmesan), and mix well. If it's too dry, add another ladle of broth. Garnish with [parsley](i:parsley) and serve. {variant: classic}

6. Heat the [olive oil](i:olive_oil) in the [pressure cooker](tool:instant_pot) on sauté mode and cook the [garlic](i:garlic) and the sliced [porcini](i:porcini) until browned, then set the mushrooms aside. {variant: instant_pot}

7. Still on sauté mode, melt the [butter](i:butter) and cook the [onion](i:onion) until soft. Add the [rice](i:rice) and stir until lightly toasted, about 2 minutes. {variant: instant_pot}

8. Deglaze with the [white wine](i:white_wine), scraping up any browned bits. Add the broth and the browned [porcini](i:porcini), and stir. {variant: instant_pot}

9. Close the lid, set to high pressure and cook for [5 min](t:5m). Let the pressure release naturally for [10 min](t:10m), then open the lid. {variant: instant_pot}

10. Stir in the [parmesan](i:parmesan) and season with [salt](i:salt) and [black pepper](i:black_pepper) to taste. Garnish with [parsley](i:parsley) and serve. {variant: instant_pot}
