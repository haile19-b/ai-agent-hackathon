export declare const AgentStateAnnotation: import("@langchain/langgraph").AnnotationRoot<{
    userInput: {
        (): import("@langchain/langgraph").LastValue<string>;
        (annotation: import("@langchain/langgraph").SingleReducer<string, string>): import("@langchain/langgraph").BinaryOperatorAggregate<string, string>;
        Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
    };
    deviceName: {
        (): import("@langchain/langgraph").LastValue<string>;
        (annotation: import("@langchain/langgraph").SingleReducer<string, string>): import("@langchain/langgraph").BinaryOperatorAggregate<string, string>;
        Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
    };
    deviceFound: {
        (): import("@langchain/langgraph").LastValue<boolean>;
        (annotation: import("@langchain/langgraph").SingleReducer<boolean, boolean>): import("@langchain/langgraph").BinaryOperatorAggregate<boolean, boolean>;
        Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
    };
    deviceTitle: {
        (): import("@langchain/langgraph").LastValue<string>;
        (annotation: import("@langchain/langgraph").SingleReducer<string, string>): import("@langchain/langgraph").BinaryOperatorAggregate<string, string>;
        Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
    };
    guidesFound: {
        (): import("@langchain/langgraph").LastValue<boolean>;
        (annotation: import("@langchain/langgraph").SingleReducer<boolean, boolean>): import("@langchain/langgraph").BinaryOperatorAggregate<boolean, boolean>;
        Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
    };
    guides: {
        (): import("@langchain/langgraph").LastValue<any[]>;
        (annotation: import("@langchain/langgraph").SingleReducer<any[], any[]>): import("@langchain/langgraph").BinaryOperatorAggregate<any[], any[]>;
        Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
    };
    selectedGuideId: {
        (): import("@langchain/langgraph").LastValue<number>;
        (annotation: import("@langchain/langgraph").SingleReducer<number, number>): import("@langchain/langgraph").BinaryOperatorAggregate<number, number>;
        Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
    };
    guideDetails: {
        (): import("@langchain/langgraph").LastValue<any>;
        (annotation: import("@langchain/langgraph").SingleReducer<any, any>): import("@langchain/langgraph").BinaryOperatorAggregate<any, any>;
        Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
    };
    finalResponse: {
        (): import("@langchain/langgraph").LastValue<string>;
        (annotation: import("@langchain/langgraph").SingleReducer<string, string>): import("@langchain/langgraph").BinaryOperatorAggregate<string, string>;
        Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
    };
    webSearch: {
        (): import("@langchain/langgraph").LastValue<boolean>;
        (annotation: import("@langchain/langgraph").SingleReducer<boolean, boolean>): import("@langchain/langgraph").BinaryOperatorAggregate<boolean, boolean>;
        Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
    };
    webResult: {
        (): import("@langchain/langgraph").LastValue<object>;
        (annotation: import("@langchain/langgraph").SingleReducer<object, object>): import("@langchain/langgraph").BinaryOperatorAggregate<object, object>;
        Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
    };
    cleaned: {
        (): import("@langchain/langgraph").LastValue<boolean>;
        (annotation: import("@langchain/langgraph").SingleReducer<boolean, boolean>): import("@langchain/langgraph").BinaryOperatorAggregate<boolean, boolean>;
        Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
    };
    cleanedData: {
        (): import("@langchain/langgraph").LastValue<object>;
        (annotation: import("@langchain/langgraph").SingleReducer<object, object>): import("@langchain/langgraph").BinaryOperatorAggregate<object, object>;
        Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
    };
    finalData: {
        (): import("@langchain/langgraph").LastValue<object>;
        (annotation: import("@langchain/langgraph").SingleReducer<object, object>): import("@langchain/langgraph").BinaryOperatorAggregate<object, object>;
        Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
    };
    finalSummary: {
        (): import("@langchain/langgraph").LastValue<object>;
        (annotation: import("@langchain/langgraph").SingleReducer<object, object>): import("@langchain/langgraph").BinaryOperatorAggregate<object, object>;
        Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
    };
}>;
export type AgentState = typeof AgentStateAnnotation.State;
export declare const agent: import("@langchain/langgraph").CompiledStateGraph<{
    userInput: string;
    deviceName: string;
    deviceFound: boolean;
    deviceTitle: string;
    guidesFound: boolean;
    guides: any[];
    selectedGuideId: number;
    guideDetails: any;
    finalResponse: string;
    webSearch: boolean;
    webResult: object;
    cleaned: boolean;
    cleanedData: object;
    finalData: object;
    finalSummary: object;
}, {
    userInput?: string;
    deviceName?: string;
    deviceFound?: boolean;
    deviceTitle?: string;
    guidesFound?: boolean;
    guides?: any[];
    selectedGuideId?: number;
    guideDetails?: any;
    finalResponse?: string;
    webSearch?: boolean;
    webResult?: object;
    cleaned?: boolean;
    cleanedData?: object;
    finalData?: object;
    finalSummary?: object;
}, "__start__", {
    userInput: {
        (): import("@langchain/langgraph").LastValue<string>;
        (annotation: import("@langchain/langgraph").SingleReducer<string, string>): import("@langchain/langgraph").BinaryOperatorAggregate<string, string>;
        Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
    };
    deviceName: {
        (): import("@langchain/langgraph").LastValue<string>;
        (annotation: import("@langchain/langgraph").SingleReducer<string, string>): import("@langchain/langgraph").BinaryOperatorAggregate<string, string>;
        Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
    };
    deviceFound: {
        (): import("@langchain/langgraph").LastValue<boolean>;
        (annotation: import("@langchain/langgraph").SingleReducer<boolean, boolean>): import("@langchain/langgraph").BinaryOperatorAggregate<boolean, boolean>;
        Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
    };
    deviceTitle: {
        (): import("@langchain/langgraph").LastValue<string>;
        (annotation: import("@langchain/langgraph").SingleReducer<string, string>): import("@langchain/langgraph").BinaryOperatorAggregate<string, string>;
        Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
    };
    guidesFound: {
        (): import("@langchain/langgraph").LastValue<boolean>;
        (annotation: import("@langchain/langgraph").SingleReducer<boolean, boolean>): import("@langchain/langgraph").BinaryOperatorAggregate<boolean, boolean>;
        Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
    };
    guides: {
        (): import("@langchain/langgraph").LastValue<any[]>;
        (annotation: import("@langchain/langgraph").SingleReducer<any[], any[]>): import("@langchain/langgraph").BinaryOperatorAggregate<any[], any[]>;
        Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
    };
    selectedGuideId: {
        (): import("@langchain/langgraph").LastValue<number>;
        (annotation: import("@langchain/langgraph").SingleReducer<number, number>): import("@langchain/langgraph").BinaryOperatorAggregate<number, number>;
        Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
    };
    guideDetails: {
        (): import("@langchain/langgraph").LastValue<any>;
        (annotation: import("@langchain/langgraph").SingleReducer<any, any>): import("@langchain/langgraph").BinaryOperatorAggregate<any, any>;
        Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
    };
    finalResponse: {
        (): import("@langchain/langgraph").LastValue<string>;
        (annotation: import("@langchain/langgraph").SingleReducer<string, string>): import("@langchain/langgraph").BinaryOperatorAggregate<string, string>;
        Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
    };
    webSearch: {
        (): import("@langchain/langgraph").LastValue<boolean>;
        (annotation: import("@langchain/langgraph").SingleReducer<boolean, boolean>): import("@langchain/langgraph").BinaryOperatorAggregate<boolean, boolean>;
        Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
    };
    webResult: {
        (): import("@langchain/langgraph").LastValue<object>;
        (annotation: import("@langchain/langgraph").SingleReducer<object, object>): import("@langchain/langgraph").BinaryOperatorAggregate<object, object>;
        Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
    };
    cleaned: {
        (): import("@langchain/langgraph").LastValue<boolean>;
        (annotation: import("@langchain/langgraph").SingleReducer<boolean, boolean>): import("@langchain/langgraph").BinaryOperatorAggregate<boolean, boolean>;
        Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
    };
    cleanedData: {
        (): import("@langchain/langgraph").LastValue<object>;
        (annotation: import("@langchain/langgraph").SingleReducer<object, object>): import("@langchain/langgraph").BinaryOperatorAggregate<object, object>;
        Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
    };
    finalData: {
        (): import("@langchain/langgraph").LastValue<object>;
        (annotation: import("@langchain/langgraph").SingleReducer<object, object>): import("@langchain/langgraph").BinaryOperatorAggregate<object, object>;
        Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
    };
    finalSummary: {
        (): import("@langchain/langgraph").LastValue<object>;
        (annotation: import("@langchain/langgraph").SingleReducer<object, object>): import("@langchain/langgraph").BinaryOperatorAggregate<object, object>;
        Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
    };
}, {
    userInput: {
        (): import("@langchain/langgraph").LastValue<string>;
        (annotation: import("@langchain/langgraph").SingleReducer<string, string>): import("@langchain/langgraph").BinaryOperatorAggregate<string, string>;
        Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
    };
    deviceName: {
        (): import("@langchain/langgraph").LastValue<string>;
        (annotation: import("@langchain/langgraph").SingleReducer<string, string>): import("@langchain/langgraph").BinaryOperatorAggregate<string, string>;
        Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
    };
    deviceFound: {
        (): import("@langchain/langgraph").LastValue<boolean>;
        (annotation: import("@langchain/langgraph").SingleReducer<boolean, boolean>): import("@langchain/langgraph").BinaryOperatorAggregate<boolean, boolean>;
        Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
    };
    deviceTitle: {
        (): import("@langchain/langgraph").LastValue<string>;
        (annotation: import("@langchain/langgraph").SingleReducer<string, string>): import("@langchain/langgraph").BinaryOperatorAggregate<string, string>;
        Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
    };
    guidesFound: {
        (): import("@langchain/langgraph").LastValue<boolean>;
        (annotation: import("@langchain/langgraph").SingleReducer<boolean, boolean>): import("@langchain/langgraph").BinaryOperatorAggregate<boolean, boolean>;
        Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
    };
    guides: {
        (): import("@langchain/langgraph").LastValue<any[]>;
        (annotation: import("@langchain/langgraph").SingleReducer<any[], any[]>): import("@langchain/langgraph").BinaryOperatorAggregate<any[], any[]>;
        Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
    };
    selectedGuideId: {
        (): import("@langchain/langgraph").LastValue<number>;
        (annotation: import("@langchain/langgraph").SingleReducer<number, number>): import("@langchain/langgraph").BinaryOperatorAggregate<number, number>;
        Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
    };
    guideDetails: {
        (): import("@langchain/langgraph").LastValue<any>;
        (annotation: import("@langchain/langgraph").SingleReducer<any, any>): import("@langchain/langgraph").BinaryOperatorAggregate<any, any>;
        Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
    };
    finalResponse: {
        (): import("@langchain/langgraph").LastValue<string>;
        (annotation: import("@langchain/langgraph").SingleReducer<string, string>): import("@langchain/langgraph").BinaryOperatorAggregate<string, string>;
        Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
    };
    webSearch: {
        (): import("@langchain/langgraph").LastValue<boolean>;
        (annotation: import("@langchain/langgraph").SingleReducer<boolean, boolean>): import("@langchain/langgraph").BinaryOperatorAggregate<boolean, boolean>;
        Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
    };
    webResult: {
        (): import("@langchain/langgraph").LastValue<object>;
        (annotation: import("@langchain/langgraph").SingleReducer<object, object>): import("@langchain/langgraph").BinaryOperatorAggregate<object, object>;
        Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
    };
    cleaned: {
        (): import("@langchain/langgraph").LastValue<boolean>;
        (annotation: import("@langchain/langgraph").SingleReducer<boolean, boolean>): import("@langchain/langgraph").BinaryOperatorAggregate<boolean, boolean>;
        Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
    };
    cleanedData: {
        (): import("@langchain/langgraph").LastValue<object>;
        (annotation: import("@langchain/langgraph").SingleReducer<object, object>): import("@langchain/langgraph").BinaryOperatorAggregate<object, object>;
        Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
    };
    finalData: {
        (): import("@langchain/langgraph").LastValue<object>;
        (annotation: import("@langchain/langgraph").SingleReducer<object, object>): import("@langchain/langgraph").BinaryOperatorAggregate<object, object>;
        Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
    };
    finalSummary: {
        (): import("@langchain/langgraph").LastValue<object>;
        (annotation: import("@langchain/langgraph").SingleReducer<object, object>): import("@langchain/langgraph").BinaryOperatorAggregate<object, object>;
        Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
    };
}, import("@langchain/langgraph").StateDefinition, unknown, unknown, unknown>;
//# sourceMappingURL=graph.d.ts.map