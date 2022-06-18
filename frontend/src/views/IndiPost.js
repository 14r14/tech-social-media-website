import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import PostItemIndividual from "../components/PostItemIndividual";

function IndiPost() {
  const { postId } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetch("/helpers/get-auth-token")
      .then((res) => res.json())
      .then((token) => {
        if (token) {
          fetch("/post/get-individual-post?postId=" + postId, {
            headers: {
              Authorization: `Bearer ${token.token}`,
            },
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.success) {
                setData(data.post);
                setLoading(false);
              } else {
                if (data.err === "tkninv") {
                  setLoading(false);
                  navigate("/posts");
                }
              }
            });
        } else {
          setLoading(false);
          navigate("/posts");
        }
      });
  }, [postId]);

  return (
    <>
      {loading && <p>Loading...</p>}
      {data && (
        <PostItemIndividual
          title={data.title}
          description={data.description}
          content={data.content}
          username={data.userId.username}
          userPoints={data.userId.points}
        />
      )}
      {!data && !loading && <p>Error, please try again later.</p>}
      {data && (
        <>
          <button>Upvote</button>&nbsp;&nbsp;
          <button>Downvote</button>
        </>
      )}
    </>
  );
}

export default IndiPost;
