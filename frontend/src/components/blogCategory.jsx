import { createContext, useState, useContext } from "react";

const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
  const [category, setCategory] = useState("All posts");

  const toggleCategory = (selectedCategory) => {
    setCategory(selectedCategory);
  };

  return (
    <BlogContext.Provider value={{ category, toggleCategory }}>
      <>{children}</>
    </BlogContext.Provider>
  );
};

export const useBlog = () => useContext(BlogContext);
