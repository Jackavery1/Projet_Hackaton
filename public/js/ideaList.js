// ===========================================================================
// -- Fichier ideaList.js mis à jour --
// Ce script gère la navigation au clavier et le fonctionnement asynchrone
// des boutons "J'aime" sur la page de liste d'idées.
// ===========================================================================

// --- Variables pour la navigation au clavier ---
let selectionArray = document.querySelectorAll("li");
let selectionCursor = -1;
let keyboardSelected = false;

// Empêche le défilement de la page lors de l'utilisation des flèches
window.addEventListener("keydown", (event) => {
    // Liste des touches à prévenir
    const keysToPrevent = ["ArrowUp", "ArrowDown", "Z", "S", "z", "s"];
    if (keysToPrevent.includes(event.key)) {
        event.preventDefault();
    }
});

// Boucle de sélection pour mettre à jour la classe CSS de l'élément sélectionné
function selectionLoop() {
    document.querySelectorAll(".selected").forEach(element => {
        element.classList.remove("selected");
    });

    if (keyboardSelected && selectionCursor > -1) {
        selectionArray[selectionCursor].classList.add("selected");
    }
}
let selectionLooper = setInterval(selectionLoop, 200);

// --- Gestion de la navigation au clavier ---
window.addEventListener("keydown", async (event) => {
    const key = event.key.toLocaleLowerCase();

    // Initialisation de la sélection au clavier
    if (!keyboardSelected) {
        keyboardSelected = true;
        return;
    }

    switch (key) {
        case "enter":
            if (selectionCursor === -1) return;
            // Redirection vers la page de l'idée
            const linkElement = selectionArray[selectionCursor].querySelector("a");
            if (linkElement) {
                window.location.href = linkElement.href;
            }
            break;

        case " ":
            if (selectionCursor === -1) return;
            // Trouve le bouton "J'aime" et simule un clic pour déclencher
            // le gestionnaire d'événement 'submit' que nous allons créer.
            const likeButton = selectionArray[selectionCursor].querySelector("form button");
            if (likeButton) {
                likeButton.click();
            }
            break;

        case "arrowup":
        case "z":
            --selectionCursor;
            if (selectionCursor < -1) selectionCursor = selectionArray.length - 1;
            break;

        case "arrowdown":
        case "s":
            ++selectionCursor;
            if (selectionCursor > selectionArray.length - 1) selectionCursor = -1;
            break;
    }
});

// --- Gestion des requêtes asynchrones pour les boutons "J'aime" ---
// Sélectionne tous les formulaires de "like"
const likeForms = document.querySelectorAll("li form");

likeForms.forEach(form => {
    form.addEventListener("submit", async (event) => {
        // Empêche la soumission du formulaire et le rechargement de la page
        event.preventDefault();

        // Récupère l'URL de l'API à partir de l'attribut 'action' du formulaire
        const apiUrl = form.action;

        // Affiche un état de chargement visuel
        const likeButton = form.querySelector("button");
        likeButton.disabled = true;

        try {
            // Effectue la requête POST asynchrone
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            // Gère la réponse de l'API
            if (response.ok) {
                // Si la requête est réussie, met à jour le bouton
                const data = await response.json();
                const newLikeStatus = data.like;

                // Met à jour le texte du bouton et l'attribut aria-label pour l'accessibilité
                likeButton.textContent = newLikeStatus ? "♥" : "♡";
                likeButton.setAttribute("aria-label", newLikeStatus ? "Retirer votre j'aime pour cette idée" : "Aimer cette idée");
            } else {
                console.error("Erreur lors de la requête :", response.statusText);
            }
        } catch (error) {
            console.error("Erreur de connexion :", error);
        } finally {
            // Rétablit le bouton, quelle que soit l'issue
            likeButton.disabled = false;
        }
    });
});
