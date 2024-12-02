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
            result.innerHTML = `<p class="error">*Couldn't find the word "${word}"</p>`;
            console.error(error);
    }
}

button.addEventListener("click", () => {
    const word = inpword.value.trim();
    if (word) {
        getMeaning(word);
    } else {
        result.innerHTML = `<p class="error">Please enter a word to search.</p>`;
    }
});

function playSound() {
    sound.play();
}
