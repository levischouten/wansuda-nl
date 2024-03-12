import { config, fields, collection, singleton } from "@keystatic/core";

export default config({
  storage: {
    kind: "local",
  },
  cloud: {
    project: "levi-schouten/wansuda-nl",
  },
  singletons: {
    settings: singleton({
      label: "Settings",
      path: "/content/settings",
      schema: {},
    }),
    homepage: singleton({
      label: "Homepage",
      path: "/content/homepage",
      schema: {
        heroText: fields.document({
          label: "Hero Text",
          formatting: {
            headingLevels: [1],
            inlineMarks: true,
          },
        }),
        heroImage: fields.image({
          label: "Hero Image",
          directory: "public/site/images",
          publicPath: "/site/images",
        }),
        featureText: fields.document({
          label: "Service Text",
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
          })
        ),
        contentText: fields.document({
          label: "Content Text",
          formatting: {
            headingLevels: [2, 3],
            inlineMarks: true,
            listTypes: true,
          },
        }),
        contentImage: fields.image({
          label: "Content Image",
          directory: "public/site/images",
          publicPath: "/site/images",
        }),
        contentImageText: fields.document({
          label: "Content Image Text",
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
          label: "Content",
          formatting: true,
          dividers: true,
          links: true,
          images: {
            directory: "public/site/images",
            publicPath: "/site/images",
            schema: {
              title: fields.text({
                label: "Caption",
                description:
                  "The text to display under the image in a caption.",
              }),
            },
          },
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
          label: "Content",
          formatting: true,
          dividers: true,
          links: true,
          images: {
            directory: "public/site/images",
            publicPath: "/site/images",
            schema: {
              title: fields.text({
                label: "Caption",
                description:
                  "The text to display under the image in a caption.",
              }),
            },
          },
        }),
      },
    }),
  },
});
