import { theme } from "./theme/theme";
import { useTodos } from "./hooks/useTodos";
import { Center, ChakraProvider, Container, Grid } from "@chakra-ui/react";
import { TodoItem } from "./components/TodoItem";
import { TodoForm } from "./components/TodoForm";
import { Sort } from "./components/Sort";
import { EditModal } from "./components/EditModal";

function App() {
  const {
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
    sortStatus
  } = useTodos();

  return (
    <ChakraProvider theme={theme}>
      <Container maxW={{ base: "inherit", xl: "1200px" }} p={{ base: 4, md: 10 }}>
        <Center as="h1" fontSize="3xl" fontWeight="bold">高機能やることリスト</Center>
        <TodoForm
          onSubmit={handleSubmitAddForm(onAdd)}
          errorsAddForm={errorsAddForm}
          registerAddForm={registerAddForm}
          today={today}
        />

        <Sort
          sortDeadline={sortDeadline}
          sortStatus={sortStatus}
        />

        <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(3, 1fr)" }} gap={4} mt={6}>
          {
            todoList.map((todoItem) => (
              <TodoItem
                key={todoItem.id}
                todoItem={todoItem}
                getTodoBgColor={getTodoBgColor}
                getTodoColor={getTodoColor}
                handleStatusChange={handleStatusChange}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                today={today}
              />
            ))
          }
        </Grid>

        <EditModal
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={handleSubmitEditForm(onEdit)}
          errorsEditForm={errorsEditForm}
          registerEditForm={registerEditForm}
          currentTodo={currentTodo}
          today={today}
        />
      </Container>
    </ChakraProvider >
  );
}

export default App;
