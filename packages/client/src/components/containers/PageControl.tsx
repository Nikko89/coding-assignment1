import React, { useState } from "react";
import Options from "../presentational/OptionsForm";
import { PageHeader } from "antd";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import PokemonList from "../presentational/PokemonList";

export default () => {
  const [state, setState] = useState({
    name: "",
    type: "",
    limit: 15,
    pageQuantity: 10,
    addImages: false,
  });

  return (
    <div className="Page">
      <PageHeader
        title="My Pokedex"
        ghost={false}
        extra={
          <Options
            setType={(type: string) => setState({ ...state, type })}
            setName={(name: string) => setState({ ...state, name })}
            setLimit={(limit: number) => setState({ ...state, limit })}
            setQuantity={(pageQuantity: number) =>
              setState({ ...state, pageQuantity })
            }
            setAddImages={(addImages: boolean) =>
              setState({ ...state, addImages })
            }
            name={state.name}
            type={state.type}
            limit={state.limit}
            pageQuantity={state.pageQuantity}
            images={state.addImages}></Options>
        }></PageHeader>
      <PokemonList
        name={state.name}
        type={state.type}
        limit={state.limit}
        pageQuantity={state.pageQuantity}
        images={state.addImages}></PokemonList>
    </div>
  );
};
