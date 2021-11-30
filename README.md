# BarParks
Full-stack web app built with Node, Express, and MongoDB. 
Live demo: [Deployed on Heroku!](https://sheltered-headland-08597.herokuapp.com/)
![image](https://user-images.githubusercontent.com/74084822/143974019-8d15e8b2-a42d-4012-8bdd-c40ec957005f.png)
![image](https://user-images.githubusercontent.com/74084822/143974479-f5c615f6-9ebb-43ff-a22f-08f68628507f.png)



# Todo:
- Redo front-end with React
- Fix deployment issue with Heroku

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
