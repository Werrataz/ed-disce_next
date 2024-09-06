"use client";
import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import useLoadUser from "@/hooks/loadUser";
import { UserFetcher } from "@/fetchers/user_fetcher";
import LANG from "@/config/language.config";
import { mergeDelta } from '@/functions/merge';
import Loader from '@/components/Loader';

import '@/app/css/account.css';
import { addAbortListener } from 'events';


export default function AccountPage() {

    const { user, setUser, state, setState, pathname } = useLoadUser();
    const router = useRouter();

    const [isEditable, setIsEditable] = useState({
        username: false,
        firstName: false,
        lastName: false,
        academicLevel: false,
        email: false,
        password: false,
    });

    const handleEdit = (field) => {
        setIsEditable((prevState) => ({
            ...prevState,
            [field]: true,
        }));
    };

    const handleSave = (field) => {
        setIsEditable((prevState) => ({
            ...prevState,
            [field]: false,
        }));
        // Save the updated field
    };

    const renderTextField = (label, field) => {
        return (
            <div className='render-field-B9'>
                <label>{label}:</label>
                <div className='input-iptyh293002'>
                    <input
                        type="text"
                        value={user[field]}
                        onChange={(e) => mergeDelta(user, setUser, { [field]: e.target.value })}
                        disabled={!isEditable[field]}
                    />
                    <div className='button-zone-bzo493777'>
                        {isEditable[field] ?
                            <button onClick={() => handleSave(field)}>Save</button> :
                            <button onClick={() => handleEdit(field)}>Edit</button>
                        }
                    </div>
                </div>
            </div>
        )
    };

    const renderSelectField = (label, field) => {
        return (
            <div className='render-field-B9'>
                <label>{label}:</label>
                <div className='ipt-select-iselect93002'>
                    <select
                        value={user[field]}
                        onChange={(e) => mergeDelta(user, setUser, { [field]: e.target.value })}
                        disabled={!isEditable[field]}
                    >
                        {Object.entries(LANG.academicLevel).map(([value, label], index) => (
                            <option key={index} value={value}>
                                {label}
                            </option>
                        ))}
                    </select>
                    <div className='button-zone-bzo493777'>
                        {isEditable[field] ? (
                            <button onClick={() => {
                                const userFetcher = new UserFetcher(user);
                                const resp = userFetcher.sendVerificationEmail();
                                if (resp) {
                                    // Afficher le champs pour rentrer le code en dessous
                                }
                            }}>Save</button>
                        ) : (
                            <button onClick={() => handleEdit(field)}>Edit</button>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    const renderEmailField = (label, field) => {
        const [step, setStep] = useState(0);
        const [isEditable, setIsEditable] = useState(false);

        useEffect(() => {
            async function handleStep() {
                console.log(step);
                if (step === 1) {
                    const userFetcher = new UserFetcher(user);
                    const response = await userFetcher.sendVerificationEmail();
                    mergeDelta(user, setUser, { codeID: response.codeID, code: '' });
                } else if (step === 2) {
                    console.log(user);
                    const userFetcher = new UserFetcher(user);
                    const response = await userFetcher.secureAmend();
                    if (response.publicIdentifier) {
                        alert('La modification a été effectuée avec succès');
                        setStep(0);
                        window.location.reload();
                    } else {
                        alert("Une erreur est survenue lors de la modification, soit car le code est incorrect ou périmé, soit parce que l'adresse email est déjà associée à un compte.");
                        window.location.reload();
                    }
                }
            }
            handleStep();
        }, [step]);

        return (
            <div className='render-field-B9'>
                <label>{label}:</label>
                <div className='input-iptyh293002'>
                    <input
                        type="text"
                        value={user[field]}
                        onChange={(e) => mergeDelta(user, setUser, { [field]: e.target.value })}
                        disabled={!isEditable}
                    />
                    <div className='button-zone-bzo493777'>
                        {isEditable ?
                            <button onClick={() => {
                                setIsEditable(false);
                                setStep(1);
                            }}>Save</button> :
                            <button onClick={() => {
                                setIsEditable(true);
                                setStep(0);
                            }}>Edit</button>
                        }
                    </div>
                </div>
                {step === 1 && (user.code !== undefined) &&
                    <div>
                        <form onSubmit={(e) => e.preventDefault()}>
                            <p>Un code de vérification a été envoyé à l'adresse email {user.email}</p>
                            <label>Verification Code:</label>
                            <input
                                type="text"
                                value={user.code}
                                onChange={(e) => {
                                    if (e.target.value.length <= 6 && e.target.value <= 999999)
                                        mergeDelta(user, setUser, { code: e.target.value })
                                }}
                            />
                            <button type="submit" onClick={() => {
                                setStep(2);
                            }}>Submit</button>
                        </form>
                    </div>
                }
                {step === 2 && <Loader state={'loading'} />}
            </div>
        )
    }

    const renderPasswordField = (label) => {
        const [step, setStep] = useState(0);
        const [isCodeValid, setIsCodeValid] = useState(false);
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

        useEffect(() => {
            if (regex.test(user.newPassword))
                setIsCodeValid(true);
            else
                setIsCodeValid(false);
        }, [user.newPassword]);

        useEffect(() => {
            async function handleStep() {
                if (step === 2) {
                    const userFetcher = new UserFetcher(user);
                    const response = await userFetcher.sendVerificationEmail();
                    mergeDelta(user, setUser, { codeID: response.codeID, code: '' });
                } else if (step === 3) {
                    const userFetcher = new UserFetcher(user);
                    console.log(userFetcher._delta);
                    const response = await userFetcher.secureAmend();
                    console.log(response);
                    if (response.publicIdentifier) {
                        alert('La modification a été effectuée avec succès');
                        setStep(0);
                        window.location.reload();
                    } else {
                        alert('Une erreur est survenue lors de la modification');
                        setStep(0);
                        window.location.reload();
                    }
                }
            }
            handleStep();
        }, [step]);

        return (
            <div className='render-field-B9'>
                {step === 0 && <button onClick={() => setStep(1)}>Changer de mot de passe</button>}
                {step === 1 && <label>{label}:</label>}
                {step === 1 &&
                    <div>
                        <div className='input-iptyh293002'>
                            <input
                                type="password"
                                onChange={(e) => {
                                    mergeDelta(user, setUser, { newPassword: e.target.value })
                                }}
                            />
                            <div className='button-zone-bzo493777'>
                                <button disabled={!isCodeValid} onClick={() => {
                                    setStep(2);
                                }}>Save</button>
                            </div>
                        </div>
                        {isCodeValid ? <p className='green-ok-message-gkm23'>Code valide</p> : <p className='red-unvalid-message-rvm243'>Le code secret doit contenir au moins une lettre minuscule, une lettre majuscule, et un chiffre, et faire au moins 8 caractères.</p>}
                    </div>
                }
                {step === 2 && (user.code !== undefined) &&
                    <div>
                        <form onSubmit={(e) => e.preventDefault()}>
                            <p>Un code de vérification a été envoyé à l'adresse email {user.email}</p>
                            <label>Verification Code:</label>
                            <input
                                type="text"
                                value={user.code}
                                onChange={(e) => {
                                    if (e.target.value.length <= 6 && e.target.value <= 999999)
                                        mergeDelta(user, setUser, { code: e.target.value })
                                }}
                            />
                            <button type="submit" onClick={() => {
                                setStep(3);
                            }}>Submit</button>
                        </form>
                    </div>
                }
                {step === 3 && <Loader state={'loading'} />}
            </div>
        )
    }

    return (
        <Loader state={state}>
            <div className='center-div-flex-ctdf9223'>
                <h1>Account Information</h1>
                {renderTextField('Username', 'username')}
                {renderTextField('First Name', 'firstName')}
                {renderTextField('Last Name', 'lastName')}
                {renderSelectField('Education Level', 'academicLevel')}
                {renderEmailField('Email', 'email')}
                {renderPasswordField('Password')}
            </div>
        </Loader>
    );
};
