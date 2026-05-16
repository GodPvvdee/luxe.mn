"use client";
import { Toaster } from "sonner";
import { useTheme } from "next-themes";

export function ToastProvider() {
  const { resolvedTheme } = useTheme();
  return (
    <Toaster
      position="bottom-right"
      theme={resolvedTheme === "dark" ? "dark" : "light"}
      toastOptions={{
        className:
          "rounded-2xl border border-border bg-popover text-popover-foreground shadow-xl",
      }}
    />
  );
}
