"use client";

import { AuthContext } from "@/Context/AuthProvider";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const AddBlogsPage = () => {
  const { user } = useContext(AuthContext);
  const [dbUser, setDbUser] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/v1/users");
        const data = await res.json();
        const cUser = data.find((us) => us.email === user.email);
        setDbUser(cUser);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [user?.email]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    const title = data.blogTitle;
    const body = data.description;
    const userId = dbUser.uid;

    const blog = { title, body, userId };

    const res = await fetch("http://localhost:5000/api/v1/blogs", {
      method: "POST",
      body: JSON.stringify({ blog }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const dataN = await res.json();

    if (dataN.insertedId) {
      toast.success("Blog Created Successfully");
      reset();
    }
    console.log(dataN);
  };
  return (
    <div>
      <h2 className=" text-center font-bold underline md:text-4xl text-xl my-12">
        Enter details for the blog
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} class="">
        <div class="relative z-0 w-full mb-5 group">
          <input
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
          value="Submit"
          type="submit"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        />
      </form>
    </div>
  );
};

export default AddBlogsPage;
