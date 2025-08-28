@extends('layouts.app')
@section('page_title')
    Sangam ~ Admin Login
@endsection
@section('content')
    <section class="flex items-center justify-center h-screen w-full p-[1.5rem]">
        <div class="space-y-[2rem] flex flex-col items-center">
            <div class="navigation w-[300px] bg-purple-700">
                <div class="relative flex text-[#fff] no-underline w-full flex flex-col">
                    <span class="title p-[1rem] pb-[.5rem] text-[1.5rem] text-nowrap mx-auto">Sangam</span>
                </div>
            </div>
            <div class="bg-[#66666622] flex flex-col">
                <h1 class="p-[.8rem] text-center text-[1.5rem] font-bold">Admin Login</h1>
                <form action="{{route('admin.authenticate')}}" method="post">
                    @csrf
                    <div class="flex flex-col shadow px-[3rem] py-[1.5rem] bg-[#66666622] space-y-[1.5rem]">
                        <div class="grid lg:grid-cols-12 bg-white p-[.5rem]">
                            <label for="email" class="lg:col-span-2 text-gray-900 pt-[.5rem] mb-0 lg:text-right">Email:</label>
                            <div class="lg:col-span-1"></div>
                            <div class="lg:col-span-9">
                                <input type="email" name="email" id="email" class="h-[39px] px-[9px] py-[12px] text-[13px] text-[#555555] border border-[#eeeeee] w-full" required autofocus>
                            </div>
                        </div>
                        <div class="grid lg:grid-cols-12 bg-white p-[.5rem]">
                            <label for="password" class="lg:col-span-2 text-gray-900 pt-[.5rem] mb-0 lg:text-right">Password:</label>
                            <div class="lg:col-span-1"></div>
                            <div class="lg:col-span-9">
                                <input type="password" name="password" id="password" class="h-[39px] px-[9px] py-[12px] text-[13px] text-[#555555] border border-[#eeeeee] w-full" required>
                            </div>
                        </div>
                        <div class="grid lg:grid-cols-12 bg-white p-[.5rem]">
                            <label for="pin" class="lg:col-span-2 text-gray-900 pt-[.5rem] mb-0 lg:text-right">Pin:</label>
                            <div class="lg:col-span-1"></div>
                            <div class="lg:col-span-9">
                                <input type="password" name="pin" id="pin" class="h-[39px] px-[9px] py-[12px] text-[13px] text-[#555555] border border-[#eeeeee] w-full" required>
                            </div>
                        </div>
                        <div class="bg-white p-[.5rem] flex">
                            <button type="submit" class="ml-auto focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-xs px-4 py-2">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </section>
@endsection