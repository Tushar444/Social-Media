import "./posts.scss";
import Post from "../post/Post.jsx";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios.js";
import { useLocation } from "react-router-dom";

const Posts = () => {
  const path = useLocation().pathname.split("/");

  var { isLoading, error, data } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      try {
        const response = await makeRequest.get("/posts");
        return response.data;
      } catch (err) {
        localStorage.clear();
        window.location.reload();
        return err;
      }
    },
  });

  // console.log(data);

  if (path.length > 2) {
    if (!isLoading) {
      data = data.filter((post) => {
        return post.userId === parseInt(path[2]);
      });
    }
  }

  return (
    <div className="posts">
      {error
        ? "Something went wrong"
        : isLoading
        ? "Loading"
        : data.map((post) => {
            return <Post post={post} key={post.id} />;
          })}
    </div>
  );
};

export default Posts;
