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
let filterSelect = document.querySelector('#filterNeighborhood');
let template = document.querySelector("#template-results").content;
let resultsColumnItem = document.querySelector("#results__column--wrapper");
let getHeight = resultsColumnItem.clientHeight;
let data = [];
resultsColumnItem.style = ` max-height: 980px;`;


/**
 * Creamos la función para traer los datos del JSON
 * Obtenemos los datos mediante un fetch
 */

const getResults = async () => {
  try {
    const results = await fetch(url);
    data = await results.json();
    printData(data);
    createLessPrice(data);
    createHighPrice(data);
    selectFilterByZone(data);
    createFilterAll(data);
    } catch (err) {
        console.log(err);
    }
};

 
/**
 * Imprimimos los resultados con un forEach
 * Recibimos el parámetro data para poder hacer los filtros
 * @param {*} data 
 */

const printData = (data) => {
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
            template.querySelector(".results__item--zone").innerText    = `${property.neighborhood}`;
            template.querySelector(".results__item--price").innerText   = `${property.money }${String(property.price).replace(/(.)(?=(\d{3})+$)/g, "$1.")}`;
            template.querySelector(".results__item--text").innerText    = property.description;
            const cloneTemplates = template.cloneNode(true);
            fragment.appendChild(cloneTemplates);
        });

        resultsColumnItem.append(fragment);
        totalResults.innerHTML = `<div class="px-4">Se encontraron ${data.length} departamentos</div>`;
    }
};

 
/**
 *  Creamos las funciones de filtrado de departamentos
 *  Imprimimos los menores precios
 */

const showLessExpensive = () => {
    data.sort((a, b) => {
        return a.price - b.price;
    });
    printData(data);
};

// Imprimimos  los mayores precios
const showMoreExpensive = () => {
    data.sort((a, b) => {
        return b.price - a.price;
    });
    printData(data);
};

// Imprimimos  todos los  precios
const  showAll = () => {
    data.sort((a, b) => {
        return a.id - b.id;
    });
  printData(data);
  filters.reset();
};

// Imprimimos  por zona
const showZone = (selected) => {
    const getZone = data.filter((item) => {
        return item.neighborhood === selected.neighborhood
    })
    totalResults.innerHTML = `<p class="px-4">Se ${getZone.length <= 1 ? 'encontró' : 'encontraron'} <b>${getZone.length}</b>  ${getZone.length <= 1 ? 'resultado' : 'resultados'} en ${selected.neighborhood}</p>`;
    printData(getZone);
 
    
};


// Creamos los botones con las  acciones a filtrar
const createLessPrice = () => {
    const buttonCreated = createFilterButton("Menor Precio", "button");
    buttonCreated.onclick = () => {
        showLessExpensive(data);
    };
    filters.appendChild(buttonCreated);
};

const createHighPrice = () => {
    const buttonCreated = createFilterButton("Mayor Precio", "button");
    buttonCreated.onclick = () => {
        showMoreExpensive(data);
    };
    filters.appendChild(buttonCreated);
};

const createFilterAll = () => {
    const buttonCreated = createFilterButton("Reset", "button");
    buttonCreated.onclick = () => {
         showAll();
    };
    filters.appendChild(buttonCreated);
};


/**
 * 
 */
const selectFilterByZone = () => {
    const select = createSelectFilter();
    filterSelect.onchange = (e) => {
        const elementTarget = e.target.value
        const barrios = data.find(barrio => barrio.neighborhood === elementTarget)
        showZone(barrios)
    };
    filters.appendChild(filterSelect);
}


// Creamos los select

/**
 * Crear cantidad de ambientes
 * @returns params
 */

const createSelectFilter = () => {
  const reduce = data.reduce((map, obj) => map.set(obj.neighborhood, obj), new Map());

  const options = reduce.forEach(item => {
    const elementOption = document.createElement("option");
    elementOption.innerHTML = item.neighborhood;
    elementOption.classList = "selectOption";
    elementOption.value = item.neighborhood;
    elementOption.tagName = item.neighborhood;
    filterSelect.appendChild(elementOption);
})
 
return  options;
  
};

const createFilterButton = (text, fn) => {
    const createFilterButton = document.createElement("button");
    createFilterButton.setAttribute("type", "button");
    createFilterButton.setAttribute("class", fn);
    createFilterButton.innerText = text;

    return createFilterButton;
};
getResults();