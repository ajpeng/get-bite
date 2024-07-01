1. install docker
2. run `docker pull mongo`
3. run the docker container via `docker run --name mongodb -d -p 27017:27017 mongo`
4. run `docker exec -it mongodb mongosh` to access the mongo shell