"use client";
import React from "react";
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
const Page = () => {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-100 to-white">
      {" "}
      <div className="h-screen flex flex-col pt-5">
        {" "}
        <div className="flex justify-between gap-4 p-9">
          {" "}
          <Button
            variant="outline"
            size="default"
            className="w-[30%] justify-start text-lg py-6"
          >
            {" "}
            Settings{" "}
          </Button>{" "}
          <div className="w-2/3 flex gap-2 items-center pl-8">
            {" "}
            <Input
              type="text"
              placeholder="Search..."
              className="w-[88%] bg-white border-gray-200 focus:ring-2 focus:ring-blue-500 text-black py-6"
            />{" "}
            <Button variant="outline" size="icon" className="py-6 h-5 w-[3rem]">
              {" "}
              <IoBookmarkOutline />{" "}
            </Button>{" "}
          </div>{" "}
        </div>{" "}
        <Separator />{" "}
        <div className="flex flex-1 h-[calc(100vh-100px)]">
          {" "}
          {/* Left Column */}{" "}
          <div className="w-1/3 p-8 border-r space-y-6">
            {" "}
            <div className="space-y-4">
              {" "}
              <h3 className="text-lg font-semibold">Job Category</h3>{" "}
              <div className="space-y-2">
                {" "}
                {[
                  "IT",
                  "Marketing",
                  "Finance",
                  "Healthcare",
                  "Hospitality",
                ].map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    {" "}
                    <Checkbox id={category} />{" "}
                    <Label htmlFor={category}>{category}</Label>{" "}
                  </div>
                ))}{" "}
              </div>{" "}
            </div>{" "}
            <div className="space-y-4">
              {" "}
              <h3 className="text-lg font-semibold">Location</h3>{" "}
              <Input placeholder="City, State or Zip" className="w-full" />{" "}
              <Select>
                {" "}
                <SelectTrigger>
                  {" "}
                  <SelectValue placeholder="Distance" />{" "}
                </SelectTrigger>{" "}
                <SelectContent>
                  {" "}
                  {[10, 25, 50, 100].map((miles) => (
                    <SelectItem key={miles} value={miles.toString()}>
                      {" "}
                      Within {miles} miles{" "}
                    </SelectItem>
                  ))}{" "}
                </SelectContent>{" "}
              </Select>{" "}
            </div>{" "}
            <div className="space-y-4">
              {" "}
              <h3 className="text-lg font-semibold">Job Type</h3>{" "}
              <div className="space-y-2">
                {" "}
                {["Full-Time", "Part-Time", "Internship", "Contract"].map(
                  (type) => (
                    <div key={type} className="flex items-center space-x-2">
                      {" "}
                      <Checkbox id={type} />{" "}
                      <Label htmlFor={type}>{type}</Label>{" "}
                    </div>
                  )
                )}{" "}
              </div>{" "}
            </div>{" "}
            <div className="space-y-4">
              {" "}
              <h3 className="text-lg font-semibold">Salary Range</h3>{" "}
              <div className="flex gap-2">
                {" "}
                <Input placeholder="Min" type="number" className="w-1/2" />{" "}
                <Input placeholder="Max" type="number" className="w-1/2" />{" "}
              </div>{" "}
            </div>{" "}
            <div className="space-y-4">
              {" "}
              <h3 className="text-lg font-semibold">Date Posted</h3>{" "}
              <Select>
                {" "}
                <SelectTrigger>
                  {" "}
                  <SelectValue placeholder="Select timeframe" />{" "}
                </SelectTrigger>{" "}
                <SelectContent>
                  {" "}
                  {["Last 24 hours", "Last week", "Last month", "Any time"].map(
                    (timeframe) => (
                      <SelectItem key={timeframe} value={timeframe}>
                        {" "}
                        {timeframe}{" "}
                      </SelectItem>
                    )
                  )}{" "}
                </SelectContent>{" "}
              </Select>{" "}
            </div>{" "}
          </div>{" "}
          {/* Right Column */}{" "}
          <div className="w-2/3 p-8 overflow-auto">
            {" "}
            <div className="space-y-4">
              {" "}
              {[1, 2, 3].map((item) => (
                <Card key={item} className="p-6 min-h-[300px]">
                  {" "}
                  <CardHeader>
                    {" "}
                    <CardTitle className="text-2xl">
                      Result {item}
                    </CardTitle>{" "}
                  </CardHeader>{" "}
                  <CardContent>
                    {" "}
                    <p className="text-lg text-gray-600">
                      {" "}
                      Sample search result content with expanded description.
                      This card takes up more space and provides more detailed
                      information about the search result.{" "}
                    </p>{" "}
                  </CardContent>{" "}
                </Card>
              ))}{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </main>
  );
};
export default Page;
