export interface Task {
  id: string;
  name: string;
  description: string;
  isChecked: boolean;
  estimation: string;
  type: string;
  people: string[];
  priority: string;
}