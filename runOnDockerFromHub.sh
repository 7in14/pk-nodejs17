docker run --name pk-nodejs17 -p 8080:8080 -d  -e "NODE_ENV=prod" -e "PORT=8080" -e "MONGO=mongodb://<connection string>" karpikpl/pk-nodejs17
