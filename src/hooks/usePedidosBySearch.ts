import { useQuery } from "@tanstack/react-query";
import { Pedido } from "../types/Pedido";
import axios from "axios";

const fetchAllPedidos = async (id: string | undefined): Promise<Pedido[]> => {
  const response = await axios
    .get(`/pedidos/paciente/${id}`)
    .then((response) => response);
  return response.data;
};

export const usePedidosBySearch = (id: string | undefined) => {
  return useQuery<Pedido[]>({
    queryKey: ["pedido-paciente", id],
    queryFn: () => fetchAllPedidos(id),
    enabled: Boolean(id),
  });
};
