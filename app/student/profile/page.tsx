/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { FormInput } from "@/components/linkerr/inputs/FormInput";
import { FormDropDownInput } from "@/components/linkerr/inputs/FormDropDownInput";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import { JobValidation, JobTypeEnum, Job } from "@/lib/forms/schemas";

const CreateProfile = () => {
    const defaultValues: Job = {
        jobTitle: "",
        jobDescription: "",
        jobType: "",
        roleLocation: "",
        companyName: "",
        remote: JobTypeEnum.remote,
        skills: [],
        pay: "0.0",
    };

    const form = useForm({ defaultValues, resolver: zodResolver(JobValidation) });
    const router = useRouter();

    const onSubmit = async (data: Job) => {
        console.log("Submitting data:", data);
        try {
            const response = await fetch("/api/jobs", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Error creating job:", errorData);
                return;
            }

            const result = await response.json();
            console.log("Job created successfully:", result);
            router.push("/employer/dashboard");
        } catch (error) {
            console.error("Submission error:", error);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-50 to-white animate-gradient-xy">
            <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">
                        Create Job Posting
                    </h1>
                    <p className="text-gray-600">
                        Post a new opportunity and find the perfect candidate
                    </p>
                </div>

                {/* Main Form Container */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-8">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            {/* Section: Basic Details */}
                            <div className="space-y-6">
                                <div className="border-b pb-3">
                                    <h2 className="text-xl font-semibold text-gray-800">
                                        Basic Details
                                    </h2>
                                    <p className="text-sm text-gray-500 mt-1">
                                        Enter the fundamental job information
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                    {/* First Row */}
                                    <div className="space-y-4">
                                        <FormInput
                                            name="jobTitle"
                                            label="Job Title"
                                            placeholder="Software Engineer Intern"
                                            description="What position are you hiring for?"
                                            form={form}
                                            isRequired
                                        />
                                    </div>

                                    <div className="space-y-4">
                                        <FormInput
                                            name="roleLocation"
                                            label="Location"
                                            placeholder="San Francisco, CA"
                                            description="Where is this position located?"
                                            form={form}
                                            isRequired
                                        />
                                    </div>

                                    {/* Second Row */}
                                    <div className="space-y-4">
                                        <FormInput
                                            name="companyName"
                                            label="Company Name"
                                            form={form}
                                            description="What is the name of the employer?"
                                            placeholder="Example Company"
                                            isRequired
                                        />
                                    </div>

                                    <div className="space-y-4">
                                        <FormInput
                                            name="pay"
                                            label="Pay"
                                            placeholder="Enter expected salary"
                                            description="What is the expected compensation?"
                                            form={form}
                                            isRequired
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Section: Job Description */}
                            <div className="space-y-6 pt-6">
                                <div className="border-b pb-3">
                                    <h2 className="text-xl font-semibold text-gray-800">
                                        Job Description
                                    </h2>
                                    <p className="text-sm text-gray-500 mt-1">
                                        Provide detailed information about the role
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    <FormInput
                                        name="jobDescription"
                                        label="Job Description"
                                        placeholder=""
                                        description="What does this job entail?"
                                        form={form}
                                        isRequired
                                    />
                                </div>

                                <FormDropDownInput
                                    name="remote"
                                    label="Attendance"
                                    options={[
                                        {
                                            group: [
                                                { value: "remote", label: "Remote" },
                                                { value: "onsite", label: "In-Person" },
                                                { value: "hybrid", label: "Hybrid" },
                                            ],
                                        },
                                    ]}
                                    form={form}
                                    description="What is the preference for attendance?"
                                    isRequired
                                />

                                <FormInput
                                    name="skills"
                                    label="Skills"
                                    form={form}
                                    description="Please enter the skills required"
                                    placeholder="NodeJs"
                                    isRequired={false}
                                />
                                <FormInput
                                    name="jobType"
                                    label="Job Type"
                                    form={form}
                                    description=""
                                    placeholder="Example Company"
                                    isRequired={false}
                                />
                            </div>

                            {/* Submit Button */}
                            <div className="pt-6 border-t">
                                <Button
                                    type="submit"
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-[1.02]"
                                >
                                    Submit
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default CreateProfile;
