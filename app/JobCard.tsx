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
          className="rounded border p-2"
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
