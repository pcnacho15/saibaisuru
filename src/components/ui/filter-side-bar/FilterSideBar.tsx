"use client";

import clsx from "clsx";
import { IoCloseOutline } from "react-icons/io5";


import { useFilterStore } from "@/store/productStore";
import { useUiStore } from "@/store/uiStore";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../utils/accordion";
import { Checkbox } from "../utils/checkbox";
import { usePathname } from "next/navigation";

interface Props {
  tipoSemillas?: { nombre: string }[];
  tipoCultivos?: { nombre: string }[];
  tipoKits?: { nombre: string }[];
}

// const estados = ["nuevo", "exhibicion"];

export const FilterSidebar = ({ tipoSemillas, tipoCultivos }:Props) => {

  const category = usePathname().split("/")[2];
  console.log(category)

  const semillasSelect = useFilterStore().semillas;
  const setSemillasFilter = useFilterStore().setSemillaFilter;

  const cultivosSelect = useFilterStore().cultivos;
  const setCultivosSelect = useFilterStore().setCultivoFilter;


  const isFilterSideMenuOpen = useUiStore((state) => state.isFilterSideMenuOpen);
  const closeFilterMenu = useUiStore((state) => state.closeFilterSideMenu);

  return (
    <div>
      {/* Background black */}
      {isFilterSideMenuOpen && (
        <div className="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30" />
      )}

      {/* Blur */}
      {isFilterSideMenuOpen && (
        <div
          onClick={() => closeFilterMenu()}
          className="fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm"
        />
      )}

      {/* Sidemenu */}
      <div
        className={clsx(
          "fixed p-5 right-0 top-0 w-[350px] md:w-[500px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300 overflow-auto",
          {
            "translate-x-full": !isFilterSideMenuOpen,
          }
        )}
      >
        <div className="flex justify-between items-center">
          <span className={`text-2xl`}>Filtros</span>
          <IoCloseOutline
            size={40}
            className="cursor-pointer"
            onClick={() => closeFilterMenu()}
          />
        </div>
        {/* Separador */}
        <div className="w-full h-px bg-gray-200 my-5"></div>
        {/* Input de busquedad */}
        <div className=" w-full m-auto pr-5">
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
      </div>
    </div>
  );
};
