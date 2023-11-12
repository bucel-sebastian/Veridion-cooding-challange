import { Card, CardContent, Chip, Typography } from "@mui/material";
import React from "react";
import { FaTags } from "react-icons/fa6";

function BusinessTagsCard({ businessTags }) {
  return (
    <>
      <Card
        variant="outlined"
        sx={{
          boxShadow: "0 3px 10px 2px #1a1a1a45",
          minHeight: "150px",
        }}
      >
        <CardContent>
          <div className="grid-2-col-3-1" style={{ display: "grid" }}>
            <div>
              <Typography variant="h5" className="card-title">
                Business Tags
              </Typography>
              {businessTags === null ? (
                <>
                  <Typography variant="body2" className="card-content">
                    There's no data..
                  </Typography>
                </>
              ) : (
                <>
                  <div
                    className="business-tags"
                    style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}
                  >
                    {businessTags.map((tag, index) => (
                      <Chip key={index} size="small" label={`${tag}`} />
                    ))}
                  </div>
                </>
              )}
              {/* <Typography variant="h2">382M</Typography> */}
            </div>
            <div className="card-icon-container">
              <div className="card-icon" style={{ background: "#fca434" }}>
                <FaTags />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

export default BusinessTagsCard;
