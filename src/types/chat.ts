import { ManualPortfolio } from "@/types/manual-portfolio";
import { Profile } from "@/types/profile";
import { RoboPortfolio } from "@/types/robo-portfolio";

export type Message = { role: "user" | "assistant"; content: string };

export type QueryContext = {
  profile?: Profile;
  roboPortfolio?: RoboPortfolio;
  manualPortfolio?: ManualPortfolio;
};
