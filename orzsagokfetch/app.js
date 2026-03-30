const kereso = document.getElementById("kereso")
const container = document.getElementById("container")

let orszag = ""

kereso.addEventListener("keydown", function(nyom) {
    if (nyom.key === "Enter") {
        Indit();
    }
});

function Indit(){
    container.innerHTML=""
    orszag=kereso.value
    try{
        fetch(`https://restcountries.com/v3.1/name/${orszag}`)
        .then(valasz => valasz.json())
        .then(adatok => {
            adatok.forEach(e => {
                const card = document.createElement("div")
                card.setAttribute("class", "card")
                container.appendChild(card)
    
                const orszagNev = document.createElement("h1")
                orszagNev.setAttribute("class", "orszagNev")
                orszagNev.textContent= e.name.official
                card.appendChild(orszagNev)
    
                const fovaros = document.createElement("h2")
                fovaros.setAttribute("class", "fovaros")
                fovaros.textContent=`Fővárosa: ${e.capital}`
                card.appendChild(fovaros)
    
                const lakossag = document.createElement("h2")
                lakossag.setAttribute("class", "lakossag")
                lakossag.textContent=`Lakossága: ${e.population} fő`
                card.appendChild(lakossag)
    
                const regio = document.createElement("h2")
                regio.setAttribute("class", "regio")
                regio.textContent=`Régió: ${e.region}`
                card.appendChild(regio)
    
                const zaszlo = document.createElement("img")
                zaszlo.setAttribute("class", "kep")
                zaszlo.src=e.flags.png
                card.appendChild(zaszlo)
            });
        })    
    }
    catch(hiba){
        //hiba kiiras
    }
}