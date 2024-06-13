import { glob } from "glob";
import path from "path";

export type TRoute = {
    path: string;
    method: string;
    handler: (e: string) => unknown;
};

export async function getRoutes() {
    const fileRouterPath = path.join(process.cwd(), "src/routes");
    const routeFiles = await glob("**/route.ts", { cwd: fileRouterPath });
    const routes: TRoute[] = [];
    const promises = routeFiles.map(async (filePath) => {
        const dirs = filePath.split(path.sep);
        dirs.pop();
        const exportedFunctions = await import(path.join(fileRouterPath, filePath));
        Object.keys(exportedFunctions).forEach((e) => {
            if (["GET", "POST", "PUT", "DELETE"].includes(e)) {
                routes.push({
                    path: "/" + dirs.join("/"),
                    method: e,
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
