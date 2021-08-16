let root = document.querySelector("#root");

function getParamName(paramName) {
  let parameters = new URLSearchParams(window.location.search);
  return parameters.get(paramName);
}

const get = getParamName("page");

root.innerHTML = get;
let idParams = get;

const getParamsUrl = async () => {
  const url = await fetch("js/properties.json");
  const data = await url.json();
  const page = data.find(({ id }) => id == idParams);
  document.querySelector("#root").innerHTML = `
   
    <p> ${page.address.city}</p>
    <p> ${page.address.location}</p>
    <p> ${page.address.streetAddress}</p>
    <img src="${page.image}" />
    <p>Habitaciones ${page.bedrooms}</p>
    <p>Baños ${page.bathrooms}</p>
    <p>${page.description}</p>
    <p>${page.currency} <span> ${page.price} </span> x mes + expensas</p>
    <p></p>
    <p>${page.type}</p>
    `;
};

if (get == idParams) {
  getParamsUrl();
  console.log("esta bien ");
} else {
  console.log("es distinto");
}
