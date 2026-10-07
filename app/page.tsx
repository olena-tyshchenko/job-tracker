"use client";

import { useEffect, useState } from "react";
import JobCard from "./JobCard";

export default function Home() {
  const [showForm, setShowForm] = useState(false);
  const [position, setPosition] = useState("");
  const [status, setStatus] = useState("Saved");
  const [company, setCompany] = useState("");
  const [jobs, setJobs] = useState<any[]>([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadJobs() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("/api/jobs");

        if (!response.ok) {
          throw new Error("Failed to load jobs");
        }

        const data = await response.json();
        setJobs(data);
      } catch (error) {
        console.error(error);
        setError("Could not load jobs.");
      } finally {
        setLoading(false);
      }
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

    setJobs([newJob, ...jobs]);
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

  async function editJob(
    id: number,
    currentPosition: string,
    currentCompany: string,
  ) {
    const newPosition = window.prompt("Edit position:", currentPosition);
    if (newPosition === null) return;

    const newCompany = window.prompt("Edit company:", currentCompany);
    if (newCompany === null) return;

    const response = await fetch(`/api/jobs/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        position: newPosition,
        company: newCompany,
      }),
    });

    const updatedJob = await response.json();

    setJobs(jobs.map((job) => (job.id === id ? updatedJob : job)));
  }

  const filteredJobs =
    filter === "All" ? jobs : jobs.filter((job) => job.status === filter);

  return (
    <main className="min-h-screen bg-gray-100 p-10">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Job Application Tracker</h1>
          <p className="mt-2 text-gray-600">My first Full-Stack project</p>
        </div>

        <div className="rounded-xl bg-white px-4 py-3 shadow">
          <p className="text-sm text-gray-500">Total applications</p>
          <p className="text-2xl font-bold">{jobs.length}</p>
        </div>
      </div>
      <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-5">
        <div className="rounded-xl bg-white p-4 shadow">
          <p className="text-sm text-gray-500">Saved</p>
          <p className="text-2xl font-bold">
            {jobs.filter((job) => job.status === "Saved").length}
          </p>
        </div>

        <div className="rounded-xl bg-white p-4 shadow">
          <p className="text-sm text-gray-500">Applied</p>
          <p className="text-2xl font-bold">
            {jobs.filter((job) => job.status === "Applied").length}
          </p>
        </div>

        <div className="rounded-xl bg-white p-4 shadow">
          <p className="text-sm text-gray-500">Interview</p>
          <p className="text-2xl font-bold">
            {jobs.filter((job) => job.status === "Interview").length}
          </p>
        </div>

        <div className="rounded-xl bg-white p-4 shadow">
          <p className="text-sm text-gray-500">Offer</p>
          <p className="text-2xl font-bold">
            {jobs.filter((job) => job.status === "Offer").length}
          </p>
        </div>

        <div className="rounded-xl bg-white p-4 shadow">
          <p className="text-sm text-gray-500">Rejected</p>
          <p className="text-2xl font-bold">
            {jobs.filter((job) => job.status === "Rejected").length}
          </p>
        </div>
      </div>

      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <button
          onClick={() => setShowForm(true)}
          className="rounded-lg bg-black px-4 py-2 font-medium text-white hover:bg-gray-800"
        >
          Add Job
        </button>

        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-600">Filter:</label>

          <select
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
            className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm"
          >
            <option value="All">All</option>
            <option value="Saved">Saved</option>
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>

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

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {loading && <p>Loading jobs...</p>}

        {error && <p className="text-red-600">{error}</p>}

        {!loading && !error && filteredJobs.length === 0 && (
          <p>No jobs found.</p>
        )}

        {!loading &&
          filteredJobs.map((job) => (
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
