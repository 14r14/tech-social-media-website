import React from "react";

function PostItemIndividual({
  title,
  description,
  content,
  username,
  userPoints,
}) {
  return (
    <div>
      <h1>{title}</h1>
      <h3>{description}</h3>
      <p>{content}</p>
      <h1>{username}</h1>
      <p>{userPoints}</p>
    </div>
  );
}

export default PostItemIndividual;
