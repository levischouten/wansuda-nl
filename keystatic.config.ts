import { config, fields, collection, singleton } from "@keystatic/core";

export default config({
  storage: {
    kind: "local",
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
        title: fields.text({ label: "Title" }),
        description: fields.text({ label: "Description" }),
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
