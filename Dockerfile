FROM microsoft/dotnet:2.0.0-sdk

RUN apt-get update && apt-get upgrade -y
RUN apt-get install -y sqlite3 libsqlite3-dev --fix-missing
RUN wget -qO- https://deb.nodesource.com/setup_4.x | bash -
RUN apt-get install -y build-essential nodejs

COPY . /app

WORKDIR /app

RUN ["dotnet", "restore"]
RUN ["dotnet", "publish"]
RUN ["dotnet", "build"]
RUN ["sh", "init.sh"]

EXPOSE 5000/tcp

CMD ["dotnet", "run", "--server.urls", "http://*:5000"]