/**
 * Curso JavaScript
 * Camada 14470
 * Profesora: Laura Gonzalez Martin
 * Tutor: Emiliano Del Arco
 * Alumno: Jorge Repossi
 * Desafío:  Interactuar con HTML
 *
 */

const BODY = document.body;
var url = "js/properties.json";
let data = [];

let switchTheme = document.querySelector('input[type="checkbox"]');
let filters = document.querySelector(".filters__container");
let loader = document.querySelector(".loader");
let buttons = document.querySelectorAll(".button");
var lessPrice = document.querySelector("#lessPrice");
let highPrice = document.querySelector("#highPrice");
let totalResults = document.querySelector(".total_results");
let filterSelect = document.querySelector("#filterNeighborhood");
let filterSelectZone = document.querySelector("#filterZone");
let resultsColumnItem = document.querySelector("#results__column--wrapper");
let favoritesWrapper = document.querySelector("#favorites__wrapper--content");
let totalFav = document.querySelector("#getFavorites span");
let fragment = document.createDocumentFragment();
let favFragment = document.createDocumentFragment();
var saveFav = JSON.parse(localStorage.getItem("favorites"));
var getFav = localStorage.getItem("favorites");
let buttonDelete = document.querySelectorAll(".delete");
class Propertie {
  constructor() {}

  async getDataInfo() {
    let results = await fetch(url);
    data = await results.json();
    return data;
  }
  // Imprimimos  los mayores precios
  doMoreExpensive() {
    data.sort((a, b) => {
      return b.price - a.price;
    });
    printData(data);
  }
  //Imprimimos los menores precios
  doLessExpensive() {
    data.sort((a, b) => {
      return a.price - b.price;
    });
    properties.getTotalResults(data, "Total");
    printData(data);
  }
  // Imprimimos  todos los  precios
  doAll() {
    data.sort((a, b) => {
      return a.id - b.id;
    });
    properties.getTotalResults(data, "Total");
    printData(data);
  }
  // Filtramos por ciudad
  filterByCity(gd) {
    let filter = gd.filter((address) => address);
    filter.sort((a, b) => a.address.city.localeCompare(b.address.city));
    return filter;
  }

  // Imprimimos  por barrios
  showCity(selected) {
    const get = dataFilter(
      data,
      selected.address.location,
      selected.address.location
    );
    properties.getTotalResults(get, selected.address.location);
    printData(get);
  }

  // Imprimimos  por zona
  showZonas(selected) {
    const get = dataFilter(data, selected.address.city, selected.address.city);
    properties.getTotalResults(get, selected.address.city);
    createSelectFilterCity(properties.filterByCity(get));
    printData(get);
  }

  resetContent(reset) {
    if (reset)
      while (reset.hasChildNodes()) {
        reset.removeChild(reset.lastChild);
      }
  }

  returnBeds(data) {
    let beds = data <= 1 ? `${data} Ambiente` : `${data} Ambientes`;
    return beds;
  }

  getTotalResults(total, select) {
    const getTotal = (totalResults.innerHTML = `<p class="px-4">Se ${
      total.length == 1 ? "encontró" : "encontraron"
    } <b>${total.length}</b>  ${
      total.length < 2 ? "resultado" : "resultados"
    } en <b>${select} </b></p>`);
    return getTotal;
  }
}

const properties = new Propertie();
const prop = properties.getDataInfo();

/**
 * Creamos la función para traer los datos del JSON
 * Obtenemos los datos mediante un fetch
 */

const getResults = async () => {
  try {
    printData(await prop);
    selectFilterByZone(await prop);
    selectFilterByCity(await prop);
    createFilterAll(await prop);
    createSelectFilterCity(await prop);
    properties.getTotalResults(data, "total");
  } catch (err) {
    if (resultsColumnItem)
      resultsColumnItem.innerHTML =
        "<div class='flex items-center content-center justify-center info info-danger'> <span> <i class='fi fi-rr-exclamation'></i></span> Ha ocurrido un error </div>";
    console.log(err);
  }
};

