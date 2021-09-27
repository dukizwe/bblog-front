import moment from "moment";
import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { fetchApi, subText } from "../../../helpers/functions";
import { userSelector } from "../../../store/selectors/userSelector";
import { CSSTransition } from "react-transition-group"
import CommentReactions from "./CommentReactions";
import { useForm } from "../../../hooks/useForm";
import { createContext } from "react";
import CommentReplies from "./CommentReplies";
import Skeleton from "../../main/Skeleton";
import { inDetailPost } from "../../../store/selectors/postsSelector";
import { useFormErrorsHandle } from "../../../hooks/useFormErrorsHandle";

export const CommentContext = createContext({})

export default function Comment({ comment, moreCommentActive, setMoreCommentActive, isReplies, setNewReply }) {
          const commentRef = useRef(null);
          const [inEdit, setInEdit] = useState(false)
          const showEditCommentForm = e => {
                    e.preventDefault()
                    setInEdit(true)
                    setMoreCommentActive(false)
          }

          const setCommentBody = (newBody) => {
                    comment.body = newBody
          }
          const value = {
                    comment,
                    setCommentBody,
                    moreCommentActive,
                    setMoreCommentActive,
                    inEdit,
                    setInEdit,
                    showEditCommentForm,
                    commentRef,
                    isReplies,
                    setNewReply
          }
          const replyCls = isReplies ? 'reply' : ''
          return (
                    <CommentContext.Provider value={value}>
                              <div className={"comment "+replyCls} ref={commentRef} data-id={comment._id} >
                                        <CSSTransition
                                                  in={ inEdit }
                                                  timeout={100}
                                                  unmountOnExit
                                                  // nodeRef={MoreRef}
                                                  classNames="bottom-slide"
                                        >
                                                  <EditCommentForm  />
                                        </CSSTransition>
                                        <CSSTransition
                                                  in={ !inEdit }
                                                  timeout={100}
                                                  unmountOnExit
                                                  // nodeRef={MoreRef}
                                                  classNames="top-slide"
                                        >
                                                  <PureComment />
                                        </CSSTransition>
                              </div>
                    </CommentContext.Provider>
          );
}

const EditCommentForm = () => {
          const { comment, setInEdit, setCommentBody } = useContext(CommentContext)
          const [newComment, handleChange] = useForm({ body: comment.body})
          const { setErrors, getErrors,  isValidate } = useFormErrorsHandle(newComment, {
                              body: {
                                        required: true,
                                        length: [null, 5000],
                              },
                    });
          const handleSaveChange = async (e) => {
                    e.preventDefault()
                    setErrors({});
                    if (isValidate()) {
                              try {
                                        const newBody = await fetchApi(
                                                  `/comments/${comment._id}`,
                                                  {
                                                            method: "PUT",
                                                            body: JSON.stringify(
                                                                      {
                                                                                body: newComment.body,
                                                                      }
                                                            ),
                                                            headers: {
                                                                      "Content-type": "application/json",
                                                            },
                                                  }
                                        );
                                        setCommentBody(newBody.body)
                                        setInEdit(false)
                              } catch (error) {
                                        if (error.errors) {
                                                  setErrors(error.errors);
                                        }
                              }
                    } else {
                              setErrors(getErrors());
                    }
          }
          return <div className="comment__edit">
                    <div className="text-area">
                              <textarea name="body" value={ newComment.body } onChange={handleChange} placeholder="Write your comment"></textarea>    
                    </div>
                    <div className="edit__footer">
                              <button className="cancel" onClick={() => setInEdit(false)}>Cancel</button>
                              <button className="save" onClick={handleSaveChange} disabled={!isValidate()}>Save</button>
                    </div>
          </div>
}

