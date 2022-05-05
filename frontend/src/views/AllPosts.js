import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function AllPosts() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/post/blog/get-all-posts")
      .then((res) => res.json())
      .then((data) => {
        setData(data.posts);
      });
  }, []);

  return (
    <>
      <div>All Posts</div>
      <ul>
        {data.map((p, i) => (
          <li key={p["id"]}>
            <div>
              <Link to={`/post/${p["id"]}`}>{p["title"]}</Link>
              <br />
              {p["description"]}
              <br />
              {p["createdAt"]}
              <br />
              {p["updatedAt"]}
              <br />
              <Link to={`/post/${p['id']}`}>See Post</Link>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default AllPosts;
