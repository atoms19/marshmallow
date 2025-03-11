import { splitProps, For } from "solid-js";
import { JSX } from "solid-js";
import ChevronDown from "lucide-solid/icons/chevron-down";

type Option = {
  value: string;
  label: string;
};

type SelectProps = JSX.SelectHTMLAttributes<HTMLSelectElement> & {
  class?: string;
  options: Option[];
  onChange?: JSX.EventHandlerUnion<HTMLSelectElement, Event>;
};

const Select = (props: SelectProps) => {
  const [local, others] = splitProps(props, ["class", "options", "onChange"]);
  return (
    <div class={`relative ${local.class || ""}`}>
      <select
        class={`appearance-none rounded-lg border-1 border-transparent bg-zinc-100 px-4 py-2 text-base font-medium shadow-xs transition-colors outline-none focus:border-blue-500 dark:focus:border-blue-400 hover:border-blue-500 dark:bg-zinc-900 dark:hover:border-blue-400 w-full`}
        onChange={local.onChange}
        {...others}
      >
        <For each={local.options}>
          {(option) => <option value={option.value}>{option.label}</option>}
        </For>
      </select>
      <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <ChevronDown class="h-4 w-4" />
      </div>
    </div>
  );
};

export default Select;
