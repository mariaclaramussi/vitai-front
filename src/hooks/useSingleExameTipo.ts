import { useQuery } from "@tanstack/react-query";
import { ExameTipo } from "../types/ExameTipo";
import axios from "axios";

const fetchExameById = async (exameTipoId: number): Promise<ExameTipo> => {
  const response = await axios
    .get(`/exames/${exameTipoId}`)
    .then((response) => response);

  return response.data.exameTipo;
};

export const useSingleExameTipo = (exameTipoId?: number) => {
  return useQuery<ExameTipo>({
    queryKey: ["exame", exameTipoId],
    queryFn: () => fetchExameById(Number(exameTipoId)),
    enabled: Boolean(exameTipoId),
  });
};
