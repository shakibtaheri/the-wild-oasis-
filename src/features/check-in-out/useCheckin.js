import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: checkin, isLoading } = useMutation({
    mutationFn: ({ bookingId, breakfast }) =>
      updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
        ...breakfast,
      }),
    //   this actually recieve some data from function
    onSuccess: (data) => {
      toast.success(`booking #${data.id} successfully checked in`);
      //   active:true => invalidate all query currently active
      queryClient.invalidateQueries({ active: true });
      navigate("/bookings");
    },
    onError: () => toast.error("There was an error while checkin in"),
  });
  return { checkin, isLoading };
}
