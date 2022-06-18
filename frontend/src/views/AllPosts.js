import React, { useEffect, useState } from "react";
import PostItem from "../components/PostItem";
import Cookies from "js-cookie";

function AllPosts() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/post/get-all-posts")
      .then((res) => res.json())
      .then((data) => {
        setData(data.posts);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div>All Posts</div>
      <ul>
        {data.map((post) => (
          <PostItem key={post._id} post={post} />
        ))}
      </ul>
      <hr />
    </>
  );
}

export default AllPosts;
