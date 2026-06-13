const dateIdeas = [
    {
        id: "picnic",
        name: "Sunset Picnic Adventure",
        description: "Pack your favorite snacks, grab a cozy blanket, and find a scenic spot to watch the sunset together.",
        category: ["outdoor", "budget"],
        cost: "Under $25",
        time: "2-3 hours",
        image: "images/featured-1.jpg"
    },
    {
        id: "cook",
        name: "Cook a New Recipe Together",
        description: "Pick a recipe neither of you has tried, grab the ingredients, and turn dinner into a fun activity.",
        category: ["indoor", "food", "cozy"],
        cost: "$25 - $50",
        time: "1-2 hours",
        image: "images/featured-2.jpg"
    },
    {
        id: "stargazing",
        name: "Stargazing Under the Sky",
        description: "Drive somewhere with little light pollution, lay back, and enjoy the stars while you talk about anything and everything.",
        category: ["outdoor", "budget", "cozy"],
        cost: "Free",
        time: "1-2 hours",
        image: "images/featured-3.jpg"
    },
    {
        id: "hike",
        name: "Hiking Trail Exploration",
        description: "Find a new trail in your area, pack some snacks and water, and spend the day exploring nature together.",
        category: ["outdoor", "adventure", "budget"],
        cost: "Free",
        time: "Half day",
        image: "images/idea-4.jpg"
    },
    {
        id: "paint",
        name: "Paint and Sip Night",
        description: "Set up canvases at home with your favorite drinks and try painting the same scene to compare results.",
        category: ["indoor", "cozy"],
        cost: "$30 - $50",
        time: "2-3 hours",
        image: "images/idea-5.jpg"
    },
    {
        id: "foodtour",
        name: "Local Food Tour",
        description: "Pick three new restaurants you've never tried, get appetizers at one, dinner at another, and dessert at the third.",
        category: ["food", "adventure"],
        cost: "$75 - $125",
        time: "3-4 hours",
        image: "images/idea-6.jpg"
    },
    {
        id: "movie",
        name: "Movie Marathon Night",
        description: "Pick a theme, gather your favorite snacks, and watch a series of movies in your coziest pajamas.",
        category: ["indoor", "cozy", "budget"],
        cost: "Under $25",
        time: "All evening",
        image: "images/idea-7.jpg"
    },
    {
        id: "farmers",
        name: "Farmers Market Morning",
        description: "Stroll through your local farmers market, pick out fresh ingredients, and plan a meal to make together.",
        category: ["outdoor", "food", "budget"],
        cost: "$25 - $50",
        time: "Morning",
        image: "images/idea-8.jpg"
    },
    {
        id: "game",
        name: "Board Game Night",
        description: "Break out your favorite board games or try a new one. Add snacks and your favorite drinks for the perfect cozy night.",
        category: ["indoor", "cozy", "budget"],
        cost: "Free",
        time: "2-3 hours",
        image: "images/idea-9.jpg"
    },
    {
        id: "drive",
        name: "Scenic Drive and Coffee",
        description: "Grab coffees from your favorite cafe, queue up a great playlist, and take a long drive somewhere with a view.",
        category: ["adventure", "budget", "cozy"],
        cost: "$10 - $20",
        time: "2-3 hours",
        image: "images/idea-10.jpg"
    },
    {
        id: "bake",
        name: "Bake Something Sweet",
        description: "Pick a fun dessert recipe, gather your ingredients, and spend the afternoon baking together. Bonus points for messy aprons!",
        category: ["indoor", "food", "cozy"],
        cost: "$15 - $30",
        time: "2 hours",
        image: "images/idea-11.jpg"
    },
    {
        id: "kayak",
        name: "Kayaking or Paddleboarding",
        description: "Rent kayaks or paddleboards and spend the afternoon on the water together. Perfect for warm sunny days!",
        category: ["outdoor", "adventure"],
        cost: "$60 - $100",
        time: "Half day",
        image: "images/idea-12.jpg"
    }
];

const dateGrid = document.getElementById("date-grid");
const filterButtons = document.querySelectorAll(".filter-btn");
const resultsMessage = document.getElementById("results-message");

function getFavorites() {
    const stored = localStorage.getItem("favorites");
    if (stored) {
        return JSON.parse(stored);
    }
    return [];
}

function saveFavorites(favorites) {
    localStorage.setItem("favorites", JSON.stringify(favorites));
}

function toggleFavorite(id) {
    const favorites = getFavorites();
    const index = favorites.indexOf(id);

    if (index === -1) {
        favorites.push(id);
    } else {
        favorites.splice(index, 1);
    }

    saveFavorites(favorites);
}

function displayDateIdeas(ideas) {
    dateGrid.innerHTML = "";

    if (ideas.length === 0) {
        resultsMessage.innerHTML = "No date ideas found in this category yet. Try a different filter or save some favorites!";
        return;
    }

    resultsMessage.innerHTML = `Showing ${ideas.length} ${ideas.length === 1 ? "idea" : "ideas"}`;

    const favorites = getFavorites();

    ideas.forEach(idea => {
        const isFavorite = favorites.includes(idea.id);
        const heartIcon = isFavorite ? "♥" : "♡";

        const card = document.createElement("article");
        card.className = "card";

        card.innerHTML = `
            <img src="${idea.image}" alt="${idea.name}" loading="lazy">
            <div class="card-content">
                <div class="card-header">
                    <h3>${idea.name}</h3>
                    <button class="favorite-btn ${isFavorite ? 'is-favorite' : ''}" data-id="${idea.id}" aria-label="Save to favorites">${heartIcon}</button>
                </div>
                <p>${idea.description}</p>
                <div class="card-details">
                    <span class="card-tag">${idea.cost}</span>
                    <span class="card-tag">${idea.time}</span>
                </div>
            </div>
        `;

        dateGrid.appendChild(card);
    });

    const favoriteButtons = document.querySelectorAll(".favorite-btn");
    favoriteButtons.forEach(button => {
        button.addEventListener("click", () => {
            const id = button.getAttribute("data-id");
            toggleFavorite(id);

            if (button.classList.contains("is-favorite")) {
                button.classList.remove("is-favorite");
                button.innerHTML = "♡";
            } else {
                button.classList.add("is-favorite");
                button.innerHTML = "♥";
            }
        });
    });
}

function filterIdeas(category) {
    if (category === "all") {
        return dateIdeas;
    }

    if (category === "favorites") {
        const favorites = getFavorites();
        return dateIdeas.filter(idea => favorites.includes(idea.id));
    }

    return dateIdeas.filter(idea => idea.category.includes(category));
}

filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        filterButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        const filter = button.getAttribute("data-filter");
        const filteredIdeas = filterIdeas(filter);
        displayDateIdeas(filteredIdeas);
    });
});

displayDateIdeas(dateIdeas);