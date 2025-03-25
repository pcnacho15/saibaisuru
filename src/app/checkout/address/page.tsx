import { AddressClient } from "./ui/AddressClient";
import { getDepartments, getMunicipios } from "@/actions";

export default async function AdressPage() {
  const departamentos = await getDepartments();
  const municipios = await getMunicipios();

  return (
    <div className="flex flex-col sm:justify-center sm:items-center mb-10 px-5">
      <div className="w-full xl:w-[1000px] flex flex-col justify-center text-left">
        <AddressClient
          departamentos={departamentos}
          municipios={municipios}
        />
      </div>
    </div>
  );
}
