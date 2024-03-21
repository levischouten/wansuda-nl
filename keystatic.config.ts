import { config, fields, collection, singleton } from "@keystatic/core";

export default config({
  storage: {
    kind: process.env.NODE_ENV === "development" ? "local" : "cloud",
  },
  cloud: {
    project: "wansuda/wansuda-nl",
  },
  ui: {
    brand: {
      name: "Wansuda",
    },
    navigation: {
      Admin: ["settings"],
      Pages: ["homepage", "contact", "---", "features", "content"],
    },
  },
  singletons: {
    settings: singleton({
      label: "Settings",
      path: "/content/settings",
      schema: {
        email: fields.text({
          label: "Email",
          description: "The email address to use for contact forms.",
        }),
        phone: fields.text({
          label: "Phone",
          description: "The phone number to use for contact forms.",
        }),
        facebook: fields.text({
          label: "Facebook",
          description: "The Facebook page to link to.",
        }),
      },
    }),
    homepage: singleton({
      label: "Homepage",
      path: "/content/homepage",
      schema: {
        heroText: fields.document({
          description: "The text to display as the 'hero' text.",
          label: "Hero Text",
          formatting: {
            headingLevels: [1],
            inlineMarks: true,
          },
        }),
        heroImage: fields.image({
          description: "The image to display as the 'hero' image.",
          label: "Hero Image",
          directory: "public/site/images",
          publicPath: "/site/images",
        }),
        heroCta: fields.object(
          {
            title: fields.text({ label: "Title" }),
            href: fields.text({ label: "Link" }),
          },
          { label: "Hero CTA" },
        ),
        heroSecondaryCta: fields.object(
          {
            title: fields.text({ label: "Title" }),
            href: fields.text({ label: "Link" }),
          },
          { label: "Hero Secondary CTA" },
        ),
        featureText: fields.document({
          label: "Feature Text",
          description: "The text to display as the 'feature' text.",
          formatting: {
            headingLevels: [2, 3],
            inlineMarks: true,
          },
        }),
        features: fields.array(
          fields.object({
            title: fields.text({ label: "Title" }),
            description: fields.text({ label: "Description", multiline: true }),
            href: fields.text({ label: "Link" }),
            icon: fields.select({
              label: "Icon",
              options: [
                {
                  label: "Heart",
                  value: "heart",
                },
                {
                  label: "Graduation Cap",
                  value: "graduation-cap",
                },
              ],
              defaultValue: "heart",
            }),
          }),
          {
            label: "Features",
            description: "The features to display on the homepage.",
            itemLabel(props) {
              return props.fields.title.value || "Untitled";
            },
            validation: {
              length: {
                min: 2,
                max: 2,
              },
            },
          },
        ),
        contentText: fields.document({
          label: "Content Text",
          description: "The text to display as the 'content' text.",
          formatting: {
            headingLevels: [2, 3, 4],
            inlineMarks: true,
            listTypes: true,
          },
        }),
        contentImage: fields.image({
          description:
            "The image to display as the 'content' image. This will have a gradient overlay with the content image text.",
          label: "Content Image",
          directory: "public/site/images",
          publicPath: "/site/images",
        }),
        contentImageText: fields.document({
          label: "Content Image Text",
          description: "The text to display over the 'content' image.",
          formatting: {
            headingLevels: [4],
            inlineMarks: true,
          },
          dividers: true,
          links: true,
        }),
        contentCta: fields.object(
          {
            title: fields.text({ label: "Title" }),
            href: fields.text({ label: "Link" }),
          },
          { label: "Content CTA" },
        ),
      },
    }),
    contact: singleton({
      label: "Contact Page",
      path: "/content/contact",
      schema: {
        title: fields.text({ label: "Title" }),
        content: fields.document({
          label: "Content",
          description: "The content of the page.",
          formatting: true,
          links: true,
          images: true,
        }),
      },
    }),
  },
  collections: {
    content: collection({
      label: "Content pages",
      slugField: "title",
      path: "/content/content/**",
      entryLayout: "content",
      format: {
        contentField: "content",
      },
      schema: {
        title: fields.slug({
          name: {
            label: "Title",
            description: "The title of the page.",
          },
        }),
        content: fields.document({
          label: "Content",
          description: "The content of the page.",
          formatting: true,
          links: true,
          images: true,
        }),
      },
    }),
    features: collection({
      label: "Feature pages",
      slugField: "title",
      path: "/content/features/**",
      schema: {
        title: fields.slug({
          name: {
            label: "Title",
            description: "The title of the page.",
          },
        }),
        description: fields.text({
          label: "Description",
          description: "The description of the page.",
          multiline: true,
        }),
        header: fields.document({
          description: "The text to display in the header.",
          label: "Header Text",
          formatting: {
            headingLevels: [1],
            inlineMarks: true,
          },
        }),
        items: fields.array(
          fields.object(
            {
              title: fields.slug({
                name: {
                  label: "Title",
                  description: "The title of the item.",
                },
              }),
              description: fields.text({
                label: "Description",
                description: "The description of the item.",
                multiline: true,
              }),
              content: fields.document({
                description: "The content to display for this item",
                label: "Content",
                formatting: {
                  headingLevels: [2],
                  inlineMarks: true,
                },
              }),
              image: fields.image({
                label: "Image",
                directory: "public/site/images",
                publicPath: "/site/images",
                description: "The image to display for this item",
              }),
            },
            {
              label: "Item",
              description: "Configure the item to display on the page.",
            },
          ),
          {
            label: "Items",
            description: "The items to display on the page.",
            itemLabel(props) {
              return props.fields.title.value.name || "Untitled";
            },
          },
        ),
      },
    }),
  },
});
