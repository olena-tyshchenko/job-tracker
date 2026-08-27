type JobCardProps = {
  position: string;
  company: string;
  status: string;
};

export default function JobCard({ position, company, status }: JobCardProps) {
  return (
    <div className="max-w-md rounded-xl bg-white p-6 shadow">
      <h2 className="text-xl font-semibold">{position}</h2>

      <p className="text-gray-600">{company}</p>

      <p className="mt-4">
        Status: <span className="font-semibold">{status}</span>
      </p>
    </div>
  );
}
