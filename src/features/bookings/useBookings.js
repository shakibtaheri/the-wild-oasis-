import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useBookings() {
  const queryClient = useQueryClient();

  const [searchParams] = useSearchParams();

  // PAGINATION
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

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

  // Query
  const { data, error, isLoading } = useQuery({
    // add second part to dependency array of useQuery to refetch data
    queryKey: ["bookings", filter, sortByRaw, page],
    queryFn: () => getBookings({ filter, sortBy: sortByRaw, page }),
  });

  const bookings = data?.data ?? [];
  const count = data?.count ?? 0;

  //PRE-FETCHING
  const pageCount = Math.ceil(count / PAGE_SIZE);
  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortByRaw, page + 1],
      queryFn: () => getBookings({ filter, page: page + 1, sortBy: sortByRaw }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortByRaw, page - 1],
      queryFn: () => {
        getBookings({ filter, sortBy: sortByRaw, page: page - 1 });
      },
    });

  return { bookings, count, error, isLoading, page };
}
