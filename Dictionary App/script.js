// apiUrl = https://api.dictionaryapi.dev/api/v2/entries/en/

const apiUrl = "https://api.dictionaryapi.dev/api/v2/entries/en/"
const button = document.getElementById("search-btn")
const inpword = document.getElementById("input-word")
const result = document.getElementById("result")
const sound = document.getElementById("sound")


async function getMeaning(word) {
    const response = await fetch(`${apiUrl}${word}`)
    const value = await response.json().then(data => {
        console.log(data)
        sound.src = `${data[0].phonetics[0].audio}`
        result.innerHTML = `
            <div class="word">
            <h3>${word}</h3>
            <button onclick="playSound()">
                            <i class="fa-solid fa-volume-high"></i>
                            </button>
                            </div>
                            <div class="details">
                            <p>${data[0].meanings[0].partOfSpeech}</p>
                            <p>${data[0].phonetics[0].text}</p>
                            </div>
                            <p class="word-meaning">
                            ${data[0].meanings[0].definitions[0].definition}
                            </p>          
                            <p class="word-example">${data[0].meanings[0].definitions[0].example ? data[0].meanings[0].definitions[0].example : ""}<p>`


    }).catch((error) => {
        if (inpword.value.toLowerCase() === "motu" || "motuu" || "motuuu") {
            result.innerHTML = `<p class = "error">Motu means you ><</p>`
            console.error(error)
        } else {
            result.innerHTML = `<p class = "error">*Could'nt find the word "${word}"</p>`
            console.error(error)
        }
    })
}

button.addEventListener("click", () => {
    getMeaning(inpword.value)
})

function playSound() {
    sound.play()
}
