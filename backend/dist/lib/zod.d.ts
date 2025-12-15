import * as z from 'zod/v3';
export declare const deviceSchema: z.ZodObject<{
    deviceName: z.ZodString;
}, "strip", z.ZodTypeAny, {
    deviceName: string;
}, {
    deviceName: string;
}>;
export type device = z.infer<typeof deviceSchema>;
export declare const guideSchema: z.ZodObject<{
    id: z.ZodNumber;
    relevantGuid: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: number;
    relevantGuid: string;
}, {
    id: number;
    relevantGuid: string;
}>;
export type guide = z.infer<typeof guideSchema>;
export declare const stepSchema: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodString;
    image: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    title: string;
    description: string;
    image: string[];
}, {
    title: string;
    description: string;
    image: string[];
}>;
export declare const aiFinalResponseSchema: z.ZodObject<{
    steps: z.ZodArray<z.ZodObject<{
        title: z.ZodString;
        description: z.ZodString;
        image: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        title: string;
        description: string;
        image: string[];
    }, {
        title: string;
        description: string;
        image: string[];
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    steps: {
        title: string;
        description: string;
        image: string[];
    }[];
}, {
    steps: {
        title: string;
        description: string;
        image: string[];
    }[];
}>;
export type steps = z.infer<typeof aiFinalResponseSchema>;
export declare const webDataSummarySchema: z.ZodObject<{
    title: z.ZodString;
    shortSummary: z.ZodString;
    url: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    title: string;
    shortSummary: string;
    url: string[];
}, {
    title: string;
    shortSummary: string;
    url: string[];
}>;
export type webData = z.infer<typeof webDataSummarySchema>;
//# sourceMappingURL=zod.d.ts.map