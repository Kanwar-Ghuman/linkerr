/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { FormInput } from "@/components/linkerr/inputs/FormInput";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import { StudentProfileType as Student, StudentProfileSchema } from "@/lib/forms/schemas";

const CreateProfile = () => {
    const defaultValues: Student = {
        major: "",
        university: "",
        gradYear: 2024, // Default graduation year; adjust as needed
        skills: "",
        resume: "",
    };

    const form = useForm({ defaultValues, resolver: zodResolver(StudentProfileSchema) });
    const router = useRouter();

    const onSubmit = async (data: Student) => {
        console.log("Submitting student profile:", data);
        try {
            const response = await fetch("/api/student", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Error creating student profile:", errorData);
                return;
            }

            const result = await response.json();
            console.log("Student profile created successfully:", result);
            router.push("/student/dashboard");
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
                        Create Student Profile
                    </h1>
                    <p className="text-gray-600">
                        Set up your profile and let employers find you
                    </p>
                </div>

                {/* Main Form Container */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-8">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            {/* Section: Basic Information */}
                            <div className="space-y-6">
                                <div className="border-b pb-3">
                                    <h2 className="text-xl font-semibold text-gray-800">
                                        Basic Information
                                    </h2>
                                    <p className="text-sm text-gray-500 mt-1">
                                        Enter your academic and personal details
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                    {/* Major */}
                                    <div className="space-y-4">
                                        <FormInput
                                            name="major"
                                            label="Major"
                                            placeholder="Computer Science"
                                            description="What is your major?"
                                            form={form}
                                            isRequired
                                        />
                                    </div>

                                    {/* University */}
                                    <div className="space-y-4">
                                        <FormInput
                                            name="university"
                                            label="University"
                                            placeholder="University Name"
                                            description="Where do you study?"
                                            form={form}
                                            isRequired
                                        />
                                    </div>

                                    {/* Graduation Year */}
                                    <div className="space-y-4">
                                        <FormInput
                                            name="gradYear"
                                            label="Graduation Year"
                                            placeholder="2024"
                                            description="What year are you graduating?"
                                            form={form}
                                            isRequired
                                        />
                                    </div>

                                    {/* Skills */}
                                    <div className="space-y-4">
                                        <FormInput
                                            name="skills"
                                            label="Skills"
                                            placeholder="e.g., JavaScript, React, Node.js"
                                            description="List your skills (/ separated)"
                                            form={form}
                                            isRequired={false}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Section: Resume */}
                            <div className="space-y-6 pt-6">
                                <div className="border-b pb-3">
                                    <h2 className="text-xl font-semibold text-gray-800">
                                        Resume
                                    </h2>
                                    <p className="text-sm text-gray-500 mt-1">
                                        Provide a link to your resume
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    <FormInput
                                        name="resume"
                                        label="Resume URL"
                                        placeholder="https://example.com/resume.pdf"
                                        description="Enter the URL of your resume"
                                        form={form}
                                        isRequired={false}
                                    />
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="pt-6 border-t">
                                <Button
                                    type="submit"
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-[1.02]"
                                >
                                    Submit Profile
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
