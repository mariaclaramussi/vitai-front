import { useQuery } from "@tanstack/react-query";
import { Pedido } from "../types/Pedido";
import axios from "axios";

const fetchSinglePedido = async (id: string): Promise<Pedido> => {
  const response = await axios
    .get(`/pedidos/${id}`)
    .then((response) => response);

  return response.data;
};

export const useSinglePedido = (id: string) => {
  return useQuery<Pedido>({
    queryKey: ["pedido", id],
    queryFn: () => fetchSinglePedido(id),
    enabled: !!id,
  });
};
