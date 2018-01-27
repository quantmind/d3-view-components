

module.exports = {
    title: "Components for d3-view",
    github: "quantmind/d3-view-components",
    algolia: {
        apiKey: process.env.ALGOLIA_API_KEY
    },
    google: {
        analytics: "UA-110136266-2"
    },
    markdown: {
        paths: [
            {
                slug: "docs",
                path: "../src",
                template: "sidenav",
                context: {

                }
            },
            {
                slug: "",
                path: "/",
                template: "topnav"
            }
        ],
        plugins: {
        }
    }
};
