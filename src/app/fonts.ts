import { Roboto, Roboto_Mono } from "next/font/google";

export const roboto = Roboto({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
});
