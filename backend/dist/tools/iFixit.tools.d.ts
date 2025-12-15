export declare const deviceSearchNode: (state: any) => Promise<{
    deviceFound: boolean;
    error: string;
    deviceTitle?: never;
} | {
    deviceFound: boolean;
    error?: never;
    deviceTitle?: never;
} | {
    deviceFound: boolean;
    deviceTitle: any;
    error?: never;
}>;
export declare const guideListNode: (state: any) => Promise<{
    guidesFound: boolean;
    guides?: never;
    error?: never;
} | {
    guidesFound: boolean;
    guides: any;
    error?: never;
} | {
    guidesFound: boolean;
    error: string;
    guides?: never;
}>;
export declare const guideDetailsNode: (state: any) => Promise<{
    guideDetails: any;
    finalResponse: any;
    stepData?: never;
    guideTitle?: never;
} | {
    stepData: never[];
    guideTitle: string;
    guideDetails?: never;
    finalResponse?: never;
}>;
//# sourceMappingURL=iFixit.tools.d.ts.map