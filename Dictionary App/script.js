const apiUrl = "/api/proxy?word=";
const button = document.getElementById("search-btn");
const inpword = document.getElementById("input-word");
const result = document.getElementById("result");
const sound = document.getElementById("sound");

async function getMeaning(word) {
    try {
        const response = await fetch(`${apiUrl}${encodeURIComponent(word)}`);
        const data = await response.json();
        console.log(data);
        sound.src = `${data[0].phonetics[0].audio}`;
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
            <p class="word-example">${data[0].meanings[0].definitions[0].example ? data[0].meanings[0].definitions[0].example : ""}</p>`;
    } catch (error) {
        if (["motu", "motuu", "motuuu"].includes(inpword.value.toLowerCase())) {
            result.innerHTML = `<p class="error">Motu means you ><</p>`;
            console.error(error);
        } else if (["rida fatima", "rida"].includes(inpword.value.toLowerCase())) {
            result.innerHTML = `
                <div class="word">
                    <h3>Rida</h3>
                    <button onclick="playSound()">
                        <i class="fa-solid fa-volume-high"></i>
                    </button>
                </div>
                <div class="details">
                    <p>Noun</p>
                    <p>/rida/</p>
                </div>
                <p class="word-meaning">
                    A motuu (cute) animal that sleeps day and night <3
                </p>
                <p class="word-example">Rida eats a lot!<br>
                Even a night before exam Rida is not studying (she's lazy)</p>`;
            console.error(error);
        } else {
            result.innerHTML = `<p class="error">*Couldn't find the word "${word}"</p>`;
            console.error(error);
        }
    }
}

button.addEventListener("click", () => {
    getMeaning(inpword.value);
});

function playSound() {
    sound.play();
}
