import { Metadata } from "next";
import { notFound } from "next/navigation";

import { currencyFormat } from "@/utils";

import { AddToCart } from "./ui/AddToCart";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  CarruselProducts,
  MobileSlideShow,
  SlideShow,
  Title,
} from "@/components";
import { getProductBySlug, getProductsRelationByMarca } from "@/actions";
import { RiSeedlingLine } from "react-icons/ri";

type Params = Promise<{
  slug: string;
}>;

// interface Props {
//   params: {
//     slug: string;
//   };
// }

export async function generateMetadata(props: {
  params: Params;
}): Promise<Metadata> {
  // read route params
  const { slug } = await props.params;

  // fetch data
  const product = await getProductBySlug(slug);

  // optionally access and extend (rather than replace) parent metadata
  // const previousImages = (await parent).openGraph?.images || []

  return {
    title: product?.titulo ?? "Producto no encontrado",
    description: product?.descripcion ?? "",
    openGraph: {
      title: product?.titulo ?? "Producto no encontrado",
      description: product?.descripcion ?? "",
      // images: [], // https://misitioweb.com/products/image.png
      images: [`/products/${product?.images[0]}`],
    },
  };
}

export default async function ProductPage(props: { params: Params }) {
  const { slug } = await props.params;
  const product = await getProductBySlug(slug);
  const { products } = await getProductsRelationByMarca(
    // product!.marca,
    product!.id
  );

  if (!product) notFound();

  if (product.contenido === 0) product.contenido = null;
  if (product.descuento === 0) product.descuento = null;



  return (
    <>
      <div className="mt-10 mb-20 grid grid-cols-1 md:grid-cols-2 gap-8 lg:w-3/4 m-auto">
        <div className="col-span-1">
          {/* Slideshow Mobile */}
          <MobileSlideShow
            title={product.titulo}
            images={product.images.map((img) => img)}
            className="block md:hidden"
          />
          {/* Slideshow Desktop */}
          <SlideShow
            title={product.titulo}
            images={product.images.map((img) => img)}
            className="hidden md:block"
          />
        </div>
        {/* Detalles */}
        <div className="col-span-1 px-5 mt-0">
          {/* <StockLabel slug={product.slug} /> */}
          {/* <span className={`uppercase text-sm mb-2`}>{product.marca}</span> */}
          <h1 className={`antialiased text-xl capitalize font-semibold`}>
            {product.titulo}{" "}
            {/* <span className="capitalize text-base font-semibold">
              ({product.color})
            </span>{" "} */}
          </h1>
          {product.categoria.nombre === "semillas" && (
            <span className="capitalize text-base font-semibold text-gray-400 mt-1">
              {product.subCategoria.nombre}
            </span>
          )}
          {product.contenido && (
            <div className="flex items-center w-full justify-start gap-2 rounded h-6 lg:h-auto lg:mr-8 pr-1 mt-5">
              <span className="text-base text-neutral-700 font-semibold">
                Contenido:{" "}
              </span>
              <div className="flex items-center gap-1">
                <span className="text-base font-bold gap-1">
                  {product.contenido} semillas
                </span>
                <RiSeedlingLine
                  size={20}
                  className="text-principal"
                />
              </div>
            </div>
          )}
          <div className="flex flex-col my-5">
            <div className="flex items-center text-lg">
              <span className={`${!product.descuento && "mb-5"} font-bold`}>
                {currencyFormat(product.precio)}
              </span>
              {product.descuento && (
                <span className="text-xs bg-red-600 rounded text-white px-1 ml-1">
                  -{product.descuento}%
                </span>
              )}
            </div>
            {product.descuento && (
              <span className="text-gray-400 line-through text-sm">
                {currencyFormat(
                  (product.precio * product.descuento) / 100 + product.precio
                )}
              </span>
            )}
          </div>

          <AddToCart product={product} />

          {/* Detalles del producto */}
          <Accordion
            type="single"
            collapsible
            defaultValue="item-1"
            className="w-full"
          >
            <AccordionItem
              value="item-1"
              autoFocus
            >
              <AccordionTrigger className="text-base">
                Descripción
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-lg flex flex-col gap-2">
                  <span className="font-bold capitalize">{product.titulo}</span>{" "}
                  {/* {product.descripcion} */}
                  {product.descripcion.split('|').map((item, index) => (
                    <span
                      key={index}
                    >
                      {item}
                    </span>
                  ))}
                </p>
              </AccordionContent>
            </AccordionItem>

            {/* <AccordionItem value="item-2">
              <AccordionTrigger>Especificaciones</AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc">
                  {Object.keys(product.especificaciones).map((key) => (
                    <li key={key}>
                      <span className="capitalize font-semibold">{key}:</span>{" "}
                      {product.especificaciones[key]}
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem> */}
            {product.notas && (
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-base">
                  Efectos
                </AccordionTrigger>
                <AccordionContent className="text-lg flex flex-col gap-2">
                  {product.notas.split("|").map((item, index) => (
                      <span key={index}>{item}</span>
                  ))}
                </AccordionContent>
              </AccordionItem>
            )}
          </Accordion>

          {/* Detalles de envío */}

          {/* <div className="flex items-center gap-2 mt-5 grow">
            <div className="flex flex-col flex-1 py-2 items-center text-center text-purple-700 font-bold border-2 border-principal bg-principal bg-opacity-35 rounded-lg gap-1">
              <RiSeedlingLine size={30} />
              <p className="flex flex-col">
                <span className="font-semibold">Contenido</span>
                <span>{product.contenido} Semillas</span>
                <span className="capitalize">{product.tipo_semilla}</span>
              </p>
            </div>

            <div className="flex flex-col  py-2 items-center text-center border-2 border-principal bg-principal bg-opacity-35 rounded-lg gap-1">
              <LuFlower size={30} />
              <p className="flex flex-col">
                <span className="font-semibold">Sabor</span>
                <span>{product.sabor}</span>
                <span className="capitalize">{product.tipo_semilla}</span>
              </p>
            </div>

            <div className="flex flex-col py-2 items-center text-center border-2 border-principal bg-principal bg-opacity-35 rounded-lg gap-1">
              <RiSeedlingLine size={30} />
              <p className="flex flex-col">
                <span className="font-semibold">Contenido</span>
                <span>{product.contenido} Semillas</span>
                <span className="capitalize">{product.tipo_semilla}</span>
              </p>
            </div>
          </div> */}
        </div>
      </div>
      <div className="flex flex-col gap-8 justify-center px-10 md:px-5 m-auto">
        <Title
          title="Otrxs han comprado"
          className="lg:ml-16"
        />
        <CarruselProducts products={products} />
      </div>
    </>
  );
}
