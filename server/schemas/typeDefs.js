const typeDefs = `
type User {
    _id: ID
    username: String
    email: String
    password: String
    bookCount: String
    savedBooks: [String]!
}

type Book {
    bookId: id
    authors: [String]!
    description: String
    title: String
    image: String
    link: String
}

type Auth {
    token: ID!
    user: User
}

type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth

    saveBook(authors: [String]!, description: String!, title: String!, image: String!, link: String!): User
    removeBook(bookId: String!): User
}

type Query {
    users: [User]!
    user(userId: ID!): User
    me: User
}
`;

module.exports = typeDefs;