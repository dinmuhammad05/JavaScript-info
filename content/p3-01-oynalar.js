"use strict";

module.exports = {
  part: "3-qism: Qo'shimcha bo'limlar",
  chapter: "Oynalar va freymlar",
  lessons: [
    {
      slug: "popup",
      title: "Popup oynalar va window metodlari",
      blurb: "window.open bilan yangi oyna ochish, popup bloklovchilar, oyna sozlamalari (width, height, left, top), ochilgan oynaga murojaat qilish, close, focus va blur metodlari.",
      body: [
        { lead: "Popup oyna — bu asosiy sahifadan tashqarida ochiladigan yangi brauzer oynasi. Uni <code>window.open</code> metodi bilan ochiladi. Popup'lar internetning eng qadimgi imkoniyatlaridan biri bo'lib, ular ba'zan hozir ham foydali: masalan, autentifikatsiya (OAuth) oynalari, reklama yoki katta rasmni alohida oynada ko'rsatish uchun ishlatiladi. Ushbu darsda popup oynalarni ochish, sozlash va ular bilan ikki tomonlama ishlashni chuqur o'rganamiz." },

        { warn: "Brauzer/oyna API'lari (<code>window.open</code>, <code>window.close</code>, <code>focus</code>, <code>blur</code> va boshqalar) — bu <strong>brauzer</strong> muhitiga tegishli. Ushbu kurs sahifasidagi interaktiv maydonchada (playground) ular <strong>ishlamaydi</strong>. Shu sababli quyidagi barcha kod bloklari faqat <strong>statik misol</strong> sifatida keltiriladi — ularni haqiqiy brauzer sahifasida sinab ko'ring." },

        { h2: "Popup'lar haqida qisqacha tarix" },
        { p: "Popup oynalar hamma vaqt yaxshi tavsiyaga ega bo'lmagan. Ular ko'pincha zararli saytlar tomonidan foydalanuvchini ko'plab reklama oynalari bilan bezovta qilish uchun ishlatilgan. Shu sababli deyarli barcha zamonaviy brauzerlar <strong>popup bloklovchilarga</strong> ega — ular kutilmagan popup'larni bloklaydi." },
        { p: "Shunga qaramay, popup'lar ba'zi holatlarda hali ham foydali. Masalan, asosiy sahifani boy interfeys bilan qoldirib, foydalanuvchini boshqa saytdagi (masalan, to'lov tizimi yoki ijtimoiy tarmoq) autentifikatsiya oynasiga yo'naltirish kerak bo'lganda popup qulaydir. Bunda asosiy oyna o'z holicha qoladi, popup esa alohida ochiladi." },

        { h2: "Popup'ni bloklash" },
        { p: "Ko'p brauzerlar popup'ni <strong>foydalanuvchidan tashqarida</strong> ochilishini bloklaydi. G'oya oddiy: agar popup foydalanuvchi <em>o'zi</em> chaqirgan hodisa (masalan, <code>onclick</code>) natijasida ochilsa — u bloklanmaydi. Ammo popup'ni <code>setTimeout</code> ichida yoki sahifa yuklanishi bilan darhol ochishga urinsangiz — u bloklanadi." },
        { p: "Masalan, quyidagi kod ishlaydi, chunki popup <code>onclick</code> ichida — foydalanuvchi bosishiga javoban ochiladi:" },
        { code: "// Bu ishlaydi: bosish (onclick) hodisasi ichida\nbutton.onclick = () => {\n  window.open('https://javascript.info');\n};" },
        { p: "Quyidagi kod esa ko'pincha bloklanadi, chunki popup foydalanuvchi bilan bevosita bog'liq bo'lmagan holatda (kechikish bilan) ochilmoqda:" },
        { code: "// Bu ko'pincha bloklanadi:\n// popup foydalanuvchi bosishiga darhol javob bermaydi\nsetTimeout(() => {\n  window.open('https://javascript.info');\n}, 2000);" },
        { note: "Aniq qoida brauzerdan brauzerga farq qiladi. Masalan, Firefox <code>setTimeout</code>dagi popup'ni ba'zi hollarda ruxsat berishi, boshqalari esa umuman bloklashi mumkin. Umumiy tavsiya: popup'ni <strong>doim foydalanuvchi harakati (bosish)</strong> natijasida oching." },

        { h2: "window.open sintaksisi" },
        { p: "Popup'ni ochishning asosiy metodi — <code>window.open(url, name, params)</code>:" },
        { ul: [
          "<code>url</code> — yangi oynada yuklanadigan URL manzil;",
          "<code>name</code> — yangi oynaning nomi. Har bir oynada <code>window.name</code> bo'ladi. Bu yerda mavjud nom berilsa, oyna qayta ochilmaydi — o'sha nomdagi oyna qayta ishlatiladi (URL'i almashtiriladi);",
          "<code>params</code> — yangi oyna uchun sozlamalar satri (vergul bilan ajratilgan konfiguratsiya, probelsiz)."
        ] },
        { p: "Eng oddiy chaqiruv — faqat URL bilan:" },
        { code: "// eng oddiy popup\nwindow.open('https://javascript.info');" },
        { p: "Agar ikkinchi va uchinchi argumentlar berilmasa, brauzer standart yangi oyna (yoki ko'pincha yangi tab/vkladka) ochadi." },

        { h2: "Oyna sozlamalari (params)" },
        { p: "Uchinchi argument <code>params</code> — bu satr bo'lib, yangi oynaning konfiguratsiyasini belgilaydi. Sozlamalar vergul bilan ajratiladi, ular orasida <strong>probel bo'lmasligi</strong> kerak. Eng muhim sozlamalar:" },
        { ul: [
          "<code>width</code> va <code>height</code> — oyna ichki maydonining eni va balandligi (piksellarda). Minimal qiymatga cheklovlar bor — juda kichik oyna ochib bo'lmaydi;",
          "<code>left</code> va <code>top</code> — oynaning ekrandagi chapdan va yuqoridan koordinatasi. Manfiy yoki ekrandan tashqari qiymatlar odatda inobatga olinmaydi;",
          "<code>menubar</code> (yes/no) — brauzer menyusini ko'rsatish yoki yashirish;",
          "<code>toolbar</code> (yes/no) — navigatsiya paneli (oldinga/orqaga tugmalari va h.k.);",
          "<code>location</code> (yes/no) — manzil (URL) maydoni;",
          "<code>status</code> (yes/no) — holat qatori (status bar);",
          "<code>resizable</code> (yes/no) — oynani o'lchamini o'zgartirishga ruxsat;",
          "<code>scrollbars</code> (yes/no) — kerak bo'lganda aylantirish (scroll) chiziqlariga ruxsat."
        ] },
        { p: "Masalan, 600x300 o'lchamdagi oynani ekranning markaziga yaqin joyda ochamiz:" },
        { code: "let params = 'scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,width=600,height=300,left=100,top=100';\n\nwindow.open('https://javascript.info', 'test', params);" },
        { p: "Oynani ekran markazida ochish uchun <code>screen</code> obyektidan foydalanib koordinatalarni hisoblash mumkin:" },
        { code: "// oyna o'lchami\nlet width = 600;\nlet height = 300;\n\n// ekran markazida joylashish uchun koordinatalar\nlet left = (screen.width - width) / 2;\nlet top = (screen.height - height) / 2;\n\nlet params = `width=${width},height=${height},left=${left},top=${top}`;\n// diqqat: bu yerda backtick o'rniga oddiy string ham ishlatsa bo'ladi\nwindow.open('https://javascript.info', 'test', params);" },
        { note: "Sozlamalar bilan bog'liq muhim qoida: agar <code>params</code>da <strong>hech qanday</strong> oyna xususiyati (width/height va h.k.) ko'rsatilmasa, ular standart qiymatda qoladi. Ammo <strong>kamida bitta</strong> xususiyat ko'rsatilsa, ko'rsatilmagan boshqa panellar (toolbar, menubar va h.k.) ko'pincha <code>no</code> deb hisoblanadi. Shuning uchun kerakli panellarni ochiq qoldirmoqchi bo'lsangiz, ularni ochiqcha <code>yes</code> qiling." },

        { h2: "Ochilgan oynaga murojaat qilish" },
        { p: "<code>open</code> chaqiruvi yangi oynaga havolani (window obyektini) qaytaradi. Bu havola orqali ochilgan oynani boshqarish, uning tarkibini o'zgartirish yoki hodisalarni kuzatish mumkin:" },
        { code: "let newWindow = window.open('about:blank', 'hello', 'width=200,height=200');\n\nnewWindow.document.write('Salom, dunyo!');" },
        { p: "Bu yerda <code>newWindow</code> — yangi oynaning <code>window</code> obyekti. Biz uning <code>document</code>iga yozdik. Lekin bu faqat <strong>bir xil manba (Same Origin)</strong> bo'lganda ishlaydi — ya'ni ikkala oyna ham bir xil protokol, domen va portga ega bo'lganda. Agar oyna boshqa saytdan bo'lsa, xavfsizlik siyosati tufayli uning ichiga kira olmaymiz (bu haqda keyingi darsda batafsil)." },
        { warn: "Boshqa manbadan (origin) yuklangan oynaning tarkibiga kirishga urinish xatolik beradi. Masalan, <code>window.open('https://google.com')</code> qaytargan oynaning <code>document</code>iga yoza olmaysiz — bu Same Origin siyosati tomonidan taqiqlangan." },

        { h2: "Popup'dan asosiy oynaga kirish: window.opener" },
        { p: "Popup asosiy (uni ochgan) oynaga <code>window.opener</code> orqali murojaat qila oladi. Boshqa barcha oynalar uchun <code>opener</code> qiymati <code>null</code> bo'ladi." },
        { code: "// asosiy oynada\nlet newWin = window.open('our.html', 'hello', 'width=300,height=300');\n\n// popup ichida (our.html):\n// window.opener — bu bizni ochgan asosiy oyna\n// window.opener.document.title — asosiy sahifa sarlavhasi" },
        { p: "Shunday qilib, asosiy oyna va popup o'rtasida ikki tomonlama aloqa mavjud: asosiy oyna popup'ga <code>newWin</code> orqali, popup esa asosiy oynaga <code>window.opener</code> orqali murojaat qiladi. Bu — <strong>faqat Same Origin</strong> bo'lganda to'liq ishlaydi." },

        { h2: "Oynani yopish: close va closed" },
        { p: "Oynani yopish uchun <code>win.close()</code> metodi ishlatiladi. Oyna yopilgan-yopilmaganini <code>win.closed</code> xossasi bildiradi — u <code>true</code> yoki <code>false</code> qaytaradi." },
        { code: "let newWindow = window.open('about:blank', 'hello', 'width=200,height=200');\n\nnewWindow.document.write('Yopilishga tayyorman...');\n\nnewWindow.close();\nalert(newWindow.closed); // true" },
        { note: "<code>close()</code> metodi faqat <code>window.open</code> orqali (yoki <code>window.opener</code>ga ega bo'lgan holda) ochilgan oynalarda ishonchli ishlaydi. Foydalanuvchi o'zi ochgan asosiy oynani skript orqali yopishga ko'pincha ruxsat berilmaydi — bu xavfsizlik chorasi." },
        { p: "Popup o'zini ham yopishi mumkin: <code>window.close()</code>. Bu ko'pincha popup asosiy oynaga biror ma'lumot (masalan, avtorizatsiya natijasi) uzatgach ishlatiladi." },

        { h2: "Oynaga fokus berish va olib qo'yish: focus/blur" },
        { p: "<code>window.focus()</code> oynani fokusga (oldinga) chiqaradi, <code>window.blur()</code> esa fokusni olib qo'yadi. Nazariy jihatdan bu bilan popup'ni oldinga chiqarish yoki uni orqada qoldirish mumkin." },
        { code: "let newWindow = window.open('https://javascript.info', 'example', 'width=300,height=300');\n\n// oynani oldinga chiqarish\nnewWindow.focus();" },
        { warn: "Amaliyotda <code>focus</code> va <code>blur</code>ga brauzerlar kuchli cheklovlar qo'ygan. Ular ilgari zararli saytlar tomonidan foydalanuvchini bezovta qilish uchun ishlatilgan (masalan, oynani doim oldinga chiqarish yoki uni ataylab orqada yashirish). Shu sababli zamonaviy brauzerlarda bu metodlar ko'pincha e'tiborsiz qoldiriladi yoki faqat foydalanuvchi harakatiga javoban ishlaydi. Ularga ko'p tayanmang." },
        { p: "Foydali qo'llanish misoli: popup ochilganda unga fokus berish, va foydalanuvchi asosiy oynaga qaytganda popup'ni yopish yoki eslatish:" },
        { code: "let newWindow = open('/', 'example', 'width=300,height=300');\n\nnewWindow.onload = function() {\n  newWindow.focus();\n};" },

        { h2: "Popup'ni to'g'ri va odob bilan ishlatish" },
        { p: "Popup'lar foydalanuvchini bezovta qilishi mumkin, shuning uchun ularni ehtiyotkorlik bilan qo'llang. Amaliy tavsiyalar:" },
        { ul: [
          "Popup'ni faqat <strong>foydalanuvchi harakatiga (bosish)</strong> javoban oching — aks holda u bloklanadi;",
          "Oyna o'lchami va joylashuvini foydalanuvchi qulayligi uchun oqilona tanlang (masalan, ekran markazi);",
          "Popup bilan ish tugagach, uni <code>close()</code> bilan yoping (ayniqsa OAuth kabi oqimlarda);",
          "Boshqa manbadagi oyna tarkibiga kira olmasligingizni yodda tuting — bu holda faqat <code>postMessage</code> (keyingi dars) orqali xabar almashinuvi mumkin;",
          "<code>focus/blur</code>ga ishonch bilan tayanmang — ular brauzerlarda cheklangan."
        ] },
        { tip: "Zamonaviy veb-ilovalarda popup o'rniga ko'pincha <strong>modal oynalar</strong> (sahifa ichidagi <code>&lt;dialog&gt;</code> yoki maxsus <code>div</code> qatlamlar) ishlatiladi. Ular boshqarish osonroq va bloklanmaydi. Popup'lar esa asosan boshqa domendagi sahifa (masalan, to'lov yoki OAuth) kerak bo'lganda foydali qoladi." },

        { h2: "Xulosa" },
        { ul: [
          "Popup'lar <code>window.open(url, name, params)</code> bilan ochiladi va yangi oynaning <code>window</code> obyektini qaytaradi;",
          "Brauzerlar popup'ni <strong>foydalanuvchi harakatidan tashqarida</strong> ochishni bloklaydi — doim <code>onclick</code> kabi hodisa ichida oching;",
          "<code>params</code> satri orqali <code>width</code>, <code>height</code>, <code>left</code>, <code>top</code> va panellarni (<code>toolbar</code>, <code>menubar</code> va h.k.) sozlash mumkin;",
          "Asosiy oyna popup'ga <code>open</code> qaytargan havola orqali, popup esa asosiy oynaga <code>window.opener</code> orqali murojaat qiladi;",
          "Bu ikki tomonlama aloqa faqat <strong>Same Origin</strong> bo'lganda to'liq ishlaydi;",
          "Oynani yopish uchun <code>close()</code>, holatini bilish uchun <code>closed</code>, fokus uchun <code>focus()</code>/<code>blur()</code> ishlatiladi (oxirgilari cheklangan)."
        ] }
      ]
    },

    {
      slug: "cross-window",
      title: "Oynalararo aloqa",
      blurb: "Same Origin (bir xil manba) siyosati, iframe va contentWindow, boshqa manbadagi oynalar bilan xavfsiz aloqa: postMessage va message hodisasi, origin tekshirish orqali xavfsizlik.",
      body: [
        { lead: "Same Origin (bir xil manba) siyosati — bu oyna va freymlarning bir-biriga kirishini cheklovchi asosiy xavfsizlik qoidasidir. U zararli sahifaning boshqa oyna tarkibiga (masalan, sizning bank hisobingiz ochilgan tabga) kirib ma'lumot o'g'irlashiga to'sqinlik qiladi. Ushbu darsda bu siyosat qanday ishlashini, <code>iframe</code> bilan ishlashni va turli manbalar orasida <strong>xavfsiz</strong> aloqa o'rnatuvchi <code>postMessage</code>ni chuqur o'rganamiz." },

        { warn: "Bu darsdagi API'lar (<code>iframe.contentWindow</code>, <code>postMessage</code>, <code>message</code> hodisasi va boshqalar) — brauzer muhitiga tegishli. Kurs playground'ida ular <strong>ishlamaydi</strong>. Barcha kod bloklari faqat <strong>statik misol</strong> — ularni haqiqiy brauzer sahifasida sinang." },

        { h2: "Same Origin (bir xil manba) nima?" },
        { p: "Ikki URL bir xil <strong>manbaga (origin)</strong> ega deyiladi, agar ularning <strong>protokoli</strong>, <strong>domeni</strong> va <strong>porti</strong> bir xil bo'lsa. Quyidagi URL'lar bir xil manbaga tegishli:" },
        { ul: [
          "<code>http://site.com</code>",
          "<code>http://site.com/</code>",
          "<code>http://site.com/my/page.html</code>"
        ] },
        { p: "Quyidagilar esa <strong>boshqa</strong> manba hisoblanadi:" },
        { ul: [
          "<code>http://<strong>www.</strong>site.com</code> — boshqa domen (subdomen ham hisobga olinadi);",
          "<code>http://site.<strong>org</strong></code> — boshqa domen;",
          "<code><strong>https</strong>://site.com</code> — boshqa protokol;",
          "<code>http://site.com:<strong>8080</strong></code> — boshqa port."
        ] },
        { p: "Same Origin siyosati shuni bildiradi: agar bizda boshqa oyna (masalan, <code>window.open</code> bilan ochilgan yoki <code>iframe</code>dagi) havolasi bo'lsa-yu, u oyna <strong>bir xil manbadan</strong> bo'lsa — biz uning tarkibiga to'liq kira olamiz. Agar u <strong>boshqa manbadan</strong> bo'lsa — biz uning URL'ini o'zgartira olamiz (u yerga o'ta olamiz), lekin ichidagi tarkibni (o'zgaruvchilar, DOM) <strong>o'qiy olmaymiz</strong>." },

        { h2: "Bir xil manbadagi oynaga to'liq kirish" },
        { p: "Agar boshqa oyna (masalan, popup yoki iframe) bir xil manbadan bo'lsa, biz uning barcha ichki tarkibiga kira olamiz: DOM'ini o'qish/o'zgartirish, o'zgaruvchilarini olish va h.k. Masalan, iframe bilan:" },
        { code: "&lt;iframe src=\"/same-origin.html\" id=\"iframe\"&gt;&lt;/iframe&gt;\n\n&lt;script&gt;\n  iframe.onload = function() {\n    // ichki oynaga kirish\n    let iframeWindow = iframe.contentWindow;\n\n    // uning hujjatini o'qish\n    let doc = iframe.contentDocument;\n    // yoki: iframe.contentWindow.document\n\n    doc.body.style.background = 'lightgreen'; // ishlaydi (same origin)\n  };\n&lt;/script&gt;" },
        { p: "Bu yerda muhim tushunchalar:" },
        { ul: [
          "<code>iframe.contentWindow</code> — <code>iframe</code> ichidagi <code>window</code> obyektiga havola;",
          "<code>iframe.contentDocument</code> — <code>iframe</code> ichidagi <code>document</code> (<code>iframe.contentWindow.document</code> bilan bir xil, faqat qisqaroq)."
        ] },
        { note: "<code>iframe.onload</code> hodisasi freym ichidagi hujjat to'liq yuklanganda ishga tushadi. Freym yuklanmagan turib uning <code>contentDocument</code>iga kirsak, hali eski (bo'sh) hujjatni ko'rishimiz mumkin. Shuning uchun freym tarkibi bilan ishlashni <code>onload</code> ichida qiling." },

        { h2: "Boshqa manbadagi oyna: cheklovlar" },
        { p: "Agar oyna yoki iframe <strong>boshqa manbadan</strong> bo'lsa, uning tarkibiga kira olmaymiz. Quyidagi kod xatolik beradi:" },
        { code: "&lt;iframe src=\"https://example.com\" id=\"iframe\"&gt;&lt;/iframe&gt;\n\n&lt;script&gt;\n  iframe.onload = function() {\n    // boshqa manbadagi iframe hujjatiga kirish — XATOLIK\n    let doc = iframe.contentDocument; // null yoki xatolik\n\n    // location o'qishga ham ruxsat yo'q\n    let href = iframe.contentWindow.location.href; // Xatolik: SecurityError\n  };\n&lt;/script&gt;" },
        { p: "Biroq boshqa manbadagi oynada ham ba'zi narsalarga ruxsat bor:" },
        { ul: [
          "<code>iframe.contentWindow.location = '...'</code> — boshqa oynaning URL'ini <strong>yozish</strong> (uni boshqa manzilga o'tkazish) mumkin. Ammo <strong>o'qish</strong> mumkin emas;",
          "<code>iframe.contentWindow.postMessage(...)</code> — xabar yuborish mumkin (bu haqda quyida)."
        ] },
        { warn: "Same Origin — bu <strong>xavfsizlik chegarasi</strong>. Uni chetlab o'tishga urinmang. Agar boshqa manbadagi sahifa bilan ma'lumot almashish kerak bo'lsa, buni faqat <code>postMessage</code> orqali — ikkala tomon ham <strong>rozi bo'lgan</strong> holda qiling." },

        { h2: "Subdomenlar: document.domain" },
        { p: "Agar ikkita oyna bir asosiy domenning turli <strong>subdomenlaridan</strong> bo'lsa (masalan, <code>john.site.com</code> va <code>peter.site.com</code>), ular tarixan <code>document.domain</code>ni umumiy qiymatga (<code>'site.com'</code>) qo'yish orqali bir-biriga kira olishardi:" },
        { code: "// john.site.com va peter.site.com sahifalarining\n// ikkalasida ham bu bo'lsa, ular bir-biriga kira oladi:\ndocument.domain = 'site.com';" },
        { warn: "<code>document.domain</code> mexanizmi <strong>eskirgan (deprecated)</strong> hisoblanadi va zamonaviy brauzerlarda o'chirilmoqda. Yangi kodlarda bunga tayanmang — subdomenlar orasida aloqa uchun ham <code>postMessage</code> ishlatgan ma'qul." },

        { h2: "iframe: name va yuklanish nuozansi" },
        { p: "Yana bir nozik nuqta: yangi <code>iframe</code> yaratilganda, unda darhol bo'sh hujjat paydo bo'ladi (<code>about:blank</code>), keyin esa <code>src</code>dagi hujjat yuklanadi. Ya'ni qisqa vaqt ichida ikkita turli hujjat mavjud bo'ladi. Agar biz <code>src</code>dagi hujjat bilan ishlamoqchi bo'lsak, uning yuklanishini kutishimiz kerak:" },
        { code: "&lt;iframe src=\"document.html\" id=\"iframe\"&gt;&lt;/iframe&gt;\n\n&lt;script&gt;\n  // xato: bu vaqtda hali eski (bo'sh) hujjat bo'lishi mumkin\n  // iframe.contentDocument.body ...\n\n  iframe.onload = function() {\n    // to'g'ri: endi src'dagi hujjat yuklandi\n    let body = iframe.contentDocument.body; // (same origin bo'lsa)\n  };\n&lt;/script&gt;" },

        { h2: "postMessage: manbalararo xavfsiz aloqa" },
        { p: "<code>postMessage</code> interfeysi turli manbalardagi oynalarga bir-biri bilan <strong>xavfsiz</strong> gaplashishga imkon beradi. Bu Same Origin siyosatining maxsus ruxsat berilgan yo'lidir: ikkala oyna ham <em>rozi bo'lgan</em> holda ma'lumot almashadi." },
        { p: "Aloqa ikki qismdan iborat: xabar <strong>yuboruvchi</strong> va xabar <strong>qabul qiluvchi</strong>." },

        { h3: "Xabar yuborish: postMessage" },
        { p: "Xabar yubormoqchi bo'lgan oyna qabul qiluvchi oynaning <code>postMessage</code> metodini chaqiradi:" },
        { code: "// win — biz xabar yubormoqchi bo'lgan oyna\n// (masalan, iframe.contentWindow yoki window.open natijasi)\nwin.postMessage(data, targetOrigin);" },
        { ul: [
          "<code>data</code> — yuboriladigan ma'lumot. U structured clone algoritmi bilan nusxalanadi, ya'ni obyektlar, massivlar va boshqa turlar ham yuborilishi mumkin (funksiyalardan tashqari);",
          "<code>targetOrigin</code> — qabul qiluvchi oynaning kutilayotgan manbasi. Bu <strong>xavfsizlik</strong> uchun juda muhim: faqat shu manbadagi oyna xabarni oladi. <code>'*'</code> berilsa — istalgan manba oladi (xavfsiz emas)."
        ] },
        { code: "let win = iframe.contentWindow;\n\n// faqat http://example.com bo'lsa qabul qiladi:\nwin.postMessage('Salom!', 'http://example.com');\n\n// obyekt ham yuborsa bo'ladi:\nwin.postMessage({ type: 'greet', text: 'Salom' }, 'http://example.com');" },
        { warn: "<code>targetOrigin</code>ni <strong>hech qachon</strong> ehtiyotsiz <code>'*'</code> qilmang, agar xabarda maxfiy ma'lumot bo'lsa. Aks holda, agar qabul qiluvchi oynaning manbasi kutilmaganda o'zgargan bo'lsa (masalan, boshqa saytga o'tib ketgan bo'lsa), maxfiy ma'lumot begona saytga tushib qolishi mumkin. Har doim aniq manba manzilini bering." },

        { h3: "Xabar qabul qilish: message hodisasi" },
        { p: "Xabarni qabul qilish uchun qabul qiluvchi oyna <code>message</code> hodisasini tinglaydi:" },
        { code: "window.addEventListener('message', function(event) {\n  // XAVFSIZLIK: birinchi navbatda manbani tekshiramiz!\n  if (event.origin !== 'http://javascript.info') {\n    // begona manbadan kelgan xabar — e'tiborsiz qoldiramiz\n    return;\n  }\n\n  alert('Xabar keldi: ' + event.data);\n\n  // agar javob yubormoqchi bo'lsak:\n  event.source.postMessage('Xabaringizni oldim', event.origin);\n});" },
        { p: "<code>message</code> hodisasi obyekti (<code>event</code>) muhim xossalarga ega:" },
        { ul: [
          "<code>event.data</code> — <code>postMessage</code>dan kelgan ma'lumot;",
          "<code>event.origin</code> — xabar yuboruvchi oynaning manbasi (masalan, <code>'http://javascript.info'</code>). Buni <strong>tekshirish shart</strong>;",
          "<code>event.source</code> — xabar yuboruvchi oynaga havola. Uning <code>postMessage</code>ini chaqirib javob qaytarsa bo'ladi."
        ] },
        { note: "Muhim nozik jihat: <code>message</code> hodisasi uchun odatiy <code>on&lt;event&gt;</code> xossasi <strong>ishlamaydi</strong>. Ya'ni <code>window.onmessage = ...</code> qilmang — u ba'zi holatlarda kutilganidek ishlamasligi mumkin. Doim <code>window.addEventListener('message', ...)</code> ishlating." },

        { h2: "Origin tekshirish — eng muhim xavfsizlik qoidasi" },
        { p: "<code>postMessage</code> xavfsizligining o'zagi — <strong>ikki tomonlama tekshiruv</strong>:" },
        { ol: [
          "<strong>Yuborishda</strong>: <code>targetOrigin</code> orqali xabar faqat kutilgan manbaga borishini kafolatlaysiz;",
          "<strong>Qabul qilishda</strong>: <code>event.origin</code>ni tekshirib, faqat ishonchli manbadan kelgan xabarni qabul qilasiz."
        ] },
        { p: "Ikkala tomon ham tekshirilishi shart. Agar qabul qiluvchi <code>event.origin</code>ni tekshirmasa, istalgan sayt (masalan, zararli iframe yoki popup) unga soxta xabar yuborib, uni chalg'itishi mumkin. Masalan, agar sahifangiz kelgan xabarga qarab foydalanuvchi hisobiga o'zgartirish kiritsa, <code>origin</code> tekshiruvi bo'lmasa — bu jiddiy zaiflikka aylanadi." },
        { code: "window.addEventListener('message', function(event) {\n  // Ishonchli manbalar ro'yxati\n  let allowed = ['https://myapp.com', 'https://admin.myapp.com'];\n\n  if (!allowed.includes(event.origin)) {\n    return; // begona — rad etamiz\n  }\n\n  // faqat shu yergacha yetgan xabarlar ishonchli\n  handleMessage(event.data);\n});" },
        { warn: "Xabar tarkibiga (<code>event.data</code>) ham ishonchsizlik bilan yondashing: uni to'g'ridan-to'g'ri <code>innerHTML</code>ga qo'ymang yoki <code>eval</code> qilmang. Manba to'g'ri bo'lsa ham, ma'lumot formatini tekshirib, faqat kutilgan turdagi qiymatlarni qabul qiling." },

        { h2: "Amaliy misol: iframe bilan ikki tomonlama aloqa" },
        { p: "Asosiy sahifa (masalan, <code>https://myapp.com</code>) va boshqa manbadagi <code>iframe</code> (<code>https://widget.com</code>) o'rtasida aloqa quyidagicha ko'rinadi." },
        { p: "Asosiy sahifada — iframe'ga xabar yuborish va javobni tinglash:" },
        { code: "let iframe = document.querySelector('#widget');\n\niframe.onload = function() {\n  // widget'ga so'rov yuboramiz\n  iframe.contentWindow.postMessage(\n    { action: 'getUser' },\n    'https://widget.com'\n  );\n};\n\nwindow.addEventListener('message', function(event) {\n  if (event.origin !== 'https://widget.com') return;\n  alert('Widget javobi: ' + JSON.stringify(event.data));\n});" },
        { p: "Iframe ichida (<code>https://widget.com</code>) — so'rovni qabul qilish va javob berish:" },
        { code: "window.addEventListener('message', function(event) {\n  if (event.origin !== 'https://myapp.com') return;\n\n  if (event.data.action === 'getUser') {\n    // asosiy sahifaga javob qaytaramiz\n    event.source.postMessage(\n      { user: 'John', id: 42 },\n      event.origin\n    );\n  }\n});" },
        { tip: "Bu naqsh (pattern) juda keng tarqalgan: to'lov widjetlari, chat oynalari, reklama freymlari, autentifikatsiya oynalari — barchasi <code>postMessage</code> orqali ishlaydi. Har doim <code>origin</code>ni ikki tomondan ham tekshiring." },

        { h2: "Xulosa" },
        { ul: [
          "<strong>Same Origin</strong> siyosati protokol, domen va port bir xil bo'lgan sahifalarga bir-birining tarkibiga to'liq kirishga ruxsat beradi;",
          "Boshqa manbadagi oynaga faqat <code>location</code>ni <strong>yozish</strong> va <code>postMessage</code> yuborish mumkin — tarkibni o'qib bo'lmaydi;",
          "<code>iframe.contentWindow</code> va <code>iframe.contentDocument</code> orqali (same origin bo'lsa) freym ichiga kiriladi; freym tarkibini <code>onload</code> ichida ishlating;",
          "<code>win.postMessage(data, targetOrigin)</code> — turli manbalar orasida xabar yuboradi; <code>targetOrigin</code>ni aniq bering;",
          "Xabar <code>message</code> hodisasi orqali qabul qilinadi; <code>event.data</code>, <code>event.origin</code>, <code>event.source</code> xossalari muhim;",
          "Eng muhim qoida — <strong>doim <code>event.origin</code>ni tekshiring</strong> va xabar ma'lumotiga ishonchsizlik bilan yondashing."
        ] }
      ]
    },

    {
      slug: "clickjacking",
      title: "Clickjacking hujumi",
      blurb: "Clickjacking (bosishni o'g'irlash) hujumining g'oyasi, saytni ko'rinmas iframe ustiga qo'yish, va himoya usullari: X-Frame-Options, CSP frame-ancestors, samesite cookie.",
      body: [
        { lead: "Clickjacking (so'zma-so'z: bosishni o'g'irlash) — bu foydalanuvchini <strong>bilmagan holda</strong> zararli tugmani bosishga majburlovchi hujum. Hujumchi qurbon saytni ko'rinmas <code>iframe</code>ga joylashtiradi va foydalanuvchi o'zi ko'rgan sahifada bosaman deb, aslida yashiringan saytdagi tugmani bosadi. Ushbu darsda hujum qanday ishlashini va undan qanday himoyalanishni chuqur o'rganamiz." },

        { note: "Bu dars asosan <strong>xavfsizlik nazariyasi</strong>ga oid. Kod bloklari HTTP sarlavhalari va HTML misollari bo'lib, ular server sozlamasiga tegishli — kurs playground'ida bajarilmaydi. Ular <strong>statik misol</strong> sifatida berilgan." },

        { h2: "Hujumning g'oyasi" },
        { p: "Clickjacking g'oyasi oddiy va ayni paytda ayyorona. Tasavvur qiling, hujumchi (<code>evil.com</code> sayti) foydalanuvchini biror ijtimoiy tarmoqdagi \"Yoqdi\" (Like) tugmasini yoki \"Ha, ruxsat beraman\" tugmasini bosishga majburlamoqchi." },
        { p: "Hujum bosqichlari:" },
        { ol: [
          "Hujumchi o'z saytida (<code>evil.com</code>) foydalanuvchini qiziqtiradigan biror narsa (masalan, \"Bu yerni bosing va sovg'a yutib oling\" tugmasi) ko'rsatadi;",
          "Aynan shu tugma ustiga, <strong>ko'rinmas</strong> qilib, qurbon saytni (masalan, <code>facebook.com</code>ning \"Like\" tugmasi bilan) <code>iframe</code>da joylashtiradi;",
          "Foydalanuvchi \"sovg'a\" tugmasini bosaman deb o'ylab, aslida ko'rinmas iframe ichidagi \"Like\" tugmasini bosadi;",
          "Agar foydalanuvchi o'sha ijtimoiy tarmoqqa allaqachon kirgan bo'lsa (cookie mavjud), bosish haqiqiy hisoblanadi va harakat bajariladi."
        ] },
        { p: "Muhim jihat: hujum foydalanuvchi qurbon saytga <strong>tizimga kirgan (login qilingan)</strong> holatidan foydalanadi. Bosish qurbon saytda amalga oshadi, cookie'lar odatdagidek yuboriladi, shuning uchun sayt bosishni qonuniy deb qabul qiladi." },

        { h2: "Hujumning texnik ko'rinishi" },
        { p: "Hujumchi sahifasi taxminan quyidagicha tuziladi. Qurbon sahifasi <code>iframe</code>da yuklanadi, lekin u shaffof (<code>opacity</code>) qilinadi va aldov tugma tagida joylashtiriladi:" },
        { code: "&lt;style&gt;\n  iframe { /* qurbon sayt iframe'i */\n    width: 400px;\n    height: 100px;\n    position: absolute;\n    top: 0; left: -20px;\n    opacity: 0.0001;  /* deyarli ko'rinmas! */\n    z-index: 1;       /* tugmadan ustun */\n  }\n\n  .decoy { /* aldov tugma */\n    position: absolute;\n    top: 0; left: 0;\n    z-index: 0;       /* iframe ostida */\n  }\n&lt;/style&gt;\n\n&lt;div class=\"decoy\"&gt;\n  &lt;button&gt;Bu yerni bosing va sovg'a oling!&lt;/button&gt;\n&lt;/div&gt;\n\n&lt;iframe src=\"https://victim.com\"&gt;&lt;/iframe&gt;" },
        { p: "Bu yerda hiyla:" },
        { ul: [
          "<code>opacity: 0.0001</code> — iframe deyarli to'liq ko'rinmas, lekin texnik jihatdan hali ham mavjud va bosishlarni qabul qiladi;",
          "<code>z-index: 1</code> — iframe aldov tugmadan (<code>z-index: 0</code>) ustunroq qatlamda, shuning uchun bosish iframe'ga tushadi;",
          "iframe qurbon saytning kerakli tugmasi ustma-ust keladigan qilib joylashtiriladi."
        ] },
        { warn: "Ba'zi murakkab hujumlarda sichqoncha kursorini kuzatib, iframe'ni doim kursor ostida ushlab turadigan variantlar (\"cursorjacking\") ham mavjud. Umumiy g'oya bir xil: foydalanuvchi ko'rgan narsa va aslida bosgan narsasi bir-biridan farq qiladi." },

        { h2: "Nega an'anaviy himoya yetarli emas?" },
        { p: "Ba'zi eski himoya usullari (masalan, JavaScript orqali \"agar men iframe ichida bo'lsam, chiqib ketaman\" degan busting kod) ishonchsiz. Masalan:" },
        { code: "// eski, ishonchsiz himoya (frame busting):\nif (top !== self) {\n  top.location = self.location;\n}" },
        { p: "Bu usul zaif, chunki:" },
        { ul: [
          "Hujumchi <code>iframe</code>ga <code>sandbox</code> atributini qo'yib, undagi navigatsiyani bloklashi mumkin — shunda <code>top.location</code>ni o'zgartirish ishlamaydi;",
          "Ba'zi hollarda brauzer <code>beforeunload</code> hodisasi orqali foydalanuvchini qo'shimcha dialog bilan chalg'itish mumkin;",
          "JavaScript o'chirilgan bo'lsa, bu himoya umuman ishlamaydi."
        ] },
        { p: "Shuning uchun ishonchli himoya <strong>server tomonidagi HTTP sarlavhalari</strong> bilan ta'minlanadi — brauzer saytni umuman iframe'ga qo'yishga ruxsat bermaydi." },

        { h2: "Himoya 1: X-Frame-Options" },
        { p: "<code>X-Frame-Options</code> — bu sayt tomonidan yuboriladigan HTTP javob sarlavhasi. U brauzerga sahifani iframe'ga qo'yishga ruxsat berish yoki bermaslikni aytadi. Uch qiymati bor:" },
        { ul: [
          "<code>X-Frame-Options: DENY</code> — sahifani <strong>hech qanday</strong> iframe'ga qo'yishga ruxsat berilmaydi (hatto o'z sayti ichida ham);",
          "<code>X-Frame-Options: SAMEORIGIN</code> — sahifani faqat <strong>bir xil manbadagi</strong> iframe'ga qo'yish mumkin;",
          "<code>X-Frame-Options: ALLOW-FROM https://example.com</code> — faqat ko'rsatilgan manbaga ruxsat (eskirgan, ko'p brauzerlar qo'llab-quvvatlamaydi)."
        ] },
        { code: "// Server javob sarlavhalari (misol):\nX-Frame-Options: SAMEORIGIN\n\n// yoki umuman ruxsat bermaslik:\nX-Frame-Options: DENY" },
        { p: "Agar brauzer bu sarlavhani ko'rsa va u <code>DENY</code> yoki mos kelmagan manba bo'lsa, u sahifani iframe'da <strong>umuman ko'rsatmaydi</strong> — hujumchi qurbon saytni yashira olmaydi." },
        { note: "<code>X-Frame-Options</code> — HTTP <strong>javob</strong> sarlavhasi. Uni HTML <code>&lt;meta&gt;</code> tegi orqali qo'yib bo'lmaydi — u albatta server tomonidan yuborilishi kerak. Serveringiz konfiguratsiyasida (Nginx, Apache, Express va h.k.) sozlanadi." },

        { h2: "Himoya 2: CSP frame-ancestors" },
        { p: "Zamonaviyroq va moslashuvchan usul — <strong>Content-Security-Policy (CSP)</strong> sarlavhasidagi <code>frame-ancestors</code> direktivasi. U <code>X-Frame-Options</code> o'rnini bosadi va ko'proq imkoniyat beradi:" },
        { code: "// hech kim iframe'ga qo'ya olmasin:\nContent-Security-Policy: frame-ancestors 'none'\n\n// faqat o'z manbamiz:\nContent-Security-Policy: frame-ancestors 'self'\n\n// aniq ro'yxat:\nContent-Security-Policy: frame-ancestors 'self' https://trusted.com https://partner.com" },
        { ul: [
          "<code>'none'</code> — <code>X-Frame-Options: DENY</code> bilan bir xil: hech qanday iframe'ga ruxsat yo'q;",
          "<code>'self'</code> — <code>SAMEORIGIN</code> bilan bir xil: faqat o'z manbamiz;",
          "manzillar ro'yxati — bir nechta ishonchli manbaga ruxsat berish mumkin (bu <code>X-Frame-Options</code>da yo'q imkoniyat)."
        ] },
        { tip: "Yangi loyihalarda <code>frame-ancestors</code>ni afzal ko'ring, chunki u moslashuvchan va zamonaviy standart. Eski brauzerlar uchun qo'shimcha xavfsizlik sifatida <code>X-Frame-Options</code>ni ham qo'shib qo'yish mumkin — ikkalasini birga ishlatish keng tarqalgan amaliyot." },

        { h2: "Himoya 3: SameSite cookie" },
        { p: "Clickjacking hujumi foydalanuvchining <strong>cookie'lari</strong> avtomatik yuborilishiga tayanadi (chunki qurbon saytga tizimga kirgan). Agar autentifikatsiya cookie'lari boshqa saytdagi iframe'dan yuborilmasa, hujum foydasiz bo'ladi — sayt bosishni anonim deb qabul qiladi." },
        { p: "Cookie'ning <code>SameSite</code> atributi aynan shu vaziyatni boshqaradi:" },
        { ul: [
          "<code>SameSite=Strict</code> — cookie faqat sahifaning <strong>o'z manbasidan</strong> so'rovlarga yuboriladi; boshqa saytdagi iframe yoki havoladan kelgan so'rovlarga <strong>yuborilmaydi</strong>;",
          "<code>SameSite=Lax</code> — cookie odatdagi navigatsiyalarda yuboriladi, lekin ko'plab cross-site kontekstlarda (jumladan iframe'lardagi so'rovlar) yuborilmaydi. Bu zamonaviy brauzerlarda <strong>standart</strong> qiymat;",
          "<code>SameSite=None</code> — cookie barcha kontekstlarda yuboriladi (bunda <code>Secure</code> ham majburiy). Bu clickjacking'ga qarshi himoyani <strong>o'chiradi</strong>."
        ] },
        { code: "// Server tomonidan cookie o'rnatish (misol):\nSet-Cookie: session=abc123; SameSite=Strict; Secure; HttpOnly" },
        { note: "<code>SameSite=Lax</code> (yoki <code>Strict</code>) tufayli, hujumchi iframe'idagi qurbon saytga so'rovda autentifikatsiya cookie'lari qo'shilmaydi. Shunda bosish tizimga kirmagan (anonim) foydalanuvchi harakati sifatida ko'rinadi va zararli amal bajarilmaydi." },
        { warn: "<code>SameSite</code> kuchli himoya, lekin u <strong>yagona</strong> yechim emas. Ba'zi holatlar (masalan, <code>GET</code> orqali amalga oshiriladigan xavfsiz bo'lmagan operatsiyalar yoki <code>SameSite=None</code> ishlatilgan cookie'lar) hali ham zaif bo'lishi mumkin. Uni <code>frame-ancestors</code>/<code>X-Frame-Options</code> bilan <strong>birga</strong> ishlating." },

        { h2: "Ko'p qatlamli himoya" },
        { p: "Ishonchli xavfsizlik uchun himoya usullarini <strong>birgalikda</strong> qo'llash tavsiya etiladi. To'liq strategiya:" },
        { ol: [
          "<strong>frame-ancestors</strong> (CSP) — sahifani begona iframe'ga qo'yishni to'sish (asosiy himoya);",
          "<strong>X-Frame-Options</strong> — eski brauzerlar uchun zaxira himoya;",
          "<strong>SameSite cookie</strong> — cross-site kontekstda autentifikatsiya cookie'larini yubormaslik;",
          "Muhim amallar uchun qo'shimcha tasdiqlash (masalan, tugma bosilgach parolni yoki CAPTCHA'ni so'rash) — hujumchi buni takrorlay olmaydi."
        ] },
        { tip: "Xavfsizlikda \"chuqurlikdagi himoya\" (defense in depth) tamoyili muhim: bitta qatlam yiqilsa, boshqasi himoya qiladi. Clickjacking'da <code>frame-ancestors</code> + <code>SameSite</code> + muhim amallar uchun tasdiqlash birgalikda kuchli himoya beradi." },

        { h2: "Xulosa" },
        { ul: [
          "<strong>Clickjacking</strong> — foydalanuvchini ko'rinmas iframe ustidagi tugmani bilmasdan bosishga majburlovchi hujum;",
          "Hujum qurbon saytga <strong>tizimga kirgan (login)</strong> holatdan va avtomatik yuboriladigan cookie'lardan foydalanadi;",
          "JavaScript orqali \"frame busting\" himoyasi <strong>ishonchsiz</strong> — server tomonidagi himoya kerak;",
          "<code>X-Frame-Options</code> (<code>DENY</code>/<code>SAMEORIGIN</code>) sahifani iframe'ga qo'yishni bloklaydi;",
          "<code>Content-Security-Policy: frame-ancestors</code> — zamonaviy va moslashuvchan muqobil;",
          "<code>SameSite</code> cookie atributi cross-site kontekstda autentifikatsiya cookie'larini yubormaydi va hujumni foydasiz qiladi;",
          "Eng yaxshi natija uchun bu himoyalarni <strong>birgalikda</strong> ishlating."
        ] }
      ]
    }
  ]
};
