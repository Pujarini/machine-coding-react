export const fetchProductList = async () => {
  const response = await fetch(
    "https://my-json-server.typicode.com/codebuds-fk/chat/chats"
  );
  const products = await response.json();
  return products;
};
