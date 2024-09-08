import { FlashcardFetcher } from '@/fetchers/flashcard_fetcher';
import { mergeDelta } from '@/functions/merge';


export default async function generateActivatedFlashcard(delta, setDelta) {

    const newDelta = {
        ...delta,
        active: true,
        question: { ops: [{ insert: delta.knowledge.question + '\n' }] },
        answer: { ops: delta.knowledge.ops },
    };
    console.log(newDelta);
    const flashcardFetcher = new FlashcardFetcher(newDelta);
    const response = await flashcardFetcher.amend();
    console.log("response - MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM");
    console.log(await response);
    // Ici, il faudrait une requête spécifique qui modifie answer et question mais sans les renvoyer
    if (await response.publicIdentifier) {
        mergeDelta(delta, setDelta, response);
        console.log("sucess");
    } else {
        alert("La flashcard n'a pas pu être créée à cause d'un problème technique, navré !");
    }
}