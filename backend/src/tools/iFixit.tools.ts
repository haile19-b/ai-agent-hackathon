import axios from "axios";


export const deviceSearchNode = async (state) => {
    const query = encodeURIComponent(state.userInput);
    const url = `https://www.ifixit.com/api/2.0/search/${query}?filter=device`;

    try {
       
        const response = await axios.get(url);
        const json = response.data;

        if (!json?.results?.length) {
            // Log for debugging if you want
            console.log("No results found for query:", state.userInput); 
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


export const guideListNode = async(state) => {

  const url = `https://www.ifixit.com/api/2.0/wikis/CATEGORY/${state.deviceTitle}`;

  try {
    // Axios handles the request and the JSON parsing automatically.
    const response = await axios.get(url);
    const json = response.data; // The parsed JSON data is in response.data

    if (!json?.length) {
      console.log("No guides found for device:", state.deviceTitle);
      return { guidesFound: false };
    }

    return {
      guidesFound: true,
      guides: json.map(guide => ({
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


export const guideDetailsNode = async(state) => {

    if (!state.guides || state.guides.length === 0) {
    console.error("State does not contain guides.");
    return { stepData: [], guideTitle: "N/A" };
  }
  
  const guide = state.guides[0]; 

  const url = `https://www.ifixit.com/api/2.0/guides/${guide.id}`;
  
  try {
    // Axios handles the request and the JSON parsing automatically.
    const response = await axios.get(url);
    const json = response.data; // The parsed JSON data is in response.data

    // Clean up massive JSON
    const cleanedSteps = json.steps.map(step => ({
      title: step.title,
      text: step.lines.map(line => line.text).join("\n"),
      images: step.images.map(img => img.thumbnail)
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