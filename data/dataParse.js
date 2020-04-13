const fs = require("fs");
const csvParser = require("./csvParser");

const updatedFoodDisplayTableCSV = "Food_Display_Table.csv";
const dataCSV = fs.readFileSync(
  `./${updatedFoodDisplayTableCSV}`,
  "utf8"
);

const foodsData = csvParser(dataCSV).sort((last, next) => last.displayName.localeCompare(next.displayName));

fs.writeFileSync(`./data.json`, JSON.stringify(foodsData));