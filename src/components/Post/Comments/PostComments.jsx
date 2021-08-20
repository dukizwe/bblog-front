import moment from "moment"
import { useSelector } from "react-redux"
import { subText } from "../../../helpers/functions"
import useFetch from "../../../hooks/useFetch"
import { userSelector } from "../../../store/selectors/userSelector"
import CommentReactions from "./CommentReactions"

const Comments = ({comments}) => {
          const user = useSelector(userSelector)
          return comments.map(comment => {
                    const hasAvatar = () => comment.user.image
                    const isAuthor = () => false
                    return <div className="comment" key={comment._id}>
                                        <div className="comment-header">
                                                  <div className="user">
                                                            {hasAvatar() ?  
                                                                      <div className="user-avatar">
                                                                                <img src="/static/images/person.png" alt={comment.user.username} />
                                                                      </div> : 
                                                                      <div className="user-avatar">
                                                                                <img src="/static/images/person.png" alt={comment.user.username} />
                                                                      </div> 
                                                            }
                                                            <div className="user-name__date">
                                                                      <div className="name">{comment.user.username}{isAuthor() && <span className="is__author">Author</span>}</div>
                                                                      <div className="date">
                                                                                {moment(comment.createdAt).fromNow()}
                                                                      </div>
                                                            </div>
                                                  </div>
                                                  <button className="report-comment">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-exclamation-circle" viewBox="0 0 16 16">
                                                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                                            <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/>
                                                            </svg>
                                                  </button>
                                        </div>
                                        <div className="comment-body">
                                                  {subText(comment.body, 300)}
                                        </div>
                                        {<CommentReactions commentId={comment._id} reactions={comment.reactions} />}
                              </div>
          })
}
export default function PostComments({postId}) {
          const url = `/comments/${postId}`
          const [loading, comments] = useFetch(url)
          
          return (
          <div className="article__comments">
                    <h6 className="title">Comments</h6>
                    <div className="form-row">
                              <div className="user">
                                        <img src="/static/images/person.png" alt="John doe" />
                              </div>
                              <form className="form">
                                        <div className="form__input">
                                                  <textarea id="body" placeholder="Enter your comment here"></textarea>
                                        </div>
                                        <div className="form__send">
                                                  <button >Send</button>
                                        </div>
                              </form>
                    </div>
                    <hr/>
                    <div className="all-comments">
                              { loading ? <div>loading</div> :
                                        comments.length === 0 ? <small className="no-comment text-muted">No comment yet</small> :
                                                  <Comments comments={comments} />
                              }
                    </div>
          </div>
          )
}