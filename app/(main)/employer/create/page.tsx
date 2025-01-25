"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormInput } from "@/components/linkerr/inputs/FormInput";
import { FormDropDownInput } from "@/components/linkerr/inputs/FormDropDownInput";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button as NextUIButton,
    useDisclosure,
} from "@heroui/react";

import { zodResolver } from "@hookform/resolvers/zod";
import { JobValidation, JobTypeEnum, Job } from "@/lib/forms/schemas";
import { BsExclamationCircle } from "react-icons/bs";


const CreateRequest = () => {
    const defaultValues: Job = {
        jobTitle: "",
        jobDescription: "",
        jobType: "",
        roleLocation: "",
        companyName: "",
        remote: JobTypeEnum.remote, // could also be JobType.onsite or JobType.hybrid
        skills: [],
        pay: "0.0",    // Default 0 as a Decimal
        education: [],
    };

    const form = useForm({
        resolver: zodResolver(JobValidation),
        defaultValues,
    });

    const [loading] = useState(false);
    const [success] = useState(false);
    const [error] = useState("");
    const [submittedData] = useState<Job>(defaultValues);
    const { isOpen, onOpenChange } = useDisclosure();
    const router = useRouter();

    async function onSubmit(data: Job) {
        console.log("Form submitted with data:", data);
        // setLoading(true);
        // setError("");
        // try {
        //     const formattedData = {
        //         ...data,
        //     };
        //     console.log("Formatted data:", formattedData);
        //
        //     const response = await fetch("/api/jobs", {
        //         method: "POST",
        //         headers: {
        //             "Content-Type": "application/json",
        //         },
        //         body: JSON.stringify(formattedData),
        //     });
        //
        //     if (!response.ok) {
        //         const errorData = await response.json();
        //         console.error("API error:", errorData);
        //         throw new Error(errorData.message || "Request failed");
        //     }
        //
        //     const responseData = await response.json();
        //     console.log("API response:", responseData);
        //
        //     await fetch("/api/admin/auto-match", {
        //         method: "POST",
        //         headers: {
        //             "Content-Type": "application/json",
        //         },
        //     });
        //
        //     setSuccess(true);
        //     setSubmittedData(formattedData);
        //     form.reset(defaultValues);
        //     onOpen();
        //
        //     setTimeout(() => {
        //         setSuccess(false);
        //     }, 2000);
        // } catch (err) {
        //     console.error("Error details:", err);
        //     // setError(err.message || "An unexpected error occurred.");
        // } finally {
        //     setLoading(false);
        // }
    }

    const handleReturnToDashboard = () => {
        router.push("/employer/dashboard");
    };

    return (
        <>
            <div className="flex items-center justify-center m-4 pt-8">
                <div className="w-full md:w-1/2">
                    <h1 className="text-2xl mb-10">Create Job Listing</h1>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className={cn("space-y-8", {
                                "opacity-50 pointer-events-none": loading,
                            })}
                        >
                            <FormInput
                                name="jobTitle"
                                label="Job Title"
                                placeholder="Software Engineer Intern"
                                description=""
                                form={form}
                                isRequired
                            />
                            <FormInput
                                name="jobDesctiption"
                                label="Job Description"
                                placeholder=""
                                description="What does this job entail?"
                                form={form}
                                isRequired
                            />

                            <FormDropDownInput
                                name="remote"
                                label="Attendance"
                                options={[
                                    {
                                        group: [
                                            { value: "remote", label: "Remote" },
                                            { value: "onsite", label: "In-Person" },
                                            { value: "hybrid", label: "Hybrid" },
                                        ]
                                    }
                                ]}
                                form={form}
                                description="What is the preference for attendance?"
                                isRequired
                            />
                            <FormInput
                                name="pay"
                                label="Pay"
                                form={form}
                                description="What is the estimated payment range?"
                                isRequired
                                placeholder="40.0"
                            />

                            <FormInput
                                name="education"
                                label="Education Requirement"
                                form={form}
                                description="What is the requirement for education?"
                                placeholder="B.S In Mechanical Engineering"
                                isRequired
                            />
                            <FormInput
                                name="jobDescription"
                                label="Education Requirement"
                                form={form}
                                description="What is the requirement for education?"
                                placeholder="B.S In Mechanical Engineering"
                                isRequired
                            />
                            <p
                                className={cn("text-danger fill-danger", error ? "" : "hidden")}
                            >
                                <BsExclamationCircle />
                                <span>{error}</span>
                            </p>
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

            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                isDismissable={false}
                isKeyboardDismissDisabled={true}
            >
                <ModalContent>
                    {() => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                Request Successfully Made ✅
                            </ModalHeader>
                            <ModalBody>
                                {submittedData && (
                                    <>
                                        <p>
                                            <strong>Job Title:</strong> {submittedData.jobTitle}
                                        </p>
                                        <p>
                                            <strong>CompanyName:</strong>{" "}
                                            {submittedData.companyName}
                                        </p>
                                        <p>
                                            <strong>Pay:</strong> {submittedData.pay.toString()}
                                        </p>
                                        <p>
                                            <strong>Education:</strong> {submittedData.education}
                                        </p>
                                        <p>
                                            <strong>Location:</strong> {submittedData.roleLocation}
                                        </p>
                                    </>
                                )}
                            </ModalBody>
                            <ModalFooter>
                                <NextUIButton color="primary" onPress={handleReturnToDashboard}>
                                    Return to Dashboard
                                </NextUIButton>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};

export default CreateRequest;
