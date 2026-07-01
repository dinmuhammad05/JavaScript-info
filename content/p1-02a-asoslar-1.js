"use strict";

module.exports = {
  part: "1-qism: JavaScript tili",
  chapter: "JavaScript asoslari",
  lessons: [
    {
      slug: "salom-dunyo",
      title: "Salom, dunyo!",
      blurb: "JavaScript kodini HTML sahifaga qanday ulash: script tegi, src atributi va tashqi fayllar.",
      body: [
        { lead: "Ushbu darsda birinchi JavaScript kodimizni yozamiz va uni veb-sahifaga qanday ulashni o'rganamiz. Kursning katta qismi brauzerga qaratilgan, shuning uchun kodni HTML ichida ishga tushirishni bilib olish muhim." },

        { h2: "\"script\" tegi" },
        { p: "JavaScript dasturlarini HTML hujjatining deyarli istalgan joyiga <code>&lt;script&gt;</code> tegi yordamida joylashtirish mumkin. Masalan:" },
        { code: "<!DOCTYPE HTML>\n<html>\n<body>\n\n  <p>Skriptdan oldin...</p>\n\n  <script>\n    alert(\"Salom, dunyo!\");\n  </script>\n\n  <p>...Skriptdan keyin.</p>\n\n</body>\n</html>" },
        { p: "Brauzer <code>&lt;script&gt;</code> tegiga yetganda uning ichidagi kodni avtomatik o'qiydi va bajaradi. Bu misolda <code>alert</code> ekranda \"Salom, dunyo!\" degan modal oyna ko'rsatadi." },
        { note: "Yuqoridagi misol <code>alert</code> ishlatgani uchun statik ko'rsatilgan. <code>alert</code>, <code>prompt</code> va <code>confirm</code> faqat haqiqiy brauzerda ishlaydi — quyidagi interaktiv maydonchalarda esa <code>console.log</code> ishlatamiz, chunki u natijani darhol chiqaradi." },
        { p: "Endi haqiqiy ishlaydigan birinchi kodimizni sinab ko'ramiz. Quyidagi tugmani bosing va natijani kuzating:" },
        { pg: "console.log(\"Salom, dunyo!\");", file: "salom.js" },

        { h2: "Zamonaviy va eski belgilash" },
        { p: "Eski kodlarda <code>&lt;script&gt;</code> tegining bir nechta qo'shimcha atributlarini uchratishingiz mumkin. Ular bugungi kunda kerak emas, lekin nima uchun ishlatilganini bilib qo'yish foydali." },
        { ul: [
          "<code>type</code> atributi: eski HTML4 da <code>type=\"text/javascript\"</code> yozish talab qilinardi. Endi bu shart emas — zamonaviy HTML standarti buni butunlay o'zgartirdi va endi u JavaScript modullari uchun ishlatiladi;",
          "<code>language</code> atributi: bu atribut ishlatilayotgan tilni ko'rsatardi. Hozir JavaScript standart til bo'lgani uchun uning hech qanday ma'nosi yo'q."
        ] },
        { warn: "Agar eski loyihalarda <code>&lt;!-- ... --&gt;</code> kabi HTML izohlari script ichida yozilganini ko'rsangiz — bu juda qadimgi brauzerlar uchun edi. Zamonaviy kodda ularni umuman ishlatmaymiz." },

        { h2: "Tashqi skriptlar (src atributi)" },
        { p: "Agar sizda ko'p JavaScript kodi bo'lsa, uni alohida faylga chiqarib qo'yish yaxshi amaliyot hisoblanadi. Skript fayllari HTML ga <code>src</code> atributi orqali ulanadi:" },
        { code: "<script src=\"/yol/skript.js\"></script>" },
        { p: "Bu yerda <code>/yol/skript.js</code> — skript faylining saytdagi absolyut yo'li. To'liq URL manzil ham berish mumkin:" },
        { code: "<script src=\"https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.21/lodash.min.js\"></script>" },
        { p: "Bir nechta skriptni ulash uchun bir nechta teg yozamiz:" },
        { code: "<script src=\"/js/script1.js\"></script>\n<script src=\"/js/script2.js\"></script>" },

        { h2: "Nima uchun tashqi fayl afzal?" },
        { p: "Kodni alohida faylga chiqarishning ikkita muhim afzalligi bor:" },
        { ol: [
          "<strong>Kesh (cache).</strong> Brauzer skriptni yuklab olib, o'z xotirasida (keshda) saqlaydi. Boshqa sahifalar ham xuddi shu faylga murojaat qilsa, brauzer uni qaytadan yuklamaydi — keshdan oladi. Bu trafikni tejaydi va sahifalar tezroq ochiladi;",
          "<strong>Tozalik.</strong> HTML va JavaScript alohida bo'lganda, kodni o'qish va boshqarish osonlashadi."
        ] },
        { warn: "Agar <code>&lt;script&gt;</code> tegida <code>src</code> atributi bo'lsa, tegning ichidagi kod <strong>e'tiborga olinmaydi</strong>. Bitta teg ikkalasini birdan bajara olmaydi." },
        { code: "<script src=\"file.js\">\n  // src bor bo'lsa, bu ichki kod ishlamaydi\n  alert(\"Salom\");\n</script>" },
        { p: "Buni to'g'rilash uchun ikkita alohida teg ishlatamiz:" },
        { code: "<script src=\"file.js\"></script>\n<script>\n  alert(\"Salom\");\n</script>" },

        { h2: "Xulosa" },
        { ul: [
          "JavaScript kodini sahifaga <code>&lt;script&gt;</code> tegi orqali ulaymiz;",
          "Kodni to'g'ridan-to'g'ri teg ichiga yozish yoki tashqi faylga chiqarib <code>src</code> orqali ulash mumkin;",
          "Katta kodlar uchun tashqi fayl afzal — u keshlanadi va HTML ni toza saqlaydi;",
          "Bitta tegda bir vaqtda <code>src</code> va ichki kod ishlamaydi — alohida teglar kerak."
        ] }
      ]
    },

    {
      slug: "kod-tuzilishi",
      title: "Kod tuzilishi",
      blurb: "Instruksiyalar, nuqta-vergul (;) qo'yish qoidalari, avtomatik qo'yilish tuzoqlari va izohlar.",
      body: [
        { lead: "Kodni yozishni boshlashdan oldin uning eng asosiy qurilish bloklari — instruksiyalar, nuqta-vergul va izohlar bilan tanishamiz. Bu bilimlar kodni to'g'ri va toza yozishga yordam beradi." },

        { h2: "Instruksiyalar (statements)" },
        { p: "<strong>Instruksiyalar</strong> — bu biror amalni bajaradigan sintaktik konstruksiyalar va buyruqlar. Biz allaqachon <code>console.log(\"Salom, dunyo!\")</code> instruksiyasini ko'rgan edik — u xabar chiqaradi." },
        { p: "Instruksiyalarni istalgancha ko'p yozish mumkin. Ularni bir-biridan ajratish uchun nuqta-vergul qo'yamiz. Quyidagi misolda ikkita alohida instruksiya bor:" },
        { pg: "console.log(\"Salom\");\nconsole.log(\"Dunyo\");", file: "instruksiyalar.js" },
        { p: "Odatda har bir instruksiya alohida qatorga yoziladi — shunda kod o'qishga qulay bo'ladi." },

        { h2: "Nuqta-vergul (;)" },
        { p: "Ko'p hollarda qator oxirida nuqta-vergulni tushirib qoldirsak ham, JavaScript uni <strong>o'zi qo'yib oladi</strong>. Bu \"avtomatik nuqta-vergul qo'yilishi\" (automatic semicolon insertion) deb ataladi. Masalan, quyidagi ikkala variant ham to'g'ri ishlaydi:" },
        { pg: "console.log(\"Salom\")\nconsole.log(\"Dunyo\")", file: "avto-semicolon.js" },
        { p: "Bu yerda JavaScript qator uzilishini (yangi qatorga o'tishni) ko'pincha \"yashirin\" nuqta-vergul deb qabul qiladi. Buni <em>avtomatik nuqta-vergul qo'yilishi</em> deyiladi." },
        { note: "Ko'p hollarda yangi qator nuqta-vergulni bildiradi. Lekin \"ko'p hollarda\" degani \"har doim\" degani emas!" },

        { h2: "Avtomatik qo'yilish har doim ishlamaydi" },
        { p: "Bir qancha holatlarda JavaScript yangi qatorni nuqta-vergul deb <strong>hisoblamaydi</strong>, bu esa xatolarga sabab bo'ladi. Klassik misolni ko'ramiz:" },
        { code: "alert(\"Xatolik bo'ladi\")\n\n[1, 2].forEach(alert)" },
        { p: "Agar ushbu ikki qator orasiga nuqta-vergul qo'ymasak, JavaScript birinchi qator oxirida nuqta-vergul qo'ymaydi, chunki keyingi qator <code>[</code> bilan boshlanmoqda. U ikkala qatorni bitta instruksiya deb o'qishga urinadi va xato yuz beradi." },
        { p: "To'g'ri variant — nuqta-vergul qo'yish:" },
        { code: "alert(\"Endi hammasi joyida\");\n\n[1, 2].forEach(alert);" },
        { warn: "Nuqta-vergullarni ataylab tushirib qoldirmang. Zamonaviy dasturchilarning ko'pchiligi har bir instruksiya oxiriga nuqta-vergul qo'yishni tavsiya qiladi. Bu tuzoqlardan himoya qiladi va kodni ishonchli qiladi." },
        { tip: "Boshida shubhali holatlarda nuqta-vergulni doim qo'ying. Tajriba orttirgach, uni qayerda tushirib qoldirish xavfsizligini bilib olasiz — lekin kod bazasida bir xil uslubga rioya qilgan ma'qul." },

        { h2: "Izohlar (comments)" },
        { p: "Vaqt o'tib dasturlar murakkablashadi. Kodning nima qilishini va nima uchun shunday yozilganini tushuntirish uchun <strong>izohlar</strong> qo'shiladi. Izohlar kod ishlashiga ta'sir qilmaydi — JavaScript ularni butunlay e'tiborsiz qoldiradi." },

        { h3: "Bir qatorli izohlar" },
        { p: "Bir qatorli izoh ikkita slesh <code>//</code> bilan boshlanadi. Qatorning qolgan qismi izoh hisoblanadi. U alohida qatorda yoki instruksiyadan keyin turishi mumkin:" },
        { pg: "// Bu izoh alohida qatorda\nconsole.log(\"Salom\");\n\nconsole.log(\"Dunyo\"); // Bu izoh instruksiyadan keyin", file: "bir-qatorli-izoh.js" },

        { h3: "Ko'p qatorli izohlar" },
        { p: "Ko'p qatorli izoh <code>/*</code> bilan boshlanib, <code>*/</code> bilan tugaydi. Ular orasidagi hamma narsa e'tiborsiz qoldiriladi:" },
        { pg: "/*\n  Bu ikki qatorli izoh misoli.\n  Bu yerda kodni tushuntirish mumkin.\n*/\nconsole.log(\"Salom\");", file: "kop-qatorli-izoh.js" },
        { p: "Izohlar yordamida kodning bir qismini vaqtincha \"o'chirib\" qo'yish ham mumkin — bu debugging paytida juda foydali:" },
        { pg: "console.log(\"Bu ishlaydi\");\n// console.log(\"Bu qator izohga olingan, ishlamaydi\");\nconsole.log(\"Bu ham ishlaydi\");", file: "izohga-olish.js" },
        { note: "Ko'pgina muharrirlarda tanlangan kodni izohga olish uchun <code>Ctrl + /</code> (bir qatorli) va <code>Ctrl + Shift + /</code> (ko'p qatorli) tugmalar birikmasidan foydalanish mumkin." },
        { warn: "Ichma-ich izohlar qo'llab-quvvatlanmaydi! <code>/* ... /* ... */ ... */</code> kabi ichida yana <code>/* */</code> bo'lgan izoh xato beradi." },
        { tip: "Izohlar kodni uzaytiradi deb ulardan qochmang. Yaxshi izoh — kelajakdagi o'zingizga va boshqa dasturchilarga qo'yilgan hurmat. Lekin \"nima\" emas, ko'proq \"nima uchun\" shunday qilinganini tushuntiring." },

        { h2: "Xulosa" },
        { ul: [
          "<strong>Instruksiyalar</strong> — amal bajaradigan buyruqlar, ular nuqta-vergul bilan ajratiladi;",
          "JavaScript ko'p hollarda nuqta-vergulni avtomatik qo'yadi, lekin bu har doim ishonchli emas;",
          "Xavfsizlik uchun har bir instruksiya oxiriga nuqta-vergul qo'yish tavsiya etiladi;",
          "Izohlar <code>//</code> (bir qatorli) va <code>/* */</code> (ko'p qatorli) bilan yoziladi;",
          "Izohlar kod ishlashiga ta'sir qilmaydi, lekin ichma-ich <code>/* */</code> ishlamaydi."
        ] }
      ]
    },

    {
      slug: "use-strict",
      title: "Zamonaviy rejim, \"use strict\"",
      blurb: "\"use strict\" direktivasi nima, u nimani o'zgartiradi va zamonaviy kodda uning avtomatikligi.",
      body: [
        { lead: "Uzoq vaqt davomida JavaScript orqaga moslikni saqlab rivojlanib keldi — eski kod buzilmasligi kerak edi. 2009-yilda ES5 standarti chiqqach, tilga yangi imkoniyatlar va ba'zi eski xatti-harakatlarni o'zgartirish qo'shildi. Ular buzilmasligi uchun maxsus <code>\"use strict\"</code> direktivasi bilan yoqiladigan qilindi." },

        { h2: "\"use strict\" nima?" },
        { p: "Direktiva oddiy matn ko'rinishida — <code>\"use strict\"</code> yoki <code>'use strict'</code> deb yoziladi. U skript yoki funksiya <strong>eng boshiga</strong> qo'yilganda, kod \"zamonaviy\" (strict — qat'iy) rejimda ishlaydi:" },
        { code: "\"use strict\";\n\n// bu kod zamonaviy rejimda ishlaydi\n// ..." },
        { p: "Tez orada funksiyalarni o'rganamiz — o'shanda <code>\"use strict\"</code> ni butun skript o'rniga faqat bitta funksiya ichiga qo'yish mumkinligini ko'ramiz. Odatda esa uni butun skriptga qo'llaymiz." },

        { h2: "\"use strict\" qayerga yoziladi?" },
        { p: "Bu direktiva faqat skript yoki funksiyaning <strong>eng tepasida</strong> turgandagina ishlaydi. Undan oldin faqat izohlar bo'lishi mumkin, boshqa hech narsa emas." },
        { warn: "Agar <code>\"use strict\"</code> ni skript o'rtasiga yoki oxiriga qo'ysangiz, u <strong>ishlamaydi</strong>. Direktiva shunchaki e'tiborsiz qoldiriladi, xato ham bermaydi. Shuning uchun har doim eng tepaga yozing." },
        { code: "console.log(\"biror kod\");\n\"use strict\"; // bu joyda kech — ishlamaydi!" },

        { h2: "\"use strict\" ni bekor qilib bo'lmaydi" },
        { p: "Diqqat qiling — <code>\"use strict\"</code> ni yoqib bo'lgach, uni \"o'chirib\" qo'yadigan hech qanday direktiva yo'q. Kodni oldingi rejimga qaytaradigan <code>\"no use strict\"</code> kabi buyruq mavjud emas." },
        { note: "Zamonaviy rejimga bir marta o'tsangiz, orqaga qaytish yo'q. Bu yomon narsa emas — chunki zamonaviy rejim faqat foydali qat'iyliklarni qo'shadi." },

        { h2: "U nimani o'zgartiradi?" },
        { p: "Zamonaviy rejim tilning ba'zi \"yumshoq\" xatti-harakatlarini qat'iyroq va ishonchliroq qiladi. Bir nechta muhim misol:" },
        { ul: [
          "E'lon qilinmagan o'zgaruvchiga qiymat berishga urinish endi jimgina o'tib ketmaydi, balki <strong>xato</strong> beradi;",
          "Ba'zi \"jim\" xatolar (silent errors) endi ochiq xatolarga aylanadi, bu esa muammolarni erta topishga yordam beradi;",
          "Til yanada mantiqiy va bashorat qilinadigan bo'ladi."
        ] },
        { p: "Umuman olganda, <code>\"use strict\"</code> kodni xavfsizroq va toza qiladi. Shu sababli undan foydalanish tavsiya etiladi." },
        { tip: "Yangi loyiha yozayotgan bo'lsangiz va u alohida skriptlardan iborat bo'lsa, uni <code>\"use strict\"</code> bilan boshlash yaxshi odat. Ushbu kursdagi barcha misollar zamonaviy rejimni nazarda tutadi." },

        { h2: "Zamonaviy kodda \"use strict\" avtomatik" },
        { p: "Muhim yangilik: agar siz JavaScript <strong>klasslar</strong> (classes) yoki <strong>modullar</strong> (modules) ichida kod yozsangiz, <code>\"use strict\"</code> ni yozishning hojati yo'q — u u yerda <strong>avtomatik</strong> yoqilgan bo'ladi." },
        { p: "Zamonaviy ilovalarda kod deyarli har doim modullarda joylashadi, shuning uchun ko'p hollarda direktivani qo'lda yozmaysiz ham. Biroq alohida oddiy skriptlar yozganda, uni yozib qo'ygan ma'qul." },
        { note: "Klasslar va modullarni keyingi boblarda batafsil o'rganamiz. Hozircha faqat shuni eslab qoling: ular ichida zamonaviy rejim doimo yoqilgan." },

        { h2: "Xulosa" },
        { ul: [
          "<code>\"use strict\"</code> — kodni zamonaviy (qat'iy) rejimda ishlatadigan direktiva;",
          "U skript yoki funksiyaning eng tepasiga yoziladi, aks holda ishlamaydi;",
          "U ba'zi jim xatolarni ochiq xatolarga aylantiradi va kodni ishonchli qiladi;",
          "Bir marta yoqilsa, uni bekor qilib bo'lmaydi;",
          "Klasslar va modullarda u avtomatik yoqilgan, qo'lda yozish shart emas."
        ] }
      ]
    },

    {
      slug: "ozgaruvchilar",
      title: "O'zgaruvchilar",
      blurb: "let, const va var; o'zgaruvchi yaratish, nomlash qoidalari, camelCase va const ma'nosi.",
      body: [
        { lead: "Ko'pincha dasturga ma'lumot bilan ishlash kerak bo'ladi. Masalan, onlayn do'kon tovarlarni va xaridlar savatini saqlaydi. Bu ma'lumotni saqlash uchun <strong>o'zgaruvchilar</strong> ishlatiladi." },

        { h2: "O'zgaruvchi nima?" },
        { p: "<strong>O'zgaruvchi (variable)</strong> — bu ma'lumot uchun \"nomlangan qutixona\". Uning ichiga har qanday qiymat — matn, son yoki boshqa narsa joylashtirish mumkin." },
        { p: "JavaScript'da o'zgaruvchi yaratish uchun <code>let</code> kalit so'zi ishlatiladi. Quyidagi qatorda <code>xabar</code> nomli o'zgaruvchi yaratamiz:" },
        { pg: "let xabar;\nxabar = \"Salom\";\nconsole.log(xabar);", file: "ozgaruvchi.js" },
        { p: "Bu yerda ikki bosqich bor: avval <code>let xabar</code> bilan o'zgaruvchini <em>e'lon qilamiz</em>, so'ng <code>=</code> belgisi orqali unga <code>\"Salom\"</code> qiymatini <em>beramiz</em> (o'zlashtiramiz)." },
        { p: "Ikkala amalni bitta qatorda birlashtirish mumkin — bu eng keng tarqalgan yozuv:" },
        { pg: "let xabar = \"Salom\";\nconsole.log(xabar);", file: "ozgaruvchi-qisqa.js" },

        { h2: "Bir nechta o'zgaruvchi" },
        { p: "Bir nechta o'zgaruvchini bitta qatorda, vergul bilan ajratib e'lon qilish mumkin, lekin bu o'qishni qiyinlashtiradi:" },
        { code: "let user = \"Ali\", age = 25, message = \"Salom\";" },
        { p: "O'qish qulayligi uchun har bir o'zgaruvchini alohida qatorga yozish tavsiya etiladi:" },
        { pg: "let user = \"Ali\";\nlet age = 25;\nlet message = \"Salom\";\n\nconsole.log(user, age, message);", file: "kop-ozgaruvchi.js" },

        { h2: "Qiymatni o'zgartirish" },
        { p: "O'zgaruvchining qiymatini istalgan vaqtda o'zgartirish mumkin. Eski qiymat o'chib, o'rniga yangisi yoziladi:" },
        { pg: "let xabar = \"Salom\";\nconsole.log(xabar);\n\nxabar = \"Dunyo\"; // qiymatni o'zgartirdik\nconsole.log(xabar);", file: "qiymat-ozgartirish.js" },
        { p: "Bir o'zgaruvchidan boshqasiga qiymat nusxalash ham mumkin:" },
        { pg: "let salom = \"Salom, dunyo!\";\nlet xabar;\n\nxabar = salom; // salom qiymatini xabar ga nusxaladik\n\nconsole.log(salom);\nconsole.log(xabar);", file: "nusxalash.js" },
        { warn: "Bir o'zgaruvchini <code>let</code> bilan ikki marta e'lon qilish xatolikka olib keladi. Masalan <code>let x = 1; let x = 2;</code> — bu \"x has already been declared\" degan xato beradi." },

        { h2: "Nomlash qoidalari" },
        { p: "O'zgaruvchi nomlariga ikkita qat'iy cheklov bor:" },
        { ol: [
          "Nomda faqat harflar, raqamlar hamda <code>$</code> va <code>_</code> belgilari bo'lishi mumkin;",
          "Birinchi belgi raqam bo'lishi mumkin emas."
        ] },
        { p: "To'g'ri nomlarga misollar:" },
        { pg: "let userName = \"Ali\";\nlet test123 = 123;\nlet $ = \"dollar belgisi ham mumkin\";\nlet _ = \"pastki chiziq ham mumkin\";\n\nconsole.log(userName, test123, $, _);", file: "nomlar.js" },
        { p: "Noto'g'ri nomlarga misol (bularni ishlatib bo'lmaydi):" },
        { code: "let 1a;      // raqam bilan boshlanmaydi\nlet my-name; // chiziqcha (-) mumkin emas" },
        { note: "O'zgaruvchi nomi <strong>katta-kichik harflarni ajratadi</strong> (case-sensitive). Ya'ni <code>apple</code> va <code>APPLE</code> — ikki xil o'zgaruvchi." },
        { note: "JavaScript kirill yoki boshqa alifbolardagi harflarga ham ruxsat beradi (masalan <code>let имя</code>), lekin amalda faqat inglizcha nomlar ishlatiladi." },

        { h2: "camelCase uslubi" },
        { p: "Agar nom bir necha so'zdan iborat bo'lsa, odatda <strong>camelCase</strong> uslubi qo'llaniladi: birinchi so'z kichik harf bilan, keyingi har bir so'z esa katta harf bilan boshlanadi." },
        { pg: "let myVeryLongName = \"camelCase misoli\";\nlet firstName = \"Ali\";\nlet userAge = 25;\n\nconsole.log(myVeryLongName, firstName, userAge);", file: "camelcase.js" },
        { tip: "O'zgaruvchiga <em>mazmunli</em> nom bering. <code>data</code> yoki <code>value</code> kabi umumiy nomlardan qoching. Nomdan uning nimani saqlayotgani ma'lum bo'lsin — masalan <code>userName</code>, <code>totalPrice</code>. Yaxshi nomlar kodni o'z-o'zini tushuntiradigan qiladi." },

        { h2: "Rezervlangan so'zlar" },
        { p: "Ba'zi so'zlar tilning o'zi tomonidan ishlatiladi (masalan <code>let</code>, <code>class</code>, <code>return</code>, <code>function</code>). Ularni o'zgaruvchi nomi sifatida ishlatib bo'lmaydi — bu xato beradi." },
        { code: "let let = 5;      // xato: \"let\" rezervlangan\nlet return = 10;  // xato: \"return\" rezervlangan" },

        { h2: "const — o'zgarmas o'zgaruvchi" },
        { p: "O'zgarmaydigan (doimiy) qiymatni e'lon qilish uchun <code>let</code> o'rniga <code>const</code> ishlatiladi:" },
        { pg: "const myBirthday = \"18.04.1998\";\nconsole.log(myBirthday);", file: "const.js" },
        { p: "<code>const</code> bilan e'lon qilingan o'zgaruvchining qiymatini o'zgartirib bo'lmaydi. Buni qilishga urinish xato beradi:" },
        { code: "const myBirthday = \"18.04.1998\";\nmyBirthday = \"01.01.2000\"; // xato — const qiymatini o'zgartirib bo'lmaydi!" },
        { p: "Agar dasturchi biror qiymat hech qachon o'zgarmasligiga amin bo'lsa, uni <code>const</code> bilan e'lon qiladi. Bu qiymat tasodifan o'zgarib ketishidan himoya qiladi va boshqalarga ham \"bu doimiy\" ekanini bildiradi." },

        { h2: "Katta harfli konstantalar" },
        { p: "Kod ishga tushishidan oldin ma'lum bo'lgan, \"qattiq kodlangan\" qiymatlar uchun ko'pincha katta harfli va pastki chiziqli nomlar ishlatiladi:" },
        { pg: "const COLOR_RED = \"#F00\";\nconst COLOR_GREEN = \"#0F0\";\nconst COLOR_BLUE = \"#00F\";\n\nlet tanlanganRang = COLOR_GREEN;\nconsole.log(tanlanganRang);", file: "katta-const.js" },
        { note: "Barcha <code>const</code> larni katta harf bilan yozish shart emas. Katta harflar faqat kod yozilishidan oldin <strong>ma'lum</strong> bo'lgan, \"eslab qolish qiyin\" qiymatlar uchun ishlatiladi. Kod ishlash paytida hisoblab olinadigan doimiylar odatiy camelCase bilan yoziladi." },

        { h2: "var haqida" },
        { p: "Eski kodlarda o'zgaruvchi e'lon qilish uchun <code>var</code> kalit so'zini uchratishingiz mumkin. U <code>let</code> ga o'xshaydi, lekin muhim farqlari bor va ba'zi \"g'alati\" xatti-harakatlarga ega." },
        { warn: "Zamonaviy kodda <code>var</code> deyarli ishlatilmaydi. Har doim <code>let</code> yoki <code>const</code> dan foydalaning. <code>var</code> ning o'ziga xosliklarini keyinroq alohida darsda ko'rib chiqamiz." },

        { h2: "Xulosa" },
        { ul: [
          "O'zgaruvchilar ma'lumotni saqlaydi — ularni <code>let</code> yoki <code>const</code> bilan yaratamiz;",
          "<code>let</code> — qiymati o'zgarishi mumkin bo'lgan o'zgaruvchi;",
          "<code>const</code> — qiymati o'zgarmaydigan o'zgaruvchi;",
          "Nomda harflar, raqamlar, <code>$</code> va <code>_</code> bo'lishi mumkin, lekin raqam bilan boshlanmaydi;",
          "Ko'p so'zli nomlar uchun <strong>camelCase</strong> ishlatiladi;",
          "O'zgaruvchiga mazmunli va tushunarli nom bering."
        ] }
      ]
    },

    {
      slug: "malumot-turlari",
      title: "Ma'lumot turlari",
      blurb: "JavaScript'ning 8 ta ma'lumot turi va typeof operatori.",
      body: [
        { lead: "JavaScript'da qiymatlar har doim ma'lum bir <strong>turga</strong> (type) tegishli bo'ladi. Masalan, matn yoki son. Jami 8 ta asosiy ma'lumot turi mavjud. Ushbu darsda ular bilan umumiy tanishamiz." },

        { h2: "JavaScript — dinamik tildir" },
        { p: "JavaScript'da bir o'zgaruvchi vaqt o'tishi bilan turli tipdagi ma'lumotlarni saqlashi mumkin. Bunday tillar <strong>dinamik tipli</strong> (dynamically typed) deb ataladi:" },
        { pg: "let message = \"Salom\"; // string (matn)\nmessage = 123456;      // endi number (son)\nconsole.log(message);", file: "dinamik.js" },
        { p: "Bu yerda <code>message</code> avval matn, keyin son bo'ldi — hech qanday xatosiz. Endi 8 ta turni birma-bir ko'rib chiqamiz." },

        { h2: "1. Number (son)" },
        { p: "<strong>number</strong> turi butun va kasr sonlarni ifodalaydi. Sonlar ustida ko'plab amallar bajarish mumkin: qo'shish (<code>+</code>), ayirish (<code>-</code>), ko'paytirish (<code>*</code>), bo'lish (<code>/</code>) va boshqalar." },
        { pg: "let n = 123;\nconsole.log(n);\n\nn = 12.345;\nconsole.log(n);\n\nconsole.log(5 * 3);", file: "number.js" },
        { p: "Oddiy sonlardan tashqari maxsus son qiymatlari ham bor: <code>Infinity</code> (cheksizlik), <code>-Infinity</code> va <code>NaN</code> (Not a Number — noto'g'ri matematik amal natijasi)." },
        { pg: "console.log(1 / 0);         // Infinity\nconsole.log(\"matn\" * 2);    // NaN\nconsole.log(NaN + 5);       // NaN (NaN har qanday amalda NaN qoladi)", file: "maxsus-son.js" },

        { h2: "2. BigInt (katta butun son)" },
        { p: "Oddiy <code>number</code> turi juda katta sonlarni aniq saqlay olmaydi (taxminan 2 dan 53-darajagacha bo'lgan chegara bor). Bunday hollarda <strong>bigint</strong> turi ishlatiladi. BigInt qiymati son oxiriga <code>n</code> qo'yish orqali yaratiladi:" },
        { pg: "const katta = 1234567890123456789012345678901234567890n;\nconsole.log(katta);", file: "bigint.js" },
        { note: "BigInt kundalik dasturlashda kamdan-kam kerak bo'ladi. U kriptografiya yoki juda aniq katta sonlar bilan ishlash kabi maxsus vazifalarda ishlatiladi." },

        { h2: "3. String (matn)" },
        { p: "<strong>string</strong> — bu matn. U tirnoqlar ichiga olinadi. JavaScript'da uch xil tirnoq bor:" },
        { ul: [
          "Ikki tirnoq: <code>\"Salom\"</code>;",
          "Bitta tirnoq: <code>'Salom'</code>;",
          "Teskari tirnoq (backtick): matn ichiga o'zgaruvchi qo'shishga imkon beradi."
        ] },
        { pg: "let str = \"Salom\";\nlet str2 = 'Bitta tirnoq ham mumkin';\nlet ism = \"Ali\";\nlet salom = \"Salom, \" + ism + \"!\"; // matnlarni + bilan birlashtirdik\n\nconsole.log(str);\nconsole.log(str2);\nconsole.log(salom);", file: "string.js" },
        { note: "Ikki va bitta tirnoq orasida amalda hech qanday farq yo'q. Teskari tirnoqlar esa qo'shimcha imkoniyat beradi — ular ichida <code>${...}</code> orqali o'zgaruvchi va ifodalar joylashtiriladi. Buni keyingi boblarda ko'ramiz." },

        { h2: "4. Boolean (mantiqiy tur)" },
        { p: "<strong>boolean</strong> turining faqat ikkita qiymati bor: <code>true</code> (rost) va <code>false</code> (yolg'on). U odatda \"ha/yo'q\" tipidagi qiymatlarni saqlash uchun ishlatiladi:" },
        { pg: "let nameFieldChecked = true;  // ha, belgilangan\nlet ageFieldChecked = false;  // yo'q, belgilanmagan\n\nconsole.log(nameFieldChecked);\nconsole.log(4 > 1);  // taqqoslash natijasi ham boolean bo'ladi", file: "boolean.js" },

        { h2: "5. null (bo'sh qiymat)" },
        { p: "<strong>null</strong> turi faqat bitta <code>null</code> qiymatiga ega. U \"hech narsa\", \"bo'sh\" yoki \"noma'lum qiymat\" ma'nosini bildiradi:" },
        { pg: "let age = null;\nconsole.log(age); // null — yoshi hozircha noma'lum yoki yo'q", file: "null.js" },
        { warn: "JavaScript'da <code>null</code> boshqa tillardagi kabi \"mavjud bo'lmagan obyektga havola\" emas. Bu shunchaki \"bo'sh\" yoki \"qiymat yo'q\" degan maxsus qiymat." },

        { h2: "6. undefined (aniqlanmagan)" },
        { p: "<strong>undefined</strong> turi ham faqat bitta <code>undefined</code> qiymatiga ega. U \"qiymat berilmagan\" degan ma'noni bildiradi. Agar o'zgaruvchi e'lon qilinsa-yu, unga qiymat berilmasa, uning qiymati avtomatik <code>undefined</code> bo'ladi:" },
        { pg: "let x;\nconsole.log(x); // undefined — hali qiymat berilmagan", file: "undefined.js" },
        { note: "<code>null</code> — dasturchi tomonidan qo'yiladigan \"bo'sh\" qiymat. <code>undefined</code> — esa \"umuman qiymat berilmagan\" degani. Odatda o'zgaruvchiga <code>undefined</code> ni qo'lda bermaymiz — bo'shligini bildirish uchun <code>null</code> ishlatamiz." },

        { h2: "7. Object (obyekt)" },
        { p: "Yuqoridagi turlarning barchasi <strong>oddiy (primitive)</strong> deb ataladi, chunki ularning qiymatlari bitta narsani saqlaydi. <strong>object</strong> turi esa boshqacha — u ma'lumotlar to'plamini va murakkabroq tuzilmalarni saqlaydi." },
        { pg: "let user = {\n  ism: \"Ali\",\n  yosh: 25\n};\n\nconsole.log(user.ism);\nconsole.log(user.yosh);", file: "object.js" },
        { p: "Obyektlar shu qadar muhim va keng qamrovliki, ularga alohida boblar bag'ishlangan. Hozircha shuni bilib qo'ying: obyekt — bu nomlangan qiymatlar to'plami." },

        { h2: "8. Symbol (simvol)" },
        { p: "<strong>symbol</strong> turi obyektlar uchun noyob va yashirin identifikatorlar yaratishda ishlatiladi. Bu ilg'or mavzu bo'lib, hozircha uni faqat ro'yxatni to'liq qilish uchun eslab qo'yamiz:" },
        { code: "let id = Symbol(\"id\");" },
        { note: "Symbol kundalik boshlang'ich kodda kam ishlatiladi. U kutubxonalar va murakkab tuzilmalarda noyob kalitlar kerak bo'lganda qo'l keladi." },

        { h2: "typeof operatori" },
        { p: "<code>typeof</code> operatori argumentning turini <strong>matn</strong> ko'rinishida qaytaradi. Bu o'zgaruvchi ichida qanday tur borligini tekshirish uchun juda foydali:" },
        { pg: "console.log(typeof 123);        // \"number\"\nconsole.log(typeof 123n);       // \"bigint\"\nconsole.log(typeof \"salom\");    // \"string\"\nconsole.log(typeof true);       // \"boolean\"\nconsole.log(typeof undefined);  // \"undefined\"", file: "typeof-1.js" },
        { p: "Yana bir nechta muhim holatni ko'ramiz:" },
        { pg: "console.log(typeof {});          // \"object\"\nconsole.log(typeof null);       // \"object\" (bu tarixiy xato!)\nconsole.log(typeof Symbol(\"id\")); // \"symbol\"\nconsole.log(typeof console.log);  // \"function\"", file: "typeof-2.js" },
        { warn: "<code>typeof null</code> natijasi <code>\"object\"</code> — bu JavaScript'ning rasmiy tan olingan <strong>xatosi</strong>! Aslida <code>null</code> obyekt emas, alohida tur. Bu xato orqaga moslik uchun tuzatilmagan. Buni shunchaki eslab qoling." },
        { note: "<code>typeof</code> funksiyalar uchun <code>\"function\"</code> qaytaradi, garchi JavaScript'da alohida \"function\" turi yo'q bo'lsa ham. Funksiyalar texnik jihatdan obyektlarga tegishli, lekin <code>typeof</code> ularni alohida ajratadi — bu amalda qulay." },

        { h2: "Xulosa" },
        { ul: [
          "JavaScript'da 8 ta ma'lumot turi bor: <code>number</code>, <code>bigint</code>, <code>string</code>, <code>boolean</code>, <code>null</code>, <code>undefined</code>, <code>object</code>, <code>symbol</code>;",
          "Birinchi 7 tasi <strong>oddiy (primitive)</strong>, <code>object</code> esa alohida — u to'plamlarni saqlaydi;",
          "JavaScript dinamik tipli — bir o'zgaruvchi turli tipdagi qiymatlarni saqlashi mumkin;",
          "<code>typeof</code> operatori qiymat turini matn sifatida qaytaradi;",
          "<code>typeof null</code> noto'g'ri — <code>\"object\"</code> qaytaradi, bu tarixiy xato."
        ] }
      ]
    }
  ]
};
