import { useQuery } from "@tanstack/react-query";
import { CategoriaExame } from "../types/CategoriaExame";

export const useCategorias = (id?: number) => {
  return useQuery<CategoriaExame[]>({
    queryKey: ["categorias"],
    queryFn: async () => {
      const response = await fetch("/categorias-de-exame").then((response) =>
        response.json()
      );

      if (response.error) {
        throw new Error(response.error);
      }

      return response;
    },
  });
};
