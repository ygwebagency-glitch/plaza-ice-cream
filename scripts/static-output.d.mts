import type { Plugin } from "vite";
export function prepareStatic(root?: string): Promise<void>;
export function staticOutputPlugin(): Plugin;