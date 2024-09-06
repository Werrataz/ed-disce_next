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

function Buttons({ question, flashcardPID }) {
    return (
        <div className="buttons-container">
            {question && (
                <button title={`Créer une flashcard avec la question "${question}"`}>
                    {FR.CreateFlashcard}
                </button>
            )}
            {flashcardPID && <button>Voir la flashcard</button>}
        </div>
    );
}


function Knowledge({ publicIdentifier, activeKnowledge, setActiveKnowledge }) {

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
            <Buttons question={delta.knowledge.question} />
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
