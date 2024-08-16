import { GLOBAL } from "../states/globals"; 
import { AbstractFetcher } from "./abstract_fetcher";


class FlashcardFetcher extends AbstractFetcher {

    constructor(delta) {

        super(delta)
        this._delta.publicIdentifier === undefined ? console.log("Attention, le publicIdentifier n'a pas été fourni lors de l'appel du constructeur. La communication avec l'API ne s'effectuera pas correctement.") : null;

    }

    async train() {
        const url = `${GLOBAL.domainName}/generate_exercise/`
        const response = await super.create(url);
        this.merge(response);
        return response.exercise
    }

    async correct() {
        const url = `${GLOBAL.domainName}/correct_exercise/`
        const response = await super.create(url);
        this.merge(response);
        return response.IAcorrection
    }

    // Récuère les données d'une instance de la flashcard via l'api. !!attention on ne peut pas get le publicIdentifier (puisqu'il sert à obtenir les autres données)!!
    async restore() {
        const url = `${GLOBAL.domainName}/flashcard/${this._delta.publicIdentifier}/`
        const response = await super.restore(url);
        this.merge(response)
        return response
    }

    async amend() {
        const url = `${GLOBAL.domainName}/flashcard/${this._delta.publicIdentifier}/`
        const response = await super.amend(url)
        this.merge(response)
        return response
    }

    async create() {
        const url = `${GLOBAL.domainName}/flashcard/`
        const response = await super.create(url)
        this.merge(response)
        return response
    }

    async delete() {
        const url = `${GLOBAL.domainName}/flashcard/${this._delta.publicIdentifier}/`;
        return await super.delete(url)
    }
}

export { FlashcardFetcher };