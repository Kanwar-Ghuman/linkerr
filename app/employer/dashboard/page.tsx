/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Search,
  Building2,
  Users,
  Clock,
  Calendar,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";

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
  const [searchTerm, setSearchTerm] = useState("");
  const [allJobs, setAllJobs] = useState<Job[]>([]); // Store all jobs
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
        setAllJobs(data.jobs); // Store all jobs

        // Calculate stats
        const activeJobs = data.jobs.filter(
          (j: { status: string }) => j.status === "APPROVED"
        ).length;
        const totalApplications = data.jobs.reduce(
          (acc: any, job: { totalApplications: any }) =>
            acc + job.totalApplications,
          0
        );

        setStats({
          activeApplications: totalApplications,
          activePostings: activeJobs,
          avgTimeToHire: 18, // You can calculate this based on your data
          positionsFilled: data.jobs.filter(
            (j: { status: string }) => j.status === "CLOSED"
          ).length,
        });
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    if (term === "") {
      setJobs(allJobs);
    } else {
      const filteredJobs = allJobs.filter((job) => {
        const titleMatch = job.jobTitle?.toLowerCase().includes(term) || false;
        const companyMatch =
          job.companyName?.toLowerCase().includes(term) || false;
        const descriptionMatch =
          job.jobDescription?.toLowerCase().includes(term) || false;

        return titleMatch || companyMatch || descriptionMatch;
      });
      setJobs(filteredJobs);
    }
  };

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
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>

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
                  className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start">
                    <div className="space-y-3">
                      {/* Title and Status */}
                      <div className="flex items-center gap-3">
                        <h3 className="text-xl font-semibold text-blue-600">
                          {job.jobTitle}
                        </h3>
                        <span
                          className={`px-2 py-1 text-sm rounded-full ${
                            job.status === "PENDING"
                              ? "bg-yellow-100 text-yellow-600"
                              : job.status === "APPROVED"
                              ? "bg-green-100 text-green-600"
                              : "bg-red-100 text-red-600"
                          }`}
                        >
                          {job.status}
                        </span>
                      </div>

                      {/* Company and Location */}
                      <div className="flex items-center gap-4 text-gray-600">
                        <div className="flex items-center gap-2">
                          <Building2 className="h-4 w-4" />
                          <span>{job.companyName}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          <span>{job.roleLocation}</span>
                        </div>
                      </div>

                      {/* Job Type and Salary */}
                      <div className="flex gap-4 text-sm">
                        <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded">
                          {job.remote}
                        </span>
                        <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded">
                          {job.pay}
                        </span>
                      </div>

                      {/* Skills */}
                      <div className="flex flex-wrap gap-2">
                        {job.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-2 py-1 bg-gray-100 text-gray-600 text-sm rounded"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>

                      {/* Metadata */}
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>
                          Posted: {new Date(job.createdAt).toLocaleDateString()}
                        </span>
                        <span>Applications: {job.totalApplications}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-2">
                      <Button variant="outline">View Details</Button>
                      {job.status === "APPROVED" && (
                        <Button
                          variant="outline"
                          className="border-red-200 text-red-600 hover:bg-red-50"
                        >
                          Close Position
                        </Button>
                      )}
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
