import { glob } from "glob";
import path from "path";
import { type FastifyRequest, type FastifyReply } from "fastify";

export type TRoute = {
    path: string;
    method: "get" | "post" | "put" | "delete";
    handler: (req: FastifyRequest, res: FastifyReply) => unknown;
};

export async function getRoutes() {
    const fileRouterPath = path.resolve(__dirname, "..", "routes");
    const routeFiles = await glob(["**/route.ts", "**/route.js"], { cwd: fileRouterPath });
    const routes: TRoute[] = [];
    const promises = routeFiles.map(async (filePath) => {
        const dirs = filePath.split(path.sep).map((e) => (e.startsWith("[") && e.endsWith("]") ? ":" + e.slice(1, e.length - 1) : e));
        dirs.pop();
        const exportedFunctions = await import(path.join(fileRouterPath, filePath));
        Object.keys(exportedFunctions).forEach((e) => {
            const method = e.toLowerCase();
            if (method === "get" || method === "post" || method === "put" || method === "delete") {
                routes.push({
                    path: "/" + dirs.join("/"),
                    method: method,
                    handler: exportedFunctions[e],
                });
            } else {
                throw new Error("You need to export a http method from " + path.join(fileRouterPath, filePath));
            }
        });
    });
    await Promise.all(promises);
    return routes;
}
