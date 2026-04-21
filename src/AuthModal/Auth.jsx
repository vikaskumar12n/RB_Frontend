import React, { useState, useEffect, useRef } from "react";
import { loginUser, registerUser } from "../api/Api";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";

const registerSchema = z
  .object({
    fullname: z.string().min(3, "Name must be at least 3 characters").max(50),
    email: z.string().email("Please enter a valid email"),
    password: z.string().min(6, "Password must be at least 6 characters").max(50),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function AuthModal({ isOpen, initialTab = "login", onClose, onSuccess }) {
  const [tab, setTab] = useState(initialTab);
  const overlayRef = useRef(null);

  useEffect(() => { setTab(initialTab); }, [initialTab]);

  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    if (isOpen) document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
      style={{ zIndex: 99999, background: "rgba(0,0,0,0.45)", backdropFilter: "blur(6px)" }}
      className="fixed inset-0 flex items-center justify-center px-4 py-8"
    >
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">

        {/* Close */}
        <button onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition z-10"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Logo + brand */}
        <div className="flex flex-col items-center pt-8 pb-2">
          <div className="h-12 w-12 bg-blue-900 rounded-full flex items-center justify-center mb-3">
            <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex px-8 gap-6 border-b border-gray-100">
          <button
            onClick={() => setTab("login")}
            className={`pb-3 text-sm font-semibold transition-all ${
              tab === "login"
                ? "text-blue-900 border-b-2 border-blue-900"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setTab("register")}
            className={`pb-3 text-sm font-semibold transition-all ${
              tab === "register"
                ? "text-blue-900 border-b-2 border-blue-900"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Form */}
        <div className="px-8 py-6">
          {tab === "login" ? (
            <LoginForm onSuccess={onSuccess} switchToRegister={() => setTab("register")} />
          ) : (
            <RegisterForm onSuccess={() => setTab("login")} switchToLogin={() => setTab("login")} />
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Input class ── */
const inputClass = (hasError) =>
  `appearance-none block w-full px-3 py-2 border rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
    hasError ? "border-red-400 bg-red-50" : "border-gray-300 bg-white"
  }`;

/* ── Login Form ── */
function LoginForm({ onSuccess, switchToRegister }) {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: "" });
    setServerError("");
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
    if (!formData.password) newErrors.password = "Password is required";
    return newErrors;
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  const newErrors = validate();
  if (Object.keys(newErrors).length > 0) { 
    setErrors(newErrors); 
    return; 
  }

  try {
    setIsLoading(true);
    setServerError("");  

    const res = await loginUser(formData);
 
    localStorage.setItem("token", res.token);
    localStorage.setItem("user", JSON.stringify(res.user));
    window.dispatchEvent(new Event("userUpdated"));
 
    toast.success("Welcome back! Login successful.");
 
    setTimeout(() => {
      onSuccess();
    }, 800);

  } catch (error) { 
    const errorMessage = error.response?.data?.message || "Invalid email or password.";
    
    setServerError(errorMessage); 
    toast.error(errorMessage); // Login fail hone par toast dikhega

  } finally {
    setIsLoading(false);
  }
};

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="mb-1">
        <h2 className="text-xl font-extrabold text-gray-900">Welcome Back !</h2>
        <p className="mt-1 text-sm text-gray-500">Sign in to your account to continue</p>
      </div>

      {serverError && (
        <div className="flex items-center gap-2 px-3 py-2 bg-red-50 border border-red-200 rounded-lg text-xs text-red-600">
          <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          {serverError}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
        <input
          name="email" type="email" value={formData.email} onChange={handleChange}
          placeholder="Enter your email"
          className={inputClass(errors.email)}
        />
        {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
        <div className="relative">
          <input
            name="password" type={showPassword ? "text" : "password"}
            value={formData.password} onChange={handleChange}
            placeholder="Enter your password"
            className={inputClass(errors.password) + " pr-10"}
          />
          <button type="button" onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
          >
            <EyeIcon show={showPassword} />
          </button>
        </div>
        {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}
      </div>

      <button type="submit" disabled={isLoading}
        className="w-full flex justify-center items-center gap-2 py-2 px-4 text-sm font-medium rounded-lg text-white bg-blue-900 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition"
      >
        {isLoading ? (
          <>
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Signing in...
          </>
        ) : "Sign In"}
      </button>

      <p className="text-center text-sm text-gray-600">
        Don't have an account?{" "}
        <button type="button" onClick={switchToRegister}
          className="font-medium text-blue-600 hover:text-blue-500"
        >
          Sign up
        </button>
      </p>
    </form>
  );
}

/* ── Register Form ── */
function RegisterForm({ onSuccess, switchToLogin }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [serverError, setServerError] = useState("");

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
  });

const onSubmit = async (data) => {
  try {
    setServerError("");
    await registerUser(data);
    toast.success("Registration successful! Please sign in.");
    
      onSuccess();
    
  } catch (error) {
    // Ab ye server ka asli message ("User already exists ") pakad lega
    const errorMessage = error.response?.data?.message || error.message || "Something went wrong";
    
    setServerError(errorMessage); 
    toast.error(errorMessage);
    
    console.log("Asli Message:", errorMessage);
  }
};
  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      <div className="mb-1">
        <h2 className="text-xl font-extrabold text-gray-900">Create Account</h2>
        <p className="mt-1 text-sm text-gray-500">Join us to get started with your journey</p>
      </div>

      {serverError && (
        <div className="flex items-center gap-2 px-3 py-2 bg-red-50 border border-red-200 rounded-lg text-xs text-red-600">
          <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          {serverError}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
        <input {...register("fullname")} placeholder="Enter your full name"
          className={inputClass(errors.fullname)}
        />
        {errors.fullname && <p className="mt-1 text-xs text-red-500">{errors.fullname.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
        <input {...register("email")} type="email" placeholder="Enter your email"
          className={inputClass(errors.email)}
        />
        {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
        <div className="relative">
          <input {...register("password")} type={showPassword ? "text" : "password"}
            placeholder="Create a password"
            className={inputClass(errors.password) + " pr-10"}
          />
          <button type="button" onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
          >
            <EyeIcon show={showPassword} />
          </button>
        </div>
        {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
        <div className="relative">
          <input {...register("confirmPassword")} type={showConfirm ? "text" : "password"}
            placeholder="Confirm your password"
            className={inputClass(errors.confirmPassword) + " pr-10"}
          />
          <button type="button" onClick={() => setShowConfirm(!showConfirm)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
          >
            <EyeIcon show={showConfirm} />
          </button>
        </div>
        {errors.confirmPassword && <p className="mt-1 text-xs text-red-500">{errors.confirmPassword.message}</p>}
      </div>

      <button type="submit" disabled={isSubmitting}
        className="w-full flex justify-center items-center gap-2 py-2 px-4 text-sm font-medium rounded-lg text-white bg-blue-900 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition"
      >
        {isSubmitting ? (
          <>
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Creating account...
          </>
        ) : "Create Account"}
      </button>

      <p className="text-center text-sm text-gray-600">
        Already have an account?{" "}
        <button type="button" onClick={switchToLogin}
          className="font-medium text-blue-600 hover:text-blue-500"
        >
          Sign in
        </button>
      </p>
    </form>
  );
}

/* ── Eye Icon ── */
function EyeIcon({ show }) {
  return show ? (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
    </svg>
  ) : (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  );
}