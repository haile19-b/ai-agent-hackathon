export const summarize = async(state) => {

    console.log("this is final summary ;;;;;",state)

    if(state.cleaned){
        return {
            webResult:state.webResult,
            cleanedWebData:state.cleanedWebData
        }
    }else{
        return {
            state
        }
    }
}