@extends('layouts.app')

@section('page_title')
    Sangam
    @yield('page_sub_title')
@endsection

@section('css')
    @yield('sub-css')
@endsection

@section('head-script')

@endsection

@section('content')
    @include('frontend.common.header')
        @yield('sub-content')
    @include('frontend.common.footer')
@endsection

@section('foot-script')
    @yield('sub-script')
@endsection