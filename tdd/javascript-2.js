require("css.escape");

/**
 * Возвращает уникальный селектор к элементу в DOM
 * так что вызов document.querySelectorAll(getPath(node)).length === 1 если node является HTML-элементом в DOM
 * @param {HTMLElement} node
 */
function getPath(node) {
  if (!(node && node instanceof HTMLElement && node.parentNode)) {
    return null;
  }

  const getUniqueId = (node) => {
    let id = node.getAttribute && node.getAttribute("id");
    if (id) {
      // id = id.replace(/[^A-Za-z0-9_-]/g, "\\.");
      id = CSS.escape(id);
      if (document.querySelectorAll("#" + id).length === 1) {
        return "#" + id;
      }
    }
    return null;
  };

  const indexNumber = (node) => {
    let pos = 1;
    while (node.previousSibling !== null) {
      node = node.previousSibling;
      if (node.nodeType === node.ELEMENT_NODE) {
        pos++;
      }
    }
    return pos;
  };

  while (node && node.nodeType !== node.ELEMENT_NODE) {
    node = node.parentNode;
  }

  const selector = [];
  let tagName = node && node.tagName;
  while (tagName) {
    if (tagName.toUpperCase() !== "BODY") {
      const id = getUniqueId(node);
      if (id) {
        selector.unshift(id);
        break;
      }
      const nOf = indexNumber(node);
      selector.unshift(nOf === 1 ? "*:first-child" : `*:nth-child(${nOf})`);
      node = node.parentNode;
      tagName = node && node.tagName;
    } else {
      selector.unshift("BODY");
      break;
    }
  }

  return selector.join(">");
}

module.exports = getPath;
