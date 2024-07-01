function initDB(mongoose: typeof import("mongoose")) {
  mongoose.connect(process.env.MONGO_URI || "", {}).then(() => {
    console.log("Succesfully connected to Mongo");
  }).catch((err) => {
    console.error(err);
  });
}

export { initDB };