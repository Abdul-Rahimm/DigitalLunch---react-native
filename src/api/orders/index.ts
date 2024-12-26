import { supabase } from "@/lib/supabase";
import { useAuth } from "@/providers/AuthProvider";
import { InsertTables, Order, UpdateTables } from "@/types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useFetchAdminOrderList = ({ archived = false }) => {
  const statuses = archived ? ["Delivered"] : ["New", "Cooking", "Delivering"]; //filtering orders based on their history type

  return useQuery({
    queryKey: ["orders", { archived }],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .in("status", statuses) //delviered will be arhived
        .order("created_at", { ascending: false });

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
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) throw new Error(error.message);

      return data; //
    },
  });
};

export const useOrderDetails = (id: number) => {
  return useQuery({
    queryKey: ["orders", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*, order_items(*, products(*))")
        .eq("id", id)
        .single();

      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
};

export const useInsertOrder = () => {
  const queryClient = useQueryClient();
  const { session } = useAuth();
  const userId = session?.user.id;

  return useMutation({
    async mutationFn(data: InsertTables<"orders">) {
      const { error, data: newProduct } = await supabase
        .from("orders")
        .insert({ ...data, user_id: userId })
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }
      return newProduct;
    },
    async onSuccess() {
      await queryClient.invalidateQueries(["orders"]);
    },
  });
};

export const useUpdateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn({
      id,
      updatedFields,
    }: {
      id: number;
      updatedFields: UpdateTables<"orders">;
    }) {
      const { error, data: updatedOrder } = await supabase
        .from("orders")
        .update(updatedFields)
        .eq("id", id)
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }
      return updatedOrder;
    },
    async onSuccess(_, { id }) {
      await queryClient.invalidateQueries(["orders"]);
      await queryClient.invalidateQueries(["orders", id]);
    },
  });
};
