import moment from "moment";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom"
import { postsSelectors, topPostsSelectors } from "../../store/selectors/postsSelector";
import { PostImage } from "./PostCard";
import Skeleton from "../main/Skeleton";
import PostReactions from "./PostReactions";
import PostComments from "./Comments/PostComments";

import '../../css/post/postDetail.scss'
import { fetchApi, minNumber } from "../../helpers/functions";
import { userSelector } from "../../store/selectors/userSelector";

const Skeletons = () => {
          return <>
                    <Skeleton width="300px" height="10px" />
                    <Skeleton width="200px" height="10px" marginTop="5px" />
                    <Skeleton width="250px" height="10px" marginTop="5px" />
                    <Skeleton width="100px" height="10px" marginTop="5px" />
          </>
                              
}

const Categories = ({categories}) => {
          return categories.map(category => <Link to={`/posts?category=${category._id}`} key={category._id} className="link-group-item">{category.name}</Link>)
}
const Tags = ({categories: tags}) => {
          return tags.map(tag => <Link to={`/posts?tag=${tag._id}`} key={tag._id} className="link-group-item">{tag.name}</Link>)
}

export default function PostDetail() {
          const { postId } = useParams()
          const [post, setPost] = useState({ loading: true, post: null})
          const user = useSelector(userSelector)

          const posts = useSelector(postsSelectors)
          var topPosts = []
          Object.values(useSelector(topPostsSelectors)).map(posts => topPosts = [...topPosts, ...posts])
          const cashedPost = posts.find(post => post._id === postId) || 
                    topPosts.find(post => post._id === postId) ||
                    null

          useEffect(() => {
                    if(cashedPost) {
                              setPost({
                                        loading: false,
                                        post: cashedPost
                              })
                    } else {
                              (async () => {
                                        try {
                                                  const post = await fetchApi(`/posts/${postId}`)
                                                  setPost({
                                                            loading: false,
                                                            post: post
                                                  })
                                        } catch (error) {
                                                  setPost({
                                                            loading: false,
                                                            post: null
                                                  })
                                        }
                              })()
                    }
          }, [cashedPost, postId])
          return (
                    <div className="article__container">
                              {
                                        post.loading ?<Skeletons /> : 
                                        <>
                                        <div className="article__header">
                                                  <h1 className="title">{post.post.title}</h1>
                                        </div>
                                        <div className="image__container">
                                                  <PostImage image={post.post.image} isThumb={false} skeletonHeight="500px" />
                                        </div>
                                        <div className="article__row">
                                                  <div className="article__content">
                                                            <div className="content">
                                                                      {post.post.body}
                                                            </div>
                                                  </div>
                                                  <div className="article__description aside">
                                                            <div className="article__author">
                                                                      <h6 className="title">Written by</h6>
                                                                      <div className="author__report">
                                                                                <div className="author">
                                                                                          {
                                                                                                    post.post.user.image ?
                                                                                                    (<div className="image">
                                                                                                              <PostImage image={post.post.image} />
                                                                                                    </div>) : 
                                                                                                    (<div className="image image__empty">
                                                                                                              <img src="/static/images/person.png" alt="John doe" />
                                                                                                    </div>)
                                                                                          }
                                                                                          <div className="name">&nbsp;{post.post.user.username} | </div>
                                                                                          <div className="date"> &nbsp;{moment(post.post.createdAt).format("ddd, MMM D YYYY, h:mm")}</div>
                                                                                </div>
                                                                                <button className="report-comment">
                                                                                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-exclamation-circle" viewBox="0 0 16 16">
                                                                                          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                                                                          <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/>
                                                                                          </svg>
                                                                                </button>
                                                                      </div>
                                                            </div>
                                                            <hr />
                                                            <div className="article__reactions">
                                                                      <div className="reactions">
                                                                                <PostReactions postId={post.post._id} reactions={post.post.reactions} />
                                                                      </div>
                                                                      <div className="comments">
                                                                                <a href="#comments">{minNumber(post.post.reactions.comments)} comments</a>
                                                                      </div>
                                                            </div>
                                                            {/* <div className="article__outline">
                                                                      <div className="title">Article outline</div>
                                                                      <h5 className="active"><a href="#example">Lorem ipsum, dolor sit amet consectetur</a></h5>
                                                                      <h5><a href="#example"> adipisicing elit. Maxime beatae impedit maiores</a>!</h5>
                                                                      <h5><a href="#example">Molestiae, ullam ducimus, necessitatibus aperiam ea adipisc</a></h5>
                                                                      <h5><a href="#example">quia tempore fugiat blanditiis voluptatum</a></h5>
                                                                      <h5><a href="#example"> laboriosam tempora sapiente nulla, quas velit</a>!</h5>
                                                                      <h5><a href="#example">Molestiae, ullam ducimus, necessitatibus aperiam ea adipisc</a></h5>
                                                                      <h5><a href="#example">quia tempore fugiat blanditiis voluptatum</a></h5>
                                                                      <h5><a href="#example"> laboriosam tempora sapiente nulla, quas velit</a>!</h5>
                                                            </div> */}
                                                            <div className="article__categories">
                                                                      <h6 className="title">Categories</h6>
                                                                      <div className="link-group categories">
                                                                                <Categories categories={post.post.categories} />
                                                                      </div>
                                                            </div>
                                                            <div className="article__categories">
                                                                      <h6 className="title" className="title">Tags</h6>
                                                                      <div className="link-group tags">
                                                                                <Tags categories={post.post.categories} />
                                                                      </div>
                                                            </div>
                                                            <PostComments postId={post.post._id} />
                                                  </div>
                                        </div>
                                        </>
                              }
                    </div>
          )
}
