/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState } from "react";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";

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
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

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
              className="text-3xl font-medium mt-16"
              style={{ color: "#000270" }}
            >
              Create Account
            </h1>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-12 mt-8"
              >
                {/* Form fields */}
                <div className="space-y-12">
                  {" "}
                  {/* Increased from space-y-8 to space-y-12 */}
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                            <Input
                              placeholder="Full Name"
                              {...field}
                              className="w-[400px] h-[50px] pl-10"
                            />
                          </div>
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
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                            <Input
                              type="email"
                              placeholder="Enter your email"
                              {...field}
                              className="w-[400px] h-[50px] pl-10"
                            />
                          </div>
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
                          <div className="relative w-[400px]">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                            <Input
                              type={showPassword ? "text" : "password"}
                              placeholder="Enter your password"
                              {...field}
                              className="w-[400px] h-[50px] pl-10 pr-12"
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                              <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="text-gray-400 hover:text-gray-600 focus:outline-none"
                              >
                                {showPassword ? (
                                  <EyeOff className="h-5 w-5" />
                                ) : (
                                  <Eye className="h-5 w-5" />
                                )}
                              </button>
                            </div>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Terms and Policy Checkbox */}
                <div className="flex items-center gap-2 mt-4">
                  <Checkbox id="terms" />
                  <label htmlFor="terms" className="text-sm font-medium">
                    I agree with <span className="text-[#5771FF]">Terms</span>{" "}
                    and <span className="text-[#5771FF]">Policy</span>
                  </label>
                </div>

                {/* Buttons */}
                <div className="flex flex-col space-y-8 mt-4">
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
                    href="login"
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
