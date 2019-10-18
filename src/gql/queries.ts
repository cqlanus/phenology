export const getUserByUserName = `query GetUserByUserName(
    $userName: String
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getUserByUserName(
      userName: $userName
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userName
        firstName
        lastName
        gardens {
          gardenId
          name
          station {
            stationId
            name
            latitude
            longitude
        }
          plantings {
              qty
              plantingId
              plant {
                  commonName
                  latinName
                  plantId
                  isNative
              }
              entries {
                  entryId
                  phenophase
                  created
                  note
                  category
                  gdd
                  ytdGdd
              }
          }
        }
      }
      nextToken
    }
  }
  `;
  