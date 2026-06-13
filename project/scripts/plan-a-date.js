const datePool = [
    {
        id: "picnic",
        name: "Sunset Picnic Adventure",
        description: "Pack your favorite snacks, grab a cozy blanket, and find a scenic spot to watch the sunset together.",
        category: ["outdoor", "cozy", "romantic"],
        cost: "$",
        costDisplay: "Under $25",
        time: 2,
        food: ["cooking", "takeout"],
        image: "images/featured-1.jpg"
    },
    {
        id: "cook",
        name: "Cook a New Recipe Together",
        description: "Pick a recipe neither of you has tried, grab the ingredients, and turn dinner into a fun activity.",
        category: ["indoor", "cozy", "fun"],
        cost: "$$",
        costDisplay: "$25 - $50",
        time: 2,
        food: ["cooking"],
        image: "images/featured-2.jpg"
    },
    {
        id: "stargazing",
        name: "Stargazing Under the Sky",
        description: "Drive somewhere with little light pollution, lay back, and enjoy the stars while you talk about anything and everything.",
        category: ["outdoor", "cozy", "romantic"],
        cost: "free",
        costDisplay: "Free",
        time: 2,
        food: ["none"],
        image: "images/featured-3.jpg"
    },
    {
        id: "hike",
        name: "Hiking Trail Exploration",
        description: "Find a new trail in your area, pack some snacks and water, and spend the day exploring nature together.",
        category: ["outdoor", "adventure", "fun"],
        cost: "free",
        costDisplay: "Free",
        time: 4,
        food: ["cooking", "none"],
        image: "images/idea-4.jpg"
    },
    {
        id: "paint",
        name: "Paint and Sip Night",
        description: "Set up canvases at home with your favorite drinks and try painting the same scene to compare results.",
        category: ["indoor", "cozy", "fun"],
        cost: "$$",
        costDisplay: "$30 - $50",
        time: 2,
        food: ["takeout", "none"],
        image: "images/idea-5.jpg"
    },
    {
        id: "foodtour",
        name: "Local Food Tour",
        description: "Pick three new restaurants you've never tried, get appetizers at one, dinner at another, and dessert at the third.",
        category: ["outdoor", "adventure", "fun"],
        cost: "$$$",
        costDisplay: "$75 - $125",
        time: 4,
        food: ["restaurant"],
        image: "images/idea-6.jpg"
    },
    {
        id: "movie",
        name: "Movie Marathon Night",
        description: "Pick a theme, gather your favorite snacks, and watch a series of movies in your coziest pajamas.",
        category: ["indoor", "cozy"],
        cost: "$",
        costDisplay: "Under $25",
        time: 8,
        food: ["takeout", "none"],
        image: "images/idea-7.jpg"
    },
    {
        id: "farmers",
        name: "Farmers Market Morning",
        description: "Stroll through your local farmers market, pick out fresh ingredients, and plan a meal to make together.",
        category: ["outdoor", "fun"],
        cost: "$$",
        costDisplay: "$25 - $50",
        time: 4,
        food: ["cooking"],
        image: "images/idea-8.jpg"
    },
    {
        id: "game",
        name: "Board Game Night",
        description: "Break out your favorite board games or try a new one. Add snacks and your favorite drinks for the perfect cozy night.",
        category: ["indoor", "cozy", "fun"],
        cost: "free",
        costDisplay: "Free",
        time: 2,
        food: ["takeout", "none"],
        image: "images/idea-9.jpg"
    },
    {
        id: "drive",
        name: "Scenic Drive and Coffee",
        description: "Grab coffees from your favorite cafe, queue up a great playlist, and take a long drive somewhere with a view.",
        category: ["outdoor", "adventure", "cozy", "romantic"],
        cost: "$",
        costDisplay: "$10 - $20",
        time: 2,
        food: ["none"],
        image: "images/idea-10.jpg"
    },
    {
        id: "bake",
        name: "Bake Something Sweet",
        description: "Pick a fun dessert recipe, gather your ingredients, and spend the afternoon baking together. Bonus points for messy aprons!",
        category: ["indoor", "cozy", "fun"],
        cost: "$",
        costDisplay: "$15 - $30",
        time: 2,
        food: ["cooking"],
        image: "images/idea-11.jpg"
    },
    {
        id: "kayak",
        name: "Kayaking or Paddleboarding",
        description: "Rent kayaks or paddleboards and spend the afternoon on the water together. Perfect for warm sunny days!",
        category: ["outdoor", "adventure", "fun"],
        cost: "$$$",
        costDisplay: "$60 - $100",
        time: 4,
        food: ["takeout"],
        image: "images/idea-12.jpg"
    },
    {
        id: "quickwalk",
        name: "Coffee Shop Stroll",
        description: "Grab coffee from your favorite local cafe and take a relaxed walk together. Short, sweet, and perfect for a quick break.",
        category: ["outdoor", "cozy", "romantic"],
        cost: "$",
        costDisplay: "$10 - $20",
        time: 1,
        food: ["none"],
        image: "images/idea-13.jpg"
    },
    {
        id: "candlelight",
        name: "Candlelit Dinner at Home",
        description: "Make a fancy dinner at home, light some candles, dress up, and pretend you're at the most exclusive restaurant in town.",
        category: ["indoor", "romantic", "cozy"],
        cost: "$$",
        costDisplay: "$30 - $60",
        time: 2,
        food: ["cooking"],
        image: "images/idea-14.jpg"
    },
    {
        id: "puzzle",
        name: "Puzzle Night",
        description: "Pour your favorite drinks, put on some calm music, and tackle a puzzle together. Surprisingly bonding!",
        category: ["indoor", "cozy"],
        cost: "$",
        costDisplay: "$10 - $25",
        time: 1,
        food: ["none"],
        image: "images/idea-15.jpg"
    }
];

