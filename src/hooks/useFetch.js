import { useEffect, useState } from "react"

export default function useFetch(url) {
          const [state, setState] = useState({
                    loading: true,
                    items: []
          })
          useEffect(() => {
                    (async () => {
                              const response = await fetch(url)
                              const data = await response.json()
                              if(response.ok) {
                                        setState({
                                                  loading: false,
                                                  items: data
                                        })
                              } else {
                                        setState({
                                                  loading: false,
                                                  items: []
                                        })
                              }
                    })()
          }, [url])
          return [state.loading, state.items, setState]
}