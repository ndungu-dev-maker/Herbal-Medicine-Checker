import { useState } from "react";

function App() {
  const [product, setProduct] = useState("");
  const [result, setResult] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/check", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ product })
    });

    const data = await response.json();

    if (response.ok) {
      setResult(
        `Product: ${data.product}\nIngredients: ${data.active_ingredients.join(
          ", "
        )}\nWarnings: ${data.warnings}`
      );
    } else {
      setResult(data.error);
    }
  };

  return (
    <div>
      <h1>Herbal Medicine Checker</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter herbal product name"
          value={product}
          onChange={(e) => setProduct(e.target.value)}
        />
        <button type="submit">Check</button>
      </form>

      <pre>{result}</pre>
    </div>
  );
}

export default App;
