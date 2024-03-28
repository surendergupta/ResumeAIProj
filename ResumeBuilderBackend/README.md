
# ResumeToGo
## Build Your Resumes With Ease

### A web application where you can build your resumes, 

### Specify your job description, get a resume generated.
### Edit it according to your will using the editor provided by the website.
## Versions Used

| Tool / Library            | Version                                                                |
| ----------------- | ------------------------------------------------------------------ |
| Angular Cli |  15.1.4 |
| TSC Cli | 4.9.5|
| Node | 18.2.0 |
| angular-http-server | 1.11.1 |


## Features

- Resume Auto Generation based on job description using OpenAI.
- An editor to edit your resume according to your needs, some features included:

    - Change colors of headers,sections and text.
    - Inline editing making typing easier
    - 3 different alignments for the body of resume
    - Drag functionality to move sections up and down
    - Can add an image, image can be cropped with the cropper provided.
    - Zooming functionality 
- Send resume to your email.
- Various subscription levels.

## API Reference
### User Related Endpoints
#### Sign Up User

```http
  POST /api/user/addUser
```

| Parameter | Type     | Description                | Constraints| 
| :-------- | :------- | :------------------------- | :----
| `name` | `string` | **Required**.  User Name| Min Length 4|
| `email` | `string` | **Required**.  User Email| Valid Email |
| `password` | `string` | **Required**.  User Password| Min Length 3 |

### Login user / Generates a cookie with JWT
```http
  POST /api/user/login
```

| Parameter | Type     | Description                | Constraints| 
| :-------- | :------- | :------------------------- | :----
| `email` | `string` | **Required**.  User Email| Valid Email 
| `password` | `string` | **Required**.  User Password| Min Length 3 |



### Get current logged in user.
#### Note: Requires cookie to be set and valid.
```http
  GET /api/user/login
```

### Add a subscription to user. 
#### Note: Requires cookie to be set and valid.
```http
 POST /api/user/addSubscription
```

| Parameter | Type     | Description                | Constraints| 
| :-------- | :------- | :------------------------- | :----
|`subLevel` | `number` | **Required**| 1 or 2 or 3  |


### Resume Related Endpoints
#### Add Basic Resume

```http
  POST /api/resume/createResume
```
#### Note requires cookie to be set
| Parameter | Type     | Description                | Constraints| 
| :-------- | :------- | :------------------------- | :----|
| `resumename` | `string` | **Required**.  | Must not be empty|
| `email` | `string` | **Required**.  Display Email| Valid Email |
| `name` | `string` | **Required**.  Display Name| Min Length 3  |



### Create AI generated Resume

```http
  POST /api/resume/createResumeOpenAI
```
#### Note requires cookie to be set
| Parameter | Type     | Description                | Constraints| 
| :-------- | :------- | :------------------------- | :----|
| `resumename` | `string` | **Required**.  | Must not be empty|
| `resumedescription` | `string` | **Required**.  Description about yourself| Must not be empty |

### Get all resumes of a user
```http
  GET /api/resume/myResumes
```
#### Note requires cookie to be set, Doesn't have any parameters


### Get all resumes of a user
```http
  GET /api/getResume/:resumeId
```
#### Note requires cookie to be set, Requires url parameter resumeId, must be a valid resume id.

### Update a resume
```http
  POST /api/resume/updateResume
```
#### Note requires cookie to be set
| Parameter | Type     | Description                | Constraints| 
| :-------- | :------- | :------------------------- | :----|
| `resumeid` | `string` | **Required**.  | Must not be empty|
| `resumeModel` | `ResumeModel` | **Required**. New Resume Model| Must not be empty |


### Send Resume To Email
```http
  POST /api/resume/sendToMail
```
#### Note requires cookie to be set
| Parameter | Type     | Description                | Constraints| 
| :-------- | :------- | :------------------------- | :----
| `email` | `string` | **Required**.  | Must not be empty|
| `resumeId` | `string` | **Required**. | Must not be empty|


## Models

