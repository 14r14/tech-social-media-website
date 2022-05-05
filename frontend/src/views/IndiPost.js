import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function IndiPost() {
  const { postId } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(
      "http://localhost:8000/post/blog/get-individual-post?postId=" + postId
    )
      .then((res) => res.json())
      .then((data) => {
        setData(data.post);
      });
  }, [postId]);

  return (
    <>
      <div>
        <ul>
          <li><h1>{data["title"]}</h1></li>
          <li>
            <h3>{data["content"]}</h3>
          </li>
          <li>{data["createdAt"]}</li>
          <li>{data["updatedAt"]}</li>
        </ul>
      </div>
    </>
  );
}

export default IndiPost;
