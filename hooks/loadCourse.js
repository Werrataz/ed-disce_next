import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { CourseFetcher } from "@/fetchers/course_fetcher";
import { mergeDelta } from "@/functions/merge";

export default function useLoadCourse() {
    const [state, setState] = useState("loading");
    const [delta, setDelta] = useState({});
    const coursePID = useParams().coursePID;
    useEffect(() => {
        const fetchCourseList = async () => {
            if (coursePID) {
                const courseFetcher = new CourseFetcher({ publicIdentifier: coursePID });
                const response = await courseFetcher.restore();
                if (response && response.publicIdentifier) {
                    mergeDelta(delta, setDelta, await courseFetcher.get());
                    setState("loaded");
                } else if (response && response.disconnected) {
                    // Vérifier la condition et le state. La condition doit être vraie quand on est déconnecté
                    setState("disconnected");
                }
            } else {
                setState("error");
            }
        };
        fetchCourseList();
    }, []);

    return { delta, setDelta, state, setState };
}

// Mettre en place une architecture qui fait que la layout principal charge user, et que toutes les autres pages y ont accès
