import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import AllPosts from "./views/AllPosts";
import CreatePost from "./views/CreatePost";
import IndiPost from "./views/IndiPost";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/see-all" element={<AllPosts />} />
        <Route path="/new-post" element={<CreatePost />} />
        <Route path="/post/:postId" element={<IndiPost />} />
      </Routes>
      <ul>
        <li>
          <Link to="/see-all">See All Posts</Link>
        </li>
        <li>
          <Link to="/new-post">New Post</Link>
        </li>
      </ul>
    </div>
  );
}

export default App;
