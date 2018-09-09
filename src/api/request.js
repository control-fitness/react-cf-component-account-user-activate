import Client, { Graphql } from 'react-cf-graphql-client';

const request = function request(confirmedToken) {
  return Client.mutate({
    mutation: Graphql`
      mutation AccountUserActivate {
        accountUserActivate(input: {
          confirmedToken: "${confirmedToken}"
        }) {
          activated
          token
        }
      }
    `,
  });
};

export default request;
