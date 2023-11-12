import React, { useState } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import {
  Avatar,
  Card,
  CardContent,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import CompanyInfo from "./dashboard/CompanyInfo";
import CompanyGeneralInfo from "./dashboard/CompanyGeneralInfo";
import NumOfEmployesCard from "./dashboard/NumOfEmployesCard";
import EstimatedRevenueCard from "./dashboard/EstimatedRevenueCard";
import BusinessTagsCard from "./dashboard/BusinessTagsCard";
import MapLocations from "./dashboard/MapLocations";
import ReviewsSummary from "./dashboard/ReviewsSummary";
import ContactInfoCard from "./dashboard/ContactInfoCard";
import SocialMediaCard from "./dashboard/SocialMediaCard";
import AppInfoCard from "./dashboard/AppInfoCard";
import WebsiteInfo from "./dashboard/WebsiteInfo";
import IbcInsuranceCard from "./dashboard/IbcInsuranceCard";
import NaicsInfoCard from "./dashboard/NaicsInfoCard";
import SicsInfoCard from "./dashboard/SicsInfoCard";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

const ResponsiveGridLayout = WidthProvider(Responsive);

function Dashboard({ actualCompanyData }) {
  const [showLongDescription, setShowLongDescription] = useState(false);

  const companyData = actualCompanyData.companyData;
  const reviewsSummary = actualCompanyData.reviewsSummary;

  const companyInfo = {
    company_name: companyData.company_name,

    short_description: companyData.short_description,
    long_description: companyData.long_description,
  };
  const companyGeneralInfo = {
    business_tags: companyData.business_tags,
    year_founded: companyData.year_founded,
    main_business_category: companyData.main_business_category,
    main_industry: companyData.main_industry,
    company_legal_names: companyData.company_legal_names,
    company_commercial_names: companyData.company_commercial_names,
  };

  const locationsData = {
    num_locations: companyData.num_locations,
    locations: companyData.locations,
    main_location: {
      main_country_code: companyData.main_country_code,
      main_country: companyData.main_country,
      main_region: companyData.main_region,
      main_city: companyData.main_city,
      main_street: companyData.main_street,
      main_street_number: companyData.main_street_number,
      main_postcode: companyData.main_postcode,
      main_latitude: companyData.main_latitude,
      main_longitude: companyData.main_longitude,
    },
  };

  const contactInfo = {
    primary_phone: companyData.primary_phone,
    phone_numbers: companyData.phone_numbers,
    primary_email: companyData.primary_email,
    emails: companyData.emails,
    other_emails: companyData.other_emails,
  };

  const socialMediaPlatforms = {
    facebook_url: companyData.facebook_url,
    twitter_url: companyData.twitter_url,
    instagram_url: companyData.instagram_url,
    linkedin_url: companyData.linkedin_url,
    youtube_url: companyData.youtube_url,
  };

  const appsData = {
    ios_app_url: companyData.ios_app_url,
    android_app_url: companyData.android_app_url,
  };

  const websiteData = {
    website_url: companyData.website_url,
    website_domain: companyData.website_domain,
    website_tld: companyData.website_tld,
    website_language_code: companyData.website_language_code,
    cms: companyData.cms,
  };

  const websiteTechnologies = {};

  if (companyData.technologies !== null) {
    companyData.technologies.forEach((string) => {
      const [key, value] = string.split(":").map((s) => s.trim());
      if (!websiteTechnologies[key]) {
        websiteTechnologies[key] = [];
      }

      if (!websiteTechnologies[key].includes(value)) {
        websiteTechnologies[key].push(value);
      }
    });
  }

  const sicsData = {
    sics_industry: companyData.sics_industry,
    sics_sector: companyData.sics_sector,
    sics_subsector: companyData.sics_subsector,
    sic: companyData.sic,
    isic_v4: companyData.isic_v4,
  };

  const naicsData = {
    naics_2022: companyData.naics_2022,
    nace_rev2: companyData.nace_rev2,
    ncci_codes_28_1: companyData.ncci_codes_28_1,
  };

  const countByCountry = {};

  companyData.locations.forEach((location) => {
    const country = location.country;

    if (!countByCountry[country]) {
      countByCountry[country] = 1;
    } else {
      countByCountry[country]++;
    }
  });

  // Transformăm obiectul într-un array de array-uri
  const resultArray = Object.entries(countByCountry).map(
    ([country, locations]) => [country, locations]
  );

  // Adăugăm antetul
  resultArray.unshift(["Country", "Locations"]);

  return (
    <div>
      <div style={{ padding: "25px" }}>
        <Grid2 container spacing={2}>
          <Grid2 lg={12} md={12} sm={12}>
            <CompanyInfo companyInfo={companyInfo} className="widget-full" />
          </Grid2>
          <Grid2 lg={12} md={12} sm={12}>
            <ReviewsSummary
              companyReview={reviewsSummary}
              className="widget-full"
            />
          </Grid2>
          <Grid2 lg={6} md={12} sm={12} xs={12}>
            <CompanyGeneralInfo
              companyGeneralInfo={companyGeneralInfo}
              className="widget-half"
            />
          </Grid2>
          <Grid2 container lg={6} spacing={2}>
            <Grid2 lg={6} md={6} sm={12} xs={12}>
              <NumOfEmployesCard
                numOfEmployes={companyData.employee_count}
                className="widget-quarter"
              />
            </Grid2>
            <Grid2 lg={6} md={6} sm={12} xs={12}>
              <EstimatedRevenueCard
                estimatedRevenue={companyData.estimated_revenue}
                className="widget-quarter"
              />
            </Grid2>
            <Grid2 lg={12} md={12} sm={12} xs={12}>
              <BusinessTagsCard
                businessTags={companyData.business_tags}
                className="widget-half"
              />
            </Grid2>
          </Grid2>
          <Grid2 container lg={6} sx={{ alignContent: "flex-start" }}>
            <Grid2 lg={6} md={12} sm={12} xs={12}>
              <SocialMediaCard socialMediaPlatforms={socialMediaPlatforms} />
            </Grid2>
            <Grid2 lg={6} md={12} sm={12} xs={12}>
              <AppInfoCard appsData={appsData} />
            </Grid2>
            <Grid2 container lg={12} md={12} sm={12} xs={12}>
              <Grid2 lg={12} md={12} sm={12} xs={12}>
                <ContactInfoCard contactInfo={contactInfo} />
              </Grid2>
              <Grid2 lg={12} md={12} sm={12} xs={12}>
                <IbcInsuranceCard ibcInsurance={companyData.ibc_insurance} />
              </Grid2>
            </Grid2>
          </Grid2>
          <Grid2 container lg={6} md={12} sm={12} xs={12}>
            <Grid2 lg={12} md={12} sm={12} xs={12}>
              <MapLocations
                locationsData={resultArray}
                numLocations={companyData.num_locations}
              />
            </Grid2>
            <Grid2 lg={12} md={12} sm={12} xs={12}>
              <NaicsInfoCard naicsData={naicsData} />
            </Grid2>
            <Grid2 lg={12} md={12} sm={12} xs={12}>
              <SicsInfoCard sicsData={sicsData} />
            </Grid2>
          </Grid2>
          <Grid2 lg={12} md={12} sm={12} xs={12}>
            <WebsiteInfo
              websiteData={websiteData}
              websiteTechnologies={websiteTechnologies}
            />
          </Grid2>
        </Grid2>
        {/* <CompanyInfo companyInfo={companyInfo} className="widget-full" /> */}

        {/* <div className="dashboard-widgets-row grid-2-col"> */}

        {/* <div className="dashboard-widgets-col grid-2-row">
            <div className="dashboard-widgets-row grid-2-col"> */}

        {/* </div> */}
        {/* <div className="dashboard-widgets-row "> */}

        {/* <NumOfEmployesCard numOfEmployes={companyData.companyData.employee_count} /> */}
        {/* </div> */}
        {/* </div> */}
        {/* </div> */}
        {/* <div className="dashboard-widgets-row grid-2-col">
          <div className=" dashboard-widgets-col grid-1-col">
            <div className="dashboard-widgets-row grid-2-col"> */}

        {/* </div> */}
        {/* </div> */}
        {/* <div className=" dashboard-widgets-col grid-1-col"> */}

        {/* </div> */}
        {/* </div> */}
        {/* <div className="dashboard-widgets-row grid-2-col">
          <div className="dashboard-widgets-col grid-2-row"></div>
          <MapLocations locationsData={locationsData} />
        </div> */}
        {/* <div className="dashboard-widgets-row grid-2-col">
          <div className=" dashboard-widgets-col grid-1-col"></div>
        </div> */}
      </div>
    </div>
  );
}

export default Dashboard;
