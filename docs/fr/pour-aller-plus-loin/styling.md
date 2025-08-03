---
title: Le styling
description: Utilisation des fichiers CSS pour le styling du site
nav: 5
id: 470564ced7f39a4c278de27f4a4d0700
---

## Le préprocesseur Sass

Le préprocesseur CSS Sass a été utilisé pour la création de ce site car il permet d'obtenir des fichiers de styles .scss mieux structurés que les fichiers .css classiques. Au-delà de l'amélioration syntaxique, Sass optimise les performances grâce à la gestion des fichiers partiels, évitant ainsi les requêtes HTTP supplémentaires. Cette approche a permis de créer des fichiers de styling spécifiques à chaque composant développé, réduisant considérablement la complexité du code et améliorant sa maintenabilité.

Les fichiers .scss ne pouvant pas être utilisés directement par les navigateurs, l'extension Visual Studio Code **_Live Sass Compiler_** a été mise en place. Grâce à l'option **_watch sass_**, cette extension compile automatiquement les fichiers .scss en fichiers .css lors de chaque modification, facilitant ainsi le processus de développement.

## Utilisation de fonts

Des polices de caractères ont été stockées sous différents formats (eot, ttf, woff, woff2) dans le dossier **_fonts_** situé dans le répertoire **_assets_**. Des déclarations **_@font-face_** ont été définies dans un fichier CSS selon la structure présentée ci-dessous, permettant ainsi leur utilisation dans l'ensemble du projet.

```css
@font-face {
  font-family: "Bw Modelica Bold";
  src: url("BwModelica-Bold.eot");
  src: url("BwModelica-Bold.eot?#iefix") format("embedded-opentype"), url("BwModelica-Bold.woff2")
      format("woff2"), url("BwModelica-Bold.woff") format("woff"), url("BwModelica-Bold.ttf")
      format("truetype"),
    url("BwModelica-Bold.svg#BwModelica-Bold") format("svg");
  font-weight: bold;
  font-style: normal;
  font-display: swap;
}
```

Cette approche garantit une compatibilité optimale avec différents navigateurs grâce à la déclaration de multiple formats, tout en privilégiant les formats apportant les meilleures performances de chargement.
