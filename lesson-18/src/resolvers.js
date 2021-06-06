import { users, products, baskets } from "./db";

const resolvers = {
  Query: {
    user: (parent, { id }, context, info) => {
      const user = users.find((user) => user.id === +id);
      if (!user) {
        throw new Error("User not found.");
      }
      return user;
    },
    goods: (parent, args, context, info) => {
      return products;
    },
    baskets: (parent, args, context, info) => {
      return Object.values(baskets);
    },
  },

  Mutation: {
    addProduct: (parent, { UserId, ProductId }, context, info) => {
      const pIdx = products.findIndex((product) => product.id === +ProductId);

      if (pIdx === -1) {
        throw new Error("Product not found.");
      }
      const product = { ...products[pIdx] };
      const basket = baskets[UserId] || { UserId, Goods: [] };

      basket.Goods.push(product);
      baskets[UserId] = { ...basket };

      return baskets[UserId];
    },

    deleteProduct: (parent, { UserId, ProductId }, context, info) => {
      const pIdx = products.findIndex((product) => product.id === +ProductId);

      if (pIdx === -1) {
        throw new Error("Product not found.");
      }
      const product = { ...products[pIdx] };
      const basket = baskets[UserId] || { UserId, Goods: [] };

      basket.Goods.splice(pIdx, 1);
      baskets[UserId] = { ...basket };

      return baskets[UserId];
    },
  },
};

export default resolvers;
