import moment from "moment";
import { memo } from "react";
import { Link } from "react-router-dom";
import { subText } from "../../helpers/functions";

export default memo(function PostCard({ post }) {
          return (
                    <div className="card mb-4 box-shadow">
                              {post.image && <Link to={`/post/${post._id}`} className="post-link"><img className="card-img-top" src={`http://localhost:8080/uploads/posts/${post.image}`} alt={post.title} /></Link>}
                              <div className="card-body">
                                        <Link to={`/post/${post._id}`} className="post-link">
                                                  <h5 className="card-title">{subText(post.title)}</h5>
                                                  <p className="card-text">
                                                            {subText(post.body, 100)}
                                                  </p>
                                        </Link>
                                        <div className="mb-2">
                                                  <div className="btn-group d-flex flex-wrap">
                                                            {post.tags.map(tag => {
                                                                      return <Link to={`/posts/tag/${tag._id}`} className="btn btn-sm btn-outline-primary mt-1">{tag.name}</Link>
                                                            })}
                                                  </div>
                                        </div>
                                        <div className="d-flex justify-content-between align-items-center">
                                                  <div className="btn-group">
                                                            <button type="button" className="btn btn-sm btn-outline-secondary">View</button>
                                                            <button type="button" className="btn btn-sm btn-outline-secondary">Edit</button>
                                                  </div>
                                                  <small className="text-muted">{moment(post.createdAt).fromNow()}</small>
                                        </div>
                              </div>
                    </div>
          )
})
