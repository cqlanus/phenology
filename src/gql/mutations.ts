export const updateUser = `mutation UpdateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
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
          plantingId
          qty
          entries {
            entryId
            phenophase
            category
            created
            note
          }
          plant {
            commonName
            latinName
            plantId
            isNative
          }
        }
      }
    }
  }`
