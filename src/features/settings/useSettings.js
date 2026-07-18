import { getSettings } from "../../services/apiSettings";
import { useQuery } from "@tanstack/react-query";

export function useSetting() {
  const {
    isLoading,
    error,
    data: settings,
  } = useQuery({ queryKey: ["settings"], queryFn: getSettings });
  console.log(settings);
  return { isLoading, error, settings };
}
