export interface Post {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  coverImage?: string | null;
  post_imagenes: post_imagenes[];
}

export interface post_imagenes {
  id: string;
  post_id: string;
  url: string;
  // codeColor?: string | null;
  // color?: string | null;
}