import App from "./App.js";

export default class Tableau {
	/**
	 * Méthode principale. Sera appelée après le chargement de la page.
	 */
	static main() {
		// https://api.artic.edu/api/v1/artworks/search?q=cats
		var app = document.getElementById("app");
		App.chargerJson('https://api.artic.edu/api/v1/artworks').then(donnees => {
			console.log(donnees);
			app.appendChild(this.html_liste(donnees.data));
		});
		var formRecherche = document.forms.recherche;
		formRecherche.addEventListener("submit", e => {
			e.preventDefault();
			var q = formRecherche.q.value;
			this.chargerJson(`https://api.artic.edu/api/v1/artworks/search?q=${q}`).then(donnees => {
				console.log(donnees);
				const vieux = document.querySelector(".liste-tableaux")
				const neuf = this.html_liste(donnees.data);
				vieux.replaceWith(neuf);
			});	
		});
	}
	static mainDetails(id) {
		var app = document.getElementById("app");
		App.chargerJson(`https://api.artic.edu/api/v1/artworks/${id}`).then(donnees => {
			console.log(donnees);
			app.appendChild(this.html_details(donnees.data));
		});

	}
	static html_liste(tTableaux) {
		var divListe = document.createElement("div");
		divListe.classList.add("liste-tableaux");
		for (let i = 0; i < tTableaux.length; i += 1) {
			const objTableau = tTableaux[i];
			divListe.appendChild(this.html_carteListe(objTableau))
		}
		return divListe;
	}
	static html_carteListe(objTableau) {
		var divTableau = document.createElement("div");
		divTableau.classList.add("carte", "tableau");
		divTableau.appendChild(this.html_titre(objTableau.title, objTableau.id));
		divTableau.appendChild(this.html_artiste(objTableau.artist_ids,objTableau.artist_titles));
		divTableau.appendChild(this.html_thumbnail(objTableau.image_id, objTableau.thumbnail));
		return divTableau;
	}
	static html_details(objTableau) {
		var resultat = document.createElement("div");
		resultat.classList.add("details");
		resultat.appendChild(this.html_titre(objTableau.title, objTableau.id))
		resultat.appendChild(this.html_image(objTableau.image_id));
		return resultat;
	}
	static html_titre(titre, id) {
		var divTableau = document.createElement("h2");
		var a = divTableau.appendChild(document.createElement("a"));
		a.href = `tableau.html?id=${id}`;
		a.innerHTML = titre;
		return divTableau;
	}
	static html_thumbnail(image_id, thumbnail) {
		console.log(thumbnail, image_id);
		var resultat = document.createElement("figure");
		var img = resultat.appendChild(document.createElement("img"));
		if (thumbnail.width >= thumbnail.height) {
			img.src = `https://www.artic.edu/iiif/2/${image_id}/full/,240/0/default.jpg`;
		} else {
			img.src = `https://www.artic.edu/iiif/2/${image_id}/full/240,/0/default.jpg`;
		}
		return resultat;
	}
	static html_image(image_id) {
		var resultat = document.createElement("figure");
		var img = resultat.appendChild(document.createElement("img"));
		img.src = `https://www.artic.edu/iiif/2/${image_id}/full/421,/0/default.jpg`;
		return resultat;
	}
	static html_artiste(ids, titles) {
		var resultat = document.createElement("ul");
		resultat.classList.add("artistes");
		ids.forEach((id,i) => {
			var li = resultat.appendChild(document.createElement("li"));
			var a = li.appendChild(document.createElement("a"));
			a.href = `artiste.html?id=${id}`;
			a.innerHTML = titles[i];
		});
		return resultat;
	}
}
