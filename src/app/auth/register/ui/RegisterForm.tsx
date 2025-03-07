"use client";

import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";
import clsx from "clsx";
// import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { login, registerUser } from "@/actions";
import { IoInformationCircleOutline } from "react-icons/io5";

type FormInputs = {
  // name: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

export const RegisterForm = () => {
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormInputs>();

  const password = useRef({});
  password.current = watch("password", "");

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setErrorMessage("");
    const { email, password } = data;

    // server action
    const resp = await registerUser(email, password);

    if (!resp.ok) {
      setErrorMessage(resp.message);
      return;
    }

    await login(email.toLocaleLowerCase(), password);
    window.location.replace("/");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col"
    >
      <label htmlFor="email">Correo electrónico</label>
      <input
        className={clsx("px-5 py-2 border-2 bg-gray-200 rounded mb-5", {
          "border-red-500": errors.email,
        })}
        type="email"
        {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
      />

      <label htmlFor="password">Contraseña</label>
      <input
        className={clsx("px-5 py-2 border-2 bg-gray-200 rounded mb-5", {
          "border-red-500": errors.password,
        })}
        type="password"
        {...register("password", { required: true, minLength: 8 })}
      />

      <label htmlFor="password">Confirmar contraseña</label>
      <input
        className={clsx("px-5 py-2 border-2 bg-gray-200 rounded mb-5", {
          "border-red-500": errors.password,
        })}
        type="password"
        {...register("passwordConfirm", {
          validate: (value) =>
            value === password.current || "Las contraseñas no coinciden",
        })}
      />

      {errors.passwordConfirm && (
        <div
          className="flex h-8 items-center mb-2 space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          <>
            <IoInformationCircleOutline className="h-5 w-5 text-red-500" />
            <p className="text-base text-red-500">
              {errors.passwordConfirm.message}
            </p>
          </>
        </div>
      )}

      <span className="text-red-500">{errorMessage} </span>

      <button
        type="submit"
        className="btn-primary"
      >
        Crear cuenta
      </button>

      {/* divisor l ine */}
      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">O</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <div className="inline-flex items-center gap-2">
        <span>¿Ya estás registrado?</span>
        <Link
          href="/auth/login"
          className="text-blue-600 hover:text-blue-800"
        >
          Ingresar
        </Link>
      </div>
    </form>
  );
};
