/**
 * @module App
 */
export default class App {
	/**
	 * Méthode principale. Sera appelée après le chargement de la page.
	 */
	static main() {
		// https://api.artic.edu/api/v1/artworks/search?q=cats
		var app = document.getElementById("app");
		this.chargerJson('https://api.artic.edu/api/v1/artworks/search?q=cats').then(donnees => {
			console.log(donnees);
			app.appendChild(this.html_listeTableaux(donnees.data));
		});
		var formRecherche = document.forms.recherche;
		formRecherche.addEventListener("submit", e => {
			e.preventDefault();
			var q = formRecherche.q.value;
			this.chargerJson(`https://api.artic.edu/api/v1/artworks/search?q=${q}`).then(donnees => {
				console.log(donnees);
				const vieux = document.querySelector(".liste-tableaux")
				const neuf = this.html_listeTableaux(donnees.data);
				vieux.replaceWith(neuf);
			});	
		});
	}
	static mainDetails(id) {
		var app = document.getElementById("app");
		this.chargerJson(`https://api.artic.edu/api/v1/artworks/${id}`).then(donnees => {
			console.log(donnees);
			app.appendChild(this.html_details(donnees.data));
		});

	}
	static html_listeTableaux(tTableaux) {
		var divListe = document.createElement("div");
		divListe.classList.add("liste-tableaux");
		// resultat.innerHTML = "llllltableau";
		for (let i = 0; i < tTableaux.length; i += 1) {
			const objTableau = tTableaux[i];
			divListe.appendChild(this.html_tableau(objTableau))
		}
		return divListe;
	}
	static html_tableau(objTableau) {
		var divTableau = document.createElement("div");
		divTableau.appendChild(this.html_titreTableau(objTableau.title, objTableau.id))
		return divTableau;
	}
	static html_details(objTableau) {
		var resultat = document.createElement("div");
		resultat.classList.add("details");
		resultat.appendChild(this.html_titreTableau(objTableau.title, objTableau.id))
		resultat.appendChild(this.html_imageTableau(objTableau.image_id));
		return resultat;
	}
	static html_titreTableau(titre, id) {
		var divTableau = document.createElement("h2");
		var a = divTableau.appendChild(document.createElement("a"));
		a.href = `tableau.html?id=${id}`;
		a.innerHTML = titre;
		return divTableau;
	}
	static html_imageTableau(image_id) {
		var resultat = document.createElement("figure");
		var img = resultat.appendChild(document.createElement("img"));
		img.src = `https://www.artic.edu/iiif/2/${image_id}/full/421,/0/default.jpg`;
		return resultat;
	}
	static chargerJson(url) {
		return new Promise(resolve => {
			var xhr = new XMLHttpRequest();
			xhr.open("get", url);
			xhr.responseType = "json";
			xhr.addEventListener("load", e => {
				resolve(e.target.response); // Retourne les données
			});
			xhr.send();
		});
	}
}
