#ekdosi tis node. kalo einai na exei ginei prota docker pull node gia na fainetai to node sta images...
FROM node:14

# mongo_cnt:27017 sharethehike is the name I gave to .yml

ENV JWT_SECRET="this_is_the_strogest_secret_said_every_developer_ever"
ENV REACT_APP_API_BASE_URL="http://localhost:8000/"
ENV MONGO_DB_URL="mongodb://mongo_cnt:27017"
ENV MONGO_DB_DATABASE="share_the_hike"

# Change directory inside container
WORKDIR /share-the-hike-server

# Copy the folder inside the working directory
ADD . /share-the-hike-server

RUN npm install --only=production
RUN npm install pm2 -g

# Define the command that should be executed when the Docker container starts
CMD ["pm2-runtime", "start", "index.js"]
