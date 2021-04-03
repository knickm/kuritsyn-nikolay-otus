import { MyTree } from './my-tree';
import './styles/styles.css';

const t = document.createElement('my-tree') as MyTree;
t.Tree = {
	"id": "1", "items": [
		{
			"id": "1.1",
			"items": [{ "id": "1.1.1" }, { "id": "1.1.2" }]
		},
		{
			"id": "1.2",
			"items": [{ "id": "1.2.1" }]
		}
	]
};
document.body.appendChild(t);

const t2 = new MyTree("new-tree");
t2.Tree = {
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
document.body.appendChild(t2);
