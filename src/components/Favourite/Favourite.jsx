"use client";
import { AuthContext } from "@/Context/AuthProvider";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { BsBookmarkCheck } from "react-icons/bs";
import { BsBookmarkCheckFill } from "react-icons/bs";

const Favourite = ({ data }) => {
  const [mark, setMark] = useState(true);
  const { user } = useContext(AuthContext);

  const handleFav = async () => {
    const title = data.title;
    const body = data.body;
    const userId = data.userId;
    const blogId = data._id;
    const email = user.email;
    const blog = { title, body, userId, blogId, email };

    if (mark) {
      const res = await fetch(
        "https://doodlesserver.vercel.app/api/v1/favourite",
        {
          method: "POST",
          body: JSON.stringify({ blog }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const serverRes = await res.json();

      if (serverRes.insertedId) {
        toast.success("Successfully added to Favourite");
      } else {
        toast.error("Already in Favourite");
      }
      console.log(serverRes);
    } else {
      const res = await fetch(
        `https://doodlesserver.vercel.app/api/v1/favouriteDelete/${blogId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const serverRes = await res.json();
      if (serverRes.deletedId) {
        toast.success("Deleted");
      }
      console.log(serverRes);
    }
  };

  return (
    <div>
      <button
        onClick={() => {
          setMark(!mark);
          handleFav();
        }}
        className=" btn btn-outline"
      >
        {mark ? (
          <BsBookmarkCheck className=" text-2xl" />
        ) : (
          <BsBookmarkCheckFill className=" text-2xl" />
        )}
      </button>
    </div>
  );
};

export default Favourite;
