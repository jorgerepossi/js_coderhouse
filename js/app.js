/*
 * Clase 07
 * Curso JavaScript
 * Camada 14470
 * Profesora: Laura Gonzalez Martin
 * Tutor: Emiliano Del Arco
 * Alumno: Jorge Repossi
 * Desafío:  Interactuar con HTML
 */
const BODY = document.body;
const url = "js/properties.json";
let data = [];
let switchTheme = document.querySelector('input[type="checkbox"]');
let filters = document.querySelector(".filters__container");
const fragment = document.createDocumentFragment();
let totalResults = document.querySelector(".total_results");
let filterSelect = document.querySelector('#filterNeighborhood');
let filterSelectZone = document.querySelector('#filterZone');

let template = document.querySelector("#template-results").content;
let resultsColumnItem = document.querySelector("#results__column--wrapper");
let getHeight = resultsColumnItem.clientHeight;

let loader = document.querySelector('.loader');
let buttons = document.querySelectorAll('.button');
let lessPrice = document.querySelector('#lessPrice');
let highPrice = document.querySelector('#highPrice');


/**
 * Creamos la función para traer los datos del JSON
 * Obtenemos los datos mediante un fetch
 */

const getResults = async () => {
    try {

        const results = await fetch(url);

        data = await results.json();
        printData(data);
        selectFilterByZone(data);
        selectFilterByNeighborhood(data);
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
            template.querySelector(".results__item--type").innerText = `${property.type}`;
            template.querySelector(".results__item--zone").innerText = `${property.neighborhood}`;
            template.querySelector(".results__item--price").innerText = `${property.money}${String(property.price).replace(/(.)(?=(\d{3})+$)/g, "$1.")}`;
            template.querySelector(".results__item--text").innerText = property.description;
            const cloneTemplates = template.cloneNode(true);

            fragment.appendChild(cloneTemplates);

        });
        totalResults.innerHTML = `<p class="px-4">Se encontraron <b> ${data.length} </b> resultados </p>`;

        resultsColumnItem.append(fragment);

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
const showAll = () => {
    data.sort((a, b) => {
        return a.id - b.id;
    });
    printData(data);

};

const showZonas = (selected) => {

    let getZone = data.filter((item) => {
        return item.zone === selected.zone
    })
    printData(getZone);
    totalResults.innerHTML = `<p class="px-4">Se ${getZone.length <= 1 ? 'encontró' : 'encontraron'} <b>${getZone.length}</b>  ${getZone.length < 2 ? 'resultado' : 'resultados'} en <b>${selected.zone} </b></p>`;
}

// Imprimimos  por zona
const showZone = (selected) => {

    let getZone = data.filter((item) => {
        return item.neighborhood === selected.neighborhood
    })
    printData(getZone);
    totalResults.innerHTML = `<p class="px-4">Se ${getZone.length <= 1 ? 'encontró' : 'encontraron'} <b>${getZone.length}</b>  ${getZone.length < 2 ? 'resultado' : 'resultados'} en <b>${selected.neighborhood} </b></p>`;


};

// Creamos los botones con las  acciones a filtrar
const createLessPrice = () => {
    lessPrice.innerText = "Menor Precio";
    lessPrice.onclick = () => {

        showLessExpensive(data);

    };

};

const createHighPrice = () => {
    highPrice.innerText = "Mayor Precio";
    highPrice.onclick = () => {
        showMoreExpensive(data);

    };



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
 * 
 */
const selectFilterByNeighborhood = () => {
    const select = createSelectFilterNeighborhood();
    filterSelect.onchange = (e) => {
        const elementTarget = e.target.value
        const barrios = data.find(barrio => barrio.neighborhood === elementTarget)
        showZone(barrios)
    };
    filters.appendChild(filterSelect);
}

const selectFilterByZone = () => {
    const select = createSelectFilterZone();
    filterSelectZone.onchange = (e) => {
        const elementTarget = e.target.value
        const zonas = data.find(zona => zona.zone === elementTarget)
        showZonas(zonas)
    }
    filters.appendChild(filterSelectZone);
}

// Creamos los select

/**
 * Crear cantidad de ambientes
 * @returns params
 */


/**
 * Creamos el filtrado por Barrios
 * @returns Array[]
 */

const createSelectFilterNeighborhood = () => {
    let reduce = data.reduce((map, obj) => map.set(obj.neighborhood, obj), new Map());
    const options = reduce.forEach(item => {
        const elementOption = document.createElement("option");
        elementOption.innerHTML = item.neighborhood;
        elementOption.classList = "selectOption";
        elementOption.value = item.neighborhood;
        elementOption.tagName = item.neighborhood;
        filterSelect.appendChild(elementOption);
    })

    return options;
}

/**
 * Creamos el filtrado por Zonas
 * @returns Array[]
 */
const createSelectFilterZone = () => {
    let reduce = data.reduce((map, obj) => map.set(obj.zone, obj), new Map());
    const options = reduce.forEach(item => {
        const elementOption = document.createElement("option");
        elementOption.innerHTML = item.zone;
        elementOption.classList = "selectOption";
        elementOption.value = item.zone;
        elementOption.tagName = item.zone;
        filterSelectZone.appendChild(elementOption);
    })

    return options;
}

const createFilterButton = (text, fn) => {
    const createFilterButton = document.createElement("button");
    createFilterButton.setAttribute("type", "button");
    createFilterButton.setAttribute("class", fn);
    createFilterButton.innerText = text;
    return createFilterButton;

};

const getActiveClass = () => {
    buttons.forEach(button => {
        button.addEventListener("click", function() {
            buttons.forEach(btn => btn.classList.remove('button--active'))
            this.classList.add('button--active')
        })
    })
};


const toggleTheme = (theme) => {
    BODY.classList.remove('theme-dark', 'theme-light', 'theme-auto');
    BODY.classList.add(`theme-${theme}`);
}

document.addEventListener("DOMContentLoaded", () => {

  const storageTheme = localStorage.getItem("theme")
  if (storageTheme === 'dark')  switchTheme.setAttribute('checked', 'checked')
   
   
  BODY.classList.add(`theme-${storageTheme}`)
    switchTheme.onchange = () => {
        let value;
        if (switchTheme.checked ? value = 'dark' : value = 'light')
        localStorage.setItem("theme", value)
      toggleTheme(value)
    }

})

getActiveClass();
createLessPrice(getResults);
createHighPrice(getResults);