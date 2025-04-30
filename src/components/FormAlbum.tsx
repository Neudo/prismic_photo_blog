"use client";
import React from "react";
import Bounded from "@/components/Bounded";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

  const formSchema = z.object({
    form_password: z
      .string()
      .min(2, { message: "Le mot de passe doit contenir au moins 2 caractères." })
  });


export default function FormAlbum() {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      form_password: "",
    },
  });


const onSubmit = async (data: any) => {
  const response = await fetch("/api/album", {
    method: "POST",
    body: JSON.stringify(data),
  });

  // If the response is a redirect, manually update the browser location
  if (response.redirected) {
    window.location.href = response.url;
    return;
  }

  // Optionally, handle error messages
  const result = await response.json();
  if (result.error) {
    alert(result.error); // or show an error in your UI
  }
};
  return (
    <Bounded className="bg-dark min-h-screen">
      <h1>Album</h1>
      <p>Merci de saisir le mot de passe de l&apos;album</p>
     
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 rounded-lg bg-stone-50 p-6 shadow-inner"
      >
        <FormField
          control={form.control}
          name="form_password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mot de passe</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormDescription>Saisissez le mot de passe de l&apos;album.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Envoyer</Button>

      </form>
    </Form>
    </Bounded>
  );
}
