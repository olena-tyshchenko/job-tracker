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
  onDelete: (id: number) => void;
  onEdit: (id: number, position: string, company: string) => void;
};
export default function JobCard({
  id,
  position,
  company,
  status,
  onStatusChange,
  onDelete,
  onEdit,
}: JobCardProps) {
  return (
    <div className="max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md">
      <div className="mb-5">
        <h2 className="text-xl font-semibold text-gray-900">{position}</h2>
        <p className="mt-1 text-sm text-gray-500">{company}</p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <span className="text-sm font-medium text-gray-600">Status:</span>

        <select
          value={status}
          onChange={(event) => onStatusChange(id, event.target.value)}
          className={`rounded-lg border px-3 py-2 text-sm font-medium ${
            statusStyles[status as keyof typeof statusStyles]
          }`}
        >
          <option value="Saved">Saved</option>
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
        </select>

        <button
          onClick={() => onEdit(id, position, company)}
          className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(id)}
          className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
