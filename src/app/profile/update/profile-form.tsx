"use client";
import {
  createProfile,
  generateProfilePictureUploadUrl,
  updateProfile,
} from "@/app/api/profile";
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
import { ChangeEvent, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";

interface ProfileFormProps {
  profile: Profile | null;
}
const generateRandomString = (bytes: number) => {
  const array = new Uint8Array(bytes);
  window.crypto.getRandomValues(array);
  return Array.from(array)
    .map((byte) => (byte % 36).toString(36))
    .join("");
};

const ProfileForm: React.FC<ProfileFormProps> = ({ profile }) => {
  const router = useRouter();

  const [curProfile, setCurProfile] = useState<Profile>({
    firstName: profile?.firstName ?? "",
    lastName: profile?.lastName ?? "",
    address: profile?.address ?? "",
    profileUrl: profile?.profileUrl,
    profileID: profile?.profileID,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    try {
      const profileID = curProfile.profileID ?? generateRandomString(16);
      const uploadUrl = await generateProfilePictureUploadUrl(profileID);
      const uploadResponse = await fetch(uploadUrl, {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": `${file?.type}`,
        },
      });
      if (!uploadResponse.ok) {
        console.error("Failed to upload file");
        return;
      }
      const imageUrl = uploadUrl.split("?")[0];
      const profileUrl = `${imageUrl}?t=${new Date().getTime()}`; // Add a timestamp to bypass cache

      setCurProfile((prev) => ({
        ...prev,
        profileUrl,
        profileID,
      }));
      toast("Uploaded Successfully");
    } catch (error) {
      console.error(error);
      toast("Profile Picture failed");
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let isSuccessful = false;
    if (profile) {
      isSuccessful = await updateProfile(curProfile);
    } else {
      isSuccessful = await createProfile(curProfile);
    }
    if (isSuccessful) {
      toast("Successful");
      router.push("/profile");
    } else {
      toast("Error in updating Profile");
    }
  };
  return (
    <>
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
          <Link href="/profile">
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
            {profile ? "Update My Profile" : "Create My Profile"}
          </Text>
        </Card.Header>

        <Separator borderColor="black" borderWidth="1px" />
        <Card.Body width="full" fontSize="xl">
          <Flex gap="20">
            <Flex flexDir={"column"} alignItems={"center"} gap="4">
              <Image
                src={
                  curProfile?.profileUrl ??
                  "https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg"
                }
                alt="profile picture"
                boxSize="250px"
                fit="cover"
              />
              <Button
                px="4"
                backgroundColor="blue.100"
                className={raleway.className}
                color="gray.600"
                fontSize="md"
                fontWeight="semibold"
                onClick={() => document.getElementById("file-input")?.click()}
              >
                Upload New Image
              </Button>
              <Input
                id="file-input"
                type="file"
                accept="image/*"
                display="none"
                onChange={handleUpload}
              />
            </Flex>

            <Flex direction={"column"} gap="4">
              <FormControl display="flex" gap="4" alignItems={"center"}>
                <Text
                  className={quicksand.className}
                  w="40"
                  fontWeight={"bold"}
                >
                  First Name
                </Text>
                <Input
                  name="firstName"
                  borderWidth="1px"
                  p="1"
                  value={curProfile.firstName}
                  onChange={handleChange}
                  placeholder="Enter your first name"
                  className={quicksand.className}
                />
              </FormControl>

              <FormControl display="flex" gap="4" alignItems={"center"}>
                <Text
                  className={quicksand.className}
                  w="40"
                  fontWeight={"bold"}
                >
                  Last Name
                </Text>
                <Input
                  name="lastName"
                  value={curProfile.lastName}
                  borderWidth="1px"
                  p="1"
                  onChange={handleChange}
                  placeholder="Enter your first name"
                  className={quicksand.className}
                />
              </FormControl>

              <FormControl display="flex" gap="4" alignItems={"center"}>
                <Text
                  className={quicksand.className}
                  w="40"
                  fontWeight={"bold"}
                >
                  Address
                </Text>
                <Input
                  name="address"
                  type="address"
                  borderWidth="1px"
                  p="1"
                  value={curProfile.address}
                  onChange={handleChange}
                  placeholder="Enter your address"
                  className={quicksand.className}
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
        >
          <Button
            onClick={handleSubmit}
            px="4"
            backgroundColor="blue.100"
            className={raleway.className}
            color="gray.600"
            fontSize="md"
            fontWeight="bold"
            _hover={{ cursor: "pointer" }}
          >
            Update Profile
          </Button>
        </Card.Footer>
      </Card.Root>
      <ToastContainer />
    </>
  );
};

export default ProfileForm;
