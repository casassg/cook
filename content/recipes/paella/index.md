---
date: 2026-08-08T12:00:00-05:00
title: "Paella"
description: "Recipe from my mom: chicken wings, squid and mussels over a sofrito with short-grain rice."
image: main.webp
categories: [mains]
author: [gerard]
defaultVariant: mixta
variants:
  - key: mixta
    name:
      en: "Mixta"
      ca: "Mixta"
      es: "Mixta"
portion:
  type: servings
  value: 4
  unit: servings
tools:
  - id: paella_pan
    icon: "🍳"
    name: { en: "paella pan", ca: "paella", es: "paellera" }
subRecipes:
  - id: sofrito
    recipe: /recipes/sofrito
    servings: 4
  - id: musclos
    recipe: /recipes/musclos-al-vapor
    servings: 2
groups:
  - key: protein
    name: { en: "Protein", ca: "Proteïna", es: "Proteína" }
  - key: seasoning
    name: { en: "Seasoning", ca: "Condiments", es: "Condimentos" }
  - key: base
    name: { en: "Base", ca: "Base", es: "Base" }
  - key: serving
    name: { en: "For serving", ca: "Per servir", es: "Para servir" }
ingredients:
  - id: chicken_wings
    emoji: "🍗"
    amount: 450
    unit: g
    group: protein
    item: { en: "chicken wings", ca: "aletes de pollastre", es: "alitas de pollo" }
    note:
      en: "or small-cut pork ribs"
      ca: "o costella de porc tallada petita"
      es: "o costillas de cerdo cortadas pequeñas"
  - id: paprika
    emoji: "🌶️"
    amount: 1
    unit: tsp
    group: seasoning
    item: { en: "paprika", ca: "pebre vermell", es: "pimentón" }
  - id: garlic_powder
    emoji: "🧄"
    amount: 1
    unit: tsp
    group: seasoning
    item: { en: "garlic powder", ca: "all en pols", es: "ajo en polvo" }
  - id: squid
    amount: 225
    unit: g
    group: protein
    item: { en: "squid", ca: "sípia o calamars", es: "sepia o calamares" }
    note:
      en: "tentacles or body, whichever you prefer, cut in squares (optional)"
      ca: "potes o cos, el que prefereixis, tallats a quadrats (opcional)"
      es: "tentáculos o cuerpo, lo que prefieras, cortados en cuadrados (opcional)"
  - id: rice
    amount: 600
    unit: g
    group: base
    item: { en: "paella rice", ca: "arròs per a paella", es: "arroz para paella" }
    note:
      en: "the broth ratio depends on the rice: Spanish extra or arborio take about 2:1 (twice as much broth), bomba can take 3-4:1 depending on the brand"
      ca: "la proporció de caldo depèn de l'arròs: l'extra o l'arborio demanen uns 2:1 (el doble de caldo), el bomba pot demanar 3-4:1 segons la marca"
      es: "la proporción de caldo depende del arroz: el extra o el arborio piden unos 2:1 (el doble de caldo), el bomba puede pedir 3-4:1 según la marca"
  - id: stock
    emoji: "🍲"
    amount: 1.5
    unit: l
    group: base
    item: { en: "stock", ca: "caldo", es: "caldo" }
    note:
      en: "chicken broth, ideally bone broth for better flavor; you can also use the water from steaming the mussels, or fish broth"
      ca: "caldo de pollastre, idealment d'ossos, que dóna més gust; també pots fer servir l'aigua de coure els musclos o caldo de peix"
      es: "caldo de pollo, idealmente de huesos, que da más sabor; también puedes usar el agua de cocer los mejillones o caldo de pescado"

  - id: saffron
    emoji: "🌼"
    amount: 0
    unit: to_taste
    group: seasoning
    item: { en: "saffron", ca: "safrà", es: "azafrán" }
    note:
      en: "optional"
      ca: "opcional"
      es: "opcional"
  - id: salt
    amount: 0
    unit: to_taste
    group: seasoning
    item: { en: "salt", ca: "sal", es: "sal" }
  - id: black_pepper
    emoji: "🧂"
    amount: 0
    unit: to_taste
    group: seasoning
    item: { en: "black pepper", ca: "pebre negre", es: "pimienta negra" }
  - id: lemon
    amount: 1
    unit: unit
    group: serving
    item: { en: "lemon", ca: "llimona", es: "limón" }
    note:
      en: "optional, for serving, cut in wedges"
      ca: "opcional, per servir, tallada a quarts"
      es: "opcional, para servir, cortada en gajos"
  - id: aioli
    emoji: "🧄"
    amount: 0
    unit: as_needed
    group: serving
    item: { en: "aioli", ca: "allioli", es: "alioli" }
    note:
      en: "optional, for serving"
      ca: "opcional, per servir"
      es: "opcional, para servir"
---

1. Make the [sofrito](sub:sofrito); it can be done in a separate pan.
2. While making the sofrito, season the [chicken wings](i:chicken_wings) with [paprika](i:paprika), [salt](i:salt), [black pepper](i:black_pepper) and [garlic powder](i:garlic_powder), then leave them to marinate in the fridge for a little while, covered.
3. Add the seasoned [chicken wings](i:chicken_wings) (or small-cut pork ribs) to the [paella pan](tool:paella_pan) and cook them for about [5 min](t:5m) per side, until they look golden and juicy on both sides, then take them out and set them aside. When you start the chicken, also put the [stock](i:stock) on to heat.
4. Cut the [squid](i:squid) into small pieces and set it aside.
5. Steam the [mussels](sub:musclos).
6. Add the sofrito to the pan, lower the heat a bit so it doesn't burn, and fry it a little more (it should already have enough oil).
7. Add the [squid](i:squid) and cook it for about [3 min](t:3m), then add some shelled [mussels](i:musclos__mussels).
8. Add the [rice](i:rice) and toast it for about [2 min](t:2m), letting it absorb the juices. When you add it, the rice should look red: if it doesn't, you need more sofrito.
9. Add the hot [stock](i:stock) (it must be hot when it goes in) and return the [chicken wings](i:chicken_wings) to the pan. Mix the broth with the sofrito and taste it: it needs to be salty, so add [salt](i:salt) if there's not enough, and season with [black pepper](i:black_pepper).
10. Start on strong heat; when the broth comes to a boil, lower it to a gentle simmer (chup chup) and leave it, tilting and moving the pan around so it cooks evenly, with the [saffron](i:saffron) if you're using it. Don't stir once the rice starts absorbing the liquid, or it will come out wrong.
11. When the rice starts showing through the broth, taste it: if it's not done yet, add a little more boiling [stock](i:stock) (salted water only as a last resort). When the broth is mostly absorbed, raise the heat a little for about a minute to create a bit of socarrat at the bottom, then turn off the heat and let it rest for about [5 min](t:5m), finishing on its own heat so it doesn't overcook.
12. Serve: arrange the whole mussels and any extra [chicken wings](i:chicken_wings) on top in a nice formation, with [lemon](i:lemon) wedges and [aioli](i:aioli) on the side.
