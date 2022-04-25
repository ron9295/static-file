const reqAPI = () => {
    let inp = document.querySelector(".searchInput").value;
    let cardBody = "<div class=\"card\"><div class=\"cardText\"><h3></h3></div><div class=\"cardFace\"></div><div class=\"cardTable\"></div></div></div>";

    axios.get('https://www.thecocktaildb.com/api/json/v1/1/search.php', {
            params: {
                s: inp
            }
        })
        .then(function(res) {
            console.log(res);
            let arrDrinks = res.data.drinks;
            let arrCards = [];

            for (let i = 0; i < arrDrinks.length; i++) {
                let tmp = document.createElement("div");
                tmp.classList.add("pageBodyCenterBodyCard");
                tmp.innerHTML = cardBody;
                arrCards.push(tmp);
            }

            for (let i = 0; i < arrCards.length; i++) {
                arrCards[i].querySelector(".cardTable").innerHTML = "";
                arrCards[i].querySelector(".cardText h3").innerHTML = "";
                arrCards[i].querySelector(".cardFace").style.backgroundImage = "url()";
                if (i < arrDrinks.length) {
                    arrCards[i].querySelector(".cardText h3").innerHTML = arrDrinks[i].strDrink;
                    arrCards[i].querySelector(".cardFace").style.backgroundImage = `url(${arrDrinks[i].strDrinkThumb})`;
                    let arrTableData = breakIngredients(arrDrinks[i]);
                    arrCards[i].querySelector(".cardTable").appendChild(buildTable("drinkTable", arrTableData));
                    let tmp = document.createElement("div");
                    tmp.innerHTML = arrDrinks[i].strInstructions;
                    tmp.classList.add("carsInst");
                    arrCards[i].querySelector(".card").appendChild(tmp);
                }
            }
            document.querySelector(".pageBodyCenterBody").innerHTML = "";
            for (let i = 0; i < arrCards.length; i++) {
                document.querySelector(".pageBodyCenterBody").appendChild(arrCards[i]);
            }

        })
        .catch(function(error) {
            console.log(error);
        });
}

const renderCard = (cards, drinks) => {
    for (let i = 0; i < cards.length; i++) {
        cards[i].querySelector(".cardTable").innerHTML = "";
        cards[i].querySelector(".cardText h3").innerHTML = "";
        cards[i].querySelector(".cardFace").style.backgroundImage = "url()";
        if (i < drinks.length) {
            cards[i].querySelector(".cardText h3").innerHTML = drinks[i].strDrink;
            cards[i].querySelector(".cardFace").style.backgroundImage = `url(${drinks[i].strDrinkThumb})`;
            let arrTableData = breakIngredients(drinks[i]);
            cards[i].querySelector(".cardTable").appendChild(buildTable("drinkTable", arrTableData));
            let tmp = document.createElement("div");
            tmp.innerHTML = drinks[i].strInstructions;
            tmp.classList.add("carsInst");
            cards[i].querySelector(".card").appendChild(tmp);
        }
    }
}

const buildCell = (type, className, cellData) => {
    let cell = document.createElement(type);
    cell.classList.add(className);
    cell.innerHTML = cellData;
    return cell;

    // return document.createElement(type).classList.add(className).innerHTML = cellData;
};

const buildRow = (type, className, rowData) => {
    let row = document.createElement("tr");
    row.classList.add(className);
    for (let i = 0; i < rowData.length; i++) {
        cell = buildCell(type, "tcell", rowData[i]);
        row.appendChild(cell);
    }
    return row;
};

const buildTable = (className, tableData) => {
    let table = document.createElement("table");
    table.classList.add(className);
    for (let i = 0; i < tableData.length; i++) {
        let row = buildRow(i === 0 ? "th" : "td", "trow", tableData[i]);
        table.appendChild(row);
    }
    return table;
};

const breakIngredients = (item) => {
    let arr = [
        ["Ingredient", "Measure"]
    ];
    for (let i = 1; i <= 15; i++) {
        if (item[`strIngredient${i}`]) arr.push([item[`strIngredient${i}`], item[`strMeasure${i}`]]);
    }

    return arr;
};

// strDrink: "Vodka Fizz"
// strDrinkAlternate: null
// strDrinkThumb: "https://www.thecocktaildb.com/images/media/drink/xwxyux1441254243.jpg"
// strGlass: "White wine glass"
// strIngredient1: "Vodka"
// strIngredient2: "Half-and-half"
// strIngredient3: "Limeade"
// strIngredient4: "Ice"
// strIngredient5: "Nutmeg"
// strIngredient6: null
// strIngredient7: null
// strIngredient8: null
// strIngredient9: null
// strIngredient10: null
// strIngredient11: null
// strIngredient12: null
// strIngredient13: null
// strIngredient14: null
// strIngredient15: null
// strInstructions: "Blend all ingredients, save nutmeg. Pour into large white wine glass and sprinkle nutmeg on top."
// strMeasure1: "2 oz "
// strMeasure2: "2 oz "
// strMeasure3: "2 oz "
// strMeasure4: null
// strMeasure5: null
// strMeasure6: null
// strMeasure7: null
// strMeasure8: null
// strMeasure9: null
// strMeasure10: null
// strMeasure11: null
// strMeasure12: null
// strMeasure13: null
// strMeasure14: null
// strMeasure15: null