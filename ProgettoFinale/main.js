
let navBar = document.querySelector("#navBar")

// FUNZIINE MODIFICA NAVBAR ALLO SCROLL
window.addEventListener("scroll", () => {
    if (window.scrollY > 150) {
        navBar.classList.add("scrollNavbar")
    } else {
        navBar.classList.remove("scrollNavbar")
    }
})

let paragVendita = document.querySelector("#paragVendita")
let parag2024 = document.querySelector("#parag2024")
let paragSodd = document.querySelector("#paragSodd")

// FUNZIONE CONTATORE SEZIONE NUMERI

function createIntervalloCustom(numFinale, elem, speed) {
    let counter = 0
    let intervalloCustom = setInterval(() => {
        if (counter < numFinale) {
            counter++
            elem.innerHTML = counter + "+"
        } else {
            clearInterval(intervalloCustom)
        }
    }, speed)
}

let isNotFound = true

let osservatore = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting && isNotFound) {
            createIntervalloCustom(400, paragVendita, 6)
            createIntervalloCustom(150, parag2024, 12)
            createIntervalloCustom(500, paragSodd, 4)
            isNotFound = false
        }
    })
})

osservatore.observe(paragVendita)

fetch("./array.json").then((response)=>response.json()).then((data)=>{

    // FUNZONE ORDINAMENTO ARRAY PER DATA
    
    function ordinamenteData() {
        data.forEach(el => {
            let temporaryDate = new Date(el.data_inserimento)
            el.data_inserimento = temporaryDate
        }
        )
        data.sort((a, b) => b.data_inserimento - a.data_inserimento)
    }

    
    // STAMPA ULTIMI 3 ARTICOLI
    
    let lastArticleWrapper = document.querySelector("#lastArticleWrapper")

    ordinamenteData()

    for (let i = 0; i < 3; i++) {
        let div = document.createElement("div")
        div.classList.add("col-12", "col-md-6", "justify-content-md-center", "justify-content-lg-center", "col-lg-4", "p-4")
        div.innerHTML = `
                            <div class="card lastCard customCard noradius">
                                <img src=${data[i].immagine}
                                    alt="...">
                                <h3 class="titleFont pt-4 titleCard ps-4 pe-4 color-s">${data[i].titolo}</h3>
                                <div class="card-body">
                                    <p class="m-0">${data[i].descrizione}</p>
                                </div>
                                <button type="button" id="btinId${data[i].idImmobile}" class="btnCustom">Esplora</button>
                            </div>
                        `
        lastArticleWrapper.appendChild(div)
    }

})


// BOTTNE VISUALIZZAZIONE ARTICOLO

let mostraModale = document.querySelector("#mostraModale")
const modale = new bootstrap.Modal(document.querySelector("#exampleModal"))

mostraModale.addEventListener("click", () => {
    modale.show();
})


// let inputType = document.querySelector("#inputType")
// let minPrice = document.querySelector("#minPrice")
// let maxPrice = document.querySelector("#maxPrice")
// let minMq = document.querySelector("#minMq")
// let maxMq = document.querySelector("#maxMq")
// let inputCity = document.querySelector("#inputCity")
// let selectedArr = document.querySelector('input[name="arr"]:checked')
// let selectedCond = document.querySelector('input[name="cond"]:checked')

// function filtroRicerca() {
//     return immobili.filter(el => {

//         // controllo tipologia
//         if (inputType.value.toLowerCase() !== "all") {
//             if (inputType.value.toLowerCase() !== el.tipologia) {
//                 return false;
//             }
//         }

//         // controllo prezzo
//         if (minPrice.value && minPrice.value > el.prezzo) {
//             return false
//         }
//         if (maxPrice.value && maxPrice.value < el.prezzo) {
//             return false
//         }

//         // controllo città

//         if (inputCity.value.toLowerCase() && inputCity.value.toLowerCase() !== el.citta) {
//             return false;
//         }

//         // controllo dimensione
//         if (minMq.value && minMq.value > el.metri_quadri) {
//             return false
//         }
//         if (maxMq.value && maxMq.value < el.metri_quadri) {
//             return false
//         }

//         // controllo arredamento
//         if (el.arredato == false && selectedArr.value === "true") {
//             return false
//         }

//         if (el.arredato == true && selectedArr.value === "false") {
//             return false
//         }

//         // controllo condizione
//         if (el.condizioni === "nuovo" && selectedArr.value === "ristrutturato") {
//             return false
//         }

//         if (el.arredato === "ristrutturato" && selectedArr.value === "nuovo") {
//             return false
//         }

//         return true;
//     })
// }

// BOTTONE MODALE RISULTATI RICERCA

// let btnModalSearch = document.querySelector("#btnModalSearch")
// let temporaryArray = []
// let resultWrapper = document.querySelector("#resultWrapper")
// let btnResultPage = document.querySelector("#btnResultPage")


// btnModalSearch.addEventListener("click", () => {

//     btnResultPage.classList.remove("d-none")
//     btnModalSearch.classList.add("d-none")
//     temporaryArray = filtroRicerca()
//     console.log(temporaryArray)
//     localStorage.setItem("filteredResults", JSON.stringify(temporaryArray));
//     temporaryArray = JSON.parse(localStorage.getItem("filteredResults"));

//     if (temporaryArray.length == 0) {
//         let div = document.createElement("div")
//         div.classList.add("col-12",)
//         div.innerHTML = `<h2 class="textFont marginCustomNotResult">Siamo spiacenti ma non è stato trovato nessun immobile.</h2>`
//         resultWrapper.appendChild(div)
//     } else {
//         temporaryArray.forEach(el => {
//             let div = document.createElement("div")
//             div.classList.add("col-8", "col-md-5", "justify-content-md-center", "justify-content-lg-center", "col-lg-4")
//             div.innerHTML = `<div class="card lastCard customCard noradius" style="width: 18rem;">
//                             <img src=${el.immagine}
//                                 alt="...">
//                             <h3 class="textFont pt-4 titleCard ps-4 pe-4 color-s">${el.titolo}</h3>
//                             <div class="card-body">
//                                 <p class="m-0">$el.descrizione}</p>
//                             </div>
//                             <button type="button" id="btinId${el.idImmobile}" class="btnCustom">Esplora</button>
//                         </div>`
//             resultWrapper.appendChild(div)
//         })
//     }
// })






