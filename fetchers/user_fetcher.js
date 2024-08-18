import { GLOBAL } from "../states/globals";
import { AbstractFetcher } from "./abstract_fetcher";

class UserFetcher extends AbstractFetcher {
  constructor(delta) {
    super(delta);
    this._delta.publicIdentifier === undefined
      ? console.log(
          "Attention, le publicIdentifier n'a pas été fourni lors de l'appel du constructeur. La communication avec l'API ne s'effectuera pas correctement."
        )
      : null;
    // Remarque : le serveur n'envoie jamais le mot de passe car il ne le conserve pas en claire
    // Il peut éventuellement envoyer un hash du mot de passe, mais cette fonctionnalitée ne doit pas être utilisée pour des raisons de sécurité et sera potentiellement incompatibles avec les versions futurs de l'API
    // L'utilisateur peut envoyer le mot de passe en claire au serveur. Le mot de passe sera alors haché à sa réception par le serveur
    // Pour plus de sécurité, il est possible de hacher le mot de passe deux fois (en js et sur le serveur)
    // Le hashage coté client doit par contre être non aléatoire (renvoyer tout le temps le même hash pour le même mot de passe)
  }

  async restorePID() {
    const url = `${GLOBAL.domainName}/generic-user/?email=${this._delta.email}`;
    const response = await super.restore(url);
    this.merge(response);
    return response;
  }

  async restore() {
    const url = `${GLOBAL.domainName}/user/${this._delta.publicIdentifier}/`;
    const response = await super.restore(url);
    this.merge(response);
    return response;
  }

  async restoreWithAuth() {
    const url = `${GLOBAL.domainName}/authentification/`;
    const response = await super.create(url);
    this.merge(response.user);
    GLOBAL.tokens = response.tokens;
    localStorage.setItem("tokens", JSON.stringify(response.tokens));
    return response;
  }

  async amend() {
    const url = `${GLOBAL.domainName}/user/${this._delta.publicIdentifier}/`;
    const response = await super.amend(url);
    this.merge(response);
    return response;
  }

  async secureAmend(password) {
    const url = `${GLOBAL.domainName}/generic-user/`;
    this.merge({ oldPassword: password });
    const response = await super.amend(url);
    this.set(response);
    return response;
  }

  async sendVerificationEmail() {
    // Envoie un email à l'email fourni dans la requête avec le code
    const url = `${GLOBAL.domainName}/send_email/send_code/`;
    const response = await super.create(url);
    this.merge(response);
    return response;
  }

  async create() {
    const url = `${GLOBAL.domainName}/generic-user/`;
    const response = await super.create(url);
    this.merge(response);
    return response;
  }

  async delete() {
    const url = `${GLOBAL.domainName}/user/${this._delta.publicIdentifier}/`;
    return await super.delete(url);
  }
}

export { UserFetcher };
