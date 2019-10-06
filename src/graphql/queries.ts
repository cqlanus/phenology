// tslint:disable
// this is an auto generated file. This will be overwritten

export const getPlantModel = `query GetPlantModel($id: ID!) {
  getPlantModel(id: $id) {
    id
    commonName
    latinName
    type
    isNative
  }
}
`;
export const listPlantModels = `query ListPlantModels(
  $filter: ModelPlantModelFilterInput
  $limit: Int
  $nextToken: String
) {
  listPlantModels(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      commonName
      latinName
      type
      isNative
    }
    nextToken
  }
}
`;
export const getUser = `query GetUser($id: ID!) {
  getUser(id: $id) {
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
      }
      station {
        stationId
        name
        longitude
        latitude
        elevation
        elevationUnit
      }
    }
  }
}
`;
export const listUsers = `query ListUsers(
  $filter: ModelUserFilterInput
  $limit: Int
  $nextToken: String
) {
  listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      userName
      firstName
      lastName
      gardens {
        gardenId
        name
      }
    }
    nextToken
  }
}
`;
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
      }
    }
    nextToken
  }
}
`;
