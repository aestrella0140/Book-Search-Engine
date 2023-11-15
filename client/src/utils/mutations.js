import { gql } from '@apollo/client';
export const ADD_USER = gql`
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
  export const LOGIN_USER = gql`
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

  const SAVE_BOOK = gql`
  mutation Mutation($input: inputBook) {
    savedBooks(input: $input) {
      savedBooks {
        authors
        bookId
        description
        image
        link
        title
      }
    }
  }
  `

  const REMOVE_BOOK = gql`
  mutation RemoveBook($bookId: String!) {
    removeBook(bookId: $bookId) {
      _id
      savedBooks {
        authors
        bookId
        description
        image
        link
        title
      }
    }
  }
  `