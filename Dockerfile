# Dockfile
FROM node:latest
# Install PM2
RUN npm install pm2 -g
# Bundle app source
COPY ./dist ./
COPY ./package*.json ./
COPY ./node_modules ./node_modules
# Start the app
CMD ["pm2-runtime", "start", "main.js"]
# Expose the listening port
EXPOSE 8021

