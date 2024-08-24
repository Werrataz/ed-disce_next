"use client";
import "@/app/css/features/loader.css";
import Link from "next/link";

export default function Loader({ state, children }) {
  return state === "loading" ? (
    <div className="loading-div">
      <div className="spinner"></div>
    </div>
  ) : state === "error" ? (
    <div className="error-kagoezr4164984">
      <p>Erreur lors du chargement de la page</p>
      <p>
        Si le problème persiste lorsque vous rechargez la page, vous pouvez
        envoyer un mail à contact@ed-disce.fr
      </p>
      <p>Désolé pour le dérangement occasionné ! </p>
    </div>
  ) : state === "disconnected" ? (
    <div className="disconnected-dscn4646">
      <h3>Vous êtes déconnecté</h3>
      <Link href="/connection">
        Cliquez ici pour vous rendre sur la page de connexion
      </Link>
    </div>
  ) : (
    children
  );
}

// Les temps de chargement avec des spinners ne sont plus très intéressants
// (c'est plus énervant qu'autre chose pour les gens aujourd'hui)
// Il faudra remplacer le spinner par autre chose à un moment
