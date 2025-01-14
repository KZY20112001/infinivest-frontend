"use client";
import { Card, Flex } from "@chakra-ui/react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Profile } from "@/types/profile";
import { quicksand } from "@/app/fonts";

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
        width="60%"
        h="full"
        display="flex"
        flexDir="column"
        alignItems={"center"}
      >
        <Card.Header
          className={quicksand.className}
          fontWeight={"bold"}
          fontSize="3xl"
        >
          My Profile
        </Card.Header>
        <Card.Body gap="2">
          <Avatar
            src={profile.profileUrl}
            name="Nue Camp"
            size="lg"
            shape="rounded"
          />
          <Card.Title mt="2">Nue Camp</Card.Title>
          <Card.Description>
            This is the card body. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Curabitur nec odio vel dui euismod fermentum.
            Curabitur nec odio vel dui euismod fermentum.
          </Card.Description>
        </Card.Body>
        <Card.Footer justifyContent="flex-end">
          <Button variant="outline">View</Button>
          <Button>Join</Button>
        </Card.Footer>
      </Card.Root>
    </Flex>
  );
};

export default ProfileCard;
