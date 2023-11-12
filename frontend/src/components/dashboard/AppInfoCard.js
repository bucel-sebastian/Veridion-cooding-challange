import React from "react";
import {
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { FaCode, FaApple, FaAndroid } from "react-icons/fa6";

function AppInfoCard({ appsData }) {
  return (
    <Card
      variant="outlined"
      sx={{
        boxShadow: "0 3px 10px 2px #1a1a1a45",
        minHeight: "150px",
      }}
    >
      <CardContent>
        <div style={{ display: "grid" }} className="grid-2-col">
          <div>
            <Typography variant="h5" className="card-title">
              Applications
            </Typography>
            {appsData.android_app_url === null &&
            appsData.ios_app_url === null ? (
              <>
                <Typography variant="body2" className="card-content">
                  There's no data..
                </Typography>
              </>
            ) : (
              <>
                <div className="apps-icons-container">
                  {appsData.android_app_url !== null && (
                    <>
                      <a href={appsData.android_app_url}>
                        <FaAndroid />
                      </a>
                    </>
                  )}
                  {appsData.ios_app_url !== null && (
                    <>
                      <a href={appsData.ios_app_url}>
                        <FaApple />
                      </a>
                    </>
                  )}
                </div>
              </>
            )}
          </div>
          <div className="card-icon-container">
            <div className="card-icon" style={{ background: "#f44434" }}>
              <FaCode />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default AppInfoCard;
