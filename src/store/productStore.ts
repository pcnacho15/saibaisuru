import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  semillas: any[];
  // colores: any[];
  cultivos: any[];

  // Methods
  setSemillaFilter: (marcasFilter: string) => void;

  // setColorFilter: (color: any) => void;

  setCultivoFilter: (estado: any) => void;
}

export const useFilterStore = create<State>()(
  persist(
    (set, get) => ({
      semillas: [],
      // colores: [],
      cultivos: [],

      // Methods
      setSemillaFilter: (semillaFilter: string) => {
        let { semillas } = get();

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

      setCultivoFilter: (estado: string) => {
        let { cultivos } = get();

        if (cultivos.includes(estado)) {
          set({
            cultivos: cultivos.filter((item) => item !== estado),
          });

          return;
        }

        set({
          cultivos: [...cultivos, estado],
        });
      },
    }),
    {
      name: "filter-products",
    }
  )
);
