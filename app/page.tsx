import JobCard from "./JobCard";

const jobs = [
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
  return (
    <main className="min-h-screen bg-gray-100 p-10">
      <h1 className="mb-2 text-3xl font-bold">Job Application Tracker</h1>

      <p className="mb-8 text-gray-600">My first Full-Stack project</p>
      <button className="mb-6 rounded-lg bg-black px-4 py-2 text-white">
        Add Job
      </button>

      <div className="space-y-5">
        {jobs.map((job) => (
          <JobCard
            key={job.id}
            position={job.position}
            company={job.company}
            status={job.status}
          />
        ))}
      </div>
    </main>
  );
}
