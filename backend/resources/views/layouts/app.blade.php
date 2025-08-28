<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="title" content="@yield('meta_title')"/>
    <meta name="description" content="@yield('meta_description')"/>
    <title>@yield('page_title')</title>

        <script src="https://code.jquery.com/jquery-3.7.1.js"></script>
        <link rel="stylesheet" href="{{ asset('vendor/sangam-toastr/toastr.css') }}">
        <script src="{{ asset('vendor/sangam-toastr/toastr.min.js') }}"></script>

    @yield('css')
    @yield('head-script')
    @vite(['resources/css/app.css','resources/js/app.js'])
</head>
<body class=@yield('body-class')>
    <div id="main">
        @yield('content')
    </div>
    @yield('foot-script')
    @include('sangam-toastr::toastr')
</body>
</html>