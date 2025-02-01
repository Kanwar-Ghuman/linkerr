"use client";

import React, { useEffect, useState } from "react";
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

interface Job {
  id: string;
  jobTitle: string;
  jobDescription: string;
  companyName: string;
  roleLocation: string;
  remote: "REMOTE" | "ONSITE" | "HYBRID";
  pay: string;
  status: "PENDING" | "APPROVED" | "REJECTED" | "CLOSED";
  totalApplications: number;
  createdAt: string;
  skills: string[];
}

const EmployerDashboard = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    activeApplications: 0,
    activePostings: 0,
    avgTimeToHire: 0,
    positionsFilled: 0,
  });

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("/api/jobs");
        const data = await response.json();
        setJobs(data.jobs);

        // Calculate stats
        const activeJobs = data.jobs.filter(
          (j) => j.status === "APPROVED"
        ).length;
        const totalApplications = data.jobs.reduce(
          (acc, job) => acc + job.totalApplications,
          0
        );

        setStats({
          activeApplications: totalApplications,
          activePostings: activeJobs,
          avgTimeToHire: 18, // You can calculate this based on your data
          positionsFilled: data.jobs.filter((j) => j.status === "CLOSED")
            .length,
        });
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-100 via-blue-50 to-white animate-gradient-xy">
      <div className="min-h-screen w-full">
        <main className="max-w-7xl mx-auto px-6 py-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-4 gap-6 mb-8">
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-sm">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-full">
                  <Users className="text-blue-600" />
                </div>
                <div>
                  <p className="text-gray-600">Active Applications</p>
                  <p className="text-2xl font-bold">
                    {stats.activeApplications}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-sm">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-full">
                  <Building2 className="text-green-600" />
                </div>
                <div>
                  <p className="text-gray-600">Active Postings</p>
                  <p className="text-2xl font-bold">{stats.activePostings}</p>
                </div>
              </div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-sm">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-100 rounded-full">
                  <Clock className="text-purple-600" />
                </div>
                <div>
                  <p className="text-gray-600">Time to Hire (avg)</p>
                  <p className="text-2xl font-bold">{stats.avgTimeToHire}d</p>
                </div>
              </div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-sm">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-orange-100 rounded-full">
                  <Calendar className="text-orange-600" />
                </div>
                <div>
                  <p className="text-gray-600">Positions Filled</p>
                  <p className="text-2xl font-bold">{stats.positionsFilled}</p>
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
            {loading ? (
              <div className="text-center py-8">Loading...</div>
            ) : jobs.length === 0 ? (
              <div className="text-center py-8">No jobs found</div>
            ) : (
              jobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <h3 className="text-xl font-semibold text-blue-600">
                            {job.jobTitle}
                          </h3>
                          <span
                            className={`px-2 py-1 ${
                              job.status === "APPROVED"
                                ? "bg-green-100 text-green-700"
                                : job.status === "PENDING"
                                ? "bg-yellow-100 text-yellow-700"
                                : job.status === "REJECTED"
                                ? "bg-red-100 text-red-700"
                                : "bg-gray-100 text-gray-700"
                            } text-sm rounded-full`}
                          >
                            {job.status.charAt(0) +
                              job.status.slice(1).toLowerCase()}
                          </span>
                        </div>
                        <p className="text-gray-600">{job.companyName}</p>
                        <p className="text-sm text-gray-500">
                          ${job.pay} • {job.remote}
                        </p>
                        <div className="flex gap-4 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <Users size={16} /> {job.totalApplications}{" "}
                            Applications
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock size={16} /> Posted{" "}
                            {new Date(job.createdAt).toLocaleDateString()}
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
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default EmployerDashboard;
