FROM node:alpine
#security

WORKDIR /app
#faster image build
COPY . . 
RUN npm install
#port
EXPOSE 5000
CMD ["npm", "start"]
