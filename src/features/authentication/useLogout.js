import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logouApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";

export default function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: logout, isPending } = useMutation({
    mutationFn: logouApi,
    onSuccess: () => {
      // remove user from react query cache
      queryClient.removeQueries({ queryKey: ["user"] });
      navigate("/login", { replace: true });
    },
    onError: (err) => {
      console.log(err);
    },
  });
  return { logout, isPending };
}
