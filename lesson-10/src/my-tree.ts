interface ITree {
	id: string;
	items?: Array<ITree>;
}

interface ITreeElement {
	Tree: ITree;
}

export class MyTree extends HTMLElement implements ITreeElement {
	_tree: ITree = { id: 'root', items: [] };
	rendered = false;

	static get observedAttributes(): Array<string> {
		return ['tree'];
	}

	get Tree(): ITree {
		return this._tree;
	}

	set Tree(v: ITree) {
		this._tree = v;
		this.render();
	}

	constructor(id: string | null) {
		super();

		const shadowRoot = this.attachShadow({ mode: "open" });
		if (id) {
			this.setAttribute("id", id);
		}
	}

	attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
		try {
			if (name === "tree") {
				this.Tree = JSON.parse(newValue) as ITree;
			}
		} catch (e) {
			console.log('Bad params:', name, newValue, e);
		}
	}

	render(): void {
		const shadowRoot = this.shadowRoot;
		if (shadowRoot) {
			shadowRoot.innerHTML = '';
			setTimeout(() => {
				const nodeEl = new MyNode(true);
				nodeEl.Tree = this._tree;
				shadowRoot.appendChild(nodeEl);
			});
		}
	}
}

class MyNode extends MyTree {
	get ID(): string | null {
		return this._tree ? this._tree.id : null;
	}

	get items(): Array<ITree> | null {
		return this._tree ? this._tree.items || null : null;
	}

	constructor(private isCorrect = false) {
		super(null);
		this.setAttribute('part', 'node');
		this.setAttribute('exportparts', 'node: node-title');
	}

	connectedCallback(): void {
		this.isCorrect = false;
		let parentNode = (this.shadowRoot?.host as HTMLElement).parentElement?.shadowRoot;
		while (parentNode && parentNode.host) {
			if (parentNode.host.tagName === 'MY-TREE') {
				this.isCorrect = true;
				break;
			}
			parentNode = parentNode.host.parentElement ? parentNode.host.parentElement.shadowRoot : null;
		}
	}

	render(): void {
		const shadowRoot = this.shadowRoot;
		if (shadowRoot) {
			shadowRoot.innerHTML = '';
			if (!this.isCorrect) {
				(shadowRoot.host as HTMLElement).style.display = 'none';
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
}

window.customElements.define("my-tree", MyTree);
window.customElements.define("my-node", MyNode);
