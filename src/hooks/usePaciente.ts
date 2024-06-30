import { useQuery } from "@tanstack/react-query";
import { Paciente } from "../types/Pedido";
import axios from "axios";

const fetchAllPacientes = async (): Promise<Paciente[]> => {
  const response = await axios.get(`/pacientes`).then((response) => response);

  return response.data;
};

export const useAllPacientes = () => {
  return useQuery<Paciente[]>({
    queryKey: ["paciente"],
    queryFn: () => fetchAllPacientes(),
  });
};
