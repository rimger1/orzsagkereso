const kereso = document.getElementById("kereso")
const container = document.getElementById("container")
const gomb = document.getElementById("gomb")

let orszag = ""

gomb.addEventListener("click", keres)

kereso.addEventListener("keydown", function(muchogusto) {
    if (muchogusto.key === "Enter") {
        keres()
    }
});

function keres(){
    container.innerHTML=""
    const tolto = document.createElement("img")
    tolto.src="loading.gif"
    tolto.style.height="800px"
    tolto.style.width="1800px"
    container.appendChild(tolto)
    Indit();
}

async function Indit(){
    orszag=kereso.value
    try{
        const valasz = await fetch(`https://restcountries.com/v3.1/name/${orszag}`)

        const adatok = await valasz.json()
        container.innerHTML=""

        if (!valasz.ok) {
            throw new Error("Nincs ilyen ország!")
        }
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
                


                card.style.border="solid 4px black"
                card.style.width="30%"
                card.style.borderRadius="25px"
                card.style.textAlign="center"
                card.style.display = "inline-block"
                card.style.margin="5px"
                container.style.margin="5px"
                zaszlo.style.width="200px"
                zaszlo.style.height="100px"
                card.style.backgroundColor="#A3FF00"
        })
    }
    catch(e){
        const card = document.createElement("div")
        card.setAttribute("class", "card")
        container.appendChild(card)

        const hiba = document.createElement("p")
        hiba.setAttribute("class", "hiba")
        hiba.textContent=e.message
        card.appendChild(hiba)


        card.style.border="solid 4px black"
        card.style.width="30%"
        card.style.borderRadius="25px"
        card.style.textAlign="center"
        card.style.display = "inline-block"
        card.style.margin="5px"
        container.style.margin="5px"
        card.style.backgroundColor="#A3FF00"

    }
}