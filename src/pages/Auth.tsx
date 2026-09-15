import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { Logo } from "@/components/Logo";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { motion } from "framer-motion";
import { alternatePathsFor, localizePath } from "@/i18n/routes";
import { useTranslation } from "@/i18n/useTranslation";
import { usePageSeo } from "@/lib/seo";

const Auth = () => {
  const { locale, t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const dashboardPath = localizePath("/dashboard/events", locale);
  const [loading, setLoading] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");

  useEffect(() => {
    if (user) navigate(dashboardPath, { replace: true });
  }, [user, navigate, dashboardPath]);

  usePageSeo({
    title: `${t.auth.login} | Charlando`,
    description: t.auth.tagline,
    canonicalPath: localizePath("/auth", locale),
    locale,
    alternatePaths: alternatePathsFor("/auth"),
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: loginEmail,
      password: loginPassword,
    });
    setLoading(false);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success(t.auth.welcome);
      navigate(dashboardPath);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: signupEmail,
      password: signupPassword,
      options: {
        data: { full_name: signupName },
        emailRedirectTo: window.location.origin,
      },
    });
    setLoading(false);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success(t.auth.created);
      navigate(dashboardPath);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Subtle decorative shapes like the landing page confetti */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[10%] left-[8%] w-16 h-16 rounded-full bg-primary/10 blur-sm" />
        <div className="absolute top-[20%] right-[12%] w-12 h-12 rounded-lg bg-primary/8 rotate-12 blur-sm" />
        <div className="absolute bottom-[15%] left-[15%] w-10 h-10 rounded-full bg-primary/10 blur-sm" />
        <div className="absolute bottom-[25%] right-[8%] w-14 h-14 rounded-lg bg-primary/6 -rotate-12 blur-sm" />
        <div className="absolute top-[50%] left-[5%] w-8 h-8 rounded-full bg-muted-foreground/5 blur-sm" />
        <div className="absolute top-[40%] right-[5%] w-20 h-20 rounded-full bg-primary/5 blur-md" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="absolute right-0 top-0">
            <LanguageSwitcher />
          </div>
          <Link to={localizePath("/", locale)} className="inline-block">
            <Logo size="lg" />
          </Link>
          <p className="text-muted-foreground mt-2 text-sm font-body">
            {t.auth.tagline}
          </p>
        </div>

        {/* Auth card */}
        <div className="bg-card rounded-2xl border border-border shadow-lg p-6">
          <Tabs defaultValue="login">
            <TabsList className="grid w-full grid-cols-2 rounded-full bg-muted p-1 mb-6">
              <TabsTrigger value="login" className="rounded-full data-[state=active]:bg-card data-[state=active]:shadow-sm text-sm font-medium">
                {t.auth.login}
              </TabsTrigger>
              <TabsTrigger value="signup" className="rounded-full data-[state=active]:bg-card data-[state=active]:shadow-sm text-sm font-medium">
                {t.auth.signup}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="mt-0">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="email-login" className="text-sm font-medium text-foreground">{t.auth.email}</Label>
                  <Input
                    id="email-login"
                    type="email"
                    placeholder="you@company.com"
                    required
                    value={loginEmail}
                    onChange={e => setLoginEmail(e.target.value)}
                    className="rounded-full h-11 px-4 border-input"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="password-login" className="text-sm font-medium text-foreground">{t.auth.password}</Label>
                  <Input
                    id="password-login"
                    type="password"
                    placeholder="••••••••"
                    required
                    value={loginPassword}
                    onChange={e => setLoginPassword(e.target.value)}
                    className="rounded-full h-11 px-4 border-input"
                  />
                </div>
                <Button type="submit" className="w-full rounded-full h-11 bg-foreground text-background hover:bg-foreground/90 font-medium" disabled={loading}>
                  {loading ? t.auth.signingIn : t.auth.signIn}
                </Button>
              </form>

              <div className="mt-5 relative">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
                <div className="relative flex justify-center text-xs uppercase"><span className="bg-card px-3 text-muted-foreground">{t.auth.or}</span></div>
              </div>

              <Button
                variant="outline"
                className="w-full mt-5 rounded-full h-11 border-input hover:bg-muted font-medium"
                onClick={async () => {
                  const { error } = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin });
                  if (error) toast.error(error.message || "Google sign-in failed");
                }}
              >
                <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
	                {t.auth.google}
              </Button>
            </TabsContent>

            <TabsContent value="signup" className="mt-0">
              <form onSubmit={handleSignup} className="space-y-4">
                <div className="space-y-1.5">
	                  <Label htmlFor="name-signup" className="text-sm font-medium text-foreground">{t.auth.fullName}</Label>
                  <Input
                    id="name-signup"
                    placeholder="Jane Doe"
                    required
                    value={signupName}
                    onChange={e => setSignupName(e.target.value)}
                    className="rounded-full h-11 px-4 border-input"
                  />
                </div>
                <div className="space-y-1.5">
	                  <Label htmlFor="email-signup" className="text-sm font-medium text-foreground">{t.auth.email}</Label>
                  <Input
                    id="email-signup"
                    type="email"
                    placeholder="you@company.com"
                    required
                    value={signupEmail}
                    onChange={e => setSignupEmail(e.target.value)}
                    className="rounded-full h-11 px-4 border-input"
                  />
                </div>
                <div className="space-y-1.5">
	                  <Label htmlFor="password-signup" className="text-sm font-medium text-foreground">{t.auth.password}</Label>
                  <Input
                    id="password-signup"
                    type="password"
                    placeholder="••••••••"
                    required
                    value={signupPassword}
                    onChange={e => setSignupPassword(e.target.value)}
                    className="rounded-full h-11 px-4 border-input"
                  />
                </div>
                <Button type="submit" className="w-full rounded-full h-11 bg-foreground text-background hover:bg-foreground/90 font-medium" disabled={loading}>
                  {loading ? t.auth.creatingAccount : t.auth.createAccount}
                </Button>
              </form>

              <div className="mt-5 relative">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
                <div className="relative flex justify-center text-xs uppercase"><span className="bg-card px-3 text-muted-foreground">{t.auth.or}</span></div>
              </div>

              <Button
                variant="outline"
                className="w-full mt-5 rounded-full h-11 border-input hover:bg-muted font-medium"
                onClick={async () => {
                  const { error } = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin });
                  if (error) toast.error(error.message || "Google sign-in failed");
                }}
              >
                <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
	                {t.auth.google}
              </Button>
            </TabsContent>
          </Tabs>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6">
	          {t.auth.terms}
        </p>
      </motion.div>
    </div>
  );
};

export default Auth;
