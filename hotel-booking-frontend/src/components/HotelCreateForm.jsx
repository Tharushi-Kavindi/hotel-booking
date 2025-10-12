import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCreateHotelMutation } from "@/lib/api";
import { Textarea } from "./ui/textarea";

import { DevTool } from "@hookform/devtools";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  description: z.string().min(1, {
    message: "Description is required",
  }),
  image: z.string().min(1, {
    message: "Image is required",
  }),
  location: z.string().min(1, {
    message: "Location is required",
  }),
  price: z.number().nonnegative({
    message: "Price is required",
  }),
});

export default function HotelCreateFrom() {
  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      image: "",
      location: "",
      price: 0,
    },
  });

  const [createHotel, { isLoading }] = useCreateHotelMutation();

  // 2. Define a submit handler.
  async function onSubmit(values) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    try {
      await createHotel(values).unwrap();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="w-full max-w-3xl mx-auto px-4">
      <div className="bg-white/80 dark:bg-slate-900/60 backdrop-blur-md rounded-2xl shadow-lg ring-1 ring-slate-200 dark:ring-slate-800 overflow-hidden">
        <div className="px-6 py-3 sm:px-8 border-b border-slate-100 dark:border-slate-800">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
            Create a Hotel
          </h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Add a new hotel listing.
          </p>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="px-6 sm:px-8 sm:py-2 grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div className="space-y-4 md:col-span-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Hotel Name"
                        {...field}
                        className="rounded-md border-slate-200 focus:ring-2 focus:ring-emerald-300 transition"
                      />
                    </FormControl>
                    <FormDescription>
                      This is the name of the hotel.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Hotel description"
                      {...field}
                      className="min-h-[100px] rounded-md border-slate-200 focus:ring-2 focus:ring-emerald-300 transition"
                    />
                  </FormControl>
                  <FormDescription>
                    A short description of the hotel.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://example.com/photo.jpg"
                      {...field}
                      className="rounded-md border-slate-200 focus:ring-2 focus:ring-emerald-300 transition"
                    />
                  </FormControl>
                  <FormDescription>
                    URL to an image of the hotel.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="City, Country"
                      {...field}
                      className="rounded-md border-slate-200 focus:ring-2 focus:ring-emerald-300 transition"
                    />
                  </FormControl>
                  <FormDescription>Where is the hotel located?</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <div className="flex items-center rounded-md border border-slate-200 overflow-hidden focus-within:ring-2 focus-within:ring-emerald-300 transition">
                      <span className="px-3 text-sm bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                        $
                      </span>
                      <Input
                        type="number"
                        placeholder="100"
                        value={field.value}
                        onChange={(e) => {
                          const val = parseInt(e.target.value, 10);
                          if (isNaN(val)) {
                            field.onChange(0);
                          } else {
                            field.onChange(val);
                          }
                        }}
                        className="flex-1 rounded-none border-0 focus:ring-0"
                      />
                    </div>
                  </FormControl>
                  <FormDescription>Price per night in USD.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="md:col-span-2 flex items-center justify-end gap-3 pt-2">
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-black hover:bg-gray-800 text-white shadow-md flex items-center"
              >
                {isLoading && (
                  <span className="animate-spin inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                )}
                Create Hotel
              </Button>
            </div>

            <div className="md:col-span-2">
              <DevTool control={form.control} />
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
