const senditTexts = document.querySelector('.senditTexts');
const messages = [];

messages[0] = "Your no.1 delivery company";
messages[1] = "SendIT...Making life easier and Better";
messages[2] = "superFast and superNice";
messages[3] = "Pickup and Delivery made easy";
messages[4] = "We pickup and deliver anywhere";

function changeText(){
    senditTexts.innerHTML = messages[Math.floor(Math.random() * messages.length)];
}
setInterval(changeText, 3000);

setInterval(() => {
    const timeDiv = document.querySelector('.today')
    const date = new Date();
    const today = date.toLocaleTimeString();
    timeDiv.innerHTML = today;
}, 1000)
