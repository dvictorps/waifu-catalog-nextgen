import { GraphQLClient, gql } from "graphql-request";

export const anilist = new GraphQLClient("https://graphql.anilist.co");

export const CHARACTERS_QUERY = gql`
  query ($page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        currentPage
        lastPage
        hasNextPage
      }
      characters(sort: FAVOURITES_DESC) {
        id
        name {
          full
          first
          last
          native
        }
        gender
        description
        image {
          large
          medium
        }
        age
        dateOfBirth {
          year
          month
          day
        }
        favourites
        media(perPage: 1, sort: POPULARITY_DESC) {
          edges {
            characterRole
            node {
              id
              type
              title {
                romaji
                english
                native
              }
              coverImage {
                large
                medium
              }
              format
              status
              episodes
              chapters
              volumes
            }
          }
        }
      }
    }
  }
`;
