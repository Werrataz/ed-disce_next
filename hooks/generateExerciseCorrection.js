
import mergeDelta from '@/functions/merge';
import { FlashcardFetcher } from '@/fetchers/flashcard_fetcher';
// On envoie une requête sur une flashcard déjà existante (dont on a le publicIdentifier)
// La requête modifie juste ça : 


export default async function createActivatedFlashcard(delta, setDelta) {
    mergeDelta(delta, setDelta, {
        active: true,
        question: { ops: delta.knowledge.comment + '\n' },
        answer: { ops: delta.knowledge.ops },
    })
    const flashcardFetcher = new FlashcardFetcher(delta);
    const response = await flashcardFetcher.amend();
    // Ici, il faudrait une requête spécifique qui modifie answer et question mais sans les renvoyer
    if (await response.publicIdentifier) {
        mergeDelta(delta, setDelta, response);
    } else {
        alert("La flashcard n'a pas pu être créée à cause d'un problème technique, navré !");
    }
}