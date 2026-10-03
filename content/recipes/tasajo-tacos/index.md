---
date: 2026-10-02T18:00:00-05:00
title: "Tasajo Tacos"
description: "Honduran-style wafer-thin salted beef, seared for barely a minute a side, in corn tortillas with chismol and dressed cabbage."
image: main.webp
categories: [mains]
author: [gerard]
portion:
  type: servings
  value: 4
  unit: servings
defaultVariant: milanesa
variants:
  - key: milanesa
    name:
      en: "Fresh, milanesa thin"
      ca: "Fresc, tall de milanesa"
      es: "Fresco, corte milanesa"
  - key: cecina
    name:
      en: "Cured cecina or tasajo"
      ca: "Cecina o tasajo curat"
      es: "Cecina o tasajo curado"
groups:
  - key: adobo
    name:
      en: "Adobo"
      ca: "Adob"
      es: "Adobo"
  - key: toppings
    name:
      en: "Toppings"
      ca: "Guarnicions"
      es: "Guarniciones"
tools:
  - id: griddle
    icon: "🍳"
    name:
      en: "cast-iron griddle or comal (or a very hot steel pan)"
      ca: "planxa de ferro colat o comal (o una paella d'acer ben calenta)"
      es: "plancha de hierro fundido o comal (o una sartén de acero muy caliente)"
  - id: tongs
    icon: "🥢"
    name:
      en: "tongs"
      ca: "pinces"
      es: "pinzas"
ingredients:
  - id: beef
    emoji: "🥩"
    amount: 500
    unit: g
    item:
      en: "wafer-thin cut top round (milanesa cut)"
      ca: "pulpa de vedella tallada fi (tall milanesa)"
      es: "pulpa de res cortada fina (corte milanesa)"
    note:
      en: "Ask the butcher to slice it 2-3 mm thick. Round is the lean cut used for tasajo; sirloin also works but carries twice the fat"
      ca: "Demana al carnisser que el talli de 2-3 mm. El rodó és el tall mag que es fa servir per al tasajo; el sirloin també serveix però té el doble de greix"
      es: "Pide al carnicero que lo corte de 2-3 mm. El redondo es el corte magro que se usa para el tasajo; el solomillo también sirve pero tiene el doble de grasa"
    onlyForVariation: [milanesa]
  - id: cecina
    emoji: "🥩"
    amount: 500
    unit: g
    item:
      en: "cecina or tasajo (cured salted beef)"
      ca: "cecina o tasajo (vedella salada i curata)"
      es: "cecina o tasajo (carne de res salada y curada)"
    note:
      en: "Sold thin-sliced at Latin markets; it is already salty, so skip the salt rest. Brand varies a lot in sodium (700-1,000 mg per 100 g)"
      ca: "Es ven tallat fi als mercats llatins; ja és salat, així que salta el repòs amb sal. La marca varia molt en sodi (700-1.000 mg per 100 g)"
      es: "Se vende cortado fino en los mercados latinos; ya está salado, así que sáltate el reposo con sal. La marca varía mucho en sodio (700-1.000 mg por 100 g)"
    onlyForVariation: [cecina]
  - id: salt
    group: adobo
    amount: 1
    unit: tsp
    item:
      en: "coarse salt"
      ca: "sal gruixuda"
      es: "sal gruesa"
    note:
      en: "The dry salt rest is what gives the tasajo character; do not skip it"
      ca: "El repòs amb sal és el que dona el caràcter de tasajo; no te'l saltis"
      es: "El reposo con sal es lo que da el carácter de tasajo; no te lo saltes"
    onlyForVariation: [milanesa]
  - id: garlic
    group: adobo
    amount: 2
    unit: clove
    item:
      en: "garlic"
      ca: "all"
      es: "ajo"
  - id: cumin
    emoji: "🌿"
    group: adobo
    amount: 1
    unit: tsp
    item:
      en: "ground cumin"
      ca: "comí mòlt"
      es: "comino molido"
    note:
      en: "The spice that makes it read as street taco rather than plain steak"
      ca: "L'espècia que fa que soni a taco de carrer i no a bistec"
      es: "La especia que hace que sepa a taco de calle y no a bistec"
  - id: black_pepper
    emoji: "🧂"
    group: adobo
    amount: 0.5
    unit: tsp
    item:
      en: "ground black pepper"
      ca: "pebre negre mòlt"
      es: "pimienta negra molida"
  - id: oregano
    emoji: "🌿"
    group: adobo
    amount: 1
    unit: tsp
    item:
      en: "dried oregano"
      ca: "orenga seca"
      es: "orégano seco"
  - id: sour_orange
    emoji: "🍊"
    group: adobo
    amount: 60
    unit: ml
    item:
      en: "sour orange juice (naranja agria)"
      ca: "suc de taronja agria"
      es: "jugo de naranja agria"
    note:
      en: "If you cannot find it, use the juice of 1 orange mixed with the juice of 1 lime"
      ca: "Si no en trobes, fes servir el suc d'una taronja barrejat amb el d'una llimona"
      es: "Si no la encuentras, usa el jugo de una naranja mezclado con el de un limón"
  - id: worcestershire_sauce
    emoji: "🍶"
    group: adobo
    amount: 1
    unit: tbsp
    item:
      en: "Worcestershire sauce"
      ca: "salsa Worcestershire (salsa anglesa)"
      es: "salsa Worcestershire (salsa inglesa)"
    note:
      en: "Lea & Perrins carries no soy; check the label on other brands, some add it"
      ca: "Lea & Perrins no porta soja; revisa l'etiqueta d'altres marques, que algunes en porten"
      es: "Lea & Perrins no lleva soja; revisa la etiqueta de otras marcas, que algunas la llevan"
  - id: tomato
    group: toppings
    amount: 2
    unit: unit
    item:
      en: "tomatoes"
      ca: "tomàquets"
      es: "tomates"
  - id: onion
    group: toppings
    amount: 0.5
    unit: unit
    item:
      en: "white onion"
      ca: "ceba blanca"
      es: "cebolla blanca"
  - id: green_pepper
    emoji: "🫑"
    group: toppings
    amount: 1
    unit: unit
    item:
      en: "green bell pepper"
      ca: "pebrot verd"
      es: "pimiento verde"
  - id: cilantro
    emoji: "🌿"
    group: toppings
    amount: 0
    unit: as_needed
    item:
      en: "fresh cilantro"
      ca: "coriandre fresc"
      es: "cilantro fresco"
  - id: lime
    emoji: "🍋"
    group: toppings
    amount: 2
    unit: unit
    item:
      en: "limes"
      ca: "llimones"
      es: "limones"
  - id: cabbage
    emoji: "🥬"
    group: toppings
    amount: 200
    unit: g
    item:
      en: "green cabbage"
      ca: "col verda"
      es: "repollo"
  - id: corn_tortillas
    emoji: "🫓"
    group: toppings
    amount: 12
    unit: unit
    item:
      en: "corn tortillas"
      ca: "tortilles de blat de moro"
      es: "tortillas de maíz"
    note:
      en: "12 is 3 per person; corn keeps the day lighter than flour"
      ca: "12 són 3 per persona; el blat de moro és més lleuger que la farina"
      es: "12 son 3 por persona; el maíz es más ligero que la harina"
  - id: salsa
    emoji: "🌶️"
    group: toppings
    amount: 0
    unit: to_taste
    item:
      en: "salsa verde or roja"
      ca: "salsa verda o vermella"
      es: "salsa verde o roja"
