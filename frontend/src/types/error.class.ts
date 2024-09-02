export class Error {
  constructor(public text: string = '', public enabled: boolean = false) {}
  set(text: string = '') {
    if (text == '') {
      this.enabled = false;
      this.text = '';
    }
    this.enabled = true;
    this.text = text;
  }
}
