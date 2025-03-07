// import { Title } from "@/modules";
import { auth } from "@/utils";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/");
  }

  return (
    <div>
      {/* <Title title="perfil" /> */}
      <pre>{JSON.stringify(session.user, null, 2)}</pre>

      <h3>{ session.user.rol }</h3>
    </div>
  );
}
