"use client";
import React from "react";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

export default function SignUpPage() {
  // Add form initialization
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  // Add onSubmit handler
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className="min-h-screen flex overflow-hidden relative">
      <div className="w-1/2 bg-white rounded-tr-[50px] rounded-br-[50px] relative z-10">
        <div className="p-8">
          <Image
            src="/linkerr.png"
            alt="Linkerr Logo"
            width={150}
            height={50}
            className="object-contain"
            priority
          />
          <div className="pl-[220px]">
            {" "}
            {/* Adjusted padding for vertical alignment */}
            <h1
              className="text-4xl font-bold mt-16"
              style={{ color: "#000270" }}
            >
              Create Account
            </h1>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 mt-8"
              >
                {/* Form fields */}
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Full Name"
                            {...field}
                            className="w-[400px] h-[50px]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="Enter your email"
                            {...field}
                            className="w-[400px] h-[50px]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Enter your password"
                            {...field}
                            className="w-[400px] h-[50px]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Checkbox */}
                <div className="flex items-center gap-2">
                  <Checkbox id="terms" />
                  <label htmlFor="terms" className="text-sm font-medium">
                    I agree with Terms and Policy
                  </label>
                </div>

                {/* Buttons */}
                <div className="flex flex-col space-y-4">
                  <Button
                    type="submit"
                    className="w-[400px] h-[50px] bg-[#5771FF]"
                  >
                    Sign Up
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-[400px] h-[50px]"
                  >
                    <Image
                      src="/google.png"
                      alt="Google"
                      width={20}
                      height={20}
                      className="mr-2"
                    />
                    Sign in with Google
                  </Button>
                </div>

                <div className="text-center mt-4 -ml-60">
                  {" "}
                  <span className="text-gray-600">
                    Already have an account?{" "}
                  </span>
                  <a
                    href="/login"
                    className="text-[#5771FF] font-semibold hover:underline "
                  >
                    Log in
                  </a>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>

      <div className="w-full h-full absolute" style={{ background: "#A2B0FF" }}>
        <div className="flex justify-end h-screen">
          <Image
            src="/image.png"
            alt="Right side image"
            width={800}
            height={1000}
            className="object-contain h-full"
            priority
          />
        </div>
      </div>
    </div>
  );
}
