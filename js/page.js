let root = document.querySelector("#root");

function getParamName(paramName) {
	let parameters = new URLSearchParams(window.location.search);
	return parameters.get(paramName);
}

const get =  getParamName('page')

root.innerHTML = get;

if (get == 'producto') {
   console.log('esta bien ') 
} else {
    console.log('es distinto')
}