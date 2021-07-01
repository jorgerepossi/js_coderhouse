/*
 * Clase 06
 * Curso JavaScript
 * Camada 14470
 * Profesora: Laura Gonzalez Martin
 * Tutor: Facundo Casas Cau
 * Alumno: Jorge Repossi
 * Desafío: Incorporar Arrays
 */
/* 
var app = document.querySelector("#outputText");
const sort = document.querySelector("#sort");
let zona = "";
const arrayAlquilar = [];

class Alquilar {
	constructor(zona, barrio, calle, precio) {
		this.zona = zona;
		this.barrio = barrio;
		this.calle = calle;
		this.precio = precio;
	}

	elegirZona() {
		const select = this.zona;

		const MOSTRAR_ZONA = {
			1: "Zona Norte",
			2: "Zona Sur ",
			3: "Zona Oeste",
			4: "Centro",
		};

		return MOSTRAR_ZONA[select];
	}

	elegirUbicacion() {
		const select = this.calle;

		const MOSTRAR_UBICACION = {
			1: "Avenida",
			2: "Cerca del Tren ",
			3: "Cerca del Centro",
		};

		return MOSTRAR_UBICACION[select];
	}

	resultadoBuqueda() {
		const items = arrayAlquilar.map((item) => {
			const obj = `
      <li> La zona  es ${item.zona}</li>
      <li> El barrio es ${item.barrio}</li>
      <li> La ubicación deseada es: ${item.calle} </li>
      <li> El precio del alquiler es de: $${item.precio}</li>`;
			return obj;
    });
    

let ulList = document.createElement("ul");
ulList.innerHTML = items;

app.appendChild(ulList); 
		return items;
	}
}

const buscarAlquiler = () => {
	const mostrarZonas = (item) => {
		const select = item;

		const MOSTRAR_ZONA = {
			1: "Zona Norte",
			2: "Zona Sur ",
			3: "Zona Oeste",
			4: "Centro",
		};

		return MOSTRAR_ZONA[select];
	};
	let cantidadABuscar = parseInt(
		prompt("indique la cantidad de busqueda que desea realizar")
	);
	for (let i = 0; i < cantidadABuscar; i++) {
		let zona = prompt(
			"Ingrese una zona buscar\n1 Zona Norte\n2 Zona Sur\n3 Zona Oeste\n4 Centro"
		);
		let barrio = prompt("Igrese un barrio de " + mostrarZonas(zona));
		let calle = parseInt(
			prompt(
				"Ingrese la ubicación deseada en " +
					zona +
					" y barrio " +
					barrio +
					"\n1 Avenida\n2 Cerca del Tren\n3 cerca del Centro"
			)
		);
		let precio = parseInt(
			prompt("Indique el valor a pagar de alquiler que desea")
		);
		const seleccionarZona = new Alquilar(zona, null, null);
		const seleccionarUbicacion = new Alquilar(null, null, calle);
		const zonaSeleccionada = seleccionarZona.elegirZona();
		const ubicacion = seleccionarUbicacion.elegirUbicacion();
		const final = new Alquilar(zonaSeleccionada, barrio, ubicacion, precio);
		arrayAlquilar.push(final);

		final.elegirZona();
		final.elegirUbicacion();
		final.resultadoBuqueda();
	}
};
const Resultados = () => {
	console.log(
		arrayAlquilar.sort((a, b) => {
			return a.precio - b.precio;
		})
	);
};
const verResultados = () => {
	let resultados = true;

	resultados = confirm(
		"Desea ver su busqueda de menor a mayor precio de alquiler?"
	);
	if (resultados != true) {
		alert("Muchas Gracias por su tiempo!");
	}
	Resultados();
};
console.log(arrayAlquilar);


buscarAlquiler();
verResultados();
 */

let resultsColumnItem = document.querySelector(".results__column--wrapper");
const getHeight = resultsColumnItem.clientHeight;
resultsColumnItem.style = ` max-height: 980px;  height:${getHeight}px`;
