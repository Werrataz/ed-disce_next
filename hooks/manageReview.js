import { useState, useEffect } from "react";
import { ReviewFetcher } from "@/fetchers/review_fetcher";
import { mergeDelta } from "@/functions/merge";

export default async function useManageReview() {

    // const flashcardList = JSON.parse(localStorage.getItem("flashcardList"));

    const flashcardList = [
        {
            "title": "azer",
            "question": {
                "ops": [
                    {
                        "insert": "\n"
                    }
                ]
            },
            "answer": {
                "ops": [
                    {
                        "insert": "\n"
                    }
                ]
            },
            "lastRevisionTime": "2024-08-09T11:41:36Z",
            "lastMasteryLevel": "U",
            "hidden": false,
            "weight": 0.0,
            "publicIdentifier": "16383f57-a056-455a-b4f5-ff5902fb4f36",
            "course": "32bd873e-20c5-4f3e-a0ac-aa2535e28523",
            "exercises": []
        },
        {
            "title": "qsd",
            "question": {
                "ops": [
                    {
                        "insert": "Quel est la date de la découverte des Amériques ?\n"
                    }
                ]
            },
            "answer": {
                "ops": [
                    {
                        "insert": "1456\n"
                    }
                ]
            },
            "lastRevisionTime": "2024-08-11T08:30:50Z",
            "lastMasteryLevel": "U",
            "hidden": false,
            "weight": 0.0,
            "publicIdentifier": "aa2267c5-1f70-41f4-993a-5ffa0fd4f3a2",
            "course": "bf0d317a-4df5-4cdb-b88d-73d322b50d07",
            "exercises": [
                {
                    "title": "Date de la découverte des Amériques",
                    "publicIdentifier": "20b2ddbc-682e-43ca-b182-942b89f2e90e"
                },
                {
                    "title": "Date de la découverte des Amériques",
                    "publicIdentifier": "a479b32b-1cc8-435e-910c-b23c2f3e7366"
                },
                {
                    "title": "Application de la formule de Pythagore",
                    "publicIdentifier": "da2cc870-5ea8-4d01-894e-f2eb05add3c5"
                }
            ]
        }
    ];

    const [delta, setDelta] = useState({ flashcardList: flashcardList });
    const [state, setState] = useState('loading');
    const [flashcard, setFlashcard] = useState({});
    const [trigger, setTrigger] = useState(0);

    useEffect(() => {
        async function loadData() {
            // Cas ou on doit afficher la première flashcard, on fait l'appel nécessaire
            console.log(delta);
            const reviewFetcher = new ReviewFetcher(delta);
            const response = await reviewFetcher.create();
            console.log(response);
            if (response && response.flashcard) {
                mergeDelta(delta, setDelta, response);
                setFlashcard(response.flashcard);
                setState('loaded');

                return response;
            } else {
                setState('error');
            }
        }
        loadData()
    }, []);

    useEffect(() => {
        if (!delta.flashcard) return;

        async function nextFlashcard() {
            // On met à jour la valeur de la flashcard (mais normalement c'est déjà fait)
            const reviewFetcher = new ReviewFetcher(delta);
            console.log(reviewFetcher._delta);
            const response = await reviewFetcher.amend();
            if (response && response.flashcard) {
                mergeDelta(delta, setDelta, response);
                mergeDelta(flashcard, setFlashcard, response.flashcard);
                return response;
            } else {
                setState('error');
            }
        }
        nextFlashcard();
    }, [trigger]);

    return { delta, setDelta, flashcard, setFlashcard, trigger, setTrigger, state, setState };
}
