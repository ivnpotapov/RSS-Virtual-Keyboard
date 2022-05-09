import Keyboard from './Keyboard';
import buttonsData from '../utils/buttonsData';

class Page {
  constructor() {
    this.body = document.body;
    this.title = 'RSS Virtual Keyboard';
    this.descrFirst = 'Клавиатура создана в операционной системе Windows';
    this.descrSecond = 'Для переключения языка комбинация: левыe Alt + Shift';
  }

  setNode(parent, tag, classList) {
    this.node = document.createElement(tag);
    this.node.className = classList;
    parent.append(this.node);
    return this.node;
  }

  setNodeText(parent, tag, classList, text) {
    this.node = document.createElement(tag);
    this.node.className = classList;
    this.node.textContent = text;
    parent.append(this.node);
    return this.node;
  }

  setInitialNodes() {
    this.container = this.setNode(this.body, 'div', 'container');
    this.setNodeText(this.container, 'h1', 'container__title', this.title);
    this.main = this.setNode(this.container, 'div', 'main');
    this.setNodeText(this.container, 'p', 'container__descr', this.descrFirst);
    this.setNodeText(this.container, 'p', 'container__descr', this.descrSecond);
    this.textarea = this.setNode(this.main, 'textarea', 'textarea');
    this.textarea.focus();
    this.keyboardNode = new Keyboard(buttonsData, this.textarea);
    this.main.append(this.keyboardNode.renderer());
  }

  setKeyboard() {
    this.keyboardNode.setKeyboard();
  }
}

export default Page;
