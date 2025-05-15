import { Dispatch, FC, SetStateAction, useRef, useState } from "react";
import { Button, Flex, NativeSelect, Text } from "@chakra-ui/react";

import { Upload, Trash } from "lucide-react";

import ClipLoader from "react-spinners/ClipLoader";

import { quicksand, raleway } from "@/app/fonts";
import { RoboPortfolioSplit } from "@/types/robo-portfolio";
import { generatePortfolioSplit } from "@/app/api/robo-portfolio";

interface GeneratePortfolioSplitProps {
  setPortfolioSplit: Dispatch<SetStateAction<RoboPortfolioSplit>>;
  setRecommendationReason: Dispatch<SetStateAction<string>>;
}

const GeneratePortfolioSplit: FC<GeneratePortfolioSplitProps> = ({
  setPortfolioSplit,
  setRecommendationReason,
}) => {
  const [riskToleranceLevel, setRiskToleranceLevel] = useState<string>("");
  const [bankName, setBankName] = useState<string>("");

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const invalid = !selectedFile || riskToleranceLevel === "" || bankName === "";
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    setIsLoading(true);
    if (invalid) return;
    const response = await generatePortfolioSplit(
      selectedFile!,
      bankName,
      riskToleranceLevel
    );
    if (response?.portfolio) setPortfolioSplit(response.portfolio);
    if (response?.reason) setRecommendationReason(response.reason);
    setIsLoading(false);
  };

  return (
    <Flex
      flexDirection="column"
      backgroundColor="white"
      color="black"
      py="4"
      px="8"
      borderRadius="md"
    >
      <Text
        className={raleway.className}
        fontWeight="semibold"
        fontSize="lg"
        mb="4"
      >
        Upload an example bank-statement to analyse your monthly expenses and
        generate a recommendated portfolio split.
      </Text>
      <input
        type="file"
        accept=".pdf"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
      <Flex alignItems={"center"} justifyContent={"space-between"}>
        <Flex
          px={4}
          py={2}
          backgroundColor={"gray.50"}
          w={64}
          borderRadius={"lg"}
          flexDir="row"
          fontSize="sm"
          justifyContent={"space-between"}
          gap="4"
        >
          <Button
            onClick={() => fileInputRef.current?.click()}
            backgroundColor={"green.50"}
            px="4"
          >
            <Upload className="mt-1" />
            <Text className={raleway.className} fontWeight={"semibold"} ml={1}>
              Upload File
            </Text>
          </Button>
          {selectedFile && (
            <Flex alignItems="center">
              <Text className={quicksand.className} w="16" overflowX="clip">
                {selectedFile.name}
              </Text>
              <Trash
                className="cursor-pointer"
                onClick={() => setSelectedFile(null)}
              />
            </Flex>
          )}
        </Flex>
        <Flex
          px={4}
          py={2}
          backgroundColor={"gray.50"}
          w={60}
          borderRadius={"lg"}
          flexDir="row"
          fontSize="sm"
          justifyContent={"space-between"}
          alignItems={"center"}
          gap="4"
        >
          <Text className={raleway.className} fontWeight={"semibold"} w={12}>
            Bank
          </Text>
          <NativeSelect.Root>
            <NativeSelect.Field
              className={quicksand.className}
              placeholder="Select"
              onChange={(event) => setBankName(event.target.value)}
            >
              <option value="ocbc">OCBC</option>
              <option value="sc">Standard Chartered</option>
            </NativeSelect.Field>
            <NativeSelect.Indicator />
          </NativeSelect.Root>
        </Flex>

        <Flex
          py={2}
          px={4}
          backgroundColor={"gray.50"}
          w={60}
          borderRadius={"lg"}
          flexDir="row"
          fontSize="sm"
          justifyContent={"space-between"}
          alignItems={"center"}
          gap="4"
        >
          <Text className={raleway.className} fontWeight={"semibold"} w={60}>
            Risk Tolerance
          </Text>
          <NativeSelect.Root>
            <NativeSelect.Field
              className={quicksand.className}
              placeholder="Select"
              onChange={(event) => setRiskToleranceLevel(event.target.value)}
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </NativeSelect.Field>
            <NativeSelect.Indicator />
          </NativeSelect.Root>
        </Flex>
        <Button
          onClick={handleUpload}
          backgroundColor={invalid ? "red.50" : "green.50"}
          disabled={invalid || isLoading}
          px="4"
          py="6"
          w="72"
          className={raleway.className}
          fontSize="md"
          fontWeight={"semibold"}
        >
          {isLoading ? <ClipLoader size={25} /> : "Generate Recommendation"}
        </Button>
      </Flex>
    </Flex>
  );
};

export default GeneratePortfolioSplit;
