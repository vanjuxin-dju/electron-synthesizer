const soundFontsList = document.getElementById('soundfontslist')
const presetsList = document.getElementById('presetslist')

const getPresets = async (fileName) => {
    const presets = await window.synthAPI.presets(fileName);
    presetsList.innerHTML = "";
    presets.forEach(element => {
        const newOption = document.createElement("option");
        newOption.innerText = element;
        presetsList.append(newOption);
    });
}

soundFontsList.onchange = (e) => {
    getPresets(e.target.value);
}

const init = async () => {
    const files = await window.synthAPI.files();
    files.forEach(element => {
        const newOption = document.createElement("option");
        newOption.innerText = element;
        soundFontsList.append(newOption);
    });
    soundFontsList.value = soundFontsList.options[0].value;
    getPresets(soundFontsList.value);
}

init()