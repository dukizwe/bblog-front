import numeral from "numeral"

export const subText = (text, max = 15) => {
          if(text.length < max || (text.indexOf(" ", max) === -1)) return text
          return text.substr(0, text.indexOf(" ", max))+'...'
}

export const minNumber = (number) => {
          if(number < 1000) return number
          return numeral(number).format('0.0a')
}