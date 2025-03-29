// import { Title } from "@/modules";
import { getUserById } from "@/actions/users/get-user-by-id";
import { Title } from "@/components";
import { auth } from "@/utils";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/");
  }

  const { ok, user } = await getUserById(session.user.id);

  if (!ok) {
    redirect("/");
  }

  return (
    <div className="px-0 md:px-36">
      <Title title="Perfil" />
      <div className="bg-white rounded-lg shadow-lg grid grid-cols-1">
        <div className="flex items-center gap-5 border rounded-xl p-3 mx-2 md:mx-10 my-5 mb-5">
          {!user?.image ? (
            <div className="rounded-full bg-lime-600 p-3">
              <Image
                src={`/icons/user.svg`}
                alt="user"
                width={35}
                height={35}
              />
            </div>
          ) : (
            <Image
              src={user?.image || ""}
              alt="imagen de perfil de usuario"
              width={60}
              height={60}
              className="rounded-full"
            />
          )}
          <div className="flex flex-col">
            <span className="text-sm md:text-lg font-medium capitalize">{`${user?.nombre} ${user?.apellido}`}</span>
            <span className="text-sm capitalize text-gray-500">{`${
              user?.municipios?.nombre || ""
            } ${user?.pais}`}</span>
          </div>
        </div>
        <div className="border rounded-xl p-3 mx-2 md:mx-10 mb-5">
          <span className={`font-semibold`}>Información personal</span>
          <div>
            <div className="flex flex-col mt-3">
              <span className={`text-sm text-gray-400`}>Nombre</span>
              <span className="text-sm md:text-base capitalize">{`${user?.nombre} ${user?.apellido}`}</span>
            </div>
            <div className="flex flex-col mt-3">
              <span className={`text-sm text-gray-400`}>Correo</span>
              <div className="flex flex-col md:flex-row md:items-center gap-1">
                <span className="text-sm md:text-base">{user?.email}</span>
                {user?.email_confirmado ? (
                  <>
                    <span className="text-lime-600 text-xs pt-[1px]">
                      Verificado
                    </span>
                  </>
                ) : (
                  <>
                    <span className="text-red-600 text-sm pt-[1px]">
                      No verificado
                    </span>
                  </>
                )}
              </div>
            </div>
            {/* {user?.direccion && (
              <div className="flex flex-col mt-3">
                <span className={`text-sm text-gray-400`}>Dirección de residencia</span>
              </div>
            )} */}
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
}
