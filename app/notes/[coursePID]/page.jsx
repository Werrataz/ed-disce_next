// Cette page permet d'afficher un cours et de le modifier
// Elle hérite d'un layout qui ajoute un menu à gauche de l'écran


// A terme, cette page devra également contenir un lien vers le drive du cours
"use client";
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from "next/link";
import { CourseFetcher } from '@/fetchers/course_fetcher';
import { debounce } from 'lodash';
import Loader from '@/components/Loader';
import { mergeDelta } from '@/functions/merge';
import Course from '@/components/Course';
import LANG from '../../../config/language.config';


function Page() {



    // Créer un hook personnalisé pour gérer cette page
    // Faire en sorte que ce hook puisse être utilisé pour Course, mais aussi pour User et Flashcard
    // Je pourrais alors créer les composants flashcards comme des éléments prenant un delta et setDelta en paramètre
    // (Pareil pour l'élément course)
    // Bien penser l'architecture des pages avant d'attaquer le code

    const [state, setState] = useState('loading');
    const [delta, setDelta] = useState({});
    const [courseList, setCourseList] = useState([]);
    const { coursePID } = useParams();

    console.log(delta);

    useEffect(() => {
        async function fetchCourse() {
            if (coursePID) {
                const courseFetcher = new CourseFetcher({ publicIdentifier: coursePID });
                await courseFetcher.restore();
                mergeDelta(delta, setDelta, await courseFetcher.get());
                setState('loaded');
            } else {
                setState('error');
            }
        }
        fetchCourse();
    }, []);


    useEffect(() => {
        debounce(async () => {
            const courseFetcher = new CourseFetcher(delta);
            const response = await courseFetcher.amend();
            if (response) {
                console.log('sauvegardé');
            } else {
                console.log('erreur : echec de la sauvegarde');
            }
        }, 1000);
    }, [delta]);

    return (
        <Loader state={state} >
            <nav className='list-course-navlcroa14'>
                {delta.flashcards ? (delta.flashcards.length === 0 ? <p>Aucune flashcard créé</p> : delta.flashcards.map((flashcard) => (
                    <Link key={flashcard.publicIdentifier} href={`/notes/${delta.publicIdentifier}/${flashcard.publicIdentifier}`}><p>{flashcard.title}</p></Link>
                ))) : <p>Chargement...</p>}
            </nav>
            {delta.content && <Course delta={delta} setDelta={setDelta} />}
        </Loader>
    );
}

export default Page;


// Récupérer les données du course
// (Gérer les erreurs)
// Afficher la liste des flashcards avec course.flashcards
// Afficher le contenu du cours (il faudra trouver un moyen d'obtenir le delta)