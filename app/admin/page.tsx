import type { Metadata } from "next";
import { cookies } from "next/headers";
import LoginForm from "./_components/LoginForm";
import AdminPanel from "./_components/AdminPanel";
import { verifyToken } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Admin — Julia Pedrozo Tattoo",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");
  const isAuthenticated = await verifyToken(session?.value);

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  return <AdminPanel />;
}
