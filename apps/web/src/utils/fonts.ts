import { Inter, Kanit } from "next/font/google";

export const inter = Inter({ subsets: ["latin"] });
export const kanit = Kanit({
  subsets: ["vietnamese"],
  style: ["normal", "italic"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
