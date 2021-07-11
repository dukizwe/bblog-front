import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { useResistFetch } from "../../hooks/useResistFetch"
import { addPostsAction, appendPostsAction} from "../../store/actions/postActions"
import { postsSelectors } from "../../store/selectors/postsSelector"
import PostCard from "./PostCard"
import InfiniteScroll from 'react-infinite-scroll-component';
import { useState } from "react"

export default function Posts() {
          const { tagId } = useParams()
          const [skip, setSkip] = useState(0)
          const [hasMore, setHasMore] = useState(true)
          const dispatch = useDispatch()
          let uri = '/api/posts?limit=20'
          let resistException = false
          let action = appendPostsAction
          if(tagId) {
                    resistException = true
                    uri += `&tag=${tagId}`
                    action = addPostsAction
          }
          const [loading, posts] = useResistFetch(uri, postsSelectors, action, resistException)
          const [secondLoading, setLoading] = useState(false)
          const postsCards = posts.map((post, i) => {
                    return <div className="col-md-4" key={`${post._id}-${i}`}><PostCard post={post}/></div>
          })

          const fetchMorePosts = async () => {
                    setLoading(true)
                    setSkip(s => s + 20)
                    uri += `&skip=${skip + 20}`
                    const response = await fetch(uri)
                    const posts = await response.json()
                    setLoading(false)
                    if(response.ok) {
                              if(posts.length === 0) {
                                        setHasMore(false)
                              }
                              dispatch(appendPostsAction(posts))
                    }
          }
          console.log('posts')
          return (
                    <div className="container py-5">
                              <InfiniteScroll
                                                  dataLength={posts.length}
                                                  next={fetchMorePosts}
                                                  hasMore={hasMore}
                                                  loader={(loading || secondLoading) && <h4>Loading...</h4>}
                                        >
                                        <div className="row">
                                                  {postsCards}
                                        </div>
                              </InfiniteScroll>
                    </div>
          )
}
