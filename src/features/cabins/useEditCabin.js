import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCreateCabin } from "./useCreateCabin";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useEditCabin() {
  const queryClient = useQueryClient();

  const { createCabin, isPending } = useCreateCabin();

  const { mutate: editCabin, isPending: isEditing } = useMutation({
    // only accept one argument (pas one element)
    mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
    onSuccess: () => {
      toast.success("Cabin successfully edited");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => toast.error(err.message),
  });
  return { editCabin, isEditing };
}
