import React, { useContext } from "react";
import { Link, Route, Routes } from "react-router-dom";
import AuthContext from "./store/AuthContext";
import AllPosts from "./views/AllPosts";
import CreatePost from "./views/CreatePost";
import IndiPost from "./views/IndiPost";
import Login from "./views/Login";
import Register from "./views/Register";

function App() {
  const authCtx = useContext(AuthContext);

  const logout = () => {
    fetch("/auth/logout", {
      method: "POST",
    }).then(() => {
      authCtx.logout();
    });
  };
  return (
    <div>
      <Routes>
        <Route path="/see-all" element={<AllPosts />} />
        <Route path="/new-post" element={<CreatePost />} />
        <Route path="/post/:postId" element={<IndiPost />} />
        <Route path="/auth/signup" element={<Register />} />
        <Route path="/auth/signin" element={<Login />} />
      </Routes>
      <ul>
        <li>
          <Link to="/see-all">See All Posts</Link>
        </li>
        {authCtx.isLoggedIn && (
          <>
            <li>
              <Link to="/new-post">New Post</Link>
            </li>
            <li>
              <button onClick={logout}>Logout</button>
            </li>
            <li>
              <h4><strong>{authCtx.username}</strong></h4>
            </li>
          </>
        )}
        {!authCtx.isLoggedIn && (
          <>
            <li>
              <Link to="/auth/signup">Sign Up</Link>
            </li>
            <li>
              <Link to="/auth/signin">Sign In</Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}

export default App;
