---
date: 2026-08-26T12:00:00-05:00
title: "Risotto"
description: "Creamy mushroom risotto with portobello and shiitake sautéed to a noisette point, loosened with a Parmesan broth. Made in a wok on the stove; the broth is a separate recipe that also makes a fine base."
image: main.webp
categories: [mains]
author: [gerard]
portion:
  type: servings
  value: 4
  unit: servings
subRecipes:
  - id: parmesan_broth
    recipe: /recipes/parmesan-broth
    servings: 4
tools:
  - id: wok
    icon: "🍳"
    name: { en: "wok (or large saucepan)", ca: "wok (o cassola gran)", es: "wok (o cacerola grande)" }
    note: { en: "a wok makes it easier to fit plenty and to stir", ca: "un wok facilita que hi càpiga molt i remenar-hi bé", es: "un wok facilita que quepa mucho y remover bien" }
  - id: wooden_spoon
    icon: "🥄"
    name: { en: "wooden spoon", ca: "cullera de fusta", es: "cuchara de madera" }
groups:
  - key: base
    name: { en: "Base", ca: "Base", es: "Base" }
  - key: mushrooms
    name: { en: "Mushrooms", ca: "Bolets", es: "Setas" }
  - key: aromatics
    name: { en: "Aromatics", ca: "Aromes", es: "Aromáticos" }
  - key: finish
    name: { en: "To finish", ca: "Per acabar", es: "Para terminar" }
ingredients:
  - id: rice
    emoji: "🍚"
    amount: 400
    unit: g
    group: base
    item: { en: "Arborio rice", ca: "arròs Arborio", es: "arroz Arborio" }
    note:
      en: "2 cups; Arborio is the easiest to find and needs about twice its volume in broth"
      ca: "2 tasses; l'Arborio és el més fàcil de trobar i necessita unes 2 vegades el seu volum en brou"
      es: "2 tazas; el Arborio es el más fácil de encontrar y necesita unas 2 veces su volumen en caldo"
  - id: portobello
    emoji: "🍄"
    amount: 2
    unit: unit
    group: mushrooms
    item: { en: "portobello mushrooms", ca: "bolets portobello", es: "setas portobello" }
    note:
      en: "large, cleaned; trim the stems and scrape the gills — save them for the Parmesan broth — then dice the caps"
      ca: "grans, nets; treu les tiges i raspa els llistons — guarda'ls per al brou de parmesà — i talla els barrets a daus"
      es: "grandes, limpias; quita los tallos y raspa las laminillas — guárdalos para el caldo de parmesano — y corta los sombreros en dados"
  - id: shiitake
    emoji: "🍄"
    amount: 500
    unit: g
    group: mushrooms
    item: { en: "shiitake mushrooms", ca: "bolets shiitake", es: "setas shiitake" }
    note:
      en: "cleaned; remove the stalks — save them for the Parmesan broth — then dice the caps"
      ca: "nets; treu les tiges — guarda-les per al brou de parmesà — i talla els barrets a daus"
      es: "limpias; quita los tallos — guárdalos para el caldo de parmesano — y corta los sombreros en dados"
  - id: olive_oil
    emoji: "🫒"
    amount: 45
    unit: ml
    group: mushrooms
    item: { en: "extra-virgin olive oil", ca: "oli d'oliva verge extra", es: "aceite de oliva virgen extra" }
    note:
      en: "generous — about 3 tbsp; enough to coat and fry the mushrooms"
      ca: "generós — unes 3 cullerades; prou per cobrir i fregir els bolets"
      es: "generoso — unas 3 cucharadas; suficiente para cubrir y freír las setas"
  - id: shallots
    emoji: "🧅"
    amount: 2
    unit: unit
    group: aromatics
    item: { en: "shallots", ca: "ximbombes", es: "chalotas" }
    note: { en: "finely diced", ca: "a daus ben petits", es: "en dados pequeños" }
  - id: garlic
    emoji: "🧄"
    amount: 1
    unit: clove
    group: aromatics
    item: { en: "garlic clove", ca: "all", es: "diente de ajo" }
    note: { en: "finely diced", ca: "a daus ben petits", es: "en dados pequeños" }
  - id: white_wine
    emoji: "🍷"
    amount: 120
    unit: ml
    group: aromatics
    item: { en: "dry white wine", ca: "vi blanc sec", es: "vino blanco seco" }
    note:
      en: "1/2 cup; any white wine you normally use for cooking"
      ca: "1/2 tassa; qualsevol vi blanc que facis servir per cuinar"
      es: "1/2 taza; cualquier vino blanco que uses para cocinar"
  - id: butter
    emoji: "🧈"
    amount: 15
    unit: g
    group: finish
    item: { en: "butter", ca: "mantega", es: "mantequilla" }
    note:
      en: "1 tbsp, no more than that"
      ca: "1 cullerada, no més que això"
      es: "1 cucharada, no más que eso"
  - id: parmesan
    emoji: "🧀"
    amount: 50
    unit: g
    group: finish
    item: { en: "Parmesan", ca: "parmesà", es: "parmesano" }
    note:
      en: "1/2 cup grated, to taste; add more if you like, plus a little for serving"
      ca: "1/2 tassa ratllat, al gust; posa'n més si te n'agrada, i una mica per servir"
      es: "1/2 taza rallado, al gusto; pon más si te gusta, y un poco para servir"
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
  - id: white_pepper
    emoji: "🧂"
    amount: 0
    unit: to_taste
    group: finish
    item: { en: "white pepper", ca: "pebre blanc", es: "pimienta blanca" }
    note:
      en: "optional; brings out the nutty noisette flavor of the mushrooms"
      ca: "opcional; accentua el gust de nou (noisette) dels bolets"
      es: "opcional; resalta el sabor a nuez (noisette) de las setas"
  - id: chives
    emoji: "🌿"
    amount: 0
    unit: as_needed
    group: finish
    item: { en: "chives, green onion or fresh parsley", ca: "cibulet, ceba tendra o julivert fresc", es: "ciboulette, cebollino o perejil fresco" }
    note: { en: "chopped, to garnish", ca: "picat, per guarnir", es: "picado, para decorar" }
