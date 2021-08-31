import numeral from "numeral"

export const subText = (text, max = 15) => {
          if(text.length < max || (text.indexOf(" ", max) === -1)) return text
          return text.substr(0, text.indexOf(" ", max))+'...'
}

export const minNumber = (number) => {
          if(number < 1000) return number
          return numeral(number).format('0.0a')
}
/**
 * fetch data from api wiht default options
 * @param {string} url - the url to fetch to
 * @param {object} options - additional options
 * @returns {Promise}
 */
export const fetchApi = async (url, options = {}) => {
          const user = JSON.parse(localStorage.getItem('user'))
          if (user) options = {...options, headers: {...options.headers, authorization: `bearer ${user.token}`}}
          const response = await fetch(`/api${url}`, {
                    ...options
          })
          if(response.ok) {
                    return response.json()
          } else {
                    throw await response.json()
          }
}
/**
 * create new reaction
 * @param {String} url - link to call
 * @returns {Array[loading, reactions]}
 */
export const react = async (url) => {
          let loading = true
          const reactions = await fetchApi(url, {
                    method: 'PUT'
          })
          loading = false
          return [loading, reactions]
}