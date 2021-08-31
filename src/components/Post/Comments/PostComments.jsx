import moment from "moment"
import { useState } from "react"
import { useSelector } from "react-redux"
import { fetchApi, subText } from "../../../helpers/functions"
import useFetch from "../../../hooks/useFetch"
import { useForm } from "../../../hooks/useForm"
import { useFormErrorsHandle } from "../../../hooks/useFormErrorsHandle"
import { userSelector } from "../../../store/selectors/userSelector"
import CommentReactions from "./CommentReactions"
import { CSSTransition, TransitionGroup } from "react-transition-group"
import { useRef } from "react"
import { createContext } from "react"
import { useContext } from "react"
import { useEffect } from "react"

const CommentForm = () => {
          const [comment, handleChange] = useForm({ body: ''})
          const {user, postId, setComments} = useContext(CommenstContext)
          const { hasError, getError, getErrors, setErrors, isValidate} = useFormErrorsHandle(comment, {
                    body: {
                              required: true,
                              length: [null, 5000]
                    }
          })

          const playFlip = (positions) => {
                    const comments = document.querySelectorAll('.all-comments .comment')
                    comments.forEach((comment, i) => {
                              if(i > 0) {
                                        const oldPosition = positions[comment.getAttribute('data-id')]
                                        const newPosition = comment.getBoundingClientRect()
                                        const deltaY = oldPosition.y - newPosition.y
                                        const deltaX = oldPosition.x - newPosition.x
                                        const deltaW = oldPosition.width / newPosition.width
                                        const deltaH = oldPosition.height / newPosition.height
                                        // console.log(newPosition.y, oldPosition.y)
                                        // const deltaX = newPosition.X - oldPosition.y
                                        // comment.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(${deltaW}, ${deltaH})`
                                        comment.animate([{
                                                  transform: `translate(${deltaX}px, ${deltaY}px) scale(${deltaW}, ${deltaH})`
                                        }, {
                                                  transform: `none`
                                        }], {
                                                  duration: 450,
                                                  fill: 'both',
                                                  easing: 'ease-in-out'  
                                        })
                              }
                    })
          }

          const handleSubmit = async (e) => {
                    e.preventDefault()
                    setErrors({})
                    if(isValidate()) {
                              try {
                                        const newComment = await fetchApi(`/comments/${postId}`, {
                                                  method: "POST",
                                                  body: JSON.stringify({body: comment.body}),
                                                  headers: {
                                                            'Content-type': "application/json"
                                                  }
                                        })
                                        var positions = {}
                                        document.querySelectorAll('.all-comments .comment').forEach(comment => {
                                                  positions[comment.getAttribute('data-id')] = comment.getBoundingClientRect()
                                        })
                                        setComments(state => ({
                                                  ...state,
                                                  items: [newComment, ...state.items]
                                        }))
                                        playFlip(positions)
                              } catch (error) {
                                        if(error.errors) {
                                                  setErrors(error.errors)
                                        }
                              }
                    } else {
                              setErrors(getErrors())
                    }
          }
          const invalidCls = hasError('body') ? 'is-invalid' : ''

          return <div className="form-row">
                              <div className="user">
                                        <img src="/static/images/person.png" alt={user.username}/>
                              </div>
                              <form className="form" onSubmit={handleSubmit}>
                                        <div className="form__input">
                                                  <textarea
                                                            id="body"
                                                            placeholder="Enter your comment here"
                                                            name="body" value={comment.body}
                                                            onChange={handleChange}
                                                            className={`${invalidCls}`}
                                                  ></textarea>
                                                  {hasError('body') && <div className="invalid-error">{getError('body')}</div>}
                                        </div>
                                        <div className="form__send">
                                                  <button >Send</button>
                                        </div>
                              </form>
                    </div>
}

const Comment = ({comment}) => {
          const hasAvatar = () => comment.user.image
          const isAuthor = () => false
          const commentRef= useRef(null)
          const { setCommentBounding } = useContext(CommenstContext)
          useEffect(() => {
                    const position = commentRef?.current?.getBoundingClientRect()
                    setCommentBounding(comment._id, position)
          }, [])
          return <div className="comment" ref={commentRef} data-id={comment._id}>
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
}

const Comments = ({comments}) => {
          return <TransitionGroup className="comments-container">
                              {comments.map(comment => {
                                        return <CSSTransition
                                                            classNames="new-comment"
                                                            timeout={450}
                                                            key={comment._id}
                                                            >
                                                            <Comment comment={comment} />
                                                  </CSSTransition>
                              })}
                    </TransitionGroup>
}

const CommenstContext = createContext({})

export default function PostComments({postId}) {
          const url = `/comments/${postId}`
          const [loading, comments, setComments] = useFetch(url)
          const user = useSelector(userSelector)
          const [positions, setPositions] = useState({})
          const setCommentBounding = (commentId, scale) => {
                    setPositions(p => ({...p, [commentId]: scale}))
          }
          const value = {setComments, postId, user, positions, setCommentBounding}
          
          return <CommenstContext.Provider value={value}>
          <div className="article__comments">
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
          </CommenstContext.Provider>
}