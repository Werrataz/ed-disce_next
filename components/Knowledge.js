import { useCallback, useRef, useState } from "react";
import Editor from "./Editor.js";
import { debounce } from "lodash";
import "../css/Notion.css";
import { FR } from "../config/language.config";
import { emptyEditor } from "../config/course.config";

// On définie cette fonction au début du fichier, de sorte qu'elle ne s'execute qu'une seule fois
const logValue = debounce((val) => {
  console.log(val);
}, 1000);

function CommentZone({ question, setQuestion, comment, setComment }) {
  const handleQuestionChange = (event) => {
    setQuestion(event.target.value);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  return (
    <div className="comment-zone">
      <textarea
        className="question"
        placeholder="question"
        value={question}
        onChange={handleQuestionChange}
      ></textarea>
      <textarea
        className="comment"
        placeholder="commentaire"
        value={comment}
        onChange={handleCommentChange}
      ></textarea>
    </div>
  );
}

function Buttons({ question }) {
  return (
    <div className="buttons-container">
      {question && (
        <button title={`Créer une flashcard avec la question "${question}"`}>
          {FR.CreateFlashcard}
        </button>
      )}
    </div>
  );
}

function Content({ index, content, setContent }) {
  return (
    <Editor
      index={index}
      extraClass="content"
      value={content}
      onChange={setContent}
    />
  );
}

// Le terme notion n'est pas très claire, on pourrait tout renomer en knowledge (pour symboliser la brique de savoir)
function Knowledge({ index, course, setCourse, delta }) {
  const ref = useRef(null);
  const [question, setQuestion] = useState(delta.question ?? "");
  const [comment, setComment] = useState(delta.comment ?? "");
  const [content, setContent] = useState(delta.content ?? [{ insert: "\n" }]);
  const [onFocus, setOnFocus] = useState(false);

  console.log(onFocus + " " + index);

  const handleKnowledgeManager = useCallback((event) => {
    if (event.code === "Enter") {
      console.log("Enter" + index);
      event.preventDefault();
      const newKnowledge = {
        question: "azer",
        comment: "qsdfwxcv",
        ops: emptyEditor,
      };
      course.splice(index + 1, 0, newKnowledge);
      setCourse([...course]);
      setTimeout(() => {
        const newKnowledgeElement = document.querySelector(
          `#quill-${index + 1} .ql-container .ql-editor`
        );
        console.log(newKnowledgeElement);
        console.log("Dans handle.Enter " + index);
        if (newKnowledgeElement) {
          newKnowledgeElement.focus();
        }
      }, 1);
    } else if (
      content === "<p><br></p>" &&
      event.code === "Backspace" &&
      comment === "" &&
      question === ""
    ) {
      console.log("Backspace" + index);
      course.splice(index, 1);
      setCourse([...course]);
      setTimeout(() => {
        const newKnowledgeElement = document.querySelector(
          `#quill-${index - 1} .ql-container .ql-editor`
        );
        console.log(newKnowledgeElement);
        console.log("Dans handle.Backspace " + index);
        if (newKnowledgeElement) {
          newKnowledgeElement.focus();
        }
      }, 1);
    }
  });

  const addEvents = () => {
    console.log("addEvents" + index);
    if (onFocus === false) {
      console.log("onFocus " + onFocus);
      setOnFocus(true);
      console.log(window);
      window.addEventListener("keydown", handleKnowledgeManager);
      console.log("end of addEvent " + onFocus);
    }
  };

  // Les events ne disaraissent pas

  const removeEvents = () => {
    console.log("removeEvents" + index);
    if (onFocus === true) {
      console.log("onFocusRemove" + onFocus);
      setOnFocus(false);
      window.removeEventListener("keydown", handleKnowledgeManager);
      console.log("end of removeEvent " + onFocus);
    }
  };

  logValue({ question: question, comment: comment, ops: content });
  return (
    <div className="knowledge" id={"knowledge-" + index}>
      <CommentZone
        question={question}
        setQuestion={setQuestion}
        comment={comment}
        setComment={setComment}
      />
      <div onClick={addEvents} onBlur={removeEvents} tabIndex="0">
        <Content index={index} content={content} setContent={setContent} />
      </div>
      <Buttons question={question} />
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
