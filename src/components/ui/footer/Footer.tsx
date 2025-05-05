import Link from "next/link";
import { FaFacebook, FaInstagram } from "react-icons/fa6";
import { Mail } from "./ui/Mail";

export const Footer = () => {
  return (
    <div className="bg-gradient-to-r from-purple-600 to-purple-500 pt-10 text-white">
      <Mail />
      <div className="flex flex-col w-full h-full pb-8 gap-5">
        <div className="flex px-10 justify-center items-center text-sm gap-5">
          <Link href="/">
            <span className={`antialiased font-bold `}>SaibaiSuru Grow </span>
            <span>| Tienda de cultivo</span>
            <span className="float-start sm:float-end sm:ml-1">
              {" "}
              © {new Date().getFullYear()}
            </span>
          </Link>

          <Link href="/">Térmios de Privacidad & legalidad</Link>

          {/* <Link href="/">Ubicaciones</Link> */}
        </div>
        <div className="flex px-10 justify-center items-center text-sm gap-5">
          <Link
            href="https://www.instagram.com/saibaisuru/"
            target="_blank"
          >
            <FaInstagram
              size={24}
              className="hover:scale-105 transition-all duration-300"
            />
          </Link>

          <Link
            href={`https://www.facebook.com/profile.php?id=61572911114486`}
            target="_blank"
          >
            <FaFacebook
              size={22}
              className="hover:scale-105 transition-all duration-300"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};
