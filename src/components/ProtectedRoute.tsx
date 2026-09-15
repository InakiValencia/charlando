import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { localizePath } from "@/i18n/routes";
import { useLocale } from "@/i18n/useTranslation";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const locale = useLocale();
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to={localizePath("/auth", locale)} replace />;
  }

  return <>{children}</>;
}
