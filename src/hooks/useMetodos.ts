import { useQuery } from "@tanstack/react-query";
import { Metodo } from "../types/ExameTipo";

export const useMetodos = (id?: number) => {
  return useQuery<Metodo[]>({
    queryKey: ["metodos"],
    queryFn: async () => {
      const response = await fetch("/metodos").then((response) =>
        response.json()
      );

      if (response.error) {
        throw new Error(response.error);
      }

      return response;
    },
  });
};
