<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        clifford: '#da373d',
                    }
                }
            }
        }
    </script>
    <style type="text/tailwindcss">
        @layer utilities {
      .content-auto {
                content-visibility: auto;
            }
            @layer base {
        html {
            font-family: "Poppins", system-ui, sans-serif;
        }
        }
    }
  </style>
    <script>
        const showAlertSuccess = (text) => {
            const htmlString = `<div class="w-[20%] absolute top-1/4 right-[10px] bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md" role="alert">
                                    <div class="flex">
                                        <div class="py-1"><svg class="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
                                            </svg></div>
                                        <div>
                                            <p class="font-bold">Thông báo</p>
                                            <p class="text-sm">${text}</p>
                                        </div>
                                    </div>
                                </div>`;
            alertContainer.innerHTML = htmlString;
            setTimeout(() => {
                alertContainer.innerHTML = '';
            }, 2000);
        }
        const showAlertFailed = (text) => {
            const htmlString = `<div role="alert" class="w-[20%] absolute top-1/4 right-[10px]">
                                    <div class="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                                        Thông báo
                                    </div>
                                    <div class="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                                        <p>${text}</p>
                                    </div>
                                    </div>`;
            alertContainer.innerHTML = htmlString;
            setTimeout(() => {
                alertContainer.innerHTML = '';
            }, 2000);
        }
    </script>
    <title>Document</title>

</head>

<body>
    <div id="alertContainer"></div>
    <div id="loadingContainer" class="z-20 space-y-2 hidden p-3 bg-slate-700 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-success motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
            <span class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
        </div>
    </div>
    <div class="flex">
        <nav class="w-[15%]">
            <div class="bg-green-800 font-bold text-3xl text-white py-2 text-center">QLSV</div>
            <ul class="flex flex-col bg-slate-900 text-white text-lg h-screen">
                <a href="<?= ROOT ?>/home" class="w-full hover:bg-slate-600 py-3 ps-5">Trang chủ</a>
                <a href="<?= ROOT ?>/student" class="w-full hover:bg-slate-600 py-3 ps-5">Sinh viên</a>
                <a href="<?= ROOT ?>/class" class="w-full hover:bg-slate-600 py-3 ps-5">Lớp</a>
                <a href="<?= ROOT ?>/department" class="w-full hover:bg-slate-600 py-3 ps-5">Khoa</a>
                <a href="<?= ROOT ?>/subject" class="w-full hover:bg-slate-600 py-3 ps-5">Môn</a>
                <a href="<?= ROOT ?>/score" class="w-full hover:bg-slate-600 py-3 ps-5">Điểm</a>
                <a href="<?= ROOT ?>/member" class="w-full hover:bg-slate-600 py-3 ps-5">Thành viên</a>
            </ul>
        </nav>
        <main class="flex-1">
            <header class="w-full bg-green-700 py-3 px-5">
                <div class="text-end text-lg">Admin</div>
            </header>