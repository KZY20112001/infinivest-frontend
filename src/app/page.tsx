import { quicksand, raleway } from "@/app/fonts";
import { Button, Flex, Text } from "@chakra-ui/react";

const Home = () => {
  return (
    <Flex
      flexDirection={"column"}
      minH="100vh"
      gap={28}
      justifyContent={"center"}
    >
      <Flex
        fontWeight="semibold"
        display="flex"
        flexDir="column"
        gap="4rem"
        alignItems={"center"}
        color={"black"}
      >
        <Text
          fontSize="9xl"
          fontWeight="bold"
          className={`${quicksand.className} bg-gradient-to-l from-black to-[#b8860b] bg-clip-text `}
          color={"transparent"}
        >
          Infinivest
        </Text>

        <Text
          fontSize="2xl"
          width="fit-content"
          className={`${raleway.className} bg-gradient-to-r from-black to-[#b8860b] bg-clip-text `}
          fontWeight={"bold"}
          color={"transparent"}
        >
          Investing Made Simple...
        </Text>
      </Flex>

      <Flex
        justifyContent="center"
        flexDir="row"
        alignItems="center"
        gap="1rem"
        color="black"
        fontWeight={"bold"}
      >
        <Button
          height="3.5rem"
          width="15rem"
          fontSize="xl"
          margin="10px 10px"
          backgroundColor="white"
          className={raleway.className}
          _hover={{
            backgroundColor: "gray.100",
            fontWeight: "extrabold",
          }}
        >
          Register
        </Button>
        <Button
          height="3.5rem"
          width="15rem"
          fontSize="xl"
          margin="10px 10px"
          backgroundColor="white"
          className={raleway.className}
          _hover={{
            backgroundColor: "gray.100",
            fontWeight: "extrabold",
          }}
        >
          Login
        </Button>
      </Flex>
    </Flex>
  );
};

export default Home;
