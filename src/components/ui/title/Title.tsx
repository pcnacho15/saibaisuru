interface Props {
  title: string;
  subtitle?: string;
  className?: string;
  icon?: React.ReactNode;
}

export const Title = ({ title, subtitle, className, icon }: Props) => {

  
  if (subtitle === "semillas") {
    subtitle =
      "Conoce toda nuestra variedad de semillas para que inicies tu propio autocultivo en casa";
  } else if (subtitle === "esquejes") {
    subtitle =
      "Conoce toda nuestra variedad de esquejes para que inicies tu propio autocultivo en casa";
  } else if (subtitle === "cultivo") {
    subtitle =
      "Conoce toda nuestra variedad de artículos más óptimos para tus cultivos";
  }

  return (
    <div className={`mt-3 ${className} text-center`}>
      <div className="flex sm:items-center justify-center sm:gap-3">
        <h1 className={`antialiased text-4xl font-semibold mt-7 mb-3`}>
          {title}
        </h1>
        <div className="hidden sm:block top-36 left-32 sm:relative sm:top-0 sm:left-0 sm:mt-6">
          {icon}
        </div>
      </div>
      {subtitle && <h3 className="text-xl mb-5">{subtitle}</h3>}
    </div>
  );
};
