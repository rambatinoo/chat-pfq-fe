import { Button, Skeleton, Box } from "@mui/material";

export const CategoryButtons = ({
  handleClick,
  category,
  allCategories,
  loading,
}) => {
  const skeletonCount = 14; // Adjust this number to the desired number of skeletons

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
      {loading === true ? (
        <Box sx={{ width: "100%" }}>
          {Array.from({ length: skeletonCount }).map((_, index) => (
            <Skeleton
              key={index}
              variant="rectangular"
              sx={{
                margin: "5px",
                padding: "5px",
                borderRadius: "15px",
                width: "auto",
                height: "36px",
              }}
            />
          ))}
        </Box>
      ) : (
        allCategories.map((categoryItem) => {
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
        })
      )}
    </>
  );
};