/**
 * Creamos el template de los items a mostrar
 * @param {*} data
 */

const dataFilter = (data, index, select) => {
  let getArea = data.filter(
    ({ address }) => address.location === select || address.city === select
  );
  return getArea;
};

const printData = (data) => {
  // Verificamos que no esté vacío
  if (data.length < 0) {
    document.querySelector(".results__column--wrapper").innerHTML =
      "No se encontraron datos";
  } else {
    // Limpiamos el contenedor para poder cargar los nuevos
    properties.resetContent(resultsColumnItem);
    let template = document.querySelector("#template-results").content;
    let favo = JSON.parse(localStorage.getItem("favorites")) || [];

    data.forEach(
      ({
        id,
        address,
        type,
        currency,
        description,
        image,
        price,
        bedrooms,
      }) => {
        let dataId = id;

        let isFav = favo.find((el) => el.id == dataId);
        if (isFav) {
          template.querySelector(".iconFav").classList.add("disabled");
          template.querySelector(".iconFav").dataset.id = id;
        } else {
          template.querySelector(".iconFav").dataset.id = id;
          template.querySelector(".iconFav").classList.remove("disabled");
        }

        template
          .querySelector(".results__column--img picture img")
          .setAttribute("src", image);
        template.querySelector(".results__item--title").textContent =
          address.streetAddress;
        template.querySelector(
          ".results__item--type"
        ).innerText = `${type} ${properties.returnBeds(bedrooms)}`;
        template.querySelector(".results__item--zone").innerText =
          address.location;
        template.querySelector(".results__item--text").innerText = description;
        template.querySelector(
          ".results__item--price"
        ).innerText = `${currency}${String(price).replace(
          /(.)(?=(\d{3})+$)/g,
          "$1."
        )}`;
        template
          .querySelector(".results__column--item")
          .setAttribute("data-id", id + "" + price);
        template
          .querySelector("a.button")
          .setAttribute("href", "page.html?page=" + id);
        const cloneTemplates = template.cloneNode(true);
        fragment.appendChild(cloneTemplates);
      }
    );

    resultsColumnItem.append(fragment);
  }
};

// Creamos los botones con las  acciones a filtrar
// Filtra menor valor
const createLessPrice = () => {
  if (lessPrice) {
    lessPrice.innerText = "Menor Precio";
    lessPrice.onclick = () => properties.doLessExpensive();
  }
};

// Filtra mayor valor
const createHighPrice = () => {
  if (highPrice) {
    highPrice.innerText = "Mayor Precio";
    highPrice.onclick = () => properties.doMoreExpensive();
  }
};

// Reset todo
const createFilterAll = () => {
  const buttonCreated = createFilterButton("Reset", "button");
  buttonCreated.onclick = () => {
    properties.resetContent(filterSelect);
    properties.resetContent(filterSelectZone);
    createSelectFilterCity(data);
    createSelectFilterZone(data);
    properties.doAll();
  };

  filters.appendChild(buttonCreated);
};

/**
 * Crea el filtro de barrios
 */

//create filter city
const selectFilterByCity = (data) => {
  filterSelect.onchange = (e) => {
    const elementTarget = e.target.value;
    const barrios = data.find(
      ({ address }) => address.location === elementTarget
    );
    properties.showCity(barrios);
  };
  filters.appendChild(filterSelect);
};

const selectFilterByZone = (data) => {
  createSelectFilterZone();
  filterSelectZone.onchange = (e) => {
    const elementTarget = e.target.value;
    const zonas = data.find(({ address }) => address.city === elementTarget);
    properties.showZonas(zonas);
  };

  filters.appendChild(filterSelectZone);
};

// Creamos los select

/**
 * Crear cantidad de ambientes!!
 * @returns params
 */

/**
 * Imprimimos los resultados con un forEach
 * Recibimos el parámetro data para poder hacer los filtros
 * @param {*} data
 * Creamos el filtrado por Barrios
 * @returns Array[]
 */

