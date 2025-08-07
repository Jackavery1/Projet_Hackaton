let selectionArray = document.querySelectorAll("li"); let selectionCursor = -1;
let keyboardSelected = false;

let selectionLooper = setInterval(selectionLoop, 200);

window.addEventListener("keydown", (event) => {
    const key = event.key.toLocaleLowerCase();
    if (prevent_Keyboard_Conflict) {
        return;
    } else if (!keyboardSelected) { // Initialize keyboard and return before being able to use it. So that it start on the first option.
        keyboardSelected = true;
        return;
    }
    switch (key) {
        case "delete":
            if (selectionCursor == -1) {
                document.getElementById("idea_delete").submit(); // Delete the idea
             } else {
            selectionArray[selectionCursor].childNodes[1].childNodes[3].submit(); // Delete the comment
            }
            break;
        case " ": // Like / Unlike
            if (selectionCursor == -1) {
                document.getElementById("idea_like").submit();
             } else {
                selectionArray[selectionCursor].childNodes[3].submit();
            }
            break;
        case "arrowup":
        case "z":
            event.preventDefault();
            --selectionCursor;
            if (selectionCursor < -1) selectionCursor = selectionArray.length - 1;
            break;
        case "arrowdown":
        case "s":
            event.preventDefault();
            ++selectionCursor;
            if (selectionCursor > selectionArray.length - 1) selectionCursor = -1;
            break;
    }
});

function selectionLoop() {

    document.querySelectorAll(".selected").forEach(element => {
        element.classList.remove("selected");
    })

    if (keyboardSelected && selectionCursor > -1) selectionArray[selectionCursor].classList.add("selected");

}
