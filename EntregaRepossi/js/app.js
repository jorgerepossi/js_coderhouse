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
let loader = document.querySelector(".loader");
let buttons = document.querySelectorAll(".button");
let lessPrice = document.querySelector("#lessPrice");
let highPrice = document.querySelector("#highPrice");
let fragment = document.createDocumentFragment();
let totalResults = document.querySelector(".total_results");
let filterSelect = document.querySelector("#filterNeighborhood");
let filterSelectZone = document.querySelector("#filterZone");
let template = document.querySelector("#template-results").content;
let resultsColumnItem = document.querySelector("#results__column--wrapper");
let getHeight = resultsColumnItem.clientHeight;
let favorites = {};

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
        //getFavoritesLength(data);
    } catch (err) {
        console.log(err);
    }
};

/**
 * Imprimimos los resultados con un forEach
 * Recibimos el parámetro data para poder hacer los filtros
 * @param {*} data
 */



resultsColumnItem.addEventListener('click', e => {
    e.target.classList.add('disabled');
    e.target.setAttribute('disabled', 'disabled');
    getFavourites(e)
})


const getFavourites = (e) => {
    let fav = e.target.classList.contains('iconFav')
    if (fav) {
        favObject(e.target.parentNode.parentNode.parentNode.parentNode.parentNode)
    }
    e.stopPropagation();

}

const favObject = property => {
    const favouriteStorage = {
        id: property.querySelector('.iconFav').dataset.id,
        address: property.querySelector('.results__item--title').textContent,
        price: property.querySelector('.results__item--price').textContent,
        quantity: 1
    }
    //creamos el index del favorito por el id
    favorites[favouriteStorage.id] = {
        ...favouriteStorage
    };
    localStorage.setItem('favorites', JSON.stringify(favorites));

}


/**
 * Creamos el template de los items a mostrar
 * @param {*} data
 */