const createSelectFilterCity = (search) => {
  let reduce = search.reduce(
    (map, obj) => map.set(obj.address.location, obj),
    new Map()
  );
  filterNeighborhood.innerHTML = ` <option value="Filtrar por Barrios" selected disabled>Filtrar por ${
    search[0].address.city == "Capital"
      ? "Barrios"
      : "Partidos / Localidades / Barrios"
  } </option>`;

  const options = reduce.forEach(({ address }) => {
    const elementOption = document.createElement("option");
    elementOption.innerHTML += address.location;
    elementOption.classList = "selectOption";
    elementOption.value = address.location;
    elementOption.tagName = address.location;
    filterSelect.appendChild(elementOption);
  });

  return options;
};

/**
 * Creamos el filtrado por Zonas
 * @returns Array[]
 */
const createSelectFilterZone = () => {
  let reduce = data.reduce(
    (map, obj) => map.set(obj.address.city, obj),
    new Map()
  );
  filterZone.innerHTML =
    '<option value="Filtrar por Zona" selected disabled>Filtrar por Zona</option>';
  const options = reduce.forEach(({ address }) => {
    const elementOption = document.createElement("option");
    elementOption.setAttribute("data-city", address.city);
    elementOption.innerHTML = address.city;
    elementOption.classList = "selectOption";
    elementOption.value = address.city;
    elementOption.tagName = address.city;
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
    button.addEventListener("click", function () {
      buttons.forEach((btn) => btn.classList.remove("button--active"));
      this.classList.add("button--active");
    });
  });
};

/**
 * Cremos la sección de Favoritos
 * @returns Params
 */
const createfavorites = () => {
  const click = resultsColumnItem.addEventListener("click", (e) => {
    e.target.classList.add("disabled");
    e.target.setAttribute("disabled", "disabled");
    getFavourites(e);
    getFavoritesLength();
  });
  return click;
};

/**
 * Eliminar favoritos
 */
const deleteFavorites = (id) => {
  let favoriteLocal = JSON.parse(localStorage.getItem("favorites"));
  let filterLocal = favoriteLocal.filter((x) => x.id != id);
  if (favoriteLocal.length == 0) {
    localStorage.removeItem(filterLocal);
    document.querySelector(".favorites__image").parentElement.remove();
    getFavoritesLength();
  } else {
    document.querySelector(".favorites__image").parentElement.remove();
    localStorage.setItem("favorites", JSON.stringify(filterLocal));
    getFavoritesLength();
    if (favoriteLocal.length - 1 == 0) {
      localStorage.removeItem("favorites");
      totalFav.classList.remove("show");
      totalFav.innerText = "";
    }
  }
  return deleteFavorites;
};

const favObject = (property) => {
  const favouriteStorage = {
    id: property.querySelector(".iconFav").dataset.id,
    address: property.querySelector(".results__item--title").textContent,
    price: property.querySelector(".results__item--price").textContent,
    image: property.querySelector(".results__column--img picture img").src,
    fav: true,
  };
  saveFavStorage(favouriteStorage);
};

const getFavourites = (e) => {
  let fav = e.target.classList.contains("iconFav");
  if (fav) favObject(e.target.parentNode);
  e.stopPropagation();
};

const saveFavStorage = (favouriteStorage) => {
  let saveFav = JSON.parse(localStorage.getItem("favorites"));
  let getFav = localStorage.getItem("favorites");

  if (getFav === null) {
    saveFav = [];
    saveFav.push(favouriteStorage);
    localStorage.setItem("favorites", JSON.stringify(saveFav));
  } else {
    saveFav.push(favouriteStorage);
    localStorage.setItem("favorites", JSON.stringify(saveFav));
    getFavoritesLength();
  }
};

const getIndexFn = () => {
  getFavoritesLength();
};

