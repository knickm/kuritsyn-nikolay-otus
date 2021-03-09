import { expect } from 'chai';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { JSDOM } from 'jsdom';
import jsdomglobal from 'jsdom-global'
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const pathToTestHTML = join(__dirname, "test.html");

jsdomglobal();

let { MyTree } = await import('../src/my-tree.js');

describe("Testing custom element my-tree", () => {
	before(() => {
		var testHtml = fs.readFileSync(pathToTestHTML);
		window = new JSDOM(testHtml).window;
		document.body.innerHTML = window.document.body.innerHTML;
	});
	it("Tag <tree>", () => {
		const node = document.querySelector("#tree-1").shadowRoot.childNodes[0].shadowRoot.querySelector("#t1");
		expect(node).is.not.null;
	});

	it("Constructor", () => {
		const tree = new MyTree();
		expect(tree).is.not.null;
	});

	it("Set attribute \"tree\"", () => {
		const tree = new MyTree();
		tree.Tree = {
			"id": "2", "items": [
				{
					"id": "2-1",
					"items": [{ "id": "2-1-1" }, { "id": "2-1-2" }]
				},
				{
					"id": "2-2",
					"items": [{ "id": "2-2-1" }]
				}
			]
		};

		expect(tree.Tree.id).eq("2");
	});

	it("Append <my-tree> to body", () => {
		const tree = new MyTree("new-tree");
		tree.Tree = {
			"id": "new-2", "items": [
				{
					"id": "new-2-1",
					"items": [{ "id": "new-2-1-1" }, { "id": "new-2-1-2" }]
				},
				{
					"id": "new-2-2",
					"items": [{ "id": "new-2-2-1" }]
				}
			]
		};
		document.body.appendChild(tree);
		setTimeout(() => {
			const node = document.querySelector("#new-tree").shadowRoot.childNodes[0].shadowRoot.querySelector("#new-2")
			expect(node).is.not.null;
		});
	});
});


