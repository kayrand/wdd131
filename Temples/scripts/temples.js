const currentYear = new Date().getFullYear();
document.getElementById("currentyear").innerHTML = currentYear;

document.getElementById("lastModified").innerHTML = "Last Modified: " + document.lastModified;

const menuToggle = document.getElementById("menu-toggle");
const mainNav = document.getElementById("main-nav");

menuToggle.addEventListener("click", () => {
    mainNav.classList.toggle("open");

    const isOpen = mainNav.classList.contains("open");
    menuToggle.setAttribute("aria-expanded", isOpen);

    if (isOpen) {
        menuToggle.innerHTML = "&times;";
    } else {
        menuToggle.innerHTML = "&#9776;";
    }
});