import { Box, Button, Flex, GridItem, HStack, Select, Stack, Text } from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { getTodayDate } from "../hooks/useTodos";

type Props = {
  todoItem: {
    id: string;
    title: string;
    detail: string;
    deadline: string;
    status: string;
  };
  getTodoBgColor: (deadline: string, status: string) => string;
  getTodoColor: (deadline: string, status: string) => string;
  handleStatusChange: (status: string, id: string) => void;
  handleEdit: (id: string) => void;
  handleDelete: (id: string) => void;
}

export const TodoItem: React.FC<Props> = (props) => {
  const {
    todoItem,
    getTodoBgColor,
    getTodoColor,
    handleStatusChange,
    handleEdit,
    handleDelete,
  } = props;

  const today = getTodayDate();

  return (
    <GridItem bg={getTodoBgColor(todoItem.deadline, todoItem.status)} boxShadow="md" display="flex" flexDirection="column" h="100%" justifyContent="space-between" key={todoItem.id} maxW={{ base: "100%", md: "362px" }}>
      <HStack justify="space-between" p={2}>
        <Select size="sm" fontWeight="bold" borderColor="gray.500" w="120px" cursor="pointer" _hover={{ bg: "gray.200" }} onChange={(e) => handleStatusChange(e.target.value, todoItem.id)} value={todoItem.status || '未着手'}>
          <option value='未着手'>未着手</option>
          <option value='進行中'>進行中</option>
          <option value='完了'>完了</option>
        </Select>
        <Text color={getTodoColor(todoItem.deadline, todoItem.status)} mr={2} fontSize="sm" fontWeight={500}>期限:{todoItem.deadline}まで</Text>
      </HStack>
      <Stack p={4} pt={1} h="100%">
        <Stack justifyContent="space-between" h="100%" spacing={4}>
          <Box color={getTodoColor(todoItem.deadline, todoItem.status)}>
            <Text as="h2" fontSize="2xl" fontWeight="bold">{todoItem.title}</Text>
            <Box mt={1}>{todoItem.detail}</Box>
          </Box>
          <Flex gap={4} justifyContent="flex-end">
            <Button bg="teal.400" color="white" size="sm" leftIcon={<EditIcon />} _hover={{ bg: "teal.600" }} onClick={() => handleEdit(todoItem.id)}>編集</Button>
            <Button bg="gray.400" color="white" size="sm" leftIcon={<DeleteIcon />} _hover={{ bg: "gray.500" }} onClick={() => handleDelete(todoItem.id)}>削除</Button>
          </Flex>
        </Stack>
      </Stack>
    </GridItem>
  )
}
