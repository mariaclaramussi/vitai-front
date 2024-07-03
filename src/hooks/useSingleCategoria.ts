import { useQuery } from "@tanstack/react-query";
import { CategoriaExame } from "../types/CategoriaExame";
import axios from "axios";

const fetchCategoria = async (id: number): Promise<CategoriaExame> => {
  const response = await axios
    .get(`/categorias-de-exame/${id}`)
    .then((response) => response);

  return response.data.categoria;
};

export const useSingleCategoria = (id?: number) => {
  return useQuery<CategoriaExame>({
    queryKey: ["categoria", id],
    queryFn: () => fetchCategoria(Number(id)),
    enabled: Boolean(id),
  });
};
