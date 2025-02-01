/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, MapPin, Building2, Filter } from "lucide-react";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: number;
  type: string;
  skills: string[];
  description: string;
  remote: string;
  hasApplied: boolean;
  createdAt: string;
}

export default function StudentDashboard() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [allJobs, setAllJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("/api/student/");
        const data = await response.json();
        setJobs(data.jobs);
        setAllJobs(data.jobs);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    filterJobs(term, locationFilter);
  };

  const handleLocationFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const location = e.target.value.toLowerCase();
    setLocationFilter(location);
    filterJobs(searchTerm, location);
  };

  const filterJobs = (search: string, location: string) => {
    let filtered = [...allJobs];

    if (location) {
      filtered = filtered.filter((job) =>
        job.location.toLowerCase().includes(location)
      );
    }

    if (search) {
      filtered = filtered.filter(
        (job) =>
          job.title.toLowerCase().includes(search) ||
          job.company.toLowerCase().includes(search) ||
          job.description.toLowerCase().includes(search) ||
          job.skills.some((skill) => skill.toLowerCase().includes(search))
      );
    }

    setJobs(filtered);
  };

  const handleApply = async (jobId: string) => {
    try {
      const response = await fetch(`/api/jobs/${jobId}/apply`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        // Update the local state to show applied status
        setJobs(
          jobs.map((job) =>
            job.id === jobId ? { ...job, hasApplied: true } : job
          )
        );
        setAllJobs(
          allJobs.map((job) =>
            job.id === jobId ? { ...job, hasApplied: true } : job
          )
        );
      } else {
        throw new Error("Failed to apply");
      }
    } catch (error) {
      console.error("Error applying to job:", error);
      // You might want to add toast notification here
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-100 via-blue-50 to-white">
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Search Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 text-gray-400" />
              <Input
                type="text"
                placeholder="Search jobs..."
                className="pl-10 py-6 text-lg w-full"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            <div className="flex-1 relative">
              <MapPin className="absolute left-3 top-3 text-gray-400" />
              <Input
                type="text"
                placeholder="Location"
                className="pl-10 py-6 text-lg w-full"
                value={locationFilter}
                onChange={handleLocationFilter}
              />
            </div>
            <Button className="px-6 bg-blue-600 hover:bg-blue-700">
              Search Jobs
            </Button>
          </div>
        </div>

        {/* Job Listings */}
        <div className="grid grid-cols-1 gap-6">
          {loading ? (
            <div className="text-center py-8">Loading...</div>
          ) : jobs.length === 0 ? (
            <div className="text-center py-8">No jobs found</div>
          ) : (
            jobs.map((job) => (
              <div
                key={job.id}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-blue-600">
                      {job.title}
                    </h3>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Building2 size={16} />
                      <p>{job.company}</p>
                    </div>
                    <p className="text-gray-600">{job.location}</p>
                    <div className="space-y-2">
                      <p className="text-gray-700">
                        ${job.salary.toLocaleString()}
                      </p>
                      <div className="flex gap-2">
                        <span className="px-2 py-1 bg-blue-100 text-blue-600 text-sm rounded">
                          {job.type}
                        </span>
                        <span className="px-2 py-1 bg-green-100 text-green-600 text-sm rounded">
                          {job.remote}
                        </span>
                        {job.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-2 py-1 bg-gray-100 text-gray-600 text-sm rounded"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>
                        Posted: {new Date(job.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <Button
                    onClick={() => handleApply(job.id)}
                    disabled={job.hasApplied}
                    variant={job.hasApplied ? "outline" : "default"}
                  >
                    {job.hasApplied ? "Applied" : "Apply Now"}
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
