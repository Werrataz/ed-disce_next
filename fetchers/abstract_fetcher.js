class AbstractFetcher {
    constructor(delta) {
        this._delta = delta;
        // const tokens = localStorage.getItem("tokens");
        // this.refresh = tokens.refresh ?? null;
        // this.access = tokens.access ?? null;
    }

    get() {
        return this._delta;
    }

    set(delta) {
        this._delta = delta;
    }

    merge(delta) {
        this._delta = Object.assign({}, this._delta, delta);
    }

    // Récuère les données d'une instance de la flashcard via l'api. !!attention on ne peut pas get le publicIdentifier (puisqu'il sert à obtenir les autres données)!!
    async restore(url) {
        let response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                // "Authorization": `Bearer ${this.accessTokens}`,
            },
        });
        if (response.ok) {
            const delta = await response.json();
            return await delta;
            // } else if (response.status === 401) {
            //     const refreshResponse = await fetch(url, {
            //         method: "GET",
            //         headers: {
            //             "Content-Type": "application/json;charset=utf-8",
            //             "Authorization": `Bearer ${this.accessTokens}`,
            //         },
            //     });
            //     if (refreshResponse.ok && refreshResponse.access) {
            //         this.access = refreshResponse.access;
            //         localStorage.setItem("tokens", JSON.stringify({ access: this.accessTokens, refresh: this.refreshTokens }));
            //         const secondResponse = await fetch(url, {
            //             method: "GET",
            //             headers: {
            //                 "Content-Type": "application/json;charset=utf-8",
            //                 "Authorization": `Bearer ${this.accessTokens}`,
            //             },
            //         });
            //         if (response.ok) {
            //             const delta = await response.json();
            //             return await delta;
            //         } else {
            //             console.log("Erreur : " + response.status);
            //             return {};
            //         }
            //     } else {
            //         console.log("Erreur : " + response.status);
            //         return 0;
            //     }
        } else {
            console.log("Erreur : " + response.status);
            return {};
            // Eventuellemen créer une fonction error qui gère toutes les erreurs et l'appeler ici
        }
    }

    async amend(url) {
        let response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify(this.get()),
        });
        if (response.status === 204) {
            return null;
        } else if (response.ok) {
            const delta = await response.json();
            return await delta;
        } else {
            console.log(response);
            return {};
            // Eventuellement créer une fonction error qui gère toutes les erreurs et l'appeler ici
        }
    }

    async create(url) {
        let response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                // "Authorization": `Bearer ${localStorage.getItem("tokens")}`,
            },
            body: JSON.stringify(this.get()),
        });
        if (response.ok) {
            const delta = await response.json();
            return await delta;
        } else {
            console.log("Erreur : " + response.status);
            // Eventuellement créer une fonction error qui gère toutes les erreurs et l'appeler ici
            return {};
        }
    }

    async delete(url) {
        let response = await fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
        });
        if (response.ok) {
            return response.status;
        } else {
            console.log("Erreur : " + response.status);
            return {};
        }
    }
}

export { AbstractFetcher };
