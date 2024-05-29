import { FirestoreIdBaseModel } from "@/models";

export type ChatRole = "user" | "ai";
export type ChatModel = {
  userId: string;
  role: ChatRole;
  text: string;
  createdAt: Date;
};
export type ChatIdModel = FirestoreIdBaseModel<ChatModel>;
