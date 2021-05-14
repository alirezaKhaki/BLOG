FROM node:alpine
#security
RUN addgroup app && adduser -S -G app app
USER app
WORKDIR /app
#faster image build
COPY package*.json ./ 
RUN npm install
COPY . .
ENV MONGO_URL=mongodb+srv://root:v4UmvoqikSF4tvYd@cluster0.giszp.mongodb.net/blog?retryWrites=true&w=majority
#port
EXPOSE 5000
CMD ["npm", "start"]
