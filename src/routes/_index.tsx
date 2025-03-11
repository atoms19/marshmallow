import { createSignal } from "solid-js";
import { toast } from "../components/toast";
import Button from "../components/button";

const Index = () => {
  const [count, setCount] = createSignal(0);

  const incrementCount = () => {
    setCount(count() + 1);
    toast(`Count: ${count()}`, "success");
  };

  return (
    <div class="flex items-center justify-center h-screen flex-col">
      <h1 class="mb-4 text-3xl font-bold">Welcome to Marshmallow!</h1>
      <Button onClick={incrementCount}>Count?</Button>
    </div>
  );
};

export default Index;
