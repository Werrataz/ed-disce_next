"use client";
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { CourseFetcher } from '@/fetchers/course_fetcher';
import { mergeDelta } from '@/functions/merge';
import Loader from '../../../components/Loader';
import LANG from '../../../config/language.config';

// Faire la partie qui gére les erreurs dans cette page
// Finaliser ensuite le formulaire (page principale)
// Utiliser ensuite framer-motion ou CSSTransition pour les effets de transition en css
// (relire les infos envoyés par copilot à ce propos)


function Page() {
    const [delta, setDelta] = useState({});
    const [state, setState] = useState('loading');
    const [waitingForResponse, setWaitingForResponse] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const userPID = localStorage.getItem('userPID');
        const courseFetcher = new CourseFetcher({ user: userPID });
        if (userPID) {
            mergeDelta(delta, setDelta, courseFetcher.get());
            setState('loaded');
        } else {
            setState('disconnected');
        }
    }, []);

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        setWaitingForResponse(true);
        const courseFetcher = new CourseFetcher(delta);
        const response = await courseFetcher.create();
        if (await response && await response.publicIdentifier) {
            router.push(`/notes/${response.publicIdentifier}`);
        } else {
            console.log(response);
            // setState('error');
        }
    }, [delta]);

    return (
        <Loader state={state}>
            <div>
                <p>La qualité de nos services dépendent de la quantité d'information dont nous disposons. Vous pouvez nous fournir les informations nécessaires en complétant les champs ci-dessous.</p>
            </div>
            {waitingForResponse ? (
                <p>Cours créé avec succès ! Redirection en cours...</p>
            ) : (
                <div className='new-course-form-ncgf456'>
                    <label>
                        <p>Nom du cours: </p>
                        <input
                            type="text"
                            onChange={(e) => mergeDelta(delta, setDelta, { name: e.target.value })}
                        />
                    </label>
                    <br />
                    <label>
                        <p>Matière étudiée: </p>
                        <select onChange={(e) => mergeDelta(delta, setDelta, { subjectStudied: e.target.value })}>
                            {Object.entries(LANG.subjectStudied).map(([key, labelText], index) => (
                                <option key={index} value={key}>{labelText}</option>
                            ))}
                        </select>
                    </label>
                    <br />
                    <label>
                        <p>Niveau étduié : </p>
                        <select onChange={(e) => mergeDelta(delta, setDelta, { academicLevel: e.target.value })}>
                            {Object.entries(LANG.academicLevel).map(([key, labelText], index) => (
                                <option key={index} value={key}>{labelText}</option>
                            ))}
                        </select>
                    </label>
                    <label>
                        <p>Dans le cadre de quel cursus ce cours vous servira ? </p>
                        <input
                            type="text"
                            onChange={(e) => mergeDelta(delta, setDelta, { academicLevel: e.target.value })}
                        />
                    </label>
                    <br />
                    <label>
                        <p>Vous pouvez ajouter des informations complémentaires sur ce cours ici : </p>
                        <input
                            type="text"
                            onChange={(e) => mergeDelta(delta, setDelta, { academicLevel: e.target.value })}
                        />
                    </label>
                    <br />
                    <button disabled={waitingForResponse} onClick={handleSubmit}>
                        Valider
                    </button>
                </div>
            )}
        </Loader>
    );
}

export default Page;