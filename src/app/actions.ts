"use server";

export async function createClient(
  prevState: { message: string },
  formData: FormData
) {
  const data = formData;
  try {
    console.log(data.get("name"));
    return { message: `Nice to meet you ${data.get("name")}` };
  } catch (err) {
    return { message: "Failed!" };
  }
}
