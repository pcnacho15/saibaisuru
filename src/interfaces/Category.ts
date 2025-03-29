

export interface Categoria {
    id:string;
    nombre:string;
}

export interface SubCategoria {
    id:string;
    nombre: string;
    categorias_id: string;
}