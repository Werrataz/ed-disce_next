import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import { CourseFetcher } from "@/fetchers/course_fetcher";
import { mergeDelta } from "@/functions/merge";
import { debounce } from "lodash";

export default function useManageCourse() {
    const [delta, setDelta] = useState({});
    const [state, setState] = useState("loading");
    const coursePID = useParams().coursePID;
    console.log("useManageCourse");
    console.log(coursePID);
    useEffect(() => {
        const fetchCourseList = async () => {
            if (coursePID) {
                const courseFetcher = new CourseFetcher({ publicIdentifier: coursePID });
                const response = await courseFetcher.restore();
                if (await response && await response.publicIdentifier) {
                    mergeDelta(delta, setDelta, await courseFetcher.get());
                    setState("loaded");
                } else if (await response && await response.disconnected) {
                    // Vérifier la condition et le state. La condition doit être vraie quand on est déconnecté
                    setState("disconnected");
                }
            } else {
                console.log("Vous devez fournir un pid dans l'url pour utiliser useManageCourse");
                setState("error");
            }
        };
        fetchCourseList();
    }, []);

    const debouncedAmendCourse = useCallback(debounce(async (delta) => {
        const courseFetcher = new CourseFetcher(delta);
        const response = await courseFetcher.amend();
        if (await response && await response.publicIdentifier) {
            setState("loaded");
        } else {
            console.log("response for amend error");
            setState("error");
        }
    }, 1000), []);

    useEffect(() => {
        console.log(delta);
        debouncedAmendCourse(delta);
    }, [delta]);

    return { delta, setDelta, state, setState };
}

// Mettre en place une architecture qui fait que la layout principal charge user, et que toutes les autres pages y ont accès
