"use client";

import { getDepartmentById, getMunicipioById } from "@/actions";
import { Departamento, Municipio } from "@/interfaces/Address";
import { useAdresStore } from "@/store/adresStore";
import clsx from "clsx";
// import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
// import { BsShop } from "react-icons/bs";
// import { TbTruckDelivery } from "react-icons/tb";

interface FormInputs {
  correo: string;
  nombres: string;
  apellidos: string;
  celular: string;
  tipoDocumento: string;
  numeroDocumento: string;
  departamento: number;
  municipio: number;
  direccion: string;
  direccion2: string;
  // codigoPostal: string;
  // ciudad: string;
  telefono: string;
}

interface Props {
  departamentos: Departamento[];
  municipios: Municipio[];
}

export const AdressForm = ({ departamentos, municipios }: Props) => {
  const [municipioSelect, setMunicipioSelect] = useState<Municipio[]>([]);
  const [loaded, setLoaded] = useState(false);

  const router = useRouter();
  const setAdress = useAdresStore((state) => state.setAdress);
  const getAdress = useAdresStore((state) => state.getAdress);

  const {
    handleSubmit,
    register,
    formState: { /*isValid,*/ errors },
    watch,
    reset,
  } = useForm<FormInputs>();

  const valueDepartamento = watch("departamento");

  useEffect(() => {
    setMunicipioSelect(
      municipios.filter((m) => m.departamento_id === Number(valueDepartamento))
    );
    const adress = getAdress();

    const { departamento, municipio, ...resto } = adress;


    const departmentFound = departamentos.find(
      (d) => d.nombre === departamento
    );
    const municipioFound = municipios.find((m) => m.nombre === municipio);

    if (adress.nombres) {
      reset({
        ...resto,
        departamento: departmentFound!.id,
        municipio: municipioFound!.id,
      });
    }
  }, [valueDepartamento, departamentos, getAdress, municipios, reset]);

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {

    setLoaded(true);

    const { departamento, municipio, ...resto } = data;
    const departmentById = await getDepartmentById(Number(departamento));
    const municipioById = await getMunicipioById(Number(municipio));

    setAdress({
      ...resto,
      departamento: departmentById!.nombre,
      municipio: municipioById!.nombre,
    });
    router.push("/checkout");
    setLoaded(false);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-3"
    >
      <div className="flex flex-col mb-2">
        <span
          className={`text-gray-500 font-semibold after:content-['*'] after:ml-0.5 after:text-red-500`}
        >
          Correo
        </span>
        <input
          type="email"
          placeholder="correo@mail.com"
          className={clsx("p-2 border rounded-md bg-gray-200", {
            "border-2 border-rose-500 fade-in": errors.correo,
          })}
          {...register("correo", {
            required:
              "El correo debe ser obligatorio, allí enviaremos la factura de tu compra",
          })}
        />
        {errors.correo && (
          <span className={`text-sm text-rose-500 fade-in`}>
            {errors.correo.message}
          </span>
        )}
      </div>

      <div className="flex flex-col mb-2">
        <span
          className={`text-gray-500 font-semibold after:content-['*'] after:ml-0.5 after:text-red-500`}
        >
          Celular
        </span>
        <input
          type="text"
          placeholder="Ej: 30548732..."
          className={clsx("p-2 border rounded-md bg-gray-200", {
            "border-2 border-rose-500 fade-in": errors.telefono,
          })}
          {...register("telefono", {
            required:
              "El número de celular es requerido para realizar el envío",
            minLength: {
              value: 10,
              message: "El número de celular ingresado no es correcto",
            },
          })}
        />
        {errors.telefono && (
          <span className={`text-sm text-rose-500 fade-in`}>
            {errors.telefono.message}
          </span>
        )}
      </div>

      <div className="flex flex-col mb-2">
        <span
          className={`text-gray-500 font-semibold after:content-['*'] after:ml-0.5 after:text-red-500`}
        >
          Nombres
        </span>
        <input
          type="text"
          placeholder="Ej: Fulano"
          className={clsx("p-2 border rounded-md bg-gray-200", {
            "border-2 border-rose-500 fade-in": errors.nombres,
          })}
          {...register("nombres", {
            required: "El nombre es un campo requerido para realizar el envío",
          })}
        />
        {errors.nombres && (
          <span className={`text-sm text-rose-500 fade-in`}>
            {errors.nombres.message}
          </span>
        )}
      </div>

      <div className="flex flex-col mb-2">
        <span
          className={`text-gray-500 font-semibold after:content-['*'] after:ml-0.5 after:text-red-500`}
        >
          Apellidos
        </span>
        <input
          type="text"
          placeholder="Ej: De tal"
          className={clsx("p-2 border rounded-md bg-gray-200", {
            "border-2 border-rose-500 fade-in": errors.apellidos,
          })}
          {...register("apellidos", {
            required:
              "El apellido es un campo requerido para realizar el envío",
          })}
        />
        {errors.apellidos && (
          <span className={`text-sm text-rose-500 fade-in`}>
            {errors.apellidos.message}
          </span>
        )}
      </div>

      <div className="flex flex-col mb-2">
        <span
          className={`text-gray-500 font-semibold after:content-['*'] after:ml-0.5 after:text-red-500`}
        >
          Tipo Documento
        </span>
        <select
          defaultValue={""}
          // className="p-2 border rounded-md bg-gray-200 text-gray-600"
          className={clsx("p-2 border rounded-md bg-gray-200 text-gray-600", {
            "border-2 border-rose-500 fade-in": errors.tipoDocumento,
          })}
          {...register("tipoDocumento", {
            required: "Selecciona un tipo de documento",
          })}
        >
          <option
            value=""
            disabled
          >
            Elija un tipo de documento
          </option>
          <option value="CC">Cédula de ciudadanía</option>
          <option value="CE">Cédula de extranjería</option>
          <option value="TI">Tarjeta identidad</option>
        </select>
        {errors.tipoDocumento && (
          <span className={`text-sm text-rose-500 fade-in`}>
            {errors.tipoDocumento.message}
          </span>
        )}
      </div>

      <div className="flex flex-col mb-2">
        <span
          className={`text-gray-500 font-semibold after:content-['*'] after:ml-0.5 after:text-red-500`}
        >
          Número de documento
        </span>
        <input
          type="text"
          placeholder="Ej: 100306..."
          className={clsx("p-2 border rounded-md bg-gray-200", {
            "border-2 border-rose-500 fade-in": errors.numeroDocumento,
          })}
          {...register("numeroDocumento", {
            required:
              "El número de documento es requerido para generar la factura de tu compra",
            minLength: 6,
          })}
        />
        {errors.numeroDocumento && (
          <span className={`text-sm text-rose-500 fade-in`}>
            {errors.numeroDocumento.message}
          </span>
        )}
      </div>

      <div className="flex flex-col mb-2">
        <span
          className={`text-gray-500 font-semibold after:content-['*'] after:ml-0.5 after:text-red-500`}
        >
          Departamento
        </span>
        <select
          defaultValue={""}
          // className="p-2 border rounded-md bg-gray-200 text-gray-600 capitalize"
          className={clsx(
            "p-2 border rounded-md bg-gray-200 text-gray-600 capitalize",
            {
              "border-2 border-rose-500 fade-in": errors.departamento,
            }
          )}
          {...register("departamento", {
            required: "Selecciona tu departamento de residencia",
          })}
        >
          <option
            value=""
            disabled
          >
            Seleccione un departamento
          </option>
          {departamentos.map((d) => (
            <option
              key={d.id}
              value={d.id}
            >
              {d.nombre}
            </option>
          ))}
        </select>
        {errors.departamento && (
          <span className={`text-sm text-rose-500 fade-in`}>
            {errors.departamento.message}
          </span>
        )}
      </div>

      <div className="flex flex-col mb-2">
        <span
          className={`text-gray-500 font-semibold after:content-['*'] after:ml-0.5 after:text-red-500`}
        >
          Municipio
        </span>
        <select
          defaultValue={""}
          className={clsx(
            "p-2 border rounded-md bg-gray-200 text-gray-600 capitalize",
            {
              "border-2 border-rose-500 fade-in": errors.municipio,
            }
          )}
          {...register("municipio", {
            required: "Selecciona tu municipio de residencia",
          })}
        >
          <option
            value=""
            disabled
          >
            Seleccione un Municipio
          </option>
          {municipioSelect.map((m) => (
            <option
              key={m.id}
              value={m.id}
              className="capitalize"
            >
              {m.nombre}
            </option>
          ))}
        </select>
        {errors.municipio && (
          <span className={`text-sm text-rose-500 fade-in`}>
            {errors.municipio.message}
          </span>
        )}
      </div>

      <div className="flex flex-col mb-2">
        <span
          className={`text-gray-500 font-semibold after:content-['*'] after:ml-0.5 after:text-red-500`}
        >
          Dirección
        </span>
        <input
          placeholder="Ej: Carrera 24A # 83-15"
          type="text"
          className={clsx("p-2 border rounded-md bg-gray-200 capitalize", {
            "border-2 border-rose-500 fade-in": errors.direccion,
          })}
          {...register("direccion", {
            required: "Por favor índicanos la dirección de tu residencia",
          })}
        />
        {errors.direccion && (
          <span className={`text-sm text-rose-500 fade-in`}>
            {errors.direccion.message}
          </span>
        )}
      </div>

      <div className="flex flex-col mb-2">
        <span className={`text-gray-500 font-semibold`}>
          Información adicional (ej: apto 201)
        </span>
        <input
          placeholder="Barrio, edificio, apto, casa, etc. (opcional)"
          type="text"
          className="p-2 border rounded-md bg-gray-200 capitalize"
          {...register("direccion2", { required: false })}
        />
      </div>

      <div className="flex flex-col">
        <div className="flex flex-col mb-2 mt-5">
          <button
            //   href="/checkout"
            type="submit"
            disabled={loaded}
            className={clsx(
              "sm:w-1/2 flex items-center text-center justify-center w-full text-white font-semibold active:scale-95 transition-all duration-200 shadow-md rounded py-2",
              {
                "hover:cursor-pointer bg-gradient-to-r from-purple-700 to-purple-600":
                  !loaded,
                " hover:cursor-none bg-gray-400": loaded,
              }
            )}
          >
            Ir a pagar
          </button>
        </div>
      </div>
    </form>
  );
};
