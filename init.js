db = new Mongo().getDB("ulearn-chats-db");
// create non admin user

db.createUser({
  user: "dbUser",
  pwd: "dbPassword",
  roles: []
});