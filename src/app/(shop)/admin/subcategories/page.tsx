import { getSubCategories } from "@/actions";
import { Title } from "@/components";
import Link from "next/link";

export default async function CategoriesPage() {
  const subcategories = await getSubCategories();

  return (
    <>
      <Title title="Mantenimiento de Sub Categorias" />

      <div className="flex justify-end mb-5">
        <Link
          href={"/admin/subcategory/new"}
          className="text-center hover:bg-purple-900 bg-purple-600 rounded-md text-white hover:cursor-pointer hover:scale-105 duration-200 transition-all shadow-md p-2"
        >
          Agregar
        </Link>
      </div>

      <div className="mb-10">
        <table className="min-w-full">
          <thead className="bg-gray-200 border-b">
            <tr>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Id
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Nombre
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Categoria
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Opciones
              </th>
            </tr>
          </thead>
          <tbody>
            {subcategories.map((subCategory) => (
              <tr
                key={subCategory.id}
                className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
              >
                <td className="text-sm text-gray-900 font-light px-6 ">
                  {subCategory.id}
                </td>
                <td className="text-sm text-gray-900 font-light px-6 ">
                  {subCategory.nombre}
                </td>

                <td className="text-sm text-gray-900 font-light px-6 ">
                  {subCategory.categoria.nombre}
                </td>

                <td className="text-sm text-gray-900 font-light px-6 ">
                  <Link
                    href={`/admin/subcategory/${subCategory.id}`}
                    className="text-blue-500"
                  >
                    Editar
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
