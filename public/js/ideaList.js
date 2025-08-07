let selectionArray = null; let selectionLooper; let selectionCursor = 0;
let keyboardSelected = false;

selectionArray = document.querySelectorAll("li");
selectionLooper = setInterval(selectionLoop, 200);

window.addEventListener("keydown", (event) => {
    const key = event.key.toLocaleLowerCase();
    if (selectionArray == null || prevent_Keyboard_Conflict) {
        return;
    } else if (!keyboardSelected) { // Initialize keyboard and return before being able to use it. So that it start on the first option.
        keyboardSelected = true;
        return;
    }
    switch (key) {
        case "enter":
            window.location.href = selectionArray[selectionCursor].childNodes[1].href; // Go to the page
            break;
        case " ":
            selectionArray[selectionCursor].childNodes[1].childNodes[5].submit(); // Like / Unlike
            break;
        case "arrowup":
        case "z":
            event.preventDefault();
            --selectionCursor;
            if (selectionCursor < 0) selectionCursor = selectionArray.length - 1;
            break;
        case "arrowdown":
        case "s":
            event.preventDefault();
            ++selectionCursor;
            if (selectionCursor > selectionArray.length - 1) selectionCursor = 0;
            break;
    }
});

function selectionLoop() {

    document.querySelectorAll(".selected").forEach(element => {
        element.classList.remove("selected");
    })

    if (selectionArray == null) {
        selectionLooper = null;
        selectionCursor = 0;
        keyboardSelected = false;
        return;
    }

    if (keyboardSelected) selectionArray[selectionCursor].classList.add("selected");

}
