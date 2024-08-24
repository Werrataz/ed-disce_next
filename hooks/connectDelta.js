import { useState, useEffect } from "react";
import { UserFetcher } from "@/fetchers/user_fetcher";

function useLoadUser() {
  const [state, setState] = useState("loading");
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      const userPID = localStorage.getItem("userPID");
      console.log(userPID);
      const userFetcher = new UserFetcher({ publicIdentifier: userPID });
      console.log(userFetcher._delta);
      const response = await userFetcher.restore();
      if ((await response) && (await response.publicIdentifier)) {
        setUser(response);
        setState("loaded");
      } else {
        setState("disconnected");
      }
    };
    fetchUser();
  }, []);

  return [user, setUser, state, setState];
}

// On initialise delta et state
// On récupère le userPID
// On vérifie qu'on peut get avec le userPID
// Si on ne peut pas, quelque soit la raison, c'est qu'on est déconnécté
// Si on peut, alors on met à jour delta et on renvoit toutes les données nécessaires

function useLoadCourse() {
  const [courses, setCourses] = useState([]);
  const [state, setState] = useState("loading");

  useEffect(() => {
    const fetchCourseList = async () => {
      try {
        const userPID = localStorage.getItem("userPID");
        const courseFetcher = new CourseFetcher({ user: userPID });
        const response = await courseFetcher.getAll();
        setCourses(response);
        setState("loaded");
        console.log(response);
      } catch (error) {
        console.error(error);
        setState("disconnected");
      }
    };
    fetchCourseList();
  }, []);

  return { courses, state };
}

export { useLoadUser, useLoadCourse };

// Mettre en place une architecture qui fait que la layout principal charge user, et que toutes les autres pages y ont accès
