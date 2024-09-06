"use client";
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { CourseFetcher } from '@/fetchers/course_fetcher.js';
import { mergeDelta } from '@/functions/merge';
import useLoadCourse from '@/hooks/loadCourse';
import Loader from '@/components/Loader';
import LANG from '@/config/language.config.js';
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
                        const emailList = [...delta.emailsAllowedToAccess, emailValue];
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
    const { delta, setDelta, state, setState } = useLoadCourse();


    console.log("In page.jsx - after useEffect");
    return (
        <Loader state={state}>
            <div className='datas-container-aozr2034'>
                <div className='show-userdatas-iagaeor239'>
                    <div className='genericdatas-kgot203'>
                        <h2>Informations sur ce cours</h2>
                        <div>
                            {delta.name && <h3>Nom : {delta.name}</h3>}
                        </div>
                        <div>
                            {delta.academicLevel && <p>Niveau : {LANG.academicLevel[delta.academicLevel]}</p>}
                        </div>
                        <div>
                            {delta.subjectSpecified && <p>Sujet : {delta.subjectSpecified ? delta.subjectSpecified : LANG.subjectStudied[delta.subjectStudied]}</p>}
                        </div>
                        <div>
                            {delta.tag && <p>Tags : {delta.tags}</p>}
                        </div>
                        <div>
                            {delta.flashcards && <p>Nombre de flashcard : {delta.flashcards.length}</p>}
                        </div>
                        <div>
                            <button onClick={() => mergeDelta(delta, setDelta, { shared: !delta.shared })}>{delta.shared ? "Ce cours est public" : "Ce cours est privé"}</button>
                        </div>
                        {delta.emailsAllowedToAccess && (delta.shared || delta.emailsAllowedToAccess.length > 0) &&
                            <div className='access-code-fej238'>
                                <p>{LANG.courseManager.accessCode}</p>
                                <div className='field-azn014'><p>{delta.accessCode}</p></div>
                            </div>
                        }
                        <div className='newfeature-nw29'>
                            <button title='⏳🚀 Cette fonctionalitée arrive prochainement !'>Statistiques</button>
                        </div>
                    </div>

                    {delta.flashcards && delta.flashcards.length > 0 &&
                        <div className='flashcards-container-aozr2034'>
                            <p><b>Quand vous partagez ce cours, vous partagez également toutes les flashcards ci-dessous</b></p>
                            <div className='flashcards-oerp0493'>
                                {
                                    delta.flashcards && delta.flashcards.map((flashcard) => (
                                        <FlashcardField key={flashcard.publicIdentifier} flashcard={flashcard} />
                                    ))
                                }
                            </div>
                        </div>
                    }
                </div>
                {delta.shared ? <div><p>Toute personne disposant du code d'accès peut accéder à ce cours.</p></div> :
                    (
                        <div className='email-container-afk293'>
                            <p>Gérer les emails ayant accès au cours : </p>
                            {delta.emailsAllowedToAccess && delta.emailsAllowedToAccess.map((email, index) => (
                                <EmailField key={email} email={email} index={index} delta={delta} setDelta={setDelta} />
                            ))}
                            <p>Entrer une adresse email : </p>
                            <AddEmailField email="" delta={delta} setDelta={setDelta} />
                        </div>
                    )
                }
            </div>
        </Loader>
    );
}

export default Page;

