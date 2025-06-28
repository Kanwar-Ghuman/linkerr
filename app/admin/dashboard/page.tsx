/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Building2, Filter } from "lucide-react";
import { JobStatus } from "@prisma/client";

interface FormattedJob {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  skills: string[];
  status: JobStatus;
  postedDate: string | Date;
  applications: number;
}

const AdminDashboard = () => {
  // State management
  const [jobs, setJobs] = useState<FormattedJob[]>([]);
  const [allJobs, setAllJobs] = useState<FormattedJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");

  // Fetch jobs on component mount
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("/api/admin");
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

  // Filter jobs based on search and location
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
          job.type.toLowerCase().includes(search) ||
          job.skills.some((skill) => skill.toLowerCase().includes(search))
      );
    }

    setJobs(filtered);
  };

  // Handle search input
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    filterJobs(term, locationFilter);
  };

  // Handle location filter
  const handleLocationFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const location = e.target.value.toLowerCase();
    setLocationFilter(location);
    filterJobs(searchTerm, location);
  };

  // Update job approval status
  const handleApproval = async (jobId: string, status: JobStatus) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/jobs/${jobId}/approve`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error("Failed to update job status");
      }

      // Update local state
      const updateJobStatus = (prevJobs: FormattedJob[]) =>
        prevJobs.map((job) => (job.id === jobId ? { ...job, status } : job));

      setJobs(updateJobStatus);
      setAllJobs(updateJobStatus);
    } catch (error) {
      console.error("Error updating job status:", error);
      alert("Failed to update job status");
    } finally {
      setLoading(false);
    }
  };

  // Get status badge styling
  const getStatusStyle = (status: JobStatus) => {
    const styles = {
      PENDING: "bg-yellow-100 text-yellow-600",
      APPROVED: "bg-green-100 text-green-600",
      REJECTED: "bg-red-100 text-red-600",
      CLOSED: "bg-gray-100 text-gray-600",
    };
    return styles[status] || styles.PENDING;
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-100 via-blue-50 to-white">
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Search and Filter Section */}
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
            <Button className="px-6 mt-2 bg-blue-600 hover:bg-blue-700">
              Search Jobs
            </Button>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="flex justify-between mb-4">
          <Button variant="outline" className="flex items-center gap-2">
            <Filter size={16} /> Filter
          </Button>
          <select className="px-4 py-2 border rounded-md">
            <option>Most Recent</option>
            <option>Most Relevant</option>
          </select>
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
                className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-sm"
              >
                <div className="flex justify-between items-start">
                  {/* Job Details */}
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-blue-600 hover:underline">
                      {job.title}
                    </h3>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Building2 size={16} />
                      <p>{job.company}</p>
                    </div>
                    <p className="text-gray-600">{job.location}</p>

                    <div className="space-y-2">
                      <p className="text-gray-700">{job.salary}</p>
                      <div className="flex gap-2">
                        <span className="px-2 py-1 bg-blue-100 text-blue-600 text-sm rounded">
                          {job.type || "Full Time"}
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

                    {/* Job Metadata */}
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>
                        Posted: {new Date(job.postedDate).toLocaleDateString()}
                      </span>
                      <span>Applications: {job.applications}</span>
                      <span
                        className={`px-2 py-1 rounded ${getStatusStyle(
                          job.status
                        )}`}
                      >
                        {job.status}
                      </span>
                    </div>
                  </div>

                  <Button variant="outline">View Details</Button>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 mt-4">
                  <Button
                    onClick={() => handleApproval(job.id, JobStatus.APPROVED)}
                    className="bg-green-500 hover:bg-green-600"
                    disabled={job.status === JobStatus.APPROVED}
                  >
                    Approve
                  </Button>
                  <Button
                    onClick={() => handleApproval(job.id, JobStatus.REJECTED)}
                    className="bg-red-500 hover:bg-red-600"
                    disabled={job.status === JobStatus.REJECTED}
                  >
                    Reject
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        <div className="mt-6 flex justify-center gap-2">
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
  );
};

export default AdminDashboard;
