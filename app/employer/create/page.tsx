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
    remote: JobTypeEnum.remote,
    skills: [],
    pay: "0.0",
    education: [],
  };

  const form = useForm({
    resolver: zodResolver(JobValidation),
    defaultValues,
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [submittedData, setSubmittedData] = useState<Job>(defaultValues);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const router = useRouter();

  async function onSubmit(data: Job) {
    setLoading(true);
    setError("");
    try {
      const formattedData = {
        ...data,
      };
      console.log("Formatted data:", formattedData);

      const response = await fetch("/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("API error:", errorData);
        throw new Error(errorData.message || "Request failed");
      }

      const responseData = await response.json();
      console.log("API response:", responseData);

      // await fetch("/api/admin/auto-match", {
      //     method: "POST",
      //     headers: {
      //         "Content-Type": "application/json",
      //     },
      // });

      setSuccess(true);
      setSubmittedData(formattedData);
      form.reset(defaultValues);
      onOpen();

      setTimeout(() => {
        setSuccess(false);
      }, 2000);
    } catch (err) {
      console.error("Error details:", err);
      // setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  }

  const handleReturnToDashboard = () => {
    router.push("/employer/dashboard");
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

                <div className="space-y-4">
                  <FormInput
                    name="education"
                    label="Education Requirement"
                    form={form}
                    description="What is the requirement for education?"
                    placeholder="B.S In Mechanical Engineering"
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
                  label="Requried Skills"
                  form={form}
                  description="What are some skills that are requried for this job?"
                  placeholder="C++/Javascript"
                  isRequired
                />
                <FormInput
                  name="jobType"
                  label="Job Type"
                  form={form}
                  description=""
                  placeholder="Example Company"
                  isRequired={false}
                />
                <p
                  className={cn(
                    "text-danger fill-danger",
                    error ? "" : "hidden"
                  )}
                >
                  <BsExclamationCircle />
                  <span>{error}</span>
                </p>
              </div>

              {/* Submit Button */}
              <div className="pt-6 border-t">
                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-[1.02]"
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
              </div>
            </form>
          </Form>
        </div>
      </div>

      {/* Enhanced Success Modal */}
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
      >
        <ModalContent className="bg-white rounded-xl shadow-xl p-8">
          {() => (
            <>
              <ModalHeader className="flex flex-col items-center text-center pb-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <div className="w-8 h-8 text-green-600">✓</div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  Job Posted Successfully!
                </h3>
              </ModalHeader>

              <ModalBody className="py-6">
                {submittedData && (
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-6 rounded-lg space-y-4">
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
                    </div>
                  </div>
                )}
              </ModalBody>

              <ModalFooter className="flex justify-center pt-4">
                <NextUIButton
                  color="primary"
                  onPress={handleReturnToDashboard}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-[1.02]"
                >
                  Return to Dashboard
                </NextUIButton>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default CreateRequest;
