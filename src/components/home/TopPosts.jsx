import PostCard from "../Post/PostCard"
import { useResistFetch } from "../../hooks/useResistFetch";
import { topPostsSelectors } from "../../store/selectors/postsSelector";
import { appendTopPostsAction } from "../../store/actions/postActions";
import TopCategories from "./TopCategories";
import Skeleton from "../main/Skeleton";

import 'swiper/swiper.scss';
import '../../css/home/topPosts.scss'
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectedCategorySelector } from "../../store/selectors/categorySelectors";

const LIMIT = 8

const Skeletons = () => {
          const fakePosts = []
          for (let i = 1; i <= LIMIT ; i++) {
                    fakePosts.push(i)
          }
          return  fakePosts.map(post => <div className="post__card" key={post}><Skeleton width="100%" height="100%" /></div>)
}

export default function TopPosts() {
          const [secondPostsLoading, setLoading] = useState(false)
          const [loadingTopPosts, topPosts] = useResistFetch(`/api/posts?limit=${LIMIT}`, topPostsSelectors, appendTopPostsAction)
          const selectedCategoryKey = useSelector(selectedCategorySelector)?._id || 'all'

          let postsCards = topPosts[selectedCategoryKey]?.map(post => {
                    return <PostCard post={post} key={post._id}/>
          })
          const blockedCls = secondPostsLoading ? 'blocked' : ''
          return (
                    <div className="top__posts">
                              <div className="posts__container">
                                        <h4>Top posts</h4>
                                        <TopCategories setPostsLoading={setLoading} secondPostsLoading={secondPostsLoading} />
                                        <div className={`posts ${blockedCls}`}>
                                                  {loadingTopPosts ? <Skeletons /> : postsCards}
                                        </div>
                              </div>
                    </div>
          )
}
