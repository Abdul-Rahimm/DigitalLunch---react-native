import { supabase } from "@/lib/supabase";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

//invalidating the query automatically updates the UI
export const useInsertOrderSubscription = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const ordersSubscription = supabase
      .channel("custom-insert-channel")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "orders" },
        (payload) => {
          queryClient.invalidateQueries(["orders"]);
        }
      )
      .subscribe();

    return () => {
      ordersSubscription.unsubscribe(); //to make sure we dont leak memory
    };
  }, []);
};

export const useUpdateOrderSubscription = (id: number) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const orders = supabase
      .channel("custom-filter-channel")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "orders",
          filter: `id=eq.${id}`,
        },
        (payload) => {
          queryClient.invalidateQueries(["orders", id]);
        }
      )
      .subscribe();

    return () => {
      orders.unsubscribe(); //to make sure we dont leak memory
    };
  }, []);
};
