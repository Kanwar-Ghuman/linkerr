import { Decimal } from "@prisma/client/runtime/library";
import { z } from "zod";

// 1. Define the JobType enum validation with a custom error message
const JobType = z.enum(["remote", "onsite", "hybrid"], {
    errorMap: (issue) => {
        if (issue.code === "invalid_enum_value") {
            return {
                message: "Invalid 'remote' field. Must be one of: 'remote', 'onsite', or 'hybrid'.",
            };
        }
        return { message: "Invalid value for 'remote' field." };
    },
});

// 2. Define the Job schema validation
export const JobValidation = z.object({
    // 'jobTitle' must be a string and cannot be empty
    jobTitle: z
        .string({
            required_error: "'jobTitle' is required.",
        })
        .min(1, { message: "'jobTitle' cannot be empty." }),

    // 'jobDesctiption' must be a string and cannot be empty
    jobDesctiption: z
        .string({
            required_error: "'jobDesctiption' is required.",
        })
        .min(1, { message: "'jobDesctiption' cannot be empty." }),

    // Optional fields (can be undefined or empty string)
    jobType: z.string().optional().or(z.literal("")),
    roleLocation: z.string().optional().or(z.literal("")),

    // 'companyName' must be a string and cannot be empty
    companyName: z
        .string({
            required_error: "'companyName' is required.",
        })
        .min(1, { message: "'companyName' cannot be empty." }),

    // 'remote' must match the JobType enum
    remote: JobType,

    // 'skills' must be a non-empty array of strings
    skills: z
        .array(z.string().min(1, { message: "Skill entry cannot be empty." }))
        .nonempty({ message: "'skills' must contain at least one skill." }),

    // 'pay' is a Decimal in Prisma. We'll parse it as a number in Zod.
    // In your actual implementation, ensure your incoming data is in the correct format (string or number).
    pay: z.preprocess(
        (val) => {
            // If 'val' is a string, attempt to parse as a float
            if (typeof val === "string") {
                return parseFloat(val);
            }
            return val;
        },
        z.number({
            required_error: "'pay' is required.",
        }).min(0, { message: "'pay' cannot be negative." })
    ),

    // 'education' must be a non-empty array of strings
    education: z
        .array(
            z.string().min(1, { message: "Education entry cannot be empty." })
        )
        .nonempty({ message: "'education' must contain at least one entry." }),
});

// Reflects your enum in TypeScript
export enum JobTypeEnum {
    remote = "remote",
    onsite = "onsite",
    hybrid = "hybrid",
}

// Interface matching your Prisma model
export interface Job {
    jobTitle: string;
    jobDesctiption: string;
    jobType?: string;        // optional
    roleLocation?: string;   // optional
    companyName: string;
    remote: JobTypeEnum;         // must be one of the enum values
    skills: string[];        // required array of strings
    pay: Decimal;            // matches Prisma Decimal
    education: string[];     // required array of strings
}
