import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link,useNavigate } from "react-router-dom";
import "./Homepage.css";

const HomePage = ({ setUser }) => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const token = localStorage.getItem("token");

  const getUser = async () => {
    if (!token) {
      navigate("/login");
    } else {
      try {
        const res = await axios.get("http://localhost:3000/api/getuser", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.status === 200) {
          setUser(res.data.name);
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.error(error);
        navigate("/login");
      }
    }
  };

  const getPosts = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/getAllPosts", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 200) {
        setPosts(res.data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUser();
    getPosts();
  }, []);

  return (
    <div className="homepage-container">
      <div className="post3-grid">
        {posts.length === 0 ? (
          <div>No posts available</div>
        ) : (
          posts.map((post) => (
            <Link to={`/viewPost/${post._id}`}>
                <div key={post._id} className="post3-card">
            {post.images && post.images.length > 0 && (
              <img
                src={post.images[0]}
                alt={post.caption}
                className="post3-image"
              />
            )}
            <div className="post3-caption">{post.caption}</div>
          </div>
          </Link>  
          ))
        )}
      </div>
    </div>
  );
};

export default HomePage