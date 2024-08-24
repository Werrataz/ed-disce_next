// Cette page est la page par défaut quand un nouveau cours est créée
// Elle contient exactement la même chose que "page.jsx" dans [publicIdentifier] mais permet d'afficher des cours pour lesquels le champ publicIdentifier est vide

// A noter qu'il est prévu que le cours soit créé dès que l'utilisateur clic sur le bouton "Nouveau Cours", donc dans ce cas un cours devrait toujours avoir un publicIdentifier
// Cette page pourrait néamoins servir dans le futur pour afficher des cours pour des gens qui n'ont pas de compte, par exemple.
"use client";
import { useRouter } from 'next/navigation';
import { useLoadUser } from '@/hooks/connectDelta';
import Loader from '@/components/Loader';

export default function Page() {

    const [user, setUser, state, setState] = useLoadUser();
    const router = useRouter();

    return (
        <Loader state={state}>
            <div>
                <h1>Vos cours</h1>
                {user.courses ? user.courses.length === 0 ? <h2>Aucun cours créé</h2> :
                    user.courses.map((course) => (
                        <div key={course.publicIdentifier} onClick={() => router.push(`notes/${course.publicIdentifier}`)}>
                            <h2>{course.name}</h2>
                        </div>
                    ))
                    : <h2>Chargement...</h2>
                }
            </div>
        </Loader>
    );
}