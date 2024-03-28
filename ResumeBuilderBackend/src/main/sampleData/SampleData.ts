import { BasicObject } from "../models/models";

export let sampleData:{[key:string]:string|string[]|BasicObject[]}={
    "name": "XYZ",
    "profession": "Profession",
    "abstract": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    "values": [
      {
        "name": "Value",
        "description": "Value Description"
      },
      {
        "name": "Value",
        "description": "Value Description"
      }
    ],
    "skills": [
      {
        "name": "Skill",
        "description": "Skill Description, Blah... Blah..."
      },
      {
        "name": "Skill",
        "description": "Skill Description, Blah... Blah..."
      },
      {
        "name": "Skill",
        "description": "Skill Description, Blah... Blah..."
      }
   
    ],
    "education": [
      {
        "institution": "University Name",
        "from": "from",
        "to": "to",
        "course": "Course Name"
      },
      {
        "institution": "University Name",
        "from": "from",
        "to": "to",
        "course": "Course Name"
      }
    ],
    "work": [
      {
        "company": "Company",
        "designation": "Designation",
        "from": "from",
        "to": "to"
      },
      {
        "institution": "University Name",
        "from": "from",
        "to": "to",
        "course": "Course Name"
      }
    ]
  }