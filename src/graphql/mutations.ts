// tslint:disable
// this is an auto generated file. This will be overwritten

export const createPlantModel = `mutation CreatePlantModel($input: CreatePlantModelInput!) {
  createPlantModel(input: $input) {
    id
    commonName
    latinName
    type
    isNative
  }
}
`;
export const updatePlantModel = `mutation UpdatePlantModel($input: UpdatePlantModelInput!) {
  updatePlantModel(input: $input) {
    id
    commonName
    latinName
    type
    isNative
  }
}
`;
export const deletePlantModel = `mutation DeletePlantModel($input: DeletePlantModelInput!) {
  deletePlantModel(input: $input) {
    id
    commonName
    latinName
    type
    isNative
  }
}
`;
export const createUser = `mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
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
export const updateUser = `mutation UpdateUser($input: UpdateUserInput!) {
  updateUser(input: $input) {
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
export const deleteUser = `mutation DeleteUser($input: DeleteUserInput!) {
  deleteUser(input: $input) {
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
