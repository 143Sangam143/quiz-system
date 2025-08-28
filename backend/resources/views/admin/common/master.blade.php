@extends('layouts.app')
@section('page_title')
   Sangam
    @yield('page_sub_title')
@endsection
@section('css')
    <link rel="stylesheet" href="{{ asset('admin/css/main.css') }}">
    @yield('sub-css')
@endsection
@section('head-script')

@endsection
@section('content')
    @include('admin.common.full_panel')
@endsection
@section('foot-script')
    <script src="{{ asset('admin/js/main.js') }}"></script>
    <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
    <script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>
    @yield('sub-script')
@endsection
