export class MyTree extends HTMLElement {
	static get observedAttributes() {
		return ['tree'];
	}

	get Tree() {
		return this._tree;
	}

	set Tree(v) {
		this._tree = v;
		this.render();
	}

	constructor(id) {
		super();

		this._tree = { id: 'root', items: [] };

		this.rendered = false;
		const shadowRoot = this.attachShadow({ mode: "open" });
		if (id) {
			this.setAttribute("id", id);
		}
	}

	attributeChangedCallback(name, oldValue, newValue) {
		try {
			if (name === "tree") {
				this.Tree = JSON.parse(newValue);
			}
		} catch (e) {
			console.log('Bad params:', name, newValue, e);
		}
	}

	render() {
		const shadowRoot = this.shadowRoot;
		shadowRoot.innerHTML = '';
		setTimeout(() => {
			const nodeEl = new MyNode(true);
			nodeEl.Tree = this._tree;
			shadowRoot.appendChild(nodeEl);
		});
	}
}

class MyNode extends MyTree {
	get ID() {
		return this._tree ? this._tree.id : null;
	}

	get items() {
		return this._tree ? this._tree.items : null;
	}

	constructor(isCorrect = false) {
		super();
		this.isCorrect = isCorrect;
		this.setAttribute('part', 'node');
		this.setAttribute('exportparts', 'node: node-title');
	}

	connectedCallback() {
		this.isCorrect = false;
		let parentNode = this.shadowRoot.host.parentNode;
		while (parentNode && parentNode.host) {
			if (parentNode.host.tagName === 'MY-TREE') {
				this.isCorrect = true;
				break;
			}
			parentNode = parentNode.shadowRoot.host.parentNode;
		}
	}

	render() {
		const shadowRoot = this.shadowRoot;
		shadowRoot.innerHTML = '';
		if (!this.isCorrect) {
			shadowRoot.host.style.display = 'none';
			return;
		}

		const ulEl = document.createElement('ul');
		shadowRoot.appendChild(ulEl);

		const liEl = document.createElement('li');
		liEl.innerHTML = `<span id="${this.ID}" part="node-title">${this.ID}</span>`;
		ulEl.appendChild(liEl);

		if (this.items && this.items.length > 0) {
			for (let i = 0, len = this.items.length; i < len; ++i) {
				const tEl = new MyNode(true);
				tEl.Tree = this.items[i];
				liEl.appendChild(tEl);
			}
		}
	}
}

window.customElements.define("my-tree", MyTree);
window.customElements.define("my-node", MyNode);
