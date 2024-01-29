"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import { MdDelete, MdEditSquare } from "react-icons/md";

const CrudComment = ({ comment }) => {
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState();

  const handleUpdate = async () => {
    setShowModal(false);

    const res = await fetch(
      `https://doodlesserver.vercel.app/api/v1/updateComment/${comment._id}`,
      {
        method: "PATCH",
        body: JSON.stringify({ data }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const response = await res.json();

    if (response.updatedId) {
      toast.success("Comment Updated");
    }
  };

  const Modal = (
    <div className=" flex gap-2 ">
      <input
        onChange={(e) => setData(e.target.value)}
        className=" border-black text-black px-2"
        type="text"
        name=""
        id=""
      />
      <button onClick={handleUpdate} className=" btn btn-sm btn-primary">
        submit
      </button>
    </div>
  );

  const handleModal = () => {
    setShowModal(!showModal);
  };
  const handleDelete = async () => {
    console.log("clicked", comment?._id);
    const res = await fetch(
      `https://doodlesserver.vercel.app/api/v1/deleteComment/${comment._id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    if (data.deletedId) {
      toast.success("Comment Deleted");
    }
    console.log(data);
  };

  return (
    <div className=" flex flex-col h-32 gap-2 text-white">
      <button
        onClick={handleModal}
        className=" btn btn-sm btn-ghost border-white text-xl transition-all duration-500"
      >
        {" "}
        <MdEditSquare />
      </button>

      <button
        onClick={handleDelete}
        className=" btn btn-sm btn-ghost border-white text-xl transition-all duration-500"
      >
        <MdDelete />
      </button>
      <div className=" transition-all duration-500">{showModal && Modal}</div>
    </div>
  );
};

export default CrudComment;
