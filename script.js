const classSelect = document.getElementById("classSelect");
const topicInput = document.getElementById("topicInput");
const generateBtn = document.getElementById("generateBtn");
const progressContainer = document.getElementById("progressContainer");
const outputBox = document.getElementById("outputBox");

function sendToWebhook() {
    const selectedClass = classSelect.value.trim();
    const topic = topicInput.value.trim();

    if (!selectedClass || !topic) {
        alert("Please select a class and enter a topic.");
        return;
    }

    generateBtn.disabled = true;
    progressContainer.style.display = "block";
    outputBox.style.display = "none";
    outputBox.innerText = "";

    fetch("https://hook.eu2.make.com/ftw97mls4x3prfv1kjj8wtx6ctq2gago", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ class: selectedClass, topic: topic })
    })
    .then(response => response.text())
    .then(text => {
        progressContainer.style.display = "none";
        generateBtn.disabled = false;
        outputBox.style.display = "block";
        outputBox.innerText = text || "Request sent successfully. Content is being generated.";
    })
    .catch(error => {
        progressContainer.style.display = "none";
        generateBtn.disabled = false;
        alert("Webhook error. Check console for details.");
        console.error(error);
    });
}

topicInput.addEventListener("keypress", function(e) {
    if (e.key === "Enter") sendToWebhook();
});
