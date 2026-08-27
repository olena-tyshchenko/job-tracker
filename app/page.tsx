import JobCard from "./JobCard";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 p-10">
      <h1 className="mb-2 text-3xl font-bold">Job Application Tracker</h1>

      <p className="mb-8 text-gray-600">My first Full-Stack project</p>

      <div className="space-y-5">
        <JobCard position="QA Tester" company="Siemens" status="Applied" />

        <JobCard
          position="Warehouse Technician"
          company="Amazon"
          status="Interview"
        />

        <JobCard
          position="Data Analyst"
          company="Deutsche Bahn"
          status="Saved"
        />
      </div>
    </main>
  );
}
