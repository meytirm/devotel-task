import {useQuery} from "@tanstack/react-query";
import {todoService} from "../../service/todo";

const fetchTodos = async () => {
  const res = await todoService.findAll()
  return res.data
}

export const useFindAllTodosQuery = () => {
  return useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodos,
    staleTime: 1000 * 60, // 1 min
    refetchOnWindowFocus: true,
  })
}