## User Model
#### Describes a user in the application
```ts
type UserModel= 
{name:string,
email:string,
password:string,
isPremium:boolean,
aiResumesLeft:number
}
```

## Resume Models
### Resume Model: Describes a Resume
```ts
type ResumeModel={
headers:{[key:string]:HeaderModel},
sections:SectionModel[],
resumeOptions?:ResumeOptionsModel
}

```

### Header Model: Describes A Header  in Resume
```ts
type HeaderModel={
name:string,
headerContent:string
}
```

### Section Model: Describes A Section in Resume
```ts
type SectionModel={
name:string,
headerContent:string,
sectionContent:string
}
```


### ResumeOptions Model: Used to specify the options in Resume
```ts
type ResumeOptionsModel=
{
    bodyBackgroundColor:string;
    bodyTextColor:string;
    headerBackgroundColor:string,
    headerTextColor:string,
    showPhone:boolean,
    showEmail:boolean,
    showLocation:boolean,
    sectionAlignment:string,
    headerAlignment:string,
    profileImage:string

}
```



## Running The Project

### Running The Backend 
- Git clone the backend respository into folder called backend
```bash
  git clone https://github.com/SaiGovardhana/ResumeBuilderBackend.git backend
```
- Move into the directory
```bash
  cd  backend
```
- Install npm dependencies 
```bash
npm i
```
- If your chrome installed skip this,Install follwing dependencies if your running on EC2, , This is for puppetter.
```bash
sudo apt-get install ca-certificates fonts-liberation libappindicator3-1 
libasound2 libatk-bridge2.0-0 libatk1.0-0 
libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgbm1 libgcc1 
libglib2.0-0 libgtk-3-0 libnspr4 libnss3 
libpango-1.0-0 libpangocairo-1.0-0 libstdc++6
libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 
libxi6 libxrandr2 libxrender1 libxss1 libxtst6 lsb-release wget xdg-utils
```

- Compile the typescript code, If typescript installed globally
```bash
  tsc
```
- Create a .env file with following fields
```bash
JWT_SECRET_KEY="MYREALLYSECRETKEY"
MONGO_URL="mongodb://MONGO_URL"
OPENAI_KEY="OPENAI_API_KEY"
GMAIL_USER="THIS EMAIL IS USED TO SEND RESUMES"
GMAIL_PASS="PASSWORD USED BY NODEMAILER"
FRONT_END="URL FOR FRONTEND"
```

- Now run the code
```bash
  nohup node src/main/index.js & 
  
  or

  nohup npm start &
```

### Running The Frontend
- Git clone the frontend respository into folder called frontend
```bash
  git clone https://github.com/SaiGovardhana/ResumeBuilderBackend.git backend
```
- Move into the directory
```bash
  cd  frontend
```
- Install npm dependencies 
```bash
npm i
```

- Make sure angular-cli is installed
```bash
npm install -g @angular/cli
```
- Run the application [ In development mode]
```bash
  #This runs the application in development mode 
  #And the backend must be running on port 4292
  #If the port of backend is changed then
  #Edit it in the proxy.conf.json
  
  npm start
  ```
#### Note: Above steps enough to run the application, for better performance or production use below process
- If you want to deploy the application for production
```bash
  ng build
```
- Install angular-http-server globally
```bash
npm i -g angular-http-server

```
- Move to dist folder
```bash
cd dist
```
- Create proxy.js 
```bash
touch proxy.js
```

- Insert the following into it
#### Note: Target points to the backend URL
#### If deployed in same machine using above commands
#### Use localhost:4292
```js
module.exports = {
    proxy: [
        {
            forward: ["api/"],
            target: "localhost:4292",
            protocol: "http",
        }
    ],
};
```
- Run the application to host the static files on port 80, port 80 requires sudo permissions.
```bash
#If port 80
sudo su

#Run the following command.
nohup angular-http-server  -p 80 --config proxy.js &
```

### You have now succesfully deployed the application
### Got to your browser and navigate to localhost

