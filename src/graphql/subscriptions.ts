// tslint:disable
// this is an auto generated file. This will be overwritten

export const onCreatePlantModel = /* GraphQL */ `
  subscription OnCreatePlantModel {
    onCreatePlantModel {
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
export const onUpdatePlantModel = /* GraphQL */ `
  subscription OnUpdatePlantModel {
    onUpdatePlantModel {
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
export const onDeletePlantModel = /* GraphQL */ `
  subscription OnDeletePlantModel {
    onDeletePlantModel {
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
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
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
