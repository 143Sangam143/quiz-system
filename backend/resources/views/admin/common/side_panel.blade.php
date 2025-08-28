<div class="flex flex-col h-full fixed gap-[1rem] bg-[#2a2185]">
    <div class="navigation  w-[300px]">
        <a href="{{route('admin.dashboard')}}" class="relative flex text-[#fff] no-underline w-full flex flex-col">
            <span class="title p-[1rem] pb-[.5rem] text-[1.5rem] text-nowrap border-b border-gray-100 ">Sangam</span>
        </a>
    </div>
    <div class="navigation w-[300px] bg-[#2a2185] border-l-[10px] border-[#2a2185] transition duration-500 overflow-x-hidden overflow-y-hidden">
        <ul class="menu top-0 left-0 w-full h-screen scrollbar-change">
            <!-- <li class="relative w-full mb-[1rem] list-none rounded-l-[30px] hover:bg-[#fff] hidden">
            </li> -->
            <li class="relative w-full mt-[2rem] mb-[1rem] list-none rounded-l-[30px] hover:bg-[#fff] {{Route::currentRouteName() == 'admin.dashboard' ? 'menu-active' : ''}}">
                <a href="{{route('admin.dashboard')}}" class="relative flex py-[8px] items-center text-[#fff] no-underline w-full ">
                    <span class="icon">
                        <ion-icon name="home-outline"></ion-icon>
                    </span>
                    <span class="title">Dashboard</span>
                </a>
            </li>

            @can('roles_index')
                <li class="relative w-full mb-[1rem] list-none rounded-l-[30px] hover:bg-[#fff] {{Request::segment(2) == 'roles' ? 'menu-active' : ''}}">
                    <a href="{{ route('roles.index') }}" class="relative flex py-[8px] items-center text-[#fff] no-underline w-full ">
                        <span class="icon">
                            <ion-icon name="person-outline"></ion-icon>
                        </span>
                        <span class="title">Manage Roles</span>
                    </a>
                </li>
            @endcan

            @can('permissions_index')
                <li class="relative w-full mb-[1rem] list-none rounded-l-[30px] hover:bg-[#fff] {{Request::segment(2) == 'permissions' ? 'menu-active' : ''}}">
                    <a href="{{ route('permissions.index') }}" class="relative flex py-[8px] items-center text-[#fff] no-underline w-full ">
                        <span class="icon">
                            <ion-icon name="key-outline"></ion-icon>
                        </span>
                        <span class="title">Manage Permissions</span>
                    </a>
                </li>
            @endcan



            @can('admins_index')
                <li class="relative w-full mb-[1rem] list-none rounded-l-[30px] hover:bg-[#fff] {{Request::segment(2) == 'manage-admins' ? 'menu-active' : ''}}">
                    <a href="{{route('manage-admins.index')}}" class="relative flex py-[8px] items-center text-[#fff] no-underline w-full ">
                        <span class="icon">
                            <ion-icon name="people-outline"></ion-icon>
                        </span>
                        <span class="title">Manage Admins</span>
                    </a>
                </li>
            @endcan
            @can('categoreis_index')
                <li class="relative w-full mb-[1rem] list-none rounded-l-[30px] hover:bg-[#fff] {{Request::segment(2) == 'manage-categories' ? 'menu-active' : ''}}">
                    <a href="{{route('manage-categories.index')}}" class="relative flex py-[8px] items-center text-[#fff] no-underline w-full ">
                        <span class="icon">
                            <ion-icon name="people-outline"></ion-icon>
                        </span>
                        <span class="title">Manage Category</span>
                    </a>
                </li>
            @endcan
            @can('difficulties_index')
                <li class="relative w-full mb-[1rem] list-none rounded-l-[30px] hover:bg-[#fff] {{Request::segment(2) == 'manage-difficulties' ? 'menu-active' : ''}}">
                    <a href="{{route('manage-difficulties.index')}}" class="relative flex py-[8px] items-center text-[#fff] no-underline w-full ">
                        <span class="icon">
                            <ion-icon name="people-outline"></ion-icon>
                        </span>
                        <span class="title">Manage Difficulties</span>
                    </a>
                </li>
            @endcan
            @can('questions_index')
                <li class="relative w-full mb-[1rem] list-none rounded-l-[30px] hover:bg-[#fff] {{Request::segment(2) == 'manage-questions' ? 'menu-active' : ''}}">
                    <a href="{{route('manage-questions.index')}}" class="relative flex py-[8px] items-center text-[#fff] no-underline w-full ">
                        <span class="icon">
                            <ion-icon name="people-outline"></ion-icon>
                        </span>
                        <span class="title">Manage Questions</span>
                    </a>
                </li>
            @endcan
            @can('answers_index')
                <li class="relative w-full mb-[1rem] list-none rounded-l-[30px] hover:bg-[#fff] {{Request::segment(2) == 'manage-answers' ? 'menu-active' : ''}}">
                    <a href="{{route('manage-answers.index')}}" class="relative flex py-[8px] items-center text-[#fff] no-underline w-full ">
                        <span class="icon">
                            <ion-icon name="people-outline"></ion-icon>
                        </span>
                        <span class="title">Manage Answers</span>
                    </a>
                </li>
            @endcan

            <li class="relative w-full mb-[1rem] list-none rounded-l-[30px] hover:bg-[#fff]">
                <a href="{{route('logout')}}" class="relative flex py-[8px] items-center text-[#fff] no-underline w-full">
                    <span class="icon">
                        <ion-icon name="log-out-outline"></ion-icon>
                    </span>
                    <span class="title">Sign Out</span>
                </a>
            </li>
        </ul>
    </div>
</div>

<style>
    .navigation .menu li.menu-active{
        background-color: var(--white);
        border-top-left-radius: 30px;
        border-bottom-left-radius: 30px;
    }
    .navigation .menu li.menu-active a,
    .navigation .menu li.menu-active .dropdown-activator{
        color: var(--blue);
    }
    .navigation .menu li.menu-active a::before,
    .navigation .menu li.menu-active .dropdown-activator::before {
        content: "";
        position: absolute;
        right: 0;
        top: -50px;
        width: 50px;
        height: 50px;
        background-color: transparent;
        border-radius: 50%;
        box-shadow: 35px 35px 0 10px var(--white);
        pointer-events: none;
    }
    .navigation .menu li.menu-active a::after,
    .navigation .menu li.menu-active .dropdown-activator::after {
        content: "";
        position: absolute;
        right: 0;
        bottom: -50px;
        width: 50px;
        height: 50px;
        background-color: transparent;
        border-radius: 50%;
        box-shadow: 35px -35px 0 10px var(--white);
        pointer-events: none;
    }

    .navigation .dropdown-container li:last-child {
        margin-bottom: 0px!important;
    }
</style>

<script>
    $(document).ready(function() {
        $('#parent-dropdown').click(function() {
            $('#dropdown-1').toggleClass('hidden');
        });

    });

    function dropdownToggler(htmlId, iconVisible, iconHidden){
        const element = $('#' + htmlId);
        const childElement = $('#' + htmlId + '-child');
        const icon = element.find('ion-icon');

        element.toggleClass('menu-active');
        if(childElement)
        {
            childElement.toggleClass('hidden');
        }
        
        if (element.hasClass('menu-active') && !childElement.hasClass('hidden')) {
            icon.attr('name', iconHidden);
        } else {
            icon.attr('name', iconVisible);
        }
    }
</script>