import {DataSource} from 'typeorm'

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "./src/database/db.sqlite",
    migrations: [
        "./src/database/migrations/*.ts"
    ],
})

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized")
    })
    .catch((err) => {
        console.log("Error during Data Source initialization", err)
    })