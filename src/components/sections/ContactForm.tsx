"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Loader } from "@/components/ui/Loader";

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

interface ContactFormProps {
  /**
   * Form submission handler
   */
  onSubmit: (data: ContactFormData) => Promise<void>;
}

type FormState = "idle" | "submitting" | "success" | "error";

/**
 * Contact form with validation using React Hook Form
 */
export function ContactForm({ onSubmit }: ContactFormProps) {
  const [formState, setFormState] = useState<FormState>("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>();

  const onFormSubmit = async (data: ContactFormData) => {
    setFormState("submitting");

    try {
      await onSubmit(data);
      setFormState("success");
      reset();

      // Reset success message after 5 seconds
      setTimeout(() => setFormState("idle"), 5000);
    } catch (error) {
      console.error("Form submission error:", error);
      setFormState("error");

      // Reset error message after 5 seconds
      setTimeout(() => setFormState("idle"), 5000);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onFormSubmit)}
      className="w-full max-w-2xl mx-auto space-y-6"
      noValidate
    >
      {/* Name field */}
      <Input
        label="Nome"
        type="text"
        {...register("name", {
          required: "Il nome è obbligatorio",
          minLength: {
            value: 2,
            message: "Il nome deve contenere almeno 2 caratteri",
          },
        })}
        error={errors.name?.message}
        disabled={formState === "submitting"}
        required
      />

      {/* Email field */}
      <Input
        label="Email"
        type="email"
        {...register("email", {
          required: "L&apos;email è obbligatoria",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Inserisci un&apos;email valida",
          },
        })}
        error={errors.email?.message}
        disabled={formState === "submitting"}
        required
      />

      {/* Message field */}
      <div className="relative w-full">
        <textarea
          {...register("message", {
            required: "Il messaggio è obbligatorio",
            minLength: {
              value: 10,
              message: "Il messaggio deve contenere almeno 10 caratteri",
            },
          })}
          className="peer w-full px-4 pt-6 pb-2 bg-bg-secondary border-2 border-border text-text-primary font-body transition-all duration-300 outline-none focus:border-accent min-h-[150px] resize-y"
          disabled={formState === "submitting"}
          required
        />
        <label className="absolute left-4 top-2 text-xs text-text-secondary transition-all duration-300 peer-focus:text-accent pointer-events-none">
          Messaggio
          <span className="text-accent ml-1">*</span>
        </label>
        {errors.message && (
          <p className="mt-1 text-xs text-red-500" role="alert">
            {errors.message.message}
          </p>
        )}
      </div>

      {/* Submit button */}
      <div className="flex items-center gap-4">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={formState === "submitting"}
          className="w-full md:w-auto"
        >
          {formState === "submitting" ? (
            <span className="flex items-center gap-2">
              <Loader size="sm" />
              Invio in corso...
            </span>
          ) : (
            "Invia Messaggio"
          )}
        </Button>

        {/* Success message */}
        {formState === "success" && (
          <p className="text-green-500 text-sm font-body">
            Messaggio inviato con successo!
          </p>
        )}

        {/* Error message */}
        {formState === "error" && (
          <p className="text-red-500 text-sm font-body">
            Errore durante l&apos;invio. Riprova.
          </p>
        )}
      </div>

      {/* Privacy notice */}
      <p className="text-text-secondary text-xs">
        Inviando questo modulo accetti la nostra{" "}
        <a
          href="/privacy"
          className="text-accent hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          privacy policy
        </a>
        .
      </p>
    </form>
  );
}
