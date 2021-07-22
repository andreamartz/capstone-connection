import React from "react";
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import "./Tags.css";


const Tags = ({ tags }) => {
  return (
    <Box display="flex">
      {tags
        ? (
          <Box display="flex">
            {tags.map(tag => (
              <span
                key={tag.id}
                className="tag"
              >
                <Typography className={tag.text}>
                  {tag.text}
                </Typography>
              </span>
            ))}
          </Box>
        ) : (
          null
        )
      }
    </Box>
  )
};

export default Tags;