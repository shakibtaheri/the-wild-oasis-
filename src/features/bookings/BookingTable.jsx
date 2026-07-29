import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty";

import { useBookings } from "./useBookings";
import Pagination from "../../ui/Pagination";

function BookingTable() {
  // // CLIENT SIDE FILTERING AND SORTING DATA
  // // THESE DATA FILTERING AND SORTING API SIDE

  // // 1) FILTER
  // const [searchParams] = useSearchParams();
  // const filterValue = searchParams.get("status") || "all";

  // let filteredBookings;

  // if (filterValue === "all") filteredBookings = bookings;
  // if (filterValue === "checked-out")
  //   filteredBookings = bookings.filter(
  //     (booking) => booking.status === "checked-out",
  //   );
  // if (filterValue === "checked-in")
  //   filteredBookings = bookings.filter(
  //     (booking) => booking.status === "checked-in",
  //   );
  // if (filterValue === "unconfirmed")
  //   filteredBookings = bookings.filter(
  //     (booking) => booking.status === "unconfirmed",
  //   );

  // // 2) SORT
  // const sortBy = searchParams.get("sortBy") || "startDate-asc";
  // const [field, direction] = sortBy.split("-");
  // const modifier = direction === "asc" ? 1 : -1;
  // const sortedBookings = filteredBookings.sort(
  //   (a, b) => (a[field] - b[field]) * modifier,
  // );

  const { bookings, count, page, isLoading } = useBookings();
  console.log(bookings);

  if (isLoading) return <Spinner />;
  if (!bookings.length) return <Empty resourceName="bookings" />;

  return (
    <Menus>
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          // data={sortedBookings}
          data={bookings}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />
        <Table.Footer>
          <Pagination count={count} currentPage={page} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default BookingTable;
