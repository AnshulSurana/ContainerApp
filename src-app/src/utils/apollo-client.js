// import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
// import { END_POINTS } from '../constants';
//
// const defaultOptions = {
//   watchQuery: {
//     fetchPolicy: 'network-only',
//     errorPolicy: 'ignore'
//   },
//   query: {
//     fetchPolicy: 'network-only',
//     errorPolicy: 'all'
//   }
// };
//
// const cache = new InMemoryCache();
//
// const link = createHttpLink({
//   uri: END_POINTS.GQL_URL,
//   headers: {
//     'Content-Type': 'application/json',
//     'AD-tenant': '-place-',
//     Accept: 'application/json'
//   },
//   credentials: 'same-origin'
// });
//
// const apolloClient = new ApolloClient({
//   link,
//   cache,
//   defaultOptions
// });
//
// export default apolloClient;
