

module.exports = {
    title: "Components for d3-view",
    github: "quantmind/d3-view-components",
    algolia: {
        apiKey: process.env.ALGOLIA_API_KEY
    },
    google: {
        analyticsId: "UA-110136266-2"
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
                index: "index",
                path: "site",
                template: "topnav",
                navbarRightNav: [
                    {
                        name: "docs",
                        href: "/docs"
                    }
                ]
            }
        ],
        plugins: {
        }
    }
};
