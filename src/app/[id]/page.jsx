import COmment from "@/components/Comment/COmment";
import Favourite from "@/components/Favourite/Favourite";
import ReaderComment from "@/components/ReaderComment/ReaderComment";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const Blog = async ({ params }) => {
  const res = await fetch(
    `https://doodlesserver.vercel.app/api/v1/getSpecificBlog/${params.id}`,
    {
      next: {
        revalidate: 1,
      },
    }
  );
  const data = await res.json();

  return (
    <div className=" md:mt-40 mt-10 px-2  container mx-auto ">
      <div className=" ">
        <div>
          <h2 className=" md:text-5xl text-3xl underline font-bold">
            {data.title}
          </h2>
          <p className=" max-w-screen-2xl md:text-2xl text-xl my-5">
            {data.body}
          </p>
        </div>
      </div>
      <div>
        <Favourite data={data} />
      </div>

      <div className=" mt-11">
        <COmment data={data} />
      </div>

      <div>
        <ReaderComment data={data} />
      </div>
    </div>
  );
};

export default Blog;
