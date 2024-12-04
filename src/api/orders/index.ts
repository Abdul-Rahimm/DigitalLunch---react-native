import { supabase } from "@/lib/supabase";
import { useAuth } from "@/providers/AuthProvider";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useFetchAdminOrderList = ({ archived = false }) => {
  const statuses = archived ? ["Delivered"] : ["New", "Cooking", "Delivering"]; //filtering orders based on their history type

  return useQuery({
    queryKey: ["orders", { archived }],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .in("status", statuses); //delviered will be arhived

      if (error) throw new Error(error.message);

      return data; //
    },
  });
};

export const useFetchMyOrderList = () => {
  const { session } = useAuth(); //to know which user has the current session dynamically
  const userId = session?.user.id;

  if (!userId) return null;

  return useQuery({
    queryKey: ["orders", { userId: userId }],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("user_id", userId);

      if (error) throw new Error(error.message);

      return data; //
    },
  });
};
