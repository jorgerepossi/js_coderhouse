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
 const url = "js/properties.json";
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
 let totalFav = document.querySelector("#getFavorites span");
 let fragment = document.createDocumentFragment();
let getFav = localStorage.getItem("favorites");
let saveFav = JSON.parse(localStorage.getItem("favorites"));
 
  class Properties {
		constructor( id, address, area, beds, description, image, money, city, price, type ) {
			this.id = id;
			this.address = address;
			this.area = area;
			this.beds = beds;
			this.description = description;
			this.image = image;
			this.money = money;
			this.city = city;
			this.price = price;
			this.type = type;
		}

	resetContent(reset){
		while (reset.hasChildNodes()) {
			reset.removeChild(reset.lastChild);
		}
	  }
	}
 
	const resetOpt = new Properties();
 
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
		 selectFilterByCity(data);
		 createFilterAll(data);
		 createSelectFilterCity(data)
	 } catch (err) {
		 console.log(err);
	 }
 };
 
 
 /**
  * Creamos el template de los items a mostrar
  * @param {*} data
  */
 
 const printData = (data) => {
 
	 // Limpiamos el contenedor para poder cargar los nuevos
	 resetOpt.resetContent(resultsColumnItem)
	
	 // Verificamos que no esté vacío
	 if (data.length < 0) {
		 document.querySelector(".results__column--wrapper").innerHTML =
			 "No se encontraron datos";
	 } else {
 
		 let template = document.querySelector("#template-results").content;
		 let favo = JSON.parse(localStorage.getItem('favorites')) || [];
 
		 data.forEach(({
			 id, address,  type,  money,  description, image,  price, city
		 }) => {

			 if (data.length === 3) {
				 console.log('es divisible por tres')

			 }
			 let dataId = id;
 
			 let isFav = favo.find(el => el.id == dataId)
			 if (isFav) {
				 template.querySelector(".iconFav").classList.add('disabled');
				 template.querySelector(".iconFav").dataset.id = id;
			 } else {
				 template.querySelector(".iconFav").dataset.id = id;
				 template.querySelector(".iconFav").classList.remove('disabled');
 
			 }
 
			 template.querySelector(".results__column--img picture img").setAttribute("src", image);
			 template.querySelector(".results__item--title").textContent = address;
			 template.querySelector(".results__item--type").innerText = type;
			 template.querySelector(".results__item--zone").innerText = city;
			 template.querySelector(".results__item--text").innerText = description;
			 template.querySelector(".results__item--price").innerText = `${money}${String(price).replace(/(.)(?=(\d{3})+$)/g, "$1.")}`;
			 template.querySelector(".results__column--item").setAttribute("data-id", id + "" + price);
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

 // Imprimimos  por zona
const showZonas = (selected) => {
	let getArea = data.filter(({ area }) => area === selected.area);
	let filterByArea = getArea.filter((item) => item.city);

	resetOpt.resetContent(filterSelect)
	createSelectFilterCity(filterByArea);
	printData(getArea);

	totalResults.innerHTML = `<p class="px-4">Se ${getArea.length <= 1 ? "encontró" : "encontraron"} <b>${getArea.length}</b>  ${getArea.length < 2 ? "resultado" : "resultados"} en <b>${selected.area} </b></p>`;

};
 
 // Imprimimos  por barrios
 const showCity = (selected) => {
	 let getArea = data.filter(({city}) => city === selected.city );
	 printData(getArea);
	 totalResults.innerHTML = `<p class="px-4">Se ${getArea.length <= 1 ? "encontró" : "encontraron"} <b>${getArea.length}</b>  ${getArea.length < 2 ? "resultado" : "resultados"} en <b>${selected.city} </b></p>`;
 };
 
 // Creamos los botones con las  acciones a filtrar
 // Filtra menor valor
 const createLessPrice = () => {
	 if (lessPrice) {
		 lessPrice.innerText = "Menor Precio";
		 lessPrice.onclick = () => { showLessExpensive(data); };
	 }
 
 };
 
 // Filtra mayor valor
 const createHighPrice = () => {
	 if (highPrice) {
 
		 highPrice.innerText = "Mayor Precio";
		 highPrice.onclick = () => { showMoreExpensive(data); };
	 }
 };

 // Reset todo
 const createFilterAll = () => {
	 const buttonCreated = createFilterButton("Reset", "button");
	 buttonCreated.onclick = () => showAll();  
	 filters.appendChild(buttonCreated);
	 
 };
 
 /**
  * Crea el filtro de barrios
  */
 const selectFilterByCity = (search) => {
	 
	 filterSelect.onchange = (e) => {
		 const elementTarget = e.target.value;
		 const barrios = data.find(({ city }) => city === elementTarget);
		 showCity(barrios);
	 };
	 filters.appendChild(filterSelect);
 };
 
 const selectFilterByZone = (search) => {
	 createSelectFilterZone();
	 filterSelectZone.onchange = (e) => {
		 const elementTarget = e.target.value;
		 const zonas = data.find(({ area }) => area === elementTarget);
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
  * Imprimimos los resultados con un forEach
  * Recibimos el parámetro data para poder hacer los filtros
  * @param {*} data
  */
 
 
 /**
  * Creamos el filtrado por Barrios
  * @returns Array[]
  */
 
const createSelectFilterCity = (search) => {

 let reduce = search.reduce((map, obj) => map.set(obj.city, obj), new Map());

		const options = reduce.forEach(({ city }) => {
			const elementOption = document.createElement("option");
			elementOption.innerHTML = city;
			elementOption.classList = "selectOption-";
			elementOption.value = city;
			elementOption.tagName = city;
			filterSelect.appendChild(elementOption);
		});
		
		return options;
}
 
 
 /**
  * Creamos el filtrado por Zonas
  * @returns Array[]
  */
 const createSelectFilterZone = () => {
	 let reduce = data.reduce((map, obj) => map.set(obj.area, obj), new Map());
	 const options = reduce.forEach(({area, city}) => {
		 const elementOption = document.createElement("option");
		 elementOption.setAttribute('data-city', city);
		 elementOption.innerHTML = area;
		 elementOption.classList = "selectOption";
		 elementOption.value = area;
		 elementOption.tagName = area;
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
 
 
 const createfavorites = () => {
	 const click = resultsColumnItem.addEventListener("click", (e) => {
		 e.target.classList.add("disabled");
		 e.target.setAttribute("disabled", "disabled");
		 getFavourites(e);
		 getFavoritesLength();
	 });
	 return click;
 };
 
 const getFavourites = (e) => {
	 let fav = e.target.classList.contains("iconFav");
	 if (fav) favObject(e.target.parentNode);  
	 e.stopPropagation();
 };
 
 const favObject = (property) => {
	 const favouriteStorage = {
		 id: property.querySelector(".iconFav").dataset.id,
		 address: property.querySelector(".results__item--title").textContent,
		 price: property.querySelector(".results__item--price").textContent,
		 fav: false
	 };
 
	 saveFavStorage(favouriteStorage);
 };
 
const saveFavStorage = (favouriteStorage) => {
	getFav === null ? (saveFav = []) : getFavoritesLength();
	saveFav.push(favouriteStorage);
	localStorage.setItem("favorites", JSON.stringify(saveFav));
};
 
 const getFavoritesLength = () => {
		let numsOfFavourites = "";
		if (saveFav === null) {
			numsOfFavourites = totalFav.innerText = "0";
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
	 BODY.classList.remove(
		 "theme-dark",
		 "theme-light",
		 "theme-auto",
		 "theme-null"
	 );
	 BODY.classList.add(`theme-${theme}`);
 };
 
 document.addEventListener("DOMContentLoaded", () => {
	 getFavoritesLength();
	 const storageTheme = localStorage.getItem("theme");
	 if (localStorage.getItem("theme") === null) {
		 BODY.classList.add(`theme-light`);
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
 
 
 const getIndexFn = () => {
	 getFavoritesLength();
 }
 
 getActiveClass();
 createLessPrice(getResults);
 createHighPrice(getResults);