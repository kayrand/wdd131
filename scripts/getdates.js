// Display the current year in the footer
const currentYear = new Date().getFullYear();
document.getElementById("currentyear").innerHTML = currentYear;

// Display the date the document was last modified
document.getElementById("lastModified").innerHTML = "Last Modified: " + document.lastModified;