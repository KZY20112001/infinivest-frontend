"use client";

import { quicksand, raleway } from "@/app/fonts";
import { InputGroup } from "@/components/ui/input-group";

import {
  FormControl,
  FormHelperText,
  FormLabel,
} from "@chakra-ui/form-control";
import { Box, Button, Input, Text } from "@chakra-ui/react";
import { FC, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import * as Yup from "yup";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";

interface AuthFormProps {
  type: "Sign In" | "Sign Up";
  onSubmit: (email: string, password: string) => Promise<boolean>;
}

const AuthForm: FC<AuthFormProps> = ({ type, onSubmit }) => {
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
      console.log(values);
      const isSuccessful = await onSubmit(values.email, values.password);
      console.log("Result: ", isSuccessful);
      if (isSuccessful) {
        toast("Successful");
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
        <FormControl mb="32" className={raleway.className}>
          <FormLabel color="black" mb="8">
            <Text fontWeight={"semibold"} fontSize="xl">
              Password
            </Text>
          </FormLabel>
          <InputGroup
            endElement={
              showPassword ? (
                <FaEyeSlash onClick={() => setShowPassword(!showPassword)} />
              ) : (
                <FaEye onClick={() => setShowPassword(!showPassword)} />
              )
            }
            width="full"
          >
            <Input
              id="password"
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
        <Box display="flex" justifyContent="center" width="full">
          <Button
            type="submit"
            background="teal"
            borderRadius="xl"
            px="7"
            py="2"
            className={quicksand.className}
            backgroundColor="white"
            fontWeight="semibold"
            color={"black"}
            fontSize="lg"
            _hover={{
              backgroundColor: "gray.100",
              fontWeight: "extrabold",
            }}
          >
            {type}
          </Button>
        </Box>
      </form>
      <ToastContainer />
    </>
  );
};

export default AuthForm;
