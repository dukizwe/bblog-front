import moment from "moment";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom"
import { postsSelectors, topPostsSelectors } from "../../store/selectors/postsSelector";


export default function PostDetail() {
          const { postId } = useParams()
          const [post, setPost] = useState({ loading: true, post: null})
          
          const posts = useSelector(postsSelectors)
          const topPosts = useSelector(topPostsSelectors)
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
                                                  const response = await fetch(`/api/posts/${postId}`)
                                                  const post = await response.json()
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
                    
                    <div className="container">
                              {
                                        post.loading ? <div>Loading...</div> : 
                                        <>
                                        <h1>{post.post.title}</h1>
                                        <div className="row">
                                                  <div className="col-md-8">
                                                            <p>
                                                                      {post.post.body}
                                                            </p>
                                                  </div>
                                                  <div className="col-md-4 pt-2 border rounded aside">
                                                            <p>
                                                                      <strong>Posted at: </strong><small className="text-muted">{moment(post.post.createdAt).calendar()}</small><br/>
                                                                      <strong>Comments: </strong><small className="text-muted">2 comments</small>
                                                            </p>
                                                            <div className="tags mt-4">
                                                                      <h6>Tags</h6>
                                                                      {post.post.tags.map(tag => {
                                                                                return <Link to={`/posts/tag/${tag._id}`} className="tag-name btn btn-outline-primary m-1" key={tag._id}>
                                                                                          {tag.name}
                                                                                </Link>
                                                                      })}
                                                            </div>
                                                            <div className="reactions mt-4">
                                                                      <h6 >Reactions</h6>
                                                            </div>
                                                            <div className="comments mt-4">
                                                                      <h6>Comments</h6>
                                                                      <form className="form">
                                                                                <div className="form-group">
                                                                                          <input type="text" className="form-control" id="name" placeholder="Full name" />
                                                                                </div>
                                                                                <div className="form-group mt-2">
                                                                                          <textarea id="body" className="form-control" placeholder="Content"></textarea>
                                                                                </div>
                                                                                <div className="form-group mt-2 text-lg-end">
                                                                                          <button className="btn btn-outline-primary">Send</button>
                                                                                </div>
                                                                      </form><hr/>
                                                                      <div className="all-comments">
                                                                                {true && <small className="no-comment text-muted">No comment yet</small>}
                                                                                <div className="comment mt-2">
                                                                                          <div className="comment-header">
                                                                                                    <div className="d-flex justify-content-between align-items-center">
                                                                                                              <div className="user d-flex align-items-center">
                                                                                                                        <div className="user-avatar mb-1 border">
                                                                                                                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/></svg>
                                                                                                                        </div>
                                                                                                                        <div className="user-name mb-2">
                                                                                                                                  <strong>Username</strong>
                                                                                                                        </div>
                                                                                                              </div>
                                                                                                              <div className="date">
                                                                                                                        <small className="text-muted">21/11/2013</small> 
                                                                                                              </div>
                                                                                                    </div>
                                                                                          </div>
                                                                                          <div className="comment-body">
                                                                                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea maiores dignissimos minima nostrum iste quam quasi pariatur velit vel! Dolorem veniam incidunt sunt nisi sapiente laborum quasi aperiam cumque veritatis?
                                                                                          </div>
                                                                                </div>
                                                                      </div>
                                                            </div>
                                                  </div>
                                        </div>
                                        </>
                              }
                    </div>
          )
}
