import { useCallback, useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchApi } from "../helpers/functions";

export function useResistFetch(url, selector, action, exception = false) {
          const [loading, setLoading] = useState(true)
          var data = useSelector(selector)
          const dispatch = useDispatch()

          const fetchPosts = useCallback(() => (async () => {
                    try {
                              const data = await fetchApi(url)
                              setLoading(false)
                              dispatch(action(data))
                    } catch (error) {
                              console.log(error)
                              setLoading(false)
                              dispatch(action([]))
                    }
          })(), [url, dispatch, action])

          const canIFetch = !data || data.length === 0 || (Object.keys(data).length === 0 && data.constructor === Object)

          useEffect(() => {
                    if(canIFetch || exception) {
                              fetchPosts()
                    } else {
                              setLoading(false)
                    }
          }, [exception, fetchPosts, canIFetch])
          return [loading, data, setLoading]
}