---

1. Make the [Parmesan broth](sub:parmesan_broth) and keep it warm. Clean the [portobello](i:portobello) and [shiitake](i:shiitake): trim the stems and, for the portobello, scrape away the gills. Put the trimmings aside for the broth, then dice the caps.

2. Heat the [olive oil](i:olive_oil) in the [wok](tool:wok) over medium heat. Add the diced [mushrooms](i:portobello) and sauté, stirring now and then, for about 10 to 20 minutes — it depends on how much you put in. Cook until they have given up most of their water, are tender and lightly browned to the noisette point. Season with [white pepper](i:white_pepper) or [black pepper](i:black_pepper). Remove the mushrooms from the wok and set aside.

3. In the same [wok](tool:wok), sauté the [shallots](i:shallots) and [garlic](i:garlic) until they turn translucent and pale-yellow, about 1 to 2 minutes, depending on how hot the pan is. Add the [rice](i:rice) and toast it with the shallots for a couple of minutes, stirring with the [wooden spoon](tool:wooden_spoon), until it is lightly toasted and smells nutty.

4. Pour in the [white wine](i:white_wine) and let it be absorbed and evaporate completely.

5. Add the warm broth one ladle at a time — about half a cup each — stirring constantly and scraping down any rice that clings to the sides so it doesn't burn. Keep the heat at medium-low and add the next ladle once the previous one has been absorbed. Aim for about 8 ladles (4 cups), then taste. It is more art than science: if the rice isn't quite done, keep going, but stop while it is just al dente — not overcooked, not raw. The whole process takes about 15 minutes.

6. When the rice is al punto, stir in the [mushrooms](i:portobello), the [butter](i:butter) and the [Parmesan](i:parmesan), and season with [salt](i:salt) and [pepper](i:black_pepper) to taste. Mix everything well, taste and adjust.

7. Serve right away — the rice quickly turns soft and loses its edge — topped with a little extra [Parmesan](i:parmesan) and a sprinkle of [chives](i:chives) or fresh parsley.
