const container = document.getElementById("formulas");

fetch("../data/formulas.json")
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
