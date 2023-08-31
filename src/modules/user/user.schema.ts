import {z} from 'zod'
import { buildJsonSchemas } from 'fastify-zod';

const UserCore ={
  email:z.string({
    required_error: 'Email is required',
    invalid_type_error:'Email is not be a string'
  }).email(),
  username:z.string({
    required_error: 'Username is required',

  }),
  //dob:z.coerce.date(),
  name:z.string({}),
};

const createUserSchema = z.object({
  ...UserCore,
  password:z.string({
    required_error: 'Password is required',
    invalid_type_error:'Password is not be a string'
  })
});

const createUserResponseSchema = z.object({
  id: z.number(),
  role: z.string(),
 ...UserCore,

})
const deleteUserSchema = z.object({
  username:z.string({
    required_error: 'Username is required',

  }),
})
const loginSchema = z.object({
  username:z.string({
    required_error: 'Username is required',

  }),
  password: z.string(),
})

const loginResponseSchema = z.object({
  accessToken: z.string(),
})

export type CreateUserInput = z.infer <typeof createUserSchema>;

export type LoginInput = z.infer <typeof loginSchema>;
export type DeleteInput = z.infer <typeof deleteUserSchema>;

export const {schemas:userSchemas, $ref} = buildJsonSchemas({
  createUserSchema,
  createUserResponseSchema,
  loginSchema,
  loginResponseSchema,
  deleteUserSchema,
})