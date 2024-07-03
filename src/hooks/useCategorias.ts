import { useQuery } from "@tanstack/react-query";
import { CategoriaExame } from "../types/CategoriaExame";
import axios from "axios";

const fetchAllCategorias = async (): Promise<CategoriaExame[]> => {
  return axios.get(`/categorias-de-exame`).then((response) => response.data);
};

export const useCategorias = () => {
  return useQuery<CategoriaExame[]>({
    queryKey: ["categorias"],
    queryFn: () => fetchAllCategorias(),
  });
};
