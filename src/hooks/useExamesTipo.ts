import { useQuery } from "@tanstack/react-query";
import { ExameTipo } from "../types/ExameTipo";
import axios from "axios";

const fetchExames = async (): Promise<ExameTipo[]> => {
  const response = await axios.get(`/exames`).then((response) => response);

  return response.data;
};

export const useExamesTipo = () => {
  return useQuery<ExameTipo[]>({
    queryKey: ["exames"],
    queryFn: fetchExames,
  });
};
