import { useRef, useState } from "react";
import Knowledge from "./Knowledge.js";
import { generateEmptyNotion } from "../config/course.config.js";
import "../css/Course.css";

function Course() {
  // Recréer ici la logique pour le choix du knowledge actif
  // Faire en sorte que cette logique s'applique à tout les éléments
  // Rajouter un truc pour le passage à la ligne : c'est un truc qui compte s'il y a deux fois de suite un appui sur la barre 'Enter'
  // qui va a la ligne si oui, et qui se réinitialise si l'utilisateur clique sur autre chose qu'entrée (un else : count = O)
  // Ajouter une référence aux knowledges accessibles d'ici

  const notionList = [
    generateEmptyNotion(),
    generateEmptyNotion(),
    generateEmptyNotion(),
  ];

  const [course, setCourse] = useState(notionList ?? [generateEmptyNotion()]);

  const inputRef = useRef(null);
  console.log(course);

  return (
    <div className="course">
      {course.map((notionDelta, index) => (
        <Knowledge
          key={notionDelta.publicIdentifier}
          index={index}
          course={course}
          setCourse={setCourse}
          delta={notionDelta}
        />
      ))}
    </div>
  );
}

export default Course;

/*
Idée pour les fetchers : 
garder les fetchers tels qu'ils sont déjà définis, mais les appeler dans les Components qui en ont besoin 
(il restera ensuite plus qu'à appeler la bonne méthode 
+ comprendre l'histoire des re-rendus parce qu'il faudrait mieux 
que ça ne s'execute qu'une fois. 
A la limite mettre le fetcher en début de fichier pour qu'il soit créé une fois au chargement de la page uniquement. (Donc regrouper les components par fetcher associé))
## Convention de nommage (à ajouter à la documentation): 
Certaines structures HTML (ou react) ont avoir besoin de données provenant de l'API pour s'afficher correctement
Pour que ces données puissent être identifiées facilement et ne soient pas confondues avec les variables de fonctionnement, elles portent toutes le nom delta (notionDelta, courseDelta, flashcardDelta, ect...)
Les deltas sont donc dans le projet une représentation d'un objet visible pour l'utilisateur sous forme de données. 
*/
