import Image from "next/image";
import { LoginForm } from "@/components/admin/login-form";
export default function AdminLogin() {
  return (
    <main className="admin-login">
      <div>
        <Image
          src="/assets/brand/logo-light.svg"
          alt="Sawariyawala"
          width={280}
          height={70}
        />
        <p>Storefront operations</p>
      </div>
      <LoginForm />
    </main>
  );
}
