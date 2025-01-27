import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const AdminDashboard = () => {
  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-blue-100 to-white flex justify-center items-center">
      <div className="w-full max-w-4xl mx-auto space-y-6">
        <Input
          type="text"
          placeholder="Search jobs..."
          className="w-full bg-white py-6"
        />
        <div className="space-y-4">
          {[1, 2, 3, 4].map((index) => (
            <div
              key={index}
              className="rounded-lg shadow bg-black mb-6 max-w-4xl"
            >
              <div className="bg-white rounded-lg p-6 w-full">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold">
                      Senior Software Engineer
                    </h3>
                    <p className="text-gray-600">Tech Corp Inc.</p>
                    <p className="text-sm text-gray-500 mt-2">
                      $120,000 - $150,000 • Remote
                    </p>
                    <p className="mt-4">
                      We are seeking an experienced software engineer to join
                      our team. The ideal candidate will have 5+ years of
                      experience with React, Node.js, and cloud technologies.
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button
                      variant="default"
                      className="bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white"
                    >
                      Approve
                    </Button>
                    <Button
                      variant="default"
                      className="bg-gradient-to-r from-red-400 to-red-600 hover:from-red-500 hover:to-red-700 text-white"
                    >
                      Deny
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
