import UpdateBlog from "@/components/UpadateBlog/UpdateBlog";
import React from "react";

const Update = ({ params }) => {
  return (
    <div>
      <h2>Id : {params.id}</h2>
      <UpdateBlog id={params.id} />
    </div>
  );
};

export default Update;
