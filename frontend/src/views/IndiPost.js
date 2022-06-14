import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostItemIndividual from "../components/PostItemIndividual";

function IndiPost() {
  const { postId } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/helpers/get-auth-token")
      .then((res) => res.json())
      .then((token) => {
        fetch("/post/get-individual-post?postId=" + postId, {
          headers: {
            Authorization: `Bearer ${token.token}`,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            setData(data.post);
          });
      });
  }, [postId]);

  return (
    <>
      {data && (
        <PostItemIndividual
          title={data.title}
          description={data.description}
          content={data.content}
          username={data.userId.username}
          userPoints={data.userId.points}
        />
      )}
      {!data && <p>Error, please try again later.</p>}
      <button>Upvote</button>&nbsp;&nbsp;
      <button>Downvote</button>
    </>
  );
}

export default IndiPost;
