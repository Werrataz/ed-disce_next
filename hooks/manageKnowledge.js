import { useState, useEffect, useCallback } from "react";
import { FlashcardFetcher } from "@/fetchers/flashcard_fetcher";
import { mergeDelta } from "@/functions/merge";
import { debounce } from 'lodash';
import { useParams } from "next/navigation";

export default function useManageKnowledge(publicIdentifier) {

    const coursePID = useParams().coursePID;
    const [delta, setDelta] = useState({
        knowledge: { question: "", comment: "", ops: [] },
        publicIdentifier: publicIdentifier,
        course: coursePID
    });
    const [state, setState] = useState("loading");
    console.log("knowledge");

    useEffect(() => {
        console.log("useEffect");
        const fetchKnowledge = async () => {
            console.log("fetchKnowledge");
            const flashcardFetcher = new FlashcardFetcher(delta);
            const response = await flashcardFetcher.restoreKnowledge();
            if (await response && await response.publicIdentifier) {
                console.log("response for restoreKnowledge");
                console.log(response);
                mergeDelta(delta, setDelta, response);
                setState("loaded");
                return;
            } else { // Rajouter ici le cas ou knowledge n'existe pas encore
                console.log("response for createKnowledge");
                const flashcardFetcher = new FlashcardFetcher({
                    publicIdentifier: publicIdentifier,
                    course: coursePID
                });
                console.log(flashcardFetcher);
                const responseCr = await flashcardFetcher.create();
                console.log(responseCr);
                if (await responseCr && await responseCr.publicIdentifier) {
                    mergeDelta(delta, setDelta, responseCr);
                    setState("loaded");
                    return;
                } else {
                    setState("error");
                    console.log("response for create error");
                    return;
                }
                // } else {
                //     setState("error");
                //     console.log("response for create error");
                //     return;
            }
        };
        fetchKnowledge();
    }, []);

    const debouncedAmendKnowledge = useCallback(debounce(async (delta) => {
        console.log("useEffect debounce");
        const flashcardFetcher = new FlashcardFetcher(delta);
        const response = await flashcardFetcher.amendKnowledge();
        if (await response && await response.publicIdentifier) {
            console.log("response for amendKnowledge");
            setState("loaded");
        } else {
            console.log("response for amend error");
            setState("error");
        }
    }, 1000), []);

    useEffect(() => {
        console.log("useEffect amendKnowledge");
        console.log(delta);
        debouncedAmendKnowledge(delta);
    }, [delta]);

    return { delta, setDelta, state, setState };
}

// Idée : j'écris une structure de base dans manageKnowledge qui me permet de virer les vérifications pour que le truc s'affiche tout de suite