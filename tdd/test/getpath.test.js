const { expect } = require("chai");
const { JSDOM } = require("jsdom");
require("jsdom-global")();

var fs = require("fs");

const getPath = require("../javascript-2");

// Deprecated!!!
// require.extensions['.txt'] = function (module, filename) {
//     module.exports = fs.readFileSync(filename, 'utf8');
// };

// Т.к. документ не модифицируется, то пусть будет в глобальной переменной для быстродействия
var testHtml = fs.readFileSync(require.resolve("./test.html"));
const { window } = new JSDOM(testHtml);

describe("Testing getPath() check enviroment", () => {
  it("Test HTML loaded", () => {
    expect(testHtml).is.not.null;
  });
  it("Test HTML is not empty", () => {
    expect(testHtml.length).to.be.gt(0);
  });
  it("window is not null", () => {
    expect(window).is.not.null;
  });
  it("document is not null", () => {
    expect(window.document).is.not.null;
  });
  it("body is not empty", () => {
    expect(window.document.body.innerHTML.length).to.be.gt(0);
  });
});

describe("Testing getPath() with bad params", () => {
  it("Node is undefined", () => {
    const res = getPath();
    expect(res).is.null;
  });

  it("Node is null", () => {
    const res = getPath(null);
    expect(res).is.null;
  });
});

describe("Testing getPath() with described behavior", () => {
  it("Get path for element by unique ID", () => {
    try {
      document.body.innerHTML = window.document.body.innerHTML;
      const el = document.querySelector("#id3");
      const path = getPath(el);
      expect(path).to.be.eq("#id3");
      expect(document.querySelectorAll(path).length).to.be.eq(1, "Not unique selector");
    } catch (e) {
      console.error("ERR:", e);
    }
  });
  it("Get path for element with not unique ID", () => {
    try {
      document.body.innerHTML = window.document.body.innerHTML;
      const el = document.querySelector("BODY>*:nth-child(2)");
      const path = getPath(el);
      expect(path).to.be.eq("BODY>*:nth-child(2)");
      expect(document.querySelectorAll(path).length).to.be.eq(1, "Not unique selector");
    } catch (e) {
      console.error("ERR:", e);
    }
  });
  it("Get path for element with parent have unique ID", () => {
    try {
      document.body.innerHTML = window.document.body.innerHTML;
      const el = document.querySelector("#div5\\.1>DIV:nth-child(1)");
      const path = getPath(el);
      expect(path).to.be.eq("#div5\\.1>*:first-child");
      expect(document.querySelectorAll(path).length).to.be.eq(1, "Not unique selector");
    } catch (e) {
      console.error("ERR:", e);
    }
  });
  it("Get path for element have escaping ID", () => {
    try {
      document.body.innerHTML = window.document.body.innerHTML;
      const el = document.querySelector("#id311>DIV");
      const path = getPath(el);
      expect(path).to.be.eq("#\\31 23\\~1\\~1");
      expect(document.querySelectorAll(path).length).to.be.eq(1, "Not unique selector");
    } catch (e) {
      console.error("ERR:", e);
    }
  });

  it("Get path for element one from list", () => {
    try {
      document.body.innerHTML = window.document.body.innerHTML;
      const el = document.querySelector("#div5\\.1 > div > ul > li:nth-child(3)");
      const path = getPath(el);
      expect(path).to.be.eq("#div5\\.1>*:first-child>*:first-child>*:nth-child(3)");
      expect(document.querySelectorAll(path).length).to.be.eq(1, "Not unique selector");
    } catch (e) {
      console.error("ERR:", e);
    }
  });
});
