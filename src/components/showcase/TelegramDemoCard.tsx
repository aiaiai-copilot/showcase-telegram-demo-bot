import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

// Zod validation schema
const telegramDemoSchema = z.object({
  name: z.string().min(2, "Name must be longer than 2 characters"),
  message: z.string().min(3, "Message must be longer than 3 characters"),
});

// Interface for form data
interface FormValues {
  name: string;
  message: string;
}

export function TelegramDemoCard() {
  // Initialize useForm with zodResolver
  const form = useForm<FormValues>({
    resolver: zodResolver(telegramDemoSchema),
    defaultValues: {
      name: "",
      message: "",
    },
  });

  const { isSubmitting } = form.formState;

  // Async onSubmit handler
  const onSubmit = async (data: FormValues) => {
    try {
      const response = await fetch(import.meta.env.VITE_TELEGRAM_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success("Success! Check the channel for your message.");
        form.reset();
      } else {
        toast.error("Failed to send. Please try again later.");
      }
    } catch (error) {
      toast.error("Failed to send. Please try again later.");
    }
  };

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>Live Demo: Telegram Notifications</CardTitle>
        <CardDescription>
          Send a test message and watch it instantly appear in our public channel.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Step 1: Channel link */}
        <div className="space-y-2">
          <Label>1. Open the channel in a new tab (messages will appear here after sending):</Label>
          <Button variant="outline" asChild>
            <a
              href="https://t.me/showcase_demo_messages"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Send className="mr-2 h-4 w-4" />
              Go to Channel
            </a>
          </Button>
        </div>

        {/* Step 2: Form */}
        <div className="space-y-2">
          <Label>2. Send a test message:</Label>
          <Form {...form}>
            <form
              id="telegram-demo-form"
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4"
            >
              {/* FormField for 'name' with Input */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* FormField for 'message' with Textarea */}
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Your test message"
                        className="resize-none"
                        rows={4}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
      </CardContent>

      <CardFooter>
        {/* Submit button tied to the form, controlled by isSubmitting */}
        <Button
          type="submit"
          disabled={isSubmitting}
          form="telegram-demo-form"
          className="w-full"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            "Send Test Message"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
