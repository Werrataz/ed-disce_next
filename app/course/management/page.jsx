"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CourseFetcher } from '@/fetchers/course_fetcher';
import Loading from '@/app/loading';
import LANG from '../../../config/language.config';

import '@/app/css/course_management.css';

function Page() {
    const [courses, setCourses] = useState([]);
    const [state, setState] = useState('loading');
    const router = useRouter();

    console.log(courses);
    console.log(state);

    // localStorage.setItem('userPID', "54f1bd24-a080-48f6-9f21-e7eee1fede29");

    useEffect(() => {
        const fetchCourseList = async () => {
            try {
                // const userPID = localStorage.getItem('userPID');
                const userPID = "54f1bd24-a080-48f6-9f21-e7eee1fede29";
                const courseFetcher = new CourseFetcher({ user: userPID });
                const response = await courseFetcher.getAll();
                setCourses(response);
                setState('loaded');
                console.log(response);
            } catch (error) {
                console.error(error);
                setState('error');
            }
        };
        fetchCourseList();
    }, []);

    return (
        <div className='faz2934'>
            <div className='explanation-kaita94192'>
                <p>{LANG.courseManager.explanation}</p>
            </div>
            {state === "loading" ? <Loading /> : state === "loaded" && courses.map((course) => {
                < div key={course.publicIdentifier} className="data-container-Aze323jZd" onClick={() => router.push(`management/${course.publicIdentifier}`)} >
                    <div className='course-name-bkz0234'>
                        <h3><b>{course.name}</b></h3>
                    </div>
                    <div className='academic-level-jearo23491'>
                        <p>{LANG.general.academicLevel}: {LANG.academicLevel[course.academicLevel]}</p>
                    </div>
                    <div className='subject-studied-jearo43'>
                        <p>{LANG.general.subjectStudied}: {LANG.subjectStudied[course.subjectStudied]}</p>
                    </div>
                    <div className='sharedQ9231' title={LANG.courseManager.hoverInformationsForShare}>
                        {console.log("CCCC")}
                        <p>{course.shared ? LANG.courseManager.publicCourse : LANG.courseManager.privateCourse}</p>
                    </div>
                    {(course.shared) ? (
                        <div className='access-code-azd23'>
                            <p>{LANG.courseManager.accessCode}</p>
                            <div className='field-akoqs203'><p>{course.accessCode}</p></div>
                        </div>
                    ) : (
                        <div className='access-code-azd23'>
                            <p>{LANG.courseManager.numberThatCanAccess + '  ' + course.emailsAllowedToAccess.length}</p>
                        </div>
                    )}
                    {console.log(course)}
                </div>
            })}
        </div >
    );
}



export default Page;