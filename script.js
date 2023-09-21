const KEY = "background-color";
const picker = document.getElementById('picker')

async function getSavedBackgroundColor() {
    return await chrome.storage.sync.get(KEY)
}

async function saveBackgroundColor(color) {
    await chrome.storage.sync.get({ [KEY]: color })
}

function setBackgroundColorVariable(color) {
    document.body.style.setProperty('--background-color', color)
}

chrome.storage.onChanged.addListener((changes, area) => {
    if (area === 'sync' && changes[KEY]) {
        setBackgroundColorVariable(changes[KEY].newValue)
    }
});

addEventListener('storage', ({ key, newValue }) => {
    if (key === KEY) {
        setBackgroundColorVariable(newValue)
    }
})

picker.addEventListener('input', (event) => {
    setBackgroundColorVariable(event.target.value)
})

picker.addEventListener('change', (event) => {
    saveBackgroundColor(event.target.value)
})

setBackgroundColorVariable(getSavedBackgroundColor())
