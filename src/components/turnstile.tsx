import { createEffect, createSignal, onCleanup, onMount, Show } from "solid-js";

const TURNSTILE_URL = "https://challenges.cloudflare.com/turnstile/v0/api.js";

type TurnstileProps = {
  siteKey: string;
  onSuccess?: (response: string) => void;
  onError?: () => void;
  onExpire?: () => void;
  onTimeout?: () => void;
  theme?: "light" | "dark" | "auto";
  size?: "normal" | "compact";
  language?: string;
  retry?: "auto" | "never";
  retryInterval?: number;
};

const Turnstile = (props: TurnstileProps) => {
  const [turnstileState, setTurnstileState] = createSignal<
    "loading" | "loaded" | "error" | "none"
  >("none");
  const [widgetId, setWidgetId] = createSignal<string | null>(null);
  let ref: HTMLDivElement | undefined;

  const loadScript = () => {
    // @ts-expect-error
    if (window.turnstile) {
      setTurnstileState("loaded");
      return;
    }

    setTurnstileState("loading");

    const script = document.createElement("script");
    script.src = `${TURNSTILE_URL}?onload=onLoadTurnstileCallback&render=explicit`;
    script.async = true;
    script.defer = true;
    script.id = "cf-turnstile";

    // @ts-expect-error
    window.onLoadTurnstileCallback = () => {
      setTurnstileState("loaded");
      // @ts-expect-error
      delete window.onLoadTurnstileCallback;
    };

    script.onerror = () => setTurnstileState("error");

    document.head.appendChild(script);
  };

  onMount(() => {
    loadScript();
  });

  createEffect(() => {
    if (turnstileState() === "loaded" && ref) {
      // @ts-expect-error
      const id = window.turnstile.render(ref, {
        sitekey: props.siteKey,
        callback: props.onSuccess,
        "error-callback": props.onError,
        "expired-callback": props.onExpire,
        "timeout-callback": props.onTimeout,
        theme: props.theme || "auto",
        size: props.size || "normal",
        language: props.language || "auto",
        retry: props.retry || "never",
        "retry-interval": props.retryInterval || 6000,
      });

      setWidgetId(id);
    }
  });

  onCleanup(() => {
    if (widgetId()) {
      // @ts-expect-error
      window.turnstile.remove(widgetId()!);
    }
  });

  return (
    <Show when={turnstileState() === "loaded"}>
      <div ref={ref} />
    </Show>
  );
};

export default Turnstile;
