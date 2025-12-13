export const summarize = async(state) => {

    const Data = state.cleanedGuide || state.cleanedWebData

    console.log("this is final data---> ",Data)

    return {finalData:Data}

}