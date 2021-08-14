import moment from "moment";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom"
import { postsSelectors, topPostsSelectors } from "../../store/selectors/postsSelector";
import { PostImage } from "./PostCard";

import '../../css/post/postDetail.scss'
import { minNumber } from "../../helpers/functions";

export default function PostDetail() {
          const { postId } = useParams()
          const [post, setPost] = useState({ loading: true, post: null})

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
                    <div className="article__container">
                              {
                                        post.loading ? <div>Loading...</div> : 
                                        <>
                                        <div className="article__header">
                                                  <h1 className="title">{post.post.title}</h1>
                                        </div>
                                        <div className="image__container">
                                                  <PostImage image={post.post.image} isThumb={false} />
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
                                                                                          <div className="image image__empty">
                                                                                                    <img src="/static/images/person.png" alt="John doe" />
                                                                                          </div>
                                                                                          <div className="name">John doe | </div>
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
                                                                                <div className="likes__count">
                                                                                          <button>
                                                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-hand-thumbs-up" viewBox="0 0 16 16">
                                                                                                    <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.144 2.144 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a9.84 9.84 0 0 0-.443.05 9.365 9.365 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111L8.864.046zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a8.908 8.908 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.224 2.224 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.866.866 0 0 1-.121.416c-.165.288-.503.56-1.066.56z"/>
                                                                                                    </svg>
                                                                                                    <span>{minNumber(post.post.reactions.likes)}</span>
                                                                                          </button>
                                                                                </div>
                                                                                <div className="dislikes__count">
                                                                                          <button>
                                                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-hand-thumbs-down" viewBox="0 0 16 16">
                                                                                                    <path d="M8.864 15.674c-.956.24-1.843-.484-1.908-1.42-.072-1.05-.23-2.015-.428-2.59-.125-.36-.479-1.012-1.04-1.638-.557-.624-1.282-1.179-2.131-1.41C2.685 8.432 2 7.85 2 7V3c0-.845.682-1.464 1.448-1.546 1.07-.113 1.564-.415 2.068-.723l.048-.029c.272-.166.578-.349.97-.484C6.931.08 7.395 0 8 0h3.5c.937 0 1.599.478 1.934 1.064.164.287.254.607.254.913 0 .152-.023.312-.077.464.201.262.38.577.488.9.11.33.172.762.004 1.15.069.13.12.268.159.403.077.27.113.567.113.856 0 .289-.036.586-.113.856-.035.12-.08.244-.138.363.394.571.418 1.2.234 1.733-.206.592-.682 1.1-1.2 1.272-.847.283-1.803.276-2.516.211a9.877 9.877 0 0 1-.443-.05 9.364 9.364 0 0 1-.062 4.51c-.138.508-.55.848-1.012.964l-.261.065zM11.5 1H8c-.51 0-.863.068-1.14.163-.281.097-.506.229-.776.393l-.04.025c-.555.338-1.198.73-2.49.868-.333.035-.554.29-.554.55V7c0 .255.226.543.62.65 1.095.3 1.977.997 2.614 1.709.635.71 1.064 1.475 1.238 1.977.243.7.407 1.768.482 2.85.025.362.36.595.667.518l.262-.065c.16-.04.258-.144.288-.255a8.34 8.34 0 0 0-.145-4.726.5.5 0 0 1 .595-.643h.003l.014.004.058.013a8.912 8.912 0 0 0 1.036.157c.663.06 1.457.054 2.11-.163.175-.059.45-.301.57-.651.107-.308.087-.67-.266-1.021L12.793 7l.353-.354c.043-.042.105-.14.154-.315.048-.167.075-.37.075-.581 0-.211-.027-.414-.075-.581-.05-.174-.111-.273-.154-.315l-.353-.354.353-.354c.047-.047.109-.176.005-.488a2.224 2.224 0 0 0-.505-.804l-.353-.354.353-.354c.006-.005.041-.05.041-.17a.866.866 0 0 0-.121-.415C12.4 1.272 12.063 1 11.5 1z"/>
                                                                                                    </svg>
                                                                                                    <span>{minNumber(post.post.reactions.dislikes)}</span>
                                                                                          </button>
                                                                                </div>
                                                                                <div className="share">
                                                                                          <button>
                                                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-share" viewBox="0 0 16 16">
                                                                                                    <path d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5zm-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z"/>
                                                                                                    </svg>
                                                                                                    <span>Share</span>
                                                                                          </button>
                                                                                </div>
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
                                                                                <a href="/sport" className="link-group-item">Technology</a>
                                                                                <a href="/sport" className="link-group-item">Sport</a>
                                                                                <a href="/sport" className="link-group-item">Healhy</a>
                                                                                <a href="/sport" className="link-group-item">Sport</a>
                                                                                <a href="/sport" className="link-group-item">Technology</a>
                                                                                <a href="/sport" className="link-group-item">Healhy</a>
                                                                      </div>
                                                            </div>
                                                            <div className="article__categories">
                                                                      <h6 className="title" className="title">Tags</h6>
                                                                      <div className="link-group tags">
                                                                                <a href="/sport" className="link-group-item">Sport</a>
                                                                                <a href="/sport" className="link-group-item">Healhy</a>
                                                                                <a href="/sport" className="link-group-item">Technology</a>
                                                                                <a href="/sport" className="link-group-item">Sport</a>
                                                                                <a href="/sport" className="link-group-item">Healhy</a>
                                                                                <a href="/sport" className="link-group-item">Technology</a>
                                                                                <a href="/sport" className="link-group-item">Sport</a>
                                                                                <a href="/sport" className="link-group-item">Healhy</a>
                                                                                <a href="/sport" className="link-group-item">Technology</a>
                                                                      </div>
                                                            </div>
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
                                                                                {true && <small className="no-comment text-muted">No comment yet</small>}
                                                                                <div className="comment">
                                                                                          <div className="comment-header">
                                                                                                    <div className="user">
                                                                                                              <div className="user-avatar">
                                                                                                                        <img src="/static/images/person.png" alt="John doe" />
                                                                                                              </div>
                                                                                                              <div className="user-name__date">
                                                                                                                        <div className="name">Username</div>
                                                                                                                        <div className="date">
                                                                                                                                  21/11/2013
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
                                                                                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea maiores dignissimos minima nostrum iste quam quasi pariatur velit vel! Dolorem veniam incidunt sunt nisi sapiente laborum quasi aperiam cumque veritatis?
                                                                                          </div>
                                                                                          <div className="comments__actions">
                                                                                                    <div className="likes__count">
                                                                                                              <button>
                                                                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-hand-thumbs-up" viewBox="0 0 16 16">
                                                                                                                        <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.144 2.144 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a9.84 9.84 0 0 0-.443.05 9.365 9.365 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111L8.864.046zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a8.908 8.908 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.224 2.224 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.866.866 0 0 1-.121.416c-.165.288-.503.56-1.066.56z"/>
                                                                                                                        </svg>
                                                                                                                        <span>{minNumber(post.post.reactions.likes)}</span>
                                                                                                              </button>
                                                                                                    </div>
                                                                                                    <div className="dislikes__count">
                                                                                                              <button>
                                                                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-hand-thumbs-down" viewBox="0 0 16 16">
                                                                                                                        <path d="M8.864 15.674c-.956.24-1.843-.484-1.908-1.42-.072-1.05-.23-2.015-.428-2.59-.125-.36-.479-1.012-1.04-1.638-.557-.624-1.282-1.179-2.131-1.41C2.685 8.432 2 7.85 2 7V3c0-.845.682-1.464 1.448-1.546 1.07-.113 1.564-.415 2.068-.723l.048-.029c.272-.166.578-.349.97-.484C6.931.08 7.395 0 8 0h3.5c.937 0 1.599.478 1.934 1.064.164.287.254.607.254.913 0 .152-.023.312-.077.464.201.262.38.577.488.9.11.33.172.762.004 1.15.069.13.12.268.159.403.077.27.113.567.113.856 0 .289-.036.586-.113.856-.035.12-.08.244-.138.363.394.571.418 1.2.234 1.733-.206.592-.682 1.1-1.2 1.272-.847.283-1.803.276-2.516.211a9.877 9.877 0 0 1-.443-.05 9.364 9.364 0 0 1-.062 4.51c-.138.508-.55.848-1.012.964l-.261.065zM11.5 1H8c-.51 0-.863.068-1.14.163-.281.097-.506.229-.776.393l-.04.025c-.555.338-1.198.73-2.49.868-.333.035-.554.29-.554.55V7c0 .255.226.543.62.65 1.095.3 1.977.997 2.614 1.709.635.71 1.064 1.475 1.238 1.977.243.7.407 1.768.482 2.85.025.362.36.595.667.518l.262-.065c.16-.04.258-.144.288-.255a8.34 8.34 0 0 0-.145-4.726.5.5 0 0 1 .595-.643h.003l.014.004.058.013a8.912 8.912 0 0 0 1.036.157c.663.06 1.457.054 2.11-.163.175-.059.45-.301.57-.651.107-.308.087-.67-.266-1.021L12.793 7l.353-.354c.043-.042.105-.14.154-.315.048-.167.075-.37.075-.581 0-.211-.027-.414-.075-.581-.05-.174-.111-.273-.154-.315l-.353-.354.353-.354c.047-.047.109-.176.005-.488a2.224 2.224 0 0 0-.505-.804l-.353-.354.353-.354c.006-.005.041-.05.041-.17a.866.866 0 0 0-.121-.415C12.4 1.272 12.063 1 11.5 1z"/>
                                                                                                                        </svg>
                                                                                                                        <span>{minNumber(post.post.reactions.dislikes)}</span>
                                                                                                              </button>
                                                                                                    </div>
                                                                                                    <div className="comments__count">
                                                                                                              <button>
                                                                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-reply" viewBox="0 0 16 16">
                                                                                                                        <path d="M6.598 5.013a.144.144 0 0 1 .202.134V6.3a.5.5 0 0 0 .5.5c.667 0 2.013.005 3.3.822.984.624 1.99 1.76 2.595 3.876-1.02-.983-2.185-1.516-3.205-1.799a8.74 8.74 0 0 0-1.921-.306 7.404 7.404 0 0 0-.798.008h-.013l-.005.001h-.001L7.3 9.9l-.05-.498a.5.5 0 0 0-.45.498v1.153c0 .108-.11.176-.202.134L2.614 8.254a.503.503 0 0 0-.042-.028.147.147 0 0 1 0-.252.499.499 0 0 0 .042-.028l3.984-2.933zM7.8 10.386c.068 0 .143.003.223.006.434.02 1.034.086 1.7.271 1.326.368 2.896 1.202 3.94 3.08a.5.5 0 0 0 .933-.305c-.464-3.71-1.886-5.662-3.46-6.66-1.245-.79-2.527-.942-3.336-.971v-.66a1.144 1.144 0 0 0-1.767-.96l-3.994 2.94a1.147 1.147 0 0 0 0 1.946l3.994 2.94a1.144 1.144 0 0 0 1.767-.96v-.667z"/>
                                                                                                                        </svg>
                                                                                                                        <span>{minNumber(post.post.reactions.dislikes)}</span>
                                                                                                              </button>
                                                                                                    </div>
                                                                                          </div>
                                                                                </div>
                                                                                <div className="comment">
                                                                                          <div className="comment-header">
                                                                                                    <div className="user">
                                                                                                              <div className="user-avatar">
                                                                                                                        <img src="/static/images/person.png" alt="John doe" />
                                                                                                              </div>
                                                                                                              <div className="user-name__date">
                                                                                                                        <div className="name">Username<span className="is__author">Author</span></div>
                                                                                                                        <div className="date">
                                                                                                                                  21/11/2013
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
                                                                                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea maiores dignissimos minima nostrum iste quam quasi pariatur velit vel! Dolorem veniam incidunt sunt nisi sapiente laborum quasi aperiam cumque veritatis?
                                                                                          </div>
                                                                                          <div className="comments__actions">
                                                                                                    <div className="likes__count">
                                                                                                              <button>
                                                                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-hand-thumbs-up" viewBox="0 0 16 16">
                                                                                                                        <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.144 2.144 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a9.84 9.84 0 0 0-.443.05 9.365 9.365 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111L8.864.046zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a8.908 8.908 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.224 2.224 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.866.866 0 0 1-.121.416c-.165.288-.503.56-1.066.56z"/>
                                                                                                                        </svg>
                                                                                                                        <span>{minNumber(post.post.reactions.likes)}</span>
                                                                                                              </button>
                                                                                                    </div>
                                                                                                    <div className="dislikes__count">
                                                                                                              <button>
                                                                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-hand-thumbs-down" viewBox="0 0 16 16">
                                                                                                                        <path d="M8.864 15.674c-.956.24-1.843-.484-1.908-1.42-.072-1.05-.23-2.015-.428-2.59-.125-.36-.479-1.012-1.04-1.638-.557-.624-1.282-1.179-2.131-1.41C2.685 8.432 2 7.85 2 7V3c0-.845.682-1.464 1.448-1.546 1.07-.113 1.564-.415 2.068-.723l.048-.029c.272-.166.578-.349.97-.484C6.931.08 7.395 0 8 0h3.5c.937 0 1.599.478 1.934 1.064.164.287.254.607.254.913 0 .152-.023.312-.077.464.201.262.38.577.488.9.11.33.172.762.004 1.15.069.13.12.268.159.403.077.27.113.567.113.856 0 .289-.036.586-.113.856-.035.12-.08.244-.138.363.394.571.418 1.2.234 1.733-.206.592-.682 1.1-1.2 1.272-.847.283-1.803.276-2.516.211a9.877 9.877 0 0 1-.443-.05 9.364 9.364 0 0 1-.062 4.51c-.138.508-.55.848-1.012.964l-.261.065zM11.5 1H8c-.51 0-.863.068-1.14.163-.281.097-.506.229-.776.393l-.04.025c-.555.338-1.198.73-2.49.868-.333.035-.554.29-.554.55V7c0 .255.226.543.62.65 1.095.3 1.977.997 2.614 1.709.635.71 1.064 1.475 1.238 1.977.243.7.407 1.768.482 2.85.025.362.36.595.667.518l.262-.065c.16-.04.258-.144.288-.255a8.34 8.34 0 0 0-.145-4.726.5.5 0 0 1 .595-.643h.003l.014.004.058.013a8.912 8.912 0 0 0 1.036.157c.663.06 1.457.054 2.11-.163.175-.059.45-.301.57-.651.107-.308.087-.67-.266-1.021L12.793 7l.353-.354c.043-.042.105-.14.154-.315.048-.167.075-.37.075-.581 0-.211-.027-.414-.075-.581-.05-.174-.111-.273-.154-.315l-.353-.354.353-.354c.047-.047.109-.176.005-.488a2.224 2.224 0 0 0-.505-.804l-.353-.354.353-.354c.006-.005.041-.05.041-.17a.866.866 0 0 0-.121-.415C12.4 1.272 12.063 1 11.5 1z"/>
                                                                                                                        </svg>
                                                                                                                        <span>{minNumber(post.post.reactions.dislikes)}</span>
                                                                                                              </button>
                                                                                                    </div>
                                                                                                    <div className="comments__count">
                                                                                                              <button>
                                                                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-reply" viewBox="0 0 16 16">
                                                                                                                        <path d="M6.598 5.013a.144.144 0 0 1 .202.134V6.3a.5.5 0 0 0 .5.5c.667 0 2.013.005 3.3.822.984.624 1.99 1.76 2.595 3.876-1.02-.983-2.185-1.516-3.205-1.799a8.74 8.74 0 0 0-1.921-.306 7.404 7.404 0 0 0-.798.008h-.013l-.005.001h-.001L7.3 9.9l-.05-.498a.5.5 0 0 0-.45.498v1.153c0 .108-.11.176-.202.134L2.614 8.254a.503.503 0 0 0-.042-.028.147.147 0 0 1 0-.252.499.499 0 0 0 .042-.028l3.984-2.933zM7.8 10.386c.068 0 .143.003.223.006.434.02 1.034.086 1.7.271 1.326.368 2.896 1.202 3.94 3.08a.5.5 0 0 0 .933-.305c-.464-3.71-1.886-5.662-3.46-6.66-1.245-.79-2.527-.942-3.336-.971v-.66a1.144 1.144 0 0 0-1.767-.96l-3.994 2.94a1.147 1.147 0 0 0 0 1.946l3.994 2.94a1.144 1.144 0 0 0 1.767-.96v-.667z"/>
                                                                                                                        </svg>
                                                                                                                        <span>{minNumber(post.post.reactions.dislikes)}</span>
                                                                                                              </button>
                                                                                                    </div>
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
