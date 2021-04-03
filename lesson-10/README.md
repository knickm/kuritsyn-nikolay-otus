# kuritsyn-nikolay-otus
## Typescript: Custom Elements, Shadow DOM, Lit-Element, Lit-HTML

### Installation

```
npm install
```
### Test

```
npm test
```
### Run (open server)

```
npm start
```

### Create development

```
npm run dev
```

### Create production

```
npm run build
```

### Task
***Перевести проект на TypeScript***

*Цель*: Перевести проект на JavaScript к TypeScript - Добавить типы - Добавить зависимости - Исправить ошибки типизации

Взят проект на *javascript* с таким заданием:

***Custom Elements Tree***

*Цель*: В ходе выполнения ДЗ студент создаст приложение для показа дерева.

С помощью **Custom Elements** создать приложение для показа дерева с помощью компонентов *my-tree* и *my-leaf*. Компоненты должны получать данные о структуре поддерева от родительского элемента. Используйте **Shadow DOM** при отрисовке компонент. Можно также использовать для реализации **Lit-Element**, **Lit-HTML** или **Polymer**.

Пример структуры
```
{
	"id": 1,
	"items": [{
		"id": 2,
		"items": [{ "id": 3 }]
	}]
}
```