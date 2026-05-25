const temples = [
    {
        templeName: "Aba Nigeria",
        location: "Aba, Nigeria",
        dedicated: "2005, August, 7",
        area: 11500,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
    },
    {
        templeName: "Manti Utah",
        location: "Manti, Utah, United States",
        dedicated: "1888, May, 21",
        area: 74792,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
    },
    {
        templeName: "Payson Utah",
        location: "Payson, Utah, United States",
        dedicated: "2015, June, 7",
        area: 96630,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
    },
    {
        templeName: "Yigo Guam",
        location: "Yigo, Guam",
        dedicated: "2020, May, 2",
        area: 6861,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
    },
    {
        templeName: "Washington D.C.",
        location: "Kensington, Maryland, United States",
        dedicated: "1974, November, 19",
        area: 156558,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
    },
    {
        templeName: "Lima Perú",
        location: "Lima, Perú",
        dedicated: "1986, January, 10",
        area: 9600,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
    },
    {
        templeName: "Mexico City Mexico",
        location: "Mexico City, Mexico",
        dedicated: "1983, December, 2",
        area: 116642,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
    },
    {
        templeName: "Feather River California",
        location: "Yuba City, California, United States",
        dedicated: "2023, June, 4",
        area: 38335,
        imageUrl: "https://www.churchofjesuschrist.org/imgs/7a0cf314094011ee8992eeeeac1ee9eaa0149d33/full/!1200,/0/default"
    },
    {
        templeName: "Columbia River Washington",
        location: "Richland, Washington, United States",
        dedicated: "2001, November, 18",
        area: 18587,
        imageUrl: "https://www.churchofjesuschrist.org/imgs/737ccc6c29c0694553b1ec748cdfb5522327d16c/full/!1200,/0/default"
    },
    {
        templeName: "Dallas Texas",
        location: "Dallas, Texas, United States",
        dedicated: "1984, October, 19",
        area: 44207,
        imageUrl: "https://www.churchofjesuschrist.org/imgs/167b081b94fddc43d81200a03a9d5fc26c38a770/full/!1200,/0/default"
    }
];

const galleryContainer = document.querySelector(".gallery");
const navLinks = document.querySelectorAll("nav a");
const menuToggle = document.getElementById("menu-toggle");
const mainNav = document.getElementById("main-nav");

function displayTemples(templeList) {
    galleryContainer.innerHTML = "";

    templeList.forEach(temple => {
        const card = document.createElement("figure");

        card.innerHTML = `
            <img src="${temple.imageUrl}" alt="${temple.templeName} Temple" loading="lazy">
            <figcaption>
                <h2>${temple.templeName}</h2>
                <p><strong>Location:</strong> ${temple.location}</p>
                <p><strong>Dedicated:</strong> ${temple.dedicated}</p>
                <p><strong>Size:</strong> ${temple.area.toLocaleString()} sq ft</p>
            </figcaption>
        `;

        galleryContainer.appendChild(card);
    });
}

function filterTemples(filterType) {
    let filteredList = [];

    if (filterType === "old") {
        filteredList = temples.filter(temple => {
            const year = parseInt(temple.dedicated.split(",")[0]);
            return year < 1900;
        });
    } else if (filterType === "new") {
        filteredList = temples.filter(temple => {
            const year = parseInt(temple.dedicated.split(",")[0]);
            return year > 2000;
        });
    } else if (filterType === "large") {
        filteredList = temples.filter(temple => temple.area > 90000);
    } else if (filterType === "small") {
        filteredList = temples.filter(temple => temple.area < 10000);
    } else {
        filteredList = temples;
    }

    displayTemples(filteredList);
}

navLinks.forEach(link => {
    link.addEventListener("click", (event) => {
        event.preventDefault();
        const filter = link.getAttribute("data-filter");
        filterTemples(filter);
        mainNav.classList.remove("open");
        menuToggle.innerHTML = "&#9776;";
    });
});

menuToggle.addEventListener("click", () => {
    mainNav.classList.toggle("open");

    if (mainNav.classList.contains("open")) {
        menuToggle.innerHTML = "&times;";
    } else {
        menuToggle.innerHTML = "&#9776;";
    }
});

displayTemples(temples);

const currentYear = new Date().getFullYear();
document.getElementById("currentyear").innerHTML = currentYear;

document.getElementById("lastModified").innerHTML = "Last Modified: " + document.lastModified;