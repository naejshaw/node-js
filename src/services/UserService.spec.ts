import { UserService } from "./UserService"
import * as jwt from 'jsonwebtoken'

jest.mock('../repositories/UserRepository')
jest.mock('../database', () => {
    initialize: jest.fn()
})
jest.mock('jsonwebtoken')
const mockUserRepository = require('../repositories/UserRepository')
describe('UserService', () => {
    const userService = new UserService(mockUserRepository)
    const mockUser = {
        user_id: '123214',
        name: 'Jean',
        email: 'jeanjfra@gmail.com',
        password: 'password'
    }
    it('Deve adicionar um novo usuário', async () => {
        mockUserRepository.createUser = jest.fn().mockImplementation(() => Promise.resolve(mockUser))
        const response = await userService.createUser('Jean', 'jeanjfra@gmail.com', 'password')
        expect(mockUserRepository.createUser).toHaveBeenCalled()
        expect(response).toMatchObject({
            user_id: '123214',
            name: 'Jean',
            email: 'jeanjfra@gmail.com',
            password: 'password'
        })
    })

    it('Devo retornar um token de usuário', async () => {
        jest.spyOn(userService, 'getAutenticatedUser').mockImplementation(() => Promise.resolve(mockUser))
        jest.spyOn(jwt, 'sign').mockImplementation(() => 'token')
        const token = await userService.getToken('jean@diobank.com', 'password')
        expect(token).toBe('token')
    })

    it('Deve retornar um erro, caso não encontre um usuário',async () => {
        jest.spyOn(userService, 'getAutenticatedUser').mockImplementation(() => Promise.resolve(null))
        await expect(userService.getToken('invalid@diobank.com', 'password')).rejects.toThrowError(new Error('Email/password invalid!'))
    })
})