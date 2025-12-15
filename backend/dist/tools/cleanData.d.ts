export declare const clean_iFixit_Data: (state: any) => Promise<{
    cleaned: boolean;
    cleanedData: {
        device: any;
        userInput: any;
        guideId: any;
        guideTitle: any;
        steps: any;
    };
}>;
export declare const clean_tavily_data: (state: any) => Promise<{
    cleaned: boolean;
    cleanedData: {
        originalQuery: any;
        topResultsCount: any;
        topResults: any;
    };
    error?: never;
} | {
    cleaned: boolean;
    cleanedData: null;
    error: any;
}>;
//# sourceMappingURL=cleanData.d.ts.map