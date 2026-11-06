import { useState, useEffect } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  type Location,
} from "react-router-dom";
import { useFormik } from "formik";
import {
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowLeft,
  AlertCircle,
  LogIn,
  CheckCircle2,
} from "lucide-react";
import { useAuth } from "@/hooks";
import { loginSchema, type LoginFormValues } from "@/schemas";

interface LocationState {
  from?: Location;
}

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const { login, isLoggedIn } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  // Determine redirect destination (e.g. /checkout if guarded, otherwise /)
  const locationState = location.state as LocationState | undefined;
  const destination = locationState?.from?.pathname || "/";
  const wasGuarded = Boolean(locationState?.from);

  // If already logged in, redirect immediately away from /login
  useEffect(() => {
    if (isLoggedIn) {
      navigate(destination, { replace: true });
    }
  }, [isLoggedIn, navigate, destination]);

  // Formik integration using Yup loginSchema
  const { handleSubmit, getFieldProps, touched, errors, isSubmitting } =
    useFormik<LoginFormValues>({
      initialValues: {
        username: "",
        password: "",
      },
      validationSchema: loginSchema,
      onSubmit: async (values, { setSubmitting }) => {
        setSubmitting(true);
        // Simulate brief auth delay for realistic UX feedback
        await new Promise((resolve) => setTimeout(resolve, 300));
        login(values.username);
        setSubmitting(false);
        navigate(destination, { replace: true });
      },
    });

  return (
    <div className="min-h-[72vh] flex flex-col items-center justify-center px-4 animate-fade-in">
      <div className="w-full max-w-md space-y-6">
        {/* Guard notification banner if redirected from /checkout */}
        {wasGuarded && (
          <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 flex items-start gap-3 text-amber-800 dark:text-amber-300 text-xs sm:text-sm">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-amber-600 dark:text-amber-400" />
            <div>
              <p className="font-semibold">Sign in required</p>
              <p className="text-amber-700/90 dark:text-amber-300/80 text-xs mt-0.5">
                Please log in to proceed to checkout. You will be returned to
                your order immediately after logging in.
              </p>
            </div>
          </div>
        )}

        {/* Main Login Card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-600/10 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <LogIn className="w-7 h-7" />
            </div>
            <h1 className="font-heading font-black text-2xl text-slate-900 dark:text-white">
              Sign In to 10X Shop
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Enter any username and a password (min. 6 characters)
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            {/* Username Input */}
            <div className="space-y-1.5">
              <label
                htmlFor="username"
                className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider"
              >
                Username <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  id="username"
                  type="text"
                  placeholder="e.g. khatuna or admin"
                  autoComplete="username"
                  {...getFieldProps("username")}
                  className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl border text-sm transition-all outline-none bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 ${
                    touched.username && errors.username
                      ? "border-rose-400 dark:border-rose-600 focus:ring-2 focus:ring-rose-400/20"
                      : "border-slate-200 dark:border-slate-700 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                  }`}
                />
              </div>
              {touched.username && errors.username && (
                <p className="text-xs text-rose-500 font-medium flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.username}</span>
                </p>
              )}
            </div>

            {/* Password Input */}
            <div className="space-y-1.5">
              <label
                htmlFor="password"
                className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider"
              >
                Password <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="At least 6 characters"
                  autoComplete="current-password"
                  {...getFieldProps("password")}
                  className={`w-full pl-10 pr-10 py-2.5 rounded-xl border text-sm transition-all outline-none bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 ${
                    touched.password && errors.password
                      ? "border-rose-400 dark:border-rose-600 focus:ring-2 focus:ring-rose-400/20"
                      : "border-slate-200 dark:border-slate-700 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  tabIndex={-1}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {touched.password && errors.password && (
                <p className="text-xs text-rose-500 font-medium flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.password}</span>
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-2 inline-flex items-center justify-center gap-2 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Log In</span>
                </>
              )}
            </button>
          </form>

          {/* Back to Catalog Link */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-center">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-500 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span> Back to catalog</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
