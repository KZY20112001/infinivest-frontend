import { getProfile } from "@/app/api/profile";
import { Card, Flex } from "@chakra-ui/react";
import { Metadata } from "next";
import Link from "next/link";
import { raleway } from "../fonts";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Infinivest",
  description: "Home Page for Infinivest",
};

const Home = async () => {
  const profile = await getProfile();

  return (
    <Flex justifyContent={"center"}>
      <Card.Root w="30%" justifyContent={"center"} mt="10rem">
        <Card.Header
          className={raleway.className}
          fontSize="xl"
          fontWeight={"semibold"}
          alignItems={"center"}
          borderBottomWidth={2}
          borderColor="black"
          pb="2"
          mx="1"
        >
          {profile
            ? `Welcome Back ${profile.firstName}`
            : "Welcome To InfiniVest!"}
        </Card.Header>
        <Card.Body
          className={raleway.className}
          display="flex"
          flexDir="column"
          gap="4"
        >
          <Flex gap="8" alignItems={"center"}>
            <Avatar
              size="2xl"
              src={
                profile
                  ? profile.profileUrl ?? "/profile-placeholder.jpg"
                  : "/default-profile.png"
              }
            />
            <Link href="/profile/update">
              <Button fontWeight="semibold">
                {profile ? "Update" : "Create"} Your Profile Now!
              </Button>
            </Link>
          </Flex>
          <Flex gap="8" justifyContent={"center"}>
            <Link href="/portfolio">
              <Button
                fontWeight="semibold"
                px="3"
                py="1"
                borderRadius="xl"
                bgColor="blue.50"
              >
                Go to Portfolios
              </Button>
            </Link>
          </Flex>
        </Card.Body>
      </Card.Root>
    </Flex>
  );
};

export default Home;
