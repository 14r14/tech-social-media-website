import React from "react";
import { Link } from "react-router-dom";

function PostItem({ post }) {
  return (
    <li key={post._id}>
      <div>
        <Link to={`/post/${post._id}`}>{post.title}</Link>
        <br />
        {post.description}
        <br />
        {post.content}
        <br />
        <Link to={`/post/${post._id}`}>See Post</Link>
      </div>
    </li>
  );
}

export default PostItem;
