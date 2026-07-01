"use strict";

module.exports = {
  part: "6-qism: Frontend asoslari",
  chapter: "React",
  lessons: [
    {
      slug: "react-nima",
      title: "React nima?",
      blurb: "React — foydalanuvchi interfeysi uchun kutubxona; komponentga asoslangan, deklarativ yondashuv, virtual DOM, SPA tushunchasi va Vite bilan o'rnatish.",
      body: [
        { lead: "Agar siz JavaScript'ni yaxshi bilsangiz, <strong>React</strong> — sizning keyingi qadamingiz bo'lishi mumkin. React — bugungi kunda frontend dunyosining eng mashhur vositalaridan biri. U yordamida <em>oddiy tugmadan</em> tortib, <em>butun boshli katta ilovagacha</em> qurish mumkin. Ushbu bobda biz React'ni JavaScript bilgan kishi nuqtai nazaridan, nol darajadan boshlab o'rganamiz." },

        { h2: "React nima va u nima uchun kerak?" },
        { p: "<strong>React</strong> — bu Facebook (hozirgi Meta) tomonidan yaratilgan, <strong>foydalanuvchi interfeysini</strong> (User Interface, qisqacha UI) qurish uchun mo'ljallangan JavaScript <em>kutubxonasi</em>. Bu yerda \"kutubxona\" so'ziga e'tibor bering — React o'zini <em>freymvork</em> emas, aynan kutubxona deb ataydi." },
        { p: "Nima uchun bu ajratish muhim? Oddiy JavaScript va DOM bilan katta ilova yozganingizda, quyidagi muammoga duch kelasiz: interfeysning har bir bo'lagini qo'lda yangilashingiz kerak. Foydalanuvchi biror tugmani bosdi — siz <code>document.querySelector</code> orqali kerakli elementni topib, uning matnini o'zgartirasiz, boshqa element ko'rinishini yashirasiz, ro'yxatga yangi element qo'shasiz. Ilova o'sgani sari, bu qo'lda boshqaruv chalkash va xatolarga to'la bo'lib ketadi." },
        { p: "React ushbu muammoni tubdan boshqacha hal qiladi. Siz DOM'ni qo'lda o'zgartirmaysiz. Buning o'rniga, siz React'ga: <em>\"Ma'lumot shu holatda bo'lsa, ekran shunday ko'rinishi kerak\"</em> deb aytasiz. Qolganini React o'zi bajaradi." },

        { h2: "Deklarativ yondashuv" },
        { p: "React'ning asosiy g'oyasi — <strong>deklarativlik</strong> (declarative). Buni tushunish uchun ikki yondashuvni solishtiramiz:" },
        { ul: [
          "<strong>Imperativ</strong> (imperative) yondashuv — siz <em>qadam-baqadam nima qilishni</em> yozasiz. \"Elementni top, matnini o'zgartir, klassini qo'sh\". Oddiy DOM bilan ishlash aynan shunday;",
          "<strong>Deklarativ</strong> (declarative) yondashuv — siz <em>natija qanday ko'rinishini</em> tasvirlaysiz. \"Hisoblagich 5 bo'lsa, ekranda '5' yozilsin\". Buni qanday amalga oshirishni React hal qiladi. React aynan shunday ishlaydi."
        ] },
        { p: "Masalan, oddiy DOM'da hisoblagich tugmasini yozish imperativ ko'rinishga ega:" },
        { code: "// Oddiy DOM — imperativ\nlet count = 0;\nconst tugma = document.querySelector(\"#tugma\");\nconst matn = document.querySelector(\"#matn\");\n\ntugma.addEventListener(\"click\", () => {\n  count = count + 1;\n  matn.textContent = count; // DOM'ni qo'lda yangilaymiz\n});" },
        { p: "React'da esa siz faqat <em>\"holat qanday bo'lsa, ekran shunday ko'rinadi\"</em> deb tasvirlaysiz. DOM'ni yangilashni butunlay React o'z zimmasiga oladi (bunga keyingi darslarda batafsil qaytamiz)." },
        { note: "Deklarativlik — bu React falsafasining o'zagi. \"Nima qilishni emas, nima ko'rinishini yozing\" — bu jumlani esda saqlab qoling." },

        { h2: "Komponentga asoslangan tuzilma" },
        { p: "React'da butun interfeys <strong>komponentlar</strong>dan (components) quriladi. Komponent — bu interfeysning mustaqil, qayta ishlatiladigan bo'lagi. Tugma, forma, navigatsiya paneli, izohlar ro'yxati — bularning har biri alohida komponent bo'lishi mumkin." },
        { p: "Katta ilova esa shu komponentlarning birlashmasidan iborat bo'ladi — xuddi Lego bo'laklaridan qurilgan konstruksiya kabi:" },
        { ul: [
          "Har bir komponent o'zining <strong>ko'rinishi</strong> (markup) va <strong>mantig'ini</strong> (logic) bir joyda saqlaydi;",
          "Komponentlar <strong>qayta ishlatiladi</strong> — bir marta yozib, ko'p joyda foydalanish mumkin;",
          "Komponentlar bir-biriga <strong>joylashadi</strong> (nesting) — kattasi ichida kichigi bo'ladi;",
          "Har bir komponent alohida test qilinadi va tuzatiladi — kod tartibli bo'ladi."
        ] },
        { p: "Masalan, oddiy ilova komponentlar daraxti sifatida tasavvur qilinadi:" },
        { code: "App\n |- Header\n |    |- Logo\n |    |- Navbar\n |- Main\n |    |- PostList\n |         |- Post\n |         |- Post\n |- Footer" },
        { tip: "Komponent — bu shunchaki JavaScript funksiyasi. Agar siz funksiyalarni bilsangiz, komponentlarni ham tez tushunasiz. Bu haqda keyingi darsda batafsil gaplashamiz." },

        { h2: "Virtual DOM" },
        { p: "React'ning tezligi ortida <strong>Virtual DOM</strong> texnologiyasi turadi. Uni tushunish uchun avval muammoni ko'raylik: haqiqiy DOM (brauzerdagi HTML elementlar daraxti) bilan ishlash <em>sekin</em>. Har safar DOM'ni o'zgartirganda, brauzer sahifani qayta hisoblab, qayta chizishi kerak bo'ladi." },
        { p: "React esa hiyla ishlatadi. U xotirada haqiqiy DOM'ning yengil nusxasini — <strong>Virtual DOM</strong>ni (oddiy JavaScript obyektlaridan iborat daraxt) saqlaydi. Jarayon shunday kechadi:" },
        { ol: [
          "Ma'lumot (holat) o'zgaradi;",
          "React <strong>yangi</strong> Virtual DOM daraxtini tuzadi;",
          "Uni <strong>eski</strong> Virtual DOM bilan solishtiradi — bu jarayon <em>reconciliation</em> (moslashtirish) deb ataladi;",
          "Faqat <strong>o'zgargan qismlarni</strong> aniqlaydi;",
          "Haqiqiy DOM'da faqat shu farqlarnigina yangilaydi — boshqa hech narsaga tegmaydi."
        ] },
        { p: "Natijada, siz butun ekranni qayta chizganingizda ham, React aslida haqiqiy DOM'ning faqat kerakli bo'lagini yangilaydi. Bu esa ilovani tez va samarali qiladi." },
        { note: "Siz Virtual DOM bilan to'g'ridan-to'g'ri ishlamaysiz — u \"kaputning ostida\" ishlaydi. Lekin nima uchun React tez ekanini bilish foydali." },

        { h2: "SPA — bir sahifali ilova" },
        { p: "React ko'pincha <strong>SPA</strong> (Single Page Application — bir sahifali ilova) qurish uchun ishlatiladi. Bu tushunchani an'anaviy saytlar bilan solishtiramiz:" },
        { ul: [
          "<strong>An'anaviy sayt.</strong> Siz havolani bosganingizda brauzer serverdan <em>butun yangi HTML sahifani</em> so'raydi. Sahifa oynasi \"miltillab\" qayta yuklanadi;",
          "<strong>SPA.</strong> Server bir marta bitta HTML sahifa yuboradi. So'ngra barcha o'zgarishlar (sahifadan sahifaga o'tish, ma'lumot yangilash) JavaScript orqali <em>sahifani qayta yuklamasdan</em> amalga oshadi. Foydalanuvchi uchun bu — tez va silliq, xuddi mobil ilovadagi kabi tajriba."
        ] },
        { p: "React'ning deklarativ va komponentga asoslangan tabiati aynan SPA qurish uchun juda qulay. Shu sababli u web-ilovalar (Gmail, Facebook, Trello va shu kabilar) yaratishda keng qo'llaniladi." },

        { h2: "Nega React shunchalik mashhur?" },
        { p: "React frontend dunyosining eng mashhur vositasi bo'lib qolishining bir necha sabablari bor:" },
        { ul: [
          "<strong>Katta hamjamiyat.</strong> Millionlab dasturchilar undan foydalanadi — muammoga yechim topish oson, tayyor kutubxonalar ko'p;",
          "<strong>Ish o'rinlari.</strong> Bozorda React biladigan dasturchilarga talab juda yuqori;",
          "<strong>Boy ekotizim.</strong> Marshrutlash (React Router), holat boshqaruvi (Redux, Zustand), UI kutubxonalari — hammasi tayyor;",
          "<strong>O'rganish materiali ko'p.</strong> Hujjatlar, videolar, kurslar — behisob;",
          "<strong>Meta qo'llab-quvvatlaydi.</strong> Kutubxona doimiy rivojlanadi va yaxshilanadi."
        ] },

        { h2: "React'ni o'rnatish (Vite bilan)" },
        { p: "React ilovasini noldan qo'lda sozlash murakkab. Shuning uchun tayyor asboblardan foydalanamiz. Bugungi kunda eng tez va zamonaviy vosita — <strong>Vite</strong> (\"vit\" deb o'qiladi). U yordamida yangi React loyihasini bir necha soniyada yaratish mumkin." },
        { p: "Loyihani yaratish uchun terminalda quyidagi buyruqni yozamiz (Node.js o'rnatilgan bo'lishi kerak):" },
        { code: "npm create vite@latest my-app" },
        { p: "Vite sizga bir necha savol beradi: qaysi freymvork (React'ni tanlaymiz) va qaysi variant (JavaScript yoki TypeScript). Tanlab bo'lgach, loyiha papkasiga kirib, bog'liqliklarni (dependencies) o'rnatamiz:" },
        { code: "cd my-app\nnpm install\nnpm run dev" },
        { p: "So'nggi buyruq mahalliy serverni ishga tushiradi (odatda <code>http://localhost:5173</code> manzilida). Brauzerda ushbu manzilni ochsangiz, React ilovangiz ishlayotganini ko'rasiz." },
        { tip: "Ilgari <code>create-react-app</code> vositasi mashhur edi, lekin u sekin va eskirgan hisoblanadi. Yangi loyihalarda <strong>Vite</strong> ishlatish tavsiya etiladi — u ancha tez." },
        { note: "Vite ishlab chiqish jarayonida <strong>HMR</strong> (Hot Module Replacement) beradi: kodni o'zgartirib saqlaganingizda, brauzer avtomatik yangilanadi — sahifani qo'lda qayta yuklash shart emas." },

        { h2: "Xulosa" },
        { ul: [
          "<strong>React</strong> — foydalanuvchi interfeysini qurish uchun JavaScript <em>kutubxonasi</em>;",
          "U <strong>deklarativ</strong>: siz natija qanday ko'rinishini tasvirlaysiz, DOM'ni yangilashni React hal qiladi;",
          "Interfeys <strong>komponentlardan</strong> quriladi — mustaqil, qayta ishlatiladigan bo'laklar;",
          "<strong>Virtual DOM</strong> orqali React faqat o'zgargan qismlarni yangilaydi — bu tezlik beradi;",
          "React ko'pincha <strong>SPA</strong> (bir sahifali ilova) qurishda ishlatiladi;",
          "Yangi loyihani <strong>Vite</strong> bilan yaratamiz: <code>npm create vite@latest</code>."
        ] }
      ]
    },

    {
      slug: "react-jsx",
      title: "JSX va komponentlar",
      blurb: "JSX sintaksisi, funksional komponent yozish, komponentni createRoot bilan render qilish, bir root element qoidasi, className va {ifoda} joylashtirish.",
      body: [
        { lead: "React'da interfeysni tasvirlash uchun maxsus sintaksis — <strong>JSX</strong> ishlatiladi. Bu birinchi qarashda HTML ichida JavaScript kabi ko'rinadi, lekin aslida bu — JavaScript'ning kengaytmasi. Ushbu darsda JSX qanday ishlashini, komponentlarni qanday yozish va ekranga chiqarishni o'rganamiz." },

        { h2: "JSX nima?" },
        { p: "<strong>JSX</strong> (JavaScript XML) — bu JavaScript kodining ichida HTML'ga o'xshash markup yozish imkonini beruvchi sintaksis. Masalan, quyidagi qator — bu JSX:" },
        { code: "const element = <h1>Salom, dunyo!</h1>;" },
        { p: "E'tibor bering: bu na string (tirnoqsiz), na oddiy HTML. Bu — JSX. Brauzer JSX'ni to'g'ridan-to'g'ri tushunmaydi. Vite ichidagi <em>build</em> vositasi (Babel) JSX'ni oddiy JavaScript funksiya chaqiruvlariga aylantiradi. Yuqoridagi kod aslida shunga o'giriladi:" },
        { code: "const element = React.createElement(\"h1\", null, \"Salom, dunyo!\");" },
        { p: "Ya'ni JSX — bu shunchaki <code>React.createElement</code> uchun qulay, o'qilishi oson yozuv usuli. Uni ishlatish majburiy emas, lekin deyarli barcha React kodi JSX bilan yoziladi, chunki u ancha qulay." },
        { note: "JSX — string emas! Uni tirnoq ichiga olmang. <code>&lt;h1&gt;Salom&lt;/h1&gt;</code> to'g'ri, <code>\"&lt;h1&gt;Salom&lt;/h1&gt;\"</code> esa oddiy matn (string) bo'lib qoladi." },

        { h2: "Funksional komponent" },
        { p: "React'da <strong>komponent</strong> — bu JSX qaytaruvchi oddiy JavaScript funksiyasi. Bunday komponentlar <strong>funksional komponentlar</strong> deb ataladi. Ular quyidagi ikki qoidaga bo'ysunadi:" },
        { ul: [
          "Komponent nomi <strong>katta harf</strong> bilan boshlanishi kerak (masalan, <code>Salom</code>, <code>ProfileCard</code>). Bu React'ga uni oddiy HTML teg emas, komponent ekanini bildiradi;",
          "Funksiya <strong>JSX qaytarishi</strong> kerak (yoki <code>null</code>)."
        ] },
        { p: "Mana eng oddiy komponent:" },
        { code: "function Salom() {\n  return <h1>Salom, React!</h1>;\n}" },
        { p: "Ochilgan strelka funksiya (arrow function) shaklida ham yozish mumkin — natija bir xil:" },
        { code: "const Salom = () => {\n  return <h1>Salom, React!</h1>;\n};" },
        { p: "Endi bu komponentni boshqa JSX ichida xuddi HTML teg kabi ishlatish mumkin. Diqqat: komponent teglari o'zini yopishi (<code>/&gt;</code> bilan) mumkin:" },
        { code: "function App() {\n  return (\n    <div>\n      <Salom />\n      <Salom />\n      <Salom />\n    </div>\n  );\n}" },
        { tip: "Komponentni bir marta yozib, uni istagancha ko'p marta ishlatish mumkin. Bu — komponentlarning asosiy kuchi: qayta ishlatiluvchanlik." },

        { h2: "Komponentni ekranga render qilish" },
        { p: "Komponentni yozdik — endi uni ekranga chiqarish kerak. Buning uchun React'ning <code>react-dom/client</code> qismidan <strong>createRoot</strong> funksiyasidan foydalanamiz. Avvalo HTML faylida bitta \"ildiz\" element bo'lishi kerak (Vite loyihasida u tayyor keladi):" },
        { code: "<!-- index.html -->\n<div id=\"root\"></div>" },
        { p: "Endi asosiy JavaScript faylida (Vite'da <code>src/main.jsx</code>) shu <code>root</code> elementiga komponentni ulaymiz:" },
        { code: "import { createRoot } from \"react-dom/client\";\nimport App from \"./App.jsx\";\n\nconst root = createRoot(document.getElementById(\"root\"));\nroot.render(<App />);" },
        { p: "Bu kod nima qiladi? <code>createRoot</code> — bizning React ilovamiz uchun \"ildiz\" tayinlaydi. <code>root.render(&lt;App /&gt;)</code> esa <code>App</code> komponentini shu ildiz ichida chizadi. Shu tariqa butun ilova <code>#root</code> divi ichida yashaydi." },
        { note: "Eski React (17 va undan oldingi) versiyalarida <code>ReactDOM.render()</code> ishlatilardi. React 18'dan boshlab <code>createRoot</code> standart usul hisoblanadi." },

        { h2: "Bitta ildiz element qoidasi" },
        { p: "JSX'ning muhim qoidasi: komponent <strong>faqat bitta ildiz elementni</strong> qaytarishi kerak. Quyidagi kod <em>xato</em> beradi, chunki ikkita element yonma-yon turibdi:" },
        { code: "// XATO!\nfunction Profile() {\n  return (\n    <h1>Ism</h1>\n    <p>Tavsif</p>\n  );\n}" },
        { p: "Buni tuzatish uchun elementlarni bitta o'rovchi ichiga olamiz — masalan, <code>&lt;div&gt;</code>:" },
        { code: "function Profile() {\n  return (\n    <div>\n      <h1>Ism</h1>\n      <p>Tavsif</p>\n    </div>\n  );\n}" },
        { p: "Lekin ba'zan ortiqcha <code>&lt;div&gt;</code> qo'shishni istamaymiz. Bunday holda <strong>Fragment</strong>dan foydalanamiz — bo'sh teg <code>&lt;&gt;...&lt;/&gt;</code>. U DOM'ga hech qanday qo'shimcha element qo'shmaydi:" },
        { code: "function Profile() {\n  return (\n    <>\n      <h1>Ism</h1>\n      <p>Tavsif</p>\n    </>\n  );\n}" },
        { tip: "JSX'ni bir necha qatorga yozganingizda, uni <code>return ( ... )</code> qavslari ichiga oling. Bu JavaScript'ning avtomatik nuqta-vergul qo'yishi (ASI) sabab yuzaga keladigan xatolardan saqlaydi." },

        { h2: "className va HTML atributlaridagi farqlar" },
        { p: "JSX HTML'ga o'xshasa-da, aslida u JavaScript. Shuning uchun ba'zi HTML atributlari boshqacha yoziladi. Eng muhim farqlar:" },
        { ul: [
          "HTML'dagi <code>class</code> o'rniga JSX'da <strong><code>className</code></strong> ishlatiladi. Sababi: <code>class</code> — JavaScript'da zahiralangan (reserved) so'z;",
          "HTML'dagi <code>for</code> (label uchun) o'rniga <strong><code>htmlFor</code></strong> yoziladi;",
          "Atributlar <strong>camelCase</strong> uslubida yoziladi: <code>onclick</code> emas <code>onClick</code>, <code>tabindex</code> emas <code>tabIndex</code>."
        ] },
        { code: "// HTML: <div class=\"card\">\n// JSX:\nfunction Card() {\n  return <div className=\"card\">Kontent</div>;\n}" },
        { note: "Agar <code>class</code> deb yozib qo'ysangiz, React ogohlantirish beradi, lekin ilova baribir ishlashi mumkin. Odat sifatida darrov <code>className</code> yozishga o'rganing." },

        { h2: "JSX ichida JavaScript ifodalari — {}" },
        { p: "JSX'ning eng kuchli tomoni — uning ichiga JavaScript qiymatlarini joylashtirish mumkinligi. Buning uchun <strong>jingalak qavslar</strong> <code>{ }</code> ishlatiladi. Qavs ichiga istalgan JavaScript <em>ifodasini</em> (expression) yozish mumkin:" },
        { code: "function Salom() {\n  const ism = \"Ali\";\n  return <h1>Salom, {ism}!</h1>;\n}\n// Natija: Salom, Ali!" },
        { p: "Qavs ichida nafaqat o'zgaruvchi, balki har qanday ifoda bo'lishi mumkin — matematik amal, funksiya chaqiruvi, xossaga murojaat:" },
        { code: "function Hisob() {\n  const a = 5;\n  const b = 3;\n  return (\n    <div>\n      <p>Yig'indi: {a + b}</p>\n      <p>Sana: {new Date().getFullYear()}</p>\n      <p>Katta harf: {\"salom\".toUpperCase()}</p>\n    </div>\n  );\n}" },
        { p: "Atributlarga ham qiymat berish uchun <code>{ }</code> ishlatiladi (tirnoq o'rniga):" },
        { code: "function Rasm() {\n  const url = \"logo.png\";\n  return <img src={url} alt=\"Logo\" />;\n}" },
        { warn: "Qavs ichiga faqat <strong>ifoda</strong> (expression — qiymat qaytaradigan narsa) yozish mumkin. <code>if</code>, <code>for</code> kabi <em>buyruqlar</em> (statements) to'g'ridan-to'g'ri ishlamaydi. Shart uchun ternar operator (<code>? :</code>) ishlatiladi (bu haqda oxirgi darsda gaplashamiz)." },

        { h2: "Xulosa" },
        { ul: [
          "<strong>JSX</strong> — JavaScript ichida HTML'ga o'xshash markup yozish sintaksisi; u <code>React.createElement</code> chaqiruvlariga aylanadi;",
          "<strong>Komponent</strong> — JSX qaytaruvchi funksiya; nomi <strong>katta harf</strong> bilan boshlanadi;",
          "Komponentni ekranga <code>createRoot(...).render(&lt;App /&gt;)</code> orqali chiqaramiz;",
          "Komponent <strong>bitta ildiz element</strong> qaytarishi kerak — <code>&lt;div&gt;</code> yoki <strong>Fragment</strong> (<code>&lt;&gt;&lt;/&gt;</code>) bilan o'raymiz;",
          "HTML'dagi <code>class</code> o'rniga <strong><code>className</code></strong>, atributlar <strong>camelCase</strong>da;",
          "JSX ichiga JavaScript ifodalarini <code>{ }</code> qavslar orqali joylashtiramiz."
        ] }
      ]
    },

    {
      slug: "react-props",
      title: "Props",
      blurb: "Komponentga ma'lumot uzatish, props obyekti, destructuring, children propi va propslarning faqat o'qish uchun (immutable) ekanligi.",
      body: [
        { lead: "Bir xil komponentni turli ma'lumotlar bilan ko'rsatishni istaymiz. Masalan, bitta <code>Card</code> komponenti turli ismlar bilan chiqishi kerak. Buning uchun React'da <strong>props</strong> (properties — xossalar) mexanizmi mavjud. Ushbu darsda komponentga tashqaridan ma'lumot uzatishni o'rganamiz." },

        { h2: "Props nima?" },
        { p: "<strong>Props</strong> — bu ota (parent) komponentdan bola (child) komponentga uzatiladigan ma'lumot. Ularni oddiy JavaScript funksiyasining <em>argumentlari</em> deb tasavvur qiling: siz komponentga qandaydir qiymat berasiz, u shu qiymatga qarab turlicha ko'rinadi." },
        { p: "Props'ni JSX'da xuddi HTML atributlari kabi yozamiz. Masalan, <code>Salom</code> komponentiga <code>ism</code> nomli prop uzatamiz:" },
        { code: "<Salom ism=\"Ali\" />\n<Salom ism=\"Vali\" />" },
        { p: "Komponent ichida bu props'lar bitta obyekt sifatida keladi. Odat bo'yicha bu parametr <code>props</code> deb ataladi:" },
        { code: "function Salom(props) {\n  return <h1>Salom, {props.ism}!</h1>;\n}\n// <Salom ism=\"Ali\" /> => Salom, Ali!\n// <Salom ism=\"Vali\" /> => Salom, Vali!" },
        { p: "Ya'ni <code>ism=\"Ali\"</code> yozganda, komponent ichida <code>props.ism</code> qiymati <code>\"Ali\"</code> bo'ladi. Shu tariqa bitta komponent turli ma'lumotlar bilan ishlaydi." },

        { h2: "Turli xil qiymatlarni uzatish" },
        { p: "Props sifatida faqat matn emas, har qanday JavaScript qiymatini uzatish mumkin: son, mantiqiy qiymat, massiv, obyekt, hatto funksiya. Matn bo'lmagan qiymatlarni <code>{ }</code> qavslar ichida beramiz:" },
        { code: "<Profile\n  ism=\"Ali\"\n  yosh={25}\n  faol={true}\n  qiziqishlar={[\"kod\", \"kitob\"]}\n/>" },
        { p: "Komponent ichida esa ularni odatdagidek o'qiymiz:" },
        { code: "function Profile(props) {\n  return (\n    <div>\n      <h2>{props.ism}, {props.yosh} yosh</h2>\n      <p>Holati: {props.faol ? \"faol\" : \"nofaol\"}</p>\n      <p>Qiziqishlar soni: {props.qiziqishlar.length}</p>\n    </div>\n  );\n}" },
        { note: "Diqqat: matn qiymatni tirnoq bilan (<code>ism=\"Ali\"</code>), boshqa har qanday qiymatni qavs bilan (<code>yosh={25}</code>) beramiz. <code>yosh=\"25\"</code> yozsangiz, bu son emas, matn bo'ladi!" },

        { h2: "Props'ni destructuring qilish" },
        { p: "Har safar <code>props.ism</code>, <code>props.yosh</code> deb yozish uzun bo'ladi. JavaScript'dan tanish <strong>destructuring</strong> yordamida buni qulaylashtiramiz. Odatda destructuring'ni to'g'ridan-to'g'ri funksiya parametrida bajaramiz:" },
        { code: "function Profile({ ism, yosh, faol }) {\n  return (\n    <div>\n      <h2>{ism}, {yosh} yosh</h2>\n      <p>{faol ? \"faol\" : \"nofaol\"}</p>\n    </div>\n  );\n}" },
        { p: "Bu — avvalgi kod bilan bir xil ishlaydi, faqat ancha toza va o'qilishi oson. Ko'pchilik React kodi aynan shu uslubda yoziladi." },
        { p: "Destructuring'da <strong>standart qiymat</strong> (default value) ham berish mumkin — agar prop uzatilmasa, shu qiymat ishlatiladi:" },
        { code: "function Tugma({ matn = \"Bosing\", turi = \"oddiy\" }) {\n  return <button className={turi}>{matn}</button>;\n}\n// <Tugma /> => matn: \"Bosing\", turi: \"oddiy\"\n// <Tugma matn=\"Saqlash\" /> => matn: \"Saqlash\"" },
        { tip: "Destructuring va standart qiymatlar — bu sof JavaScript imkoniyatlari. React ularni maxsus qilib chiqmaydi, shunchaki funksiya parametrlaridan foydalanadi." },

        { h2: "children propi" },
        { p: "Ba'zan komponentga oddiy atribut emas, balki uning teglari <em>orasidagi kontentni</em> uzatishni istaymiz — xuddi HTML'da <code>&lt;div&gt;...&lt;/div&gt;</code> ichiga narsa qo'ygan kabi. React buni maxsus <strong><code>children</code></strong> propi orqali beradi." },
        { p: "Masalan, <code>Card</code> komponenti — bu ramka, uning ichiga istalgan kontent joylashtirmoqchimiz:" },
        { code: "function Card({ children }) {\n  return <div className=\"card\">{children}</div>;\n}" },
        { p: "Endi uni ochilib-yopiladigan teg sifatida ishlatamiz. Teglar orasidagi hamma narsa <code>children</code> bo'lib keladi:" },
        { code: "function App() {\n  return (\n    <Card>\n      <h2>Sarlavha</h2>\n      <p>Bu — karta ichidagi matn.</p>\n    </Card>\n  );\n}" },
        { p: "Natijada <code>Card</code> ichidagi <code>{children}</code> o'rniga <code>&lt;h2&gt;</code> va <code>&lt;p&gt;</code> chiqadi. Bu — o'rovchi (wrapper) komponentlar yaratishning asosiy usuli: modal oynalar, panellar, ramkalar shu tariqa quriladi." },
        { note: "<code>children</code> — bu React tomonidan avtomatik beriladigan maxsus prop. Siz uni qo'lda yozmaysiz — u teglar orasidagi kontentdan to'ldiriladi." },

        { h2: "Props faqat o'qish uchun (immutable)" },
        { p: "Bu — React'ning eng muhim qoidalaridan biri: <strong>komponent o'z props'larini o'zgartira olmaydi</strong>. Props — faqat o'qish uchun (read-only, immutable). Quyidagi kod <em>qat'iyan man etiladi</em>:" },
        { code: "function Profile({ ism }) {\n  ism = \"Boshqa ism\"; // MUMKIN EMAS! Props'ni o'zgartirmang\n  return <h1>{ism}</h1>;\n}" },
        { p: "Nima uchun bunday qoida bor? React'da ma'lumot oqimi <strong>bir yo'nalishli</strong> (one-way data flow): ma'lumot yuqoridan (ota komponentdan) pastga (bola komponentga) oqadi. Agar bola o'z props'ini o'zgartira olsa, ma'lumot manbasi tushunarsiz bo'lib qolar va xatolarni topish qiyinlashardi." },
        { p: "React hujjatlarida buni shunday ifodalaydi: <em>\"Barcha React komponentlari o'z props'lariga nisbatan sof funksiya (pure function) kabi ishlashi kerak.\"</em> Ya'ni bir xil props uchun har doim bir xil natija qaytarishi lozim." },
        { warn: "Agar komponent ichida vaqt o'tishi bilan <em>o'zgaradigan</em> ma'lumot kerak bo'lsa (masalan, tugma bosilganda hisoblagich oshsa), props emas — <strong>state</strong> (holat) ishlatiladi. Bu keyingi darsimiz mavzusi." },

        { h2: "Xulosa" },
        { ul: [
          "<strong>Props</strong> — ota komponentdan bola komponentga uzatiladigan ma'lumot; funksiyaning argumentlariga o'xshaydi;",
          "Props JSX'da HTML atributlari kabi yoziladi: matn tirnoqda, boshqa qiymatlar <code>{ }</code> qavsda;",
          "Komponent ichida props'ni <strong>destructuring</strong> orqali qulay o'qiymiz: <code>function C({ ism })</code>;",
          "Standart qiymat berish mumkin: <code>{ matn = \"Bosing\" }</code>;",
          "<strong><code>children</code></strong> — teglar orasidagi kontentni uzatuvchi maxsus prop; o'rovchi komponentlar uchun ishlatiladi;",
          "Props <strong>o'zgarmas</strong> (immutable, faqat o'qish uchun) — ma'lumot bir yo'nalishli, yuqoridan pastga oqadi."
        ] }
      ]
    },

    {
      slug: "react-state",
      title: "State va useState",
      blurb: "Holat (state) tushunchasi, useState hook, holatni yangilash, onClick bilan hodisalarni qayta ishlash, re-render va hisoblagich misoli.",
      body: [
        { lead: "Props — o'zgarmas ma'lumot edi. Lekin real ilovalarda ma'lumot doimo o'zgaradi: foydalanuvchi tugmani bosadi, formaga yozadi, ro'yxatga element qo'shadi. Vaqt o'tishi bilan o'zgaradigan ma'lumotni React'da <strong>state</strong> (holat) boshqaradi. Ushbu dars — React'ning yuragi." },

        { h2: "State (holat) nima?" },
        { p: "<strong>State</strong> — bu komponentning \"xotirasi\". Bu — vaqt o'tishi bilan o'zgaradigan va shu o'zgarish ekranda aks etishi kerak bo'lgan ma'lumot. Masalan:" },
        { ul: [
          "Hisoblagichning joriy qiymati;",
          "Formadagi matn maydoniga foydalanuvchi yozgan matn;",
          "Modal oyna ochiqmi yoki yopiqmi;",
          "Serverdan yuklangan foydalanuvchilar ro'yxati."
        ] },
        { p: "Muhim savol: nega oddiy o'zgaruvchi ishlatmaymiz? Chunki oddiy o'zgaruvchini o'zgartirsak, React bundan <em>xabar topmaydi</em> va ekranni yangilamaydi. Quyidagi kod <strong>ishlamaydi</strong>:" },
        { code: "function Hisoblagich() {\n  let count = 0; // oddiy o'zgaruvchi\n\n  function bosildi() {\n    count = count + 1;\n    console.log(count); // konsolda oshadi...\n    // ...lekin ekranda O'ZGARMAYDI!\n  }\n\n  return <button onClick={bosildi}>{count}</button>;\n}" },
        { p: "Bu yerda <code>count</code> konsolda oshsa-da, ekran yangilanmaydi. Sababi: React ekranni faqat <em>maxsus signal</em> olganda qayta chizadi. Ana shu signalni <strong>state</strong> beradi." },

        { h2: "useState hook" },
        { p: "State bilan ishlash uchun React <strong><code>useState</code></strong> nomli <em>hook</em>dan foydalanadi. Hook — bu <code>use</code> so'zi bilan boshlanadigan maxsus funksiya bo'lib, komponentga React imkoniyatlarini \"ulaydi\". Avval uni import qilamiz:" },
        { code: "import { useState } from \"react\";" },
        { p: "<code>useState</code> boshlang'ich qiymatni argument sifatida oladi va <strong>ikki elementli massiv</strong> qaytaradi: joriy qiymat va uni o'zgartiruvchi funksiya. Bu massivni destructuring bilan olamiz:" },
        { code: "const [count, setCount] = useState(0);" },
        { p: "Bu qatorni tahlil qilamiz:" },
        { ul: [
          "<code>count</code> — holatning <strong>joriy qiymati</strong> (boshida <code>0</code>);",
          "<code>setCount</code> — holatni <strong>yangilovchi funksiya</strong> (odat bo'yicha <code>set</code> + holat nomi);",
          "<code>useState(0)</code> — <code>0</code> — bu <strong>boshlang'ich qiymat</strong>."
        ] },
        { note: "<strong>Hook qoidasi:</strong> hook'lar (masalan <code>useState</code>) faqat komponentning eng yuqori darajasida chaqirilishi kerak. Ularni <code>if</code>, <code>for</code> yoki oddiy funksiyalar ichida chaqirmang." },

        { h2: "Holatni yangilash va re-render" },
        { p: "Holatni to'g'ridan-to'g'ri o'zgartirmaymiz. Uning o'rniga <strong>yangilovchi funksiyani</strong> (<code>setCount</code>) chaqiramiz. Bu funksiya ikki ish qiladi:" },
        { ol: [
          "Holatning yangi qiymatini saqlaydi;",
          "Komponentni <strong>qayta render qiladi</strong> (re-render) — ya'ni komponent funksiyasi qaytadan ishga tushib, ekran yangilanadi."
        ] },
        { p: "Mana to'g'ri ishlaydigan hisoblagich:" },
        { code: "import { useState } from \"react\";\n\nfunction Hisoblagich() {\n  const [count, setCount] = useState(0);\n\n  function bosildi() {\n    setCount(count + 1); // holatni yangilaymiz\n  }\n\n  return <button onClick={bosildi}>Bosildi: {count}</button>;\n}" },
        { p: "Endi tugma bosilganda: <code>setCount</code> yangi qiymatni saqlaydi va React komponentni qaytadan chizadi. Yangi <code>count</code> qiymati ekranda ko'rinadi. Aynan shu — React'ning deklarativ ishlash mexanizmi." },
        { warn: "Holatni <strong>hech qachon to'g'ridan-to'g'ri</strong> o'zgartirmang: <code>count = count + 1</code> yoki <code>count++</code> ishlamaydi va xato hisoblanadi. Har doim <code>setCount(...)</code> orqali yangilang." },

        { h2: "Hodisalarni qayta ishlash (event handling)" },
        { p: "React'da hodisalar (events) JSX atributlari orqali biriktiriladi. Ular <strong>camelCase</strong>da yoziladi va qiymat sifatida <em>funksiyani</em> qabul qiladi:" },
        { ul: [
          "<code>onClick</code> — bosilganda;",
          "<code>onChange</code> — qiymat o'zgarganda (input uchun);",
          "<code>onSubmit</code> — forma yuborilganda;",
          "<code>onMouseEnter</code>, <code>onKeyDown</code> va boshqalar."
        ] },
        { p: "Muhim nozik jihat: funksiyani <strong>chaqirmasdan</strong> uzatamiz — nomini <code>{ }</code> ichida beramiz:" },
        { code: "// TO'G'RI — funksiyaning o'zini beramiz\n<button onClick={bosildi}>Bosing</button>\n\n// XATO — funksiyani darrov chaqirib yuboramiz\n<button onClick={bosildi()}>Bosing</button>" },
        { p: "Ikkinchi holatda <code>bosildi()</code> render paytida <em>darhol</em> chaqiriladi — bu noto'g'ri. Agar funksiyaga argument uzatish kerak bo'lsa, uni ochilgan strelka funksiya ichiga o'raymiz:" },
        { code: "<button onClick={() => setCount(count + 1)}>+1</button>\n<button onClick={() => setCount(0)}>Tozalash</button>" },
        { tip: "Hodisa funksiyasi hodisa obyektini (event) qabul qiladi: <code>onClick={(e) => console.log(e)}</code>. Undan, masalan, input qiymatini olishda foydalanamiz (keyingi darsda ko'ramiz)." },

        { h2: "To'liq hisoblagich misoli" },
        { p: "Endi bir necha tugmali to'liq hisoblagichni yig'amiz — oshirish, kamaytirish va tozalash:" },
        { code: "import { useState } from \"react\";\n\nfunction Hisoblagich() {\n  const [count, setCount] = useState(0);\n\n  return (\n    <div>\n      <h2>Qiymat: {count}</h2>\n      <button onClick={() => setCount(count + 1)}>+1</button>\n      <button onClick={() => setCount(count - 1)}>-1</button>\n      <button onClick={() => setCount(0)}>Tozalash</button>\n    </div>\n  );\n}\n\nexport default Hisoblagich;" },
        { p: "Bu komponent to'liq ishlaydi: har bir tugma <code>setCount</code>ni chaqiradi, React qayta render qiladi va yangi qiymat <code>&lt;h2&gt;</code>da ko'rinadi." },

        { h2: "Oldingi holatga asoslanib yangilash" },
        { p: "Agar yangi qiymat <em>eski qiymatga bog'liq</em> bo'lsa (masalan, oshirish), <code>setCount</code>ga qiymat o'rniga <strong>funksiya</strong> berish xavfsizroq. React bu funksiyaga eng so'nggi holatni uzatadi:" },
        { code: "// Yaxshiroq usul:\nsetCount(prev => prev + 1);\n\n// Bir necha marta chaqirsangiz farqi bilinadi:\nfunction ucchiOshir() {\n  setCount(prev => prev + 1);\n  setCount(prev => prev + 1);\n  setCount(prev => prev + 1);\n  // count 3 ga oshadi (to'g'ri)\n}" },
        { p: "Agar <code>setCount(count + 1)</code> ni uch marta yozsangiz, natija kutilganidek bo'lmaydi — chunki <code>count</code> bitta render davomida o'zgarmaydi. Funksiya shaklida (<code>prev =&gt; prev + 1</code>) esa har safar eng so'nggi qiymat olinadi." },
        { note: "Eslatma: <code>setCount</code> holatni <em>darhol</em> o'zgartirmaydi. React yangilanishlarni to'plab, so'ng bir marta qayta render qiladi (batching). Shuning uchun yangilashdan keyin darrov <code>count</code>ni o'qisangiz, eski qiymatni ko'rasiz." },

        { h2: "Xulosa" },
        { ul: [
          "<strong>State</strong> — komponentning vaqt o'tishi bilan o'zgaradigan xotirasi; oddiy o'zgaruvchi bu vazifani bajara olmaydi;",
          "<strong><code>useState</code></strong> hook joriy qiymat va yangilovchi funksiyani qaytaradi: <code>const [x, setX] = useState(boshlang'ich)</code>;",
          "Holatni faqat <strong>set-funksiya</strong> orqali yangilaymiz — to'g'ridan-to'g'ri o'zgartirmaymiz;",
          "Holat o'zgarganda React komponentni <strong>qayta render qiladi</strong> va ekran yangilanadi;",
          "Hodisalar <strong>camelCase</strong>da (<code>onClick</code>) yoziladi va funksiya qabul qiladi — uni chaqirmang, uzating;",
          "Eski holatga bog'liq yangilashda funksiya shaklidan foydalaning: <code>setX(prev =&gt; prev + 1)</code>."
        ] }
      ]
    },

    {
      slug: "react-effect",
      title: "useEffect va yon effektlar",
      blurb: "useEffect hook, dependency array, fetch bilan ma'lumot yuklash, cleanup funksiya va effekt qachon ishga tushishi.",
      body: [
        { lead: "Ba'zan komponent shunchaki ekranga chizishdan tashqari ish bajarishi kerak: serverdan ma'lumot yuklash, timer o'rnatish, hujjat sarlavhasini o'zgartirish. Bunday amallar <strong>yon effektlar</strong> (side effects) deb ataladi. Ular uchun React'da <strong><code>useEffect</code></strong> hook mavjud." },

        { h2: "Yon effekt (side effect) nima?" },
        { p: "React komponentining asosiy vazifasi — props va state asosida JSX qaytarish (ya'ni ekranni chizish). Bu — \"sof\" hisoblash. Lekin ba'zan komponent <em>tashqi dunyo</em> bilan aloqa qilishi kerak. Ana shunday amallar <strong>yon effekt</strong> deyiladi:" },
        { ul: [
          "Server (API) dan ma'lumot yuklash (<code>fetch</code>);",
          "Timer yoki interval o'rnatish (<code>setInterval</code>);",
          "Hujjat sarlavhasini (<code>document.title</code>) o'zgartirish;",
          "Brauzer hodisalariga obuna bo'lish (<code>addEventListener</code>);",
          "<code>localStorage</code> bilan ishlash."
        ] },
        { p: "Bunday amallarni to'g'ridan-to'g'ri komponent tanasiga yozib bo'lmaydi — chunki komponent har render'da qayta ishga tushadi, natijada effekt behuda ko'p marta bajarilib qolardi. Buning uchun <code>useEffect</code> ishlatiladi." },

        { h2: "useEffect asoslari" },
        { p: "<code>useEffect</code> ni ham React'dan import qilamiz. U ikki argument oladi: <strong>funksiya</strong> (effekt) va <strong>dependency array</strong> (bog'liqliklar massivi):" },
        { code: "import { useEffect } from \"react\";\n\nuseEffect(() => {\n  // yon effekt kodi shu yerda\n}, []);" },
        { p: "Effekt funksiyasi komponent ekranga chizilgandan <em>keyin</em> ishga tushadi. Sodda misol — hujjat sarlavhasini hisoblagich qiymatiga qarab yangilash:" },
        { code: "import { useState, useEffect } from \"react\";\n\nfunction Sarlavha() {\n  const [count, setCount] = useState(0);\n\n  useEffect(() => {\n    document.title = \"Bosildi: \" + count;\n  }, [count]);\n\n  return <button onClick={() => setCount(count + 1)}>+1</button>;\n}" },
        { p: "Bu yerda har safar <code>count</code> o'zgarganda, effekt ishga tushib, brauzer tabidagi sarlavhani yangilaydi." },

        { h2: "Dependency array — bog'liqliklar massivi" },
        { p: "Ikkinchi argument — <strong>dependency array</strong> — effekt <em>qachon</em> qayta ishga tushishini boshqaradi. Uchta asosiy holat bor:" },
        { code: "// 1) Har render'dan keyin ishga tushadi (massiv YO'Q)\nuseEffect(() => {\n  console.log(\"har safar\");\n});\n\n// 2) Faqat BIR MARTA — komponent birinchi paydo bo'lganda\nuseEffect(() => {\n  console.log(\"faqat bir marta\");\n}, []);\n\n// 3) Faqat count o'zgarganda ishga tushadi\nuseEffect(() => {\n  console.log(\"count o'zgardi\");\n}, [count]);" },
        { p: "Buni jadval sifatida esda tuting:" },
        { ul: [
          "<strong>Massiv umuman yo'q</strong> — effekt <em>har render'da</em> ishlaydi (kamdan-kam kerak bo'ladi);",
          "<strong>Bo'sh massiv <code>[]</code></strong> — effekt <em>faqat bir marta</em>, komponent birinchi ekranga chizilganda ishlaydi;",
          "<strong>Qiymatli massiv <code>[a, b]</code></strong> — effekt <em>shu qiymatlardan biri o'zgarganda</em> qayta ishlaydi."
        ] },
        { warn: "Effekt ichida ishlatilgan har qanday state yoki prop dependency massivida ko'rsatilishi kerak. Aks holda effekt eski qiymatlar bilan ishlab, chalkash xatolar yuzaga keladi. Bo'sh massiv <code>[]</code> berishdan oldin, effekt tashqi qiymatlarga bog'liq emasligiga ishonch hosil qiling." },

        { h2: "fetch bilan ma'lumot yuklash" },
        { p: "<code>useEffect</code>ning eng ko'p uchraydigan qo'llanilishi — komponent paydo bo'lganda serverdan ma'lumot yuklash. Buning uchun bo'sh massiv <code>[]</code> ishlatamiz (bir marta yuklansin) va natijani state'ga saqlaymiz:" },
        { code: "import { useState, useEffect } from \"react\";\n\nfunction Foydalanuvchilar() {\n  const [users, setUsers] = useState([]);\n\n  useEffect(() => {\n    fetch(\"https://jsonplaceholder.typicode.com/users\")\n      .then(res => res.json())\n      .then(data => setUsers(data));\n  }, []);\n\n  return (\n    <ul>\n      {users.map(u => <li key={u.id}>{u.name}</li>)}\n    </ul>\n  );\n}" },
        { p: "Jarayon shunday kechadi: komponent birinchi bor chiziladi (<code>users</code> bo'sh massiv), effekt ishga tushib <code>fetch</code> qiladi, ma'lumot kelgach <code>setUsers</code> state'ni yangilaydi, React qayta render qiladi va ro'yxat ekranda paydo bo'ladi." },
        { p: "Amalda ko'pincha yuklanish holati (loading) va xatolikni ham hisobga olamiz:" },
        { code: "function Foydalanuvchilar() {\n  const [users, setUsers] = useState([]);\n  const [loading, setLoading] = useState(true);\n\n  useEffect(() => {\n    fetch(\"https://jsonplaceholder.typicode.com/users\")\n      .then(res => res.json())\n      .then(data => {\n        setUsers(data);\n        setLoading(false);\n      });\n  }, []);\n\n  if (loading) return <p>Yuklanmoqda...</p>;\n\n  return <ul>{users.map(u => <li key={u.id}>{u.name}</li>)}</ul>;\n}" },
        { note: "Effekt funksiyasini <code>async</code> qilib bo'lmaydi. Buning o'rniga effekt ichida alohida async funksiya yozib, uni chaqirasiz, yoki yuqoridagidek <code>.then()</code> ishlatasiz." },

        { h2: "Cleanup funksiyasi — tozalash" },
        { p: "Ba'zi effektlar \"o'zidan keyin tozalash\"ni talab qiladi. Masalan, agar siz timer o'rnatgan yoki hodisaga obuna bo'lgan bo'lsangiz, komponent yo'qolganda ularni <em>bekor qilish</em> kerak — aks holda xotira sizib chiqadi (memory leak). Buning uchun effekt funksiyasidan <strong>tozalash funksiyasini qaytaramiz</strong>:" },
        { code: "useEffect(() => {\n  const id = setInterval(() => {\n    console.log(\"har soniyada\");\n  }, 1000);\n\n  // cleanup: komponent yo'qolganda interval to'xtatiladi\n  return () => {\n    clearInterval(id);\n  };\n}, []);" },
        { p: "Bu yerda qaytarilgan funksiya — <strong>cleanup</strong> (tozalash) funksiyasi. React uni ikki holatda chaqiradi:" },
        { ul: [
          "Komponent ekrandan yo'qolganda (unmount);",
          "Effekt qayta ishga tushishidan <em>oldin</em> (agar dependency o'zgargan bo'lsa) — avvalgi effekt tozalanib, keyin yangisi ishlaydi."
        ] },
        { p: "Timer bilan real misol — soniyalarni sanovchi:" },
        { code: "function Soat() {\n  const [soniya, setSoniya] = useState(0);\n\n  useEffect(() => {\n    const id = setInterval(() => {\n      setSoniya(prev => prev + 1);\n    }, 1000);\n    return () => clearInterval(id);\n  }, []);\n\n  return <p>O'tgan vaqt: {soniya} soniya</p>;\n}" },
        { tip: "Agar cleanup'ni unutsangiz, har render'da yangi interval ochilib, eskisi to'xtamay qoladi — natijada bir necha timer parallel ishlab ketadi. Doim tozalashni yodda tuting." },

        { h2: "Effekt qachon va qanday tartibda ishlaydi" },
        { p: "Effektlarning ish tartibini yaxlit ko'rib chiqamiz. Komponent hayoti davomida:" },
        { ol: [
          "Komponent birinchi bor chiziladi (mount) → effekt ishga tushadi;",
          "Dependency o'zgaradi → avval eski effekt <strong>cleanup</strong>i chaqiriladi → so'ng yangi effekt ishlaydi;",
          "Komponent yo'qoladi (unmount) → oxirgi <strong>cleanup</strong> chaqiriladi."
        ] },
        { p: "Muhim: effekt har doim ekran <em>chizilgandan keyin</em> ishlaydi. Ya'ni foydalanuvchi avval interfeysni ko'radi, so'ng effekt (masalan, ma'lumot yuklash) ishga tushadi. Bu interfeysni bloklamaslik uchun shunday qilingan." },

        { h2: "Xulosa" },
        { ul: [
          "<strong>Yon effekt</strong> — komponentning tashqi dunyo bilan aloqasi (fetch, timer, DOM o'zgartirish, obuna);",
          "<strong><code>useEffect(fn, deps)</code></strong> effektni ekran chizilgandan keyin ishga tushiradi;",
          "<strong>Dependency array</strong> effekt qachon qayta ishlashini boshqaradi: <code>[]</code> — bir marta, <code>[x]</code> — <code>x</code> o'zgarganda, yo'q bo'lsa — har render'da;",
          "Ma'lumot yuklash uchun <code>fetch</code>ni <code>useEffect(..., [])</code> ichida ishlatib, natijani state'ga saqlaymiz;",
          "Effektdan qaytarilgan <strong>cleanup funksiyasi</strong> timer/obunalarni tozalaydi — xotira sizishining oldini oladi;",
          "Effekt ichida ishlatilgan barcha state/prop'lar dependency massivida bo'lishi kerak."
        ] }
      ]
    },

    {
      slug: "react-list-form",
      title: "Ro'yxatlar va formalar",
      blurb: "Massivni map bilan render qilish, key propi, shartli render (&& va ternar), controlled input (value + onChange) va oddiy TODO ilovasi.",
      body: [
        { lead: "Real ilovalar ro'yxatlar (foydalanuvchilar, mahsulotlar, vazifalar) va formalar (matn kiritish, tanlash) bilan to'la. Ushbu yakuniy darsda massivni ekranga chiqarish, shartli ko'rsatish va formani boshqarishni o'rganib, kichik TODO ilovasini yig'amiz." },

        { h2: "Massivni map bilan render qilish" },
        { p: "React'da massivni ekranga chiqarish uchun JavaScript'ning <code>Array.map()</code> metodidan foydalanamiz. <code>map</code> har bir elementni JSX'ga aylantirib, JSX elementlari massivini qaytaradi. React esa bunday massivni avtomatik ravishda ketma-ket chizadi:" },
        { code: "function Mevalar() {\n  const mevalar = [\"olma\", \"banan\", \"uzum\"];\n  return (\n    <ul>\n      {mevalar.map(meva => <li>{meva}</li>)}\n    </ul>\n  );\n}" },
        { p: "Bu yerda <code>{mevalar.map(...)}</code> uch dona <code>&lt;li&gt;</code> hosil qiladi. Ko'pincha obyektlar massivi bilan ishlaymiz:" },
        { code: "function Foydalanuvchilar() {\n  const users = [\n    { id: 1, ism: \"Ali\" },\n    { id: 2, ism: \"Vali\" },\n    { id: 3, ism: \"Guli\" }\n  ];\n  return (\n    <ul>\n      {users.map(u => <li>{u.ism}</li>)}\n    </ul>\n  );\n}" },

        { h2: "key propi — nega u kerak?" },
        { p: "Yuqoridagi kodni ishga tushirsangiz, React konsolda ogohlantirish beradi: <em>\"Each child in a list should have a unique key prop\"</em>. Har bir ro'yxat elementiga <strong>key</strong> nomli maxsus prop berish shart:" },
        { code: "{users.map(u => <li key={u.id}>{u.ism}</li>)}" },
        { p: "<strong>key</strong> — React'ga ro'yxatdagi har bir elementni <em>farqlash</em> imkonini beradigan noyob belgi. Nega u muhim? Ro'yxat o'zgarganda (element qo'shilsa, o'chirilsa, tartibi o'zgarsa), React <code>key</code> orqali qaysi element o'zgarganini aniq biladi va faqat shuni yangilaydi. Bu — samaradorlik uchun juda muhim." },
        { ul: [
          "<code>key</code> ro'yxat ichida <strong>noyob</strong> bo'lishi kerak (odatda ma'lumotning <code>id</code>si);",
          "<code>key</code>ni <em>eng tashqi</em> qaytarilgan elementga qo'yamiz;",
          "<code>key</code> — bu React uchun ichki belgi; uni komponent ichida prop sifatida o'qib bo'lmaydi."
        ] },
        { warn: "Massiv indeksini (<code>map((item, i) =&gt; ... key={i})</code>) key sifatida ishlatishdan iloji boricha qoching — ro'yxat tartibi o'zgarganda bu xatolarga olib keladi. Har doim barqaror, noyob <code>id</code>dan foydalaning." },

        { h2: "Shartli render — && operatori" },
        { p: "Ko'pincha biror elementni <em>faqat ma'lum shartda</em> ko'rsatishni istaymiz. JSX ichida <code>if</code> yozib bo'lmaydi, lekin <strong><code>&&</code></strong> (mantiqiy VA) operatoridan foydalanish mumkin. Uning ishlashi: agar chap tomon <code>true</code> bo'lsa, o'ng tomondagi JSX ko'rsatiladi:" },
        { code: "function Xabar({ xabarlarSoni }) {\n  return (\n    <div>\n      <h1>Pochta</h1>\n      {xabarlarSoni > 0 && (\n        <p>Sizda {xabarlarSoni} ta yangi xabar bor</p>\n      )}\n    </div>\n  );\n}" },
        { p: "Agar <code>xabarlarSoni</code> 0 dan katta bo'lsa, xabar ko'rsatiladi; aks holda hech narsa chiqmaydi. Chunki <code>false && ...</code> hech narsa render qilmaydi." },
        { warn: "Ehtiyot bo'ling: <code>{xabarlarSoni && ...}</code> deb yozsangiz va son 0 bo'lsa, ekranda <strong>0</strong> raqami chiqib qoladi! Sababi: 0 — \"falsy\", lekin React uni chizadi. Shuning uchun aniq shart yozing: <code>{xabarlarSoni &gt; 0 && ...}</code>." },

        { h2: "Shartli render — ternar operator" },
        { p: "Agar shartga qarab <em>ikki xil</em> narsadan birini ko'rsatish kerak bo'lsa (u yoki bu), <strong>ternar operator</strong> (<code>shart ? a : b</code>) ishlatiladi:" },
        { code: "function Holat({ tizimgaKirgan }) {\n  return (\n    <div>\n      {tizimgaKirgan\n        ? <p>Xush kelibsiz!</p>\n        : <p>Iltimos, tizimga kiring</p>}\n    </div>\n  );\n}" },
        { p: "Bu yerda <code>tizimgaKirgan</code> <code>true</code> bo'lsa birinchi, <code>false</code> bo'lsa ikkinchi <code>&lt;p&gt;</code> ko'rsatiladi. Ternar operator — JSX ichida \"agar-bo'lmasa\" mantig'ini ifodalashning eng qulay usuli." },
        { tip: "Qoida: bir narsa ko'rsatilishi yoki ko'rsatilmasligi kerak bo'lsa — <code>&&</code> ishlating. Ikkitadan biri ko'rsatilishi kerak bo'lsa — <strong>ternar</strong> ishlating." },

        { h2: "Controlled input — boshqariladigan maydon" },
        { p: "Formalar bilan ishlashda React'da <strong>controlled input</strong> (boshqariladigan maydon) uslubi qo'llaniladi. Bunda input maydonining qiymati state'da saqlanadi, ya'ni React — yagona haqiqat manbasi. Bu ikki qadamdan iborat:" },
        { ul: [
          "Input'ning <code>value</code>si state'ga bog'lanadi (<code>value={matn}</code>);",
          "Input o'zgarganda <code>onChange</code> state'ni yangilaydi (<code>onChange={e =&gt; setMatn(e.target.value)}</code>)."
        ] },
        { code: "import { useState } from \"react\";\n\nfunction Forma() {\n  const [matn, setMatn] = useState(\"\");\n\n  return (\n    <div>\n      <input\n        value={matn}\n        onChange={e => setMatn(e.target.value)}\n      />\n      <p>Siz yozdingiz: {matn}</p>\n    </div>\n  );\n}" },
        { p: "Bu yerda oqim shunday: foydalanuvchi yozadi → <code>onChange</code> ishga tushadi → <code>e.target.value</code> orqali yangi qiymat olinadi → <code>setMatn</code> state'ni yangilaydi → React qayta render qiladi → <code>value={matn}</code> yangi qiymatni ko'rsatadi. Ma'lumot va ko'rinish doim mos bo'ladi." },
        { note: "<code>e.target.value</code> — bu foydalanuvchi kiritgan input maydonining joriy matnini beradi. Bu — oddiy DOM'dagi kabi ishlaydi." },

        { h2: "To'liq TODO ilovasi" },
        { p: "Endi o'rganganlarimizni birlashtirib, oddiy <strong>TODO</strong> (vazifalar ro'yxati) ilovasini yig'amiz. Unda: input orqali yangi vazifa qo'shish, ro'yxatni <code>map</code> bilan chiqarish, <code>key</code> ishlatish va shartli render bor:" },
        { code: "import { useState } from \"react\";\n\nfunction Todo() {\n  const [matn, setMatn] = useState(\"\");\n  const [vazifalar, setVazifalar] = useState([]);\n\n  function qoshish() {\n    if (matn.trim() === \"\") return;\n    const yangi = { id: Date.now(), text: matn };\n    setVazifalar([...vazifalar, yangi]);\n    setMatn(\"\");\n  }\n\n  function ochirish(id) {\n    setVazifalar(vazifalar.filter(v => v.id !== id));\n  }\n\n  return (\n    <div>\n      <h2>Vazifalar</h2>\n      <input\n        value={matn}\n        onChange={e => setMatn(e.target.value)}\n      />\n      <button onClick={qoshish}>Qo'shish</button>\n\n      {vazifalar.length === 0\n        ? <p>Hozircha vazifa yo'q</p>\n        : (\n          <ul>\n            {vazifalar.map(v => (\n              <li key={v.id}>\n                {v.text}\n                <button onClick={() => ochirish(v.id)}>x</button>\n              </li>\n            ))}\n          </ul>\n        )}\n    </div>\n  );\n}\n\nexport default Todo;" },
        { p: "Ushbu ilova React asoslarining barchasini bir joyda ko'rsatadi:" },
        { ul: [
          "<strong>useState</strong> — input matni (<code>matn</code>) va vazifalar ro'yxati (<code>vazifalar</code>) uchun ikki state;",
          "<strong>Controlled input</strong> — <code>value</code> + <code>onChange</code> orqali maydon boshqariladi;",
          "Yangi vazifa qo'shishda <strong>massivni nusxalab</strong> yangilaymiz: <code>[...vazifalar, yangi]</code> — eski massivni o'zgartirmaymiz;",
          "O'chirishda <code>filter</code> bilan yangi massiv yasaymiz;",
          "<strong>map</strong> + <strong>key</strong> — ro'yxatni chizish;",
          "<strong>ternar</strong> — ro'yxat bo'sh bo'lsa xabar, aks holda ro'yxat ko'rsatiladi."
        ] },
        { warn: "State massivini <strong>hech qachon</strong> to'g'ridan-to'g'ri o'zgartirmang: <code>vazifalar.push(yangi)</code> ishlamaydi! Har doim yangi massiv yarating: <code>setVazifalar([...vazifalar, yangi])</code>. Bu — React'ning holat o'zgarmasligi (immutability) qoidasi." },

        { h2: "Forma va onSubmit" },
        { p: "Yuqoridagi misolda tugma bosdik. Amalda formalarni <code>&lt;form&gt;</code> teg va <code>onSubmit</code> bilan yozish yaxshiroq — chunki foydalanuvchi Enter tugmasi bilan ham yubora oladi. Faqat brauzerning sahifani qayta yuklashini <code>e.preventDefault()</code> bilan to'xtatish kerak:" },
        { code: "function Forma() {\n  const [matn, setMatn] = useState(\"\");\n\n  function yuborish(e) {\n    e.preventDefault(); // sahifa qayta yuklanmasin\n    console.log(\"Yuborildi:\", matn);\n    setMatn(\"\");\n  }\n\n  return (\n    <form onSubmit={yuborish}>\n      <input value={matn} onChange={e => setMatn(e.target.value)} />\n      <button type=\"submit\">Yuborish</button>\n    </form>\n  );\n}" },
        { tip: "<code>e.preventDefault()</code>ni unutmang — aks holda forma yuborilganda brauzer sahifani qayta yuklaydi va SPA \"buziladi\"." },

        { h2: "Xulosa" },
        { ul: [
          "Massivni <strong><code>map</code></strong> bilan JSX elementlariga aylantirib chizamiz;",
          "Har bir ro'yxat elementiga noyob <strong><code>key</code></strong> propi shart (odatda <code>id</code>);",
          "Shartli render: bittasi ko'rinsa-ko'rinmasa — <strong><code>&&</code></strong>, ikkitadan biri — <strong>ternar</strong> (<code>? :</code>);",
          "<code>0 && ...</code> tuzog'idan ehtiyot bo'ling — aniq shart yozing (<code>son &gt; 0 &&</code>);",
          "<strong>Controlled input</strong>: <code>value={state}</code> + <code>onChange</code> — React yagona haqiqat manbasi;",
          "State massiv/obyektlarini <strong>o'zgartirmang</strong> — nusxalab yangilang (<code>[...eski, yangi]</code>, <code>filter</code>);",
          "Formalar uchun <code>&lt;form onSubmit&gt;</code> + <code>e.preventDefault()</code> ishlating."
        ] }
      ]
    }
  ]
};
