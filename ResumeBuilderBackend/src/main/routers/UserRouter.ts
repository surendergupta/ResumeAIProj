import {Router} from 'express'
import { addSubscriptionEndpoint, addUserEndpoint, getLoggedInUser, loginUserEndpoint } from '../controllers/UserController.js'

export const userRouter:Router=Router()

userRouter.post('/addUser',addUserEndpoint);
userRouter.post('/login',loginUserEndpoint)
userRouter.get('/getLoggedIn',getLoggedInUser)
userRouter.post('/addSubscription',addSubscriptionEndpoint);
