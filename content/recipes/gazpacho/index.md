---
title: "Gazpacho"
description: "Andalusian cold soup. Best served well chilled."
image: main.webp
categories: [mains]
author: [gerard]
portion:
  type: servings
  value: 4
  unit: servings
defaultVariant: bread
# Canonical structure + all name/note translations live here. Translation files
# (index.ca.md, index.es.md) only carry title, description and translated steps.
variants:
  - key: bread
    name: { en: "With bread (creamy)", ca: "Amb pa (cremós)", es: "Con pan (cremoso)" }
  - key: light
    name: { en: "Light (no bread)", ca: "Lleuger (sense pa)", es: "Ligero (sin pan)" }
tools:
  - id: blender
    icon: "⚙️"
    name:
      en: "food processor or powerful hand blender"
      ca: "processadora d'aliments o batedora de mà potent"
      es: "procesadora de alimentos o batidora de mano potente"
  - id: bowl
    icon: "🥣"
    name: { en: "bowl", ca: "bol", es: "bol" }
ingredients:
  - id: tomato
    amount: 0.5
    unit: kg
    item: { en: "tomato", ca: "tomàquet", es: "tomate" }
    note:
      en: "ripe, peeled (canned whole peeled tomatoes work too)"
      ca: "madurs, pelats (una llauna de tomàquets enters pelats també serveix)"
      es: "maduros, pelados (una lata de tomates enteros pelados también sirve)"
  - id: cucumber
    amount: 0.5
    unit: unit
    item: { en: "cucumber", ca: "cogombre", es: "pepino" }
    note: { en: "peeled and cut into large pieces", ca: "pelat i tallat a trossos grans", es: "pelado y cortado en trozos grandes" }
  - id: pepper
    amount: 0.5
    unit: unit
    item: { en: "green pepper", ca: "pebrot verd", es: "pimiento verde" }
    note: { en: "cut into large pieces", ca: "tallat a trossos grans", es: "cortado en trozos grandes" }
  - id: garlic
    amount: 2
    unit: clove
    item: { en: "garlic", ca: "all", es: "ajo" }
    note: { en: "germ removed", ca: "sense el germen", es: "sin el germen" }
  - id: bread
    amount: 1
    unit: slices
    item: { en: "bread", ca: "pa", es: "pan" }
    note: { en: "soaked in water", ca: "mullat en aigua", es: "mojado en agua" }
    onlyForVariation: [bread]
  - id: water
    amount: 150
    unit: ml
    item: { en: "cold water", ca: "aigua freda", es: "agua fría" }
    note:
      en: "to loosen, add gradually"
      ca: "per alleugerir, afegir a poc a poc"
      es: "para aligerar, añadir poco a poco"
    onlyForVariation: [light]
  - id: oil
    amount: 0
    unit: as_needed
    item: { en: "olive oil", ca: "oli d'oliva", es: "aceite de oliva" }
    note:
      en: "added slowly to emulsify"
      ca: "afegit a poc a poc per emulsionar"
      es: "añadido poco a poco para emulsionar"
  - id: vinegar
    amount: 0
    unit: to_taste
    item: { en: "white vinegar", ca: "vinagre blanc", es: "vinagre blanco" }
  - id: salt
    amount: 0
    unit: to_taste
    item: { en: "salt", ca: "sal", es: "sal" }
---

1. Remove the germ from the [garlic](i:garlic). Peel the [cucumber](i:cucumber) and cut it and the [pepper](i:pepper) into large pieces. Quarter the [tomatoes](i:tomato).
2. Soak the [bread](i:bread) with water until soft. {variant: bread}
3. Put everything except the oil in a [blender](tool:blender): [tomatoes](i:tomato), [cucumber](i:cucumber), [pepper](i:pepper), [garlic](i:garlic), [vinegar](i:vinegar), [salt](i:salt) and the [soaked bread](i:bread). Blend until smooth for [2 minutes](t:2m).
4. With the blender running low, drizzle in the [olive oil](i:oil) in a thin stream, like making aioli, until silky and emulsified for [1 minute](t:1m).
5. Taste, adjust [salt](i:salt) and [vinegar](i:vinegar), serve well chilled.
