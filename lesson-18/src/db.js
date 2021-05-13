export let users = [
  { id: 1, name: "Vasya", email: "vasya@gmail.com", phone: "+7 123 456 7890" },
  { id: 2, name: "Petya", email: "petya@gmail.com", phone: "+7 321 654 0987" },
];

export let products = [
  { id: 1, name: "Processor Intel Core i7", price: 8123.0 },
  { id: 2, name: "SSD Samsung 512GB", price: 3123.0 },
  { id: 3, name: "Mouse Logitech super", price: 2123.0 },
];

export let baskets = {
  1: {
    UserId: 1,
    Goods: [{ id: 1, name: "Processor Intel Core i7", price: 8123.0 }],
  },
};
