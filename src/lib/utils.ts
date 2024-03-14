import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

//upgradation
export function absoluteUrl(path: string) {
  if (typeof window !== "undefined") return path; // client side

  //server or deployed on vercel
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}${path}`;

  //other case
  return `http://localhost:${process.env.PORT ?? 3000}${path}`;
}
