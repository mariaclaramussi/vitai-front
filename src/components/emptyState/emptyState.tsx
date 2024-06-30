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
    <Grid container maxWidth="60%" alignSelf="center" gap={1}>
      <Grid xs item>
        {children}
      </Grid>
      <Grid
        item
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
