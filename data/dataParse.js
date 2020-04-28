const fs = require("fs");
const csvParser = require("./plainCsvParser");
console.time("Total time");

const getParsedCSV = path => {
  const CSV = fs.readFileSync(path, "utf8");
  return csvParser(CSV);
}

const parseRank = nutrient => {
  const { id, name, unitName, rank } = nutrient;
  return {
    id,
    name,
    unitName,
    rank: parseFloat(rank)
  };
}

const measureUnits = getParsedCSV(`${__dirname}/USDA data/supporting/measure_unit.csv`);

const nutrients = getParsedCSV(`${__dirname}/USDA data/supporting/nutrient.csv`).map(parseRank);

const findRelatedFood = (foods, related) => foods.find(food => food.fdcId === related.fdcId);

const hasNutritionalInformation = ({ nutrients }) => nutrients.length > 0;

const sortNutrientsByRank = food => {
  food.nutrients.sort((previous, next) => previous.rank - next.rank);
  return food;
}

const addDefaultPortion = food => {
  const { portions } = food;
  if (portions.length < 1) {
    const defaultPortion = {
      name: "oz",
      portionDescription: "Default portion (~3.5 oz)",
      amount: 3.527,
      gramWeight: 100
    };
    portions.push(defaultPortion);
  }
  return food;
};


const parseDirectoryFoods = path => {
  const foods = getParsedCSV(`${path}/food.csv`);
  foods.forEach(food => {
    food.portions = [];
    food.nutrients = [];
  });

  const foodsNutrient = getParsedCSV(`${path}/food_nutrient.csv`);
  const foodsPortion = getParsedCSV(`${path}/food_portion.csv`);

  foodsPortion.forEach(foodPortion => {
    const food = findRelatedFood(foods, foodPortion);
    if (food) {
      const { portionDescription, amount, measureUnitId, gramWeight } = foodPortion;
      const { name } = measureUnits.find(
        measureUnit => measureUnit.id === measureUnitId
      );

      const newPortion = {
        name,
        portionDescription,
        amount: parseFloat(amount),
        gramWeight: parseFloat(gramWeight)
      };
      food.portions.push(newPortion);
    }
  });

  foodsNutrient.forEach(foodNutrient => {
    const food = findRelatedFood(foods, foodNutrient);
    if (food) {
      const { nutrientId, amount } = foodNutrient;
      const { name, unitName, rank } = nutrients.find(
        nutrient => nutrient.id === nutrientId
      );
      if (rank < 9800 || name.includes("Fatty acids")) {
        const newNutrient = {
          name,
          amount: parseFloat(amount),
          unitName: unitName.toLowerCase(),
          rank
        };
        food.nutrients.push(newNutrient);
      }
    }
  });

  return foods.filter(hasNutritionalInformation)
              .map(sortNutrientsByRank)
              .map(addDefaultPortion);
}

const saveDataToJSON = folderName => {
  const foods = parseDirectoryFoods(`${__dirname}/USDA data/${folderName}`);
  fs.writeFileSync(`${__dirname}/${folderName}Data.json`, JSON.stringify(foods));
  console.log(`${folderName}: ${foods.length} registros.`);
}

saveDataToJSON("foundation");
saveDataToJSON("survey");
saveDataToJSON("legacy");
console.timeEnd("Total time");