export const methods = ["GET", "POST", "PUT", "DELETE"] as const;

export type Method = (typeof methods)[number];
