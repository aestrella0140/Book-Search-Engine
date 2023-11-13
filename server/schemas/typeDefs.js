const typeDefs = `
type User {
    _id: ID
    username: String!
    email: String
    password: String
    bookCount: Int
    savedBooks: [Book]
}

type Book {
    bookId: ID
    authors: [String]!
    description: String
    title: String
    image: String
    link: String
}

input inputBook {
authors: [String]!
description: String!
title: String!
image: String!
link: String!
}

type Auth {
    token: ID!
    user: User
}

type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth

    savedBooks(input: inputBook): User
    removeBook(bookId: String!): User
}

type Query {
    me: User
}
`;

module.exports = typeDefs;