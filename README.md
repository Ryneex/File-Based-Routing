
# File-Based Routing

This repository demonstrates a file-based routing system similar to Next.js. It supports both static routes and dynamic routes with slugs, allowing for a clean and intuitive way to define your application's URL structure

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/file-based-routing.git
    cd file-based-routing
    ```

2. Install dependencies:
    ```bash
    npm install
    ```
    
3. Start the development server:
    ```bash
    npm run dev
    ```

## Production
To run the application in production mode:

1. Build the Application:
    ```bash
    npm run build
    ```

2. Start the Application:
    ```bash
    npm run start
    ```

This command starts your application in production mode. It serves the compiled files and listens for incoming requests.

## Folder Structure
The folder structure is designed to reflect the routing hierarchy of your application. Here's a sample structure:

```
routes/
├── route.ts
├── products/
│       ├── route.ts
│       └── [id]/
│           └── route.ts
```

- `/routes/route.ts` - The home page route (/).
- `/routes/products/route.ts` - The blog listing route (/products).
- `/routes/products/[id]/route.ts` - A dynamic route for individual products (/products/:id)
## Routing

### Routes without Slugs
Routes without slugs are defined by simply creating route.ts files in the routes directory. Each file corresponds to a specific route.

**Example**

- `/routes/route.ts` maps to (/)
- `/routes/about/route.ts` maps to (/about)
- `/routes/blog/route.ts` maps to (/blog)

### Routes with Slugs
Dynamic routes (routes with slugs) are defined by using square brackets in the filename. The part inside the brackets will be treated as a dynamic segment of the URL.

**Example**
- `/routes/products/[slug]/routes.ts` maps to (/products/:slug)
- `/routes/products/[slug]/details/route.ts` maps to (/products/:slug/details)
## Example

### Example without Slugs

`/routes/products/route.ts`

```ts
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
```

### Example with Slugs

`/routes/products/[id]/route.ts`

```ts
import { type FastifyRequest, type FastifyReply } from "fastify";

export function GET(req: FastifyRequest, res: FastifyReply) {
    const { id } = req.params;
    res.send({ message: `Product: ${id}` });
}

export function POST(req: FastifyRequest, res: FastifyReply) {
    const { id } = req.params;
    const data = req.body;
    res.send({ message: `Product ${id} added`, data });
}

export function PUT(req: FastifyRequest, res: FastifyReply) {
    const { id } = req.params;
    const data = req.body;
    res.send({ message: `Product ${id} updated`, data });
}

export function DELETE(req: FastifyRequest, res: FastifyReply) {
    const { id } = req.params;
    res.send({ message: `Product ${id} deleted` });
}

```
## Note

I chose Fastify over Express simply because I prefer Fastify. However, if you want to use Express instead, you'll need to make the following adjustments:

- change the import statement

    ```ts
    import express from "express";
    const app = express();
    ```

- Follow Express conventions when writing your `route.ts` files.