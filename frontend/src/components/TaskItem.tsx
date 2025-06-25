// === File: components/TaskItem.tsx ===
import { Pencil, Trash2, CheckCircle } from "lucide-react";

interface TaskProps {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onComplete: (id: number) => void;
}

export default function TaskItem({ id, title, description, completed, onEdit, onDelete, onComplete }: TaskProps) {
  return (
    <div className="flex justify-between items-start p-4 border rounded-xl shadow-sm bg-white">
      <div>
        <h3 className={`text-lg font-semibold ${completed ? "line-through text-gray-400" : ""}`}>{title}</h3>
        {description && <p className="text-sm text-gray-600">{description}</p>}
      </div>
      <div className="flex gap-2">
        <button onClick={() => onComplete(id)} className="text-green-600 hover:text-green-800">
          <CheckCircle size={18} />
        </button>
        <button onClick={() => onEdit(id)} className="text-blue-600 hover:text-blue-800">
          <Pencil size={18} />
        </button>
        <button onClick={() => onDelete(id)} className="text-red-600 hover:text-red-800">
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}