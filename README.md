# Calorie Counter
## Overview
Getting and staying healthy requires a combination of mental balance, exercise, and nutrition. The goal of the Calorie Counter app is to help the user address nutritional needs by counting calories for various foods.

This app provides the number of calories based on the result of a user search for a type of food. The U.S. Department of Agriculture MyPyramid Food Raw Data will be searched to determine the calorie values.

Calorie Counter also provides you, the developer, with experience in transforming raw data into a format that will make it easier to search. In this case, the MyPyramid Food Raw Data file, which is an MS Excel spreadsheet, must be downloaded and transformed into a JSON file that will be easier to load and search at runtime (hint: take a look at the CSV file format).
App powered by MyPiramid Food Display Table.

box-shadow: 0 1px 6px rgba(32, 33, 36, 0.28);
border-radius: 8px;
margin-bottom: 8px;

A wildcard character is a special character that represents one or more other characters. The most commonly used wildcard characters are the asterisk (*), which typically represents zero or more characters in a string of characters, and the question mark (?), which typically represents any one character.
## Problems && Solutions
1. Parse the data from the U.S. Department of Agriculture MyPyramid Food Raw Data, which it is an MS Excel file.
- First, the file was saved in CSV (Comma separated vector), then loaded as a plain text in a string and splitted into an array. The array was mapped into objects and saved in a JSON.
2. 