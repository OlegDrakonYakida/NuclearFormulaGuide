const categoryMenu = document.getElementById("category-menu");
const categoryOverlay = document.getElementById("category-overlay");
const categoriesButton = document.getElementById("categories-button");
const closeCategoriesButton = document.getElementById("close-categories");

const container = document.getElementById("formulas");

const categories = [
    "Все",
    "Електростатика", 
    "Електричний потенціал", 
    "Електричні поля навколо провідників", 
    "Електричні струми", 
    "Поля рухомих зарядів", 
    "Магнітне поле", 
    "Електромагнітна індукція та рівняння Максвелла", 
    "Кола змінного струму", 
    "Електричні поля в речовині", 
    "Магнітні поля в речовині"
];

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

async function loadFormulas() {
    fetch("data/formulas.json")
        .then(response => response.json())
        .then(data => {

            for (const id in data) {
                const card = document.createElement("div");
                card.classList.add("formula-card");

                card.innerHTML = `
                    <h2>${data[id][0].name}</h2>
                    <div class="formula">$${data[id][0].formula_code}$</div>
                    <h3>Описание:</h3>
                    <p>${data[id][0].description}</p>
                `;

                container.appendChild(card);
                MathJax.typesetPromise([card]);
            }
    });    
}

function loadCategories() {
    const categoryList = document.getElementById("category-list");

    for (const category of categories) {
        const button = document.createElement("button");

        button.classList.add("category-item");
        button.textContent = category;

        categoryList.appendChild(button);
    }
}

loadCategories()
