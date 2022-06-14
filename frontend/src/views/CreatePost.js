import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function CreatePost() {
  const [data, setData] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
  } = useForm();

  const navigate = useNavigate();

  const submitHandler = () => {
    const title = getValues("title");
    const description = getValues("description");
    const content = getValues("content");

    fetch("/helpers/get-auth-token")
      .then((res) => res.json())
      .then((token) => {
        fetch("/post/add-post", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token.token}`,
          },
          body: JSON.stringify({
            title,
            description,
            content,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            setValue("title", "");
            setValue("description", "");
            setValue("content", "");
            setData(data.msg);
            setTimeout(() => navigate("/"), 3000);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      {data}
      <input
        type="text"
        name="title"
        placeholder="Title"
        {...register("title", { required: true })}
      />
      <textarea
        name="description"
        placeholder="Description"
        {...register("description", { required: true })}
      ></textarea>
      <textarea
        name="content"
        placeholder="Content"
        {...register("content", { required: true })}
      ></textarea>
      <button type="submit">Post to Blog</button>
    </form>
  );
}

export default CreatePost;
