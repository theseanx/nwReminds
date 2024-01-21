import {createChat} from "./instructions.js";

document.addEventListener('DOMContentLoaded', () => {

    document.getElementById('generateResponseButton').addEventListener('click', () => {
        // const inputText = document.getElementById('text-prompt').value;
        const instructions = "arms";
        console.log("Input text:", instructions);
        createChat(instructions);
    });

    // Add similar event listeners for other buttons
});


