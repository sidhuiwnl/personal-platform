"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { createRoomAction } from "./action"


const formSchema = z.object({
    name: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }).max(50),
    description :  z.string().min(1).max(50),
    language : z.string().min(1).max(50),
    githubRepo : z.string().min(1).max(50),
  })

export default function CreateRoomForm(){
   
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          name: "",
          description: "",
          language : "",
          githubRepo : ""
        },
      })

      async function onSubmit(values: z.infer<typeof formSchema>) {
        await createRoomAction(values);
       

      }

      return (
        
            <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>name</FormLabel>
                <FormControl>
                  <Input {...field}/>
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>description</FormLabel>
                <FormControl>
                  <Input {...field}  />
                </FormControl>
                <FormDescription>
                  please describe on what what you will be coding on
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="language"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Languages</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>
                 language used for the project
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="githubRepo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>GithubLink</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>
                  Place the github link that you are working on
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
        
        
      )
}