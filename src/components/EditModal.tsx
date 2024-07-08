import { Box, Button, FormControl, FormErrorMessage, FormLabel, Grid, Input, InputGroup, InputLeftElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea } from "@chakra-ui/react";
import { CalendarIcon } from '@chakra-ui/icons'
import { Todo } from "../types/todo";
import { getTodayDate } from "../hooks/useTodos";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  errorsEditForm: any;
  currentTodo: Todo | null;
  registerEditForm: any;
}

export const EditModal: React.FC<Props> = (props) => {
  const {
    isOpen,
    onClose,
    onSubmit,
    errorsEditForm,
    currentTodo,
    registerEditForm,
  } = props;

  const today = getTodayDate();

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign="center" fontSize="2xl">todoを編集</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={onSubmit}>
            <FormControl isInvalid={!!errorsEditForm.title}>
              <Grid templateColumns="8rem 1fr" gap={2}>
                <FormLabel htmlFor='title' fontWeight="bold" fontSize="lg">タイトル</FormLabel>
                <Box>
                  <Input
                    id='title'
                    bg="white"
                    borderColor="gray.300"
                    defaultValue={currentTodo?.title}
                    {...registerEditForm('title', {
                      required: '必須事項です',
                    })}
                  />
                  <FormErrorMessage>{errorsEditForm.title && errorsEditForm.title.message}</FormErrorMessage>
                </Box>
              </Grid>
            </FormControl>
            <FormControl isInvalid={!!errorsEditForm.detail} mt={6}>
              <Grid templateColumns="8rem 1fr" gap={2}>
                <FormLabel htmlFor='detail' fontWeight="bold" fontSize="lg">やること詳細</FormLabel>
                <Box>
                  <Textarea
                    id='detail'
                    bg="white"
                    borderColor="gray.300"
                    defaultValue={currentTodo?.detail}
                    {...registerEditForm('detail', {
                      required: '必須事項です',
                    })}
                  />
                  <FormErrorMessage>{errorsEditForm.detail && errorsEditForm.detail.message}</FormErrorMessage>
                </Box>
              </Grid>
            </FormControl>
            <FormControl isInvalid={!!errorsEditForm.deadline} mt={6}>
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
                      borderColor="gray.300"
                      type="date"
                      w="170px"
                      min={today}
                      defaultValue={currentTodo?.deadline}
                      {...registerEditForm('deadline', {
                        required: '必須事項です',
                      })}
                    />
                  </InputGroup>
                  <FormErrorMessage>{errorsEditForm.deadline && errorsEditForm.deadline.message}</FormErrorMessage>
                </Box>
              </Grid>
            </FormControl>
            <ModalFooter>
              <Button bg="teal.400" color="white" _hover={{ bg: "teal.600" }} type='submit'>編集</Button>
            </ModalFooter>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
