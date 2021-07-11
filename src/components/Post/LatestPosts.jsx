import {Swiper, SwiperSlide} from "swiper/react"
import PostCard from "./PostCard"

import 'swiper/swiper.scss';
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useResistFetch } from "../../hooks/useResistFetch";
import { topPostsSelectors } from "../../store/selectors/postsSelector";
import { addTopPostsAction } from "../../store/actions/postActions";

export default function LatestPosts() {
          const [loadingTopPosts, topPosts] = useResistFetch('/api/posts', topPostsSelectors, addTopPostsAction)
          const [secondLoading, setLoading] = useState(false)
          const dispatch = useDispatch()
          
          const MAX_POSTS = 10
          const [skip, setSkip] = useState(0)

          const fecthAnotherPosts = async () => {
                    setLoading(true)
                    setSkip(oldSkip => oldSkip + MAX_POSTS)
                    const response = await fetch(`api/posts?skip=${skip + MAX_POSTS}`)
                    const data = await response.json()
                    setLoading(false)
                    dispatch(addTopPostsAction(data))
          }
          let postsCards = topPosts.map((post, i) => {
                    return <SwiperSlide className="w-25" key={post._id+i}>
                                        <PostCard post={post} key={"hy"+post._id}/>
                              </SwiperSlide>
          })
          if(secondLoading) {
                    postsCards = [...postsCards, <SwiperSlide className="w-25" key="loading"><div className="loader" key="loader">Loading...</div></SwiperSlide>]
          }
          return (
                    <div className="album py-5 bg-light">
                              <div className="container">
                                        <h4>Top posts</h4>{loadingTopPosts && <div>loading ...</div>}
                                        <Swiper
                                                  slidesPerView= 'auto'
                                                  spaceBetween= {10}
                                                  observer= {true}
                                                  observeParents={true}
                                                  onReachEnd={() => !loadingTopPosts && !secondLoading && fecthAnotherPosts()}
                                        >
                                                  {!loadingTopPosts && postsCards}
                                        </Swiper>
                              </div>
                    </div>
          )
}
