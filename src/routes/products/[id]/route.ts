import { type FastifyRequest, type FastifyReply } from "fastify";

export function GET(req: FastifyRequest, res: FastifyReply) {
    const { id } = req.params as any;
    res.send({ message: `Product: ${id}` });
}

export function POST(req: FastifyRequest, res: FastifyReply) {
    const { id } = req.params as any;
    const data = req.body;
    res.send({ message: `Product ${id} added`, data });
}

export function PUT(req: FastifyRequest, res: FastifyReply) {
    const { id } = req.params as any;
    const data = req.body;
    res.send({ message: `Product ${id} updated`, data });
}

export function DELETE(req: FastifyRequest, res: FastifyReply) {
    const { id } = req.params as any;
    res.send({ message: `Product ${id} deleted` });
}
