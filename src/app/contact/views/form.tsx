"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/hooks/use-toast";

import { preventDefaultHandler, copyText } from "@/lib/utils";

const FormSchema = z.object({
  yourEmail: z.string().email(),
  subject: z.string().min(1).max(50),
  message: z.string().min(1).max(1000),
});
// 收件人
const MAIL_TO = "2775142500@qq.com";

type FormData = z.infer<typeof FormSchema>;
const ContactForm = () => {
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      yourEmail: "",
      subject: "",
      message: "",
    },
  });
  const onSubmit = () => {
    console.log(form.getValues());
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid">
        <div className="p-4 border-b flex justify-between">
          <div className="flex">
            <FormLabel className="min-w-[70px] flex items-center font-bold">
              收件人：
            </FormLabel>
            <Button
              className="rounded-full"
              onClick={(e) => e.preventDefault()}
            >
              {MAIL_TO}
            </Button>
          </div>
          <Button
            className="rounded-full w-12"
            variant={"ghost"}
            onClick={preventDefaultHandler(() => {
              copyText(MAIL_TO, () =>
                toast({ title: "复制成功", duration: 1000 })
              );
            })}
          >
            复制
          </Button>
        </div>
        <FormField
          control={form.control}
          name="yourEmail"
          render={({ field }) => (
            <FormItem className="p-4 border-b flex">
              <FormLabel className="min-w-[70px] flex items-center font-bold">
                您的邮箱：
              </FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="输入您的邮箱"
                  {...field}
                  className="rounded-[3px] bg-transparent border-0 placeholder:text-gray-700 text-white"
                  // 设置 focus-visible:shadow-none 生效效果有问题，只好这么写着先
                  style={{ boxShadow: "none" }}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem className="p-4 border-b flex">
              <FormLabel className="min-w-[70px] flex items-center font-bold">
                主题：
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="请输入主题"
                  {...field}
                  className="rounded-[3px] bg-transparent border-0 placeholder:text-gray-700 text-white"
                  style={{ boxShadow: "none" }}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem className="p-4">
              <FormLabel className="my-3 font-bold">消息</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="请输入消息"
                  {...field}
                  className="px-0 rounded-[3px] h-48 border-0 bg-transparent placeholder:text-gray-700 text-white resize-none"
                  style={{ boxShadow: "none" }}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="flex justify-center p-4">
          <Button type="submit" className="rounded-full w-48 m-auto">
            发送邮件
          </Button>
        </div>
      </form>
    </Form>
  );
};
export default ContactForm;
