import { gql } from "apollo-server-core";
import { people, cars } from "./peopleCarsScheme";
import { find, findIndex } from "lodash";

export const typeDefs = gql`
  type Person {
    id: String!
    firstName: String!
    lastName: String!
    cars: [Car]
  }

  type Car {
    id: String!
    year: Int!
    make: String!
    model: String!
    price: Float!
    personId: String!
  }

  type Query {
    person(id: String!): Person
    people: [Person]
    cars: [Car]
    carById(id: String!): Car
    personWithCars(id: String!): Person
  }

  type Mutation {
    createPerson(id: String!, firstName: String!, lastName: String!): Person
    updatePerson(id: String!, firstName: String!, lastName: String!): Person
    deletePerson(id: String!): Person

    createCar(
      id: String!
      year: Int!
      make: String!
      model: String!
      price: Float!
      personId: String!
    ): Car
    updateCar(
      id: String!
      year: Int!
      make: String!
      model: String!
      price: Float!
      personId: String!
    ): Car
    deleteCar(id: String!): Car
  }
`;

export const resolvers = {
  Query: {
    person: (root, args) => find(people, { id: args.id }),
    people: () =>
      people.map((person) => {
        return {
          ...person,
          cars: cars.filter((car) => car.personId === person.id),
        };
      }),
    cars: () => cars,
    carById: (root, args) => find(cars, { id: args.id }),
    personWithCars: (root, args) => {
      const person = find(people, { id: args.id });

      if (!person) {
        throw new Error(`Couldn't find person with id ${args.id}`);
      }
      const personWithCars = cars.filter((car) => car.personId === person.id);
      return {
        id: person.id,
        firstName: person.firstName,
        lastName: person.lastName,
        cars: personWithCars,
      };
    },
  },
  Mutation: {
    createPerson: (root, args) => {
      const { firstName, lastName, id } = args;
      const newPerson = {
        id,
        firstName,
        lastName,
      };

      people.push(newPerson);
      return newPerson;
    },
    updatePerson: (root, args) => {
      const { id, firstName, lastName } = args;
      const person = find(people, { id });
      if (!person) {
        throw new Error(`Couldn't find person with id ${args.id}`);
      }

      person.firstName = firstName;
      person.lastName = lastName;
      return person;
    },
    deletePerson: (root, args) => {
      const { id } = args;
      const person = people.find((person) => person.id === id);
      if (!person) {
        throw new Error(`Couldn't find person with id ${args.id}`);
      }
      people.splice(findIndex(people, { id }), 1);

      while (cars.find((car) => car.personId === id)) {
        cars.splice(findIndex(cars, { personId: id }), 1);
      }

      return person;
    },
    createCar: (root, args) => {
      const { year, make, model, price, personId, id } = args;
      const newCar = {
        id,
        year,
        make,
        model,
        price,
        personId,
      };

      cars.push(newCar);
      return newCar;
    },
    updateCar: (root, args) => {
      const { id, year, make, model, price, personId } = args;
      const car = find(cars, { id });
      if (!car) {
        throw new Error(`Couldn't find car with id ${args.id}`);
      }

      car.year = year;
      car.make = make;
      car.model = model;
      car.price = price;
      car.personId = personId;
      return car;
    },
    deleteCar: (root, args) => {
      const { id } = args;
      const car = find(cars, { id });
      if (!car) {
        throw new Error(`Couldn't find car with id ${args.id}`);
      }

      cars.splice(findIndex(cars, { id }), 1);
      return car;
    },
  },
};
