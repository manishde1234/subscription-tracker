import { Router } from "express";
import authorize from "../middleware/auth.middleware.js";
import { getUser, getUsers } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.get('/', getUsers);

userRouter.get('/:id',authorize, getUser);

userRouter.post('/', (req, res) => res.send({title: ' Create new User'}));

userRouter.put('/:id', (req, res) => res.send({title: 'update User'}));

userRouter.delete('/', (req, res) => res.send({title: ' delete User'}));


export default userRouter;