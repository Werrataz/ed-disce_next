import { useSearchParams } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';
import { UserFetcher } from '../../fetchers/user_fetcher';
import { debounce } from 'lodash';

const LoginPage = () => {
    const searchParams = useSearchParams();
    const [delta, setDelta] = useState({});

    useEffect(() => {
        async function fetchDelta() {
            const email = searchParams.get('email');
            if (email) {
                const userFetcher = new UserFetcher({ email: email });
                const response = await userFetcher.restorePID();
                if (await response && await response.publicIdentifier) {
                    localStorage.setItem('userPID', response.publicIdentifier);
                    await userFetcher.restore();
                    mergeDelta(delta, setDelta, userFetcher.get());
                }
            }
        }
        fetchDelta();
    }, []);

    // Il reste juste à créer les différents champs, et à ajouter une fonction qui envoie un create dans le cas ou le compte n'existe pas encore à la fin
    // Si le compte existe, il n'y a rien à faire

    return (
        <div>
            {!delta.publicIdentifier ? (
                <div>
                    <label>
                        Email :
                        <input type="email" value={delta.email} onChange={(e) => mergeDelta(delta, setDelta, { email: e.target.value })} />
                    </label>
                    <label>
                        Mot de passe :
                        <input type="password" onChange={(e) => mergeDelta(delta, setDelta, { password: e.target.value })} />
                    </label>
                    <button onClick={async () => {
                        const userFetcher = new UserFetcher(delta);
                        const response = await userFetcher.restorePID();
                        if (response && response.publicIdentifier) {
                            localStorage.setItem('userPID', response.publicIdentifier);
                            await userFetcher.restore();
                            mergeDelta(delta, setDelta, userFetcher.get());
                        }
                        // Ici, on doit faire une connection avec authentification
                        // Puis sauvegarder toutes les données dans le localStorage
                        // Pour renvoyer l'utilisteur sur la page demandée
                        // Pour la page demandée, l'idée serait de la récupérer en parametre, et de rediriger vers la page d'acceuil par défaut si on ne trouve rien
                    }}>Se connecter</button>
                </div>
            ) : !delta.email ? (
                <div>
                    <p>Email : </p>
                    <input type="text" onChange={(e) => mergeDelta(delta, setDelta, { email: e.target.value })} />
                </div>
            ) : null}
        </div>
    )
};

export default LoginPage;