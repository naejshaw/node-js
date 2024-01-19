export interface User {
    name: string
    email: string
}

const db = [
    {
        name: "Jean",
        email: "jeanjfra@gmail.com"
    }
]

export class UserService{
    db: User[]
    
    constructor(
        database = db
    ){
        this.db = database
    }

    createUser = (name: string, email: string) => {
        const user = {
            name,
            email
        }
        
        this.db.push(user)
        console.log('DB atualizado', this.db)
    }

    getAllUsers = () => {
        return this.db
    }
    
    deleteUser = (name: string) => {
        this.db = this.db.filter(user => user.name !== name)
    }

    getUser = (name: string) => this.db.find(user => user.name === name)
}