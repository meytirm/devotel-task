export interface TodoType {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
}

export type DeletedTodoType = TodoType & {
  isDeleted: boolean,
  deletedOn: Date
}