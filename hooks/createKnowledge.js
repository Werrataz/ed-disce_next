

// Faure un appel en create sur FlashcardFetcher
// Récupérer le pid et l'ajouter au bon endroit dans course
// Enregistrer les modifications dans course

// Il faut que quand l'utilisateur clique sur un bouton, 
// Le nouveau knowledge s'affiche tout de suite
// En background, en lance un truc qui va créer le knowledge
// Une fois le knowledge créé, on le met dans le store
// Autre idée du coup plutôt que de faire cette fonction : 
// Il faudrait que j'ajoute dans manageKnowledge que si le knowledge n'existe pas,
// (donc si erreur 404 typiquement) alors on fait un appel à flashcardFetcher.create
// pour créer l'objet à la place


export default function createKnowledge() {

}

