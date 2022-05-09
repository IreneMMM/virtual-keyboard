let keys = document.querySelectorAll('.keys');

const Keyboard = {
    elements: {
        main: null,
        title: null,
        textArea: null,
        keysContainer: null,
        keys: []
    },

    eventHandlers: {
        oninput: null,
        onclose: null
    },

    properties: {
        value: "",
        capsLock: false
    },

    init() {
        this.elements.main = document.createElement("div");
        this.elements.title = document.createElement("p");
        this.elements.textArea = document.createElement("textarea");
        this.elements.keysContainer = document.createElement("div");

        this.elements.main.classList.add("keyboard");
        this.elements.title.classList.add("title");
        this.elements.title.textContent = "RSS Виртуальная клавиатура";
        this.elements.textArea.classList.add("textarea");
        this.elements.keysContainer.classList.add("keyboard__keys");
        this.elements.keysContainer.appendChild(this._createKeys());
        this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");

        this.elements.main.appendChild(this.elements.keysContainer);
        document.body.appendChild(this.elements.title);
        document.body.appendChild(this.elements.textArea);
        document.body.appendChild(this.elements.main);

        document.querySelectorAll(".textarea").forEach(element => {
            element.addEventListener("focus", () => {
                this.open(element.value, currentValue => {
                    element.value = currentValue;
                });
            });
        });
    },

    _createKeys() {
        const fragment = document.createDocumentFragment();
        const keyLayout = [
            "`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "backspace",
            "tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "\\", "Del",
            "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "enter",
            "Shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "up", "Shift",
            "Ctrl", "Win", "Alt", "space", "Alt", "left", "down", "right", "Ctrl"
        ];

        const createIconHTML = (icon_name) => {
            return `<i class="material-icons">${icon_name}</i>`;
        };

        keyLayout.forEach(key => {
            const keyElement = document.createElement("button");
            keyElement.setAttribute("type", "button");
            keyElement.classList.add("keyboard__key");

            switch (key) {
                case "backspace":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.innerHTML = createIconHTML("Backspace");

                    keyElement.addEventListener("click", () => {
                        this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
                        this._triggerEvent("oninput");
                    });

                    break;              

                case "caps":
                    keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
                    keyElement.innerHTML = createIconHTML("Capslock");

                    keyElement.addEventListener("click", () => {
                        this._toggleCapsLock();
                        keyElement.classList.toggle("keyboard__key--active", this.properties.capsLock);
                    });

                    break;

                case "enter":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.innerHTML = createIconHTML("Enter");

                    keyElement.addEventListener("click", () => {
                        this.properties.value += "\n";
                        this._triggerEvent("oninput");
                    });

                    break;

                case "space":
                    keyElement.classList.add("keyboard__key--extra-wide");
                    keyElement.innerHTML = createIconHTML("Space");

                    keyElement.addEventListener("click", () => {
                        this.properties.value += " ";
                        this._triggerEvent("oninput");
                    });

                    break;

                case "Shift":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.innerHTML = createIconHTML("Shift");

                    break;

                default:
                    keyElement.textContent = key.toLowerCase();

                    keyElement.addEventListener("click", () => {
                        this.properties.value += this.properties.capsLock ? key.toUpperCase() : key.toLowerCase();
                        this._triggerEvent("oninput");
                    });

                    break;
            }

            fragment.appendChild(keyElement);

        });

        return fragment;
    },

    _triggerEvent(handlerName) {
        if (typeof this.eventHandlers[handlerName] == "function") {
            this.eventHandlers[handlerName](this.properties.value);
        }
    },

    _toggleCapsLock() {
        this.properties.capsLock = !this.properties.capsLock;

        for (const key of this.elements.keys) {
            if (key.childElementCount === 0) {
                key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
            }
        }
    },

    open(initialValue, oninput, onclose) {
        this.properties.value = initialValue || "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
    },

    close() {
        this.properties.value = "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
    }
};

window.addEventListener('keydown', function (e) {
    for (let i = 0; i < keys.length; i++) {
        if (e.key == keys[i].getAttribute('keyname') || e.key == keys[i].getAttribute('lowerCaseName')) {
            keys[i].classList.add('active')
        }
        if (e.code == 'Space') {
            spaceKey.classList.add('active')
        }
        if (e.code == 'ShiftLeft') {
            shift_right.classList.remove('active')
        }
        if (e.code == 'ShiftRight') {
            shift_left.classList.remove('active')
        }
        if (e.code == 'CapsLock') {
            caps_lock_key.classList.toggle('active');
        }
    }
})

window.addEventListener('keyup', function (e) {
    for (let i = 0; i < keys.length; i++) {
        if (e.key == keys[i].getAttribute('keyname') || e.key == keys[i].getAttribute('lowerCaseName')) {
            keys[i].classList.remove('active')
            keys[i].classList.add('remove')
        }
        if (e.code == 'Space') {
            spaceKey.classList.remove('active');
            spaceKey.classList.add('remove');
        }
        if (e.code == 'ShiftLeft') {
            shift_right.classList.remove('active')
            shift_right.classList.remove('remove')
        }
        if (e.code == 'ShiftRight') {
            shift_left.classList.remove('active')
            shift_left.classList.remove('remove')
        }
        setTimeout(() => {
            keys[i].classList.remove('remove')
        }, 200)
    }
})

window.addEventListener("DOMContentLoaded", function () {
    Keyboard.init();
});