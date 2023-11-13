import { gql } from '@apollo/client';
const ADD_USER = gql`
mutation Mutation($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        email
        password
        username
        
      }
    }
  }
  `
  const LOGIN_USER = gql`
  mutation Mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        email
        bookCount
        _id
        savedBooks {
          authors
          bookId
          description
          image
          link
          title
        }
        username
      }
    }
  }
  `