import useFetch from "../../../hooks/useFetch";
import { Comments } from './PostComments'
import Skeleton from "../../main/Skeleton";
import ReplyForm from "./ReplyForm";
import { useSelector } from "react-redux";
import { userSelector } from "../../../store/selectors/userSelector";

const Skeltons = () => {
          const skeletons = [1, 2, 3]
          return skeletons.map(_ => <div style={{marginTop:"10px"}}>
                    <div style={{display: "flex", alignItems: "center"}}>
                              <Skeleton width="30px" height="30px" borderRadius="50%" />
                              <div style={{marginLeft: "5px"}}>
                                        <Skeleton width="100px" height="10px" />
                                        <Skeleton width="50px" height="10px" marginTop="5px"/>
                              </div>
                    </div>
                    <Skeleton width="200px" height="10px" marginTop="5px" />
          </div>)
}
export default function CommentReplies({ commentId }) {
          const [loading, replies, setReplies] = useFetch( `/replies/${commentId}`)
          const user = useSelector(userSelector);

          const Replies = () => {
                    return (
                              replies.length === 0 ? <small className="no-comment text-muted">No replies yet</small> :
                              <Comments comments={replies} isReplies />
                    )
          }

          const borderCls = loading ? '' : 'has-border'
          return (
                    <div className={`replies ${borderCls}`}>
                              { loading ? <Skeltons /> :
                              <>
                              {user ? <ReplyForm commentId={commentId} setReplies={setReplies} /> : <div className="text-muted">You need to be connected</div>}
                              <Replies />
                              </>}
                    </div>
          )
}