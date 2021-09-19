import { useState } from "react"
import { useSelector } from "react-redux"
import useFetch from "../../../hooks/useFetch"
import { userSelector } from "../../../store/selectors/userSelector"
import { CSSTransition, TransitionGroup } from "react-transition-group"

import '../../../css/post/postComments.scss'
import { createPortal } from "react-dom"
import Comment from "./Comment"
import CommentForm from "./CommentForm"
import { createContext } from "react"

export const Comments = ({ comments, isReplies = false }) => {
          const [moreCommentActive, setMoreCommentActive] = useState(false)
          const [newReply, setNewReply] = useState(false)
          return (<>
          <TransitionGroup className="comments-container" appear={!isReplies || newReply} enter={!isReplies || newReply} exit={false}>
                    {comments.map(comment => {
                              return <CSSTransition
                                                  classNames="new-comment"
                                                  timeout={300}
                                                  key={comment._id}
                                                  >
                                                  <Comment
                                                            comment={comment}
                                                            moreCommentActive={moreCommentActive}
                                                            setMoreCommentActive={setMoreCommentActive}
                                                            isReplies={isReplies}
                                                            setNewReply={setNewReply}
                                                  />
                                        </CSSTransition>
                    })}
          </TransitionGroup>
                    {moreCommentActive && createPortal(<div onClick={() => setMoreCommentActive(false)} style={{width: "100%", height: "100%", position: 'fixed', inset: 0}}></div>, document.body)}
          </>)
}

export const CommentsContext = createContext({})

export default function PostComments({postId}) {
          const url = `/comments/${postId}`
          const [loading, comments, setComments] = useFetch(url)
          const user = useSelector(userSelector)
          const value = {setComments, postId, user }

          return <CommentsContext.Provider value={value}>
          <div className="article__comments" id="comments">
                    <h6 className="title">Comments</h6>
                              {user ? <CommentForm /> :<div>You need to be connected</div>}
                    <hr/>
                    <div className="all-comments">
                              { loading ? <div className="loader" style={{margin: "0 auto"}}></div> :
                                        comments.length === 0 ? <small className="no-comment text-muted">No comment yet</small> :
                                                  <Comments comments={comments} />
                              }
                    </div>
          </div>
          </CommentsContext.Provider>
}