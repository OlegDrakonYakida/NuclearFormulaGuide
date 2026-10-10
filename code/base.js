// Настройка окружения
const categoryMenu = document.getElementById("category-menu");
const searchInput = document.querySelector("#search-box input");
const categoryOverlay = document.getElementById("category-overlay");
const categoriesButton = document.getElementById("categories-button");
const closeCategoriesButton = document.getElementById("close-categories");

const container = document.getElementById("formulas");

const categories = [
    "Все",
    "Електростатичне поле у вакуумі", 
    "Провідники в електростатичному полі", 
    "Електричне поле в діелектриках", 
    "Основні характеристики електричного струму", 
    "Класична теорія електропровідності металів, газів та електроліті", 
    "Основні положення квантової теорії", 
    "Елементи квантової теорії провідності", 
    "Термоелектричні та контактні явища", 
    "Магнітне поле у вакуумі", 
    "Рух заряджених частинок в постійних електричних та магнітних полях",
    "Явище електромагнітної індукції", 
    "Магнітне поле в речовині",
    "Магнітні властивості атомів та молекул",
    "Властивості магнетиків"
];

// Служебные переменные
let formulasData = {}

let currentCategory = "Все";
let currentTags = [];
let currentSearch = "";


function openCategories() {
    categoryMenu.classList.add("open");
    categoryOverlay.classList.add("open");
}

function closeCategories() {
    categoryMenu.classList.remove("open");
    categoryOverlay.classList.remove("open");
}

categoriesButton.addEventListener("click", openCategories);

closeCategoriesButton.addEventListener("click", closeCategories);

categoryOverlay.addEventListener("click", closeCategories);

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeCategories();
    }
});

function loadCategories() {
    const categoryList = document.getElementById("category-list");

    for (const category of categories) {
        const button = document.createElement("button");

        button.classList.add("category-item");
        button.textContent = category;

        button.addEventListener("click", () => {
            currentCategory = category;

            renderFormulas();
            closeCategories();
        });

        categoryList.appendChild(button);
    }
}

loadCategories()

async function loadFormulas() {
    try {
        const response = await fetch("data/formulas.json");

        if (!response.ok) {
            throw new Error("Не удалось загрузить formulas.json");
        }

        formulasData = await response.json();

        renderFormulas();

    } catch (error) {
        console.error("Ошибка загрузки формул:", error);
        container.textContent = "Не удалось загрузить формулы.";        
    }
}

function renderFormulas() {
    // Очищаем старые карточки
    container.replaceChildren();

    for (const id in formulasData) {
        const formula = formulasData[id][0];

        // Пропускаем формулы из других категорий
        if (
            currentCategory !== "Все" &&
            formula.category !== currentCategory
        ) {
            continue;
        }

        // Поиск по названию и тегам
        const query = currentSearch.trim().toLowerCase();

        const matchesName = formula.name
            .toLowerCase()
            .includes(query);

        const matchesTags = formula.tags.some(tag =>
            tag.toLowerCase().includes(query)
        );

        if (query && !matchesName && !matchesTags) {
            continue;
        }

        const card = document.createElement("div");
        card.classList.add("formula-card");

        card.innerHTML = `
            <h2>${formula.name}</h2>
            <div class="formula">$${formula.formula_code}$</div>
            <h3>Описание:</h3>
            <p>${formula.description}</p>
        `;

        container.appendChild(card);
    }

    // Обрабатываем математические выражения
    if (window.MathJax?.typesetPromise) {
        MathJax.typesetPromise([container]);
    }
}

searchInput.addEventListener("input", () => {
    currentSearch = searchInput.value;
    renderFormulas();
});

// async function loadFormulas() {
//     fetch("data/formulas.json")
//         .then(response => response.json())
//         .then(data => {

//             for (const id in data) {
//                 const card = document.createElement("div");
//                 card.classList.add("formula-card");

//                 card.innerHTML = `
//                     <h2>${data[id][0].name}</h2>
//                     <div class="formula">$${data[id][0].formula_code}$</div>
//                     <h3>Описание:</h3>
//                     <p>${data[id][0].description}</p>
//                 `;

//                 container.appendChild(card);
//                 MathJax.typesetPromise([card]);
//             }
//     });    
// }


