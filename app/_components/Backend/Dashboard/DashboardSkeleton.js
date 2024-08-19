"use client";

import { Grid, Paper, Skeleton, Typography } from "@mui/material";

const DashboardSkeleton = () => {
  return (
    <Grid container spacing={3} sx={{ p: 3 }}>
      <Grid item xs={12}>
        <Skeleton
          variant="rectangular"
          width="100%"
          height={200}
          animation="wave"
        />
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h5" gutterBottom>
          Recent Flashcard Sets
        </Typography>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            {Array.from({ length: 3 }).map((_, index) => (
              <Grid item key={index} xs={12} md={4}>
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height={150}
                  animation="wave"
                  sx={{ mb: 2 }}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h5" gutterBottom>
          Progress and Analytics
        </Typography>
        <Skeleton
          variant="rectangular"
          width="100%"
          height={200}
          animation="wave"
        />
      </Grid>
    </Grid>
  );
};

export default DashboardSkeleton;
