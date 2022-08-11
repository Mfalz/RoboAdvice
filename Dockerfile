FROM --platform=$TARGETPLATFORM eclipse-temurin:8-jre

ARG TARGETPLATFORM
ARG BUILDPLATFORM

WORKDIR /usr/myapp

COPY target/*.war myapp.war

CMD ["java","-jar","myapp.war"]

ENTRYPOINT ["sh", "-c", "exec java -Xbootclasspath/a:/resources -jar myapp.war"]