import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import { Textarea } from "./ui/textarea";
import { useState } from "react";
import { Loader2 } from "lucide-react";

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
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const handleSubmit = async (data: FormData) => {
    setLoading(true);
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
    } finally {
      setLoading(false);
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
                <Textarea
                  {...field}
                  placeholder="Напишите инструкцию по работе с изображением"
                ></Textarea>
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
                    if (file) {
                      onChange(file);
                      const url = URL.createObjectURL(file);
                      setPreviewUrl(url);
                    } else {
                      setPreviewUrl(null);
                    }
                  }}
                  {...field}
                  value={undefined}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
{previewUrl && (
            <img
              src={previewUrl}
              alt="Предпросмотр"
              className="mt-2 rounded-md max-h-64 object-contain border border-gray-300"
            />
          )}
<Button type="submit" disabled={loading}>
  {loading ? (
    <>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      Обработка...
    </>
  ) : (
    "Отправить"
  )}
</Button>

      </form>
    </Form>
  );
};
