"use client";

// import { CultivoType, SemillasType } from "@/interfaces/Product";
import { useFilterStore } from "@/store/productStore";
import { useEffect, useRef } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/utils/accordion";
// import { SemillasType } from "@/interfaces/Product";
import { Checkbox } from "../ui/utils/checkbox";

interface Props {
  tipoSemillas?: { nombre: string }[];
  tipoCultivos?: { nombre: string }[];
  tipoKits?: { nombre: string }[];
  category?: string;
}

export const ProductsFilter = ({
  tipoSemillas,
  tipoCultivos,
  // tipoKits,
  category,
}: Props) => {

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
      className={`hidden md:block md:fixed md:w-48 overflow-auto transition-all duration-300`}
      style={{ top: "12rem" }} // Posición inicial
    >
      {category ? (
        <Accordion
          type="multiple"
          defaultValue={["item-1", "item-2", "item-3"]}
          className="w-full"
        >
          {category === "semillas" && (
            <AccordionItem
              value="item-1"
              autoFocus
            >
              <AccordionTrigger>Tipo Semillas</AccordionTrigger>
              <AccordionContent>
                {tipoSemillas?.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 mb-3"
                  >
                    <Checkbox
                      id={item.nombre}
                      checked={semillasSelect.includes(item.nombre)}
                      onCheckedChange={() => setSemillasFilter(item.nombre)}
                    />
                    <label
                      htmlFor={item.nombre}
                      className="text-sm capitalize font-medium text-gray-700 hover:cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {item.nombre}
                    </label>
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
          )}

          {category === "cultivo" && (
            <AccordionItem value="item-2">
              <AccordionTrigger>Cultivos</AccordionTrigger>
              <AccordionContent>
                {tipoCultivos?.map((item, index) => (
                  <div
                    key={`${item}-${index}`}
                    className="flex items-center space-x-2 mb-3"
                  >
                    <Checkbox
                      id={item.nombre}
                      checked={cultivosSelect.includes(item.nombre)}
                      onCheckedChange={() => setCultivosSelect(item.nombre)}
                    />
                    <label
                      htmlFor={item.nombre}
                      className="text-sm capitalize font-medium text-gray-700 hover:cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {item.nombre}
                    </label>
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
          )}

          {/* {category === "kits" && (
            <AccordionItem value="item-3">
              <AccordionTrigger>Kits</AccordionTrigger>
              <AccordionContent>
            {cultivos?.map((item, index) => (
              <div
                key={`${item}-${index}`}
                className="flex items-center space-x-2 mb-3"
              >
                <Checkbox
                  id={item.cultivo}
                  checked={cultivosSelect.includes(item.cultivo)}
                  onCheckedChange={() => setCultivosSelect(item.cultivo)}
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
          )} */}
        </Accordion>
      ) : (
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
              {tipoSemillas?.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 mb-3"
                >
                  <Checkbox
                    id={item.nombre}
                    checked={semillasSelect.includes(item.nombre)}
                    onCheckedChange={() => setSemillasFilter(item.nombre)}
                  />
                  <label
                    htmlFor={item.nombre}
                    className="text-sm capitalize font-medium text-gray-700 hover:cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {item.nombre}
                  </label>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger>Cultivos</AccordionTrigger>
            <AccordionContent>
              {tipoCultivos?.map((item, index) => (
                <div
                  key={`${item}-${index}`}
                  className="flex items-center space-x-2 mb-3"
                >
                  <Checkbox
                    id={item.nombre}
                    checked={cultivosSelect.includes(item.nombre)}
                    onCheckedChange={() => setCultivosSelect(item.nombre)}
                  />
                  <label
                    htmlFor={item.nombre}
                    className="text-sm capitalize font-medium text-gray-700 hover:cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {item.nombre}
                  </label>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>

          {/* <AccordionItem value="item-3">
            <AccordionTrigger>Kits</AccordionTrigger>
            <AccordionContent>
            {cultivos?.map((item, index) => (
              <div
                key={`${item}-${index}`}
                className="flex items-center space-x-2 mb-3"
              >
                <Checkbox
                  id={item.cultivo}
                  checked={cultivosSelect.includes(item.cultivo)}
                  onCheckedChange={() => setCultivosSelect(item.cultivo)}
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
          </AccordionItem> */}
        </Accordion>
      )}
    </div>
  );
};
