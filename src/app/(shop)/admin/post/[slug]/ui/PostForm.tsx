"use client";

import { createUpdatePost } from "@/actions/blog/create-update-post";
import { deletePostImage } from "@/actions/blog/delete-post-image";
import { Post, post_imagenes as PostWithImage } from "@/interfaces/Post";
import clsx from "clsx";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
// import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface Props {
  post: Partial<Post> & { post_imagenes?: PostWithImage[] };
}

interface FormInputs {
  title: string;
  slug: string;
  summary: string;
  content: string;
  images?: FileList;
}

export const PostForm = ({ post }: Props) => {
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);

  const {
    handleSubmit,
    register,
    // formState: { isValid },
    // getValues,
    // setValue,
    // watch,
  } = useForm<FormInputs>({
    defaultValues: {
      ...post,
      images: undefined,
    },
  });

  const onSubmit = async (data: FormInputs) => {
    setLoaded(true);

    const formData = new FormData();

    const { images, ...postToSave } = data;

    if (post.id) {
      formData.append("id", post.id ?? "");
    }

    formData.append("title", postToSave.title);
    formData.append("slug", postToSave.slug);
    formData.append("summary", postToSave.summary);
    formData.append("content", postToSave.content);

    if (images) {
      for (let i = 0; i < images.length; i++) {
        formData.append("images", images[i]);
      }
    }

    const { ok, post: updatedPost } = await createUpdatePost(formData);

    if (!ok) {
     toast("Upss no se ha podido actualizar o crear el post!", {
       position: "top-right",
       autoClose: 1000,
     });
      return;
    }
    toast.success("Post actualizado correctamente!!", {
      position: "top-right",
      autoClose: 1000,
    });

    setLoaded(false);
    router.replace(`/admin/post/${updatedPost?.slug}`);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid px-5 mb-16 grid-cols-1 sm:px-0 sm:grid-cols-2 gap-3"
    >
      {/* Textos */}
      <div className="w-full">
        <div className="flex flex-col mb-2">
          <span>Título</span>
          <input
            type="text"
            className="p-2 border rounded-md bg-gray-200"
            {...register("title", { required: true })}
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Slug</span>
          <input
            type="text"
            className="p-2 border rounded-md bg-gray-200"
            {...register("slug", { required: true })}
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Resumen</span>
          <textarea
            rows={4}
            className="p-2 border rounded-md bg-gray-200"
            {...register("summary", { required: true })}
          ></textarea>
        </div>

        <div className="flex flex-col mb-2">
          <span>Contenido</span>
          <textarea
            rows={16}
            className="p-2 border rounded-md bg-gray-200"
            {...register("content", { required: false })}
          ></textarea>
        </div>

        <button
          // type="button"
          className={clsx("w-full", {
            "btn-primary": !loaded,
            "btn-disabled": loaded,
          })}
        >
          Guardar
        </button>
      </div>

      {/* Selector de tallas y fotos */}

      <div className="flex flex-col mb-2">
        <span>Fotos</span>
        <input
          type="file"
          {...register("images")}
          multiple
          className="p-2 border rounded-md bg-gray-200"
          accept="image/png, image/jpeg, image/avif"
        />
      </div>

       <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3 grow">
                  {post.post_imagenes?.map((image) => (
                    <div
                      key={image.id}
                      className="flex flex-col justify-end"
                    >
                      <Image 
                        alt={post.title ?? ""}
                        src={image.url}
                        width={300}
                        height={300}
                        className="rounded-t shadow-md"
                      />
      
                      <button
                        type="button"
                        onClick={() => deletePostImage(image.id, image.url)}
                        className="btn-danger w-full rounded-b-xl"
                      >
                        Eliminar
                      </button>
                    </div>
                  ))}
                </div>
    </form>
  );
};
