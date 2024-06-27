import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ExameTipoItem } from "../types/SubExameTipo";

const fetchExameItemById = async (itemId: number): Promise<ExameTipoItem> => {
  const response = await axios
    .get(`/exame-items/${itemId}`)
    .then((response) => response);

  return response.data.exameTipoItem;
};

export const useExameItemTipo = (itemId?: number) => {
  return useQuery<ExameTipoItem>({
    queryKey: ["exame", itemId],
    queryFn: () => fetchExameItemById(Number(itemId)),
    enabled: Boolean(itemId),
  });
};
