import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import crypto from "crypto";

// Assert JWT_SECRET as string (throw if missing)
const JWT_SECRET = process.env.JWT_SECRET as string;
if (!JWT_SECRET) {
  throw new Error("Missing JWT_SECRET in environment.");
}

const COOKIE_NAME = process.env.ADMIN_COOKIE_NAME ?? "admin_token";
const COOKIE_MAX_AGE = Number(
  process.env.ADMIN_COOKIE_MAX_AGE ?? 60 * 60 * 24 * 7
); // seconds

/** Create a signed JWT for the admin (payload can be minimal) */
export function signAdminToken(payload: { email: string }) {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: `${Math.floor(COOKIE_MAX_AGE / 86400)}d`, // e.g. "7d"
  });
}

/** Verify token, throws if invalid */
export function verifyAdminToken(token: string): {
  email: string;
  iat: number;
  exp: number;
} {
  return jwt.verify(token, JWT_SECRET) as {
    email: string;
    iat: number;
    exp: number;
  };
}

/** Safe compare using a hash so timing attacks are mitigated */
function safeEqual(a: string, b: string) {
  const ah = crypto.createHash("sha256").update(a).digest();
  const bh = crypto.createHash("sha256").update(b).digest();
  return crypto.timingSafeEqual(ah, bh);
}

/** Check admin credentials */
export async function verifyAdminCredentials(
  email: string,
  password: string
): Promise<boolean> {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;

  if (!adminEmail) return false;
  if (email !== adminEmail) return false;

  if (adminPasswordHash) {
    return await bcrypt.compare(password, adminPasswordHash);
  } else if (adminPassword) {
    return safeEqual(password, adminPassword);
  }

  return false;
}

export { COOKIE_NAME, COOKIE_MAX_AGE };
