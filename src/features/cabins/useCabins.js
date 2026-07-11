import { getCabins } from "../../services/apiCabins";
import { useQuery } from "@tanstack/react-query";

export function useCabins() {
  const {
    isLoading,
    data: cabins,
    error,
  } = useQuery({
    // each query should uniquely is identify
    queryKey: ["cabins"],
    queryFn: getCabins,
  });
  console.log(cabins);
  return { isLoading, cabins, error };
}
