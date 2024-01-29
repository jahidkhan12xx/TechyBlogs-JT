"use client";

import { AuthContext } from "@/Context/AuthProvider";
import { useContext, useState } from "react";
import toast from "react-hot-toast";

const COmment = ({ data }) => {
  const blog = data;
  const { user } = useContext(AuthContext);
  const [comment, setComment] = useState("");

  const handleComment = async () => {
    const blogId = blog._id;
    const name = user.displayName;
    const email = user.email;
    const body = comment;

    const comments = { blogId, name, email, body };

    const res = await fetch("https://doodlesserver.vercel.app/api/v1/comment", {
      method: "POST",
      body: JSON.stringify({ comments }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (data.insertedId) {
      toast.success("Thanks for the comment");
    }
  };

  return (
    <div>
      <h2 className=" text-xl font-semibold underline">Comments</h2>
      <input
        onChange={(e) => setComment(e.target.value)}
        type="text"
        className=" border-2 border-black"
      />{" "}
      <button onClick={handleComment} className=" btn btn-outline btn-sm">
        Submit
      </button>
    </div>
  );
};

export default COmment;
