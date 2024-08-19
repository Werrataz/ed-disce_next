// Cette page permet d'afficher un cours et de le modifier
// Elle hérite d'un layout qui ajoute un menu à gauche de l'écran


// A terme, cette page devra également contenir un lien vers le drive du cours

import { useState, useEffect } from 'react';
import Link from "next/link";
import { CourseFetcher } from '@/fetchers/course_fetcher';
import { debounce } from 'lodash';
import Loader from '@/components/Loader';
import mergeDelta from '@/functions/merge';
import Course from '@/components/Course';
import LANG from '../../../config/language.config';


function Page() {

    const [state, setState] = useState('loading');
    const [delta, setDelta] = useState({});

    useEffect(() => {
        async function fetchCourses() {
            const userPID = localStorage.getItem('userPID');
            const courseFetcher = new CourseFetcher({ user: userPID });
            if (userPID) {
                await courseFetcher.restore();
                mergeDelta(delta, setDelta, courseFetcher.get());
                setState('loaded');
            } else {
                setState('disconnected');
            }
        }
        fetchCourses();
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
        <Loader state={state}>
            <nav className='list-course-navlcroa14'>
                {itemList.map((item) => (
                    <Link key={item.publicIdentifier} href={`/notes/${item.publicIdentifier}`}></Link>
                ))}
            </nav>
            <Course content={delta.content} />
        </Loader>
    );
}

export default Page;