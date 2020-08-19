import React from "react";
import { v4 as getRandomKey } from "uuid";

const toElementsWithMappedProps = (
  Component,
  propsToItemValues
) => currentItem => {
  const componentProps = propsToItemValues
    ? getComponentPropsFromItem(propsToItemValues, currentItem)
    : currentItem;
  console.log(componentProps);

  return <Component {...componentProps} key={getRandomKey()} />;
};

const getComponentPropsFromItem = (propsToItemValues, currentItem) => {
  if (typeof propsToItemValues === "string") {
    return getPropsFromString(propsToItemValues, currentItem);
  }
  if (isArrayOfStrings(propsToItemValues)) {
    return getPropsFromArrayOfStrings(propsToItemValues, currentItem);
  }
  if (typeof propsToItemValues === "object") {
    return getPropsFromObject(propsToItemValues, currentItem);
  }
};

const getPropsFromString = (propName, currentItem) => ({
  [propName]: currentItem
});

const isArrayOfStrings = object =>
  Array.isArray(object) && object.every(isString);

const isString = value => typeof value === "string";

const getPropsFromArrayOfStrings = (arrayOfStrings, currentItem) => {
  const propsEntries = arrayOfStrings.map(toEntries);
  return propsEntriesToComponentProps(currentItem, propsEntries);
};

const toEntries = value => [value, value];

const getPropsFromObject = (propsToItemValues, currentItem) => {
  const propsEntries = Object.entries(propsToItemValues);
  return propsEntriesToComponentProps(currentItem, propsEntries);
};

const propsEntriesToComponentProps = (currentItem, propsEntries) => {
  const toComponentPropsFromItem = mapComponentPropsFrom(currentItem);
  const componentPropsEntries = propsEntries.map(toComponentPropsFromItem);
  return getObjectFromEntries(componentPropsEntries);
};

const mapComponentPropsFrom = currentItem => ([propKey, itemKey]) => [
  propKey,
  currentItem[itemKey]
];

const getObjectFromEntries = entries => entries.reduce(toObjectFromEntries, {});

const toObjectFromEntries = (object, [key, value]) => ({
  ...object,
  [key]: value
});

export default toElementsWithMappedProps;