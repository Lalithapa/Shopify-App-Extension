import { TitleBar } from "@shopify/app-bridge-react";
import { BlockStack, Box, Card, InlineGrid, Page, Text, TextField } from "@shopify/polaris";
import { Form, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { json } from "@remix-run/node";


//Importing Prisma DB

import db from '../db.server';

export async function loader() {
  //get Data from database
  let settings = await db.settings.findFirst();
  console.log("settings -----> ",settings);
 return json(settings) 
}


export async function action({request}) {
  const formData = await request.formData();
  const settings = Object.fromEntries(formData);
  // You can add your form submission logic here, like saving to a database.
  await db.settings.upsert({
    where:{
      id:"1"
    },
    update:{
       id:"1",
      name:settings.name,
      description: settings.description
    },
    create:{
       id:"1",
      name:settings.name,
      description: settings.description
    }
  })
  console.log("Updated Settings:", settings);
  return json(settings); // Return updated data or redirect to another page.
}

export default function Settings() {
  const settings = useLoaderData();
  const [formState, setFormState] = useState(settings);
  return (
    <Page
      divider
      primaryAction={{ content: "View on your store", disabled: true }}
      secondaryActions={[
        {
          content: "Duplicate",
          accessibilityLabel: "Secondary action label",
          onAction: () => alert("Duplicate action"),
        },
      ]}
    >
      <TitleBar title="Settings" />
      <BlockStack gap={{ xs: "800", sm: "400" }}>
        <InlineGrid columns={{ xs: "1fr", md: "2fr 5fr" }} gap="400">
          <Box
            as="section"
            paddingInlineStart={{ xs: 400, sm: 0 }}
            paddingInlineEnd={{ xs: 400, sm: 0 }}
          >
            <BlockStack gap="400">
              <Text as="h3" variant="headingMd">
                Settings
              </Text>
              <Text as="p" variant="bodyMd">
                Update app settings and prefernces.
              </Text>
            </BlockStack>
          </Box>
          <Card roundedAbove="sm">
            <Form method="post" >
              <BlockStack gap="400">
                <TextField name="name" label="App Name" value={formState?.name} onChange={(value)=> setFormState({...formState , name:value})} />
                <TextField name="description" label="Description" value={formState?.description} onChange={(value)=> setFormState({...formState , description:value})} />
                <button type="submit">Save</button>
              </BlockStack>
            </Form>
          </Card>
        </InlineGrid>
      </BlockStack>
    </Page>
  )
}
