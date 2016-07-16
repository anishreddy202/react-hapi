FROM mhart/alpine-node:4.4
MAINTAINER Anish Reddy Madhi (anishreddy202@gmail.com)

COPY client /opt/react/client/
COPY server /opt/react/server/
COPY package.json /opt/react/

RUN adduser -S tspace && \
    addgroup -S tspace && \
    chown -R tspace:tspace /opt/react/

WORKDIR /opt/react

RUN npm install --production

ENV HOST=0.0.0.0

USER tspace

EXPOSE  3000

CMD ["node", "server/index.js"]
