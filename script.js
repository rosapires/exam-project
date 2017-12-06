function getData() {
	fetch("http://bbmedia.dk/ice_cut/wp-json/wp/v2/products?_embed").then(res => res.json()).then(showProducts);
}

function showProducts(data) {
	//console.log(data)
	let list = document.querySelector("#list");
	let template = document.querySelector("#productTemplate").content;
	let modal = document.querySelector("#modal");
	data.forEach(function (theProduct) {
		console.log(theProduct);
		let clone = template.cloneNode(true);
		let title = clone.querySelector("h1");
		let excerpt = clone.querySelector(".excerpt");
		let specs = clone.querySelector(".specs");
		let extra_price = clone.querySelector(".extra_price");
		let led = clone.querySelector(".led");
		let img = clone.querySelector("img");
		let features = clone.querySelector(".features");
		let detailsButton = clone.querySelector(".detailsButton");
		//console.log(detailsButton);
		//detailsButton.addEventListener('click', showDetails);
		detailsButton.addEventListener('click', function () {
			showDetails(theProduct);
		});
		modal.addEventListener('click', hideModal);
		title.textContent = theProduct.title.rendered;
		excerpt.textContent = theProduct.acf.product_description;
		features.textContent = theProduct.acf.extra_features_description;
		specs.innerHTML = "Specifications : " + theProduct.acf.product_specifications;
		extra_price.textContent = "Price for extra features: " + theProduct.acf.extra_features_price + " kr.";
		led.textContent = theProduct.acf.led;
		img.setAttribute("src", theProduct._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url);
		list.appendChild(clone);
	})
}

function hideModal() {
	modal.classList.add('hide');
}

function showDetails(data) {
	console.log(data);
	modal.querySelector(".modal-name").textContent = data.title.rendered;
	modal.querySelector('.modal-image').src = data._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url;
	modal.querySelector(".modal-specs").innerHTML = data.acf.product_specifications;
	modal.querySelector(".modal-features").innerHTML = data.acf.extra_features_description;
	modal.querySelector(".modal-led").innerHTML = data.acf.led;
	modal.querySelector(".modal-excerpt").textContent = data.acf.product_descripton;
	modal.querySelector(".modal-extra_price").textContent = "Extra features price: " + data.acf.extra_features_price + " kr.";
	modal.classList.remove('hide')
};
getData()
