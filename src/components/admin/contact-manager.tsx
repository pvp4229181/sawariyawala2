"use client";
import { useEffect, useState } from "react";
type Message = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: string;
  createdAt: string;
};
export function ContactManager() {
  const [items, setItems] = useState<Message[]>([]);
  useEffect(() => {
    fetch("/api/admin/contacts")
      .then((r) => r.json())
      .then(setItems);
  }, []);
  return (
    <div className="message-grid">
      {items.map((item) => (
        <article key={item._id}>
          <span>{item.status}</span>
          <h3>{item.name}</h3>
          <a href={`mailto:${item.email}`}>{item.email}</a>
          <a href={`tel:${item.phone}`}>{item.phone}</a>
          <p>{item.message}</p>
          <small>{new Date(item.createdAt).toLocaleString("en-IN")}</small>
        </article>
      ))}
    </div>
  );
}
