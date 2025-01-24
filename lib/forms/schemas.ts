import { z } from "zod";

export const createJobListingRequest = z.object({
    jobTitle: z.string({
        required_error: "Job Title is required",
    }),
    jobDescription: z.string({
        required_error: "Job Description is required",
    }),
    contactEmail: z.string({
        required_error: "Contact Email is required",
    }),
    // tag: z.string({
    //     required_error: "Job Tag is required",
    // }),
});
