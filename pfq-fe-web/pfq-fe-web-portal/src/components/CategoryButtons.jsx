import { Button } from "@mui/material";

export const CategoryButtons = ({ handleClick, category, allCategories }) => {
  return (
    <>
      <Button
        onClick={handleClick}
        value={"All"}
        variant={category === "All" ? "contained" : "outlined"}
        sx={{
          margin: "5px",
          padding: "5px",
          color: category === "All" ? "white" : "black",
          backgroundColor: category === "All" ? "#21409a" : "white",
          borderRadius: "15px",
        }}
      >
        All
      </Button>

      {allCategories.map((categoryItem) => {
        return (
          <Button
            key={categoryItem}
            variant={category === categoryItem ? "contained" : "outlined"}
            onClick={handleClick}
            value={categoryItem}
            sx={{
              margin: "5px",
              padding: "5px",
              color: category === categoryItem ? "white" : "black",
              backgroundColor:
                category === categoryItem ? "#21409a" : "white",
                borderRadius: "15px",
            }}
          >
            {categoryItem}
          </Button>
        );
      })}
    </>
  );
};