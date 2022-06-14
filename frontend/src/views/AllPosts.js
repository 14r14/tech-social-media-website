import React, { useEffect, useState } from "react";
import PostItem from "../components/PostItem";
import Cookies from "js-cookie";

function AllPosts() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/helpers/get-auth-token")
      .then((res) => res.json())
      .then((token) => {
        fetch("http://localhost:3000/post/get-all-posts", {
          headers: {
            Authorization: `Bearer ${token.token}`,
          }
        })
          .catch((err) => {
            console.log(err);
          })
          .then((res) => res.json())
          .catch((err) => {
            console.log(err);
          })
          .then((data) => {
            console.log(data);
            setData(data.posts);
          })
          .catch((err) => {
            console.log(err);
          });
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
