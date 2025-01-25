"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { IoBookmarkOutline } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const Page = () => {
  return (
    <main className="min-h-screen p-6 bg-white">
      <div className="max-w-7xl mx-auto mt-8 bg-white shadow-sm rounded-lg p-4 h-screen">
        <div className="flex justify-end mb-6">
          <div className="w-2/3 flex gap-2 items-center">
            <Input
              type="text"
              placeholder="Search..."
              className="w-full bg-white border-gray-200 focus:ring-2 focus:ring-blue-500 text-black"
            />
            <Button variant="outline" size="icon">
              <IoBookmarkOutline className="h-5 w-5" />
            </Button>
          </div>
        </div>
        <Separator className="my-4" />

        <div className="flex gap-6 h-[calc(100vh-200px)]">
          {/* Left Column */}
          <div className="w-1/3 space-y-4 overflow-y-auto">
            <h3 className="text-xl font-semibold mb-4">Type</h3>
            <Button
              variant="outline"
              className="w-full justify-start text-lg py-6"
            >
              All Items
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start text-lg py-6"
            >
              Recent
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start text-lg py-6"
            >
              Popular
            </Button>

            <h3 className="text-xl font-semibold mb-4 mt-8">Category</h3>
            <Button
              variant="outline"
              className="w-full justify-start text-lg py-6"
            >
              Documents
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start text-lg py-6"
            >
              Images
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start text-lg py-6"
            >
              Videos
            </Button>

            <h3 className="text-xl font-semibold mb-4 mt-8">Date</h3>
            <Button
              variant="outline"
              className="w-full justify-start text-lg py-6"
            >
              Last 24 Hours
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start text-lg py-6"
            >
              Last Week
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start text-lg py-6"
            >
              Last Month
            </Button>
          </div>

          {/* Right Column */}
          <div className="w-2/3">
            <div className="space-y-4 flex flex-col h-full">
              {[1, 2, 3].map((item) => (
                <Card key={item} className="p-4 flex-1">
                  <CardHeader>
                    <CardTitle className="text-2xl">Result {item}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg text-gray-600">
                      Sample search result content with expanded description.
                      This card takes up more space and provides more detailed
                      information about the search result.
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
