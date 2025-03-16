import { FC } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Flex, Text } from "@chakra-ui/react";

import { AssetPriceHistory } from "@/types/asset";
import { quicksand } from "../fonts";
interface PriceChartProps {
  data: AssetPriceHistory;
  totalInvested: number;
}

const PriceChart: FC<PriceChartProps> = ({ data, totalInvested }) => {
  return (
    <Flex flexDir={"column"} gap="4">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="date" tick={{ fontSize: 12 }} />
          <YAxis domain={["auto", "auto"]} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="close"
            stroke="#8884d8"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
      <Flex
        gap="2"
        fontSize="md"
        className={quicksand.className}
        fontWeight="semibold"
      >
        <Text w="60">Overall Total Invested:</Text>
        <Text>$ {totalInvested.toFixed(2)}</Text>
      </Flex>
    </Flex>
  );
};

export default PriceChart;
