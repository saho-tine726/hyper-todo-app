import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useForm } from "react-hook-form";
import { useDisclosure, useToast } from "@chakra-ui/react";
import { TodoForm } from "../types/todoForm";
import { supabase } from "../utils/supabaseClient";

export const useTodos = () => {
  const [todoList, setTodoList] = useState<TodoForm[]>([
    // {
    //   id: "1",
    //   title: "期限切れ",
    //   detail: "期限切れ期限切れ期限切れ期限切れ期限切れ",
    //   deadline: "2024-03-31",
    //   status: "未着手",
    // },
    // {
    //   id: "2",
    //   title: "デフォルトデフォルトデフォルトデフォルト",
    //   detail: "デフォルトデフォルトデフォルト",
    //   deadline: "2024-01-31",
    //   status: "未着手",
    // },
    // {
    //   id: "3",
    //   title: "デフォルトデフォルトデフォルトデフォルト",
    //   detail: "デフォルトデフォルトデフォルト",
    //   deadline: "2024-08-31",
    //   status: "進行中",
    // },
    // {
    //   id: "4",
    //   title: "デフォルトデフォルトデフォルトデフォルト",
    //   detail: "デフォルトデフォルトデフォルト",
    //   deadline: "2024-08-31",
    //   status: "完了",
    // },
    // {
    //   id: "5",
    //   title: "デフォルトデフォルトデフォルトデフォルト",
    //   detail: "デフォルトデフォルトデフォルト",
    //   deadline: "2024-08-31",
    //   status: "未着手",
    // },
    // {
    //   id: "6",
    //   title: "デフォルトデフォルトデフォルトデフォルト",
    //   detail: "デフォルトデフォルトデフォルト",
    //   deadline: "2024-08-31",
    //   status: "進行中",
    // },
  ]);

  const [today, setToday] = useState<string>("");
  const [currentTodo, setCurrentTodo] = useState<TodoForm | null>(null);

  // メッセージポップアップ
  const toast = useToast();

  // react-hook-form(追加フォーム)
  const {
    register: registerAddForm,
    handleSubmit: handleSubmitAddForm,
    reset: resetAddForm,
    formState: { errors: errorsAddForm },
  } = useForm<TodoForm>();

  // react-hook-form(編集フォーム)
  const {
    register: registerEditForm,
    handleSubmit: handleSubmitEditForm,
    setValue: setValueEditForm,
    formState: { errors: errorsEditForm },
  } = useForm<TodoForm>();

  // 今日の日付を取得
  useEffect(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    setToday(`${year}-${month}-${day}`);

    // 初期データのフェッチ
    fetchTodos();
  }, []);

  // 初期データのフェッチ
  const fetchTodos = async () => {
    const { data, error } = await supabase.from("todos").select("*");
    if (error) {
      console.error(error);
    } else {
      setTodoList(data);
    }
  };

  // 新しいtodoを追加したら
  const onAdd = async (data: TodoForm) => {
    // const id = uuidv4();

    // const newTodo = {
    //   id,
    //   title: data.title,
    //   detail: data.detail,
    //   deadline: data.deadline,
    //   status: "未着手",
    // };

    const newTodo = {
      id: uuidv4(),
      title: data.title,
      detail: data.detail,
      deadline: data.deadline,
      status: "未着手",
    };

    // setTodoList([...todoList, newTodo]);

    // resetAddForm();

    // toast({
    //   title: "やることを追加しました！頑張りましょう！",
    //   status: "success",
    //   duration: 3000,
    //   isClosable: true,
    // });

    const { error } = await supabase.from("todos").insert(newTodo);
    if (error) {
      console.error(error);
    } else {
      setTodoList([...todoList, newTodo]);
      resetAddForm();

      toast({
        title: "やることを追加しました！頑張りましょう！",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // todo削除
  const handleDelete = async (id: string) => {
    // setTodoList(todoList.filter((todoItem) => todoItem.id !== id));

    // toast({
    //   title: "やることを削除しました",
    //   status: "warning",
    //   duration: 3000,
    //   isClosable: true,
    // });
    const { error } = await supabase.from("todos").delete().eq("id", id);
    if (error) {
      console.error(error);
    } else {
      setTodoList(todoList.filter((todoItem) => todoItem.id !== id));
      toast({
        title: "やることを削除しました",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // 編集モーダル
  const { isOpen, onOpen, onClose } = useDisclosure();

  // todo編集
  const handleEdit = (id: string) => {
    const todoItem = todoList.find((todoItem) => todoItem.id === id);

    if (todoItem) {
      setCurrentTodo(todoItem);
      setValueEditForm("title", todoItem.title);
      setValueEditForm("detail", todoItem.detail);
      setValueEditForm("deadline", todoItem.deadline);
      onOpen();
    }
  };

  // todoを編集して確定したら
  const onEdit = async (data: TodoForm) => {
    // setTodoList(
    //   todoList.map((todoItem) =>
    //     todoItem.id === currentTodo?.id ? { ...todoItem, ...data } : todoItem
    //   )
    // );
    // setCurrentTodo(null);
    // onClose();

    // toast({
    //   title: "やることを編集しました",
    //   status: "success",
    //   duration: 3000,
    //   isClosable: true,
    // });
    const { error } = await supabase.from('todos').update(data).eq('id', currentTodo?.id);
    if (error) {
      console.error(error);
    } else {
      setTodoList(
        todoList.map((todoItem) =>
          todoItem.id === currentTodo?.id ? { ...todoItem, ...data } : todoItem
        )
      );
      setCurrentTodo(null);
      onClose();

      toast({
        title: "やることを編集しました",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // ステータスが更新された時
  const handleStatusChange = async (status: string, id: string) => {
    // const updateTodoList = todoList.map((todoItem) => {
    //   if (todoItem.id === id) {
    //     return {
    //       ...todoItem,
    //       status: status,
    //     };
    //   }
    //   return todoItem;
    // });

    // setTodoList(updateTodoList);
    const { error } = await supabase.from('todos').update({ status }).eq('id', id);
    if (error) {
      console.error(error);
    } else {
      setTodoList(todoList.map((todoItem) => {
        if (todoItem.id === id) {
          return { ...todoItem, status };
        }
        return todoItem;
      }));
    }
  };

  // 期限が近い順に並べ替える
  const sortDeadline = () => {
    const sortedList = [...todoList].sort((todoItemA, todoItemB) => {
      return (
        new Date(todoItemA.deadline).getTime() -
        new Date(todoItemB.deadline).getTime()
      );
    });

    setTodoList(sortedList);
  };

  // ステータス順に並べ替える
  const sortStatus = () => {
    const sortedList = [...todoList].sort((todoItemA, todoItemB) => {
      const statusOrder: { [key: string]: number } = {
        未着手: 0,
        進行中: 1,
        完了: 2,
      };
      return statusOrder[todoItemA.status] - statusOrder[todoItemB.status];
    });

    setTodoList(sortedList);
  };

  // ステータスに応じて背景色を変更
  const getTodoBgColor = (deadline: string, status: string, today: string) => {
    const isOverdue = new Date(deadline) < new Date(today);

    if (status === "進行中") {
      return "yellow.100";
    } else if (status === "完了") {
      return "gray.300";
    } else if (isOverdue) {
      return "red.200";
    }

    return "white";
  };

  // ステータスに応じて文字色を変更
  const getTodoColor = (deadline: string, status: string, today: string) => {
    const isOverdue = new Date(deadline) < new Date(today);

    if (status === "進行中") {
      return "gray.800";
    } else if (status === "完了") {
      return "gray.500";
    } else if (isOverdue) {
      return "red.500";
    }

    return "gray.800";
  };

  return {
    todoList,
    registerAddForm,
    handleSubmitAddForm,
    errorsAddForm,
    registerEditForm,
    handleSubmitEditForm,
    errorsEditForm,
    today,
    onAdd,
    handleDelete,
    handleEdit,
    handleStatusChange,
    getTodoBgColor,
    getTodoColor,
    isOpen,
    onOpen,
    onClose,
    onEdit,
    currentTodo,
    sortDeadline,
    sortStatus,
  };
};
