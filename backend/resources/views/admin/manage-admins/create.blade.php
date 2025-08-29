@extends('admin.common.master')
@section('page_sub_title')
    ~ Create Admin
@endsection
@section('sub-content')
    <div>
        <div class="rounded overflow-hidden shadow bg-white w-full mb-[1rem]">
            <div class="px-6 py-2 border-b border-light-grey flex justify-between">
                <div class="font-bold text-xl">Create Admin</div>
                <div>
                    <a href="{{route('manage-admins.index')}}" class="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-xs px-4 py-2 mb-2">Back</a>
                </div>
            </div>
        </div>
        <div>
            <form action="{{route('manage-admins.store')}}" method="post" enctype="multipart/form-data">
                @csrf
                <div class="grid md:grid-cols-3 gap-[1rem] md:gap-[2rem]">
                    <div class="h-fit md:col-span-2 shadow px-[3rem] py-[1.5rem] bg-[#66666622] space-y-[1.5rem]">
                        <div class="grid lg:grid-cols-12">
                            <label for="admin_name" class="lg:col-span-2 text-gray-900 pt-[.5rem] mb-0 lg:text-right">Name:</label>
                            <div class="lg:col-span-1"></div>
                            <div class="lg:col-span-9">
                                <input type="text" name="name" id="admin_name" class="h-[39px] px-[9px] py-[12px] text-[13px] text-[#555555] border border-[#eeeeee] w-full" required autofocus>
                            </div>
                        </div>
                        <div class="grid lg:grid-cols-12">
                            <label for="email" class="lg:col-span-2 text-gray-900 pt-[.5rem] mb-0 lg:text-right">Email:</label>
                            <div class="lg:col-span-1"></div>
                            <div class="lg:col-span-9">
                                <input type="email" name="email" id="email" class="h-[39px] px-[9px] py-[12px] text-[13px] text-[#555555] border border-[#eeeeee] w-full" required>
                            </div>
                        </div>
                        <div class="grid lg:grid-cols-12">
                            <label for="phone" class="lg:col-span-2 text-gray-900 pt-[.5rem] mb-0 lg:text-right">Phone:</label>
                            <div class="lg:col-span-1"></div>
                            <div class="lg:col-span-9">
                                <input type="text" name="phone" id="phone" class="h-[39px] px-[9px] py-[12px] text-[13px] text-[#555555] border border-[#eeeeee] w-full" required>
                            </div>
                        </div>
                        <div class="grid lg:grid-cols-12">
                            <label for="pin" class="lg:col-span-2 text-gray-900 pt-[.5rem] mb-0 lg:text-right">Pin:</label>
                            <div class="lg:col-span-1"></div>
                            <div class="lg:col-span-9">
                                <input type="number" name="pin" id="pin" class="h-[39px] px-[9px] py-[12px] text-[13px] text-[#555555] border border-[#eeeeee] w-full" required>
                            </div>
                        </div>
                        <div class="grid lg:grid-cols-12">
                            <label for="password" class="lg:col-span-2 text-gray-900 pt-[.5rem] mb-0 lg:text-right">Password:</label>
                            <div class="lg:col-span-1"></div>
                            <div class="lg:col-span-9">
                                <input type="password" name="password" id="password" class="h-[39px] px-[9px] py-[12px] text-[13px] text-[#555555] border border-[#eeeeee] w-full" required>
                            </div>
                        </div>
                    </div>
                    <div class="h-fit md:col-span-1 shadow  space-y-[1.5rem]">
                        <div class="bg-[#66666622] px-[3rem] py-[1.5rem]">
                            <div class="bg-white p-[.5rem] flex">
                                <button type="submit" class="ml-auto focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-xs px-4 py-2">Submit</button>
                            </div>
                        </div>
                        <div class="bg-[#66666622] px-[3rem] py-[1.5rem]">
                            <div class="bg-white p-[.5rem] flex flex-col gap-[.2rem]">
                                <label for="image" class="lg:col-span-2 text-[#222] bg-[#66666622] mb-0 text-left">Role:</label>
                                <select name="role" id="role" required>
                                    <option value="">Choose a role</option>
                                    @foreach($roleData as $row)
                                        <option value="{{$row->id}}">{{$row->display_name}}</option>
                                    @endforeach
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
@endsection