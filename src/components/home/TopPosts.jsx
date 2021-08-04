import PostCard from "../Post/PostCard"
import { useResistFetch } from "../../hooks/useResistFetch";
import { topPostsSelectors } from "../../store/selectors/postsSelector";
import { addTopPostsAction } from "../../store/actions/postActions";
import TopCategories from "./TopCategories";

import 'swiper/swiper.scss';
import '../../css/home/topPosts.scss'

export default function TopPosts() {
          const [loadingTopPosts, topPosts] = useResistFetch('/api/posts?limit=8', topPostsSelectors, addTopPostsAction)

          let postsCards = topPosts.map(post => {
                    return <PostCard post={post} key={post._id}/>
          })
          return (
                    <div className="top__posts">
                              <div className="posts__container">
                                        <h4>Top posts</h4>{loadingTopPosts && <div>loading ...</div>}
                                        <TopCategories />
                                        <div className="posts">
                                                  {!loadingTopPosts && postsCards}
                                        </div>
                              </div>
                    </div>
          )
}
