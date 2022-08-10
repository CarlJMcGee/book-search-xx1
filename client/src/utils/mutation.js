import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation saveBook($input: bookData!) {
    saveBook(input: $input) {
      token bookData{
          authors
          description
          title
          bookId
      }
    }
  }
`;

export const REMOVE_BOOK = gql`
mutation removeBook($bookId: String!){
    removeBook (bookId: $bookId){
        username
        savedBook{

            authors
            title
            
        }
    }
}`;