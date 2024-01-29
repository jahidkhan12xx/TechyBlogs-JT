"use client";
import Link from "next/link";
import toast from "react-hot-toast";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const CrudBlog = ({ blog }) => {
  console.log(blog);
  const handleDelete = async () => {
    const res = await fetch(
      `https://doodlesserver.vercel.app/api/v1/deleteBlog/${blog._id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    if (data.deletedId) {
      toast.success("Bolg Deleted");
      location.reload();
    }
    console.log(data);
  };
  return (
    <div>
      <div className=" flex gap-2  ">
        <Link href={`/update/${blog._id}`}>
          <button className=" btn btn-sm btn-outline border-white ">
            {" "}
            <FaEdit className="text-xl text-white" />
          </button>
        </Link>
        <button
          onClick={handleDelete}
          className=" btn btn-sm btn-outline border-white"
        >
          <MdDelete className="text-xl text-white" />
        </button>
      </div>
    </div>
  );
};

export default CrudBlog;
