import React, { useEffect, useState } from "react";
import PostItem from "../components/PostItem";
import Cookies from 'js-cookie';

function AllPosts() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/post/get-all-posts", {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setData(data.posts);
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
    </>
  );
}

export default AllPosts;
