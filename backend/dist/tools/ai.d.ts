export declare const getDeviceName: (state: any) => Promise<{
    deviceName?: never;
    deviceTitle?: never;
    guides?: never;
    selectedGuideId?: never;
    guideDetails?: never;
    cleanedData?: never;
    finalResponse?: never;
    webResult?: never;
    webSearch?: never;
} | {
    deviceName: any;
    deviceTitle: null;
    guides: null;
    selectedGuideId: null;
    guideDetails: null;
    cleanedData: null;
    finalResponse: null;
    webResult: null;
    webSearch: boolean;
} | {
    deviceName: any;
    deviceTitle?: never;
    guides?: never;
    selectedGuideId?: never;
    guideDetails?: never;
    cleanedData?: never;
    finalResponse?: never;
    webResult?: never;
    webSearch?: never;
}>;
export declare const getRelevantGuide: (state: any) => Promise<{
    selectedGuideId: null;
    webSearch: boolean;
} | {
    selectedGuideId: number;
    webSearch: boolean;
} | {
    webSearch: boolean;
    selectedGuideId?: never;
}>;
//# sourceMappingURL=ai.d.ts.map