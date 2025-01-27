import { GLOBAL } from "../states/globals";
import { AbstractFetcher } from "./abstract_fetcher";

class CourseFetcher extends AbstractFetcher {
  constructor(delta) {
    super(delta);
  }

  async generateFlashcards() {
    const url = `${GLOBAL.domainName}/generate_flashcards/`;
    const response = await super.create(url);
    return response;
  }

  async restore() {
    const url = `${GLOBAL.domainName}/course/${this._delta.publicIdentifier}/`;
    const response = await super.restore(url);
    this.merge(response);
    return response;
  }

  async getAll() {
    const url = `${GLOBAL.domainName}/course/?user=${this._delta.user}`;
    const response = await super.restore(url);
    return response;
  }

  async amend() {
    const url = `${GLOBAL.domainName}/course/${this._delta.publicIdentifier}/`;
    console.log(this._delta);
    const response = await super.amend(url);
    this.merge(response);
    return response;
  }

  async create() {
    const url = `${GLOBAL.domainName}/course/`;
    const response = await super.create(url);
    this.merge(response);
    return response;
  }

  async delete() {
    console.log(this._delta);
    const url = `${GLOBAL.domainName}/course/${this._delta.publicIdentifier}/`;
    return await super.delete(url);
  }
}

export { CourseFetcher };
