export declare const fallbackSearchNode: (state: any) => Promise<{
    webSearch: boolean;
    webResult: {
        query: string;
        results: {
            title: string;
            url: string;
            content: string;
            rawContent?: string;
            score: number;
            publishedDate: string;
        }[];
    };
    error?: never;
} | {
    webSearch: boolean;
    error: any;
    webResult?: never;
}>;
//# sourceMappingURL=tavily.d.ts.map