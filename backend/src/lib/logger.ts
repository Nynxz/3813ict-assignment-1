// https://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-font-color
export class Logger {
  static logGreen(text: string) {
    console.log(`\x1b[32m[gateway]: ${text}\x1b[0m`);
  }
  static logGreenUnderline(text: string) {
    console.log("\x1b[32m[gateway]: \x1b[4m" + text + "\x1b[0m");
  }
  static logRed(text: string) {
    console.error("[gateway]: " + text);
  }
  static logOrange(text: string) {
    console.warn("[gateway]: " + text);
  }
  static logOrangeUnderline(text: string) {
    console.warn("[gateway]: \x1b[4m" + text + "\x1b[0m");
  }
}
