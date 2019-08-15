import uuid from 'uuid'
export const entities = [
    {
        "id": "cqlanus",
        "userName": "cqlanus",
        "firstName": "Chris",
        "lastName": "Lanus",
        "gardens": [
            {
                gardenId: uuid(),
                "name": "Backyard",
                "plantings": [
                    {
                        plantingId: uuid(),
                        "plant": {
                            plantId: 'p3',
                            "commonName": "Hakone grass",
                            "latinName": "Hakonechloa macra",
                            "type": "GRASS",
                            "isNative": false
                        },
                        "qty": 4,
                        "entries": [
                            {
                                entryId: uuid(),
                                "created": "2019-08-08T18:12:14.588Z",
                                "category": "VEGETATIVE",
                                "phenophase": "INITIAL_GROWTH",
                                "note": "sunny day"
                            }
                        ]
                    },
                    {
                        plantingId: uuid(),
                        "plant": {
                            plantId: 'p12',
                            "commonName": "Red twig dogwood",
                            "latinName": "Cornus alba",
                            "type": "SHRUB",
                            "isNative": true
                        },
                        "qty": 3,
                        "entries": []
                    }
                ]
            }
        ]
    }
]