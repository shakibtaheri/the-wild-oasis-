import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export function useBookings() {
  const [searchParams] = useSearchParams();
  // 1) Filter
  const filterValue = searchParams.get("status") || "all";
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };

  // 2) Sort
  const sortBy = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortBy.split("-");
  const sortByRaw = { field, direction };

  const {
    data: bookings,
    error,
    isLoading,
  } = useQuery({
    // add second part to dependency array of useQuery to refetch data
    queryKey: ["bookings", filter, sortByRaw],
    queryFn: () => getBookings({ filter, sortBy: sortByRaw }),
  });
  return { bookings, error, isLoading };
}
