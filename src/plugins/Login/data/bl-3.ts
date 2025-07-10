export const source = ` 

<div class="flex justify-center">
    <div class="flex flex-col justify-center">
        <div class="flex flex-col md:flex-row max-w-7xl justify-center items-center ">
            <div class="overflow-hidden w-full m-4 flex justify-center bg-gray-50 rounded-lg shadow-xl">
                <div class="flex flex-col md:flex-row items-center shadow-md h-full  ">
                    <div class="  md:w-1/2 overflow-hidden ">
                        <div class="flex flex-col items-center justify-center text-stone-400">
                            <ion-icon name="logo-amplify" class="text-5xl text-fuchsia-600"></ion-icon>
                            <div class="flex flex-col">
                                <div class="m-2">EMAIL</div>
                                <input class="border-b m-2  bg-gray-50 focus:outline-none" />

                                <div class="m-2">PASSWORD</div>
                                <input class="border-b m-2  bg-gray-50  focus:outline-none" type="password" />
                                <div class="flex m-2">
                                    <input class="border-b  border-stone-400 " type="checkbox" />
                                    <div class="ml-1">Remember Me</div>
                                </div>
                                <div class="flex m-2">
                                    <button
                                        class="bg-gradient-to-l from-fuchsia-600 to-cyan-400 px-6 py-1 rounded-2xl text-white font-medium">LOGIN</button>
                                    <button
                                        class="text-transparent  bg-clip-text bg-gradient-to-l from-fuchsia-600 to-cyan-400 font-bold ml-2 border-2 rounded-2xl px-6 border-cyan-400">CREATE
                                        ACCOUNT</button>
                                </div>
                                <div class="m-2">Forgotten your login details?</div>
                                    <div class="font-medium ml-2">Get Help Signing In</div>
                                

                            </div>

                        </div>
                    </div>
                    <div class=" md:w-1/2 overflow-hidden ">
                        <img src="https://source.unsplash.com/700x600/?computer,login" alt="" class="" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>`;
