import { GLOBAL } from "../states/globals";
import { AbstractFetcher } from "./abstract_fetcher";


class ReviewFetcher extends AbstractFetcher {

    constructor(delta) {
        // delta contient une flashcard, et une liste de publicIdentifier
        super(delta)
    }

    async amend() { // Met à jour la version de la flashcard enregistrée sur le serveur
        const url = `${GLOBAL.domainName}/flashcard_review/`;
        const response = await super.amend(url);
        console.log(response);
        this.merge(response);
        return response;
    }

    async create() { // Créer une nouvelle flashcard
        const url = `${GLOBAL.domainName}/flashcard_review/`;
        const response = await super.create(url);
        console.log(response);
        this.merge(response);
        return response;
    }
}

export { ReviewFetcher };