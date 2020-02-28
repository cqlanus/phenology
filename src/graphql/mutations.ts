// tslint:disable
// this is an auto generated file. This will be overwritten

export const createPlantModel = /* GraphQL */ `
  mutation CreatePlantModel(
    $input: CreatePlantModelInput!
    $condition: ModelPlantModelConditionInput
  ) {
    createPlantModel(input: $input, condition: $condition) {
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
export const updatePlantModel = /* GraphQL */ `
  mutation UpdatePlantModel(
    $input: UpdatePlantModelInput!
    $condition: ModelPlantModelConditionInput
  ) {
    updatePlantModel(input: $input, condition: $condition) {
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
export const deletePlantModel = /* GraphQL */ `
  mutation DeletePlantModel(
    $input: DeletePlantModelInput!
    $condition: ModelPlantModelConditionInput
  ) {
    deletePlantModel(input: $input, condition: $condition) {
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
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
