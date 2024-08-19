import { ListItem, Box, Typography } from "@mui/material";

function ListItems({ title }) {
  return (
    <ListItem className="card__list_item">
      <Box className="check">
        <svg
          className="check_svg"
          fill="currentColor"
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z"
            fillRule="evenodd"
          ></path>
        </svg>
      </Box>
      <Typography className="list_text">{title}</Typography>
    </ListItem>
  );
}

export default ListItems;
