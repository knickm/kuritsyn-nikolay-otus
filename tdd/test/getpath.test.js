const { expect } = require("chai");
const path = require("path");
const pathToTestHTML = path.resolve(__dirname, "./test.html");
const { JSDOM } = require("jsdom");
require("jsdom-global")();
var fs = require("fs");

const getPath = require("../javascript-2");

describe("Testing getPath() with bad params", () => {
  it("Node is undefined", () => {
    const res = getPath();
    expect(res).is.null;
  });

  it("Node is null", () => {
    const res = getPath(null);
    expect(res).is.null;
  });

  it("Node is not HTMLElement (empty string)", () => {
    const res = getPath("");
    expect(res).is.null;
  });

  it("Node is not HTMLElement (not HTMLElement)", () => {
    const res = getPath({});
    expect(res).is.null;
  });

  it("Get path for element that not in DOM", () => {
    try {
      const el = document.createElement("p");
      const path = getPath(el);
      expect(path).is.null;
    } catch (e) {
      console.error("ERR:", e);
    }
  });
});

describe("Testing getPath() with described behavior", () => {
  before(() => {
    var testHtml = fs.readFileSync(pathToTestHTML);
    window = new JSDOM(testHtml).window;
    document.body.innerHTML = window.document.body.innerHTML;
  });
  it("Get path for element by unique ID", () => {
    try {
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
      const el = document.querySelector("#div5\\.1 > div > ul > li:nth-child(3)");
      const path = getPath(el);
      expect(path).to.be.eq("#div5\\.1>*:first-child>*:first-child>*:nth-child(3)");
      expect(document.querySelectorAll(path).length).to.be.eq(1, "Not unique selector");
    } catch (e) {
      console.error("ERR:", e);
    }
  });

  it("Get path for element dinamicaly addin in DOM", () => {
    try {
      const el = document.querySelector("ul");
      const li = document.createElement("li");
      el.appendChild(li);

      const path = getPath(li);
      expect(path).to.be.eq("#div5\\.1>*:first-child>*:first-child>*:nth-child(5)");
      expect(document.querySelectorAll(path).length).to.be.eq(1, "Not unique selector");
    } catch (e) {
      console.error("ERR:", e);
    }
  });

  it("Should not return element id if element's parent has other children with same id", function () {
    const el = document.querySelector(".not_uniq_parent_id");
    const path = getPath(el);
    expect(path).to.be.eq("BODY>*:nth-child(3)>*:first-child");
    expect(document.querySelectorAll(path).length).to.be.eq(1, "Not unique selector");
  });
});
