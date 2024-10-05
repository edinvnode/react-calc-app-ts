import { useState, useEffect } from "react";
import Recipe from "./Recipe";

import "./styles.css";

interface IngredientType {
  text: string;
}

interface RecipeType {
  recipe: {
    label: string;
    calories: number;
    image: string;
    ingredients: IngredientType[];
  };
}

function App() {
  const APP_ID = "5b768afa";
  const APP_KEY = "959620b416d568c2e4b03985b345edfa";

  // Explicitly define the state types
  const [recipes, setRecipes] = useState<RecipeType[]>([]);
  const [search, setSearch] = useState<string>("");
  const [query, setQuery] = useState<string>("");

  useEffect(() => {
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    console.log(query);
    try {
      const response = await fetch(
        `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
      );
      const data = await response.json();
      console.log(data.hits);
      setRecipes(data.hits);
    } catch (err) {
      console.error("Failed to fetch recipes:", err);
    }
  };

  const updateSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const getSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setQuery(search);
      setSearch("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input
          type="text"
          className="search-bar"
          value={search}
          onChange={updateSearch}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
      <div className="recipes">
        {recipes.map((recipe) => (
          <Recipe
            key={recipe.recipe.label}
            title={recipe.recipe.label}
            calories={recipe.recipe.calories}
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
