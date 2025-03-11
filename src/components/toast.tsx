import { createSignal, For } from "solid-js";
import X from "lucide-solid/icons/x";

type Toast = {
  id: string;
  message: string;
  type: "success" | "error" | "info" | "default";
  duration: number;
};

const [toasts, setToasts] = createSignal<Toast[]>([]);

const addToast = (
  message: string,
  type: "success" | "error" | "info" | "default" = "default",
  duration: number,
) => {
  const id = crypto.randomUUID();
  setToasts((prevToasts) => {
    const newToasts = [...prevToasts, { id, message, type, duration }];
    if (newToasts.length > 3) {
      newToasts.shift();
    }
    return newToasts;
  });
  setTimeout(() => removeToast(id), duration);
};

const removeToast = (id: string) => {
  setToasts(toasts().filter((toast) => toast.id !== id));
};

const Toaster = () => {
  return (
    <div class="fixed bottom-4 right-4 space-y-2">
      <For each={toasts()}>
        {(toast) => (
          <div
            class={`rounded-lg px-4 py-2 shadow-lg transition-opacity ${
              toast.type === "default"
                ? "bg-zinc-100 text-zinc-800 dark:bg-zinc-900 dark:text-zinc-200"
                : toast.type === "success"
                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                  : toast.type === "error"
                    ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                    : toast.type === "info" &&
                      "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
            }`}
          >
            <div class="flex items-center justify-between">
              <span>{toast.message}</span>
              <button
                class="ml-1 -mr-1.5 text-lg font-bold leading-none cursor-pointer"
                onClick={() => removeToast(toast.id)}
              >
                <X size={16} class="mt-0.5" />
              </button>
            </div>
          </div>
        )}
      </For>
    </div>
  );
};

const toast = (
  message: string,
  type: "success" | "error" | "info" | "default" = "default",
  duration: number = 3000,
) => {
  addToast(message, type, duration);
};

export { Toaster, toast };
