"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { LinkerrInput } from "@/components/linkerr/inputs/FormInput";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { cn } from "@/lib/utils";

import { zodResolver } from "@hookform/resolvers/zod";
import { createJobListingRequest } from "@/lib/forms/schemas";

const CreateRequest = () => {
    interface JobListing {
        jobTitle: string
        jobDescription: string
        contactEmail: string
        // tag: string
    }

    const defaultValues: JobListing = {
        jobTitle: "",
        jobDescription: "",
        contactEmail: "",
        // tag: "",
    }

    const form = useForm({
        resolver: zodResolver(createJobListingRequest),
        defaultValues,
    });

    const [loading] = useState(false);
    const [success] = useState(false);

    async function onSubmit(data: JobListing) {
        console.log("Form submitted with data:", data);
    }

    return (
        <>
            <div className="flex items-center justify-center m-4 pt-8">
                <div className="w-full md:w-1/2">
                    <h1 className="text-2xl mb-10">Create a Job Listing</h1>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className={cn("space-y-8", {
                                "opacity-50 pointer-events-none": loading,
                            })}
                        >
                            <LinkerrInput
                                name="jobTitle"
                                label="Job Title"
                                placeholder="Role: Senior Engineer"
                                description="Enter the primary job title"
                                form={form}
                                isRequired
                            />
                            <LinkerrInput
                                name="jobDescription"
                                label="Job Description"
                                placeholder="Applicant will help backend engineers"
                                description="Enter what the job entails"
                                form={form}
                                isRequired
                            />
                            <LinkerrInput
                                name="contactEmail"
                                label="Contact Email"
                                placeholder="contact@company.com"
                                description="Email to contact for queries"
                                form={form}
                                isRequired
                            />
                            <Button
                                className={cn("w-full mb-7", {
                                    "bg-green-500": success,
                                    "hover:bg-green-600": success,
                                })}
                                type="submit"
                                disabled={loading || success}
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Please wait
                                    </>
                                ) : success ? (
                                    "Success"
                                ) : (
                                    "Submit"
                                )}
                            </Button>
                        </form>
                    </Form>
                </div>
            </div>
        </>
    );
};

export default CreateRequest;
