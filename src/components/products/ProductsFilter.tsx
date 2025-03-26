import { ValidTipoCultivo, ValidTiposSemillas } from "@/interfaces/Product";
import { useFilterStore } from "@/store/productStore";
import { useEffect, useRef } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/utils/accordion";
import { Checkbox } from "../ui/utils/checkbox";


interface Props {
  semillas?: { tipo: ValidTiposSemillas }[];
  cultivos?: { cultivo: ValidTipoCultivo }[];
}

export const ProductsFilter = ({ semillas, cultivos }: Props) => {
  
  const semillasSelect = useFilterStore().semillas;
  const setSemillasFilter = useFilterStore().setSemillaFilter;

  const cultivosSelect = useFilterStore().cultivos;
  const setCultivosSelect = useFilterStore().setCultivoFilter;

  const divRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const handleScroll = () => {
        if (divRef.current) {
          // Verifica si el scroll está por encima de 100px
          if (window.scrollY >= 120) {
            divRef.current.style.top = "4rem"; // Cambiar a top 0 si scrolleas más de 100px
          } else {
            divRef.current.style.top = "12rem"; // Cambiar a top 50px si estás por encima de 100px
          }
        }
      };

      // Añadir el event listener de scroll
      window.addEventListener("scroll", handleScroll);

      // Limpiar el event listener cuando se desmonte el componente
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);
  
  
  return (
    <div
      ref={divRef}
      className={`hidden md:z-10 md:block md:fixed md:w-48 overflow-auto transition-all duration-300`}
      style={{ top: "12rem" }} // Posición inicial
    >
      <Accordion
        type="multiple"
        defaultValue={["item-1", "item-2", "item-3"]}
        className="w-full"
      >
        <AccordionItem
          value="item-1"
          autoFocus
        >
          <AccordionTrigger>Tipo Semillas</AccordionTrigger>
          <AccordionContent>
            {semillas?.map((item, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 mb-3"
              >
                <Checkbox
                  id={item.tipo}
                  checked={semillasSelect.includes(item.tipo)}
                  onCheckedChange={() => setSemillasFilter(item.tipo)}
                />
                <label
                  htmlFor={item.tipo}
                  className="text-sm capitalize font-medium text-gray-700 hover:cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {item.tipo}
                </label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>

        {/* <AccordionItem value="item-2">
          <AccordionTrigger>Color</AccordionTrigger>
          <AccordionContent>
            {colores.map((item, index) => (
              <div
                key={`${item.color}-${index}`}
                className="flex items-center space-x-2 mb-3"
              >
                <Checkbox
                  id={item.color}
                  checked={coloresSelect.includes(item.color)}
                  onCheckedChange={() => setColoresFilter(item.color)}
                />
                <label
                  htmlFor={item.color}
                  className="text-sm capitalize font-medium text-gray-700 hover:cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {item.color}
                </label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem> */}

        <AccordionItem value="item-3">
          <AccordionTrigger>Cultivos</AccordionTrigger>
          <AccordionContent>
            {cultivos?.map((item, index) => (
              <div
                key={`${item}-${index}`}
                className="flex items-center space-x-2 mb-3"
              >
                <Checkbox
                  id={item.cultivo}
                  checked={cultivosSelect.includes(item)}
                  onCheckedChange={() => setCultivosSelect(item)}
                />
                <label
                  htmlFor={item.cultivo}
                  className="text-sm capitalize font-medium text-gray-700 hover:cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {item.cultivo}
                </label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
