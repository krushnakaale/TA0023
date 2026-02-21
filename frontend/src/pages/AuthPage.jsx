import { useState } from "react";
import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";
import ForgotPasswordForm from "../components/auth/ForgotPasswordForm";

export default function AuthPage() {
  const [form, setForm] = useState("login"); // "login" | "register" | "forgot"

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      {form === "login" && <LoginForm onSwitch={setForm} />}
      {form === "register" && <RegisterForm onSwitch={setForm} />}
      {form === "forgot" && <ForgotPasswordForm onSwitch={setForm} />}
    </div>
  );
}
