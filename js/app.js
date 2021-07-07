/*
 * Clase 07
 * Curso JavaScript
 * Camada 14470
 * Profesora: Laura Gonzalez Martin
 * Tutor: Emiliano Del Arco
 * Alumno: Jorge Repossi
 * Desafío:  Interactuar con HTML
 */

let url = "js/properties.json";
let filters = document.querySelector(".filters__container");
let fragment = document.createDocumentFragment();
let totalResults = document.querySelector(".total_results");
let template = document.querySelector("#template-results").content;
let resultsColumnItem = document.querySelector("#results__column--wrapper");
let getHeight = resultsColumnItem.clientHeight;
let data = [];
resultsColumnItem.style = ` max-height: 980px;`;
// Obtenemos los datos mediante un fetch
const getResults = async () => {
  try {
    const results = await fetch(url);
    data = await results.json();
    printData(data);
    createLessPrice(data);
    createHighPrice(data);
    createFilterAll(data);
  } catch (err) {
    console.log(err);
  }
};

// Imprimimos los resultados con un forEach
const printData = () => {
  while (resultsColumnItem.hasChildNodes()) {
    resultsColumnItem.removeChild(resultsColumnItem.lastChild);
  }
  if (data.length < 0) {
    document.querySelector(".results__column--wrapper").innerHTML =
      "No se encontraron datos";
  } else {
    data.forEach((property) => {
      template.querySelector(".results__column--img picture img").setAttribute("src", property.image);
      template.querySelector(".results__item--title").textContent = property.name;
      template.querySelector(".results__item--type").innerText    = `${property.type}`;
      template.querySelector(".results__item--zone").innerText    = `${property.zone}`;
      template.querySelector(".results__item--price").innerText   = `${property.money}${property.price}`;
      template.querySelector(".results__item--text").innerText    = property.description;
      const cloneTemplates = template.cloneNode(true);
      fragment.appendChild(cloneTemplates);
    });

    resultsColumnItem.append(fragment);
    totalResults.innerHTML = `<div class="px-4">Se encontraron ${data.length} departamentos</div>`;
  }
};

// Creamos las funciones de filtrado de departamentos
// Imprimimos los menores precios
const sortLessPrice = () => {
  data.sort((a, b) => {
    return a.price - b.price;
  });
  printData(data);
};

// Imprimimos  los mayores precios
const sortMostPrice = () => {
  data.sort((a, b) => {
    return b.price - a.price;
  });
  printData(data);
};

// Imprimimos  todos los  precios
const sortAll = () => {
  data.sort((a, b) => {
    return a.id - b.id;
  });
  printData(data);
};

// Creamos los botones con las  acciones a filtrar
const createLessPrice = () => {
  const buttonCreated = createFilterButton("Menor Precio", "button");
  buttonCreated.onclick = () => {
    sortLessPrice(data);
  };
  filters.appendChild(buttonCreated);
};

const createHighPrice = () => {
  const buttonCreated = createFilterButton("Mayor Precio", "button");
  buttonCreated.onclick = () => {
    sortMostPrice(data);
  };
  filters.appendChild(buttonCreated);
};

const createFilterAll = () => {
  const buttonCreated = createFilterButton("Todos", "button");
  buttonCreated.onclick = () => {
    sortAll();
  };
  filters.appendChild(buttonCreated);
};

const createFilterButton = (text, fn) => {
  const createFilterButton = document.createElement("button");
  createFilterButton.setAttribute("type", "button");
  createFilterButton.setAttribute("class", fn);
  createFilterButton.innerText = text;

  return createFilterButton;
};
getResults();
