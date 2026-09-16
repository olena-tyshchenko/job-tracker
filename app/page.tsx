"use client";

import { useEffect, useState } from "react";
import JobCard from "./JobCard";

const initialJobs = [
  {
    id: 1,
    position: "QA Tester",
    company: "Siemens",
    status: "Applied",
  },
  {
    id: 2,
    position: "Warehouse Technician",
    company: "Amazon",
    status: "Interview",
  },
  {
    id: 3,
    position: "Data Analyst",
    company: "Deutsche Bahn",
    status: "Saved",
  },
];

export default function Home() {
  const [showForm, setShowForm] = useState(false);
  const [position, setPosition] = useState("");
  const [status, setStatus] = useState("Saved");
  const [company, setCompany] = useState("");
  const [jobs, setJobs] = useState(initialJobs);
  const [filter, setFilter] = useState("All");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function loadJobs() {
      const response = await fetch("/api/jobs");
      const data = await response.json();

      setJobs(data);
      setIsLoaded(true);
    }

    loadJobs();
  }, []);

  async function addJob() {
    if (!position || !company) {
      return;
    }

    const response = await fetch("/api/jobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        position,
        company,
        status,
      }),
    });

    const newJob = await response.json();

    setJobs([...jobs, newJob]);
    setPosition("");
    setCompany("");
    setStatus("Saved");
    setShowForm(false);
  }

  async function changeStatus(id: number, newStatus: string) {
    const response = await fetch(`/api/jobs/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: newStatus,
      }),
    });

    const updatedJob = await response.json();

    setJobs(jobs.map((job) => (job.id === id ? updatedJob : job)));
  }

  const filteredJobs =
    filter === "All" ? jobs : jobs.filter((job) => job.status === filter);

  async function deleteJob(id: number) {
    const confirmed = window.confirm("Delete this job?");

    if (!confirmed) {
      return;
    }

    await fetch(`/api/jobs/${id}`, {
      method: "DELETE",
    });

    setJobs(jobs.filter((job) => job.id !== id));
  }

  function editJob(
    id: number,
    currentPosition: string,
    currentCompany: string,
  ) {
    const newPosition = window.prompt("Edit position:", currentPosition);
    if (newPosition === null) return;

    const newCompany = window.prompt("Edit company:", currentCompany);
    if (newCompany === null) return;

    setJobs(
      jobs.map((job) =>
        job.id === id
          ? { ...job, position: newPosition, company: newCompany }
          : job,
      ),
    );
  }
  return (
    <main className="min-h-screen bg-gray-100 p-10">
      <h1 className="mb-2 text-3xl font-bold">Job Application Tracker</h1>

      <p className="mb-8 text-gray-600">My first Full-Stack project</p>

      <button
        onClick={() => setShowForm(true)}
        className="mb-6 rounded-lg bg-black px-4 py-2 text-white"
      >
        Add Job
      </button>

      {showForm && (
        <div className="mb-6 max-w-md rounded-xl bg-white p-6 shadow">
          <h2 className="mb-4 text-xl font-semibold">Add a new job</h2>

          <input
            value={position}
            onChange={(event) => setPosition(event.target.value)}
            className="mb-3 w-full rounded border p-2"
            placeholder="Position"
          />

          <input
            value={company}
            onChange={(event) => setCompany(event.target.value)}
            className="mb-3 w-full rounded border p-2"
            placeholder="Company"
          />
          <select
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            className="mb-3 w-full rounded border p-2"
          >
            <option value="Saved">Saved</option>
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
          </select>
          <button
            onClick={addJob}
            className="rounded bg-black px-4 py-2 text-white"
          >
            Save
          </button>
          <button
            onClick={() => setShowForm(false)}
            className="ml-3 rounded border px-4 py-2"
          >
            Cancel
          </button>
        </div>
      )}
      <div className="mb-6">
        <label className="mr-2 font-medium">Filter:</label>

        <select
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
          className="rounded border p-2"
        >
          <option value="All">All</option>
          <option value="Saved">Saved</option>
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      <div className="space-y-5">
        {filteredJobs.map((job) => (
          <JobCard
            key={job.id}
            id={job.id}
            position={job.position}
            company={job.company}
            status={job.status}
            onStatusChange={changeStatus}
            onDelete={deleteJob}
            onEdit={editJob}
          />
        ))}
      </div>
    </main>
  );
}
