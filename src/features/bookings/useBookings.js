import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export function useBookings() {
  const [searchParams] = useSearchParams();
  const filterValue = searchParams.get("status") || "all";
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };
  const {
    data: bookings,
    error,
    isLoading,
  } = useQuery({
    // add second part to dependency array of useQuery to refetch data
    queryKey: ["bookings", filter],
    queryFn: () => getBookings({ filter }),
  });
  return { bookings, error, isLoading };
}
