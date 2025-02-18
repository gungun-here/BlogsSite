import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import baseURL from "./render";
import parse from "html-react-parser";
import { FaRegHeart } from "react-icons/fa";
import { FaShareAlt } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import {
    FacebookShareButton,
    TwitterShareButton,
    LinkedinShareButton,
    PinterestShareButton,
    WhatsappShareButton,
    TumblrShareButton,
    RedditShareButton,
    FacebookIcon,
    TwitterIcon,
    LinkedinIcon,
    PinterestIcon,
    WhatsappIcon,
    TumblrIcon,
    RedditIcon,
  } from "react-share";

export default function Blogdetails() {
  const { id } = useParams();
  const [blog, setblog] = useState();
  const [loading, setloading] = useState(true);
  const [likes, setLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [hoveredComment, setHoveredComment] = useState(null);
  const [showShare, setShowShare] = useState(false);

  const user = JSON.parse(localStorage.getItem("user") || {});

  const handleMouseEnter = (commentId) => {
    setHoveredComment(commentId);
  };

  const handleMouseLeave = () => {
    setHoveredComment(null);
  };

  useEffect(() => {
    async function fetchdata() {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${baseURL}/api/blogs/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
     
      setblog(response.data.blog);
      setLikes(response?.data?.blog?.likes);
      setHasLiked(
        response?.data?.blog?.likedBy?.some((like) => like?.userId === token)
      );
      setComments(response?.data?.blog?.comments);
      setloading(false);
    }
    fetchdata();
  }, [id]);

  const handleLike = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(`${baseURL}/api/blogs/${id}/likes`, {
        userId: token,
      });
      setLikes(response.data.likes);
      setHasLiked(!hasLiked); // Toggle like status
    } catch (error) {
      console.error("Error liking blog:", error);

    }
  };

  const handleCommentSubmit = async () => {
    if (!commentText.trim()) return;
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${baseURL}/api/blogs/${id}/comments`,
        { text: commentText },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setComments(response.data.comments);
      setCommentText("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${baseURL}/api/blogs/${id}/comments/${commentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Update the comment list after deletion
      setComments(comments.filter((comment) => comment._id !== commentId));
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  useEffect(() => {
    async function increaseViews() {
      try {
        await axios.get(`${baseURL}/api/blogs/${id}/views`);
      } catch (error) {
        console.error("Error incrementing views:", error);
      }
    }
    increaseViews();
  }, [id]);

    const blogUrl = window.location.href;

  if (loading) {
    return <div>Loading...</div>;
  }


  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(blogUrl)}`;

 

  return (
    <div>
      <div className="grid px-[25rem] py-20 gap-8">
        <span className="text-sm">
          {new Date(blog.date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </span>
        <span className="text-6xl font-my leading-snug">{blog.title}</span>
        <span className="text-lg">By <Link to={`/authorprofile/${blog.author}`} className="hover:underline">{blog.authorName}</Link></span>
        <img
          src={blog.image}
          alt="blog image"
          className="h-[493px] w-[740px]"
        />
        <div className="border-b-2 border-[#bc8f8f] pb-8">
          <div className="w-full overflow-hidden break-words whitespace-pre-wrap">
            <div className="w-fit h-fit">{parse(blog.content)}</div>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span>
              {blog.views} {blog.views === 1 ? "view" : "views"}
            </span>
            <span>
              {comments?.length}{" "}
              {comments?.length === 1 ? "comment" : "comments"}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex gap-1"><button onClick={handleLike} className="flex items-center gap-1 cursor-pointer">
              {hasLiked ? <FaHeart color="red" /> : <FaRegHeart />}
            </button> {likes}</div>
            <span className="flex items-center gap-4 cursor-pointer">
              <FaShareAlt onClick={()=>setShowShare(!showShare)} />
              <div className={`${showShare ? "flex" : "hidden" } gap-2`}>
                <FacebookShareButton url={blogUrl}>
                  <FacebookIcon size={32} round />
                </FacebookShareButton>
                <TwitterShareButton url={blogUrl}>
                  <TwitterIcon size={32} round />
                </TwitterShareButton>
                <LinkedinShareButton url={blogUrl}>
                  <LinkedinIcon size={32} round />
                </LinkedinShareButton>
                <PinterestShareButton url={blogUrl} media={blog.image}>
                  <PinterestIcon size={32} round />
                </PinterestShareButton>
                <a href={whatsappUrl}>
                  <WhatsappIcon size={32} round />
                </a>
                
                <TumblrShareButton url={blogUrl}>
                  <TumblrIcon size={32} round />
                </TumblrShareButton>
                <RedditShareButton url={blogUrl}>
                  <RedditIcon size={32} round />
                </RedditShareButton>
              </div>
            </span>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-4">Comments</h2>
          <div className="flex justify-between mb-8 items-center gap-4">
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Add a comment..."
              className="border p-2 w-full rounded"
            />
            <button
              onClick={handleCommentSubmit}
              className="px-4 py-2 bg-black text-white rounded-lg"
            >
              Add
            </button>
          </div>
          {comments?.map((comment, index) => (
            <div key={index} className="mb-2 flex justify-between items-center" onMouseEnter={() => handleMouseEnter(comment._id)}
            onMouseLeave={handleMouseLeave}>
              <div>
                <span className="font-semibold">{comment.author}:</span>{" "}
                {comment.text}
              </div>
              {hoveredComment === comment._id && user?.userId === comment.userId && (<MdDelete
                className="cursor-pointer hover:text-red-500 text-lg"
                onClick={() => handleDeleteComment(comment._id)}
              />)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
