import { app } from "./app.js";

app.listen({ port: 3000 }).catch((err: unknown) => {
  app.log.error(err);
  process.exit(1);
});

console.log(app.printRoutes());
