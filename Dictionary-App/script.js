const apiUrl = "/api/proxy?word=";
const button = document.getElementById("search-btn");
const inpword = document.getElementById("input-word");
const result = document.getElementById("result");
const sound = document.getElementById("sound");

async function getMeaning(word) {
    try {
        // Fetch the data from the serverless function
        const response = await fetch(`${apiUrl}${encodeURIComponent(word)}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        const data = await response.json();

        // Check if data has the expected structure
        if (data && Array.isArray(data) && data[0]) {
            const wordData = data[0];
            const phonetics = wordData.phonetics && wordData.phonetics[0] ? wordData.phonetics[0] : {};
            const meanings = wordData.meanings && wordData.meanings[0] ? wordData.meanings[0] : {};

            // Safely access properties with fallback values
            const phoneticText = phonetics.text || "No phonetic text available";
            const phoneticAudio = phonetics.audio || "";
            const partOfSpeech = meanings.partOfSpeech || "No part of speech available";
            const definition = meanings.definitions && meanings.definitions[0] ? meanings.definitions[0].definition : "No definition available";
            const example = meanings.definitions && meanings.definitions[0] && meanings.definitions[0].example ? meanings.definitions[0].example : "No example available";

            // Update the UI with the data
            sound.src = phoneticAudio;
            result.innerHTML = `
                <div class="word">
                    <h3>${word}</h3>
                    <button onclick="playSound()">
                        <i class="fa-solid fa-volume-high"></i>
                    </button>
                </div>
                <div class="details">
                    <p>${partOfSpeech}</p>
                    <p>${phoneticText}</p>
                </div>
                <p class="word-meaning">
                    ${definition}
                </p>
                <p class="word-example">
                    ${example}
                </p>
            `;
        } else {
            result.innerHTML = `<p class="error">No data found for the word "${word}".</p>`;
        }
    } catch (error) {
        if (["motu", "motuu", "motuuu"].includes(inpword.value.toLowerCase())) {
            result.innerHTML = `<p class="error">Motu means you ><</p>`;
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
                <p class="word-example">
                    Rida eats a lot!<br>
                    Even a night before exam Rida is not studying (she's lazy)
                </p>
            `;
        } else {
            result.innerHTML = `<p class="error">*Couldn't find the word "${word}"</p>`;
        }
        console.error('Error:', error);
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
