export interface PokemonItem {
  id: string;
  name: string;
  types: string[];
  classification: string;
}

export interface PokemonNode<C> {
  node: C;
}

export interface Edge<A> {
  cursor: string;
  node: A;
}

export interface PageInfo {
  endCursor?: string;
  hasNextPage: boolean;
}

export interface Connection<A> {
  edges: Array<Edge<A>>;
  pageInfo: PageInfo;
}
