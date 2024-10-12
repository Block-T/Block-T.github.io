/* 点击按钮实现颜色反转 */
let toggleState = false;
function toggleInvertColors() {
    if (!toggleState) {
        document.documentElement.style.filter = 'invert(1)';
        toggleState = true
    } else {
        location.reload()
    }
}

/* 删除MinecraftOnline元素 */
var element = document.getElementById('MinecraftOnline');
element.parentNode.removeChild(element);

/* JS非自动测试播放功能 */
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