/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import React from "react";
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface FormInputProps {
    form: any,
    name: string,
    label: string,
    placeholder: string,
    description: string,
    isRequired: boolean,
}

const FormInput = ({
    form,
    name,
    label,
    placeholder,
    description,
    isRequired
}: FormInputProps): JSX.Element => {
    const requiredAsterik = isRequired ? (
        <span className="text-destructive">*</span>
    ) : (
        ""
    );

    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => {
                return (
                    <FormItem>
                        <FormLabel>
                            {label} {requiredAsterik}
                        </FormLabel>
                        <FormControl>
                            <div className="relative">
                                <Input
                                    placeholder={placeholder}
                                    {...field}
                                    value={field.value || ""}
                                />
                            </div>
                        </FormControl>
                        {field.name in form.formState.errors ? (
                            <FormMessage />
                        ) : (
                            <FormDescription>
                                {description}
                            </FormDescription>
                        )}
                    </FormItem>
                );
            }}
        />
    );
};

export { FormInput };
