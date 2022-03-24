import moment from "moment";
import fs from "fs-extra";
export const uploadImage = async ({file}) => {
  return new Promise(async (resolve, reject) => {
    const fomatDate = "YYYYMMDDHHmmss";
    const fileName =
      "kxo_" +
      moment().format(fomatDate) +
      Math.random().toString(36).substr(2, 5);
    var fileExtention = file.name.split(".")[1];
    if (file != null) {
      try {
        var fileExtention = file.name.split(".")[1];
        var newpath = "uploads/images/" + fileName + "." + fileExtention;
        await fs.moveSync(file.path, newpath);
        resolve(fileName + "." + fileExtention);
      } catch (error) {
        reject(error);
      }
    }
  });
};
