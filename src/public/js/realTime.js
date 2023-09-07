const socketClient = io();
console.log(io)

const form = document.getElementById("form");
const productsContainer = document.getElementById("productos");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const inputTitle = document.getElementById("prod_title").value;
  console.log("ok");
  const inputDescription = document.getElementById("prod_description").value;
  const inputPrice = document.getElementById("prod_price").value;
  const inputThumbnail = document.getElementById("prod_thumbnail").value;
  const inputCode = document.getElementById("prod_code").value;
  const inputStock = document.getElementById("prod_stock").value;
  const inputStatus = document.getElementById("prod_status").value;
  const inputCategory = document.getElementById("prod_category").value;

  socketClient.emit("newProduct", {
    title: inputTitle,
    description: inputDescription,
    price: inputPrice,
    thumbnail: inputThumbnail,
    code: inputCode,
    stock: inputStock,
    status: inputStatus,
    category: inputCategory,
  });
});
