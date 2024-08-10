// apiUrl = https://api.dictionaryapi.dev/api/v2/entries/en/

const apiUrl = "https://api.dictionaryapi.dev/api/v2/entries/en/"
const result = document.querySelector(".result")
const sound = document.getElementById("sound")
const button = document.getElementById("search-btn")
const searchbox = document.querySelector(".search-box")

button.addEventListener("click", () => {
    let inpword = document.getElementById("input-word").value
    const response = fetch(`${apiUrl}${inpword}`).then(response => response.json()).then(data => {
        console.log(data)
        sound.src = `${data[0].phonetics[0].audio}`
        result.innerHTML = `
                <div class="word">
                    <h3>${inpword}</h3>
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
        // Getmeaning(inpword)
    }).catch((error)=>{
        result.innerHTML= `<p class = "error"> *Couldn't find the word</p>`
        console.error(error)
    })
})

function playSound(){
    sound.play();
}

// Hey there if you are reading this, I hope you have nice day
