# Hike Up

[Hike up](https://hike-up.herokuapp.com/) is a website clone, inspired by [Meet Up](https://www.meetup.com/). Hike Up can be used to create groups for other users with similar interests. and hosting events, both in person and online. Users can join groups that may interest them. Hike up was made with the idea that although hiking can be done solo, its best to go with a group. 

## Wiki Link
- [API routes](https://github.com//E-F-III/aA-project-Meetup-clone/wiki/API-Routes)
- [Database Schema](https://github.com//E-F-III/aA-project-Meetup-clone/wiki/Database-Schema)
- [Features List](https://github.com//E-F-III/aA-project-Meetup-clone/wiki/Features-List)
- [Redux State Shape](https://github.com//E-F-III/aA-project-Meetup-clone/wiki/Redux-State-Shape)

## Technologies
- SQLite3
- Sequelize
- JavaScript
- HTML
- CSS
- Node.js
- Express.js
- React
- Redux
- Heroku Postgres
- Heroku for hosting

## Splash page

Access to the sign up, log in, and demo user are all located on the navbar.
Links to see the list of groups and events are also provided here

![image](https://user-images.githubusercontent.com/75222415/187095525-1c804477-4d7e-464e-9a5d-83b2e279d08f.png)

## Find Groups and Events

View groups and events 

![image](https://user-images.githubusercontent.com/75222415/187095399-484cb17b-2504-48d2-a1da-311c76a53a17.png)
![image](https://user-images.githubusercontent.com/75222415/187095400-ff5c9fc0-fb38-4b97-9b5d-0dc590af4931.png)

## Group Information

View information about a group. 

![image](https://user-images.githubusercontent.com/75222415/187095437-c1b64dfe-5a9a-4695-8ca4-a6a946797636.png)

## Event Information

View information about an event.

![image](https://user-images.githubusercontent.com/75222415/187095480-ee670a11-4aaa-4bbc-bd6b-6743af46def8.png)

# Run locally
- Clone the repository
- Create a .env file in the backend folder. See below for an example
- Change directory into the backend folder and run `npm install`, then `npm run`
- Open a second terminal and change directory into the frontend folder, run `npm install`, then `npm run`

## Environment Variables
```
PORT=8000
DB_FILE=db/dev.db
JWT_SECRET=«generate_strong_secret_here»
JWT_EXPIRES_IN=604800
```

## Database
Run the following commands to migrate and seed the project
```
npx dotenv sequelize db:migrate
npx dotenv sequelize db:seed:all
```

# TODO List
The following features already have database tables and API routes setup. The frontend part of these features are yet to be implemented
- Images feature
- Group members
- Event attendees
- Venues



