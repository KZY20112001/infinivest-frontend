"use client";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { signIn } from "@/app/api/auth";
import { quicksand, raleway } from "@/app/fonts";
import { InputGroup } from "@/components/ui/input-group";
import { Button } from "@/components/ui/button";

import {
  FormControl,
  FormHelperText,
  FormLabel,
} from "@chakra-ui/form-control";
import { Flex, Input, Text, Link as ChakraLink } from "@chakra-ui/react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import * as Yup from "yup";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";

const SignInForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Your email cannot be empty!")
        .email("Invalid email!"),

      password: Yup.string()
        .required("Your password cannot be empty!")
        .min(8, "At least 8 characters!")
        .max(30, "At most 30 characters!")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,30})/,
          "At least 1 uppercase, 1 lowercase and 1 number"
        ),
    }),
    onSubmit: async (values) => {
      const isSuccessful = await signIn(values.email, values.password);
      if (isSuccessful) {
        toast("Successful");
        router.push("/profile");
      } else {
        toast("Wrong Credentials");
      }
    },
  });
  return (
    <>
      <form onSubmit={formik.handleSubmit} className="w-96">
        <FormControl mb="32" className={raleway.className}>
          <FormLabel color="black" mb="8">
            <Text fontWeight={"semibold"} fontSize="xl">
              Your Email
            </Text>
          </FormLabel>
          <Input
            id="email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
            borderWidth={"1px"}
            color="black"
            px="2"
            autoComplete="on"
          />
          {formik.touched.email && formik.errors.email && (
            <FormHelperText
              marginRight={0}
              marginLeft="auto"
              textColor="red"
              fontWeight="bold"
              fontSize={"small"}
            >
              {formik.errors.email}
            </FormHelperText>
          )}
        </FormControl>
        <FormControl mb="24" className={raleway.className}>
          <FormLabel color="black" mb="8">
            <Text fontWeight={"semibold"} fontSize="xl">
              Password
            </Text>
          </FormLabel>
          <InputGroup
            endElement={
              showPassword ? (
                <FaEyeSlash
                  className="cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                />
              ) : (
                <FaEye
                  className="cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                />
              )
            }
            width="full"
          >
            <Input
              id="password"
              autoComplete="on"
              type={showPassword ? "text" : "password"}
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
              borderWidth={"1px"}
              color="black"
              px="2"
            />
          </InputGroup>
          {formik.touched.password && formik.errors.password && (
            <FormHelperText
              marginRight={0}
              marginLeft="auto"
              textColor="red"
              fontWeight="bold"
              fontSize="small"
            >
              {formik.errors.password}
            </FormHelperText>
          )}
        </FormControl>
        <Flex justifyContent="center" width="full" mb="6">
          <Button
            type="submit"
            background="teal"
            borderRadius="xl"
            px="10"
            py="6"
            className={quicksand.className}
            backgroundColor="white"
            fontWeight="semibold"
            color={"black"}
            fontSize="xl"
            _hover={{
              backgroundColor: "gray.100",
              fontWeight: "extrabold",
            }}
          >
            Login
          </Button>
        </Flex>
        <Flex justifyContent="space-between" width="full">
          <ChakraLink asChild>
            <NextLink href="/signup">
              <Button
                type="submit"
                background="teal"
                borderRadius="xl"
                px="5"
                py="2"
                className={quicksand.className}
                backgroundColor="white"
                fontWeight="semibold"
                color={"black"}
                fontSize="sm"
                _hover={{
                  backgroundColor: "gray.100",
                  fontWeight: "extrabold",
                }}
              >
                New User?
              </Button>
            </NextLink>
          </ChakraLink>
          <ChakraLink asChild>
            <NextLink href="/signup">
              <Button
                type="submit"
                background="teal"
                borderRadius="xl"
                px="5"
                py="2"
                className={quicksand.className}
                backgroundColor="white"
                fontWeight="semibold"
                color={"black"}
                fontSize="sm"
                _hover={{
                  backgroundColor: "gray.100",
                  fontWeight: "extrabold",
                }}
              >
                Forgot Password
              </Button>
            </NextLink>
          </ChakraLink>
        </Flex>
      </form>
      <ToastContainer />
    </>
  );
};

export default SignInForm;
