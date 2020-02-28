// tslint:disable
// this is an auto generated file. This will be overwritten

export const getPlantModel = /* GraphQL */ `
  query GetPlantModel($id: ID!) {
    getPlantModel(id: $id) {
      id
      commonName
      latinName
      type
      isNative
      hasNeedles
      isDeciduous
      isPerennial
      image
    }
  }
`;
export const listPlantModels = /* GraphQL */ `
  query ListPlantModels(
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
        hasNeedles
        isDeciduous
        isPerennial
        image
      }
      nextToken
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
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
export const listUsers = /* GraphQL */ `
  query ListUsers(
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
export const getUserByUserName = /* GraphQL */ `
  query GetUserByUserName(
    $userName: String
    $sortDirection: ModelSortDirection
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getUserByUserName(
      userName: $userName
      sortDirection: $sortDirection
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
