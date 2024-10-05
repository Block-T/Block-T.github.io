let toggleState = false;
function toggleInvertColors() {
    if (!toggleState) {
        document.documentElement.style.filter = 'invert(1)';
        toggleState = true
    } else {
        location.reload()
    }
}

window.onload = function() {
    var element = document.getElementById('MinecraftOnline');
    if (element) {
        element.parentNode.removeChild(element)
    }
};

const audio = document.getElementById('audio');
const tryPlay = async () => {
    try {
        await audio.play();
    } catch (error) {
        document.addEventListener('click', playOnInteraction, {
            once: true
        });
    }
};
const playOnInteraction = async () => {
    try {
        await audio.play();
    } catch (error) {
        console.log("Failed to play audio after user click:", error);
    }
};
tryPlay();