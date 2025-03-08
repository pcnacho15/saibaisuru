import bcryptjs from "bcryptjs";

type ValidCategories = "semillas" | "esquejes" | "cultivo" | "otros";
type ValidTypes = "feminizada" | "automatica" | "regular";

interface SeedProduct {
  titulo: string;
  descripcion: string;
  notas: string;
  cantidad: number;
  precio: number;
  aroma: string;
  sabor: string;
  contenido: number;
  cosecha_aprox: string;
  tipo_semilla: ValidTypes;
  descuento?: number;
  slug: string;
  categoria: ValidCategories;
  imagenes: string[];
}

interface SeedUser {
  email: string;
  clave: string;
  rol: "admin" | "user";
}

interface SeedData {
  usuarios: SeedUser[];
  productos: SeedProduct[];
  categorias?: string[];
}

export const initialData: SeedData = {
  usuarios: [
    {
      email: "nacho@google.com",
      clave: bcryptjs.hashSync("123456"),
      rol: "admin",
    },
    {
      email: "tom@google.com",
      clave: bcryptjs.hashSync("123456"),
      rol: "user",
    },
  ],
  categorias: ["semillas", "esquejes", "cultivo"],
  productos: [
    {
      titulo: "calima",
      descripcion:
        "desarrolla una floración acelerada con cogollos sorprendentes, ideal para cultivos de cosecha temprana. Los pistilos y tricomas se apoderan de la flor adornada con enormes hojas de anchos foliolos, brindando un novedoso perfil químico para un balance perfecto de THC y CBD.",
      notas:
        "las flores secas de CALIMA son una interesante mezcla entre THC y CBD; con terpenos como el Mirceno, el bisabolol y el pineno, la hacen una perfecta variedad para mantener la concentración y el enfoque.",
      cantidad: 100,
      precio: 85000,
      aroma: "frutal",
      sabor: "Maderas finas con frutas acidas. (Mango biche-Fresno-Nogal)",
      contenido: 3,
      cosecha_aprox:
        "60 días 406g de flor seca por planta de 1m² y 1.5m de altura",
      tipo_semilla: "feminizada",
      // descuento: 0,
      slug: "semilla-calima-feminizada",
      categoria: "semillas",
      imagenes: ["calima-0.png", "calima-1.png", "calima-2.png"],
    },
    {
      titulo: "fresas y rosas",
      descripcion:
        "es una variedad verdaderamente única, que te envuelve en un mundo de colores y fragancias. Sus flores deslumbran por el brillo de sus tricomas y se encuentra entre su genética un fenotipo con flores moradas y pistilos fucsias. Su estructura hace que sea una planta fácil de cultivar con hojas delgadas que permiten el ingreso de la luz, esta variedad combina los aromas florales de las rosas y el cítrico de las fresas.",
      notas:
        "Despierta una sensación de éxtasis que embriaga los sentidos y libera la mente, con un alto contenido de THC y un perfil único de terpenos como el Terpinoleno, el Mirceno y el Ocimeno. Es una variedad perfecta para entablar conversaciones. Es estimulante; despierta la creatividad y la alegría.",
      cantidad: 100,
      precio: 85000,
      aroma: "frutal",
      sabor: "Ácido a fresas con tonos floral y frutal.",
      contenido: 3,
      cosecha_aprox: "60 días 312g flor seca por planta de 1m² y 2m de altura",
      tipo_semilla: "feminizada",
      // descuento: 0,
      slug: "semilla-fresas-rosas-feminizada",
      categoria: "semillas",
      imagenes: [
        "fresas-rosas-0.png",
        "fresas-rosas-1.png",
        "fresas-rosas-2.png",
      ],
    },
    {
      titulo: "salam",
      descripcion:
        "es una variedad que se caracteriza por su rápida floración y una abundante producción de tricomas, convirtiéndola en una potente fábrica de cannabinoides. Sus hojas de gran tamaño y sus anchos foliolos la hacen una hermosa variedad ideal para todo tipo de cultivo.",
      notas:
        "Las flores secas de Salam con alto contenido de THC, bisabolol, Mirceno y limoneno; hacen una poción mágica que otorga paz y tranquilidad, perfecta para combatir el estrés ya que invita a vivir un momento de relajación.",
      cantidad: 100,
      precio: 85000,
      aroma: "frutal",
      sabor: "Agridulce con mezcla floral",
      contenido: 3,
      cosecha_aprox:
        "60 días 340g de flor seca por planta de 1m² y 1.5m de altura",
      tipo_semilla: "feminizada",
      // descuento: 0,
      slug: "semilla-salam-feminizada",
      categoria: "semillas",
      imagenes: ["salam-0.png", "salam-1.png", "salam-2.png"],
    },
  ],
};
