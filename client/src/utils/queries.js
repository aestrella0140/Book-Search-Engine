import { gql } from '@apollo/client';
const GET_ME = gql`
query Me {
    me {
      _id
      email
      username
      savedBooks {
        title
        description
        authors
        bookId
        image
        link
      }
    }
  }
  `