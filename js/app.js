let app = document.querySelector("#outputText");
let question;
let home;
let apartment;
let storage;
let order = " ";
var type = " ";
let date;
var rooms = "";
const alertMovingMsg = (text) => {
  return alert("La habitación es un " + text + "");
};

const alertMovingStorageMsg = (text) => {
  return alert("El tipo de ayuda necesaria es: " + text + "");
};

// Casa
const movingHome = (home) => {
  let question = parseInt(
    prompt(
      "¿Qué cantidad de habitaciones desea mudar? \n1 Habitación \n2 Habitaciones\n3 Habitaciones "
    )
  );
  let date = prompt("Por favor indique la fecha de la mudanza ej: 01/12/2021");
  switch (home) {
    case 1:
      home = question;
      date = date;
      break;
    case 2:
      home = question;
      date = date;
      break;
    case 3:
      home = question;
      date = date;
      break;
  }

  for (let i = 1; i <= home; i++) {
    let move = parseInt(
      prompt("Nombre de la habitación? \n1 Living \n2 Cocina \n3 Comendor")
    );
    switch (move) {
      case 1:
        move = "Living";
        alertMovingMsg(move);
        break;
      case 2:
        move = "Cocina";
        alertMovingMsg(move);
        break;
      case 3:
        move = "Comedor";
        alertMovingMsg(move);
        break;
      default:
        app.innerHTML = "¡Por el momento no estamos realizando esas mudanzas! ";
        break;
    }

    order = order += move + ", ";
    app.innerHTML =
      "Realizaremos la mudanza de: <b>" +
      order +
      "</b><br> En la fecha: " +
      date;
  }

  return question;
};

// Departamento
const movingApartment = (apartment) => {
  let question = parseInt(
    prompt(
      "¿Qué tipo de mudanza desea realizar?\n1 Básica  - 1 módulo \n2 Media - 2 módulos\n3 Completa - 3 módulos"
    )
  );
  if (question === 1 || question === 2 || question === 3) {
    let date = prompt(
      "Por favor indique la fecha de la mudanza ej: 01/12/2021"
    );

    switch (question) {
      case 1:
        apartment = question;
        type = question + " Básico";
        break;
      case 2:
        apartment = question;
        type = question + " Media";
        break;
      case 3:
        apartment = question;
        type = question + " Completo";
        break;
      default:
        confirm("Desea continuar?");
        break;
    }

    for (let i = 1; i <= apartment; i++) {
      let move = parseInt(
        prompt("Nombre de la habitación? \n1 Living \n2 Cocina \n3 Comendor")
      );
      switch (move) {
        case 1:
          move = "Living";
          alertMovingMsg(move);
          break;
        case 2:
          move = "Cocina";
          alertMovingMsg(move);
          break;
        case 3:
          move = "Comedor";
          alertMovingMsg(move);
          break;
        default:
          app.innerHTML =
            "¡Por el momento no estamos realizando esas mudanzas! ";
          break;
      }

      order = order += move + ", ";
      app.innerHTML =
        "Realizaremos la mudanza de tipo: " +
        type +
        "<br> <b>" +
        order +
        "</b><br> En la fecha: " +
        date;
    }
  } else {
    confirm("Desea continuar con el pedido?");
  }

  return question;
};

// Local
const movingStore = (storage) => {
  let question = parseInt(
    prompt(
      "¿Cuá es el tipo de ayuda que necesita para la mudanza?\n1 Básica \n2 Media\n3 Full"
    )
  );
  let date = prompt("Por favor indique la fecha de la mudanza ej: 01/12/2021");

  switch (question) {
    case 1:
      storage = question;
      type = question + " Básica";
      date = date;
      break;
    case 2:
      storage = question;
      type = question + " Media";
      date = date;
      break;
    case 3:
      storage = question;
      type = question + " Full";
      date = date;

      break;
    default:
      app.innerHTML = "¡Por el momento no estamos realizando esas mudanzas! ";
      break;
  }

  for (let i = 1; i <= storage; i++) {
    let move = parseInt(
      prompt(
        "¿Qué tipo de ayuda necesita? \n1 - Peones  \n2 - Cajas y canastos \n3 - Carros y embalaje"
      )
    );
    switch (move) {
      case 1:
        move = " peones ";

        alertMovingStorageMsg(move);
        break;
      case 2:
        move = "cajas y canastos";

        alertMovingStorageMsg(move);
        break;
      case 3:
        move = "carros y embalaje ";

        alertMovingStorageMsg(move);
        break;
      default:
        app.innerHTML = "¡Por el momento no estamos realizando esas mudanzas! ";
        break;
    }
    order = order += move + ", ";
    app.innerHTML =
      "El tipo de ayuda que necesita es: " +
      type +
      "<br> Servicio de <b>" +
      order +
      "</b><br> En la fecha: " +
      date;
  }

  return question;
};

const movingCenter = () => {
  movingChoose();
};

// Mudanza
const movingChoose = () => {
  question = parseInt(
    prompt("¿Qué desea mudar?\n1 Casa?\n2 Departamento?\n3 Local?\n4 Salir")
  );

  switch (question) {
    case 1:
      movingHome(question, date);
      break;
    case 2:
      movingApartment(question, date, type);
      break;
    case 3:
      movingStore(question, date, type);
      break;
    case 4:
      console.log("salir");
      break;
    default:
      question = confirm("Debe seleccionar los items indicados");
      break;
  }
};

const calculate = (firstParam, operation, secondParam) => {
  switch (operation) {
    case "+":
      return firstParam + secondParam;

    case "-":
      return firstParam - secondParam;

    case "*":
      return firstParam * secondParam;

    case "/":
      return firstParam / secondParam;

    default:
      return 0;
  }
};

const rentChoose = () => {
  question = parseInt(
    prompt("¿En que zona desea alquilar? \n1 Centro\n2 Palermo\n3 Recoleta")
  );
  rooms = parseInt(
    prompt(
      "¿Qué cantidad de habitaciones necesita?\n1 habitación \n2 habitaciones \n3 habitaciones"
    )
  );
  switch (question) {
    case 1:
      room = roomChoose(rooms);
      question = "Zona Centro  - Maipú 123 - 1er Piso - $" + room;

      break;
    case 2:
      room = roomChoose(rooms);
      question =
        "Zona Palermo - Guardia Vieja 321 - 7mo Piso - $" +
        calculate(room, "+", 5000);
      break;
    case 3:
      room = roomChoose(rooms);
      question =
        "Zona Recoleta - Alvear 231 - Semi Piso - $" + calculate(room, "*", 2);
      break;
  }

  app.innerHTML = "Su elección fue: " + question;
  console.log("alquiler");
};

const roomChoose = (choose) => {
  switch (choose) {
    case 1:
      return (price = 35000);
    case 2:
      return (price = 45000);
    case 3:
      return (price = 55000);
    default:
      return (price = "No seleccionó cantidad de habitaciones");
  }
};

// Alquiler
const rentAparment = () => {
  rentChoose();
};

const selectorChoose = () => {
  question = parseInt(
    prompt(
      "¡Hola! ¿Cuál es la acción que desea realizar?\n1 Alquiler?\n2 Mudanza? "
    )
  );
  switch (question) {
    case 1:
      rentAparment();
      break;
    case 2:
      movingCenter();
      break;
    default:
      console.log("no");
      break;
  }
};

const chooseOne = () => {
  return selectorChoose();
};

let choose_one = chooseOne();
