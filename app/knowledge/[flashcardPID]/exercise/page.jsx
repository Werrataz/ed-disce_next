import React, { useState } from 'react';
import useLoadExercise from './useLoadExercise'; // Il faudra écrire cette fonction
import Loader from '@/components/Loader';
import Editor from '@/components/Editor';

const Page = () => {
    const { exercise, setExercise, state, setState } = useLoadOrGenerateExercise();
    // Si un exercice non maitrisé existe déjà sur la notion choisie, on le charge
    // Sinon, on en génère un nouveau
    // Il faut faire la logique qui récupère les exercices de l'utilisateur
    // Puis ajouter la condition qui affiche le premier exercice non maitrisé
    const [step, setStep] = useState(0);

    useEffect(() => {
        if (step === 1) {
            generateExercise(exercise, setExercise);
        }
    }, [step]);

    return (
        <Loader state={state}>
            <h2>Consigne de l'exercice</h2>
            <Editor value={exercise.instructions} />

            <h2>Votre réponse : </h2>
            <Editor value={exercise.userResponse} onChange={(value) => mergeDelta(exercise, setExercise, { userResponse: value })} placeholder="Votre réponse" />

            <button onClick={handleAutomatedCorrection}>Aide de l'IA</button>
            <button onClick={handleShowAnswer}>Afficher la réponse</button>

            {/* Afficher les boutons seulement si la réponse a été affichée */}
            {state.answerShown && (
                <div>
                    <button onClick={handleMasterExercise}>Je maîtrise cet exercice</button>
                    <button onClick={handleRedoExercise}>Je veux refaire cet exercice plus tard</button>
                </div>
            )}
        </Loader>
    );
};

export default Page;