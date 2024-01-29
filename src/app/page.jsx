import CrudBlog from "@/components/crudBlog/CrudBlog";
import Link from "next/link";
import React from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const Home = async () => {
  const res = await fetch(
    "https://doodlesserver.vercel.app/api/v1/getAllBlogs",
    {
      cache: "no-store",
    }
  );
  const blogs = await res.json();

  return (
    <div>
      <h2 className=" text-center text-4xl mt-10 underline">Our Blogs</h2>
      <div className=" grid grid-cols-1 md:grid-cols-4 my-32 gap-5 mx-3">
        {blogs.map((blog) => (
          <div key={blog._id}>
            <div class=" p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {blog.title.slice(0, 32)}
              </h5>

              <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {blog.body.slice(0, 50)}
              </p>
              <div className=" flex gap-3">
                <Link
                  href={`/${blog._id}`}
                  class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Read more
                  <svg
                    class="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </Link>
                <CrudBlog blog={blog} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
