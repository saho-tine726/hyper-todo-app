import { Box, Button, Flex } from "@chakra-ui/react";

type Props = {
  sortDeadline: () => void;
  sortStatus: () => void;
}

export const Sort: React.FC<Props> = (props) => {
  const {
    sortDeadline,
    sortStatus
  } = props;

  return (
    <Box>
      <Flex mt={6} justifyContent={{ base: "center", md: "flex-start" }}>
        <Button
          bg="orange.400"
          color="white"
          _hover={{ bg: "orange.600" }}
          mr={2}
          onClick={sortDeadline}
          size={{ base: "xs", md: "md" }}
        >
          期限が近い順に並べ替える
        </Button>
        <Button
          bg="green.400"
          color="white"
          _hover={{ bg: "green.600" }}
          onClick={sortStatus}
          size={{ base: "xs", md: "md" }}
        >
          ステータス順に並べ替える
        </Button>
      </Flex>
    </Box>
  )
}
