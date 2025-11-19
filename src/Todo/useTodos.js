import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import supabase from "../../SupabaseClient";

const fetchTodos = async () => {
  const res = await supabase.from("todo").select("*");
  return res.data;
};

const addTodo = async (todo) => await supabase.from("todo").insert(todo);

const deleteTodo = async (id) =>
  await supabase.from("todo").delete().eq("id", id);

const changeTodoStatus = async ({ id, status }) => {
  const statusOrder = ["pending", "inProgress", "completed"];
  const currentIndex = statusOrder.indexOf(status);
  const nextStatus = statusOrder[(currentIndex + 1) % statusOrder.length];

  return await supabase
    .from("todo")
    .update({ status: nextStatus })
    .eq("id", id);
};

export const useTodos = () => {
  const queryClient = useQueryClient();
  const todoQuery = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
    initialData: [],
    select: (data) => ({
      pending: data.filter((todo) => todo.status === "pending"),
      inProgress: data.filter((todo) => todo.status === "inProgress"),
      completed: data.filter((todo) => todo.status === "completed"),
    }),
  });
  const addMutation = useMutation({
    mutationFn: addTodo,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
    onMutate: async (newTodo) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });
      const prevTodos = queryClient.getQueryData(["todos"]);
      const optimisticTodo = {
        ...newTodo,
        id: Date.now(),
      };
      queryClient.setQueryData(["todos"], (old) =>
        old ? [...old, optimisticTodo] : [optimisticTodo]
      );
      return { prevTodos };
    },
    onError: (context) => {
      queryClient.setQueryData(["todos"], context.prevTodos);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
  const deleteMutation = useMutation({
    mutationFn: deleteTodo,
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });
      const prevTodos = queryClient.getQueryData(["todos"]);
      queryClient.setQueryData(["todos"], (old) =>
        old ? old.filter((todo) => todo.id !== id) : []
      );
      return { prevTodos };
    },
    onError: (context) => {
      queryClient.setQueryData(["todos"], context.prevTodos);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
  const changeStatusMutation = useMutation({
    mutationFn: changeTodoStatus,
    onMutate: async ({ id, status }) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });
      const prevTodos = queryClient.getQueryData(["todos"]);

      const statusOrder = ["pending", "inProgress", "completed"];
      const currentIndex = statusOrder.indexOf(status);
      const nextStatus = statusOrder[(currentIndex + 1) % statusOrder.length];

      queryClient.setQueryData(["todos"], (old) =>
        old
          ? old.map((todo) =>
              todo.id === id ? { ...todo, status: nextStatus } : todo
            )
          : []
      );
      return { prevTodos };
    },
    onError: (context) => {
      queryClient.setQueryData(["todos"], context.prevTodos);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  return {
    todos: todoQuery.data,
    isPending: todoQuery.isPending,
    isError: todoQuery.isError,
    addTodo: addMutation.mutate,
    deleteTodo: deleteMutation.mutate,
    changeStatus: changeStatusMutation.mutate,
  };
};
