import { z } from "zod";
export declare const myIpInfoSchema: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
export declare const targetIpInfoSchema: z.ZodObject<{
    ip: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    ip?: string | undefined;
}, {
    ip?: string | undefined;
}>;
export declare function getMyIpInfo(): Promise<unknown>;
export declare function getTargetIpInfo(ip: string): Promise<unknown>;
