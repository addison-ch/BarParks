# BarParks
Full-stack web app built with Node, Express, and MongoDB. 

The aim of this project is to create an environment where users can freely share, discover, and rate outdoor exercise locations they find with the rest of the world. Many outdoor workout parks go undiscovered because they aren't searchable through services like Google Maps. BarParks serves as a way to crowdsource these hard to find exercise locations. 

### Features
- Posting, editing, deletion of exercise locations & reviews, with client-side and server-side validations
- Responsive and accessible design created with Bootstrap5
- Inegrated the MapBox API to create an interactive cluster map, geocode addresses, and display an accurate map of each location
- Image upload and storage using the Cloudinary API
- User authorization and authentication (login/sign up), built from scratch
- Flash messages that react to different user interactions with the app

![image](image.png)


# Running it locally
1. Clone the repository

   ```
   git clone https://github.com/addison-ch/BarParks/
   cd BarParks
   npm install 
   ```

2. Install [MongoDB](https://www.mongodb.com/)

3. Create a Cloudinary account to get your **cloud name**, **API Key** and **API Secret**

4. Create a Mapbox account to get an **API access token**

5. Create an `.env` file in the root of this project and add following information:

   ```
   CLOUDINARY_CLOUD_NAME=<cloud name>
   CLOUDINARY_KEY=<API Key>
   CLOUDINARY_SECRET=<API Secret>
   MAPBOX_TOKEN=<API access token>
   ```

6. Run `mongod`, then run  `node app.js` in the terminal
7. Go to localhost:3000


# Todo:
- Redo front-end with React
- Fix deployment issue with Heroku

