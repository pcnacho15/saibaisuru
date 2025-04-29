"use client";

import Link from "next/link";
import { toast } from "react-toastify";
import { blog_posts } from "@prisma/client";
import { changeStatusPost, deletePost } from "@/actions";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

interface Props {
  post: blog_posts;
}

export const BlogAdminTable = ({ post }: Props) => {

  const publishPostHandler = async (id: string) => {
    if (post.published) {
      toast.error("El post ya está publicado", {
        position: "top-right",
        autoClose: 1000,
      });
      return;
    }

    const res = await changeStatusPost(id);

    if (res?.ok) {
      toast.success("Se ha publicado el post!!", {
        position: "top-right",
        autoClose: 1000,
      });
    } else {
      toast.error("Upps no se ha podido publicar el post", {
        position: "top-right",
        autoClose: 1000,
      });
    }
  }

  const deletePostHandler = async (id: string) => {
    if (!post.published) {
      toast.error("El post ya está despublicado", {
        position: "top-right",
        autoClose: 1000,
      });
      return;
    }

    const res = await deletePost(id);
    if (res?.ok) {
      toast.success("Se ha despublicado el post!!", {
        position: "top-right",
        autoClose: 1000,
      });
    } else {
      toast.error("Upps no se ha podido despublicar el post", {
        position: "top-right",
        autoClose: 1000,
      });
    }
  };

  return (
    <tr
      key={post.id}
      className="border-t text-center"
    >
      <td className="py-2">{post.title}</td>
      <td className="py-2">{post.published ? "✅" : "❌"}</td>
      <td className="py-2 flex flex-row items-center justify-center gap-2">
        <Link
          href={`/admin/post/${post.slug}`}
          className="text-blue-600 hover:underline"
        >
          <FaEdit size={20} />
        </Link>

        <button
          type="submit"
          className="text-red-600 hover:underline"
          onClick={() => deletePostHandler(post.id)}
        >
          <RiDeleteBinLine size={20} />
        </button>

        <button
          type="submit"
          className="text-green-600 hover:underline"
          onClick={() => publishPostHandler(post.id)}
        >
          <IoMdCheckmarkCircleOutline size={20} />
        </button>
      </td>
    </tr>
  );
};
