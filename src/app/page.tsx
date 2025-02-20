import { geistMono, firstFont } from "@/config/fonts";

export default function Home() {
  return (
    <>
      <div className="flex flex-col gap-5 items-center justify-center h-screen">
        <span>Hola Mundo Primera Fuente</span>
        <span className={`${geistMono.className}`}>
          Hola Mundo Segunda Fuente
        </span>
        <span className={`${firstFont.className}`}>
          Hola Mundo Tercera Fuente
        </span>
      </div>
    </>
  );
}
