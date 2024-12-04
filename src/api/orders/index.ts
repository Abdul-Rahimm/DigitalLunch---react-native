import { supabase } from "@/lib/supabase";
import { useAuth } from "@/providers/AuthProvider";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useFetchAdminOrderList = () => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const { data, error } = await supabase.from("orders").select("*");

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
