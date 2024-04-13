"use server";

export const onFormSubmit = async (data: FormData) => {
  console.log("data", data);

  return "Hello World";
};
