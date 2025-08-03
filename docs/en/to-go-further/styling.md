---
title: Styling
description: Using CSS files for website styling
nav: 5
id: 470564ced7f39a4c278de27f4a4d0700
---

## The Sass Preprocessor

The Sass CSS preprocessor was used for creating this site because it allows obtaining .scss style files that are better structured than classic .css files. Beyond syntactic improvement, Sass optimizes performance through partial file management, thus avoiding additional HTTP requests. This approach allowed for creating styling files specific to each developed component, considerably reducing code complexity and improving its maintainability.

Since .scss files cannot be used directly by browsers, the Visual Studio Code extension **_Live Sass Compiler_** was implemented. Thanks to the **_watch sass_** option, this extension automatically compiles .scss files into .css files with each modification, thus facilitating the development process.

## Using Fonts

Font files have been stored in different formats (eot, ttf, woff, woff2) in the **_fonts_** folder located in the **_assets_** directory. **_@font-face_** declarations have been defined in a CSS file according to the structure presented below, thus allowing their use throughout the project.

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

This approach ensures optimal compatibility with different browsers through the declaration of multiple formats, while prioritizing formats that provide the best loading performance.
