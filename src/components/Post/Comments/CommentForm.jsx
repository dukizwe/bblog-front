import { useContext } from "react";
import { fetchApi } from "../../../helpers/functions";
import { useForm } from "../../../hooks/useForm";
import { useFormErrorsHandle } from "../../../hooks/useFormErrorsHandle";
import { CommentsContext } from "./PostComments";

export const playFlip = (positions, elements) => {
          elements.forEach((comment, i) => {
                    if (i > 0) {
                              const oldPosition =
                                        positions[
                                                  comment.getAttribute(
                                                            "data-id"
                                                  )
                                        ];
                              const newPosition = comment.getBoundingClientRect();
                              const deltaY = oldPosition.y - newPosition.y;
                              const deltaX = oldPosition.x - newPosition.x;
                              const deltaW = oldPosition.width / newPosition.width;
                              const deltaH = oldPosition.height / newPosition.height;
                              comment.animate(
                                        [
                                                  {
                                                            transform: `translate(${deltaX}px, ${deltaY}px) scale(${deltaW}, ${deltaH})`,
                                                  },
                                                  {
                                                            transform: `none`,
                                                  },
                                        ],
                                        {
                                                  duration: 300,
                                                  fill: "both",
                                                  easing: "ease-in-out",
                                        }
                              );
                    }
          });
};

export default function CommentForm() {
          const [comment, handleChange, setValue] = useForm({ body: "" });
          const { user, postId, setComments } = useContext(CommentsContext);
          const { hasError, getError, getErrors, setErrors, isValidate } = useFormErrorsHandle(comment, {
                              body: {
                                        required: true,
                                        length: [null, 5000],
                              },
                    });

          const handleSubmit = async (e) => {
                    e.preventDefault();
                    setErrors({});
                    if (isValidate()) {
                              try {
                                        const newComment = await fetchApi(
                                                  `/comments/${postId}`,
                                                  {
                                                            method: "POST",
                                                            body: JSON.stringify(
                                                                      {
                                                                                body: comment.body,
                                                                      }
                                                            ),
                                                            headers: {
                                                                      "Content-type":
                                                                                "application/json",
                                                            },
                                                  }
                                        );
                                        var positions = {};
                                        document.querySelectorAll(".all-comments .comment").forEach((comment) => {
                                                  positions[comment.getAttribute("data-id")] = comment.getBoundingClientRect();
                                        });
                                        setValue('body', '')
                                        setComments((state) => ({
                                                  ...state,
                                                  items: [
                                                            newComment,
                                                            ...state.items,
                                                  ],
                                        }));
                                        playFlip(positions, document.querySelectorAll(".all-comments .comment"));
                              } catch (error) {
                                        if (error.errors) {
                                                  setErrors(error.errors);
                                        }
                              }
                    } else {
                              setErrors(getErrors());
                    }
          };
          const invalidCls = hasError("body") ? "is-invalid" : "";
          return (
                    <div className="form-row">
                              <div className="user">
                                        <img
                                                  src="/static/images/person.png"
                                                  alt={user.username}
                                        />
                              </div>
                              <form className="form" onSubmit={handleSubmit}>
                                        <div className="form__input">
                                                  <textarea
                                                            id="body"
                                                            placeholder="Write your comment"
                                                            name="body"
                                                            value={comment.body}
                                                            onChange={
                                                                      handleChange
                                                            }
                                                            className={`${invalidCls}`}
                                                  ></textarea>
                                                  {hasError("body") && (
                                                            <div className="invalid-error">
                                                                      {getError(
                                                                                "body"
                                                                      )}
                                                            </div>
                                                  )}
                                        </div>
                                        <div className="form__send">
                                                  <button disabled={comment.body == ""}>Send</button>
                                        </div>
                              </form>
                    </div>
          );
}