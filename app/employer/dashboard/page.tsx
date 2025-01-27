import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  Building2,
  Filter,
  Users,
  Clock,
  Calendar,
  ChevronDown,
} from "lucide-react";

const EmployerDashboard = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-100 via-blue-50 to-white animate-gradient-xy">
      <div className="min-h-screen w-full">
        <main className="max-w-7xl mx-auto px-6 py-8">
          {/* Stats Overview */}
          <div className="grid grid-cols-4 gap-6 mb-8">
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-sm">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-full">
                  <Users className="text-blue-600" />
                </div>
                <div>
                  <p className="text-gray-600">Active Applications</p>
                  <p className="text-2xl font-bold">246</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-full">
                  <Building2 className="text-green-600" />
                </div>
                <div>
                  <p className="text-gray-600">Active Postings</p>
                  <p className="text-2xl font-bold">12</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-100 rounded-full">
                  <Clock className="text-purple-600" />
                </div>
                <div>
                  <p className="text-gray-600">Time to Hire (avg)</p>
                  <p className="text-2xl font-bold">18d</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-orange-100 rounded-full">
                  <Calendar className="text-orange-600" />
                </div>
                <div>
                  <p className="text-gray-600">Positions Filled</p>
                  <p className="text-2xl font-bold">84</p>
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search job postings..."
                  className="pl-10 py-6 text-lg w-full"
                />
              </div>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter size={16} /> Filters <ChevronDown size={16} />
              </Button>
              <select className="px-4 py-2 border rounded-md">
                <option>Most Recent</option>
                <option>Most Applications</option>
                <option>Ending Soon</option>
              </select>
            </div>
          </div>

          {/* Job Postings */}
          <div className="space-y-4">
            {[1, 2, 3, 4].map((index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <h3 className="text-xl font-semibold text-blue-600">
                          Senior Software Engineer
                        </h3>
                        <span className="px-2 py-1 bg-green-100 text-green-700 text-sm rounded-full">
                          Active
                        </span>
                      </div>
                      <p className="text-gray-600">Tech Corp Inc.</p>
                      <p className="text-sm text-gray-500">
                        $120,000 - $150,000 • Remote
                      </p>
                      <div className="flex gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Users size={16} /> 45 Applications
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={16} /> 15 days remaining
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline">View Applications</Button>
                      <Button variant="outline">Edit</Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-8 flex justify-center gap-2">
            <Button variant="outline" disabled>
              Previous
            </Button>
            <Button variant="outline">1</Button>
            <Button variant="outline">2</Button>
            <Button variant="outline">3</Button>
            <Button variant="outline">Next</Button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EmployerDashboard;
