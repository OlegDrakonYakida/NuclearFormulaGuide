const container = document.getElementById("formulas");

// const card = document.createElement("div");
// card.classList.add("formula-card");

// card.innerHTML = `
//     <h2>Второй закон Ньютона</h2>
//     <div class="formula">$\\overrightarrow{F} = \\frac{d\\overrightarrow{P}}{d\\overrightarrow{v}}$</div>
//     <h3>Описание: </h3>
//     <p>Сила равна произведению массы тела на её ускорение.</p>
// `;

//container.appendChild(card);

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
