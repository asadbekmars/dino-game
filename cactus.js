import { setCustomProperty,
         incrementCustomProperty,
         getCustomProperty,
 } from "./updateCustomProperty.js"

const SPEED = .05
const CACTUS_INTERVAL_MIN = 500
const CACTUS_INTERVAL_MAX = 2000
const worldElem = document.querySelector("[data-world]")

let nextCactusTime
export function setupCactus(){
    nextCactusTime = CACTUS_INTERVAL_MIN
    document.querySelectorAll("[data-cactus]").forEach(cactus => {
        cactus.remove()
    })
}


export function updateCactus(delta, speedScale){
    document.querySelectorAll("[data-cactus]").forEach(cactus =>{
        incrementCustomProperty(cactus,"--left", delta * speedScale * SPEED * -1)
        if(getCustomProperty(cactus, "--left") <= -100){
            cactus.remove()
        }
    })

    // random cactus---------------
    if(nextCactusTime <=0){
        createCavtus()
        nextCactusTime = randomNumberBetween(CACTUS_INTERVAL_MIN,
        CACTUS_INTERVAL_MAX) / speedScale
    }
    nextCactusTime -=delta
}

export function getCactusRects(){
    return [...document.querySelectorAll("[data-cactus]")].map(cactus => {
        return cactus.getBoundingClientRect()
    })
}

// Creative Cactus---------
function createCavtus(){
    const cactus = document.createElement("img")
    cactus.dataset.cactus = true
    cactus.src = "images/cactus2.png"
    cactus.classList.add("cactus")
    setCustomProperty(cactus, "--left", 100)
    worldElem.append(cactus)
}
// cactus creative random-----------
function randomNumberBetween(min,max){
    return Math.floor(Math.random()*(max - min + 1)+ min)
}