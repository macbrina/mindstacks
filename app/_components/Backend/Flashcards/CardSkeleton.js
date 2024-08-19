import { Grid, Skeleton } from "@mui/material";

function CardSkeleton({ count = 3 }) {
  return (
    <Grid item xs={12} sx={{ marginTop: 10 }}>
      <Grid container spacing={2}>
        {Array.from({ length: count }).map((_, index) => (
          <Grid item key={index} xs={12} md={4}>
            <Skeleton
              variant="rectangular"
              width="100%"
              height="16rem"
              animation="wave"
              sx={{ mb: 2 }}
            />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}

export default CardSkeleton;
