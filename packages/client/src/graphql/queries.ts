import gql from "graphql-tag";

// base query

export const ALL_POKEMONS = gql`
  query Pokemons($name: String, $after: ID, $limit: Int) {
    pokemons(q: $name, after: $after, limit: $limit) {
      edges {
        node {
          id
          name
          types
          classification
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;

export const POKEMONS_BY_TYPE = gql`
  query PokemonsByType($type: String!, $after: ID, $limit: Int) {
    pokemonsByType(type: $type, after: $after, limit: $limit) {
      edges {
        node {
          id
          name
          types
          classification
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;
