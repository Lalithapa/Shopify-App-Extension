import { TitleBar } from "@shopify/app-bridge-react";
import { BlockStack, Box, Button, Card, Form, InlineGrid, Page, Text, TextField } from "@shopify/polaris";
import { useState } from "react";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export async function loader() {
  //get Data from database
  let settings = {
    name:"Lalit",
    description:"Wishlist Store by Lalit Thapa"
  }
 return json(settings) 
}

export async function action({request}) {
  const formData = await request.formData();
  const settings = Object.fromEntries(formData);
  // You can add your form submission logic here, like saving to a database.
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
              <TextField name="name" label="App Name" value={formState.name} onChange={(value)=> setFormState({...formState , name:value})} />
              <TextField name="description" label="Description"  value={formState.description} onChange={(value)=> setFormState({...formState , description:value})} />
              <Button type="submit" >Save</Button>
            </BlockStack>
            </Form>
          </Card>
        </InlineGrid>
      </BlockStack>
    </Page>
  )
}
