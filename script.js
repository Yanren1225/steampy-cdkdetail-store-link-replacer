// ==UserScript==
// @name        steampy 游戏详情界面 steam 商店链接 div 替换为 a
// @namespace   https://github.com/Yanren1225/steampy-cdkdetail-store-link-replacer
// @match       https://steampy.com/cdkDetail
// @homepageURL https://github.com/Yanren1225/steampy-cdkdetail-store-link-replacer
// @supportURL  https://github.com/Yanren1225/steampy-cdkdetail-store-link-replacer/issues
// @version     0.1.0
// @author      Yanren
// @modified    2023-06-25
// *run-at document-end
// ==/UserScript==

(function () {
  "use strict";

  const observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (!mutation.addedNodes) return;

      for (let i = 0; i < mutation.addedNodes.length; i++) {
        const node = mutation.addedNodes[i];
        if (node.nodeType !== 1) continue;

        const nodesList = Array.from(node.querySelectorAll("div"));
        const nodeIndex = nodesList.findIndex((item) => {
          return item.innerText.indexOf("https://store.steampowered.com") === 0;
        });

        if (nodeIndex > -1) {
          const targetNode = nodesList[nodeIndex];
          const text = targetNode.textContent;
          const href = targetNode.textContent.trim();
          const classList = targetNode.classList;
          const anchorElement = document.createElement("a");
          anchorElement.href = href;
          anchorElement.text = text;
          anchorElement.classList = classList;
          targetNode.parentNode.replaceChild(anchorElement, targetNode);
          return;
        }
      }
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
})();
