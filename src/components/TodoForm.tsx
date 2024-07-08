import { Box, Button, Flex, FormControl, FormErrorMessage, FormLabel, Grid, Input, InputGroup, InputLeftElement, Textarea } from "@chakra-ui/react";
import { CalendarIcon } from '@chakra-ui/icons';
import { getTodayDate } from "../hooks/useTodos";

type Props = {
  onSubmit: (data: any) => void;
  errorsAddForm: any;
  registerAddForm: any;
}

export const TodoForm: React.FC<Props> = (props) => {
  const {
    onSubmit,
    errorsAddForm,
    registerAddForm,
  } = props;

  const today = getTodayDate();

  return (
    <Box mt={5} px={{ base: 5, md: 20 }} pt={{ base: 5, md: 10 }} pb={{ base: 5, md: 7 }} bg="orange.100" w={{ base: "100%", xl: "800px" }} mx="auto" boxShadow="md">
      <form onSubmit={onSubmit}>
        <FormControl isInvalid={!!errorsAddForm.title}>
          <Grid templateColumns={{ base: "1fr", md: "8rem 1fr" }} gap={2}>
            <FormLabel htmlFor='title' fontWeight="bold" fontSize="lg">タイトル</FormLabel>
            <Box>
              <Input
                id='title'
                bg="white"
                borderColor="gray.300"
                {...registerAddForm('title', {
                  required: '必須事項です',
                })}
              />
              <FormErrorMessage>{errorsAddForm.title && errorsAddForm.title.message}</FormErrorMessage>
            </Box>
          </Grid>
        </FormControl>
        <FormControl isInvalid={!!errorsAddForm.detail} mt={{ base: 3, md: 6 }}>
          <Grid templateColumns={{ base: "1fr", md: "8rem 1fr" }} gap={2}>
            <FormLabel htmlFor='detail' fontWeight="bold" fontSize="lg">やること詳細</FormLabel>
            <Box>
              <Textarea
                id='detail'
                bg="white"
                borderColor="gray.300"
                {...registerAddForm('detail', {
                  required: '必須事項です',
                })}
              />
              <FormErrorMessage>{errorsAddForm.detail && errorsAddForm.detail.message}</FormErrorMessage>
            </Box>
          </Grid>
        </FormControl>
        <FormControl isInvalid={!!errorsAddForm.deadline} mt={{ base: 3, md: 6 }}>
          <Grid templateColumns={{ base: "1fr", md: "8rem 1fr" }} gap={2}>
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
                  borderColor="gray.300"
                  type="date"
                  w="170px"
                  min={today}
                  {...registerAddForm('deadline', {
                    required: '必須事項です',
                  })}
                />
              </InputGroup>
              <FormErrorMessage>{errorsAddForm.deadline && errorsAddForm.deadline.message}</FormErrorMessage>
            </Box>
          </Grid>
        </FormControl>
        <Flex justifyContent='flex-end' mt={5}>
          <Button bg="red.700" color="white" size="lg" _hover={{ bg: "red.500" }} type='submit'>追加</Button>
        </Flex>
      </form>
    </Box>
  );
}
