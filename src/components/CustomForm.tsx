import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";

type FormData = {
  command: string;
  image: File;
};

const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];

export const CustomForm: React.FC<{ onSubmit: (text: string) => void }> = ({ onSubmit }) => {
  const form = useForm<FormData>({
    defaultValues: {
      command: localStorage.getItem("command") ?? "",
      image: undefined as any,
    },
    mode: "onSubmit",
  });

  const handleSubmit = async (data: FormData) => {
    if (localStorage.getItem("command") !== data.command) {
      localStorage.setItem("command", data.command);
    }

    const formData = new FormData();
    formData.append("command", data.command);
    formData.append("image", data.image);

    try {
      const result = await fetch("http://127.0.0.1:3005/image/generate-text", {
        method: "POST",
        body: formData,
      });

      const result_json = await result.json();
      if (result_json.text) {
        onSubmit(result_json.text);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        {/* Command input */}
        <FormField
          control={form.control}
          name="command"
          rules={{ required: "Поле обязательно" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Инструкция</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  {...field}
                  placeholder="Напишите инструкцию по работе с изображением"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Image input */}
        <FormField
          control={form.control}
          name="image"
          rules={{
            required: "Изображение обязательно",
            validate: {
              isAllowedType: (file: File) =>
                file && allowedTypes.includes(file.type)
                  ? true
                  : "Допустимые форматы: jpg, jpeg, png, webp",
            },
          }}
          render={({ field: { onChange, ...field } }) => (
            <FormItem>
              <FormLabel>Изображение</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) onChange(file);
                  }}
                  {...field}
                  value={undefined}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Отправить</Button>
      </form>
    </Form>
  );
};
