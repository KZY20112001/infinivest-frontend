"use client";

import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";

import { FormControl } from "@chakra-ui/form-control";
import {
  Button,
  Card,
  Flex,
  Image,
  Link as ChakraLink,
  Separator,
  Text,
  Input,
  NativeSelect,
} from "@chakra-ui/react";

import {
  createProfile,
  generateProfilePictureUploadUrl,
  updateProfile,
} from "@/app/api/profile";
import { quicksand, raleway } from "@/app/fonts";
import { InputGroup } from "@/components/ui/input-group";
import { Profile } from "@/types/profile";

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
    profileUrl: profile?.profileUrl,
    profileID: profile?.profileID,
    riskTolerance: profile?.riskTolerance ?? "",
    investmentStyle: profile?.investmentStyle ?? "",
    investmentHorizon: profile?.investmentHorizon ?? "",
    annualIncome: profile?.annualIncome ?? 0,
    experienceLevel: profile?.experienceLevel ?? "",
  });

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
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
          <ChakraLink asChild position="absolute" left="4">
            <NextLink href="/home">
              <ArrowLeft className="text-blue-500 cursor-pointer" />
            </NextLink>
          </ChakraLink>
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
        <Card.Body width="full" fontSize="lg">
          <Flex gap="20">
            <Flex flexDir={"column"} alignItems={"center"} gap="4">
              <Image
                src={
                  curProfile?.profileUrl && curProfile?.profileUrl !== ""
                    ? curProfile?.profileUrl
                    : "https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg"
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
                  w="60"
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
                  w="60"
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

              <FormControl display="flex" alignItems={"center"} gap={"1"}>
                <Text
                  className={quicksand.className}
                  w="60"
                  fontWeight={"bold"}
                >
                  Risk Tolerance
                </Text>
                <NativeSelect.Root w="60">
                  <NativeSelect.Field
                    className={quicksand.className}
                    placeholder="Select"
                    name="riskTolerance"
                    borderWidth={1}
                    borderColor="black"
                    p="1"
                    onChange={handleChange}
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </NativeSelect.Field>
                  <NativeSelect.Indicator />
                </NativeSelect.Root>
              </FormControl>

              <FormControl display="flex" alignItems={"center"} gap={"1"}>
                <Text
                  className={quicksand.className}
                  w="60"
                  fontWeight={"bold"}
                >
                  Investment Style
                </Text>
                <NativeSelect.Root w="60">
                  <NativeSelect.Field
                    className={quicksand.className}
                    placeholder="Select"
                    name="investmentStyle"
                    borderWidth={1}
                    borderColor="black"
                    p="1"
                    onChange={handleChange}
                  >
                    <option value="Conservative">Conservative</option>
                    <option value="Balanced">Balanced</option>
                    <option value="Growth">Growth</option>
                    <option value="Aggressive">Aggressive</option>
                  </NativeSelect.Field>
                  <NativeSelect.Indicator />
                </NativeSelect.Root>
              </FormControl>

              <FormControl display="flex" alignItems={"center"} gap={"1"}>
                <Text
                  className={quicksand.className}
                  w="60"
                  fontWeight={"bold"}
                >
                  Investment Horizon
                </Text>
                <NativeSelect.Root w="60">
                  <NativeSelect.Field
                    className={quicksand.className}
                    placeholder="Select"
                    name="investmentHorizon"
                    borderWidth={1}
                    borderColor="black"
                    p="1"
                    onChange={handleChange}
                  >
                    <option value="Short Term">Short Term (0-3 years)</option>
                    <option value="Medium Term">
                      Medium Term (3-10 years)
                    </option>
                    <option value="Long Term">Long Term (10+ years)</option>
                  </NativeSelect.Field>
                  <NativeSelect.Indicator />
                </NativeSelect.Root>
              </FormControl>

              <FormControl display="flex" alignItems={"center"} gap={"1"}>
                <Text
                  className={quicksand.className}
                  w="60"
                  fontWeight={"bold"}
                >
                  Experience Level
                </Text>
                <NativeSelect.Root w="60">
                  <NativeSelect.Field
                    className={quicksand.className}
                    placeholder="Select"
                    name="experienceLevel"
                    borderWidth={1}
                    borderColor="black"
                    p="1"
                    onChange={handleChange}
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Expert">Expert</option>
                  </NativeSelect.Field>
                  <NativeSelect.Indicator />
                </NativeSelect.Root>
              </FormControl>

              <FormControl display="flex" alignItems={"center"} gap={"1"}>
                <Text
                  className={quicksand.className}
                  w="60"
                  fontWeight={"bold"}
                >
                  Annual Income (Estimated)
                </Text>
                <InputGroup startElement="$">
                  <Input
                    name="annualIncome"
                    type="number"
                    borderWidth="1px"
                    p="1"
                    value={curProfile.annualIncome}
                    onChange={handleChange}
                    placeholder="Enter your annual income (estimated)"
                    className={quicksand.className}
                  />
                </InputGroup>
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
            {profile ? "Update Profile" : "Create Profile"}
          </Button>
        </Card.Footer>
      </Card.Root>
      <ToastContainer />
    </>
  );
};

export default ProfileForm;
