import { CultivoType, SemillasType } from "@/interfaces/Product";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  semillas: SemillasType[];
  // colores: any[];
  cultivos: CultivoType[];

  // Methods
  setSemillaFilter: (semillasFilter: SemillasType) => void;

  // setColorFilter: (color: any) => void;

  setCultivoFilter: (cultivoFilter: CultivoType) => void;
}

export const useFilterStore = create<State>()(
  persist(
    (set, get) => ({
      semillas: [],
      // colores: [],
      cultivos: [],

      // Methods
      setSemillaFilter: (semillaFilter: SemillasType) => {
        const { semillas } = get();

        if (semillas.includes(semillaFilter)) {
          set({
            semillas: semillas.filter((semilla) => semilla !== semillaFilter),
          });

          return;
        }

        set({
          semillas: [...semillas, semillaFilter],
        });
      },
      // setColorFilter: (color: string) => {
      //   let { colores } = get();

      //   if (colores.includes(color)) {
      //     set({
      //       colores: colores.filter((item) => item !== color),
      //     });

      //     return;
      //   }

      //   set({
      //     colores: [...colores, color],
      //   });
      // },

      setCultivoFilter: (cultivo: CultivoType) => {
        const { cultivos } = get();

        if (cultivos.includes(cultivo)) {
          set({
            cultivos: cultivos.filter((item) => item !== cultivo),
          });

          return;
        }

        set({
          cultivos: [...cultivos, cultivo],
        });
      },
    }),
    {
      name: "filter-products",
    }
  )
);
