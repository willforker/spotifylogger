const localStorageKey = 'kxsc_robot';
const bg = document.querySelector('#bg');
const logo = document.querySelector('#kxsc-logo');
const spanText = document.querySelector('span');

window.onload = () => {
    const btnToggle = document.querySelector('#btn-toggle');
    if (!localStorage.getItem(localStorageKey)) {
        localStorage.setItem(localStorageKey, 'OFF');
    }

    const currentState = localStorage.getItem(localStorageKey);
    btnToggle.addEventListener('click', HandleButtonClick);
    UpdateUI(btnToggle, currentState);
}

const HandleButtonClick = async (event) => {
    const state = await localStorage.getItem(localStorageKey);
    localStorage.setItem(localStorageKey, state === "OFF" ? "ON" : "OFF");

    UpdateUI(event.target, localStorage.getItem(localStorageKey));
    
    if (state === "ON") {
        const response = await fetch('http://localhost:3000/kill');
    }
    else if (state === "OFF") {
        const response = await fetch('http://localhost:3000/execute');
    }
    
}

// Update UI based on current Robot State.
const UpdateUI = (button, state) => {
    bg.style.background = state === 'OFF' ? 'url(./public/BackgroundII.jpeg)' : 'url(./public/Background.jpeg)';
    button.src = state === 'OFF' ? './public/play-button.png' : './public/stop-circle.png';
    button.style.filter = state === 'OFF' ? 'invert(100%)' : 'invert(0%)';
    logo.style.filter = state === 'OFF' ? 'invert(0%)' : 'invert(100%)';
    spanText.innerText = state;
}