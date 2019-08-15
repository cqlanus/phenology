/* tslint:disable */
//  This file was automatically generated and should not be edited.

export type CreatePlantModelInput = {
  id?: string | null,
  commonName: string,
  latinName: string,
  type?: PlantType | null,
  isNative?: boolean | null,
};

export enum PlantType {
  SHRUB = "SHRUB",
  GRASS = "GRASS",
  HERB = "HERB",
  TREE = "TREE",
  BULB = "BULB",
  VINE = "VINE",
}


export type UpdatePlantModelInput = {
  id: string,
  commonName?: string | null,
  latinName?: string | null,
  type?: PlantType | null,
  isNative?: boolean | null,
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
};

export type EntryInput = {
  entryId: string,
  created: string,
  category?: PhenophaseCategory | null,
  phenophase: string,
  note?: string | null,
};

export enum PhenophaseCategory {
  VEGETATIVE = "VEGETATIVE",
  REPRODUCTIVE = "REPRODUCTIVE",
  FRUIT_SEED = "FRUIT_SEED",
}


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
  id?: ModelIDFilterInput | null,
  commonName?: ModelStringFilterInput | null,
  latinName?: ModelStringFilterInput | null,
  type?: ModelPlantTypeFilterInput | null,
  isNative?: ModelBooleanFilterInput | null,
  and?: Array< ModelPlantModelFilterInput | null > | null,
  or?: Array< ModelPlantModelFilterInput | null > | null,
  not?: ModelPlantModelFilterInput | null,
};

export type ModelIDFilterInput = {
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
};

export type ModelStringFilterInput = {
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
};

export type ModelPlantTypeFilterInput = {
  eq?: PlantType | null,
  ne?: PlantType | null,
};

export type ModelBooleanFilterInput = {
  ne?: boolean | null,
  eq?: boolean | null,
};

export type ModelUserFilterInput = {
  id?: ModelIDFilterInput | null,
  userName?: ModelStringFilterInput | null,
  firstName?: ModelStringFilterInput | null,
  lastName?: ModelStringFilterInput | null,
  and?: Array< ModelUserFilterInput | null > | null,
  or?: Array< ModelUserFilterInput | null > | null,
  not?: ModelUserFilterInput | null,
};

export type CreatePlantModelMutationVariables = {
  input: CreatePlantModelInput,
};

export type CreatePlantModelMutation = {
  createPlantModel:  {
    __typename: "PlantModel",
    id: string,
    commonName: string,
    latinName: string,
    type: PlantType | null,
    isNative: boolean | null,
  } | null,
};

export type UpdatePlantModelMutationVariables = {
  input: UpdatePlantModelInput,
};

export type UpdatePlantModelMutation = {
  updatePlantModel:  {
    __typename: "PlantModel",
    id: string,
    commonName: string,
    latinName: string,
    type: PlantType | null,
    isNative: boolean | null,
  } | null,
};

export type DeletePlantModelMutationVariables = {
  input: DeletePlantModelInput,
};

export type DeletePlantModelMutation = {
  deletePlantModel:  {
    __typename: "PlantModel",
    id: string,
    commonName: string,
    latinName: string,
    type: PlantType | null,
    isNative: boolean | null,
  } | null,
};

export type CreateUserMutationVariables = {
  input: CreateUserInput,
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
    } | null > | null,
  } | null,
};

export type UpdateUserMutationVariables = {
  input: UpdateUserInput,
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
    } | null > | null,
  } | null,
};

export type DeleteUserMutationVariables = {
  input: DeleteUserInput,
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
    } | null > | null,
  } | null,
};