---

1. Salt the [thin-cut top round](i:beef) on both sides with the [coarse salt](i:salt) and rest it covered in the fridge. [30-60 min](t:30m) {variant: milanesa}
2. Take the [cecina](i:cecina) out of the fridge; it is already salted and cured, so add no salt to it. {variant: cecina}
3. Pat the slices completely dry on both sides with paper towels.
4. Mash the [garlic](i:garlic) with the [cumin](i:cumin), the [black pepper](i:black_pepper) and the [oregano](i:oregano) into a paste.
5. Stir the [sour orange juice](i:sour_orange) and the [Worcestershire sauce](i:worcestershire_sauce) into the paste.
6. Coat the slices with the adobo and leave them to take the flavour. [20-30 min](t:20m)
7. Dice the [tomatoes](i:tomato), the [onion](i:onion) and the [green pepper](i:green_pepper), chop the [cilantro](i:cilantro) and mix it all with the juice of one [lime](i:lime).
8. Shred the [cabbage](i:cabbage) finely and dress it with the juice of the other [lime](i:lime).
9. Heat the [griddle](tool:griddle) until it just starts to smoke.
10. Sear the slices in a single layer, 30 to 60 seconds per side, turning them with the [tongs](tool:tongs); they should brown, not cook through.
11. Warm the [corn tortillas](i:corn_tortillas) on the [griddle](tool:griddle) and keep them wrapped in a cloth.
12. Serve the meat in the tortillas with the chismol, the cabbage and the [salsa](i:salsa).
