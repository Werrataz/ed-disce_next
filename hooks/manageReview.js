import { useState, useEffect } from 'react';
import { ReviewFetcher } from "@/fetchers/review_fetcher";
import { mergeDelta } from "@/functions/merge";


export default function useManageReview() {

    const flashcardList = JSON.parse(localStorage.getItem("flashcardList"));

    const [delta, setDelta] = useState({ flashcardList: flashcardList });
    const [state, setState] = useState("loading");
    const [flashcard, setFlashcard] = useState(null);
    const [trigger, setTrigger] = useState(0);

    useEffect(() => {
        async function loadData() {
            // Cas ou on doit afficher la première flashcard, on fait l'appel nécessaire
            console.log(delta);
            const reviewFetcher = new ReviewFetcher(delta);
            const response = await reviewFetcher.create();
            console.log(response);
            if (await response && await response.flashcard) {
                mergeDelta(delta, setDelta, response);
                setFlashcard(response.flashcard);
                setState('loaded');
                return response;
            } else {
                setState('error');
            }
        }
        loadData();
    }, []);

    useEffect(() => {
        console.log("FFFFFFFFFGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGFFFFFFFFFFFFFFFF");
        console.log(delta);
        if (delta && delta.flashcard) {
            console.log(true);
        }
        console.log(flashcard);
        console.log(trigger);
    }, [delta, flashcard]);

    useEffect(() => {
        if (!delta.flashcard) return;
        async function nextFlashcard() {
            // On met à jour la valeur de la flashcard (mais normalement c'est déjà fait)
            const reviewFetcher = new ReviewFetcher(delta);
            console.log(reviewFetcher._delta);
            const response = await reviewFetcher.amend();
            if (await response && await response.flashcard) {
                mergeDelta(delta, setDelta, response);
                mergeDelta(flashcard, setFlashcard, response.flashcard);
                return response;
            } else {
                console.log("Erreur lors de la récupération de la prochaine flashcard");
            }
        }
        nextFlashcard();
    }, [trigger]);

    return { delta, setDelta, flashcard, setFlashcard, trigger, setTrigger, state, setState };
}
