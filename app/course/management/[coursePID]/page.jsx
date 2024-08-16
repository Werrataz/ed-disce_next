// Cette page affiche si le cours est public ou privé et affiches également la liste des mail aillant accès au cours s'il est pivé
// Elle permet également d'afficher des stat sur le cours si l'option était demandée (jsp si je mets les sat dans la page ou si je créer un lien vers une autre page dan slaqeulle il y aura les stat)


// Il y a :
// Un truc qui contient une liste d'adresse mail (avec un bouton pour rajouter un champ)
// Je peux faire ça avec un champ de formulaire stylisé sur lequel on enlève les bordures
// Une zone avec les informations détaillées sur le cours (notamment avec la liste des flashcards liées au cours (juste les titres))
// La première partie de l'écran est séparée en 2 avec une zone avec les informations et une zone avec les flashcards.
// Il faudra gérer les envois à l'api
// Un bouton pour rendre le cours public ou privé (remarque : je pourrais rajouter ce bouton sur la page précédente si ça s'y prête)
// Une zone avec un bouton qui renvoie vers la page "statistics", et qui est pour l'instant grisé et inutilisable (affiche un message : cette fonctionnalité arrive prochainement)
// L'état du bouton sera montré visuellement en css (avec un background qui change de couleur en fonction de si le cours est partagé ou non)
"use client";
import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { CourseFetcher } from '../../../../fetchers/course_fetcher.js';

import '../../../css/features/loadings.css';

function Page() {
    const { coursePID } = useParams();
    console.log(coursePID);
    const [state, setState] = useState('sd');
    const [courseFetcher, setCourseFetcher] = useState(new CourseFetcher({ publicIdentifier: coursePID }));

    useEffect(() => {
        const getCourse = async () => {
            try {
                await courseFetcher.restore();
                setCourseFetcher(courseFetcher);
                setState('loaded');
            } catch (error) {
                console.error(error);
                setState('error');
            }
        };
        getCourse();
    }, []);

    // useEffect(async () => {
    //     await courseFetcher.amend();
    // }, [courseFetcher]);

    const handleShared = () => {
        const newFetcher = { ...courseFetcher };
        newFetcher._delta.shared = !newFetcher._delta.shared;
        setCourseFetcher(newFetcher);
    }

    return (
        <div>
            {state === 'loading' ? <div className='spinner'></div> :
                state === 'error' ? <div>Erreur lors du chargement de la page</div> :
                    <div>
                        <div>
                            <div>
                                <h2>Informations sur ce cours</h2>
                                <div>
                                    <button onClick={handleShared}>{courseFetcher._delta.shared ? "Ce cours est public" : "Ce cours est privé"}</button>
                                </div>
                            </div>
                            <div>
                                {/* Zone contenant la liste des flashcards */}
                            </div>
                        </div>
                        <div>
                            {/* Zone affichant la liste d'adresses email */}
                        </div>
                    </div>
            }
        </div>
    );
}

export default Page;