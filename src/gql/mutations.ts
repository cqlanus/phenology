export const updateUser = `mutation UpdateUser($onput: UpdateUserInput!) {
    updateUser(input: $onput) {
      id
      userName
      firstName
      lastName
      gardens {
        gardenId
        name
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
