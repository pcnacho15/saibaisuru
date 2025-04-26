import { FaTruckFast } from "react-icons/fa6";
import { RiSecurePaymentFill, RiVerifiedBadgeFill } from "react-icons/ri";
import { GiConversation } from "react-icons/gi";

const benefits = [
  { icon: <FaTruckFast size={40} />, title: "Envíos rápidos y discretos" },
  { icon: <RiVerifiedBadgeFill size={40} />, title: "Semillas certificadas" },
  { icon: <GiConversation size={40} />, title: "Asesoría gratuita" },
  { icon: <RiSecurePaymentFill size={40} />, title: "Pagos seguros y múltiples medios" },
];

export const Benefits = () => {
  return (
    <section className="fade-in py-8 text-center">
      <div className="flex flex-wrap justify-center gap-6">
        {benefits.map((item, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center w-full md:w-64 p-4 rounded-lg bg-white shadow-md"
          >
            <div className="text-purple-600">{item.icon}</div>
            <h3 className="mt-2 font-semibold">{item.title}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}
