import { FastifyReply, FastifyRequest } from "fastify";
import { createUser, findUserByUsername, findUsers } from "./user.service";
import { CreateUserInput, LoginInput } from "./user.schema";
import { verifyPassword } from "../../utils/hash";
import {app} from "../../server"

export async function registerUserHandler(
  request:FastifyRequest<{
    Body:CreateUserInput
  }>, 
  reply:FastifyReply) {

    const body = request.body;
    console.log(body);
    try{
      const user = await createUser(body)

      return reply.code(201).send(user)
    }catch(err){
      console.log(err);
      return reply.code(500).send(err)
    }
  
}

 export async function loginHandler(request:FastifyRequest<{
    Body:LoginInput   
 }>, 
    reply:FastifyReply
 ){
    const body = request.body

    //fin user by username 
    const user = await findUserByUsername(body.username) 
    if (!user){
      return reply.code(401).send({
        message: "Invalid username or password"
      })
    }
    //verify password

    const correctPassword = verifyPassword({
      candidatePassword: body.password,
      salt:user.salt,
      hash: user.password 
    })

    if(correctPassword){
      const {password,salt, ...rest}=user

      //generate access token
      return { accessToken: request.jwt.sign(rest) };
    }

    return reply.code(401).send({
      message: "Invalid username or password"
    })


    //respond
 }

 export async function getUsersHandler(){
  const users = await findUsers()

  return users;
 }