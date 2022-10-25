import { graphql } from "./gql";

export const GET_PEOPLE = graphql(`
  query GetPeople {
    people {
      id
      firstName
      lastName
      cars {
        id
        year
        make
        model
        price
        personId
      }
    }
  }
`);

export const GET_CARS = graphql(`
  query GetCars {
    cars {
      id
      year
      make
      model
      price
      personId
    }
  }
`);

export const GET_PERSON_WITH_CARS = graphql(`
  query PersonWithCars($id: String!) {
    personWithCars(id: $id) {
      id
      firstName
      lastName
      cars {
        id
        year
        make
        model
        price
        personId
      }
    }
  }
`);

export const CREATE_PERSON = graphql(`
  mutation CreatePerson($id: String!, $firstName: String!, $lastName: String!) {
    createPerson(id: $id, firstName: $firstName, lastName: $lastName) {
      id
      firstName
      lastName
      cars {
        id
        year
        make
        model
        price
        personId
      }
    }
  }
`);

export const CREATE_CAR = graphql(`
  mutation CreateCar(
    $id: String!
    $year: Int!
    $make: String!
    $model: String!
    $price: Float!
    $personId: String!
  ) {
    createCar(
      id: $id
      year: $year
      make: $make
      model: $model
      price: $price
      personId: $personId
    ) {
      id
      year
      make
      model
      price
      personId
    }
  }
`);

export const UPDATE_PERSON = graphql(`
  mutation UpdatePerson($id: String!, $firstName: String!, $lastName: String!) {
    updatePerson(id: $id, firstName: $firstName, lastName: $lastName) {
      id
      firstName
      lastName
    }
  }
`);

export const UPDATE_CAR = graphql(`
  mutation UpdateCar(
    $id: String!
    $year: Int!
    $make: String!
    $model: String!
    $price: Float!
    $personId: String!
  ) {
    updateCar(
      id: $id
      year: $year
      make: $make
      model: $model
      price: $price
      personId: $personId
    ) {
      id
      year
      make
      model
      price
      personId
    }
  }
`);

export const DELETE_PERSON = graphql(`
  mutation DeletePerson($id: String!) {
    deletePerson(id: $id) {
      id
      firstName
      lastName
    }
  }
`);

export const DELETE_CAR = graphql(`
  mutation DeleteCar($id: String!) {
    deleteCar(id: $id) {
      id
      year
      make
      model
      price
      personId
    }
  }
`);
