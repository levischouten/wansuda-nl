import { config, fields, collection, singleton } from "@keystatic/core";

export default config({
  storage: {
    kind: process.env.NODE_ENV === "development" ? "local" : "cloud",
  },
  cloud: {
    project: "levi-schouten/wansuda-nl",
  },
  ui: {
    brand: {
      name: "Wansuda",
    },
    navigation: {
      Admin: ["settings"],
      Pages: [
        "homepage",
        "servicespage",
        "coursespage",
        "terms-and-conditions-page",
      ],
      Collections: ["courses", "services"],
    },
  },
  singletons: {
    settings: singleton({
      label: "Settings",
      path: "/content/settings",
      schema: {},
    }),
    servicespage: singleton({
      label: "Servicespage",
      path: "/content/servicespage",
      schema: {
        headerText: fields.document({
          description: "The text to display in the header.",
          label: "Header Text",
          formatting: {
            headingLevels: [1],
            inlineMarks: true,
          },
        }),
      },
    }),
    coursespage: singleton({
      label: "Coursespage",
      path: "/content/coursespage",
      schema: {
        headerText: fields.document({
          description: "The text to display in the header.",
          label: "Header Text",
          formatting: {
            headingLevels: [1],
            inlineMarks: true,
          },
        }),
      },
    }),
    "terms-and-conditions-page": singleton({
      label: "Terms and Conditions page",
      path: "/content/terms-and-conditions",
      schema: {
        content: fields.document({
          label: "Content",
          description:
            "The content to display on the terms and conditions page.",
          formatting: {
            headingLevels: [1],
            inlineMarks: true,
          },
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
            description: "The features to display on the homepage.",
          }
        ),
        contentText: fields.document({
          label: "Content Text",
          description: "The text to display as the 'content' text.",
          formatting: {
            headingLevels: [2, 3],
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
      },
    }),
  },
  collections: {
    services: collection({
      label: "Services",
      slugField: "title",
      path: "/content/services/*",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        description: fields.text({
          label: "Description",
          multiline: true,
          description: "A short description of this service",
        }),
        content: fields.document({
          description: "The content to display for this service",
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
          description: "The image to display for this service",
        }),
      },
    }),
    courses: collection({
      label: "Courses",
      slugField: "title",
      path: "/content/courses/*",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        description: fields.text({
          label: "Description",
          multiline: true,
          description: "A short description of this course",
        }),
        content: fields.document({
          description: "The content to display for this course",
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
          description: "The image to display for this course",
        }),
      },
    }),
  },
});