"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const Page = () => {
  return (
    <main className="min-h-screen p-6 bg-white">
      <div className="max-w-7xl mx-auto mt-8 bg-white shadow-sm rounded-lg p-4">
        <Input
          type="text"
          placeholder="Search..."
          className="w-full bg-white border-gray-200 focus:ring-2 focus:ring-blue-500 text-black"
        />
        <Separator className="my-4" />

        <div className="flex gap-6">
          {/* Left Column - Filters */}
          <div className="w-1/3 space-y-4">
            <h3 className="text-xl font-semibold mb-4">Filters</h3>
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
          </div>

          {/* Right Column - Results */}
          <div className="w-2/3">
            <div className="space-y-4">
              {[1, 2].map((item) => (
                <Card key={item} className="p-4">
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
