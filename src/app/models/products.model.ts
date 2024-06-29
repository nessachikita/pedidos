export interface Product {
  id_producto: number,
  nombre: string,
  descripcion: string,
  precio: number,
  cantidad: number,
  imagen: string,
  id_categoria: number,
  id_tipo: number,
  tamanos: { nombre: string, precio: number, imagen: string, id_tamanos:number }[],
  toppings: { nombre: string, precio: number }[]
}
