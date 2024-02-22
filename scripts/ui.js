let coinCountDiv = document.createElement("div");
coinCountDiv.classList.add("coin");
coinCountDiv.innerHTML = '<p>' + coinCount + '</p>';
document.body.appendChild(coinCountDiv);

function createCoinCount() {

    coinCountDiv.innerHTML = '<p>' + coinCount + '</p>';

}