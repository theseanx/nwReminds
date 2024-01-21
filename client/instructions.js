async function loadSecrets() {
	const response = await fetch("./secrets.json");
	return await response.json();
}

async function instructions(keywords) {
    const secrets = await loadSecrets();
    const apiKey = await secrets.apiKey;

	// Fill this in yourself!
	// TODO: Fill in the fetch call

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${apiKey}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "model": "gpt-3.5-turbo",
            "messages": [
                {
                    "role": "system",
                    "content": "you represent a mindfulness assistant who recommends stretching exercises according to what problem areas they have"
                },
                {
                    "role": "user",
                    "content": "help me feel better"
                },
                {
                    "role": "user",
                    "content": keywords
                }
                

            ]
        })
    });

    
    const instructions = await response.json();
    // Update the webpage with the models
    console.log(instructions);
    updateAnswerBox(instructions.choices[0].message.content);

	// TODO: Fill in the rest of the function
}

function updateAnswerBox(responseText) {
	const answerBox = document.getElementById("generated-answer");
	answerBox.textContent = responseText;
}
