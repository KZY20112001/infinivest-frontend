import Link from "next/link";

import { Button, Card, Flex, Image, Separator, Text } from "@chakra-ui/react";
import { Profile } from "@/types/profile";
import { quicksand, raleway } from "@/app/fonts";
import { FaArrowLeft } from "react-icons/fa";

interface ProfileCardProps {
  profile: Profile;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile }) => {
  return (
    <Flex
      flexDirection={"column"}
      minH="100vh"
      gap={12}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Card.Root
        width="45%"
        h="full"
        display="flex"
        flexDir="column"
        alignItems={"center"}
      >
        <Card.Header
          w="full"
          mb="4"
          display="flex"
          flexDirection="row"
          alignItems="center"
          position="relative"
        >
          <Link href="/">
            <Button position="absolute" left="4">
              <FaArrowLeft className="text-blue-500 cursor-pointer" />
            </Button>
          </Link>

          <Text
            className={quicksand.className}
            fontWeight="bold"
            fontSize="3xl"
            mx="auto"
          >
            My Profile
          </Text>
        </Card.Header>

        <Separator borderColor="black" borderWidth="1px" />
        <Card.Body width="full" fontSize="xl">
          <Flex gap="20">
            <Image
              src={
                profile && profile.profileUrl !== ""
                  ? profile.profileUrl
                  : "/profile-placeholder.jpg"
              }
              alt="profile picture"
              boxSize="250px"
              fit="cover"
            />

            <Flex direction={"column"} gap="4">
              <Flex gap="4" alignItems="center">
                <Text
                  className={quicksand.className}
                  w="40"
                  fontWeight={"bold"}
                >
                  Name :
                </Text>
                <Text
                  borderRadius="lg"
                  borderWidth={1}
                  bgColor="blue.50"
                  px="2"
                  py="1"
                  className={quicksand.className}
                  textTransform={"capitalize"}
                >
                  {profile.firstName} {profile.lastName}
                </Text>
              </Flex>

              <Flex gap="4" alignItems="center">
                <Text
                  className={quicksand.className}
                  w="40"
                  fontWeight={"bold"}
                >
                  Risk Tolerance :
                </Text>
                <Text
                  borderRadius="lg"
                  borderWidth={1}
                  bgColor="blue.50"
                  px="2"
                  py="1"
                  className={quicksand.className}
                  textTransform={"capitalize"}
                >
                  {profile.riskTolerance}
                </Text>
              </Flex>

              <Flex gap="4" alignItems="center">
                <Text
                  className={quicksand.className}
                  w="40"
                  fontWeight={"bold"}
                >
                  Investment Style :
                </Text>
                <Text
                  borderRadius="lg"
                  borderWidth={1}
                  bgColor="blue.50"
                  px="2"
                  py="1"
                  className={quicksand.className}
                  textTransform={"capitalize"}
                >
                  {profile.investmentStyle}
                </Text>
              </Flex>

              <Flex gap="4" alignItems="center">
                <Text
                  className={quicksand.className}
                  w="40"
                  fontWeight={"bold"}
                >
                  Investment Horizon :
                </Text>
                <Text
                  borderRadius="lg"
                  borderWidth={1}
                  bgColor="blue.50"
                  px="2"
                  py="1"
                  className={quicksand.className}
                  textTransform={"capitalize"}
                >
                  {profile.investmentHorizon}
                </Text>
              </Flex>

              <Flex gap="4" alignItems="center">
                <Text
                  className={quicksand.className}
                  w="40"
                  fontWeight={"bold"}
                >
                  Annual Income :
                </Text>
                <Text
                  borderRadius="lg"
                  borderWidth={1}
                  bgColor="blue.50"
                  px="2"
                  py="1"
                  className={quicksand.className}
                  textTransform={"capitalize"}
                >
                  ${profile.annualIncome}
                </Text>
              </Flex>

              <Flex gap="4" alignItems="center">
                <Text
                  className={quicksand.className}
                  w="40"
                  fontWeight={"bold"}
                >
                  Experience Level :
                </Text>
                <Text
                  borderRadius="lg"
                  borderWidth={1}
                  bgColor="blue.50"
                  px="2"
                  py="1"
                  className={quicksand.className}
                  textTransform={"capitalize"}
                >
                  {profile.experienceLevel}
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </Card.Body>
        <Card.Footer
          w="full"
          fontSize={"lg"}
          display="flex"
          justifyContent={"space-around"}
          className={raleway.className}
          fontWeight={"semibold"}
        >
          <Link href="/profile/update">
            <Button
              backgroundColor="gray.200"
              px="2"
              _hover={{ cursor: "pointer" }}
            >
              Update Profile
            </Button>
          </Link>
          <Button
            backgroundColor="gray.200"
            px="2"
            _hover={{ cursor: "pointer" }}
          >
            Set Up Portfolios
          </Button>
        </Card.Footer>
      </Card.Root>
    </Flex>
  );
};

export default ProfileCard;
