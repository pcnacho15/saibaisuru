import Link from "next/link";
import { FaFacebook, FaInstagram } from "react-icons/fa6";
import { Mail } from "./ui/Mail";

export const Footer = () => {
  return (
    <div className="bg-gray-200 [background:radial-gradient(125%_125%_at_50%_10%,#f3f4f6_45%,#63e_100%)] pt-10 text-gray-700">
      <Mail />
      <div className="flex flex-col w-full pb-8 gap-5">
        <div className="flex flex-col justify-center items-center text-sm gap-3">
          <Link href="/">
            <span className={`antialiased font-bold `}>SaibaiSuru Grow </span>
            <span>| Tienda de cultivo</span>
            <span className=""> © {new Date().getFullYear()}</span>
          </Link>

          <Link
            className="hover:text-gray-900 transition-colors duration-150"
            href="/"
          >
            Términos de Privacidad & legalidad
          </Link>

          {/* <Link href="/">Ubicaciones</Link> */}
        </div>
        <div className="flex justify-center items-center text-sm gap-5">
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
