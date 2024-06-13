import { Grid, Typography } from "@mui/material";
import React, { ReactNode } from "react";

type EmptyStateProps = {
  title: string;
  description?: string;
  children: ReactNode;
};

export const EmptyState = (props: EmptyStateProps) => {
  const { title, description, children } = props;

  return (
    <Grid container maxWidth="50%" alignSelf="center">
      <Grid xs>{children}</Grid>
      <Grid
        xs
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="flex-start"
        gap={2}
      >
        <Typography variant="h3" fontWeight="bold">
          {title}
        </Typography>
        {description && (
          <Typography variant="subtitle2" fontWeight="medium">
            {description}
          </Typography>
        )}
      </Grid>
    </Grid>
  );
};
