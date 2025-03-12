fetch("./array.json").then((response) => response.json()).then((data) => {

    // FUNZIONE STAMPA CARD

    let cardWrapper = document.querySelector("#cardWrapper")

    function stampaCard(array) {
        cardWrapper.innerHTML = ""
        array.forEach((el) => {
            let div = document.createElement("div")
            div.classList.add("col-6", "col-md-5", "justify-content-md-evenly", "col-lg-3", "m-2")
            div.innerHTML = `
                            <div class="card lastCard customCard noradius">
                                <img src=${el.immagine}
                                    alt="...">
                                <h3 class="titleFont pt-4 titleCard ps-4 pe-4 color-s">${el.titolo}</h3>
                                <div class="card-body">
                                    <p class="m-0 textFont">${el.descrizione}</p>
                                </div>
                                <div>
                                    <p class="m-0 text-center fontPrice">${el.prezzo}€</p>
                                </div>
                                <button type="button" id="${el.idImmobile}" data-bs-target="#exampleModal" data-bs-toggle="modal" class="btnCustom">Esplora</button>
                            </div>
                        `
            cardWrapper.appendChild(div)

        })
        addEventListenerButtonCard()
    }




    // CREAZIONE CATEGORIE DINAMICHE

    let inputType = document.querySelector("#inputType")


    function setCategory() {
        let categories = data.map(({ tipologia, nome_tipologia }) => ({ tipologia, nome_tipologia }))
        let nomeCategorie = [];

        categories.forEach((singolaCategoria) => {
            if (!nomeCategorie.some(categoria => categoria.tipologia === singolaCategoria.tipologia && categoria.nome_tipologia === singolaCategoria.nome_tipologia)) {
                nomeCategorie.push(singolaCategoria);
            }
        })

        nomeCategorie.forEach((el) => {
            let option = document.createElement("option")
            option.setAttribute("value", `${el.tipologia}`)
            option.innerText = el.nome_tipologia
            inputType.appendChild(option)
        })
    }
    setCategory()

    //FILTRO CATEGORIA

    inputType.addEventListener("change", () => {
        globalFilter()
        // addEventListenerButtonCard()
    })

    function filterByCategory(array) {
        let categoria = inputType.value
        if (categoria == "all") {
            return array
        } else {
            let filtered = array.filter((el) => el.tipologia == categoria)
            return filtered
        }
    }



    //CREAZIONE PREZZI DINAMINICI

    let minPrice = document.querySelector("#minPrice")
    let maxPrice = document.querySelector("#maxPrice")
    let textMaxPrice = document.querySelector("#textMaxPrice")
    let textMinPrice = document.querySelector("#textMinPrice")

    function setMinMaxPrice() {
        let mapped = data.map((el) => el.prezzo)
        let prezzoMinimo = Math.min(...mapped)
        let prezzoMassimo = Math.max(...mapped)

        //settaggi barra minimo
        minPrice.min = prezzoMinimo
        minPrice.max = prezzoMassimo
        minPrice.value = prezzoMinimo
        // settaggi barra massimo
        maxPrice.min = prezzoMinimo
        maxPrice.max = prezzoMassimo
        maxPrice.value = prezzoMassimo
        textMinPrice.innerHTML = `Da: ${prezzoMinimo} €`
        textMaxPrice.innerHTML = `A: ${prezzoMassimo} €`


    }

    setMinMaxPrice()

    // FILTRO PER PREZZO


    function filterByPrice(array) {
        let filtered = array.filter((el) => el.prezzo >= Number(minPrice.value) && el.prezzo <= Number(maxPrice.value))

        return filtered;
    }

    minPrice.addEventListener("input", () => {
        textMinPrice.innerHTML = `Da: ${minPrice.value} €`
        globalFilter()
        // addEventListenerButtonCard()
    })
    maxPrice.addEventListener("input", () => {
        textMaxPrice.innerHTML = `A: ${maxPrice.value} €`
        globalFilter()
        // addEventListenerButtonCard()
    })

    //CITTA' DINAMICHE

    let inputCity = document.querySelector("#inputCity")

    function setCity() {
        let citta = data.map((el) => el.citta)
        let nomiCitta = []

        citta.forEach((singolaCitta) => {
            if (!nomiCitta.includes(singolaCitta))
                nomiCitta.push(singolaCitta)
        })

        nomiCitta.forEach((el) => {
            let option = document.createElement("option")
            option.innerText = el
            option.value = el
            inputCity.appendChild(option)
        })
    }

    setCity()

    //FILTRO CITTA'

    inputCity.addEventListener("change", () => {
        globalFilter()
        // addEventListenerButtonCard()
    })

    function filterByCity(array) {
        let cittaSelezionata = inputCity.value
        if (cittaSelezionata == "all") {
            return array
        } else {
            let filtered = array.filter((el) => el.citta.toLowerCase() == cittaSelezionata.toLowerCase())
            return filtered
        }

    }

    //FILTRO PER PAROLA

    let testoRicerca = document.querySelector("#testoRicerca")

    function filterByWord(array) {
        let filtered = array.filter((el) => el.descrizione.toLowerCase().includes(testoRicerca.value.toLowerCase()))
        return filtered
    }

    testoRicerca.addEventListener("input", () => {
        globalFilter()
        // addEventListenerButtonCard()
    })

    //FILTRO GLOBALE

    function globalFilter() {
        let cat = filterByCategory(data)
        let prezzo = filterByPrice(cat)
        let citt = filterByCity(prezzo)
        let word = filterByWord(citt)
        if (!word.length == 0) {
            stampaCard(word)
            return word
        } else {
            cardWrapper.innerHTML = ""
            let div = document.createElement("div")
            div.innerHTML = `
                                <h4 class="textfont">Purtoppo non abbiamo a disposizione un immobile che siddisfi le tue esigenze.</h4>
                                <p class="textfont">Prova a modificare i parametri di ricerca.</p> 
                            `
            cardWrapper.appendChild(div)
        }
    }



    // BOTTNE VISUALIZZAZIONE ARTICOLO


    const modale = new bootstrap.Modal(document.querySelector("#exampleModal"))
    let modalWrapper = document.querySelector("#modalWrapper")

    function addEventListenerButtonCard() {
        let buttonSelector = document.querySelectorAll(".btnCustom")
        console.log(buttonSelector)



        if (buttonSelector) { //agiamo se è presente quacle bottone nel documento
            buttonSelector.forEach((button) => {
                button.addEventListener("click", (event) => {
console.log("ho cliccato")
                    let filtrati = globalFilter()
                    let buttonId = event.target.id
                    filtrati.forEach(el => {
                        if (buttonId == el.idImmobile) {
                            console.log(el)
                            modalWrapper.innerHTML = ""
                            let div = document.createElement("div")
                            div.classList.add("modal-content")
                            let arredamento = ""
                            if (el.arredato) {
                                arredamento = "Arredato"
                            } else {
                                arredamento = "Non arredato"
                            }
                            console.log(arredamento)
                            div.innerHTML =
                                `
                            <div class="d-flex justify-content-between customHeight">
                                <h1 class="titleFont p-4" id="exampleModalLabel">${el.titolo}</h1>
                                <button type="button" class="btn-close color-s p-3" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                                    </div>
                                    <div class="borderModal ms-auto my-2 w-75"></div>
                                    <div class="modal-body">
                                    <div class="container">
                                    <div class="row">
                                    <div class="col-12 col-md-6 col-lg-6 justify-content-evenly">
                                            <div>
                                                <div >
                                                <img src = ${el.immagine} class= "w-100">
                                                </div>
                                                <div>
                                                <p class="textFont">${el.descrizione}</p>
                                                </div>
                                                </div>
                                                </div>
                                                <div class="col-12 col-md-6 col-lg-6 justify-content-evenly">
                                                <div>
                                                <h4 class="titleFont">Vani: ${el.numero_stanze}</h4>
                                                <h4 class="titleFont">Bagni: ${el.numero_bagni}</h4>
                                                <h4 class="titleFont">Dimensione: ${el.metri_quadri} mq</h4>
                                                <h4 class="titleFont">Anno di costruzione: ${el.anno_costruzione}</h4>
                                                <h4 class="titleFont">Stato immobile: ${el.condizioni}</h4>
                                                <h4 class="titleFont">${arredamento}</h4>
                                                </div>
                                                </div>
                                                </div>
                                                <div class="row">
                                                <div class="col-12">
                                                <p class="titleFont">L'immobile si trova a ${el.citta} in ${el.indirizzo}.</p>
                                                <h5 class="titleFont">Prezzo: ${el.prezzo}€</h5>
                                                </div>
                                                </div>
                                                </div>
                                                </div>
                                                <div class="d-flex justify-content-center p-3">
                                                <button type="button" class="btnCustom m-auto" data-bs-dismiss="modal">Chiudi</button>
                                                </div>
                            `
                            modalWrapper.appendChild(div)
                            modale.show();

                        }
                    });
                })
            })

        }
    }

})





