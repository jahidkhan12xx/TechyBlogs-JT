"use client";
import { AuthContext } from "@/Context/AuthProvider";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";

const FavouritePage = () => {
  const { user } = useContext(AuthContext);
  const [fav, setFav] = useState();
  console.log(fav);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `https://doodlesserver.vercel.app/api/v1/favourite/${user?.email}`,
        {
          cache: "no-store",
        }
      );
      const data = await res.json();
      setFav(data);
    };
    fetchData();
  }, [user?.email]);
  return (
    <div className=" h-screen">
      <div className=" grid grid-cols-1 md:grid-cols-3 my-14 gap-4">
        {fav?.map((item) => (
          <div key={item._id}>
            <div class=" p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {item.title.slice(0, 32)}
              </h5>

              <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {item.body.slice(0, 50)}
              </p>
              <Link
                href={`/${item.blogId}`}
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavouritePage;