const form = document.getElementById("date-form");
const resultSection = document.getElementById("result-section");
const tryAgainButton = document.getElementById("try-again");

function getUserPreferences() {
    const budget = document.getElementById("budget").value;
    const location = document.querySelector('input[name="location"]:checked').value;
    const time = parseInt(document.getElementById("time").value);
    const food = document.getElementById("food").value;
    const notes = document.getElementById("notes").value;
    const username = document.getElementById("username").value;

    const vibeCheckboxes = document.querySelectorAll('input[name="vibe"]:checked');
    const vibes = [];
    vibeCheckboxes.forEach(checkbox => {
        vibes.push(checkbox.value);
    });

    return {
        budget: budget,
        location: location,
        time: time,
        food: food,
        notes: notes,
        username: username,
        vibes: vibes
    };
}

function findMatchingDates(preferences) {
    let matches = datePool.filter(date => {
        if (preferences.location !== "either" && !date.category.includes(preferences.location)) {
            return false;
        }

        if (date.time > preferences.time) {
            return false;
        }

        if (preferences.budget !== "" && date.cost !== preferences.budget && preferences.budget !== "free") {
            if (preferences.budget === "$" && date.cost !== "$" && date.cost !== "free") return false;
            if (preferences.budget === "$$" && date.cost === "$$$") return false;
        }

        if (preferences.food && preferences.food !== "" && !date.food.includes(preferences.food)) {
            return false;
        }

        if (preferences.vibes.length > 0) {
            const hasMatchingVibe = preferences.vibes.some(vibe => date.category.includes(vibe));
            if (!hasMatchingVibe) {
                return false;
            }
        }

        return true;
    });

    if (matches.length === 0) {
        matches = datePool.filter(date => {
            if (preferences.location !== "either" && !date.category.includes(preferences.location)) {
                return false;
            }
            return true;
        });
    }

    if (matches.length === 0) {
        matches = datePool;
    }

    return matches;
}

function pickRandomDate(matches) {
    const randomIndex = Math.floor(Math.random() * matches.length);
    return matches[randomIndex];
}

function displayResult(date, preferences) {
    const greeting = preferences.username
        ? `Here's Your Perfect Date, ${preferences.username}!`
        : "Here's Your Perfect Date!";

    document.getElementById("result-greeting").innerHTML = greeting;
    document.getElementById("result-image").src = date.image;
    document.getElementById("result-image").alt = date.name;
    document.getElementById("result-name").innerHTML = date.name;
    document.getElementById("result-description").innerHTML = date.description;
    document.getElementById("result-cost").innerHTML = date.costDisplay;
    document.getElementById("result-time").innerHTML = `${date.time === 1 ? "About an hour" : date.time === 2 ? "2 to 3 hours" : date.time === 4 ? "Half a day" : "All day or evening"}`;

    const notesElement = document.getElementById("result-notes");
    if (preferences.notes) {
        notesElement.innerHTML = `Your special note: ${preferences.notes}`;
    } else {
        notesElement.innerHTML = "";
    }

    saveLastDate(date);

    form.style.display = "none";
    resultSection.style.display = "block";

    window.scrollTo({ top: 0, behavior: "smooth" });
}

function saveLastDate(date) {
    const history = JSON.parse(localStorage.getItem("dateHistory")) || [];
    history.unshift({
        date: date,
        timestamp: new Date().toISOString()
    });

    if (history.length > 5) {
        history.length = 5;
    }

    localStorage.setItem("dateHistory", JSON.stringify(history));
}

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const preferences = getUserPreferences();
    const matches = findMatchingDates(preferences);
    const chosenDate = pickRandomDate(matches);

    displayResult(chosenDate, preferences);
});

tryAgainButton.addEventListener("click", () => {
    resultSection.style.display = "none";
    form.style.display = "block";
    form.reset();
    window.scrollTo({ top: 0, behavior: "smooth" });
});