"use client";
import { AuthContext } from "@/Context/AuthProvider";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { FaGoogle } from "react-icons/fa";
const LoginPage = () => {
  const router = useRouter();

  const { user, login, googleLogin } = useContext(AuthContext);
  const [error, setError] = useState();

  const handleGoogle = () => {
    googleLogin()
      .then(async (res) => {
        const name = res.user.displayName;
        const email = res.user.email;
        const isBlocked = false;
        const uid = Date.now();
        const user = { uid, name, email, isBlocked };

        const result = await fetch(
          "https://doodlesserver.vercel.app/api/v1/users"
        );
        const existUser = await result.json();

        const isExist = existUser.find(
          (exUser) => exUser.email === res.user.email
        );

        if (!isExist) {
          const response = await fetch(
            "https://doodlesserver.vercel.app/api/v1/users",
            {
              method: "POST",
              body: JSON.stringify({ user }),
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const data = await response.json();
        }
        toast.success("Successfully Login");
        router.push("/");
      })
      .catch((err) => {
        console.log(err.code);
        setError(err.code);
      });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    const email = data.email;
    const pass = data.password;
    login(email, pass)
      .then((res) => {
        if (res.user) {
          toast.success("Login Successfull");
          router.push("/");
        }
      })
      .catch((error) => {
        console.log(error.code);
        setError(error.code);
      });
  };
  return (
    <div>
      <div className=" flex justify-center my-36">
        <div class="relative flex flex-col text-gray-700 bg-transparent shadow-none rounded-xl bg-clip-border">
          <h4 class="block font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
            Sign In
          </h4>
          <p class="block mt-1 font-sans text-base antialiased font-normal leading-relaxed text-gray-700">
            Nice to meet you! Login to your account.
          </p>
          <p className=" font-bold text-red-800 italic">{error}</p>
          <form
            onSubmit={handleSubmit(onSubmit)}
            class="max-w-screen-lg mt-8 mb-2 w-80 sm:w-96"
          >
            <div class="flex flex-col gap-6 mb-1">
              <h6 class="block -mb-3 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
                Your Email
              </h6>
              <div class="relative h-11 w-full min-w-[200px]">
                <input
                  type="email"
                  {...register("email", { required: true })}
                  placeholder="name@mail.com"
                  class="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                />
                {errors.email?.type === "required" && (
                  <span className="text-red-600">This field is required</span>
                )}

                <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all before:content-none after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all after:content-none peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"></label>
              </div>
              <h6 class="block -mb-3 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
                Password
              </h6>
              <div class="relative h-11 w-full min-w-[200px]">
                <input
                  {...register("password", { required: true })}
                  type="password"
                  placeholder="********"
                  class="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                />
                {errors.password?.type === "required" && (
                  <span className="text-red-600">This field is required</span>
                )}
                <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all before:content-none after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all after:content-none peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"></label>
              </div>
            </div>

            <input
              class="mt-6 block cursor-pointer  w-full select-none rounded-lg bg-gray-900 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="submit"
              value="Sign In"
            />
            <hr className=" border-2 border-black my-2" />
            <div className=" flex justify-center">
              <button onClick={handleGoogle} className=" btn btn-ghost text-xl">
                {" "}
                <FaGoogle /> Login
              </button>
            </div>

            <p class="block mt-4 font-sans text-base antialiased font-normal leading-relaxed text-center text-gray-700">
              Already have an account ?
              <Link
                href="/register"
                class="font-medium text-gray-900 underline"
              >
                &nbsp; Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
