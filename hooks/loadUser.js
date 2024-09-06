import { useState, useEffect } from "react";
import { UserFetcher } from "@/fetchers/user_fetcher";
import { usePathname } from "next/navigation";

function useLoadUser() {
    const [state, setState] = useState("loading");
    const [user, setUser] = useState({});
    const pathname = usePathname();

    useEffect(() => {
        const fetchUser = async () => {
            if (pathname === "/connection") {
                setState("loaded");
                return;
            }
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

    return { user, setUser, state, setState, pathname };
}

export default useLoadUser;