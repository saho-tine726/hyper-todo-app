import './App.css';
import { Box, Button, Center, ChakraProvider, Flex, HStack, Input, Select, Stack, Text } from "@chakra-ui/react";
import { DeleteIcon } from '@chakra-ui/icons'
import { theme } from "./theme/theme";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box p={10}>
        <Center as="h1" fontSize="4xl" fontWeight="bold">高機能Todoアプリ</Center>
        <HStack justify="center" w="600px" mx="auto" my={5}>
          <Input placeholder="新しいtodoを入力してください" size="lg" bg="white"></Input>
          <Button bg="red.700" color="white" size="lg">追加</Button>
        </HStack>
        <Stack spacing={5}>
          <Box bg="white" boxShadow="md">
            <HStack justify="space-between" p={2}>
              <Select placeholder="未着手" size="sm" fontWeight="bold" borderColor="gray.500" w="120px">
                <option value='option1'>未着手</option>
                <option value='option2'>進行中</option>
                <option value='option3'>完了</option>
              </Select>
              <Text color="gray.900" mr={2} fontSize="sm">期限:2024/6/30まで</Text>
            </HStack>
            <Box p={4} pt={1}>
              <Text as="h2" fontSize="2xl" fontWeight="bold">未着手未着手</Text>
              <Box mt={1}>やること詳細やること詳細やること詳細やること詳細やること詳細やること詳細やること詳細やること詳細やること詳細やること詳細やること詳細やること詳細やること詳細やること詳細やること詳細やること詳細やること詳細やること詳細やること詳細やること詳細</Box>
              <Flex justifyContent="flex-end" mt={2}>
                <Button bg="gray.400" color="white" size="sm" ml="auto" leftIcon={<DeleteIcon />}>削除</Button>
              </Flex>
            </Box>
          </Box>
          <Box bg="yellow.100" boxShadow="md">
            <HStack justify="space-between" p={2}>
              <Select placeholder="未着手" size="sm" bg="white" fontWeight="bold" borderColor="gray.500" w="120px">
                <option value='option1'>未着手</option>
                <option value='option2'>進行中</option>
                <option value='option3'>完了</option>
              </Select>
              <Text color="gray.900" mr={2} fontSize="sm">期限:2024/6/30まで</Text>
            </HStack>
            <Box p={4} pt={1}>
              <Text as="h2" fontSize="2xl" fontWeight="bold">進行中進行中</Text>
              <Box mt={1}>やること詳細やること詳細やること詳細やること詳細やること詳細やること詳細やること詳細やること詳細やること詳細やること詳細やること詳細やること詳細やること詳細やること詳細やること詳細やること詳細やること詳細やること詳細やること詳細やること詳細</Box>
              <Flex justifyContent="flex-end" mt={2}>
                <Button bg="gray.400" color="white" size="sm" ml="auto" leftIcon={<DeleteIcon />}>削除</Button>
              </Flex>
            </Box>
          </Box>
          <Box bg="gray.200" boxShadow="md">
            <HStack justify="space-between" p={2}>
              <Select placeholder="未着手" size="sm" bg="white" fontWeight="bold" borderColor="gray.500" w="120px">
                <option value='option1'>未着手</option>
                <option value='option2'>進行中</option>
                <option value='option3'>完了</option>
              </Select>
              <Text color="gray.900" mr={2} fontSize="sm">期限:2024/6/30まで</Text>
            </HStack>
            <Box p={4} pt={1}>
              <Text as="h2" fontSize="2xl" fontWeight="bold">完了完了</Text>
              <Box mt={1}>やること詳細やること詳細やること詳細やること詳細やること詳細やること詳細やること詳細やること詳細やること詳細やること詳細やること詳細やること詳細やること詳細やること詳細やること詳細やること詳細やること詳細やること詳細やること詳細やること詳細</Box>
              <Flex justifyContent="flex-end" mt={2}>
                <Button bg="gray.400" color="white" size="sm" ml="auto" leftIcon={<DeleteIcon />}>削除</Button>
              </Flex>
            </Box>
          </Box>
          <Box bg="red.200" boxShadow="md">
            <HStack justify="space-between" p={2}>
              <Select placeholder="未着手" size="sm" bg="white" fontWeight="bold" borderColor="gray.500" w="120px">
                <option value='option1'>未着手</option>
                <option value='option2'>進行中</option>
                <option value='option3'>完了</option>
              </Select>
              <Text color="gray.900" mr={2} fontSize="sm">期限:2024/6/30まで</Text>
            </HStack>
            <Box p={4} pt={1}>
              <Text as="h2" fontSize="2xl" fontWeight="bold">期限切れ</Text>
              <Box mt={1}>やること詳細やること詳細やること詳細やること詳細やること詳細やること詳細やること詳細やること詳細やること詳細やること詳細やること詳細やること詳細やること詳細やること詳細やること詳細やること詳細やること詳細やること詳細やること詳細やること詳細</Box>
              <Flex justifyContent="flex-end" mt={2}>
                <Button bg="gray.400" color="white" size="sm" ml="auto" leftIcon={<DeleteIcon />}>削除</Button>
              </Flex>
            </Box>
          </Box>
        </Stack>
      </Box>
    </ChakraProvider>
  );
}

export default App;
