"use client";
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';
import { UserFetcher } from '../../fetchers/user_fetcher';
import LANG from '../../config/language.config';
import Loader from '../../components/Loader';
import { mergeDelta } from '@/functions/merge';

const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

const LoginPage = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [state, setState] = useState('loading');
    const [delta, setDelta] = useState({});
    const [stepPassed, setStepPassed] = useState('start');

    const sendCode = useCallback(async () => {
        const userFetcher = new UserFetcher(delta);
        const response = await userFetcher.sendVerificationEmail();
        if (await response && await response.codeID) {
            mergeDelta(delta, setDelta, { codeID: response.codeID });
        } else {
            console.log("erreur lors de l'envoi du code");
            // Charger une page d'erreur (avec un return Error())
        }
    }, [delta, setDelta]);

    const verifyCode = useCallback(async () => {
        const userFetcher = new UserFetcher(delta);
        const response = await userFetcher.create();
        if (response && response.publicIdentifier) {
            mergeDelta(delta, setDelta, userFetcher.get());
            setStepPassed('launchf');
        } else {
            console.log("erreur lors de la création du compte");
            // Charger une page d'erreur (avec un return Error())
        }
    }, [delta, setDelta]);

    const connect = useCallback(async (password) => {
        const userFetcher = new UserFetcher(delta);
        const response = await userFetcher.restoreWithAuth(password);
        if (await response.user.publicIdentifier && await response.tokens) {
            mergeDelta(delta, setDelta, userFetcher.get());
            setStepPassed('launch');
        }
    }, [delta, setDelta]);

    useEffect(() => {
        async function fetchDelta() {
            let timeoutId = setTimeout(() => {
                setState('error');
            }, 8000);
            const email = searchParams.get('email');
            if (email) {
                const userFetcher = new UserFetcher({ email: email });
                const response = await userFetcher.restorePID();
                if (await response && await response.publicIdentifier) {
                    localStorage.setItem('userPID', response.publicIdentifier);
                    await userFetcher.restore();
                    mergeDelta(delta, setDelta, userFetcher.get());
                    setStepPassed('connect');
                } else { // Si l'utilisateur n'existe pas
                    mergeDelta(delta, setDelta, { email: email });
                    setStepPassed('create');
                }
                setState('loaded');
            } else {
                setStepPassed('create');
                setState('loaded');
            }
            clearTimeout(timeoutId);
        }
        fetchDelta();
    }, []);

    useEffect(() => {
        if (stepPassed === 'email') {
            sendCode();
        } else if (stepPassed === 'launch') {
            localStorage.setItem(userPID, delta.publicIdentifier);
            const wantedRoute = localStorage.getItem('wantedRoute');
            if (wantedRoute) {
                setTimeout(() => {
                    router.push(wantedRoute);
                }, 1000);
            } else {
                setTimeout(() => {
                    router.push('@/app');
                }, 1000);
            }
        } else if (stepPassed === 'launchf') {
            localStorage.setItem('userPID', delta.publicIdentifier);
            const wantedRoute = localStorage.getItem('wantedRoute');
            if (wantedRoute) {
                setTimeout(() => {
                    router.push(wantedRoute);
                }, 1000);
            } else {
                setTimeout(() => {
                    router.push('@/app');
                }, 1000);
            }
        }
    }, [stepPassed]);

    return (
        <Loader state={state}>
            <div>
                {stepPassed === 'connect' ? (
                    <div>
                        <label>
                            <p>Email : </p>
                            <input type="email" value={delta.email} onChange={(e) => mergeDelta(delta, setDelta, { email: e.target.value })} />
                        </label>
                        <label>
                            <p>Mot de passe : </p>
                            <input type="password" onChange={(e) => mergeDelta(delta, setDelta, { password: e.target.value })} />
                        </label>
                        <button onClick={async () => {
                            setStepPassed('password');
                            await connect(delta.password);
                        }
                        }>Se connecter</button>
                    </div>
                ) : stepPassed === 'create' ? (
                    <div>
                        <label>
                            <p>Email : </p>
                            <input type="text" value={delta.email} onChange={(e) => mergeDelta(delta, setDelta, { email: e.target.value })} />
                        </label>
                        <div>
                            <button className='next-step-button-htrh4568' onClick={() => setStepPassed('email')}>Suivant</button>
                        </div>
                    </div>
                ) : stepPassed === 'email' ? (
                    <div>
                        {
                            // Ici, on execute le code pour envoyer l'email
                            // ça implique notamment d'envoyer la requête, de la récupérer et de conserver la valeur du codeID (et du code une fois que l'utilisateur le fournis)
                        }
                        <p>Un code d&apos;activation a été envoyé à l&apos;adresse email que vous avez fourni. Veillez rentrer ce code ci-dessous pour finaliser votre inscription.</p>
                        <label>
                            <p>Code d&apos;activation : </p>
                            <input type="text" onChange={(e) => mergeDelta(delta, setDelta, { code: e.target.value })} />
                        </label>
                        <div>
                            <button className='next-step-button-htrh4568' onClick={() => setStepPassed('code')}>Suivant</button>
                        </div>
                        <div>
                            <button className='small-button-option-gzerh6' onClick={() => sendCode(delta)} >Renvoyer le code</button>
                            <button className='small-button-option-gzerh6' onClick={() => setStepPassed('create')} >Modifier l&apos;adresse email</button>
                        </div>
                    </div>
                ) : stepPassed === 'code' ? (
                    <div>
                        <label>
                            <p>Comment doit-on vous appeler ? </p>
                            <input type="text" onChange={(e) => mergeDelta(delta, setDelta, { firstName: e.target.value })} />
                        </label>
                        <p className='comments-small-smlc76130'>Ce pseudonyme est privé, et vous pourrez le changer n&apos;importe quand</p>
                        <div>
                            <button className='next-step-button-htrh4568' onClick={() => setStepPassed('username')}>Suivant</button>
                        </div>
                    </div>
                ) : stepPassed === 'username' ? (
                    <div>
                        <label>
                            <p>Niveau académique : </p>
                                {Object.entries(LANG.academicLevel).map(([key, labelText], index) => (
                                    <label key={index}>
                                        <input
                                            type="radio"
                                            name="defaultAcademicLevel"
                                            value={key}
                                            onChange={(e) => mergeDelta(delta, setDelta, { defaultAcademicLevel: e.target.value })}
                                        />
                                        {labelText}
                                    </label>
                                ))}
                        </label>
                        <div>
                            <button className='next-step-button-htrh4568' onClick={() => setStepPassed('defaultAcademicLevel')}>Suivant</button>
                        </div>
                    </div>
                ) : stepPassed === 'defaultAcademicLevel' ? (
                    <div>
                        <label>
                            <p>Définissez un mot de passe : </p>
                            <input type="password" onChange={(e) => mergeDelta(delta, setDelta, { password: e.target.value })} />
                        </label>
                        {!regex.test(delta.password) && <p>Le mot de passe doit contenir 8 caractères, dont un chifre, une lettre majuscule et une lettre minuscule</p>}
                        <div>
                            <button className='next-step-button-htrh4568' onClick={async () => {
                                setStepPassed('password');
                                await verifyCode(delta.password);
                            }}>Suivant</button>
                        </div>
                    </div>
                ) : (stepPassed === 'password' || stepPassed === 'launch' || stepPassed === 'launchf') && (
                    <div className='wainting-message-waimt456110'>
                        <h1>Préparation en cours</h1>
                        <h4>Vous allez être redirigé dans quelques instants</h4>
                    </div>
                )}
            </div>
        </Loader>
    )
};

export default LoginPage;