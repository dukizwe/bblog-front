import { useCallback, useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export function useResistFetch(url, selector, action, exception = false) {
          const [loading, setLoading] = useState(true)
          var data = useSelector(selector)
          const dispatch = useDispatch()

          const fetchPosts = useCallback(() => (async () => {
                    const response = await fetch(url)
                    const data = await response.json()
                    if(response.ok) {
                              setLoading(false)
                              dispatch(action(data))
                    } else {
                              setLoading(false)
                              dispatch(action([]))
                    }
          })(), [url, dispatch, action])

          const canIFetch = !data || data.length === 0

          useEffect(() => {
                    if(canIFetch || exception) {
                              fetchPosts()
                    } else {
                              setLoading(false)
                    }
          }, [exception, fetchPosts, canIFetch])
          return [loading, data]
}