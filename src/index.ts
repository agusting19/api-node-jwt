import app from "./app";

function main() {
  app.listen(app.get("port"), () => {
    console.log(`Server is listening on port ${app.get("port")}`);
  });
}

main();
