import { User } from "../fetchers/user_fetcher";


class Session {

    static DEFAULTS = {
        user: null,
        status: "default", // Peut prendre une valeur pour chaque vue possible dans le logiciel
        currentUserPID: "",
        currentCoursePID: "",
        currentFlashcardPID: "",
    };

    constructor(currentUserPID) {

        if(Session.exists) {
            return Session.instance
        }

        this.status = localStorage.getItem('status') ?? Session.DEFAULTS.status;
        this.currentUserPID = localStorage.getItem('currentUserPID') ?? currentUserPID;
        this.currentCoursePID = localStorage.getItem('currentCoursePID') ?? Session.DEFAULTS.currentCoursePID;
        this.currentFlashcardPID = localStorage.getItem('currentFlashcardPID') ?? Session.DEFAULTS.currentFlashcardPID;
        
        this.user = new User(this.currentUserPID);

        this.restore_session();

        Session.exists = true
        Session.instance = this

    }

    clear_session() { // Permet de clear le localStorage pour une future utilisation

    }

    save_session() { // Permet de sauvegarder la session en local

    }

    restore_session() { // Permet de restaurer visuellement la session, est appelé par le constructeur
        // status est un dictionnaire de la forme suivante : 
        const status = {
            view: 'courseView', // Peut valoir courseView, mindmapView, ou personnalView
            element: 'flashcard', // Les valeurs possibles dépendendent de la view
            // Pour la courseView : peut valoir course ou flashcard (si rien d'indiqué, aucun cours ou flashcard n'est sélectionné)
            // Pour la mindmapView : peut valoir mindmap ou flashcard (si rien d'indiqué, rien n'est sélectionné)
            detail: 'PID', // Vaut le PID du cours ou de la flashcard le cas échéant, peut être laissé vide sinon
        }
    }

    courseView() { // Affiche à l'écran la vue "course" (avec l'ensemble des cours et des flashcards liées)

    }

    mindmapView() { // Affiche à l'écran la vue mindmap

    }

    personnalaccountView() { // Affiche à l'écran la vue contenant les informations personnelles sur le compte

    }

}


export { Session };