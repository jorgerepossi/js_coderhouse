let root = document.querySelector("#root");
let pageInfo = document.querySelector("#pageInfo");
let fragmentPage = document.createDocumentFragment();

function getParamName(paramName) {
  let parameters = new URLSearchParams(window.location.search);
  return parameters.get(paramName);
}

const get = getParamName("page");

let idParams = get;

const getParamsUrl = async () => {
  const url = await fetch("js/properties.json");
  const data = await url.json();
  const page = data.find(({ id }) => id == idParams);
  const nextPage = parseFloat(idParams) + 1;
  const prevPage = parseFloat(idParams) - 1;
  if (page) {
    let template = document.querySelector("#content").content;

    template.querySelector(
      ".prev"
    ).innerHTML = `<a href="?page=${prevPage}" title="prev" class="button"><i class="fi fi-rs-angle-small-left">  </i> </a>`;
    template.querySelector(
      ".next"
    ).innerHTML = `<a href="?page=${nextPage}" title="next" class="button"><i class="fi fi-rs-angle-small-right">  </i> </a>`;

    template.querySelector(".cover__first img").setAttribute("src", page.image);
    template
      .querySelector(".cover__first img")
      .setAttribute("alt", page.address.streetAddress);

    template.querySelector(".page__title h2").innerText = page.title;
    template.querySelector(".page__address").innerHTML =
      page.address.streetAddress;
    template.querySelector(".page__location").innerText =
      " " + page.address.location;
    template.querySelector(".page__city").innerText = " " + page.address.city;
    template.querySelector(".page__type").innerText = page.type;
    template.querySelector(".page__currency").innerText = page.currency;
    template.querySelector(".page__bedrooms").innerText = page.bedrooms;
    template.querySelector(".page__bathrooms").innerText = page.bathrooms;

    template
      .querySelector(".img-first")
      .setAttribute("src", page.images.image_1);
    template
      .querySelector(".img-second")
      .setAttribute("src", page.images.image_2);
    template
      .querySelector(".img-third")
      .setAttribute("src", page.images.image_3);
    template
      .querySelector(".img-four")
      .setAttribute("src", page.images.image_4);

    template.querySelector(".page__price").innerText = String(
      page.price
    ).replace(/(.)(?=(\d{3})+$)/g, "$1.");
    template.querySelector(".results__item--text").innerText =
      page.longdescription;

    const cloneTemplates = template.cloneNode(true);
    fragmentPage.appendChild(cloneTemplates);
    pageInfo.append(fragmentPage);
  } else {
    root.innerHTML =
      "<div class='loader'> No hemos encontrado lo que buscas</div>";
  }

  const name = document.querySelector("#name");
  const email = document.querySelector("#email");
  const send = document.querySelector(".send");
  const alertMessage = () => {
    const msg = `<p>Muchas gracias ${name.value}</p>
    <p> A la brevedad nos estaremos comunicando con Ud. por medio del mail
    ${email.value}</p>`;
    return msg;
  };

  document.querySelector(".closeModal").addEventListener("click", () => {
    document.querySelector(".modalContainer").classList.add("out");
    name.value = "";
    email.value = "";
  });
  send.addEventListener("click", () => {
    if (name.value != "" && email.value != "") {
      document.querySelector(".modalContainer").classList.remove("out");
      document.querySelector(".modalInfo p").innerHTML = alertMessage();
      document.querySelector(".errorMsg").innerHTML = "";
    } else {
      document.querySelector(".errorMsg").innerHTML =
        "<div class='info info-alert'> Debes llenar los campos </div>";
    }
    //alert(name.value);
  });
};

if (get == idParams) {
  getParamsUrl();
} else {
  document.write(' <div class="loader"><span class="rotate"></span></div>');
}
