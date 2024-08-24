"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CourseFetcher } from '@/fetchers/course_fetcher';
import Loader from '@/components/Loader';
import LANG from '../../../config/language.config';

import '@/app/css/course_management.css';

function Page() {
    const [courses, setCourses] = useState([]);
    const [state, setState] = useState('loading');
    const router = useRouter();

    useEffect(() => {
        const fetchCourseList = async () => {
            try {
                const userPID = localStorage.getItem('userPID');
                const courseFetcher = new CourseFetcher({ user: userPID });
                const response = await courseFetcher.getAll();
                setCourses(response);
                setState('loaded');
                console.log(response);
            } catch (error) {
                console.error(error);
                setState('disconnected');
            }
        };
        fetchCourseList();
    }, []);

    return (
        <Loader state={state}>
            <div className='faz2934'>
                <div className='explanation-kaita94192'>
                    <p>{LANG.courseManager.explanation}</p>
                </div>

                {courses.length > 0 ? courses.map((course) => (
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
                    </div>
                )) : (
                    <div className='no-course-azd23'>
                        <p>{LANG.courseManager.thereIsNoCourses}</p>
                    </div>)}
            </div>
        </Loader>
    );
}



export default Page;
