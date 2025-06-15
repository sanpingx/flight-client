docker build -t client-app .


docker run -d -p 80:80 --name client-app client-app:latest
