const toggleMealsList = e => {
  const { mealName } = e.target.dataset;
  activityView.changeActivityFoodList(mealName);
};

const getActivityDate = inputDate => {
  const date = new Date(inputDate);
  date.setHours(24);
  return date.toDateString();
};

const changeDailyActivity = e => {
  const inputDate = e.target.value;
  const activityDate = getActivityDate(inputDate);
  setupDailyActivity(activityDate);
};
