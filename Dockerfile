FROM --platform=$TARGETPLATFORM eclipse-temurin

ARG TARGETPLATFORM
ARG BUILDPLATFORM

WORKDIR /usr/myapp

COPY target/*.jar myapp.jar

CMD ["java","-jar","myapp.jar"]

ENTRYPOINT ["sh", "-c", "exec java -Xbootclasspath/a:/resources -jar myapp.jar"]