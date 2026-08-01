import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import { toast } from "react-hot-toast";

export function useSignup() {
  const queryClient = useQueryClient();

  const { mutate: signup, isPending } = useMutation({
    mutationFn: signupApi,
    onSuccess: (userData) => {
      console.log(userData);
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success(
        "Account successfully created! Please verify the new account from the user's email address.",
      );
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { signup, isPending };
}
