"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { contactSchema } from "@/lib/validators";
import { z } from "zod";
type FormData = z.infer<typeof contactSchema>;
export function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(contactSchema) });
  const submit = handleSubmit(async (data) => {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const body = await res.json();
    if (!res.ok) {
      toast.error(body.error);
      return;
    }
    toast.success("Message sent. We will be in touch.");
    reset();
  });
  return (
    <form className="paper-form" onSubmit={submit}>
      <span className="eyebrow">Send a message</span>
      <h2>
        We would love to
        <br />
        <em>hear from you.</em>
      </h2>
      <label>
        Full name
        <input {...register("name")} placeholder="Your name" />
        {errors.name && <small>{errors.name.message}</small>}
      </label>
      <div className="form-row">
        <label>
          Phone
          <input
            {...register("phone")}
            inputMode="numeric"
            placeholder="10-digit number"
          />
          {errors.phone && <small>{errors.phone.message}</small>}
        </label>
        <label>
          Email
          <input
            {...register("email")}
            type="email"
            placeholder="you@example.com"
          />
          {errors.email && <small>{errors.email.message}</small>}
        </label>
      </div>
      <label>
        Message
        <textarea
          {...register("message")}
          rows={5}
          placeholder="How can we help?"
        />
        {errors.message && <small>{errors.message.message}</small>}
      </label>
      <button className="button" disabled={isSubmitting}>
        {isSubmitting ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
