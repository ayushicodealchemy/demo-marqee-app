import { useState, useEffect } from "react";
import {AppsFilledIcon} from '@shopify/polaris-icons';
import { TitleBar, useAppBridge } from "@shopify/app-bridge-react";
import { Page, Layout, Text, Card, Button, BlockStack, InlineStack, MediaCard, List, InlineGrid, FooterHelp, Link, Icon } from "@shopify/polaris";

export default function Index() {
  const app = useAppBridge();
  const [shop, setShop] = useState(null);
  const [isBlockInstalled, setIsBlockInstalled] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setShop(urlParams.get("shop"));
  }, []);

  const handleActivateClick = () => {
    if (!shop) {
      alert("Shop information not available!");
      return;
    }

    const template = "index";
    const uuid = "SHOPIFY_SIMPLE_MARQUEE_ID";
    const handle = "simple-marquee-ease";

    if (!isBlockInstalled) {
      alert("App block not installed yet. Please install it first.");
      return;
    }

    const themeEditorUrl = `https://${shop}/admin/themes/current/editor?template=${template}&addAppBlockId=${uuid}/${handle}&target=newAppsSection`;




    window.open(themeEditorUrl, "_blank");
  };

  useEffect(() => {
    const checkBlockInstallation = async () => {
      const blockExists = true; 
      setIsBlockInstalled(blockExists);
    };

    if (shop) {
      checkBlockInstallation();
    }
  }, [shop]);

  return (
    <Page narrowWidth>
      <TitleBar title="Marquee App" />
      <BlockStack gap="500">
        <Layout>
          {}
          <Layout.Section>
            <MediaCard
              title="Welcome to Marquee Ease ! 🎉"
              description={
                <BlockStack gap="500">
                  <Text variant="bodyMd">
                    Congratulations on installing our user-friendly Shopify extension that allows you to add an eye-catching scrolling message to your store.
                  </Text>
                  <Text variant="bodyMd">
                   Marquee Ease is perfect for displaying important announcements, promotions, or news updates, ensuring that your customers stay informed and engaged while browsing your store.
                  </Text>
                  <Text variant="bodyMd">
                    This app will help you easily customize and add marquee banners to any page on your store.
                  </Text>
                </BlockStack>
              }
            >
              <img
                alt="Getting Started"
                width="100%"
                height="100%"
                style={{
                  objectFit: 'cover',
                  objectPosition: 'center',
                }}
                src="https://cdn.shopify.com/s/files/1/0671/0349/0220/files/image-removebg_upscaled1.jpg?v=1739269737?width=1850"
              />
            </MediaCard>
          </Layout.Section>

          <Layout.Section>
            <Card>
              <BlockStack gap="500">
                <BlockStack gap="200">
                  <Text as="h2" variant="headingMd">
                    Get Started
                  </Text>
                  <Text variant="bodyMd">
                    Getting started is a breeze. Head over to the theme editor where you can easily add and customize your  Marquee Ease block. The block allows you to edit the message to fit your theme by using the theme fonts and colors.
                  </Text>
                </BlockStack>

                <BlockStack gap="200">
                  <Text as="h3" variant="headingMd">
                    Click the button to add the block now, or read "Detailed Instructions".
                  </Text>
                  <InlineStack gap="300">
                  <Button variant="primary" onClick={handleActivateClick}>
                  <Icon source={AppsFilledIcon} tone="base"/>
                  Go to Marquee App
                    </Button>
                  </InlineStack>
                </BlockStack>

                {}
                <BlockStack gap="200">
                  <Text as="h3" variant="headingSm" fontWeight="medium">
                    Detailed Instructions
                  </Text>

                  <InlineGrid columns={2}>
                    <BlockStack gap="500">
                      <List type="number">
                        <List.Item>Go to the Theme Editor</List.Item>
                        <List.Item>Click on "Add Section"</List.Item>
                        <List.Item>Click on "Marquee Ease"</List.Item>
                        <List.Item>Edit your block by selecting it</List.Item>
                      </List>
                      <BlockStack>
                        <Text variant="bodyMd">
                          Happy scrolling, and thank you for choosing  Marquee Ease to enhance your Shopify store!
                        </Text>
                      </BlockStack>
                    </BlockStack>

                    <img
                      alt="Getting Started"
                      width="100%"
                      height="100%"
                      style={{
                        objectFit: 'cover',
                        objectPosition: 'center',
                      }}
                      src="https://cdn.shopify.com/s/files/1/0671/0349/0220/files/Group_1171276280.png?v=1739275185"
                    />
                  </InlineGrid>
                </BlockStack>
              </BlockStack>
            </Card>
          </Layout.Section>
        </Layout>
      </BlockStack>
      <FooterHelp align="start">
        Developed by Code Alchemy{' '}
        <Link url="https://help.shopify.com/manual/orders/fulfill-orders">
          fulfilling orders
        </Link>
      </FooterHelp>
    </Page>
  );
}


