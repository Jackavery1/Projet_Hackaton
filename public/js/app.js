
let prevent_Keyboard_Conflict = false;
document.querySelectorAll("input, textarea").forEach(element => {
  element.addEventListener("focus", (event) => {
    prevent_Keyboard_Conflict = true;
  });

  element.addEventListener("blur", (event) => {
    prevent_Keyboard_Conflict = false;
  });
});
