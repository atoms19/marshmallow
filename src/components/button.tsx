import { splitProps } from "solid-js";
import { JSX } from "solid-js";
import Spinner from "lucide-solid/icons/loader";

type ButtonProps = JSX.ButtonHTMLAttributes<HTMLButtonElement> & {
  class?: string;
  onClick?: JSX.EventHandlerUnion<HTMLButtonElement, MouseEvent>;
  loading?: boolean;
};

const Button = (props: ButtonProps) => {
  const [local, others] = splitProps(props, [
    "children",
    "class",
    "onClick",
    "loading",
  ]);
  return (
    <button
      class={`${local.loading ? "hover:border-zinc-700" : "cursor-pointer hover:border-blue-400"} dark:bg-zinc-900 rounded-lg border-1 border-transparent bg-zinc-100 px-4 py-2 text-base font-medium shadow-xs transition-colors ${local.class || ""}`}
      onClick={local.onClick}
      disabled={local.loading}
      aria-busy={local.loading}
      aria-live="polite"
      {...others}
    >
      {local.loading ? (
        <Spinner class="animate-spin" aria-hidden="true" />
      ) : (
        local.children
      )}
    </button>
  );
};

export default Button;
