export interface Product {
  id: string;
  titulo: string;
  descripcion: string;
  notas: string;
  cantidad: number;
  precio: number;
  aroma?: string | null;
  sabor?: string | null;
  contenido?: number | null;
  cosecha_aprox: string | null;
  subCategoria: { nombre: string };
  descuento?: number | null;
  slug: string;
  images: string[];
  categorias_id: string;
  sub_categorias_id: string;
}

export interface producto_imagenes {
  id: string;
  productos_id: string;
  url: string;
  // codeColor?: string | null;
  // color?: string | null;
}

export interface CartProduct {
  id: string;
  slug: string;
  title: string;
  price: number;
  quantity: number;
  tipoProducto: string;
  // color?: string | null;
  image: string;
}

export type SemillasType = "feminizada" | "automatica" | "regular";

export type CultivoType =
  | "indoor"
  | "maceta"
  | "sustrato"
  | "insecticida";