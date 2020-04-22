const fs = require("fs");
const csvParser = require("./plainCsvParser");
console.time("Total time");

const parseCSV = path => {
  const CSV = fs.readFileSync(path, "utf8");
  return csvParser(CSV);
}
// measure_unit.csv
const measureUnits = parseCSV(`${__dirname}/USDA data/supporting/measure_unit.csv`);
const nutrients = parseCSV(`${__dirname}/USDA data/supporting/nutrient.csv`)
  .map(({ id, name, unitName, rank }) => ({
    id,
    name,
    unitName,
    rank: parseFloat(rank)
  }));

const parseDirectoryData = path => {
  const foods = parseCSV(`${path}/food.csv`);
  foods.filter(food => !food);
  foods.forEach(food => {
    food.portions = [];
    food.nutrients = [];
  });

  const foodsNutrient = parseCSV(`${path}/food_nutrient.csv`);
  const foodsPortion = parseCSV(`${path}/food_portion.csv`);

  foodsPortion.forEach(foodPortion => {
    const food = foods.find(food => food.fdcId === foodPortion.fdcId);
    if (food) {
      const { portionDescription, amount, measureUnitId, gramWeight } = foodPortion;
      const { name } = measureUnits.find(
        measureUnit => measureUnit.id === measureUnitId
      );
      food.portions.push({ name, portionDescription, amount: parseFloat(amount), gramWeight: parseFloat(gramWeight) });
    }
  });

  foodsNutrient.forEach(foodNutrient => {
    const food = foods.find(food => food.fdcId === foodNutrient.fdcId);
    if (food) {
      const { nutrientId, amount } = foodNutrient;
      const { name, unitName, rank } = nutrients.find(
        nutrient => nutrient.id === nutrientId
      );
      if (rank < 9800 || name.includes("Fatty acids"))
        food.nutrients.push({
          name,
          amount: parseFloat(amount),
          unitName: unitName.toLowerCase(),
          rank
        });
    }
  });

  return foods;
}

const saveDataToJSON = folderName => {
  const foods = parseDirectoryData(`${__dirname}/USDA data/${folderName}`);
  fs.writeFileSync(`${__dirname}/${folderName}Data.json`, JSON.stringify(foods));
  console.log(`${folderName}: ${foods.length} registros.`);
}

saveDataToJSON("foundation");
saveDataToJSON("survey");
saveDataToJSON("legacy");
console.timeEnd("Total time");