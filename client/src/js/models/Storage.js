export default class {
  constructor(itemName) {
    this.retrieve = () => {
      const items = localStorage.getItem(itemName);
      return JSON.parse(items);
    }

    this.save = value => 
      localStorage.setItem(itemName, JSON.stringify(value));
  }
}