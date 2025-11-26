import { ReactNode } from "react";

function decorate(message: ReactNode, inItalics: boolean, inBold: boolean): ReactNode {
  message = inBold ? <b>{message}</b> : message;
  return inItalics ? <i>{message}</i> : message;
}

export default function renderMessage(message: string): ReactNode[] {

  message = message.trim();

  let output: ReactNode[] = [];
  let i = 0;
  let inItalics = false;
  let inBold = false;
  
  while (true) {

    let nextNewline = message.indexOf('\n', i);
    let nextAsterisk = message.indexOf('*', i);

    if (nextNewline > 0 && nextNewline < nextAsterisk) {

      let currentSubstring = message.substring(i, nextNewline);
      if (currentSubstring.length > 0) {
        output.push(decorate(currentSubstring, inItalics, inBold));
      }
      output.push(<br/>);
      i = nextNewline + 1;

    } else if (nextAsterisk > 0) { // implies nextAsterisk < nextNewline

      let currentSubstring = message.substring(i, nextAsterisk);
      if (currentSubstring.length > 0) {
        output.push(decorate(currentSubstring, inItalics, inBold));
      }

      if (message.charAt(nextAsterisk + 1) === '*') {
        inBold = !inBold;
        i = nextAsterisk + 2;
      } else {
        inItalics = !inItalics;
        i = nextAsterisk + 1;
      }

    } else { // nextNewline === nextAsterisk === -1

      output.push(decorate(message.substring(i), inItalics, inBold));
      return output;

    }

  }

}