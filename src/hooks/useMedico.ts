import { useQuery } from "@tanstack/react-query";
import { Medico, Paciente } from "../types/Pedido";
import axios from "axios";

const fetchAllMedicos = async (): Promise<Medico[]> => {
  const response = await axios.get(`/medicos`).then((response) => response);

  return response.data;
};

export const useAllMedicos = () => {
  return useQuery<Medico[]>({
    queryKey: ["medico"],
    queryFn: () => fetchAllMedicos(),
  });
};
