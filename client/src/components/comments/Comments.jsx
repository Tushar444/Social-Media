import "./comments.scss";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";
import { makeRequest } from "../../axios.js";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import moment from "moment";

const Comments = ({ postId }) => {
  const { currentUser } = useContext(AuthContext);

  const [desc, setDesc] = useState("");

  const { isLoading, error, data } = useQuery({
    queryKey: ["comments", postId],
    queryFn: async () => {
      try {
        const response = await makeRequest.get("/comments?postId=" + postId);
        return response.data;
      } catch (err) {
        return err;
      }
    },
  });

  const QueryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newComment) => {
      return makeRequest.post("/comments", newComment);
    },
    onSuccess: () => {
      QueryClient.invalidateQueries({ queryKey: ["comments", postId] });
    },
  });

  const handleClick = async (e) => {
    e.preventDefault();
    mutation.mutate({ desc, postId });
    setDesc("");
  };

  return (
    <div className="comments">
      <div className="write">
        <img src={currentUser.profilePic} alt="" />
        <input
          type="text"
          placeholder="write a comment"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <button onClick={handleClick}>Send</button>
      </div>
      {error
        ? "Something went wrong"
        : isLoading
        ? "Loading"
        : data.map((comment) => {
            return (
              <div className="comment" key={comment.id}>
                <img src={comment.profilePic} alt="" />
                <div className="info">
                  <span>{comment.name}</span>
                  <span className="date">
                    {moment(comment.createdAt).fromNow()}
                  </span>
                  <p>{comment.desc}</p>
                </div>
              </div>
            );
          })}
    </div>
  );
};

export default Comments;
