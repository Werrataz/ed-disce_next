import { FlashcardFetcher } from "@/fetchers/flashcard_fetcher";

export default async function saveFlashcard(flashcard, setFlashcard) {
    const flashcardFetcher = new FlashcardFetcher(flashcard);
    const response = await flashcardFetcher.amend();
    if (response.publicIdentifier) {
        mergeDelta(flashcard, setFlashcard, response);
        return response;
    } else {
        alert("La flashcard n'a pas pu être modifiée à cause d'un problème technique, navré !");
    }
}