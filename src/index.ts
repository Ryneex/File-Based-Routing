import { getRoutes } from "./helpers/getRoutes";
import fastify from "fastify";
const app = fastify();

async function main() {
    const routes = await getRoutes();
    routes.forEach((e) => {
        app[e.method](e.path, e.handler);
    });
}

main().then(() => app.listen({ port: 3000, host: "0.0.0.0" }, () => console.log("Server is running on http://localhost:3000")));
