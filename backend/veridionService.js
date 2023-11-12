async function enrichCompanyData(company) {
  try {
    const requestData = {
      legal_names: [],
      commercial_names: company.name.split(","),
      address_txt: company.address,
      website: company.website,
    };
    const response = await fetch(process.env.VERIDION_API_URL, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "x-api-key": process.env.VERIDION_API_KEY,
      },
      body: JSON.stringify(requestData),
    });

    if (response.ok) {
      // console.log(response);
      if (response.status === 202) {
        return 0;
      }
      const responseJson = await response.json();
      return responseJson;
    } else {
      console.log("Error - Veridion API error - ", response.error);
      return 0;
    }
  } catch (error) {
    console.error("Error - ", error);
    return 0;
  }
}

module.exports = {
  enrichCompanyData,
};
