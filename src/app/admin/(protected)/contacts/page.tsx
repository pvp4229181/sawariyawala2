import { ContactManager } from "@/components/admin/contact-manager";
export default function Contacts() {
  return (
    <div className="admin-page">
      <span className="eyebrow">Customer care</span>
      <h1>Messages</h1>
      <p>Contact and catering enquiries sent through the website.</p>
      <ContactManager />
    </div>
  );
}
