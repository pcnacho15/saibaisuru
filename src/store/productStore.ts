import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  semillas: string[];
  // colores: any[];
  cultivos: string[];

  // Methods
  setSemillaFilter: (semillasFilter: string) => void;

  // setKitFilter: (kitFilter: kit) => void;

  setCultivoFilter: (cultivoFilter: string) => void;
}

export const useFilterStore = create<State>()(
  persist(
    (set, get) => ({
      semillas: [],
      // colores: [],
      cultivos: [],

      // Methods
      setSemillaFilter: (semillaFilter: string) => {
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

      setCultivoFilter: (cultivo: string) => {
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
