import { createSignal, Show, JSXElement } from "solid-js";
import X from "lucide-solid/icons/x";

type DialogProps = {
  title: string;
  content: JSXElement;
  onClose: () => void;
  class?: string;
};

const Dialog = (props: DialogProps) => {
  return (
    <div
      class={`fixed inset-0 flex items-center justify-center bg-black/50 ${props.class}`}
      role="dialog"
      aria-labelledby="dialog-title"
      aria-describedby="dialog-content"
    >
      <div class="bg-zinc-50 dark:bg-zinc-950 rounded-lg shadow-lg p-6 pt-5 md:w-96 w-80">
        <div class="flex justify-between items-center mb-4">
          <h2 id="dialog-title" class="text-xl font-medium">
            {props.title}
          </h2>
          <button
            onClick={props.onClose}
            class="text-lg font-bold leading-none cursor-pointer -mt-1"
            aria-label="Close dialog"
          >
            <X size={16} />
          </button>
        </div>
        <div id="dialog-content" class="mt-2">
          {props.content}
        </div>
      </div>
    </div>
  );
};

const [isDialogOpen, setIsDialogOpen] = createSignal(false);

const showDialog = () => setIsDialogOpen(true);
const hideDialog = () => setIsDialogOpen(false);

const DialogContainer = (props: DialogProps) => {
  return (
    <Show when={isDialogOpen()}>
      <Dialog
        title={props.title}
        content={props.content}
        onClose={props.onClose}
        class={props.class}
      />
    </Show>
  );
};

export { DialogContainer as Dialog, showDialog, hideDialog };
