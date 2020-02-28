/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreatePlantModelInput = {
  id?: string | null,
  commonName: string,
  latinName: string,
  type?: PlantType | null,
  isNative?: boolean | null,
  hasNeedles?: boolean | null,
  isDeciduous?: boolean | null,
  isPerennial?: boolean | null,
  image?: string | null,
};

export enum PlantType {
  SHRUB = "SHRUB",
  GRASS = "GRASS",
  HERB = "HERB",
  TREE = "TREE",
  BULB = "BULB",
  VINE = "VINE",
}


export type ModelPlantModelConditionInput = {
  commonName?: ModelStringInput | null,
  latinName?: ModelStringInput | null,
  type?: ModelPlantTypeInput | null,
  isNative?: ModelBooleanInput | null,
  hasNeedles?: ModelBooleanInput | null,
  isDeciduous?: ModelBooleanInput | null,
  isPerennial?: ModelBooleanInput | null,
  image?: ModelStringInput | null,
  and?: Array< ModelPlantModelConditionInput | null > | null,
  or?: Array< ModelPlantModelConditionInput | null > | null,
  not?: ModelPlantModelConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelPlantTypeInput = {
  eq?: PlantType | null,
  ne?: PlantType | null,
};

export type ModelBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type UpdatePlantModelInput = {
  id: string,
  commonName?: string | null,
  latinName?: string | null,
  type?: PlantType | null,
  isNative?: boolean | null,
  hasNeedles?: boolean | null,
  isDeciduous?: boolean | null,
  isPerennial?: boolean | null,
  image?: string | null,
};

export type DeletePlantModelInput = {
  id?: string | null,
};

export type CreateUserInput = {
  id?: string | null,
  userName: string,
  firstName: string,
  lastName: string,
  gardens?: Array< GardenInput | null > | null,
};

export type GardenInput = {
  gardenId: string,
  name: string,
  plantings?: Array< PlantingInput | null > | null,
  station?: StationInput | null,
};

export type PlantingInput = {
  plantingId: string,
  qty: number,
  plant: PlantInput,
  entries?: Array< EntryInput | null > | null,
};

export type PlantInput = {
  plantId?: string | null,
  commonName: string,
  latinName: string,
  type?: PlantType | null,
  isNative?: boolean | null,
  hasNeedles?: boolean | null,
  isDeciduous?: boolean | null,
  isPerennial?: boolean | null,
  image?: string | null,
};

export type EntryInput = {
  entryId: string,
  created: string,
  category?: PhenophaseCategory | null,
  phenophase: Phenophase,
  note?: string | null,
  gdd?: number | null,
  ytdGdd?: number | null,
};

export enum PhenophaseCategory {
  PROPAGATION = "PROPAGATION",
  VEGETATIVE = "VEGETATIVE",
  REPRODUCTIVE = "REPRODUCTIVE",
  FRUIT_SEED = "FRUIT_SEED",
}


export enum Phenophase {
  SOWN_SEEDS = "SOWN_SEEDS",
  TRANSPLANTATION = "TRANSPLANTATION",
  STEM_CUTTINGS = "STEM_CUTTINGS",
  ROOT_CUTTINGS = "ROOT_CUTTINGS",
  LEAF_CUTTINGS = "LEAF_CUTTINGS",
  ROOT_DIVISION = "ROOT_DIVISION",
  AIR_LAYERING = "AIR_LAYERING",
  GROUND_LAYERING = "GROUND_LAYERING",
  GRAFTING = "GRAFTING",
  INITIAL_GROWTH = "INITIAL_GROWTH",
  BUD_BREAK = "BUD_BREAK",
  ALL_BUDS_BREAK = "ALL_BUDS_BREAK",
  LEAVES = "LEAVES",
  INCREASED_LEAVES = "INCREASED_LEAVES",
  COLORED_LEAVES = "COLORED_LEAVES",
  FALLING_LEAVES = "FALLING_LEAVES",
  EMERGING_NEEDLES = "EMERGING_NEEDLES",
  YOUNG_NEEDLES = "YOUNG_NEEDLES",
  FLOWER_HEADS = "FLOWER_HEADS",
  FLOWERS = "FLOWERS",
  OPEN_FLOWERS = "OPEN_FLOWERS",
  FULL_FLOWERING = "FULL_FLOWERING",
  END_FLOWERING = "END_FLOWERING",
  POLLEN_CONES = "POLLEN_CONES",
  OPEN_POLLEN_CONES = "OPEN_POLLEN_CONES",
  POLLEN_RELEASE = "POLLEN_RELEASE",
  POLLEN_RELEASE_CONIFERS = "POLLEN_RELEASE_CONIFERS",
  UNRIPE_SEED_CONES = "UNRIPE_SEED_CONES",
  RIPE_SEED_CONES = "RIPE_SEED_CONES",
  RECENT_CONE_DROP = "RECENT_CONE_DROP",
  RIPE_FRUITS = "RIPE_FRUITS",
  FRUIT_DROP = "FRUIT_DROP",
}


export type StationInput = {
  stationId: string,
  name: string,
  longitude?: number | null,
  latitude?: number | null,
  elevation?: number | null,
  elevationUnit?: string | null,
};

export type ModelUserConditionInput = {
  userName?: ModelStringInput | null,
  firstName?: ModelStringInput | null,
  lastName?: ModelStringInput | null,
  and?: Array< ModelUserConditionInput | null > | null,
  or?: Array< ModelUserConditionInput | null > | null,
  not?: ModelUserConditionInput | null,
};

export type UpdateUserInput = {
  id: string,
  userName?: string | null,
  firstName?: string | null,
  lastName?: string | null,
  gardens?: Array< GardenInput | null > | null,
};

export type DeleteUserInput = {
  id?: string | null,
};

export type ModelPlantModelFilterInput = {
  id?: ModelIDInput | null,
  commonName?: ModelStringInput | null,
  latinName?: ModelStringInput | null,
  type?: ModelPlantTypeInput | null,
  isNative?: ModelBooleanInput | null,
  hasNeedles?: ModelBooleanInput | null,
  isDeciduous?: ModelBooleanInput | null,
  isPerennial?: ModelBooleanInput | null,
  image?: ModelStringInput | null,
  and?: Array< ModelPlantModelFilterInput | null > | null,
  or?: Array< ModelPlantModelFilterInput | null > | null,
  not?: ModelPlantModelFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelUserFilterInput = {
  id?: ModelIDInput | null,
  userName?: ModelStringInput | null,
  firstName?: ModelStringInput | null,
  lastName?: ModelStringInput | null,
  and?: Array< ModelUserFilterInput | null > | null,
  or?: Array< ModelUserFilterInput | null > | null,
  not?: ModelUserFilterInput | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type CreatePlantModelMutationVariables = {
  input: CreatePlantModelInput,
  condition?: ModelPlantModelConditionInput | null,
};

export type CreatePlantModelMutation = {
  createPlantModel:  {
    __typename: "PlantModel",
    id: string,
    commonName: string,
    latinName: string,
    type: PlantType | null,
    isNative: boolean | null,
    hasNeedles: boolean | null,
    isDeciduous: boolean | null,
    isPerennial: boolean | null,
    image: string | null,
  } | null,
};

export type UpdatePlantModelMutationVariables = {
  input: UpdatePlantModelInput,
  condition?: ModelPlantModelConditionInput | null,
};

export type UpdatePlantModelMutation = {
  updatePlantModel:  {
    __typename: "PlantModel",
    id: string,
    commonName: string,
    latinName: string,
    type: PlantType | null,
    isNative: boolean | null,
    hasNeedles: boolean | null,
    isDeciduous: boolean | null,
    isPerennial: boolean | null,
    image: string | null,
  } | null,
};

export type DeletePlantModelMutationVariables = {
  input: DeletePlantModelInput,
  condition?: ModelPlantModelConditionInput | null,
};

export type DeletePlantModelMutation = {
  deletePlantModel:  {
    __typename: "PlantModel",
    id: string,
    commonName: string,
    latinName: string,
    type: PlantType | null,
    isNative: boolean | null,
    hasNeedles: boolean | null,
    isDeciduous: boolean | null,
    isPerennial: boolean | null,
    image: string | null,
  } | null,
};

export type CreateUserMutationVariables = {
  input: CreateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type CreateUserMutation = {
  createUser:  {
    __typename: "User",
    id: string,
    userName: string,
    firstName: string,
    lastName: string,
    gardens:  Array< {
      __typename: "Garden",
      gardenId: string,
      name: string,
      plantings:  Array< {
        __typename: "Planting",
        plantingId: string,
        qty: number,
      } | null > | null,
      station:  {
        __typename: "Station",
        stationId: string,
        name: string,
        longitude: number | null,
        latitude: number | null,
        elevation: number | null,
        elevationUnit: string | null,
      } | null,
    } | null > | null,
  } | null,
};

export type UpdateUserMutationVariables = {
  input: UpdateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type UpdateUserMutation = {
  updateUser:  {
    __typename: "User",
    id: string,
    userName: string,
    firstName: string,
    lastName: string,
    gardens:  Array< {
      __typename: "Garden",
      gardenId: string,
      name: string,
      plantings:  Array< {
        __typename: "Planting",
        plantingId: string,
        qty: number,
      } | null > | null,
      station:  {
        __typename: "Station",
        stationId: string,
        name: string,
        longitude: number | null,
        latitude: number | null,
        elevation: number | null,
        elevationUnit: string | null,
      } | null,
    } | null > | null,
  } | null,
};

export type DeleteUserMutationVariables = {
  input: DeleteUserInput,
  condition?: ModelUserConditionInput | null,
};

export type DeleteUserMutation = {
  deleteUser:  {
    __typename: "User",
    id: string,
    userName: string,
    firstName: string,
    lastName: string,
    gardens:  Array< {
      __typename: "Garden",
      gardenId: string,
      name: string,
      plantings:  Array< {
        __typename: "Planting",
        plantingId: string,
        qty: number,
      } | null > | null,
      station:  {
        __typename: "Station",
        stationId: string,
        name: string,
        longitude: number | null,
        latitude: number | null,
        elevation: number | null,
        elevationUnit: string | null,
      } | null,
    } | null > | null,
  } | null,
};

export type GetPlantModelQueryVariables = {
  id: string,
};

export type GetPlantModelQuery = {
  getPlantModel:  {
    __typename: "PlantModel",
    id: string,
    commonName: string,
    latinName: string,
    type: PlantType | null,
    isNative: boolean | null,
    hasNeedles: boolean | null,
    isDeciduous: boolean | null,
    isPerennial: boolean | null,
    image: string | null,
  } | null,
};

export type ListPlantModelsQueryVariables = {
  filter?: ModelPlantModelFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListPlantModelsQuery = {
  listPlantModels:  {
    __typename: "ModelPlantModelConnection",
    items:  Array< {
      __typename: "PlantModel",
      id: string,
      commonName: string,
      latinName: string,
      type: PlantType | null,
      isNative: boolean | null,
      hasNeedles: boolean | null,
      isDeciduous: boolean | null,
      isPerennial: boolean | null,
      image: string | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetUserQueryVariables = {
  id: string,
};

export type GetUserQuery = {
  getUser:  {
    __typename: "User",
    id: string,
    userName: string,
    firstName: string,
    lastName: string,
    gardens:  Array< {
      __typename: "Garden",
      gardenId: string,
      name: string,
      plantings:  Array< {
        __typename: "Planting",
        plantingId: string,
        qty: number,
      } | null > | null,
      station:  {
        __typename: "Station",
        stationId: string,
        name: string,
        longitude: number | null,
        latitude: number | null,
        elevation: number | null,
        elevationUnit: string | null,
      } | null,
    } | null > | null,
  } | null,
};

export type ListUsersQueryVariables = {
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUsersQuery = {
  listUsers:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      id: string,
      userName: string,
      firstName: string,
      lastName: string,
      gardens:  Array< {
        __typename: "Garden",
        gardenId: string,
        name: string,
      } | null > | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetUserByUserNameQueryVariables = {
  userName?: string | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type GetUserByUserNameQuery = {
  getUserByUserName:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      id: string,
      userName: string,
      firstName: string,
      lastName: string,
      gardens:  Array< {
        __typename: "Garden",
        gardenId: string,
        name: string,
      } | null > | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type OnCreatePlantModelSubscription = {
  onCreatePlantModel:  {
    __typename: "PlantModel",
    id: string,
    commonName: string,
    latinName: string,
    type: PlantType | null,
    isNative: boolean | null,
    hasNeedles: boolean | null,
    isDeciduous: boolean | null,
    isPerennial: boolean | null,
    image: string | null,
  } | null,
};

export type OnUpdatePlantModelSubscription = {
  onUpdatePlantModel:  {
    __typename: "PlantModel",
    id: string,
    commonName: string,
    latinName: string,
    type: PlantType | null,
    isNative: boolean | null,
    hasNeedles: boolean | null,
    isDeciduous: boolean | null,
    isPerennial: boolean | null,
    image: string | null,
  } | null,
};

export type OnDeletePlantModelSubscription = {
  onDeletePlantModel:  {
    __typename: "PlantModel",
    id: string,
    commonName: string,
    latinName: string,
    type: PlantType | null,
    isNative: boolean | null,
    hasNeedles: boolean | null,
    isDeciduous: boolean | null,
    isPerennial: boolean | null,
    image: string | null,
  } | null,
};

export type OnCreateUserSubscription = {
  onCreateUser:  {
    __typename: "User",
    id: string,
    userName: string,
    firstName: string,
    lastName: string,
    gardens:  Array< {
      __typename: "Garden",
      gardenId: string,
      name: string,
      plantings:  Array< {
        __typename: "Planting",
        plantingId: string,
        qty: number,
      } | null > | null,
      station:  {
        __typename: "Station",
        stationId: string,
        name: string,
        longitude: number | null,
        latitude: number | null,
        elevation: number | null,
        elevationUnit: string | null,
      } | null,
    } | null > | null,
  } | null,
};

export type OnUpdateUserSubscription = {
  onUpdateUser:  {
    __typename: "User",
    id: string,
    userName: string,
    firstName: string,
    lastName: string,
    gardens:  Array< {
      __typename: "Garden",
      gardenId: string,
      name: string,
      plantings:  Array< {
        __typename: "Planting",
        plantingId: string,
        qty: number,
      } | null > | null,
      station:  {
        __typename: "Station",
        stationId: string,
        name: string,
        longitude: number | null,
        latitude: number | null,
        elevation: number | null,
        elevationUnit: string | null,
      } | null,
    } | null > | null,
  } | null,
};

export type OnDeleteUserSubscription = {
  onDeleteUser:  {
    __typename: "User",
    id: string,
    userName: string,
    firstName: string,
    lastName: string,
    gardens:  Array< {
      __typename: "Garden",
      gardenId: string,
      name: string,
      plantings:  Array< {
        __typename: "Planting",
        plantingId: string,
        qty: number,
      } | null > | null,
      station:  {
        __typename: "Station",
        stationId: string,
        name: string,
        longitude: number | null,
        latitude: number | null,
        elevation: number | null,
        elevationUnit: string | null,
      } | null,
    } | null > | null,
  } | null,
};
