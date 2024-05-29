import { Prettify } from "@/utils";
import { FC, PropsWithChildren } from "react";

/**
 * screen
 */
export type ScreenBaseModel<T = {}> = FC<Readonly<T>>;

/**
 * component
 */
export type ComponentBaseModel<T = {}> = Readonly<
  T & {
    style?: React.CSSProperties;
    className?: string;
  }
>;
export type ComponentWithChildBaseModel<T = {}> = PropsWithChildren<
  ComponentBaseModel<T>
>;

export type LayoutBaseModel = FC<{ children: React.ReactNode }>;

/**
 * global store
 */
export type ActionStoreBaseModel<TAction> = Readonly<
  TAction & {
    reset: () => void;
  }
>;

/**
 * client collection for firebase model
 */
export type FirestoreIdBaseModel<T> = Prettify<{ id: string } & T>;

/**
 * response from server
 */
type ResponseBaseModel<T> = {
  method: "GET" | "POST" | "PUT" | "DELETE";
  path: string;
  timestamp: Date;
  message: string[];
  data: T;
};
export type SuccessResponseBaseModel<T = null> = ResponseBaseModel<T>;
export type ErrorResponseBaseModel = ResponseBaseModel<null>;
