<div class="main">
    <div class="topbar shadow fixed bg-white z-[500]">
        <div class="toggle">
            <ion-icon name="menu-outline"></ion-icon>
        </div>

        <div class="search">
            <label>
                <input type="text" placeholder="Search here">
                <ion-icon name="search-outline"></ion-icon>
            </label>
        </div>

        <button id="dropdownDefaultButton" data-dropdown-toggle="dropdown" class="text-white hover:bg-[#dbdbdb] rounded-lg inline-flex items-center" type="button">
            <div class="user">
                <img src="{{ asset('admin/images/default/default-profile.png') }}" alt="">
            </div>
        </button>

        <!-- Dropdown menu -->
        <div id="dropdown" class="z-[1000000] hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
            <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                @if(Auth::guard('admin')->check())
                  <li>
                      <a class="block px-4 py-2 border-b border-gray-100 cursor-default font-bold">{{Auth::guard('admin')->user()->name}}</a>
                  </li>
                @endif
                <li>
                    <a href="#" class="block px-4 py-2 border-b border-gray-100 hover:bg-gray-100">Profile</a>
                </li>
                <li>
                    <a href="{{route('logout')}}" class="block px-4 py-2 hover:bg-gray-100">Sign out</a>
                </li>
            </ul>
        </div>

    </div>

    <div class="p-[1.25rem] mt-[4rem]">
        @yield('sub-content')
    </div>
</div>
