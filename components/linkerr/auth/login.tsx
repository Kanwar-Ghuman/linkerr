/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState } from "react";
import Image from "next/image";
import { z } from "zod";
import { signIn } from "next-auth/react";

import { useToast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/button";

export default function SignUpPage() {
    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
    }
    const { toast } = useToast();
    async function handleGoogleSignIn() {
        try {
            await signIn("google");
        } catch (error) {
            toast({
                title: "Authentication Failed",
                description: "Please try again",
                variant: "destructive",
            });
        }
    }

    return (
        <div className="flex flex-col space-y-4 md:space-y-8">
            <Button
                type="button"
                onClick={handleGoogleSignIn}
                variant="outline"
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
    );
}

