import { type FastifyRequest, type FastifyReply } from "fastify";
import fs from "fs";

export function GET(req: FastifyRequest, res: FastifyReply) {
    res.type("html").send(fs.createReadStream(process.cwd() + "/src/html/index.html", "utf-8"));
}
