const input = document.getElementById("name");
const root = document.getElementById("root");

let products = [];

const getData = async () => {
  try {
    const res = await fetch("https://fakestoreapi.com/products/");
    products = await res.json();
    render(products);
  } catch (err) {
    console.log(err.message);
  }
};

getData();

function render(list) {
  root.innerHTML = "";

  list.forEach((item) => {
    const div = document.createElement("div");
    div.style.margin = "8px 0";
    div.innerHTML = `
      <h3>${item.title}</h3>
    `;
    root.appendChild(div);
  });
}

input.addEventListener("input", function () {
  const text = this.value.trim().toLowerCase();

  if (!text) {
    render(products);
    return;
  }

  const filtered = products
    .filter((p) => p.title.toLowerCase().includes(text))
    .map((p) => {
      const regex = new RegExp(`(${text})`, "gi");
      const highlighted = p.title.replace(regex, "<mark>$1</mark>");

      return {
        ...p,
        highlightedTitle: highlighted,
      };
    });

  renderHighlight(filtered);
});

function renderHighlight(list) {
  root.innerHTML = "";

  list.forEach((item) => {
    const div = document.createElement("div");
    div.style.margin = "8px 0";
    div.innerHTML = `
      <h3>${item.highlightedTitle}</h3>
    `;
    root.appendChild(div);
  });
}

