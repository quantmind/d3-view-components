<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>{{ title }}</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css" media="all" rel="stylesheet" />
    <link href="https://unpkg.com/flatpickr/dist/flatpickr.min.css" media="all" rel="stylesheet" />
    <link href="https://unpkg.com/highlightjs/styles/docco.css" media="all" rel="stylesheet" />
    <link href="/docs.css?version={{ version }}" media="all" rel="stylesheet"/>
    {{#unless min}}
    <script type="application/javascript">window.development = true;</script>
    {{/unless}}
    <script async src="/docs{{ min }}.js?version={{ version }}" type="application/javascript"></script>
</head>
<body>
    <sidebar id="main"
        data-brand="d3-view Components"
        data-brand-url="/"
        data-primary-items='{{ components }}'
        data-navbar-items="navbarItems"
        data-navbar-title="navbarTitle"
        data-navbar-title-Url="currentUrl"
        data-item-attr="data-navigo">
            <routes>
                <markdown-content data-path="/"/>
                <markdown-content data-path="/:marked"/>
            </routes>
    </sidebar>
<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-110136266-2"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'UA-110136266-2');
</script>
</body>
</html>
