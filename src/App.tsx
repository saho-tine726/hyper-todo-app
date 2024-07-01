import './App.css';
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { useForm } from "react-hook-form";
import { Box, Button, Center, ChakraProvider, Container, Flex, FormControl, FormErrorMessage, FormLabel, Grid, GridItem, HStack, Input, InputGroup, InputLeftElement, Select, Stack, Text, Textarea } from "@chakra-ui/react";
import { CalendarIcon, DeleteIcon } from '@chakra-ui/icons'
import { theme } from "./theme/theme";

interface TodoForm {
  id: string;
  title: string;
  detail: string;
  deadline: string;
  status: string;
}

function App() {
  const [todoList, setTodoList] = useState<TodoForm[]>([{
    id: '0',
    title: '期限切れ',
    detail: '期限切れ期限切れ期限切れ期限切れ期限切れ',
    deadline: '2024-01-01',
    status: '未着手'
  }, {
    id: '1',
    title: 'デフォルトデフォルトデフォルトデフォルト',
    detail: 'デフォルトデフォルトデフォルト',
    deadline: '2024-08-31',
    status: '未着手'
  }
  ]);

  const [titleClicked, setTitleClicked] = useState<boolean>(false);
  const [editTitle, setEditTitle] = useState<string>("初期タイトル");
  const [today, setToday] = useState<string>('');

  // 今日の日付を取得
  useEffect(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    setToday(`${year}-${month}-${day}`);
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TodoForm>();

  // 新しいtodoを追加したら
  const onSubmit = (data: TodoForm) => {
    const id = uuidv4();

    const newTodo = {
      id,
      title: data.title,
      detail: data.detail,
      deadline: data.deadline,
      status: '未着手'
    };

    setTodoList([...todoList, newTodo]);

    reset();
  };

  // todo削除
  const handleDelete = (id: string) => {
    setTodoList(todoList.filter((todoItem) => todoItem.id !== id));
  }

  // タイトルがクリックされたら
  const handleTitleClicked = () => {
    setTitleClicked(true);
  }

  // タイトルを編集
  const handleTitleEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditTitle(e.target.value);
  }

  const handleTitleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTitleClicked(false);
  }

  const handleTitleBlur = () => {
    setTitleClicked(false);
  }

  // ステータスが更新された時
  const handleStatusChange = (status: string, id: string) => {
    const updateTodoList = todoList.map((todoItem) => {
      if (todoItem.id === id) {
        return {
          ...todoItem,
          status: status
        };
      }
      return todoItem;
    });

    setTodoList(updateTodoList);
  }

  return (
    <ChakraProvider theme={theme}>
      <Container maxW="1200px" p={10}>
        <Center as="h1" fontSize="4xl" fontWeight="bold">高機能やることリスト</Center>
        <Box mt={5} px={20} pt={10} pb={7} bg="orange.100" w="800px" mx="auto" boxShadow="md">
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl isInvalid={!!errors.title}>
              <Grid templateColumns="8rem 1fr" gap={2}>
                <FormLabel htmlFor='title' fontWeight="bold" fontSize="lg">タイトル</FormLabel>
                <Box>
                  <Input
                    id='title'
                    bg="white"
                    borderColor="white"
                    {...register('title', {
                      required: '必須事項です',
                    })}
                  />
                  <FormErrorMessage>{errors.title && errors.title.message}</FormErrorMessage>
                </Box>
              </Grid>
            </FormControl>
            <FormControl isInvalid={!!errors.detail} mt={6}>
              <Grid templateColumns="8rem 1fr" gap={2}>
                <FormLabel htmlFor='detail' fontWeight="bold" fontSize="lg">やること詳細</FormLabel>
                <Box>
                  <Textarea
                    id='detail'
                    bg="white"
                    borderColor="white"
                    {...register('detail', {
                      required: '必須事項です',
                    })}
                  />
                  <FormErrorMessage>{errors.detail && errors.detail.message}</FormErrorMessage>
                </Box>
              </Grid>
            </FormControl>
            <FormControl isInvalid={!!errors.deadline} mt={6}>
              <Grid templateColumns="8rem 1fr" gap={2}>
                <FormLabel htmlFor='deadline' fontWeight="bold" fontSize="lg">期限</FormLabel>
                <Box>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<CalendarIcon color="gray.800" />}
                    />
                    <Input
                      id='deadline'
                      bg="white"
                      borderColor="white"
                      type="date"
                      w="170px"
                      min={today}
                      {...register('deadline', {
                        required: '必須事項です',
                      })}
                    />
                  </InputGroup>
                  <FormErrorMessage>{errors.deadline && errors.deadline.message}</FormErrorMessage>
                </Box>
              </Grid>
            </FormControl>
            <Flex justifyContent='flex-end' mt={5}>
              <Button bg="red.700" color="white" size="lg" _hover={{ bg: "red.500" }} type='submit'>追加</Button>
            </Flex>
          </form>
        </Box>

        <Grid templateColumns="repeat(3, 1fr)" gap={4} mt={6}>
          {
            todoList.map((todoItem) => (
              <GridItem bg={getTodoBgColor(todoItem.deadline, todoItem.status, today)} boxShadow="md" display="flex" flexDirection="column" h="100%" justifyContent="space-between" key={todoItem.id} maxW="362px">
                <HStack justify="space-between" p={2}>
                  <Select size="sm" fontWeight="bold" borderColor="gray.500" w="120px" cursor="pointer" _hover={{ bg: "gray.200" }} onChange={(e) => handleStatusChange(e.target.value, todoItem.id)} value={todoItem.status || '未着手'}>
                    <option value='未着手'>未着手</option>
                    <option value='進行中'>進行中</option>
                    <option value='完了'>完了</option>
                  </Select>
                  <Text color={getTodoColor(todoItem.deadline, todoItem.status, today)} mr={2} fontSize="sm" fontWeight={500}>期限:{todoItem.deadline}まで</Text>
                </HStack>
                <Stack p={4} pt={1} h="100%">
                  <Stack justifyContent="space-between" h="100%" spacing={3}>
                    <Box color={getTodoColor(todoItem.deadline, todoItem.status, today)}>
                      <Box onClick={handleTitleClicked}>
                        {
                          titleClicked ? (
                            <form onSubmit={handleTitleSubmit}><Input onChange={handleTitleEdit} onBlur={handleTitleBlur} value={editTitle} autoFocus></Input></form>
                          ) : (
                            <Text as="h2" fontSize="2xl" fontWeight="bold">{todoItem.title}</Text>
                          )
                        }
                      </Box>
                      <Box mt={1}>{todoItem.detail}</Box>
                    </Box>
                    <Flex>
                      <Button bg="gray.400" color="white" size="sm" ml="auto" leftIcon={<DeleteIcon />} _hover={{ bg: "gray.500" }} onClick={() => handleDelete(todoItem.id)}>削除</Button>
                    </Flex>
                  </Stack>
                </Stack>
              </GridItem>
            ))
          }
          {/* <GridItem bg="white" boxShadow="md" display="flex" flexDirection="column" h="100%" justifyContent="space-between">
            <HStack justify="space-between" p={2}>
              <Select placeholder="未着手" size="sm" fontWeight="bold" borderColor="gray.500" w="120px" cursor="pointer">
                <option value='option1'>未着手</option>
                <option value='option2'>進行中</option>
                <option value='option3'>完了</option>
              </Select>
              <Text color="gray.900" mr={2} fontSize="sm">期限:2024/6/30まで</Text>
            </HStack>
            <Stack p={4} pt={1} h="100%">
              <Stack justifyContent="space-between" h="100%" spacing={3}>
                <Box>
                  <Text as="h2" fontSize="2xl" fontWeight="bold">未着手未着手</Text>
                  <Box mt={1}>やること詳細やること詳細やること詳細やること詳細やること詳細やること詳細やること詳細やること詳細やること詳細やること詳細やること詳細やること詳細やること詳細やること詳細やること詳細やること詳細やること詳細やること詳細やること詳細やること詳細</Box>
                </Box>
                <Flex>
                  <Button bg="gray.400" color="white" size="sm" ml="auto" leftIcon={<DeleteIcon />} _hover={{ bg: "gray.500" }}>削除</Button>
                </Flex>
              </Stack>
            </Stack>
          </GridItem> */}
          {/* <GridItem bg="yellow.100" boxShadow="md" display="flex" flexDirection="column" h="100%" justifyContent="space-between">
            <HStack justify="space-between" p={2}>
              <Select placeholder="未着手" size="sm" fontWeight="bold" borderColor="gray.500" w="120px" cursor="pointer">
                <option value='option1'>未着手</option>
                <option value='option2'>進行中</option>
                <option value='option3'>完了</option>
              </Select>
              <Text color="gray.900" mr={2} fontSize="sm">期限:2024/6/30まで</Text>
            </HStack>
            <Stack p={4} pt={1} h="100%">
              <Stack justifyContent="space-between" h="100%" spacing={3}>
                <Box>
                  <Text as="h2" fontSize="2xl" fontWeight="bold">進行中進行中進行中進行中</Text>
                  <Box mt={1}>やること詳細やること詳細やること詳細やること詳細やること</Box>
                </Box>
                <Flex>
                  <Button bg="gray.400" color="white" size="sm" ml="auto" leftIcon={<DeleteIcon />} _hover={{ bg: "gray.500" }}>削除</Button>
                </Flex>
              </Stack>
            </Stack>
          </GridItem>
          <GridItem bg="gray.300" boxShadow="md" display="flex" flexDirection="column" h="100%" justifyContent="space-between">
            <HStack justify="space-between" p={2}>
              <Select placeholder="未着手" size="sm" fontWeight="bold" borderColor="gray.500" w="120px" cursor="pointer">
                <option value='option1'>未着手</option>
                <option value='option2'>進行中</option>
                <option value='option3'>完了</option>
              </Select>
              <Text color="gray.900" mr={2} fontSize="sm">期限:2024/6/30まで</Text>
            </HStack>
            <Stack p={4} pt={1} h="100%">
              <Stack justifyContent="space-between" h="100%" spacing={3}>
                <Box color="gray.500">
                  <Text as="h2" fontSize="2xl" fontWeight="bold">完了完了</Text>
                  <Box mt={1}>やること詳細やること詳細やること詳細やること詳細やること詳細やること詳細やること詳細やること詳細やること詳細やること詳細やること詳細やること詳細やること詳細やること詳細やること詳細やること詳細やること詳細やること詳細やること詳細やること詳細やること詳細やること詳細やること詳細やること詳細やること詳細やること詳細やること詳細やること詳細やること詳細やること詳細やること詳細やること詳細やること</Box>
                </Box>
                <Flex>
                  <Button bg="gray.400" color="white" size="sm" ml="auto" leftIcon={<DeleteIcon />} _hover={{ bg: "gray.500" }}>削除</Button>
                </Flex>
              </Stack>
            </Stack>
          </GridItem>
          <GridItem bg="red.200" boxShadow="md" display="flex" flexDirection="column" h="100%" justifyContent="space-between">
            <HStack justify="space-between" p={2}>
              <Select placeholder="未着手" size="sm" fontWeight="bold" borderColor="gray.500" w="120px" cursor="pointer">
                <option value='option1'>未着手</option>
                <option value='option2'>進行中</option>
                <option value='option3'>完了</option>
              </Select>
              <Text color="red.500" fontWeight="bold" mr={2} fontSize="sm">期限:2024/6/30まで</Text>
            </HStack>
            <Stack p={4} pt={1} h="100%">
              <Stack justifyContent="space-between" h="100%" spacing={3}>
                <Box color="red.500">
                  <Text as="h2" fontSize="2xl" fontWeight="bold">期限切れ期限切れ</Text>
                  <Box mt={1}>やること詳細やること詳細やること詳細やること詳細やること詳細やること詳細やること詳細やること詳細やること詳細やること詳細やること詳細やること詳細やること詳細やること詳細やること詳細やること詳細やること詳細やること詳細やること詳細やること詳細</Box>
                </Box>
                <Flex>
                  <Button bg="gray.400" color="white" size="sm" ml="auto" leftIcon={<DeleteIcon />} _hover={{ bg: "gray.500" }}>削除</Button>
                </Flex>
              </Stack>
            </Stack>
          </GridItem> */}
        </Grid>
      </Container>
    </ChakraProvider >
  );
}


// ステータスに応じた色を返す関数

const getTodoBgColor = (deadline: string, status: string, today: string) => {
  const isOverdue = new Date(deadline) < new Date(today);

  if (status === '進行中') {
    return 'yellow.100';
  } else if (status === '完了') {
    return 'gray.300';
  } else if (isOverdue) {
    return 'red.200';
  }

  return 'white';
}

const getTodoColor = (deadline: string, status: string, today: string) => {
  const isOverdue = new Date(deadline) < new Date(today);

  if (status === '進行中') {
    return 'gray.800';
  } else if (status === '完了') {
    return 'gray.500';
  } else if (isOverdue) {
    return 'red.500';
  }

  return 'gray.800';
}

export default App;
