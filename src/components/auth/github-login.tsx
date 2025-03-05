import { Github } from "./github";


export const GitHubLogin = () => {
return (
  <form
  // action={async () => {
  //   "use server";
  //   await signIn("github");
  // }}
  >
    <button
      className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-md font-medium ring-offset-background border border-black py-2 my-4 hover:scale-105 duration-200 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-6 [&_svg]:shrink-0 w-full"
      //   variant="outline"
    >
      <Github />
      Ingresar con GitHub
    </button>
  </form>
);
}