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

import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

import {
  FaHashtag,
  FaSquareFacebook,
  FaSquareInstagram,
  FaSquareTwitter,
  FaLinkedin,
  FaSquareYoutube,
} from "react-icons/fa6";

function SocialMediaCard({ socialMediaPlatforms }) {
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
              Social Media
            </Typography>
            {socialMediaPlatforms.facebook_url === null &&
            socialMediaPlatforms.twitter_url === null &&
            socialMediaPlatforms.instagram_url === null &&
            socialMediaPlatforms.linkedin_url === null &&
            socialMediaPlatforms.youtube_url === null ? (
              <>
                <Typography variant="body2" className="card-content">
                  There's no data..
                </Typography>
              </>
            ) : (
              <>
                <div className="social-media-icons-container">
                  {socialMediaPlatforms.facebook_url !== null && (
                    <>
                      <a href={socialMediaPlatforms.facebook_url}>
                        <FaSquareFacebook />
                      </a>
                    </>
                  )}
                  {socialMediaPlatforms.instagram_url !== null && (
                    <>
                      <a href={socialMediaPlatforms.instagram_url}>
                        <FaSquareInstagram />
                      </a>
                    </>
                  )}
                  {socialMediaPlatforms.twitter_url !== null && (
                    <>
                      <a href={socialMediaPlatforms.twitter_url}>
                        <FaSquareTwitter />
                      </a>
                    </>
                  )}
                  {socialMediaPlatforms.linkedin_url !== null && (
                    <>
                      <a href={socialMediaPlatforms.linkedin_url}>
                        <FaLinkedin />
                      </a>
                    </>
                  )}
                  {socialMediaPlatforms.youtube_url !== null && (
                    <>
                      <a href={socialMediaPlatforms.youtube_url}>
                        <FaSquareYoutube />
                      </a>
                    </>
                  )}
                </div>
              </>
            )}
          </div>
          <div className="card-icon-container">
            <div
              className="card-icon"
              style={{
                background: "#6464f4",
              }}
            >
              <FaHashtag />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default SocialMediaCard;
