// tslint:disable
// this is an auto generated file. This will be overwritten

export const onCreatePlantModel = `subscription OnCreatePlantModel {
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
export const onUpdatePlantModel = `subscription OnUpdatePlantModel {
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
export const onDeletePlantModel = `subscription OnDeletePlantModel {
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
export const onCreateUser = `subscription OnCreateUser {
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
export const onUpdateUser = `subscription OnUpdateUser {
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
export const onDeleteUser = `subscription OnDeleteUser {
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
