import "./sensitive-content.js";
import "./images.js";

function addScriptTag(src, async, onload) {
  var scriptElement = document.createElement("script");
  scriptElement.async = async;
  scriptElement.src = src;
  if (onload) {
    scriptElement.onload = onload;
  }
  var firstScriptElement = document.getElementsByTagName("script")[0];
  firstScriptElement.parentNode.insertBefore(scriptElement, firstScriptElement);
}

addScriptTag(
  "https://unpkg.com/save-ukraine@0.18.111/dist/umd/main.js",
  true,
  function () {
    Ukraine.save({
      ribbon: "TOP_LEFT",
      countries: [],
      hasShadow: true,
      isCancelable: true,
      isBloodIncluded: false,
      isGraphicIncluded: false,
      isInConsole: false,
      moreInfoUrl: "https://war.ukraine.ua/",
    });
  }
);
