/*const CronJob = require("cron").CronJob;
const fs = require("fs");

//Executes cleanup of temporary files on monday 00:00
const job = new CronJob("00 00 00 * * 1", function() {
  if (process.env.NODE_ENV === "production") {
    fs.readdir("./client/build/temp/", (err, files) => {
      files.forEach(file => {
        //Check date of upload
        fs.stat(`./client/build/temp/${file}`, function(err, stats) {
          var mtime =
            (new Date().getTime() - new Date(stats.mtime).getTime()) / 3600000;
          //Delete if older than 24h
          if (mtime > 24) {
            fs.unlink(`./client/build/temp/${file}`, function(err) {
              if (err) throw err;
            });
          }
        });
      });
    });
  } else {
    fs.readdir("./client/public/temp/", (err, files) => {
      files.forEach(file => {
        //Check date of upload
        fs.stat(`./client/public/temp/${file}`, function(err, stats) {
          var mtime =
            (new Date().getTime() - new Date(stats.mtime).getTime()) / 3600000;
          //Delete if older than 24h
          if (mtime > 24) {
            fs.unlink(`./client/public/temp/${file}`, function(err) {
              if (err) throw err;
            });
          }
        });
      });
    });
  }
});
job.start();*/
