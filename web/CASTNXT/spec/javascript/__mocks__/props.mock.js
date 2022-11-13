export const propsDefault = {
    "properties": {
        "name": "admin1",
        "data": {
            "schema": {
                "type": "object",
                "properties": {
                    "newInput1": {
                        "title": "Age",
                        "type": "integer",
                        "default": 0
                    },
                    "newInput2": {
                        "title": "First Name",
                        "type": "string",
                        "description": "Your First Name"
                    },
                    "newInput3": {
                        "title": "Given Name",
                        "type": "string",
                        "description": "Your Given Name"
                    }
                },
                "dependencies": {},
                "required": [
                    "newInput1",
                    "newInput2",
                    "newInput3"
                ]
            },
            "uischema": {
                "ui:order": [
                    "newInput1",
                    "newInput2",
                    "newInput3"
                ]
            },
            "id": "634b4470c2e881bd9a343e45",
            "title": "Paris Fashion Week",
            "description": "Some Description",
            "status": "ACCEPTING",
            "clients": {
                "634b4854c2e881bec01f8fe8": {
                    "name": "Sid",
                    "slideIds": [
                        "634b44f0c2e881bd9a343e48",
                        "634b4541c2e881bd9a343e4b",
                        "634b4586c2e881bd9a343e4e"
                    ],
                    "finalizedIds": [
                        "634b44f0c2e881bd9a343e48",
                        "634b4541c2e881bd9a343e4b",
                        "634b4586c2e881bd9a343e4e"
                    ],
                    "negotiationId": "634b4956c2e881bec01f8fea",
                    "preferenceSubmitted": true
                }
            },
            "slides": {
                "634b44f0c2e881bd9a343e48": {
                    "talentName": "Model One",
                    "formData": {
                        "newInput1": 18,
                        "newInput2": "Model",
                        "newInput3": "One"
                    },
                    "curated": true
                },
                "634b4541c2e881bd9a343e4b": {
                    "talentName": "Anushka Garg",
                    "formData": {
                        "newInput1": 25,
                        "newInput2": "Anushka",
                        "newInput3": "Garg"
                    },
                    "curated": true
                },
                "634b4586c2e881bd9a343e4e": {
                    "talentName": "Mounika",
                    "formData": {
                        "newInput1": 25,
                        "newInput2": "Mounika",
                        "newInput3": "Balivada"
                    },
                    "curated": true
                },
                "634b4ff6c2e881c05b22c390": {
                    "talentName": "Rohan",
                    "formData": {
                        "newInput1": 25,
                        "newInput2": "Rohan",
                        "newInput3": "Kandikoda"
                    },
                    "curated": false
                }
            }
        }
    }
}

export const ROW_CURATED = {
    "talentName": "Rohan",
    "formData": {
        "newInput1": 25,
        "newInput2": "Rohan",
        "newInput3": "Kandikoda"
    },
    "curated": true,
    "id": "634b4ff6c2e881c05b22c390",
    "updated": false
}

export const ROWDATA_MOCKED = {
    "row": {
        "id": "634b44f0c2e881bd9a343e48",
        "name": "Model One",
        "curated": true,
        "formData": {
            "newInput1": 18,
            "newInput2": "Model",
            "newInput3": "One"
        },
        "uniqId": "634b44f0c2e881bd9a343e48",
        "talentName": "Model One"
    }
}