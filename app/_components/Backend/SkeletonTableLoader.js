import { Grid, Paper, Skeleton } from "@mui/material";

function SkeletonTableLoader() {
  return (
    <Grid
      item
      xs={12}
      sx={{
        paddingRight: "0px",
      }}
    >
      <Skeleton
        variant="rounded"
        animation="wave"
        width="100%"
        height="100px"
      />
    </Grid>
  );
}

export default SkeletonTableLoader;
