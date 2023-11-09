import Tableau from "./Tableau.js";

/**
 * @module App
 */
export default class App {
	/**
	 * Méthode principale. Sera appelée après le chargement de la page.
	 */
	static main() {
		Tableau.main();
	}
	static mainDetails() {
		Tableau.mainDetails(location.search.slice(4));

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
