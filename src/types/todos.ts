export interface TodoType {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
  isLocal?: boolean;
}

export type DeletedTodoType = TodoType & {
  isDeleted: boolean,
  deletedOn: Date
}