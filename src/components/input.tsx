import { splitProps } from "solid-js";
import { JSX } from "solid-js";

type InputProps = JSX.InputHTMLAttributes<HTMLInputElement> & {
  class?: string;
  onInput?: JSX.EventHandlerUnion<HTMLInputElement, InputEvent>;
};

const Input = (props: InputProps) => {
  const [local, others] = splitProps(props, ["class", "onInput"]);
  return (
    <input
      class={`rounded-lg border-1 border-transparent bg-zinc-100 px-4 py-2 text-base font-medium shadow-xs transition-colors outline-none focus:border-blue-500 dark:focus:border-blue-400 hover:border-blue-500 dark:bg-zinc-900 dark:hover:border-blue-400 ${local.class || ""}`}
      onInput={local.onInput}
      aria-invalid={others["aria-invalid"] || false}
      {...others}
    />
  );
};

export default Input;
