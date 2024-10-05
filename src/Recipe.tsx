import React from "react";
import style from "./recipe.module.css";

interface IngredientType {
  text: string;
}

interface RecipeType {
  title: string;
  calories: number;
  image: string;
  ingredients: IngredientType[];
}

function Recipe({ title, calories, image, ingredients }: RecipeType) {
  return (
    <div className={style.recipe}>
      <h1>{title}</h1>
      <ol>
        {ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient.text}</li>
        ))}
      </ol>
      <p>Calories: {calories}</p>
      <img src={image} className={style.image} alt="food image"></img>{" "}
      {/* Removed the typo */}
    </div>
  );
}

export default Recipe;
