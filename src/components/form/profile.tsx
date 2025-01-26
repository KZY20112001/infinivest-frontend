"use client";
import { quicksand, raleway } from "@/app/fonts";
import { Profile } from "@/types/profile";
import { FormControl } from "@chakra-ui/form-control";
import {
  Button,
  Card,
  Flex,
  Image,
  Link,
  Separator,
  Text,
  Input,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";

interface ProfileFormProps {
  profile: Profile | null;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ profile }) => {
  const router = useRouter();

  const [curProfile, setCurProfile] = useState<Profile>(
    profile ??
      (profile || { firstName: "", lastName: "", email: "", profileUrl: "" })
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(curProfile);
  };
  return (
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
        <Link href="/profile">
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
          {curProfile ? "Update My Profile" : "Create My Profile"}
        </Text>
      </Card.Header>

      <Separator borderColor="black" borderWidth="1px" />
      <Card.Body width="full" fontSize="xl">
        <Flex gap="10">
          <Image
            src={curProfile?.profileUrl}
            alt="profile picture"
            boxSize="300px"
            fit="cover"
          />

          <Flex direction={"column"} gap="4">
            <FormControl display="flex" gap="4" alignItems={"center"}>
              <Text className={quicksand.className} w="40" fontWeight={"bold"}>
                First Name
              </Text>
              <Input
                name="firstName"
                borderWidth="1px"
                p="1"
                value={curProfile.firstName}
                onChange={handleChange}
                placeholder="Enter your first name"
                className={raleway.className}
              />
            </FormControl>

            <FormControl display="flex" gap="4" alignItems={"center"}>
              <Text className={quicksand.className} w="40" fontWeight={"bold"}>
                Last Name
              </Text>
              <Input
                name="lastName"
                value={curProfile.lastName}
                borderWidth="1px"
                p="1"
                onChange={handleChange}
                placeholder="Enter your first name"
                className={raleway.className}
              />
            </FormControl>

            <FormControl display="flex" gap="4" alignItems={"center"}>
              <Text className={quicksand.className} w="40" fontWeight={"bold"}>
                Email
              </Text>
              <Input
                name="email"
                type="email"
                borderWidth="1px"
                p="1"
                value={curProfile.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className={raleway.className}
              />
            </FormControl>
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
        <Button
          onClick={handleSubmit}
          backgroundColor="gray.200"
          px="2"
          _hover={{ cursor: "pointer" }}
        >
          Update Profile
        </Button>
      </Card.Footer>
    </Card.Root>
  );
};

export default ProfileForm;
