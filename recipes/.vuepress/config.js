module.exports = {
  base: "/cookbook/",
  title: "My Blog",
  plugins: ["@vuepress/active-header-links"],
  head: [
    [
      "link",
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900|Material+Icons",
      },
    ],
  ],
}