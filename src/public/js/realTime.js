const socket = io();

const productsContainer = document.getElementById("productos");

socket.on("productos", (products) => {
  const title = products.map((products) => products.title);

  productsContainer.innerHTML = title.join("<br></br>");
});


socket.on('updateProducts', (products) => {
    const title = products.map((products) => products.title);
  
    productsContainer.innerHTML = title.join("<br></br>");
  })

console.log("hola");
