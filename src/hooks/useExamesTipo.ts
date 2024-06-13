
  import { useQuery } from "@tanstack/react-query";
import { ExameTipo } from "../types/ExameTipo";

export const useExamesTipo = (id?: number) => {
  return useQuery<ExameTipo[]>({
    queryKey: ["exames"],
    queryFn: async () => {
      const response = await fetch("/exames").then((response) =>
        response.json()
      );

      if (response.error) {
        throw new Error(response.error);
      }

      return response;
    },
  });

};