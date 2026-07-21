import { NextRequest } from "next/server";
import { jwtVerify, SignJWT } from "jose";

const getSecret = () => {
  const secret = process.env.ADMIN_PASSWORD;

  if (!secret) {
    throw new Error("ADMIN_PASSWORD não está configurada.");
  }

  return new TextEncoder().encode(secret);
};

export async function verifyToken(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  try {
    await jwtVerify(token, getSecret());
    return true;
  } catch {
    return false;
  }
}

export async function isAuthenticated(req: NextRequest): Promise<boolean> {
  const session = req.cookies.get("admin_session")?.value;
  return verifyToken(session);
}

export async function createToken(): Promise<string> {
  return new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(getSecret());
}
