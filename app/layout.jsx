"use client";
// import { Metadata } from "next";
import { usePathname, useRouter } from "next/navigation";
import useLoadUser from "@/hooks/loadUser";
import LANG from "../config/language.config";
import Link from "next/link";
import Loader from "@/components/Loader";

import "./css/globals.css";


// export const metadata = Metadata({
//     title: "Oppia",
//     description: "La référence du logiciel pédagogique",
// });

export default function RootLayout({ children }) {

    const router = useRouter();

    const { user, setUser, state, setState, pathname } = useLoadUser();

    // Ici, si on n'est pas dans la page de connexion, on ajoute la logique pour récupérer userPID
    // Puis pour charger user (qui permettra ensuite de faire afficher la liste des courses)
    // Il faudra aussi en profiter pour ajouter un bouton de déconnexion
    // Il faudra également ajouter la récupération des tokens de connexion dans les fetchers
    // Cette récupération doit se faire dans les différents fetchers
    // Elle ne peut pas se faire dans abstractFetcher, car certains fetchers spécifiques ne demandent pas de tokens (les fetchers de connexion en fait)
    // Il faudra que les fetchers return une valeur spécifique si on est déconnecté,
    // et que cette valeur puisse être intérprétée par les hooks personnalisés
    // Ces hooks pourront alors tout simplement passer state à 'disconnected'. 

    return (
        <html lang={LANG.lang}>
            <head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Oppia</title>
                <meta name="description" />
                <link rel="icon" href="/favicon.ico" />
            </head>
            <body>
                {pathname === '/connection' ? null : (
                    <header>
                        <Link href="/">{LANG.menu.home}</Link>
                        <Link href="/notes">{LANG.menu.home}</Link>
                    </header>
                )}
                {pathname === '/connection' ? null : (
                    <nav>
                        <Loader state={state}>
                            <div className="personal-account-datas-pad921">
                                {user && user.firstName && user.lastName &&
                                    <h4>{user.firstName} {user.lastName}</h4>
                                }
                                {user && user.email && <p>{user.email}</p>}
                                <p><Link href="/account">Mon compte</Link></p>
                                <button onClick={() => {
                                    localStorage.removeItem("userPID");
                                    localStorage.removeItem("tokens");
                                    setState("disconnected");
                                    router.push('/connection');
                                }}>Déconnexion</button>
                            </div>
                            <br></br>
                            <h4><b>Vos cours : </b></h4>
                            {user.courses && user.courses.map((course) => (
                                <p key={course.publicIdentifier}><Link href={`/course/${course.publicIdentifier}`}>{course.name}</Link></p>
                            ))}
                            <button onClick={() => router.push('/course/new')}>Nouveau cours</button>
                        </Loader>
                    </nav>
                )}
                <main>
                    {children}
                </main>
            </body>
        </html>
    );
}
