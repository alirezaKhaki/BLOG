FROM node:alpine
#security

WORKDIR /app
#faster image build
COPY . . 
RUN npm install
ENV MONGO_URL=mongodb+srv://root:v4UmvoqikSF4tvYd@cluster0.giszp.mongodb.net/blog?retryWrites=true&w=majority
#port
EXPOSE 5000
CMD ["npm", "start"]
