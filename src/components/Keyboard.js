import Button from './Button';

class Keyboard {
  constructor(buttonsData, textarea) {
    this.preSet = localStorage.getItem('preSet')
      ? JSON.parse(localStorage.getItem('preSet'))
      : { isLang: false, isCapsLock: false, isShift: false };
    this.buttonsData = buttonsData;
    this.textarea = textarea;
    this.keyboardElements = {};
    this.keyboardNodes = {};
  }

  renderer() {
    this.keyboard = document.createElement('div');
    this.keyboard.classList.add('keyboard');
    this.buttonsData.forEach((el) => {
      const row = document.createElement('div');
      row.classList.add('keyboard__row');
      el.forEach((item) => {
        const button = new Button(item, this.preSet);
        this.keyboardElements[item.code] = button;
        this.keyboardNodes[item.code] = button.addButton();
        row.append(this.keyboardNodes[item.code]);
      });
      this.keyboard.append(row);
    });
    this.addListeners();
    this.setKeyboard();
    return this.keyboard;
  }

  setKeyboard() {
    if (this.preSet.isCapsLock) {
      this.keyboardNodes.CapsLock.classList.add('key_type_active');
    } else if (!this.preSet.isCapsLock) {
      this.keyboardNodes.CapsLock.classList.remove('key_type_active');
    }
    localStorage.setItem('preSet', JSON.stringify(this.preSet));
    Object.values(this.keyboardElements).forEach((el) => {
      el.setButton(this.preSet);
    });
  }

  setTextarea = (insert, caretPosition, caretMod, startMod, endMod) => {
    this.textarea.value = `${this.textarea.value.slice(
      0,
      caretPosition + startMod,
    )}${insert}${this.textarea.value.slice(caretPosition + endMod)}`;
    this.textarea.selectionStart = caretPosition + caretMod;
    this.textarea.selectionEnd = caretPosition + caretMod;
  };

  handleKey = (e) => {
    const caretPosition = this.textarea.selectionStart;
    const key = e.target.name ? e.target.name : e.code;
    switch (key) {
      case 'ControlLeft':
      case 'ControlRight':
      case 'AltLeft':
      case 'AltRight':
      case 'MetaLeft':
        break;
      case 'ShiftLeft':
        this.preSet.isShift = true;
        this.setKeyboard();
        break;
      case 'ShiftRight':
        this.preSet.isShift = true;
        this.setKeyboard();
        break;
      case 'CapsLock':
        this.preSet.isCapsLock = !this.preSet.isCapsLock;
        this.setKeyboard();
        break;
      case 'Backspace':
        this.setTextarea('', caretPosition, -1, -1, 0);
        break;
      case 'Delete':
        this.setTextarea('', caretPosition, 0, 0, 1);
        break;
      case 'Enter':
        this.setTextarea('\n', caretPosition, 1, 0, 0);
        break;
      case 'Tab':
        this.setTextarea('\t', caretPosition, 1, 0, 0);
        break;
      default:
        this.setTextarea(
          this.keyboardElements[key].key,
          caretPosition,
          1,
          0,
          0,
        );
        break;
    }
  };

  addListeners() {
    document.addEventListener('keydown', (e) => {
      e.preventDefault();
      if (e.shiftKey && e.altKey) {
        this.preSet.isLang = !this.preSet.isLang;
        this.setKeyboard();
      }
      if (this.keyboardNodes[e.code]) {
        this.handleKey(e);
        if (e.code !== 'CapsLock') {
          this.keyboardNodes[e.code].classList.add('key_type_active');
        }
      }
    });
    document.addEventListener('keyup', (e) => {
      e.preventDefault();
      if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') {
        this.preSet.isShift = false;
        this.setKeyboard();
      }
      if (this.keyboardNodes[e.code] && e.code !== 'CapsLock') {
        this.keyboardNodes[e.code].classList.remove('key_type_active');
      }
    });

    this.keyboard.addEventListener('mousedown', (e) => {
      e.preventDefault();

      if (this.keyboardNodes[e.target.name]) {
        this.handleKey(e);
        if (e.target.name !== 'CapsLock') {
          this.keyboardNodes[e.target.name].classList.add('key_type_active');
        }
      }
    });
    this.keyboard.addEventListener('mouseup', (e) => {
      e.preventDefault();
      if (
        e.target.name
        && (e.target.name === 'ShiftLeft' || e.target.name === 'ShiftRight')
      ) {
        this.preSet.isShift = false;
        this.setKeyboard();
      }
      if (
        [...e.target.classList].includes('key_type_active')
        && e.target.name !== 'CapsLock'
      ) {
        e.target.classList.remove('key_type_active');
      }
    });

    this.keyboard.addEventListener('mouseout', (e) => {
      if (
        e.target.name
        && (e.target.name === 'ShiftLeft' || e.target.name === 'ShiftRight')
      ) {
        this.preSet.isShift = false;
        this.setKeyboard();
      }
      if (
        [...e.target.classList].includes('key_type_active')
        && e.target.name !== 'CapsLock'
      ) {
        e.target.classList.remove('key_type_active');
      }
    });
  }
}

export default Keyboard;
