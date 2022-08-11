FROM openjdk:8u121-jdk

WORKDIR /usr/myapp

ENV OWNER mfalz
ENV REPO roboadvice-service
ENV PACKAGE tbd
ENV VERSION tbd
ENV ARTIFACT tbd

RUN wget https://maven.pkg.github.com/${OWNER}/${REPO}/${PACKAGE}/${VERSION}/${ARTIFACT}.jar myapp.jar

CMD ["java","-jar","myapp.jar"]