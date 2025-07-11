export const source = `   <div class="flex justify-center">
<div class="h-[90%] w-full md:w-3/4 m-4">
    <div class="text-xl cursor-pointer flex flex-col justify-center items-center mt-5 md:mt-0">
        <h1 class="font-semibold text-3xl text-gray-700 m-2">Log In</h1>
        <div class="flex">
            <ion-icon name="logo-google"
                class="py-2 rounded px-4 border-2 m-1 cursor-pointer border-violet-600 text-white bg-violet-600 hover:bg-white hover:text-violet-600 text-2xl">
            </ion-icon>
            <ion-icon name="logo-facebook"
                class="py-2 rounded px-4 border-2 m-1 cursor-pointer border-blue-500 bg-blue-500 text-white hover:bg-white hover:text-blue-500 text-2xl">
            </ion-icon>
        </div>
        <div class="text-gray-700 font-semibold">  or </div>
    </div>
    <div class="flex flex-col justify-center items-center mt-10 md:mt-4 space-y-6 md:space-y-8">
        <div class="">
            <input type="text" placeholder="Email"
                class=" bg-gray-100 rounded-lg px-5 py-2 focus:border border-violet-600 focus:outline-none text-black placeholder:text-gray-600 placeholder:opacity-50 font-semibold md:w-72 lg:w-[340px]">
        </div>
        <div class="">
            <input type="password" placeholder="Password"
                class=" bg-gray-100 rounded-lg px-5 py-2 focus:border border-violet-600 focus:outline-none text-black placeholder:text-gray-600 placeholder:opacity-50 font-semibold md:w-72 lg:w-[340px]">
        </div>
        <div class="flex space-x-2 -ml-28 md:-ml-40  lg:-ml-52">
            <input class="" type="checkbox" id="checkbox" name="checkbox">
            <h3 class="text-sm font-semibold text-gray-400 -mt-1 cursor-pointer">Remember Me</h3>
        </div>
    </div>
    <div class="text-center mt-7">
        <button
            class="uppercase px-24 md:px-[118px] lg:px-[140px] py-2 rounded-md text-white bg-violet-500 hover:bg-violet-600  font-medium ">login</button>
    </div>
    <div class="text-center my-6 flex flex-col">
        <a href="#" class="text-sm font-medium text-gray-400 hover:text-violet-500 m-1">Forgot
            Password ?</a>
        <a href="#" class="text-sm font-bold text-gray-400 hover:text-violet-500 m-1">
            Not a User? Create New Account</a>
    </div>
</div>
</div>`;
