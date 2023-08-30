import fastify, { FastifyReply, FastifyRequest } from "fastify";
import cors from '@fastify/cors'
import { appRoutes } from './routes'
import userRoutes from "./modules/user/user.route";
import { userSchemas } from "./modules/user/user.schema";
import fjwt, { JWT } from "fastify-jwt";

export const app = fastify();

declare module "fastify" {
    export interface FastifyInstance{
        authenticate:any
    }
}


app.register(cors)
app.register(appRoutes)

app.register(fjwt, {
    secret: "ndkandnan78duy9sau87dbndsa89u7dsy789adb",
  });

  app.decorate(
    "authenticate",
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        await request.jwtVerify();
      } catch (e) {
        return reply.send(e);
      }
    }
  );

for(const schema of userSchemas){
    app.addSchema(schema)
}
app.register(userRoutes, {prefix:"/users"})

//a

app.listen({
    port: 3333,
}).then(() => {
    console.log('HTTP Server Running!')
})

export default app;