import { RegisterForm } from "./ui/RegisterForm";

export default function RegisterPage() {
  return (
      <div className="w-full sm:w-1/3 px-14 py-16 rounded-2xl bg-white shadow-lg">
        <h1 className="font-bold text-2xl mb-5 text-center">
          Registrate
        </h1>
        <RegisterForm />
      </div>
    );
}