const PureComment = () => {
          const { comment, moreCommentActive, setMoreCommentActive, inEdit, showEditCommentForm, commentRef} = useContext(CommentContext)
          const MoreRef = useRef(null);
          const user = useSelector(userSelector);
          const [repliesActive, setRepliesActive] = useState(false)
          const { isReplies } = useContext(CommentContext)

          /**
           * Comment more pop up
           */
          const CommentMore = () => {
                    useEffect(() => {
                              const keyUpListener = (e) => {
                                        if (e.keyCode === 27)
                                                  setMoreCommentActive(false);
                              };
                              window.addEventListener("keyup", keyUpListener);
                              return () => {
                                        window.removeEventListener(
                                                  "keyup",
                                                  keyUpListener
                                        );
                              };
                    }, [])
                    return (
                              <ul ref={MoreRef}>
                                        {user && user._id === comment.user._id && (
                                                  <li>
                                                            <button onClick={showEditCommentForm}>
                                                                      <span className="icon">
                                                                                <svg
                                                                                          xmlns="http://www.w3.org/2000/svg"
                                                                                          width="16"
                                                                                          height="16"
                                                                                          fill="currentColor"
                                                                                          className="bi bi-pencil-square"
                                                                                          viewBox="0 0 16 16"
                                                                                >
                                                                                          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                                                          <path
                                                                                                    fillRule="evenodd"
                                                                                                    d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                                                                                          />
                                                                                </svg>
                                                                      </span>
                                                                      <span className="text">
                                                                                Edit
                                                                      </span>
                                                            </button>
                                                  </li>
                                        )}
                                        {user && user._id === comment.user._id && (
                                                  <li>
                                                            <button>
                                                                      <span className="icon">
                                                                                <svg
                                                                                          xmlns="http://www.w3.org/2000/svg"
                                                                                          width="16"
                                                                                          height="16"
                                                                                          fill="currentColor"
                                                                                          className="bi bi-trash"
                                                                                          viewBox="0 0 16 16"
                                                                                >
                                                                                          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                                                                          <path
                                                                                                    fillRule="evenodd"
                                                                                                    d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                                                                                          />
                                                                                </svg>
                                                                      </span>
                                                                      <span className="text">
                                                                                Delete
                                                                      </span>
                                                            </button>
                                                  </li>
                                        )}
                                        <li>
                                                  <button>
                                                            <span className="icon">
                                                                      <svg
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                                width="16"
                                                                                height="16"
                                                                                fill="currentColor"
                                                                                className="bi bi-exclamation-circle"
                                                                                viewBox="0 0 16 16"
                                                                      >
                                                                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                                                                <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z" />
                                                                      </svg>
                                                            </span>
                                                            <span className="text">
                                                                      Report
                                                            </span>
                                                  </button>
                                        </li>
                              </ul>
                    );
          };

          const { user: author } = useSelector(inDetailPost)
          const hasAvatar = () => comment.user.image;

          const showMoreButton = (e) => {
                    e.preventDefault();
                    if (moreCommentActive === comment._id) {
                              setMoreCommentActive(false);
                    } else {
                              setMoreCommentActive(comment._id);
                    }
          };
          const replyCls = isReplies ? 'reply' : ''
          return (
          <>
          {isReplies && <div className="reply-indicator"></div>}
          <div className={`comment__content ${replyCls}`}>
                              <div className="comment-header">
                              <div className="user">
                                        {hasAvatar() ? (
                                                  <div className="user-avatar">
                                                            <img
                                                                      src="/static/images/person.png"
                                                                      alt={comment.user.username}
                                                            />
                                                  </div>
                                        ) : (
                                                  <div className="user-avatar">
                                                            <img
                                                                      src="/static/images/person.png"
                                                                      alt={comment.user.username}
                                                            />
                                                  </div>
                                        )}
                                        <div className="user-name__date">
                                                  <div className="name">
                                                            {comment.user.username}
                                                            {comment.user._id === author._id && (
                                                                      <span className="is__author">
                                                                                Author
                                                                      </span>
                                                            )}
                                                  </div>
                                                  <div className="date">
                                                            {moment(comment.createdAt).fromNow()}
                                                  </div>
                                        </div>
                              </div>
                              <div className="comment__more">
                                        <button
                                                  className={"report-comment " + replyCls}
                                                  onClick={showMoreButton}
                                        >
                                                  <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="16"
                                                            height="16"
                                                            fill="currentColor"
                                                            className="bi bi-three-dots"
                                                            viewBox="0 0 16 16"
                                                  >
                                                            <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
                                                  </svg>
                                        </button>
                                        <CSSTransition
                                                  in={moreCommentActive === comment._id }
                                                  timeout={100}
                                                  unmountOnExit
                                                  appear
                                                  nodeRef={MoreRef}
                                                  classNames="pop"
                                        >
                                                  <CommentMore />
                                        </CSSTransition>
                              </div>
                    </div>
                    <div className="comment-body">
                              {subText(comment.body, 300)}
                    </div>
                    <CommentReactions commentId={comment._id} reactions={comment.reactions} setRepliesActive={setRepliesActive} />
                    { repliesActive && !isReplies && <CommentReplies commentId={comment._id} /> }
          </div>
          </> )
}
