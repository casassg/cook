---
date: 2026-09-09T18:00:00-05:00
title: "Spicy Chili Oil Wontons"
description: "Homemade wontons boiled and tossed in a sizzling chili oil sauce."
image: main.webp
categories: [mains]
author: [Piya]
source: "https://www.tiktok.com/@piyacooks_/video/7668250651029196064"
portion:
  type: servings
  value: 4
  unit: servings
defaultVariant: pork
variants:
  - key: pork
    name: { en: "Pork (original)", ca: "Porc (original)", es: "Cerdo (original)" }
  - key: lean_beef
    name: { en: "Lean beef", ca: "Vaca magra", es: "Ternera magra" }
groups:
  - key: filling
    name: { en: "Wontons", ca: "Wontons", es: "Wontons" }
  - key: sauce
    name: { en: "Chili oil sauce", ca: "Salsa d'oli de xili", es: "Salsa de aceite de chili" }
tools:
  - id: pot
    icon: 🥘
    name: { en: "large pot", ca: "olla gran", es: "olla grande" }
  - id: bowl
    icon: 🥣
    name: { en: "heatproof bowl", ca: "bol resistent a la calor", es: "bol resistente al calor" }
  - id: pan
    icon: 🍳
    name: { en: "small saucepan", ca: "cazetuela petita", es: "sarten pequeña" }
ingredients:
  - id: ground_pork
    emoji: "🐽"
    group: filling
    amount: 500
    unit: g
    item: { en: "ground pork", ca: "carn de porc picada", es: "carne de cerdo picada" }
    onlyForVariation: [pork]
  - id: lean_ground_beef
    emoji: "🥩"
    group: filling
    amount: 500
    unit: g
    item: { en: "lean ground beef (93/7)", ca: "carn de vaca magra picada (93/7)", es: "carne de ternera magra picada (93/7)" }
    onlyForVariation: [lean_beef]
  - id: scallion
    group: filling
    emoji: "🥕"
    amount: 2
    unit: unit
    item: { en: "scallions", ca: "cebolles tendres", es: "cebolletas" }
  - id: garlic
    group: filling
    emoji: "🧄"
    amount: 2
    unit: clove
    item: { en: "garlic, minced", ca: "all picat", es: "ajo picado" }
  - id: soy_sauce
    emoji: "🥢"
    group: filling
    amount: 2
    unit: tbsp
    item: { en: "soy sauce", ca: "salsa de soja", es: "salsa de soja" }
  - id: oyster_sauce
    emoji: "🦪"
    group: filling
    amount: 1
    unit: tbsp
    item: { en: "oyster sauce", ca: "salsa d'ostres", es: "salsa de ostras" }
  - id: sesame_oil
    emoji: "🪒"
    group: filling
    amount: 1
    unit: tsp
    item: { en: "sesame oil", ca: "oli de sèsam", es: "aceite de sésamo" }
  - id: sugar
    group: filling
    emoji: "🍬"
    amount: 1
    unit: tsp
    item: { en: "sugar", ca: "sucre", es: "azúcar" }
  - id: wontons
    emoji: "🥟"
    group: filling
    amount: 1
    unit: as_needed
    item: { en: "wonton wrappers", ca: "oblees de wonton", es: "obleas de wonton" }
  - id: red_peppers
    group: sauce
    amount: 2
    unit: tbsp
    item: { en: "red pepper flakes", ca: "flocs de xili vermell", es: "hojuelas de chile rojo" }
    emoji: "🌶️"
  - id: neutral_oil
    group: sauce
    amount: 90
    unit: ml
    item: { en: "neutral oil, heated until hot", ca: "oli neutre, escalfat fins a calent", es: "aceite neutro, calentado hasta estar caliente" }
    emoji: "🫗"
  - id: sauce_soy
    group: sauce
    amount: 2
    unit: tbsp
    item: { en: "soy sauce", ca: "salsa de soja", es: "salsa de soja" }
    emoji: "🥢"
  - id: rice_vinegar
    group: sauce
    amount: 1
    unit: tbsp
    item: { en: "rice vinegar", ca: "vinagre d'arròs", es: "vinagre de arroz" }
    emoji: "🍚"
  - id: sauce_garlic
    group: sauce
    amount: 2
    unit: clove
    item: { en: "garlic, minced", ca: "all picat", es: "ajo picado" }
    emoji: "🧄"
  - id: sauce_sugar
    group: sauce
    amount: 1
    unit: tsp
    item: { en: "sugar", ca: "sucre", es: "azúcar" }
    emoji: "🍬"
  - id: chinese_five_spice
    group: sauce
    amount: 0.5
    unit: tsp
    item: { en: "Chinese five-spice powder", ca: "cinc-espècies xinesa en pols", es: "cinco especias chinas en polvo" }
    emoji: "🌏"
  - id: topping_scallions
    emoji: "🥕"
    amount: 1
    unit: to_taste
    item: { en: "scallions", ca: "cebolles tendres", es: "cebolletas" }
  - id: sesame_seeds
    emoji: "🌰"
    amount: 1
    unit: to_taste
    item: { en: "sesame seeds", ca: "llavors de sèsam", es: "semillas de sésamo" }
---

1. Chop the [scallions](i:scallion) and [garlic](i:garlic) for the filling.
2. Mix the [meat](i:ground_pork) with [scallions](i:scallion), [garlic](i:garlic), [soy](i:soy_sauce), [oyster](i:oyster_sauce), [sesame oil](i:sesame_oil), and [sugar](i:sugar). {variant: pork}
2. Mix the [lean beef](i:lean_ground_beef) with [scallions](i:scallion), [garlic](i:garlic), [soy](i:soy_sauce), [oyster](i:oyster_sauce), [sesame oil](i:sesame_oil), and [sugar](i:sugar). {variant: lean_beef}
3. Place a spoonful of filling on each [wonton wrapper](i:wontons) and fold tightly (see wrapper pack for folding style).
4. Boil the wontons in a [large pot](tool:pot) of water for [4-5 min](t:5m), until they float to the surface and are fully cooked.
5. Meanwhile, place the [red pepper flakes](i:red_peppers), [garlic](i:sauce_garlic), [sugar](i:sauce_sugar), and [five-spice](i:chinese_five_spice) in a [heatproof bowl](tool:bowl).
6. Heat the [neutral oil](i:neutral_oil) in a [small pan](tool:pan) until hot and pour it over the dry mix - listen for the sizzle.
7. Stir in the [soy](i:sauce_soy) and [rice vinegar](i:rice_vinegar) into the chili oil.
8. Drain [wontons](i:wontons), toss in the chili oil, and top with [scallions](i:topping_scallions) and [sesame seeds](i:sesame_seeds).
