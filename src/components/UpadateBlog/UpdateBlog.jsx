"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
const UpdateBlog = ({ id }) => {
  const [blog, setBlog] = useState();
  const router = useRouter();

  useEffect(() => {
    fetch(`https://doodlesserver.vercel.app/api/v1/getSpecificBlog/${id}`)
      .then((res) => res.json())
      .then((data) => setBlog(data));
  }, [id]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const title = data.blogTitle;
    const body = data.description;
    const blogs = { title, body };
    const res = await fetch(
      `https://doodlesserver.vercel.app/api/v1/updateBlog/${id}`,
      {
        method: "PATCH",
        body: JSON.stringify({ blogs }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const serverRes = await res.json();
    if (serverRes.updatedId) {
      toast.success("Updated Successfully");

      router.push("/");
    }
    console.log(serverRes);
  };

  return (
    <div className=" flex justify-center items-center h-[70vh] w-full">
      <form onSubmit={handleSubmit(onSubmit)} class="">
        <div class="relative z-0 w-full mb-5 group">
          <input
            defaultValue={blog?.title}
            {...register("blogTitle")}
            type="text"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />

          <label
            for="floating_email"
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Blog Title
          </label>
        </div>
        <div class="relative z-0 w-full mb-5 group">
          <textarea
            defaultValue={blog?.body}
            rows="5"
            cols="50"
            {...register("description")}
            type="text"
            id="floating_password"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />

          <label
            for="floating_password"
            class="peer-focus:font-medium absolute text-sm  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Description
          </label>
        </div>

        <input
          value="Update"
          type="submit"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        />
      </form>
    </div>
  );
};

export default UpdateBlog;
