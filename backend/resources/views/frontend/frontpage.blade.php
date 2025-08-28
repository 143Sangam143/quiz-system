@extends("frontend.common.master")
@section('meta_title', ('Sangam Quiz System'))
@section('meta_description', ('This is the quiz project task created for Infotech Services'))
@section('page_sub_title')
    CMS
@endsection
@section('sub-content')
    <section class="">
        <div class="">
            <div class="mx-auto px-4 text-center h-[75vh] bg-no-repeat bg-center" style='background-image: url("{{ asset('templates-assets/' . ($site_settings->template ?? 'default') . '/preset/default/banner/home.png') }}"); filter: drop-shadow(1px 1px 1px rgba(0, 0, 0, 0.5));'>
                <h2 class="text-4xl font-bold mt-[5rem] mb-4 cursor-default drop-shadow-[0px_0px_.5px_#000000]">Welcome to Sangam Quiz System</h2>
            </div>
        </div>
    </section>
@endsection

@section('sub-css')
    <style>
        body, #main{
            height: 100vh;
            overflow-y: auto;
            scrollbar-width: none; /* Firefox */
            -ms-overflow-style: none; /* Internet Explorer 10+ */
        }

        body::-webkit-scrollbar, #main::-webkit-scrollbar{
            width: 0;
            height: 0;
            display: none; /* Safari and Chrome */
        }
    </style>
@endsection