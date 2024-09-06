import mergeDelta from '@/functions/merge';
import { FlashcardFetcher } from '@/fetchers/flashcard_fetcher';
// On envoie une requête sur une flashcard déjà existante (dont on a le publicIdentifier)
// La requête modifie juste ça : 


export default async function generateExercise(delta, setDelta) {
    const flashcardFetcher = new FlashcardFetcher(delta);
    const response = await flashcardFetcher.generateExercise();
    // Ici, il faudrait une requête spécifique qui modifie answer et question mais sans les renvoyer
    if (await response.publicIdentifier) {
        mergeDelta(delta, setDelta, response);
    } else {
        console.error("L'exercice n'a pas pu être créé à cause d'un problème technique.");
    }
}

// Lorsqu'un étudiant veut réviser, si tout les exercices sont au niveau max, on génère un exercice avec cette méthode.
// Il faudrait rajouter un paramètre pour spécifier le niveau de l'exercice à générer.
// S'il y a déjà un exercice sur la flashcard, qui est maitrisé, on considère que l'étudiant est ok.
// Quand l'étudiant a fini un exercice et après qu'il ait demandé à voir la correction, on lui demande a quel niveau il pense maitriser l'exercice (entre 1 et 3)

// Du coup, on fait max 2 exercices par flashcard
