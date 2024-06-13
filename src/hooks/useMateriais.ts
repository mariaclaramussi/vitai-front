import { useQuery } from "@tanstack/react-query";
import { Material } from "../types/ExameTipo";

export const useMateriais = (id?: number) => {
  return useQuery<Material[]>({
    queryKey: ["materiais"],
    queryFn: async () => {
      const response = await fetch("/materiais").then((response) =>
        response.json()
      );

      if (response.error) {
        throw new Error(response.error);
      }

      return response;
    },
  });
};
