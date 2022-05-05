import React, { useRef, useState } from "react";

function CreatePost() {
  const [data, setData] = useState("");

  const titleRef = useRef();
  const descRef = useRef();
  const contentRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();

    const title = titleRef.current.value;
    const description = descRef.current.value;
    const content = contentRef.current.value;

    fetch("/post/blog/add-post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        content,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data.msg);
      });
  };
  return (
    <form onSubmit={submitHandler}>
      {data}
      <input type="text" name="title" ref={titleRef} />
      <textarea name="description" ref={descRef}></textarea>
      <textarea name="content" ref={contentRef}></textarea>
      <button type="submit">Post to Blog</button>
    </form>
  );
}

export default CreatePost;
