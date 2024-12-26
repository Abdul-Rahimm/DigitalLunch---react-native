import { supabase } from "@/lib/supabase";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

const queryClient = useQueryClient();

//invalidating the query automatically updates the UI
export const useInsertOrderSubscription = () => {
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
