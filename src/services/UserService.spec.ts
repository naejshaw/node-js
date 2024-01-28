import { UserService } from "./UserService"

jest.mock('../repositories/UserRepository')
jest.mock('../database', () => {
    initialize: jest.fn()
})
const mockUserRepository = require('../repositories/UserRepository')
describe('UserService', () => {
    const userService = new UserService(mockUserRepository)
    it('Deve adicionar um novo usuário', async () => {
        mockUserRepository.createUser = jest.fn().mockImplementation(() => Promise.resolve({
            user_id: '123214',
            name: 'Jean',
            email: 'jeanjfra@gmail.com',
            password: 'password'
        }))
        const response = await userService.createUser('Jean', 'jeanjfra@gmail.com', 'password')
        expect(mockUserRepository.createUser).toHaveBeenCalled()
        expect(response).toMatchObject({
            user_id: '123214',
            name: 'Jean',
            email: 'jeanjfra@gmail.com',
            password: 'password'
        })
    })
})