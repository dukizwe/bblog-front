import PostCard from "../Post/PostCard"
import { useResistFetch } from "../../hooks/useResistFetch";
import { topPostsSelectors } from "../../store/selectors/postsSelector";
import { addTopPostsAction } from "../../store/actions/postActions";

import 'swiper/swiper.scss';
import '../../css/home/topPosts.scss'
import {Swiper, SwiperSlide} from "swiper/react";
// import { SwiperSlide } from "swiper/swiper-react";

export default function TopPosts() {
          const [loadingTopPosts, topPosts] = useResistFetch('/api/posts?limit=8', topPostsSelectors, addTopPostsAction)

          let postsCards = topPosts.map(post => {
                    return <PostCard post={post} key={post._id}/>
          })
          const categories = []
          for(let i = 0; i < 20; i++) {
                    categories.push(0)
          }
          return (
                    <div className="top__posts">
                              <div className="posts__container">
                                        <h4>Top posts</h4>{loadingTopPosts && <div>loading ...</div>}
                                        <div className="categories">
                                                  <Swiper
                                                            slidesPerView= 'auto'
                                                            spaceBetween= {10}
                                                            observer= {true}
                                                            observeParents={true}
                                                  >
                                                            {categories.map((category, i) => {
                                                                      const active = i === 0 ? 'active' : ''
                                                                      return (<SwiperSlide className="category">
                                                                                
                                                                                <button className={active}>Category {i}</button>
                                                                      </SwiperSlide>)
                                                            })}
                                                  </Swiper>
                                        </div>
                                        <div className="posts">
                                                  {!loadingTopPosts && postsCards}
                                        </div>
                              </div>
                    </div>
          )
}