const printData = (data) => {
    // Limpiamos el contenedor para poder cargar los nuevos
    while (resultsColumnItem.hasChildNodes()) {
        resultsColumnItem.removeChild(resultsColumnItem.lastChild);
    }
    // Verificamos que no esté vacío
    if (data.length < 0) {
        document.querySelector(".results__column--wrapper").innerHTML =
            "No se encontraron datos";
    } else {
        data.forEach((property) => {
            template.querySelector(".iconFav").dataset.id = property.id;
            template.querySelector(".results__column--img picture img").setAttribute("src", property.image);
            template.querySelector(".results__item--title").textContent = property.address;
            template.querySelector(".results__item--type").innerText = `${property.type}`;
            template.querySelector(".results__item--zone").innerText = `${property.neighborhood}`;
            template.querySelector(".results__item--text").innerText = property.description;
            template.querySelector(".results__item--price").innerText = `${property.money}${String(property.price).replace(/(.)(?=(\d{3})+$)/g, "$1.")}`;
            template.querySelector(".results__column--item").setAttribute("data-id", property.id + "" + property.price);
            const cloneTemplates = template.cloneNode(true);

            fragment.appendChild(cloneTemplates);
        });
        totalResults.innerHTML = `<p class="px-4">Se encontraron <b> ${data.length} </b> resultados </p>`;

        resultsColumnItem.append(fragment);
    }

    //getFavourites(data);
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

// Imprimimos  por zona
const showZonas = (selected) => {
    let getZone = data.filter((item) => {
        return item.zone === selected.zone;
    });
    printData(getZone);
    totalResults.innerHTML = `<p class="px-4">Se ${getZone.length <= 1 ? "encontró" : "encontraron"} <b>${getZone.length}</b>  ${getZone.length < 2 ? "resultado" : "resultados"} en <b>${selected.zone} </b></p>`;
};

// Imprimimos  por barrios
const showNeighborhood = (selected) => {
    let getZone = data.filter((item) => {
        return item.neighborhood === selected.neighborhood;
    });
    printData(getZone);
    totalResults.innerHTML = `<p class="px-4">Se ${getZone.length <= 1 ? "encontró" : "encontraron"} <b>${getZone.length}</b>  ${getZone.length < 2 ? "resultado" : "resultados"} en <b>${selected.neighborhood} </b></p>`;
};

// Creamos los botones con las  acciones a filtrar

// Filtra menor valor
const createLessPrice = () => {
    lessPrice.innerText = "Menor Precio";
    lessPrice.onclick = () => {
        showLessExpensive(data);
    };
};

// Filtra mayor valor
const createHighPrice = () => {
    highPrice.innerText = "Mayor Precio";
    highPrice.onclick = () => {
        showMoreExpensive(data);
    };
};
// Muestra todo
const createFilterAll = () => {
    const buttonCreated = createFilterButton("Reset", "button");
    buttonCreated.onclick = () => {
        showAll();
    };
    filters.appendChild(buttonCreated);
};

/**
 * Crea el filtro de barrios
 */
const selectFilterByNeighborhood = () => {
    const select = createSelectFilterNeighborhood();
    filterSelect.onchange = (e) => {
        const elementTarget = e.target.value;
        const barrios = data.find(
            (barrio) => barrio.neighborhood === elementTarget
        );
        showNeighborhood(barrios);
    };
    filters.appendChild(filterSelect);
};

const selectFilterByZone = () => {
    const select = createSelectFilterZone();
    filterSelectZone.onchange = (e) => {
        const elementTarget = e.target.value;
        const zonas = data.find((zona) => zona.zone === elementTarget);
        showZonas(zonas);
    };
    filters.appendChild(filterSelectZone);
};

// Creamos los select

/**
 * Crear cantidad de ambientes!!
 * @returns params
 */

/**
 * Creamos el filtrado por Barrios
 * @returns Array[]
 */

const createSelectFilterNeighborhood = () => {
    let reduce = data.reduce(
        (map, obj) => map.set(obj.neighborhood, obj),
        new Map()
    );
    const options = reduce.forEach((item) => {
        const elementOption = document.createElement("option");
        elementOption.innerHTML = item.neighborhood;
        elementOption.classList = "selectOption";
        elementOption.value = item.neighborhood;
        elementOption.tagName = item.neighborhood;
        filterSelect.appendChild(elementOption);
    });

    return options;
};

/**
 * Creamos el filtrado por Zonas
 * @returns Array[]
 */
const createSelectFilterZone = () => {
    let reduce = data.reduce((map, obj) => map.set(obj.zone, obj), new Map());
    const options = reduce.forEach((item) => {
        const elementOption = document.createElement("option");
        elementOption.innerHTML = item.zone;
        elementOption.classList = "selectOption";
        elementOption.value = item.zone;
        elementOption.tagName = item.zone;
        filterSelectZone.appendChild(elementOption);
    });

    return options;
};

const createFilterButton = (text, fn) => {
    const createFilterButton = document.createElement("button");
    createFilterButton.setAttribute("type", "button");
    createFilterButton.setAttribute("class", fn);
    createFilterButton.innerText = text;
    return createFilterButton;
};

// Agregamos y quitamos la clase a los botones
const getActiveClass = () => {
    buttons.forEach((button) => {
        button.addEventListener("click", function() {
            buttons.forEach((btn) => btn.classList.remove("button--active"));
            this.classList.add("button--active");
        });
    });
};

/**
 * Elegimos el THEME  desde localStorage
 * @param {*} theme
 */


const toggleTheme = (theme) => {
    BODY.classList.remove("theme-dark", "theme-light", "theme-auto", "theme-null");
    BODY.classList.add(`theme-${theme}`);
};

document.addEventListener("DOMContentLoaded", () => {
    const storageTheme = localStorage.getItem("theme");
    if (storageTheme === " ") document.body.classList.remove("theme-null");
    if (storageTheme === " ") switchTheme.removeAttribute("checked");
    if (storageTheme === "dark") switchTheme.setAttribute("checked", "checked");

    BODY.classList.add(`theme-${storageTheme}`);
    switchTheme.onchange = () => {


        let value;
        if (switchTheme.checked ? (value = "dark") : (value = "light"))
            localStorage.setItem("theme", value);
        toggleTheme(value);
    };
});

getActiveClass();
createLessPrice(getResults);
createHighPrice(getResults);