const printFavorite = () => {
  let template = document.querySelector("#template-favorites").content;

  let favoritesItems = JSON.parse(localStorage.getItem("favorites"));
  if (favoritesItems != null)
    favoritesItems.forEach(({ id, address, price, image }) => {
      properties.resetContent(favoritesWrapper);
      template
        .querySelector(".favorites__image")
        .parentNode.setAttribute("data-id", id);
      template
        .querySelector(".favorites__image img")
        .setAttribute("src", image);
      template
        .querySelector(".favorites__image img")
        .setAttribute("alt", address);
      template
        .querySelector(".favorites__image img")
        .setAttribute("title", address);
      template.querySelector(".favorites__name").innerHTML = address;
      template.querySelector(".favorites__price").innerHTML = price;
      template.querySelector(
        ".delete__favorite"
      ).innerHTML = `<buttom id="eliFav${id}" onclick="deleteFavorites(${id})"><i class="fi fi-rs-cross-small"></i></buttom>`;

      const cloneTemplatesFav = template.cloneNode(true);
      fragment.appendChild(cloneTemplatesFav);
    });
  favoritesWrapper.append(fragment);
};

const getFavoritesLength = () => {
  let saveFav = JSON.parse(localStorage.getItem("favorites"));
  let numsOfFavourites = "";
  if (saveFav === null || saveFav === undefined) {
    numsOfFavourites = totalFav.innerText = "";
  } else {
    totalFav.setAttribute("class", "show");
    numsOfFavourites = totalFav.innerText = saveFav.length;
    return numsOfFavourites;
  }
};

/**
 * Elegimos el THEME  desde localStorage
 * @param {*} theme
 */

const toggleTheme = (theme) => {
  BODY.classList.remove("theme-dark", "theme-light", "theme-auto");
  BODY.classList.add(`theme-${theme}`);
};

document.addEventListener("DOMContentLoaded", () => {
  getFavoritesLength();
  const storageTheme = localStorage.getItem("theme");
  if (localStorage.getItem("theme") === null) {
    BODY.classList.remove(`theme-light`);
  } else {
    BODY.classList.add(`theme-${storageTheme}`);
  }
  if (storageTheme === null) switchTheme.removeAttribute("checked");
  if (storageTheme === "dark") switchTheme.setAttribute("checked", "checked");

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

$(window).on("load", function () {
  $.ajax({
    type: "GET",
    url: url,
    data: data,
    dataType: "json",
    beforeSend: function () {
      $(".loading").html("loading...");
    },
    success: function (data) {
      createIndexBoxes(data);
      $(".loading").hide();
    },
  });

  $(".favorites__wrapper--inner-content").click(() => {
    console.log("hola");
  });
  const getFavoritesContent = () => {
    if (getFavoritesLength() != null)
      $(".favorites__wrapper").css(
        {
          transform: "translateX(0%)",
          transition: "all .5s cubic-bezier(1,0,0,1)",
        },
        "slow"
      );
  };
  const closeFavorites = () => {
    $(".favorites__wrapper").css(
      {
        transform: "translateX(100%)",
        transition: "all .5s cubic-bezier(1,0,0,1)",
      },
      "slow"
    );
  };

  $("#getFavorites").click(() => {
    $("#favorites__wrapper--content").html(printFavorite);
    getFavoritesContent();
  });
  $(".close").click(closeFavorites);

  const createIndexBoxes = (data) => {
    let reduce = data.reduce(
      (map, obj) => map.set(obj.address.city, obj),
      new Map()
    );

    let items = reduce.forEach(({ address, image }) => {
      let city = address.city;
      $(".list__places").append(getresultIndex(city, image, city));
    });
    return items;
  };

  const getTotalResults = (select) => {
    const gt = data.filter((item) => item.address.city == select);
    const getTotal = `<p class="py-4">Ver ${gt.length == 1 ? "el" : "los"} <b>${
      gt.length
    }</b>  ${gt.length < 2 ? "resultado" : "resultados"}</p>`;
    return getTotal;
  };

  const getresultIndex = (city, image) => {
    const create = `
			<div class="list__places--item">
			<a href="resultados.html">
			<div class="list__item">
			<div class="list__places--item--picture">
			<img src="${image}" class="" />
			</div>
			<p class="pb-4">Resultados en ${city} </p>
			<div class="list__places--item--text"> ${getTotalResults(city)}</div>
			</div>
			</a>
			</div> `;
    return create;
  };
});
