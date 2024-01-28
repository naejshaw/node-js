import { Request } from "express";
import { makeMockResponse } from "../__mocks__/mockResponse.mock"
import { UserService } from "../services/UserService"
import { UserController } from "./UserController"
import { makeMockRequest } from "../__mocks__/mockRequest.mock";

const mockUserService = {
    createUser: jest.fn(),
    getUser: jest.fn(),
}
jest.mock('../services/UserService', () => {
    return {
        UserService: jest.fn().mockImplementation(() => {
            return mockUserService
        })
    }
})

describe('UserController', () => {
    
    const userController = new UserController()
    const mockResponse = makeMockResponse()

    it('Deve adicionar um novo usuário', () => {
        const mockRequest = {
            body:{
                name: 'Guilherme',
                email: 'guiga.grgp@gmail.com',
                password: '12345'
            }
        } as Request
        userController.createUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(201)
        expect(mockResponse.state.json).toMatchObject({message: 'Usuário criado'})
    })

    it('Deve retornar erro se o name não for informado', () => {
        const mockRequest = {
            body:{
                name: '',
                email: 'guiga.grgp@gmail.com',
                password: '12345'
            }
        } as Request
        userController.createUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(400)
        expect(mockResponse.state.json).toMatchObject({message: 'Bad Request: Todos os campos são obrigatórios'})
    })

    it('Deve retornar erro se o email não for informado', () => {
        const mockRequest = {
            body:{
                name: 'Guilherme',
                email: '',
                password: '12345'
            }
        } as Request
        userController.createUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(400)
        expect(mockResponse.state.json).toMatchObject({message: 'Bad Request: Todos os campos são obrigatórios'})
    })

    it('Deve retornar erro se o password não for informado', () => {
        const mockRequest = {
            body:{
                name: 'Guilherme',
                email: 'guiga.grgp@gmail.com',
                password: ''
            }
        } as Request
        userController.createUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(400)
        expect(mockResponse.state.json).toMatchObject({message: 'Bad Request: Todos os campos são obrigatórios'})
    })

    it('Deve retornar o usuário com o userId informado', () => {
        const mockRequest = makeMockRequest({
            params: {
                userId: '123456'
            }
        })

        userController.getUser(mockRequest, mockResponse)
        expect(mockUserService.getUser).toHaveBeenCalledWith('123456')
        expect(mockResponse.state.status).toBe(200)
    })

    // it('Deve chamar a função getAllUsers', () => {
    //     const mockRequest = {} as Request
    //     const mockResponse = makeMockResponse()
    //     userController.getAllUsers(mockRequest, mockResponse)
    //     expect(mockUserService.getAllUsers).toHaveBeenCalled()
    //     expect(mockResponse.state.status).toBe(200)
    // })

    // it('Deve deletar um usuário', function () {
    //     const mockRequestCreate = {
    //         body: {
    //             name: 'Nath',
    //             email: 'nath@test.com'
    //         }
    //     } as Request
    //     const mockResponseCreate = makeMockResponse()
    //     userController.createUser(mockRequestCreate, mockResponseCreate)

    //     const mockRequest = {
    //         body: {
    //             name: 'Nath'
    //         }
    //     } as Request
    //     const mockResponse = makeMockResponse()
    //     userController.deleteUser(mockRequest, mockResponse)

    //     expect(mockResponse.state.status).toBe(200)
    //     expect(mockResponse.state.json).toMatchObject({ message: 'Usuário deletado' })
    // })
})