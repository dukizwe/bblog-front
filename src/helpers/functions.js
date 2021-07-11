export const subText = (text, max = 15) => {
          if(text.length < max || (text.indexOf(" ", max) === -1)) return text
          return text.substr(0, text.indexOf(" ", max))+'...'
}