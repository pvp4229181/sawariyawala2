"use client";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
type Data = {
  name: string;
  phone: string;
  email: string;
  eventDate: string;
  guests: string;
  occasion: string;
  message: string;
};
export function CateringForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<Data>();
  const submit = handleSubmit(async (data) => {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: data.name,
        phone: data.phone,
        email: data.email,
        message: `Catering enquiry | Date: ${data.eventDate} | Guests: ${data.guests} | Occasion: ${data.occasion}\n${data.message}`,
      }),
    });
    const body = await res.json();
    if (!res.ok) {
      toast.error(body.error);
      return;
    }
    toast.success("Catering enquiry sent.");
    reset();
  });
  return (
    <form className="paper-form" onSubmit={submit}>
      <span className="eyebrow">Plan your event</span>
      <h2>
        Start a <em>conversation.</em>
      </h2>
      <div className="form-row">
        <label>
          Full name
          <input required {...register("name")} />
        </label>
        <label>
          Phone
          <input required pattern="[6-9][0-9]{9}" {...register("phone")} />
        </label>
      </div>
      <label>
        Email
        <input required type="email" {...register("email")} />
      </label>
      <div className="form-row">
        <label>
          Event date
          <input required type="date" {...register("eventDate")} />
        </label>
        <label>
          Guest count
          <input required min="1" type="number" {...register("guests")} />
        </label>
      </div>
      <label>
        Occasion
        <input
          required
          {...register("occasion")}
          placeholder="Birthday, office event, wedding..."
        />
      </label>
      <label>
        Anything else?
        <textarea {...register("message")} rows={4} />
      </label>
      <button className="button" disabled={isSubmitting}>
        {isSubmitting ? "Sending..." : "Request a Call Back"}
      </button>
    </form>
  );
}
