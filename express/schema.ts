import { gql } from 'apollo-server';

export const typeDefs = gql`
  type Log {
    container_id: String
    container_name: String
    source: String
    log: String
    time: Date
  }

  type Query {
    logs: [Log]
  }
`;