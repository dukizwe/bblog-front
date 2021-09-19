import { useContext } from "react";
import { useSelector } from "react-redux";
import { fetchApi } from "../../../helpers/functions";
import { useForm } from "../../../hooks/useForm";
import { useFormErrorsHandle } from "../../../hooks/useFormErrorsHandle";
import { userSelector } from "../../../store/selectors/userSelector";
import { CommentContext } from "./Comment";
import { playFlip } from "./CommentForm";

export default function ReplyForm ({ commentId, setReplies }) {
          const [reply, handleChange, setValue] = useForm({ body: "" });
          const user = useSelector(userSelector)
          const { setNewReply } = useContext(CommentContext)
          const { isValidate, setErrors, getErrors } = useFormErrorsHandle(reply, {
                              body: {
                                        required: true,
                                        length: [null, 5000],
                              }
                    });

          const handleSubmit = async (e) => {
                    e.preventDefault()
                    if (isValidate()) {
                              try {
                                        const newReply = await fetchApi(
                                                  `/replies/${commentId}`,
                                                  {
                                                            method: "POST",
                                                            body: JSON.stringify(
                                                                      {
                                                                                body: reply.body,
                                                                      }
                                                            ),
                                                            headers: {
                                                                      "Content-type":
                                                                                "application/json",
                                                            },
                                                  }
                                        );
                                        var positions = {};
                                        document.querySelectorAll(".all-comments .replies .comment").forEach((comment) => {
                                                  positions[comment.getAttribute("data-id")] = comment.getBoundingClientRect();
                                        });
                                        setValue('body', '')
                                        setNewReply(true)
                                        setReplies((state) => ({
                                                  ...state,
                                                  items: [
                                                            newReply,
                                                            ...state.items
                                                  ]
                                        }));
                                        playFlip(positions, document.querySelectorAll(".all-comments .replies .comment"));
                              } catch (error) {
                                        if (error.errors) {
                                                  setErrors(error.errors);
                                        }
                              }
                    } else {
                              setErrors(getErrors());
                    }
          };

          return (
                    <div className="form-row">
                              <div className="user">
                                        <img
                                                  src="/static/images/person.png"
                                                  alt={user.username}
                                        />
                              </div>
                              <form className="form"  onSubmit={handleSubmit}>
                                        <div className="form__input">
                                                  <textarea
                                                            id="body"
                                                            placeholder="Type your reply here"
                                                            name="body"
                                                            value={reply.body}
                                                            onChange={handleChange}
                                                  ></textarea>
                                        </div>
                                        <div className="form__send">
                                                  <button>Send</button>
                                        </div>
                              </form>
                    </div>
          )
}