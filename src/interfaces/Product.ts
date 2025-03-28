export interface Product {
  id: string;
  titulo: string;
  descripcion: string;
  notas: string;
  cantidad: number;
  precio: number;
  aroma: string;
  sabor: string;
  contenido: number;
  cosecha_aprox: string;
  subCategoria: {nombre: string};
  descuento?: number | null;
  slug: string;
  images: string[];
  categorias_id: string;
}

export interface ProductImage {
  id: number;
  productId: string;
  url: string;
  codeColor?: string | null;
  color?: string | null;
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

type ValidTypes =
  | "feminizada"
  | "automatica"
  | "regular"
  | "indoor"
  | "maceta"
  | "sustrato"
  | "insecticida";