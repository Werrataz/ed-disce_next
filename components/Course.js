import { useState, useEffect } from "react";
import Knowledge from "./Knowledge";
import { mergeDelta } from "@/functions/merge";
import useManageCourse from "@/hooks/manageCourse";
import Editor from "./Editor";
import Loader from "@/components/Loader"
import { v4 as uuidv4 } from "uuid";
// import "../css/Course.css";

// function Course() {
//   // Recréer ici la logique pour le choix du knowledge actif
//   // Faire en sorte que cette logique s'applique à tout les éléments
//   // Rajouter un truc pour le passage à la ligne : c'est un truc qui compte s'il y a deux fois de suite un appui sur la barre 'Enter'
//   // qui va a la ligne si oui, et qui se réinitialise si l'utilisateur clique sur autre chose qu'entrée (un else : count = O)
//   // Ajouter une référence aux knowledges accessibles d'ici

//   const notionList = [
//     generateEmptyNotion(),
//     generateEmptyNotion(),
//     generateEmptyNotion(),
//   ];

//   const [course, setCourse] = useState(notionList ?? [generateEmptyNotion()]);

//   const inputRef = useRef(null);
//   console.log(course);

//   return (
//     <div className="course">
//       {course.map((notionDelta, index) => (
//         <Knowledge
//           key={notionDelta.publicIdentifier}
//           index={index}
//           course={course}
//           setCourse={setCourse}
//           delta={notionDelta}
//         />
//       ))}
//     </div>
//   );
// }

// export default Course;

// /*
// Idée pour les fetchers :
// garder les fetchers tels qu'ils sont déjà définis, mais les appeler dans les Components qui en ont besoin
// (il restera ensuite plus qu'à appeler la bonne méthode
// + comprendre l'histoire des re-rendus parce qu'il faudrait mieux
// que ça ne s'execute qu'une fois.
// A la limite mettre le fetcher en début de fichier pour qu'il soit créé une fois au chargement de la page uniquement. (Donc regrouper les components par fetcher associé))
// ## Convention de nommage (à ajouter à la documentation):
// Certaines structures HTML (ou react) ont avoir besoin de données provenant de l'API pour s'afficher correctement
// Pour que ces données puissent être identifiées facilement et ne soient pas confondues avec les variables de fonctionnement, elles portent toutes le nom delta (notionDelta, courseDelta, flashcardDelta, ect...)
// Les deltas sont donc dans le projet une représentation d'un objet visible pour l'utilisateur sous forme de données.
// */

const List = [
    "azef",
    "azftgs",
    "Bonjour",
    "à ",
    "tous",
    "les",
    "gens",
    "qui",
    "sont",
    "là",
    "aujourd'hui",
    "comment",
    "ça",
    "va",
];

export default function Course({ delta, setDelta }) {

    const [content, setContent] = useState(delta.content);

    const [activeKnowledge, setActiveKnowledge] = useState("");

    const [step, setStep] = useState(0);

    console.log("Course");
    console.log(delta);

    useEffect(() => {
        console.log("useEffect");
        function handleKeyDown(event) {
            console.log("handleKeyDown");
            if (event.key === "Enter") {
                console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
                console.log("Enter");
                console.log(delta);
                if (delta.content) {
                    event.preventDefault();
                    console.log(delta.content.indexOf(activeKnowledge));
                    const index = delta.content.indexOf(activeKnowledge);
                    const publicIdentifier = uuidv4();
                    let newContent = content;
                    console.log(delta.content);
                    console.log(newContent);
                    newContent.push(publicIdentifier);
                    console.log(newContent); // Faire l'enregistrement de delta de course lorsque celui-ci est modifié
                    setContent([...content, publicIdentifier]);
                    console.log(delta);
                }

                // Lors de la création d'un nouveau knowledge, il faudra générer un uuid
                // pour l'enregistrer (et ajouter l'uuid à la liste au bon endroit)
            } else if (event.key === "Backspace") {
                if (delta.content) {
                    console.log("Backspace");
                    console.log(delta.content.indexOf(activeKnowledge));
                    // Action à effectuer lorsque la touche Backspace est pressée
                    // Vérifier s'il y a un knowledge actif
                    // Vérifier si le knowledge actif est vide
                    // Supprimer le knowledge actif
                }
            }
        }

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            console.log("Event listener removed");
        };

    }, [delta, setDelta, activeKnowledge]);

    useEffect(() => {
        console.log("delta changed", delta);
    }, [delta]);

    // useEffect(() => {
    // il faudra gérer les enregistrements de delta (soit dans le hook de la balise parente)
    // }, [course]);

    return (
        <div className="course">
            {content.map((value) => (
                <Knowledge
                    key={value}
                    publicIdentifier={value}
                    activeKnowledge={activeKnowledge}
                    setActiveKnowledge={setActiveKnowledge}
                />
            ))}
        </div>
    );
}

// La liste des knowledges contient soit des publicIdentifiers, soit des ''
// Quand c'est '' (ou undefined ou null), c'est qu'il faut afficher un knowledge vide et lancer la création du knowledge


// Récupérer la liste des knowledges ici
// Charger la liste des knowledges
// A chaque fois qu'un onFocus se déclanche dans un knowledge, le knowledge en question modifie la valeur
// d'un paramètre dans "course"
// Course créé un listener sur l'appui sur le clavier dans le knowledge actif
// (Le listener est recréé à chaque fois qu'un nouveau knowledge devient actif, avec [activeKnowledge])
// Si l'utilisateur a appuyé sur entrée, on crée un nouveau knowledge (++)
// juste après celui actif (très compliqué)
// et on place le curseur dedans (compliqué = selectionner le nouveau knowledge (compliqué), puis placer le curseur dedans (facile))
// Si l'utilisateur a appuyé sur backspace (facile)
// Et qu'il y a un knowledge actif (facile)
// Et qu'il est vide (très compliqué...)
// On supprime le knowledge actif (compliqué)
// Voila !
