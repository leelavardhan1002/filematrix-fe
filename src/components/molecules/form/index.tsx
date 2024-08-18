import React from "react";
import { useForm, Controller, FieldValues } from "react-hook-form";
import InputBox from "@/components/atoms/input";
import Button from "@/components/atoms/button";
import Link from "next/link";
import { FormInputProps, FormProps } from "@/utils/types";

const Form: React.FC<FormProps> = ({ inputs, buttonText, onSubmit }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
    reset,
  } = useForm<FieldValues>({
    defaultValues: inputs.reduce(
      (acc, input) => ({ ...acc, [input.id]: "" }),
      {}
    ),
  });

  const password = watch("password");
  const reEnterPassword = watch("re-enter password");

  // Custom validation function for password confirmation
  const validatePasswordMatch = (value: string) => {
    return value === password || "Passwords do not match";
  };

  // Custom validation for the checkbox
  const validateTermsAccepted = (value: boolean) => {
    return value || "You must accept the terms and conditions";
  };

  // Group input fields by type
  const groupedInputs = inputs.reduce((acc, input) => {
    const group =
      input.id === "firstName" || input.id === "lastName"
        ? "names"
        : input.id === "terms"
        ? "terms"
        : input.type === "password"
        ? "passwords"
        : "others";
    if (!acc[group]) acc[group] = [];
    acc[group].push(input);
    return acc;
  }, {} as Record<string, FormInputProps[]>);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit((data) => onSubmit(data, reset))(e);
      }}
      className="space-y-4"
    >
      {/* Render name fields side by side on medium screens and above */}
      {groupedInputs.names && (
        <div className="grid gap-4 md:grid-cols-2">
          {groupedInputs.names.map((input) => (
            <div key={input.id} className="space-y-1">
              <label
                htmlFor={input.id}
                className="block text-sm font-medium text-gray-700"
              >
                {input.label}
              </label>
              <Controller
                name={input.id}
                control={control}
                defaultValue=""
                rules={input.validation}
                render={({ field }) => (
                  <InputBox
                    type={input.type}
                    placeholder={input.placeholder}
                    {...field}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                )}
              />
              {errors[input.id] && (
                <span className="text-red-500 text-sm">
                  {(errors[input.id]?.message as string) || "Error"}
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Render other fields with full width on small screens */}
      {groupedInputs.others &&
        groupedInputs.others.map((input) => (
          <div key={input.id} className="space-y-1">
            <label
              htmlFor={input.id}
              className="block text-sm font-medium text-gray-700"
            >
              {input.label}
            </label>
            <Controller
              name={input.id}
              control={control}
              defaultValue=""
              rules={input.validation}
              render={({ field }) => (
                <InputBox
                  type={input.type}
                  placeholder={input.placeholder}
                  {...field}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              )}
            />
            {errors[input.id] && (
              <span className="text-red-500 text-sm">
                {(errors[input.id]?.message as string) || "Error"}
              </span>
            )}
          </div>
        ))}

      {/* Render password fields individually */}
      {groupedInputs.passwords && (
        <>
          {groupedInputs.passwords.map((input) => (
            <div key={input.id} className="space-y-1">
              <label
                htmlFor={input.id}
                className="block text-sm font-medium text-gray-700"
              >
                {input.label}
              </label>
              <Controller
                name={input.id}
                control={control}
                defaultValue=""
                rules={{
                  ...input.validation,
                  validate:
                    input.id === "re-enter password"
                      ? validatePasswordMatch
                      : undefined,
                }}
                render={({ field }) => (
                  <InputBox
                    type={input.type}
                    placeholder={input.placeholder}
                    {...field}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                )}
              />
              {errors[input.id] && (
                <span className="text-red-500 text-sm">
                  {(errors[input.id]?.message as string) || "Error"}
                </span>
              )}
            </div>
          ))}
        </>
      )}

      {/* Render terms and conditions checkbox */}
      {groupedInputs.terms && (
        <div className="flex flex-col items-center space-x-2">
          <Controller
            name="terms"
            control={control}
            defaultValue={false}
            rules={{ validate: validateTermsAccepted }}
            render={({ field }) => (
              <div className="flex items-center justify-start gap-3">
                <input
                  type="checkbox"
                  id="terms"
                  {...field}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="terms" className="text-sm text-gray-700">
                  I accept the{" "}
                  <Link href="#" className="text-blue-600">
                    terms and conditions
                  </Link>
                  .
                </label>
              </div>
            )}
          />

          {errors.terms && (
            <span className="text-red-500 text-sm">
              {errors.terms.message as string}
            </span>
          )}
        </div>
      )}

      <Button
        type="submit"
        customClasses="w-full bg-blue-500 text-white p-2 rounded-lg"
      >
        {buttonText}
      </Button>
    </form>
  );
};

export default Form;
