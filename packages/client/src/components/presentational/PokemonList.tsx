import React from "react";
import { List, Button, Tooltip } from "antd";
import { PokemonNode, PokemonItem } from "../../typescript/interfaces";
import PokemonListItem from "./PokemonListItem";
import { useQuery } from "@apollo/react-hooks";
import { ALL_POKEMONS, POKEMONS_BY_TYPE } from "../../graphql/queries";

export default (props: {
  name: string;
  type: string;
  limit: number;
  pageQuantity: number;
  images: boolean;
}) => {
  const {
    loading,
    error,
    data: genericData,
    fetchMore: genericFetchMore,
  } = useQuery(ALL_POKEMONS, {
    variables: {
      name: props.name,
      limit: props.limit,
    },
    skip: !!props.type,
  });
  const {
    loading: loadingTypes,
    error: errorTypes,
    data: typeData,
    fetchMore: typeFetchMore,
  } = useQuery(POKEMONS_BY_TYPE, {
    variables: {
      type: props.type,
      limit: props.limit,
    },
    skip: !props.type,
    fetchPolicy: "no-cache",
  });
  if (error || errorTypes) {
    return <div>Sorry, something broke off. Reload the app to try again!</div>;
  }
  if (genericData) {
    return (
      <>
        {genericData && genericData.pokemons.edges.length === 0 ? (
          <div className="noPokemons">
            There are no pokemons matching your preferences! <br />
            Please try another configuration.
          </div>
        ) : (
          <List
            dataSource={genericData.pokemons.edges}
            loading={!!loading}
            loadMore={
              genericData.pokemons.pageInfo.hasNextPage ? (
                <Tooltip
                  title="Sorry, this options is currenty unavailable. Please augment the limit per load to display more pokemons!"
                  trigger="hover">
                  <Button
                    style={{ marginBottom: "20px" }}
                    onClick={() =>
                      genericFetchMore({
                        variables: {
                          after: genericData.pokemons.pageInfo.endCursor,
                        },
                        updateQuery: (
                          previousResult,
                          { fetchMoreResult }: { fetchMoreResult?: any }
                        ) => {
                          const newEdges = fetchMoreResult.pokemons.edges;
                          const pageInfo = fetchMoreResult.pokemons.pageInfo;
                          debugger;
                          return newEdges.length
                            ? {
                                // Put the new pokemons at the end of the list and update `pageInfo`
                                // so we have the new `endCursor` and `hasNextPage` values
                                genericData: {
                                  pokemons: {
                                    __typename: genericData.pokemons.__typename,
                                    edges: [
                                      ...genericData.pokemons.edges,
                                      ...newEdges,
                                    ],
                                    pageInfo,
                                  },
                                },
                              }
                            : previousResult;
                        },
                      })
                    }>
                    Load More
                  </Button>
                </Tooltip>
              ) : null
            }
            pagination={{ position: "top", pageSize: props.pageQuantity }}
            renderItem={(item: PokemonNode<PokemonItem>) => (
              <PokemonListItem
                node={item.node}
                key={Number(item.node.id)}
                image={props.images}
              />
            )}></List>
        )}
      </>
    );
  } else if (typeData) {
    return (
      <>
        {typeData && typeData.pokemonsByType.edges.length === 0 ? (
          <div className="noPokemons">
            There are no pokemons matching your preferences! <br />
            Please try another configuration.
          </div>
        ) : (
          <List
            loading={!!loadingTypes}
            dataSource={typeData.pokemonsByType.edges}
            loadMore={
              typeData.pokemonsByType.pageInfo.hasNextPage ? (
                <Tooltip
                  title="Sorry, this options is currenty unavailable. Please augment the limit per load to display more pokemons!"
                  trigger="hover">
                  <Button
                    style={{ marginBottom: "20px" }}
                    onClick={() =>
                      typeFetchMore({
                        variables: {
                          after: typeData.pokemonsByType.pageInfo.endCursor,
                        },
                        updateQuery: (
                          previousResult,
                          { fetchMoreResult }: { fetchMoreResult?: any }
                        ) => {
                          const newEdges = fetchMoreResult.pokemonsByType.edges;
                          const pageInfo =
                            fetchMoreResult.pokemonsByType.pageInfo;
                          debugger;
                          return newEdges.length
                            ? {
                                // Put the new pokemons at the end of the list and update `pageInfo`
                                // so we have the new `endCursor` and `hasNextPage` values
                                genericData: {
                                  pokemons: {
                                    __typename:
                                      typeData.pokemonsByType.__typename,
                                    edges: [
                                      ...typeData.pokemonsByType.edges,
                                      ...newEdges,
                                    ],
                                    pageInfo,
                                  },
                                },
                              }
                            : previousResult;
                        },
                      })
                    }>
                    Load More
                  </Button>
                </Tooltip>
              ) : null
            }
            pagination={{ position: "top", pageSize: props.pageQuantity }}
            renderItem={(item: PokemonNode<PokemonItem>) => (
              <PokemonListItem
                node={item.node}
                key={Number(item.node.id)}
                image={props.images}
              />
            )}></List>
        )}
      </>
    );
  } else {
    return (
      <div className="noPokemons">
        There are no pokemons matching your preferences! <br />
        Please try another configuration.
      </div>
    );
  }
};
