const fs = require("fs");

function mergeFile(files, target) {
  const writeable = fs.createWriteStream(target);
  function pipe() {
    if (files instanceof Array) {
      if (!files.length) {
        // 最后一个文件
        writeable.end();
        return "done";
      } else {
        const readable = fs.createReadStream(files.shift());
        readable.pipe(writeable, { end: false });
        readable.on("end", () => {
          pipe();
        });
        readable.on("error", () => {
          return "error";
        });
      }
    } else {
      throw new Error("files is not array");
    }
  }
  pipe();
}

module.exports = mergeFile;
