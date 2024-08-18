import React, { useState } from 'react';
import { CourseFetcher } from '@/fetchers/course_fetcher';
import { mergeDelta } from '@/functions/merge';

// Faire la partie qui gére les erreurs dans cette page
// Finaliser ensuite le formulaire (page principale)
// Utiliser ensuite framer-motion ou CSSTransition pour les effets de transition en css
// (relire les infos envoyés par copilot à ce propos)


const Redirection = () => {
    return (
        <div>
            <p>Cours créé avec succès ! Redirection en cours...</p>
        </div>
    );
};

function Page() {
    const [delta, setDelta] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userPID = localStorage.getItem('userPID');
        mergeDelta(delta, setDelta, { user: userPID });
        await CourseFetcher.create(delta);
        setIsSuccess(true);
        setTimeout(() => {
            window.location.href = `/courses/${delta.publicIdentifier}`;
        }, 3000);
    };

    return (
        <div>
            {isSuccess ? (
                <p>Données envoyées avec succès ! Redirection en cours...</p>
            ) : (
                <form onSubmit={handleSubmit}>
                    <label>
                        <p>Matière étudiée: </p>
                        <input
                            type="text"
                            onChange={(e) => mergeDelta(delta, setDelta, { subjectStudied: e.target.value })}
                        />
                    </label>
                    <br />
                    <label>
                        <p>Niveau des études: </p>
                        <input
                            type="text"
                            onChange={(e) => mergeDelta(delta, setDelta, { academicLevel: e.target.value })}
                        />
                    </label>
                    <br />
                    <button type="submit" disabled={isLoading}>
                        {isLoading ? 'Envoi en cours...' : 'Valider'}
                    </button>
                </form>
            )}
        </div>
    );
};

export default Page;