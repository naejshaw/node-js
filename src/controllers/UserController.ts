import {Request, Response} from 'express'
import { UserService } from '../services/UserService';

export class UserController {
    userService: UserService

    constructor(
        userService = new UserService()
    ){
        this.userService = userService
    }
    createUser = (request: Request, response: Response) => {
            const user = request.body

            if(!user.name || !user.email || !user.password){
                return response.status(400).json({message: 'Bad Request: Todos os campos são obrigatórios'})
            }

            this.userService.createUser(user.name, user.email, user.password)
            return response.status(201).json({message: 'Usuário criado'})
        
    }

    // getAllUsers = (request: Request, response: Response) => {
    //     const users = this.userService.getAllUsers()
    //     return response.status(200).json(users)
    // }
    
    getUser = (request: Request, response: Response) => {
        const { name } = request.params
        const user = this.userService.getUser(name)
        // if(!user){
        //     return response.status(404).json({ message: 'Usuário não encontrado'})
        // }
        return response.status(200).json( user )
    }

//     deleteUser = (request: Request, response: Response) => {
//         const {name} = request.body

//         this.userService.deleteUser(name)
//         return response.status(200).json({message: 'Usuário deletado'})
//     }
}