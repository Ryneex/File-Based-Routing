import { type FastifyRequest, type FastifyReply } from "fastify";

export function GET(req: FastifyRequest, res: FastifyReply) {
    res.send({ message: "Products Page" });
}

export function POST(req: FastifyRequest, res: FastifyReply) {
    const data = req.body;
    res.send({ message: "Product added", data });
}

export function PUT(req: FastifyRequest, res: FastifyReply) {
    const data = req.body;
    res.send({ message: "Product updated", data });
}

export function DELETE(req: FastifyRequest, res: FastifyReply) {
    res.send({ message: "Product deleted" });
}
