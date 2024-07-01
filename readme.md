1. install docker
2. run `docker pull mongo`
3. run the docker container via `docker run --name mongodb -d -p 27017:27017 mongo`
4. run `npm run dev` to start the server.
5. you can send a get request to `http://localhost:3000/trigger-sync` to get the first menu or use `http://localhost:3000/trigger-sync/some_id` to get the menu for a specific id.
4. run `docker exec -it mongodb mongosh` to see the database 