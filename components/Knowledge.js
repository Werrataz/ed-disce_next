import { useCallback, useEffect, useRef, useState } from "react";
import Editor from "./Editor.js";
import { debounce } from "lodash";
import { v4 as uuidv4 } from "uuid";
import useManageKnowledge from "@/hooks/manageKnowledge.js";
import { FR } from "../config/language.config";
import "@/app/css/features/knowledge.css";
// import { emptyEditor } from "../config/course.config";
import { mergeDelta } from "@/functions/merge.js";
import Loader from '@/components/Loader';
import generateActivatedFlashcard from "@/hooks/generateActivatedFlashcard";
import { on } from "events";
import { FlashcardFetcher } from "@/fetchers/flashcard_fetcher.js";


const logValue = debounce((val) => {
    console.log(val);
}, 1000);

function CommentZone({ question, setQuestion, comment, setComment }) {
    return (
        <div className="comment-zone">
            <textarea
                className="question"
                placeholder="question"
                value={question}
                onChange={setQuestion}
            ></textarea>
            <textarea
                className="comment"
                placeholder="commentaire"
                value={comment}
                onChange={setComment}
            ></textarea>
        </div>
    );
}

function Buttons({ delta, setDelta, flashcardPID }) {
    return (
        <div className="buttons-container">
            <button
                className="delete-button-dltbn2391"
                title="Supprimer définitivement cette connaissance et la flashcard qui liée"
                onClick={() => {
                    const flashcardFetcher = new FlashcardFetcher(delta);
                    const response = flashcardFetcher.delete();
                    if (response.ok) {
                        console.log("flashcard supprimée");
                    } else {
                        console.log("La suppression n'a pas eu lieu à cause d'une erreur innatendue");
                    }
                }}>❌</button>
            {
                delta.active === true ? (
                    <div>
                        <p>Flashcard associée à cette notion</p>
                        <button onClick={() => {
                            // A compléter 
                        }}>Voir la flashcard</button>
                    </div>
                ) : (<div>
                    {delta.knowledge.question && (
                        <button
                            title={`Créer une flashcard avec la question "${delta.knowledge.question}"`}
                            onClick={() => {
                                generateActivatedFlashcard(delta, setDelta);
                                // On modifie la flashcard pour y ajouter les champs nécessaires
                                // Il y a déjà une fonction pour faire ça normalement

                            }} >
                            {FR.CreateFlashcard}
                        </button>
                    )}
                </div>
                )
            }
        </div >
    );
}


function Knowledge({ publicIdentifier, onKeyDown, activeKnowledge, setActiveKnowledge }) {

    const { delta, setDelta, state, setState } = useManageKnowledge(publicIdentifier);

    console.log(delta);

    return (
        <div className="knowledge" id={"knowledge-" + publicIdentifier}>
            <CommentZone
                question={delta.knowledge.question}
                setQuestion={(event) => {
                    const knowledge = delta.knowledge;
                    knowledge.question = event.target.value;
                    console.log(knowledge);
                    mergeDelta(delta, setDelta, { knowledge: knowledge });
                    console.log(delta);
                }}
                comment={delta.knowledge.comment}
                setComment={(event) => {
                    const knowledge = delta.knowledge;
                    knowledge['comment'] = event.target.value;
                    console.log(knowledge);
                    mergeDelta(delta, setDelta, { knowledge: knowledge })
                }}
            />
            <Editor
                key={publicIdentifier}
                value={{ ops: delta.knowledge.ops }}
                onFocus={() => setActiveKnowledge(publicIdentifier)}
                onBlur={() => setActiveKnowledge(null)}
                onKeyDown={onKeyDown}
                editorId={'editor-' + publicIdentifier}
                onChange={(value) => {
                    console.log("in onChange");
                    console.log(value);
                    console.log(delta.knowledge);
                    const knowledge = delta.knowledge;
                    knowledge.ops = value.ops;
                    console.log(knowledge);
                    mergeDelta(delta, setDelta, { knowledge: knowledge });
                }}
            />
            {delta && <Buttons delta={delta} setDelta={setDelta} />}
        </div>
    );
}

// LA SOLUTION OUR REORGANISER LE CODE SANS BUG :
// Gérer l'élément qui a le focus dans course plutot qu'ici -> créer focus dans course, créer des fonctions qui odifient focus dans les knowledges, et créer les addEventsListeners dans course (qui se réajustent sur la bonne balise à chaque fois qu'un knoledge odifie le focus)

// Point sur ce qu'il reste à faire :
// - Bug à corriger probablement lié au fait notamment que lorsque le curseur est repositionné, onFocus n'est pas mis à jour (puisqu'il n'est mis à jour que sur le clic)
// - Il faudra également probablement corriger d'autres bugs liés à la gestion des évènements Enter et Backspace
// - Il faudra trouver un moyen de faire apparaitre le curseur sur le bas de la zone de texte qu'on veut modifier
// - Ajouter la possibilité de créer une flashcard

export default Knowledge;
