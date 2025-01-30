/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState } from "react";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { signIn } from "next-auth/react";

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
import { useToast } from "@/hooks/use-toast";

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

  const { toast } = useToast();

  async function handleOAuthSignIn(provider: "google") {
    try {
      await signIn(provider, { callbackUrl: "/" });
      toast({ title: "Success!", description: "You are now signed in" });
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again",
        variant: "destructive",
      });
      console.error(error);
    }
  }

  return (
    <div className="min-h-screen md:bg-[#A2B0FF]">
      <div className="min-h-screen flex flex-col md:flex-row overflow-hidden relative">
        <div className="md:hidden p-8 bg-white flex justify-center items-center rounded-b-[25px]">
          <Image
            src="/linkerr.png"
            alt="Linkerr Logo"
            width={150}
            height={50}
            className="object-contain w-[150px] h-[50px]"
            priority
          />
        </div>

        {/* Image Section - Visible on both mobile and desktop */}
        <div className="w-full h-[250px] md:h-screen md:w-1/2 mb-6 md:mb-0 md:absolute md:right-0">
          <Image
            src="/people.png"
            alt="People"
            width={500}
            height={250}
            className="object-cover w-full h-full opacity-90"
            priority
          />
        </div>

        <div className="w-full md:w-1/2 bg-white md:rounded-tr-[50px] md:rounded-br-[50px] relative z-10 p-4 md:p-8">
          <div className="hidden md:block">
            <Image
              src="/linkerr.png"
              alt="Linkerr Logo"
              width={150}
              height={50}
              className="object-contain w-[150px] h-[50px]"
              priority
            />
          </div>

          <div className="pl-4 md:pl-[220px] mt-4">
            <h1
              className="text-2xl md:text-3xl font-medium text-center md:text-left mb-8"
              style={{ color: "#000270" }}
            >
              Login
            </h1>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6 md:space-y-12 mt-6"
              >
                <div className="space-y-4 md:space-y-8">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 md:h-5 md:w-5" />
                            <Input
                              type="email"
                              placeholder="Enter your email"
                              {...field}
                              className="w-full md:w-[400px] h-[40px] md:h-[50px] pl-10 text-sm md:text-base"
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
                          <div className="relative w-full md:w-[400px]">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 md:h-5 md:w-5" />
                            <Input
                              type={showPassword ? "text" : "password"}
                              placeholder="Enter your password"
                              {...field}
                              className="w-full md:w-[400px] h-[40px] md:h-[50px] pl-10 pr-12 text-sm md:text-base"
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                              <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="text-gray-400 hover:text-gray-600 focus:outline-none"
                              >
                                {showPassword ? (
                                  <EyeOff className="h-4 w-4 md:h-5 md:w-5" />
                                ) : (
                                  <Eye className="h-4 w-4 md:h-5 md:w-5" />
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

                <div className="flex flex-col space-y-4 md:space-y-8">
                  <Button
                    type="submit"
                    className="w-full md:w-[400px] h-[40px] md:h-[50px] bg-[#5771FF]"
                  >
                    Login
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleOAuthSignIn("google")}
                    className="w-full md:w-[400px] h-[40px] md:h-[50px]"
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

                <div className="text-center md:-ml-64 text-sm md:text-base">
                  <span className="text-gray-600">
                    Don&apos;t have an account?{" "}
                  </span>
                  <Link
                    href="signup"
                    className="text-[#5771FF] font-semibold hover:underline"
                  >
                    Sign Up
                  </Link>
                </div>
              </form>
            </Form>
          </div>
        </div>

        <div className="hidden md:block md:w-1/2 bg-[#A2B0FF]">
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
    </div>
  );
}
