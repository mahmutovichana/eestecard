import { SignJWT, jwtVerify } from 'jose';

const secretKey = new TextEncoder().encode(
  process.env.ADMIN_SECRET_KEY || 'dev-secret-key-change-this'
);

export async function sign(payload: Record<string, unknown>) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(secretKey);
}

export async function verify(token: string) {
  try {
    const verified = await jwtVerify(token, secretKey);
    return verified.payload;
  } catch {
    return null;
  }
}
