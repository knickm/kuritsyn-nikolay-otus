# kuritsyn-nikolay-otus

## Домашняя работа для Занятие <q>GraphQL Server</q>

### Install

```
npm install
```

### Run

```
npm run dev
```

Затем в браузере перейти по сылке: http://localhost:4000/

на первой вкладке добавить текст:

```graphql
query {
  user(id: 1) {
    name
    email
    phone
  }
  goods {
    id
    name
    price
  }
  baskets {
    UserId
    Goods {
      id
      name
      price
    }
  }
}
```

кликнуть по кнопке "Выполнить"

сделать вторую вкладку, добавить текст:

```graphql
mutation {
  addProduct(UserId: 1, ProductId: 2) {
    UserId
    Goods {
      id
      name
      price
    }
  }
  deleteProduct(UserId: 1, ProductId: 1) {
    UserId
    Goods {
      id
      name
      price
    }
  }
}
```

### Task

**Часть 1.** Написать схему GraphQL для примера веб-приложения e-commerce shop: до 3 балла - какие сущности (минимум 3, можно больше), какие у них поля, какие обязательные какие нет до 4 баллов - какие запросы/мутации понадобятся (минимум 4, можно больше)

**Часть 2.** до 5 баллов - развернуть локально graphQL + nodejs или воспользоваться одним из веб демо (graphqlbin), перенести полностью или частично написанную в Части 1 схему. Результатом работы будет ссылка на онлайн демо или репозиторий.
