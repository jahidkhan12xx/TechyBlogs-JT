import { MdEditSquare } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import CrudComment from "../CrudComment/CrudComment";
const ReaderComment = async ({ data }) => {
  const res = await fetch(
    `https://doodlesserver.vercel.app/api/v1/getblogsComment/${data._id}`,
    {
      next: {
        revalidate: 0,
      },
    }
  );
  const comments = await res.json();

  return (
    <div className="  my-9">
      <h2 className=" text-xl font-medium underline my-2">Readers Comment</h2>
      <div className=" grid grid-cols-1 gap-6 md:grid-cols-3">
        {comments.map((comment) => (
          <div
            key={comment._id}
            className=" bg-black p-3 rounded-lg flex justify-between "
          >
            <div>
              <h5 class="mb-2 text-2xl font-bold tracking-tight text-white ">
                {comment?.name}
              </h5>
              <p class="font-normal text-white ">{comment?.body}</p>
            </div>
            <CrudComment comment={comment} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReaderComment;
