const container = document.getElementById('container');
const search = document.getElementById('search');

let products = []; 

const getData = async () => {
  try {
    const res = await fetch("https://fakestoreapi.com/products/"); 
    products = await res.json();

    renderProducts(products);

  } catch (err) {
    container.innerHTML = `<p style="color:red;">Ошибка: ${err.message}</p>`;
  }
};

getData();


function renderProducts(list, query = "") {
  container.innerHTML = list
    .map(item => {
      let title = item.title;

     
      if (query) {
        const reg = new RegExp(query, "gi");
        title = title.replace(reg, match => `<mark>${match}</mark>`);
      }

      return `
        <div class="product">
          <img src="${item.image}" alt="${item.title}" width="100">
          <h3>${title}</h3>
          <p>${item.price} $</p>
        </div>
      `;
    })
    .join("");
}




search.addEventListener("input", (e) => {
  const query = e.target.value.trim().toLowerCase();

  const filtered = products.filter(item =>
    item.title.toLowerCase().includes(query)
  );

  renderProducts(filtered, query);
});
