import axios from "axios";

// passed
export const deviceSearchNode = async (state) => {

  if (!state.deviceName) {
        console.error("deviceName is missing from state:", state);
        return { deviceFound: false, error: "Missing device name input" };
    }

    const query = encodeURIComponent(state.deviceName);
    console.log("here is the device name 2:",state.deviceName)
    const url = `https://www.ifixit.com/api/2.0/search/${query}?filter=device`;

    try {
       
        const response = await axios.get(url);
        const json = response.data;

        if (!json?.results?.length) {
            // Log for debugging if you want
            console.log("No results found for query:", state.deviceName); 
            return { deviceFound: false };
        }

        const top = json.results[0];

        return {
            deviceFound: true,
            deviceTitle: top.title
        };

    } catch (error:any) {
        // Handle network errors or API failures gracefully
        console.error("Error fetching device search data:", error.message);
        return { deviceFound: false, error: "Network error occurred" };
    }
}


//passed
export const guideListNode = async(state) => {

  const url = `https://www.ifixit.com/api/2.0/wikis/CATEGORY/${state.deviceTitle}`;
  console.log(state)

  try {
    // Axios handles the request and the JSON parsing automatically.
    const response = await axios.get(url);
    const json = response.data; // The parsed JSON data is in response.data

    if (!json?.guides.length) {
      console.log("No guides found for device:", state.deviceTitle);
      return { guidesFound: false };
    }

    return {
      guidesFound: true,
      guides: json.guides.map(guide => ({
        id: guide.guideid,
        title: guide.title
      }))
    };
    
  } catch (error:any) {
      // Handle potential network errors or API errors
      console.error("Error fetching guide list:", error.message);
      return { guidesFound: false, error: "Network error occurred" };
  }
}


//passed
export const guideDetailsNode = async(state) => {

  const guideIdToFind = state.id;
  
  const foundGuide = state.guide.find(guid => guid.id == guideIdToFind);

  const url = `https://www.ifixit.com/api/2.0/guides/${state.id}`;
  
  try {
    // Axios handles the request and the JSON parsing automatically.
    const response = await axios.get(url);
    const json = response.data; // The parsed JSON data is in response.data

    // Clean up massive JSON
    const cleanedSteps = json.steps.map(step => ({
      title: step.title,
      text: step.lines.map(line => line.text_raw).join("\n"),
      images: step.media.data.map(img => img.thumbnail)
    }));

    return {
      stepData: cleanedSteps,
      guideTitle: json.title
    };

  } catch (error) {
    // Handle potential network errors or API errors
    console.error(`Error fetching details for guide ID ${guide.id}:`, error.message);
    return { stepData: [], guideTitle: "Error" };
  }
}