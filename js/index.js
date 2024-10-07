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

(function(global) {
    const NoBackLibrary = {
        retryCount: -1,
        successCallback: null,
        errorCallback: null,

        init: function(options = {}) {
            this.retryCount = options.retries ?? -1;
            this.successCallback = options.successCallback ?? null;
            this.errorCallback = options.errorCallback ?? null;
            this._setHistory();
        },

        _setHistory: function() {
            try {
                history.pushState(null, null, document.URL);
                window.addEventListener('popstate', this._handlePopState.bind(this));
            } catch (e) {
                if (this.errorCallback) {
                    this.errorCallback(e);
                }
            }
        },

        _handlePopState: function() {
            if (this.retryCount === 0) {
                if (this.errorCallback) {
                    this.errorCallback();
                }
                return;
            }
            if (this.retryCount > 0) {
                this.retryCount--;
            }
            history.pushState(null, null, document.URL);
            if (this.successCallback) {
                this.successCallback();
            }
        },
    };

    // 导出为全局对象
    global.NoBackLibrary = NoBackLibrary;

})(window);

NoBackLibrary.init({
    retries: 2,
    successCallback: function() {
        console.log('劝流用户不要离开');
    },
    errorCallback: function(error) {
        alert('你确定要离开吗？或许你还可以多看看。');
    }
});

// 写上JS统计代码