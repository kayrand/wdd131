let reviewCount = Number(localStorage.getItem("reviewCount")) || 0;
reviewCount = reviewCount + 1;
localStorage.setItem("reviewCount", reviewCount);

document.getElementById("review-count").textContent = reviewCount;

const currentYear = new Date().getFullYear();
document.getElementById("currentyear").innerHTML = currentYear;

document.getElementById("lastModified").innerHTML = "Last Modified: " + document.lastModified;