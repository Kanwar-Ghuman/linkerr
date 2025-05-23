/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { IoBookmarkOutline } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronDown, ChevronUp, Settings, X, Eye, Trash2 } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Page = () => {
  // States for collapsing each filter section
  const [openCategory, setOpenCategory] = useState(true);
  const [openLocation, setOpenLocation] = useState(true);
  const [openJobType, setOpenJobType] = useState(true);
  const [openSalaryRange, setOpenSalaryRange] = useState(true);
  const [openDatePosted, setOpenDatePosted] = useState(true);
  const [openSettings, setOpenSettings] = useState(false);

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-100 to-white">
      <div className="h-screen flex flex-col pt-5">
        {/* Top Bar aligned with cards */}
        <div className="flex w-full">
          <div className="w-1/5 p-8">
            {/* Settings Section */}
            <div className="space-y-2 bg-gradient-to-r from-amber-200 to-amber-100 rounded-lg p-4 shadow-sm border border-gray-200">
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => setOpenSettings(!openSettings)}
              >
                <div className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  <h3 className="text-lg font-thin">Settings</h3>
                </div>
                {openSettings ? <ChevronUp /> : <ChevronDown />}
              </div>
              {openSettings && (
                <div className="mt-2  rounded-lg  z-10 max-h-[200px] overflow-y-auto">
                  <div className="pl-4 space-y-2 pt-3 p-5">
                    <div className="bg-[#5971FF] p-3 rounded-md border border-gray-200 cursor-pointer text-white transition-colors">
                      <div className="flex items-center justify-between">
                        <span>Close All Filters</span>
                        <X className="w-5 h-5" />
                      </div>
                    </div>
                    <div className="bg-[#5971FF] p-3 rounded-md border border-gray-200 cursor-pointer text-white transition-colors">
                      <div className="flex items-center justify-between">
                        <span>Open All Filters</span>
                        <Eye className="w-5 h-5" />
                      </div>
                    </div>
                    <div className="bg-[#5971FF] p-3 rounded-md border border-gray-200 cursor-pointer text-white transition-colors">
                      <div className="flex items-center justify-between">
                        <span>Clear All Filters</span>
                        <Trash2 className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Search Bar - Fixed Position */}
          <div className="flex-1 flex justify-center fixed-content">
            <div className="flex gap-2 items-center w-[90%]">
              <Input
                type="text"
                placeholder="Search..."
                className="bg-white border-gray-200 focus:ring-2 focus:ring-blue-500 text-black py-6 flex-1"
              />
              <Button
                variant="outline"
                size="icon"
                className="py-6 h-5 w-[3rem]"
              >
                <IoBookmarkOutline />
              </Button>
            </div>
          </div>
        </div>

        <Separator />

        {/* Main Content: Left filters + Right results */}
        <div className="flex flex-1 h-[calc(100vh-100px)]">
          {/* Left Column with 5 collapsible filter sections */}
          <div className="w-1/4 p-8 border-r space-y-8 overflow-auto">
            {/* 1) Job Category */}
            <div className="space-y-2 bg-[#5971FF] rounded-lg p-4 shadow-sm border border-gray-200">
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => setOpenCategory(!openCategory)}
              >
                <h3 className="text-lg font-thin">Job Category</h3>
                {openCategory ? <ChevronUp /> : <ChevronDown />}
              </div>
              {openCategory && (
                <div className="pl-4 space-y-2 pt-2">
                  {[
                    "IT",
                    "Marketing",
                    "Finance",
                    "Healthcare",
                    "Hospitality",
                  ].map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox id={category} />
                      <Label htmlFor={category}>{category}</Label>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 2) Location */}
            <div className="space-y-2 bg-[#5971FF] rounded-lg p-4 shadow-sm border border-gray-200">
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => setOpenLocation(!openLocation)}
              >
                <h3 className="text-lg font-thin">Location</h3>
                {openLocation ? <ChevronUp /> : <ChevronDown />}
              </div>
              {openLocation && (
                <div className="pl-4 space-y-4 pt-2">
                  <Input placeholder="City, State or Zip" className="w-full" />
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Distance" />
                    </SelectTrigger>
                    <SelectContent>
                      {[10, 25, 50, 100].map((miles) => (
                        <SelectItem key={miles} value={miles.toString()}>
                          Within {miles} miles
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>

            {/* 3) Job Type */}
            <div className="space-y-2 bg-[#5971FF] rounded-lg p-4 shadow-sm border border-gray-200">
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => setOpenJobType(!openJobType)}
              >
                <h3 className="text-lg font-thin">Job Type</h3>
                {openJobType ? <ChevronUp /> : <ChevronDown />}
              </div>
              {openJobType && (
                <div className="pl-4 space-y-2 pt-2">
                  {["Full-Time", "Part-Time", "Internship", "Contract"].map(
                    (type) => (
                      <div key={type} className="flex items-center space-x-2">
                        <Checkbox id={type} />
                        <Label htmlFor={type}>{type}</Label>
                      </div>
                    )
                  )}
                </div>
              )}
            </div>

            {/* 4) Salary Range */}
            <div className="space-y-2 bg-[#5971FF] rounded-lg p-4 shadow-sm border border-gray-200">
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => setOpenSalaryRange(!openSalaryRange)}
              >
                <h3 className="text-lg font-thin">Salary Range</h3>
                {openSalaryRange ? <ChevronUp /> : <ChevronDown />}
              </div>
              {openSalaryRange && (
                <div className="pl-4 pt-2">
                  <div className="flex gap-2">
                    <Input placeholder="Min" type="number" className="w-1/2" />
                    <Input placeholder="Max" type="number" className="w-1/2" />
                  </div>
                </div>
              )}
            </div>

            {/* 5) Date Posted */}
            <div className="space-y-2 bg-[#5971FF] rounded-lg p-4 shadow-sm border border-gray-200">
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => setOpenDatePosted(!openDatePosted)}
              >
                <h3 className="text-lg font-thin">Date Posted</h3>
                {openDatePosted ? <ChevronUp /> : <ChevronDown />}
              </div>
              {openDatePosted && (
                <div className="pl-4 pt-2">
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select timeframe" />
                    </SelectTrigger>
                    <SelectContent>
                      {[
                        "Last 24 hours",
                        "Last week",
                        "Last month",
                        "Any time",
                      ].map((timeframe) => (
                        <SelectItem key={timeframe} value={timeframe}>
                          {timeframe}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Results */}
          <div className="w-full p-8 overflow-auto">
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <Card key={item} className="p-6 min-h-[300px]">
                  <CardHeader>
                    <CardTitle className="text-2xl">Result {item}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg text-gray-600">
                      Sample search result content with expanded description.
                      This card provides more detailed information about the
                      search result.
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Page;
