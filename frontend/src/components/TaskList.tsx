import TaskItem from "./TaskItem";

type Task = {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
};

type TaskListProps = {
  tasks: Task[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onUpdate: () => void;
};

export default function TaskList({ tasks, onEdit, onDelete }: TaskListProps) {
  return (
    <div className="space-y-4 mt-6">
      {tasks.length === 0 ? (
        <p className="text-center text-gray-500">No tasks found.</p>
      ) : (
        tasks.map((task) => (
          <TaskItem
            key={task.id}
            id={task.id}
            title={task.title}
            description={task.description}
            completed={task.completed}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))
      )}
    </div>
  );
}
