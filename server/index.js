const express = require("express")
const path = require("path")
require("dotenv").config({ path: path.resolve(__dirname, "../.env") })
const { graphqlHTTP } = require("express-graphql")
const schema = require("./schema/schema")
const connectDB = require("./config/db")
const port = process.env.PORT || 5000
const cors = require("cors")

const app = express()
app.use(cors())

// Connect to Database
connectDB()

app.use(
    "/graphql",
    graphqlHTTP({
        schema,
        graphiql: process.env.NODE_ENV === "development",
    })
)

app.listen(port, console.log(`Server is running on port ${port}`))
