import mergeDelta from '@/functions/merge';
import { FlashcardFetcher } from '@/fetchers/flashcard_fetcher';


export default async function generateActivatedFlashcard(delta, setDelta) {
    const flashcardFetcher = new FlashcardFetcher(delta);
    const response = await flashcardFetcher.generateFlashcard();
    if(response.publicIdentifier) {
        mergeDelta(delta, setDelta, response);
    }
    mergeDelta(delta, setDelta, {
        active: true,
        question: { ops: delta.content.comment + '\n' },
        answer: { ops: delta.content.ops },
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