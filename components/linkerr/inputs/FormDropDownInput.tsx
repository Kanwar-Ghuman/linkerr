"use client";

import React from "react";
import {
    Control,
    FieldValues,
    Path,
    UseFormReturn,
} from "react-hook-form";
import {
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
    FormDescription,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectLabel,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

// Define a type for each group of select options
interface OptionGroup {
    label?: string;
    group: {
        label: string;
        value: string;
    }[];
}

interface FormDropDownInputProps<TFieldValues extends FieldValues> {
    isRequired?: boolean;
    name: Path<TFieldValues>;
    label: string;
    placeholder?: string;
    description?: string;
    form: UseFormReturn<TFieldValues>;
    options: OptionGroup[];
}

export function FormDropDownInput<TFieldValues extends FieldValues>({
    isRequired,
    name,
    label,
    placeholder,
    description,
    form,
    options,
}: FormDropDownInputProps<TFieldValues>) {
    // Show an asterisk if the field is required
    const requiredAsterisk = isRequired ? <span className="text-destructive">*</span> : null;

    return (
        <FormField
            control={form.control as Control<TFieldValues>}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>
                        {label} {requiredAsterisk}
                    </FormLabel>
                    <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        value={field.value}
                    >
                        <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder={placeholder} />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {options.map((group) => (
                                <SelectGroup key={group.label ?? "group"}>
                                    {group.label ? <SelectLabel>{group.label}</SelectLabel> : null}
                                    {group.group.map((option) => (
                                        <SelectItem key={option.value} value={option.value}>
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            ))}
                        </SelectContent>
                    </Select>

                    {/* If there's an error on this field, show FormMessage; otherwise show the description */}
                    {form.formState.errors[name] ? (
                        <FormMessage />
                    ) : (
                        <FormDescription>{description}</FormDescription>
                    )}
                </FormItem>
            )}
        />
    );
}

