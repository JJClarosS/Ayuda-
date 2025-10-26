// src/utils/prisma-clean.ts
export const cleanPrismaData = <T extends Record<string, any>>(data: T): T => {
  return Object.fromEntries(
    Object.entries(data).filter(([_, value]) => value !== undefined)
  ) as T;
};