const statusStyles = {
  Saved: "bg-gray-200 text-gray-800",
  Applied: "bg-blue-100 text-blue-800",
  Interview: "bg-yellow-100 text-yellow-800",
  Offer: "bg-green-100 text-green-800",
  Rejected: "bg-red-100 text-red-800",
};

type JobCardProps = {
  id: number;
  position: string;
  company: string;
  status: string;
  onStatusChange: (id: number, newStatus: string) => void;
};

export default function JobCard({
  id,
  position,
  company,
  status,
  onStatusChange,
}: JobCardProps) {
  return (
    <div className="max-w-md rounded-xl bg-white p-6 shadow">
      <h2 className="text-xl font-semibold">{position}</h2>

      <p className="text-gray-600">{company}</p>

      <div className="mt-4">
        <label className="mr-2">Status:</label>

        <select
          value={status}
          onChange={(event) => onStatusChange(id, event.target.value)}
          className={`rounded border p-2 font-medium ${
            statusStyles[status as keyof typeof statusStyles]
          }`}
        >
          <option value="Saved">Saved</option>
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>
    </div>
  );
}
