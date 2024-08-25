import { useCallback, useRef, useState } from "react";
import Editor from "./Editor.js";
import { debounce } from "lodash";
import { FR } from "../config/language.config";
import "../css/Notion.css";
// import { emptyEditor } from "../config/course.config";
import { mergeDelta } from "@/functions/merge.js";

// On définie cette fonction au début du fichier, de sorte qu'elle ne s'execute qu'une seule fois
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

// Le terme notion n'est pas très claire, on pourrait tout renomer en knowledge (pour symboliser la brique de savoir)
function Knowledge({ publicIdentifier, activeKnowledge, setActiveKnowledge }) {
  const [delta, setDelta] = useState({}); // Ici remplacer par mon hook personalisé pour récupérer delta, les states ect... à partir de publicIdentifier
  console.log(setDelta);
  return (
    <div className="knowledge" id={"knowledge-" + publicIdentifier}>
      <CommentZone
        question={delta.question}
        setQuestion={(event) =>
          mergeDelta(delta, setDelta, { question: event.target.value })
        }
        comment={delta.comment}
        setComment={(event) =>
          mergeDelta(delta, setDelta, { comment: event.target.value })
        }
      />
      <Editor
        key={publicIdentifier}
        value={delta.content}
        onFocus={() => setActiveKnowledge(publicIdentifier)}
        onChange={(value) => {
          mergeDelta(delta, setDelta, { content: value });
        }}
      />

      <Buttons question={delta.question} />
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
