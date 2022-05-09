class Button {
  constructor(buttonData, preSet) {
    this.code = buttonData.code;
    this.enKey = buttonData.enKey;
    this.ruKey = buttonData.ruKey;
    this.enKeyShift = buttonData.enKeyShift
      ? buttonData.enKeyShift
      : buttonData.enKey;
    this.ruKeyShift = buttonData.ruKeyShift
      ? buttonData.ruKeyShift
      : buttonData.ruKey;
    this.type = buttonData.type;
    this.preSet = preSet;
  }

  addButton() {
    this.button = document.createElement('button');
    this.button.classList.add('key');
    this.button.setAttribute('name', this.code);
    this.button.setAttribute('type', 'button');
    this.setButton(this.preSet);
    return this.button;
  }

  setButton(preSet) {
    this.lang = preSet.isLang ? 'ru' : 'en';
    this.isCapsLock = preSet.isCapsLock;
    this.isShift = preSet.isShift ? 'Shift' : '';
    this.button.innerHTML = '';
    if (this.isShift && !this.type) {
      this.key = this[`${this.lang}KeyShift`];
    } else if (this.isCapsLock) {
      this.key = this[`${this.lang}Key`];
    } else {
      this.key = this[`${this.lang}Key`].toLowerCase();
    }
    this.button.textContent = this.key;

    if (this.type) {
      if (this.type.size) {
        this.button.classList.add(`key${this.type.size}`);
      }
      if (this.type.color) {
        this.button.classList.add('key_type_colored');
      }
    }
  }
}

export default Button;
