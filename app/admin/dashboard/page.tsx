import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Building2, Filter } from "lucide-react";

const jobListings = [
  {
    id: 1,
    title: "Senior React Developer",
    company: "Tech Corp Inc",
    location: "San Francisco, CA",
    salary: "$130,000 - $160,000",
    type: "Full-time",
    skills: ["React", "TypeScript", "Node.js"],
    status: "Active",
    postedDate: "2024-03-01",
    applications: 45,
  },
  {
    id: 2,
    title: "Python Backend Engineer",
    company: "Data Systems Co",
    location: "New York, NY",
    salary: "$115,000 - $140,000",
    type: "Remote",
    skills: ["Python", "Django", "AWS"],
    status: "Active",
    postedDate: "2024-03-05",
    applications: 32,
  },
  {
    id: 3,
    title: "DevOps Engineer",
    company: "Cloud Solutions Ltd",
    location: "Austin, TX",
    salary: "$125,000 - $155,000",
    type: "Hybrid",
    skills: ["Kubernetes", "Docker", "CI/CD"],
    status: "Urgent",
    postedDate: "2024-03-10",
    applications: 28,
  },
  {
    id: 4,
    title: "Mobile Developer",
    company: "App Innovators",
    location: "Seattle, WA",
    salary: "$110,000 - $135,000",
    type: "Full-time",
    skills: ["React Native", "iOS", "Android"],
    status: "Active",
    postedDate: "2024-03-08",
    applications: 37,
  },
];

const AdminDashboard = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-100 via-blue-50 to-white animate-gradient-xy">
      <div className="min-h-screen w-full">
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
                />
              </div>
              <div className="flex-1 relative">
                <MapPin className="absolute left-3 top-3 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Location"
                  className="pl-10 py-6 text-lg w-full"
                />
              </div>
              <Button className="px-6 bg-blue-600 hover:bg-blue-700">
                Search Jobs
              </Button>
            </div>
          </div>

          {/* Filters and Sort */}
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
            {jobListings.map((job) => (
              <div
                key={job.id}
                className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-sm"
              >
                <div className="flex justify-between items-start">
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
                          {job.type}
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
                        Posted: {new Date(job.postedDate).toLocaleDateString()}
                      </span>
                      <span>Applications: {job.applications}</span>
                      <span
                        className={`px-2 py-1 rounded ${
                          job.status === "Urgent"
                            ? "bg-red-100 text-red-600"
                            : "bg-green-100 text-green-600"
                        }`}
                      >
                        {job.status}
                      </span>
                    </div>
                  </div>
                  <Button variant="outline">View Details</Button>
                </div>
              </div>
            ))}
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
    </div>
  );
};

export default AdminDashboard;
