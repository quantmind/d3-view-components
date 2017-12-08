<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>{{ title }}</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css" media="all" rel="stylesheet" />
    <link href="docs.css?version={{ version }}" media="all" rel="stylesheet" />
    <script async src="docs{{ min }}.js?version={{ version }}" type="application/javascript"></script>
</head>
<body>
    <sidebar id="main"
        data-brand="d3-view Components"
        data-brand-url="/"
        data-primary-items='{{ components }}'
        data-item-attr="data-navigo">
        <dashboard schema="/_ui/admin/config.json" class="dashboard">
            <messages></messages>
            <tabs data-tab-items="moduleItems" data-tab-target="adminContent"></tabs>
        </dashboard>
    </sidebar>
</body>
</html>
