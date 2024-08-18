"use client";
import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { debounce } from 'lodash';
import { CourseFetcher } from '@/fetchers/course_fetcher.js';
import Loading from '@/app/loading.js';
import LANG from '@/config/language.config.js';
import '@/app/css/features/loadings.css';
import '@/app/css/course_management_spec.css';

function EmailField({ email, index, delta, setDelta }) {
    return (
        <div className='email-zone-ajze29342'>
            <span className='email-field-j934582'>{email}</span>
            <button title="Si vous supprimez une adresse email, la personne concernée ne pourra plus accéder au cours" className='email-field-button-akze234' onClick={() => {
                const emailList = [...delta.emailsAllowedToAccess];
                emailList.splice(index, 1);
                mergeDelta(delta, setDelta, { emailsAllowedToAccess: emailList });
            }}>❌</button>
        </div>
    );
}

function AddEmailField({ email, delta, setDelta }) {
    const [emailValue, setEmailValue] = useState(email);
    const [state, setState] = useState("");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return (
        <div className='email-zone-ajze29342'>
            <input value={emailValue} className='email-field-j934582' onChange={(event) => {
                setEmailValue(event.target.value);
                if (delta.emailsAllowedToAccess.includes(event.target.value)) {
                    setState("used");
                } else {
                    setEmailValue(event.target.value);
                    setState("ok");
                }
            }}></input>
            <button className='email-field-button-akze234' onClick={() => {
                if (emailRegex.test(emailValue)) {
                    if (!delta.emailsAllowedToAccess.includes(emailValue)) {
                        const emailList = [...delta.emailsAllowedToAccess];
                        emailList.push(emailValue);
                        mergeDelta(delta, setDelta, { emailsAllowedToAccess: emailList });
                        setEmailValue("");
                    } else {
                        alert("Cette adresse email est déjà dans la liste. Elle ne peut pas être ajoutée.");
                    }
                } else {
                    alert("L'adresse email n'est pas au format valide");
                }
            }}>➕</button>
            <div> <p className='alert-text-aigs9234'>{(state === "used") && "Cette adresse email est déjà utilisée"}</p></div>
        </div>
    );
}

function FlashcardField({ flashcard }) {
    return (
        <div className='flashcard-element-jeo2034'>
            <div>
                <h4>{flashcard.title}</h4>
            </div>
        </div>
    );
}

function Page() {
    const { coursePID } = useParams();
    const [state, setState] = useState('loading');
    const [delta, setDelta] = useState({});

    console.log(delta);

    const mergeDelta = useCallback((delta, setDelta, modifs) => { // mise à jour de delta
        setDelta(Object.assign({ ...delta }, modifs))
    }, [delta, setDelta]);

    const fetchDelta = useCallback(debounce(async (delta) => {
        if (state === 'loading') return;
        try {
            const courseFetcher = new CourseFetcher(delta);
            console.log(courseFetcher._delta);
            await courseFetcher.amend();
        } catch (error) {
            console.error(error);
        }
    }, 5000), [state]);

    useEffect(() => {
        const getCourse = async () => {
            try {
                const courseFetcher = new CourseFetcher({ publicIdentifier: coursePID });
                await courseFetcher.restore();
                setDelta(courseFetcher._delta);
                setState('loaded');
            } catch (error) {
                console.error(error);
                setState('error');
            }
        };
        getCourse();
    }, [coursePID]);

    useEffect(() => {
        fetchDelta(delta);
    }, [delta]);

    return (
        <div>
            {state === 'loading' ? <Loading /> : state === 'error' ? <div>Erreur lors du chargement de la page</div> :
                <div className='datas-container-aozr2034'>
                    <div className='show-userdatas-iagaeor239'>
                        <div className='genericdatas-kgot203'>
                            <h2>Informations sur ce cours</h2>
                            <div>
                                <h3>Nom : {delta.name}</h3>
                            </div>
                            <div>
                                <p>Niveau : {LANG.academicLevel[delta.academicLevel]}</p>
                            </div>
                            <div>
                                <p>Sujet : {delta.subjectSpecified ? delta.subjectSpecified : LANG.subjectStudied[delta.subjectStudied]}</p>
                            </div>
                            <div>
                                <p>Tags : {delta.tags}</p>
                            </div>
                            <div>
                                <p>Nombre de flashcard : {delta.flashcards.length}</p>
                            </div>
                            <div>
                                <button onClick={() => mergeDelta(delta, setDelta, { shared: !delta.shared })}>{delta.shared ? "Ce cours est public" : "Ce cours est privé"}</button>
                            </div>
                            {(delta.shared || delta.emailsAllowedToAccess.length > 0) &&
                                <div className='access-code-fej238'>
                                    <p>{LANG.courseManager.accessCode}</p>
                                    <div className='field-azn014'><p>{delta.accessCode}</p></div>
                                </div>
                            }
                            <div className='newfeature-nw29'>
                                <button title='⏳🚀 Cette fonctionalitée arrive prochainement !'>Statistiques</button>
                            </div>
                        </div>

                        {delta.flashcards.length > 0 &&
                            <div className='flashcards-container-aozr2034'>
                                <p><b>Quand vous partagez ce cours, vous partagez également toutes les flashcards ci-dessous</b></p>
                                <div className='flashcards-oerp0493'>
                                    {delta.flashcards.map((flashcard) => (
                                        <FlashcardField key={flashcard.publicIdentifier} flashcard={flashcard} />
                                    ))
                                    }
                                </div>
                            </div>
                        }
                    </div>
                    {delta.shared ? <div><p>Toute personne disposant du code d'accès peut accéder à ce cours.</p></div> :
                        <div className='email-container-afk293'>
                            {delta.emailsAllowedToAccess.map((email, index) => (
                                <EmailField key={email} email={email} index={index} delta={delta} setDelta={setDelta} />
                            ))}
                            <p>Entrer une adresse email : </p>
                            <AddEmailField email="" delta={delta} setDelta={setDelta} />
                        </div>
                    }
                </div>
            }
        </div>
    );
}

export default Page;

// Il y a un problème avec shared -> il fait l'inverse de ce qui est voulu
// Je pense que le problème vient d'un retard sur la sauvegarde (quand j'appuis sur le bouton, la valeur qui est mise à jour est l'encienne valeur - à vérifier)
