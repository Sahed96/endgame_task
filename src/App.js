import React from "react";
import ProductList from "./ProductList";
import "./styles.css"; // Optional: add your styles here

const App = () => {
  return (
    <div className="App">
      <h2 className="text-3xl font-black text-cyan-500 my-4">Dream Store</h2>
      <ProductList />
    </div>
  );
};

export default App;
