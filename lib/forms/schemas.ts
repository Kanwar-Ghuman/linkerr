import { z } from "zod";

const JobType = z.enum(["remote", "onsite", "hybrid"], {
  errorMap: (issue) => {
    if (issue.code === "invalid_enum_value") {
      return {
        message:
          "Invalid 'remote' field. Must be one of: 'remote', 'onsite', or 'hybrid'.",
      };
    }
    return { message: "Invalid value for 'remote' field." };
  },
});

export const JobValidation = z.object({
  jobTitle: z
    .string({
      required_error: "'jobTitle' is required.",
    })
    .min(1, { message: "'jobTitle' cannot be empty." }),

  jobDescription: z
    .string({
      required_error: "'jobDescription' is required.",
    })
    .min(1, { message: "'jobDescription' cannot be empty." }),

  jobType: z.string().optional().or(z.literal("")),
  roleLocation: z.string().optional().or(z.literal("")),

  companyName: z
    .string({
      required_error: "'companyName' is required.",
    })
    .min(1, { message: "'companyName' cannot be empty." }),

  remote: JobType,

  // Now expects an array of strings from the multi-select input
  skills: z.preprocess((val) => {
    if (typeof val === "string") {
      return val.split("/");
    }
    return val;
  }, z.array(z.string().min(1, { message: "Skill entry cannot be empty." })).nonempty({ message: "'skills' must contain at least one skill." })),

  pay: z.preprocess(
    (val) => (typeof val === "string" ? parseFloat(val) : val),
    z
      .number({
        required_error: "'pay' is required.",
      })
      .min(0, { message: "'pay' cannot be negative." })
  ),
});

export enum JobTypeEnum {
  remote = "remote",
  onsite = "onsite",
  hybrid = "hybrid",
}

export interface Job {
  jobTitle: string;
  jobDescription: string;
  jobType?: string;
  roleLocation?: string;
  companyName: string;
  remote: JobTypeEnum;
  skills: string[];
  pay: string;
}

export const StudentProfileSchema = z.object({
  major: z.string().optional(),
  university: z.string().optional(),
  gradYear: z.number().min(2020).max(2030).optional(),
  skills: z.preprocess((val) => {
    if (typeof val === "string") {
      return val.split("/");
    }
    return val;
  }, z.array(z.string().min(1, { message: "Skill entry cannot be empty." })).nonempty({ message: "'skills' must contain at least one skill." })),
  resume: z.string().optional(),
});

export interface StudentProfileType {
  major: string;
  resume: string;
  university: string;
  skills: string;
  gradYear: number;
}
