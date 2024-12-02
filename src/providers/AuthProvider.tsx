import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type AuthData = {
  session: Session | null;
  loading: boolean;
};

const AuthContext = createContext<AuthData>({
  session: null,
  loading: true,
});

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [session, setSesion] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchSessions = async () => {
      const { data, error } = await supabase.auth.getSession();
      setSesion(data.session);
      setLoading(false);
    };
    fetchSessions();
    supabase.auth.onAuthStateChange((_event, session) => {
        setSesion(session);
    });
  }, []);
  return (
    <AuthContext.Provider value={{ session, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export default AuthProvider;