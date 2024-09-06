// Cette page permet d'afficher un cours et de le modifier
// Elle hérite d'un layout qui ajoute un menu à gauche de l'écran


// A terme, cette page devra également contenir un lien vers le drive du cours
"use client";
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Loader from '@/components/Loader';
import Course from '@/components/Course';
import useManageCourse from '@/hooks/manageCourse';
import LANG from '@/config/language.config';

import '@/app/css/notes.css';

function Page() {

    // Créer un hook personnalisé pour gérer cette page
    // Faire en sorte que ce hook puisse être utilisé pour Course, mais aussi pour User et Flashcard
    // Je pourrais alors créer les composants flashcards comme des éléments prenant un delta et setDelta en paramètre
    // (Pareil pour l'élément course)
    // Bien penser l'architecture des pages avant d'attaquer le code

    // Tenter quelque chose avec ces bibliothéques après : 
    // https://www.npmjs.com/package/@blocknote/react
    // https://www.npmjs.com/package/@mdxeditor/editor
    // Ou en cherchant 'rich-text-editor' sur npm

    const { delta, setDelta, state, setState } = useManageCourse();

    console.log(delta);

    // useEffect(() => debounce(async () => {
    //     const courseFetcher = new CourseFetcher(delta);
    //     const response = await courseFetcher.amend();
    //     console.log(delta);
    //     console.log(response);
    //     if (response) {
    //         console.log('sauvegardé');
    //     } else {
    //         console.log('erreur : echec de la sauvegarde');
    //     }
    // }, 1000), [delta]);

    return (
        <Loader state={state} >
            <div className='separator-sep00213'></div>
            <Course delta={delta} setDelta={setDelta} />
        </Loader>
    );
}

export default Page;


// Récupérer les données du course
// (Gérer les erreurs)
// Afficher la liste des flashcards avec course.flashcards
// Afficher le contenu du cours (il faudra trouver un moyen d'obtenir le delta)