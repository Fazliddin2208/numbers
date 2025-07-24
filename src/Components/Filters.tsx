import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ButtonGroup({ value, onChange }: { value: string, onChange: (value: string) => void }) {
  return <div className="flex space-x-6">
    <button className={`px-2 py-1 border border-gray-300 rounded ${value === "math" ? "bg-gray-200 text-black" : ""}`} onClick={() => onChange("math")}>Random Math</button>
    <button className={`px-2 py-1 border border-gray-300 rounded ${value === "trivia" ? "bg-gray-200 text-black" : ""}`} onClick={() => onChange("trivia")}>Random Trivia</button>
    <button className={`px-2 py-1 border border-gray-300 rounded ${value === "date" ? "bg-gray-200 text-black" : ""}`} onClick={() => onChange("date")}>Random Date</button>
    <button className={`px-2 py-1 border border-gray-300 rounded ${value === "year" ? "bg-gray-200 text-black" : ""}`} onClick={() => onChange("year")}>Random Year</button>
  </div>;
}

export default function Filters() {
  const [type, setType] = useState("math");
  const [number, setNumber] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate({
      pathname: "/",
      search: `${type === "date" ? `month=${Math.floor(Math.random() * 12) + 1}&day=${Math.floor(Math.random() * 28) + 1}` : type === "year" ? `number=${new Date().getFullYear() - Math.floor(Math.random() * (new Date().getFullYear()))}` : `number=${Math.floor(Math.random() * 100)}`}&type=${type}`
    });
  };

  return <div className="p-6 flex items-center justify-between">
    <form onSubmit={handleSubmit}>
      <div className="flex">
        <ButtonGroup value={type} onChange={setType} />
      </div>
    </form>
    <div className="flex space-x-2">
      <input type="number" className="px-2 py-1 border border-gray-300 rounded" value={number} onChange={e => setNumber(e.target.value)} />
      <button className="px-2 py-1 border border-gray-300 rounded"
        onClick={() => {
          navigate({
            pathname: "/",
            search: `number=${number}&type=number`
          });
        }}>Yuborish</button>
    </div>
  </div>;
}

