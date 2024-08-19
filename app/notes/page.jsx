// Cette page est la page par défaut quand un nouveau cours est créée
// Elle contient exactement la même chose que "page.jsx" dans [publicIdentifier] mais permet d'afficher des cours pour lesquels le champ publicIdentifier est vide

// A noter qu'il est prévu que le cours soit créé dès que l'utilisateur clic sur le bouton "Nouveau Cours", donc dans ce cas un cours devrait toujours avoir un publicIdentifier
// Cette page pourrait néamoins servir dans le futur pour afficher des cours pour des gens qui n'ont pas de compte, par exemple.

export default function Page() {
    return (
        <div>
            <h1>Créer un nouveau cours</h1>
        </div>
    );
}