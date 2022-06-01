import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function IndiPost() {
  const { postId } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/helpers/get-auth-token').then(res => res.json()).then(token => {
      fetch(
        "/post/get-individual-post?postId=" + postId
      , {
        headers: {
          'Authorization': `Bearer ${token.token}`
        }
      })
        .then((res) => res.json())
        .then((data) => {
          setData(data.post);
        });
    })
  }, [postId]);

  return (
    <>
      <div>
        <h1>{data.title}</h1>
        <h3>{data.description}</h3>
        <p>{data.content}</p>
      </div>
    </>
  );
}

export default IndiPost;
