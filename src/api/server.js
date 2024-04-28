import { serve } from "bun";

serve({
  "/api": () => {
    return { message: "Hello from Bun!" };
  },
});