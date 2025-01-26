import {
  Button,
  Card,
  Flex,
  Image,
  Link,
  Separator,
  Text,
} from "@chakra-ui/react";
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
        width="50%"
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
            <Button position="absolute" left="0">
              <FaArrowLeft />
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
          <Flex gap="10">
            <Image
              src={profile.profileUrl}
              alt="profile picture"
              boxSize="300px"
              fit="cover"
            />

            <Flex direction={"column"} gap="4">
              <Flex gap="4">
                <Text
                  className={quicksand.className}
                  w="20"
                  fontWeight={"bold"}
                >
                  Name :
                </Text>
                <Text
                  className={raleway.className}
                  textTransform={"capitalize"}
                >
                  {profile.firstName} {profile.lastName}
                </Text>
              </Flex>
              <Flex gap="4">
                <Text
                  className={quicksand.className}
                  w="20"
                  fontWeight={"bold"}
                >
                  Email :
                </Text>
                <Text className={raleway.className}>{profile.email}</Text>
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
            Portfolio Settings
          </Button>
        </Card.Footer>
      </Card.Root>
    </Flex>
  );
};

export default ProfileCard;
