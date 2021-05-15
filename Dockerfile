FROM node:alpine
#security

WORKDIR /app
#faster image build
COPY . . 
RUN npm install
ENV MONGO_URL=mongodb://localhost:27017/blog
#port
EXPOSE 5000
CMD ["npm", "start"]
