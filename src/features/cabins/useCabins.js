import { getCabins } from "../../services/apiCabins";
import { useQuery } from "@tanstack/react-query";

import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";

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
  return { isLoading, cabins, error };
}
