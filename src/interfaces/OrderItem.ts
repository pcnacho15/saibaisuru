export interface Order {
  id: string;
  sub_total: number;
  tax: number | null;
  estado_order: string;
  estado_envio:string;
  costo_envio: number | null;
  total: number;
  items_in_order: number;
  fecha_pago:string | null;
  usuario_id: string | null;
  transaction_id: string | null;
  ref_epayco:string | null;
  fecha_crea: Date
  OrderDetalle: OrderDetalle[];
  OrderAdress: OrderAdress | null;
} 


export interface OrderDetalle {
  producto: {
    id: string;
    slug:string;
    titulo: string;
    descripcion: string;
    notas: string;
    cantidad: number;
    precio: number;
    aroma?: string | null;
    sabor?: string | null;
    contenido?: number | null;
    subCategoria?: string;
    producto_imagenes: { url: string }[];
  };
}

export interface OrderAdress {
  nombres:string;
  apellidos:string;
}


export interface EPayco {
  checkout: {
    configure: (options: { key?: string; test: boolean }) => any;
  };
}