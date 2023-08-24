import fastify from "fastify";
import cors from '@fastify/cors'
import { appRoutes } from './routes'
import userRoutes from "./modules/user/user.route";
import { userSchemas } from "./modules/user/user.schema";

const app = fastify()


app.register(cors)
app.register(appRoutes)

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