"use strict";
module.exports = {
  part: "7-qism: Testlash va yetkazib berish",
  chapter: "CI/CD (GitHub Actions)",
  lessons: [
    {
      slug: "cicd-nima",
      title: "CI/CD nima?",
      blurb: "Uzluksiz integratsiya (CI) va uzluksiz yetkazib berish (CD): qo'lda jarayon muammosi, pipeline tushunchasi va vositalar.",
      body: [
        { lead: "Har safar kod yozganingizdan keyin uni qo'lda tekshirish, testlarni yugurtirish, build qilish va serverga qo'lda ko'chirish — bu zerikarli, sekin va xatoga moyil. <strong>CI/CD</strong> aynan shu jarayonlarni avtomatlashtiradi: siz kodni <code>git push</code> qilasiz, qolgan hammasini mashina bajaradi." },

        { h2: "Qo'lda jarayonning muammosi" },
        { p: "Tasavvur qiling: jamoada 5 dasturchi bor. Har biri o'z shoxchasida (branch) ishlaydi va haftada bir marta hamma o'zgarishlarni birlashtiradi. Birlashtirish paytida hamma narsa buziladi — kimningdir kodi boshqasinikiga zid keladi, testlar ishlamay qoladi, deploy paytida noto'g'ri fayl ko'chib ketadi." },
        { p: "Qo'lda deploy odatda quyidagicha ko'rinadi:" },
        { ul: [
          "Dasturchi lokal mashinasida <code>npm test</code> ni ishga tushiradi (ba'zan unutib qoldiradi).",
          "<code>npm run build</code> qiladi va natijani qo'lda serverga FTP orqali yuklaydi.",
          "Serverda kerakli buyruqlarni qo'lda teradi (migratsiya, restart va h.k.).",
          "Biror qadam esdan chiqsa — sayt ishlamay qoladi, sabab esa tunda topiladi."
        ]},
        { warn: "Qo'lda jarayonda eng katta xavf — <strong>\"menda ishlayapti-ku\"</strong> muammosi. Kod dasturchining mashinasida ishlaydi, lekin serverda ishlamaydi, chunki muhitlar bir xil emas." },

        { h2: "CI — uzluksiz integratsiya (Continuous Integration)" },
        { p: "<strong>CI</strong> — har bir <code>git push</code> yoki Pull Request paytida kodni <em>avtomatik</em> tekshirish amaliyoti. Toza, avtomatik muhitda kod yuklab olinadi, bog'liqliklar o'rnatiladi, linter, testlar va build ishga tushadi." },
        { ul: [
          "<strong>Tez fikr-mulohaza:</strong> agar testlar buzilsa, dasturchi bir necha daqiqada bilib oladi, bir haftadan keyin emas.",
          "<strong>Kichik birlashuvlar:</strong> har kim tez-tez birlashtiradi, shuning uchun ziddiyatlar kichik bo'ladi.",
          "<strong>Ishonch:</strong> asosiy shoxcha (main) doim \"yashil\" — ya'ni testlardan o'tgan holatda turadi."
        ]},
        { note: "CI'ning oltin qoidasi: <em>agar CI qizil bo'lsa (testlar buzilgan), hech narsa birlashtirilmaydi</em>. Bu asosiy shoxchani doim ishlaydigan holatda saqlaydi." },

        { h2: "CD — uzluksiz yetkazib berish va deploy" },
        { p: "CD ikki ma'noda ishlatiladi va ularni farqlash muhim:" },
        { ul: [
          "<strong>Continuous Delivery (yetkazib berish):</strong> kod avtomatik tayyorlanadi va istalgan vaqtda deploy qilishga tayyor turadi, lekin oxirgi tugmani <em>odam</em> bosadi.",
          "<strong>Continuous Deployment (deploy):</strong> testlardan o'tgan har bir o'zgarish <em>avtomatik</em> ravishda ishlab chiqarish (production) serveriga chiqadi. Hech kim tugma bosmaydi."
        ]},
        { p: "Ko'p jamoalar avval Continuous Delivery bilan boshlaydi (xavfsizroq), ishonch ortgach Continuous Deployment ga o'tadi." },

        { h2: "Pipeline (quvur) tushunchasi" },
        { p: "CI/CD jarayoni odatda <strong>pipeline</strong> — ketma-ket bosqichlar quvuri sifatida tasvirlanadi. Har bir bosqich muvaffaqiyatli tugasagina keyingisi ishga tushadi:" },
        { code: [
          "  push / PR",
          "     |",
          "  [ 1. Checkout ]   <- kodni yuklab olish",
          "     |",
          "  [ 2. Install  ]   <- npm ci (bog'liqliklar)",
          "     |",
          "  [ 3. Lint     ]   <- kod uslubini tekshirish",
          "     |",
          "  [ 4. Test     ]   <- avtomatik testlar",
          "     |",
          "  [ 5. Build    ]   <- ishlab chiqarish uchun yig'ish",
          "     |",
          "  [ 6. Deploy   ]   <- serverga chiqarish (faqat main)"
        ].join("\n") },
        { p: "Agar 4-bosqich (Test) buzilsa, 5 va 6 umuman ishga tushmaydi — buzuq kod hech qachon serverga chiqmaydi. Aynan shu narsa CI/CD ni kuchli qiladi." },

        { h2: "Vositalar: qaysi birini tanlash?" },
        { ul: [
          "<strong>GitHub Actions</strong> — GitHub'ga to'g'ridan-to'g'ri o'rnatilgan, YAML fayl bilan sozlanadi. Ochiq repolar uchun bepul, o'rganish oson. Biz shu vositani o'rganamiz.",
          "<strong>GitLab CI/CD</strong> — GitLab'ga o'rnatilgan, <code>.gitlab-ci.yml</code> fayli bilan ishlaydi. Konsepsiyalar juda o'xshash.",
          "<strong>Jenkins</strong> — eski, kuchli, o'zingiz serverga o'rnatasiz. Katta korxonalarda ko'p uchraydi, lekin sozlash murakkabroq.",
          "<strong>CircleCI, Travis CI, Bitbucket Pipelines</strong> — boshqa mashhur bulutli xizmatlar."
        ]},
        { tip: "Ularning barchasi bir xil g'oyaga asoslanadi: <em>hodisa yuz beradi (push) &rarr; toza muhitda bosqichlar ishga tushadi</em>. Bittasini o'rgansangiz, boshqalarini oson tushunasiz. GitHub Actions boshlash uchun eng qulay tanlov." },

        { h2: "CI/CD ning haqiqiy foydasi" },
        { ul: [
          "<strong>Kamroq xato:</strong> odam unutadigan qadamlarni mashina hech qachon unutmaydi.",
          "<strong>Tezlik:</strong> deploy daqiqalar ichida, tunlarcha qo'lda ishlashsiz.",
          "<strong>Ishonch:</strong> har bir o'zgarish bir xil, takrorlanadigan jarayondan o'tadi.",
          "<strong>Hujjatlashtirilgan jarayon:</strong> pipeline YAML fayli — bu jamoaning deploy jarayonining yagona haqiqat manbai.",
          "<strong>Xotirjamlik:</strong> \"juma kuni deploy qilishdan qo'rqish\" muammosi yo'qoladi."
        ]},

        { h2: "Xulosa" },
        { ul: [
          "<strong>CI</strong> — har push/PR da kodni avtomatik tekshirish (lint, test, build).",
          "<strong>CD</strong> — kodni avtomatik yetkazish (Delivery) yoki avtomatik deploy qilish (Deployment).",
          "<strong>Pipeline</strong> — ketma-ket bosqichlar; buzuq bosqich keyingilarini to'xtatadi.",
          "GitHub Actions, GitLab CI, Jenkins — vositalar; g'oya bir xil.",
          "Foyda: kamroq xato, tezroq deploy, ko'proq ishonch."
        ]}
      ]
    },

    {
      slug: "actions-asoslar",
      title: "GitHub Actions asoslari",
      blurb: ".github/workflows/ papka, workflow YAML tuzilishi (name, on, jobs, steps), runner va birinchi workflow.",
      body: [
        { lead: "GitHub Actions'da hamma narsa <strong>YAML fayl</strong> orqali boshqariladi. Bu fayllarni repoda saqlaysiz, GitHub esa ularni avtomatik o'qib, kerakli paytda ishga tushiradi." },

        { h2: ".github/workflows/ papkasi" },
        { p: "GitHub Actions faqat bitta joyni qaraydi: repo ildizidagi <code>.github/workflows/</code> papkasi. Shu papkadagi har bir <code>.yml</code> (yoki <code>.yaml</code>) fayl alohida <strong>workflow</strong> hisoblanadi." },
        { code: [
          "my-project/",
          "  .github/",
          "    workflows/",
          "      ci.yml          <- birinchi workflow",
          "      deploy.yml      <- ikkinchi workflow",
          "  src/",
          "  package.json"
        ].join("\n") },
        { note: "Papka nomi aynan <code>.github/workflows</code> bo'lishi shart. Nuqta bilan boshlanadi va GitHub buni maxsus qabul qiladi. Boshqa papkaga qo'ysangiz, hech narsa ishlamaydi." },

        { h2: "Workflow YAML tuzilishi" },
        { p: "Har bir workflow uch asosiy qismdan iborat: <code>name</code> (nomi), <code>on</code> (qachon ishga tushadi), <code>jobs</code> (nima qiladi)." },
        { code: [
          "name: CI",
          "",
          "on: [push, pull_request]",
          "",
          "jobs:",
          "  build:",
          "    runs-on: ubuntu-latest",
          "    steps:",
          "      - name: Kodni yuklab olish",
          "        uses: actions/checkout@v4",
          "",
          "      - name: Salom aytish",
          "        run: echo \"Salom, GitHub Actions!\""
        ].join("\n") },
        { warn: "YAML'da <strong>chekinish (indent) muhim!</strong> Faqat probel ishlating, TAB ISHLATMANG. Noto'g'ri chekinish butun faylni buzadi. Odatda 2 probel qatlamlar orasida." },

        { h2: "on — hodisa (qachon ishga tushadi)" },
        { p: "<code>on</code> kaliti workflow qaysi hodisada ishga tushishini belgilaydi:" },
        { code: [
          "# Har qanday push va PR da:",
          "on: [push, pull_request]",
          "",
          "# Faqat main shoxchaga push bo'lganda:",
          "on:",
          "  push:",
          "    branches: [ main ]",
          "",
          "# Faqat main ga PR ochilganda:",
          "on:",
          "  pull_request:",
          "    branches: [ main ]",
          "",
          "# Har kuni soat 00:00 (cron) da:",
          "on:",
          "  schedule:",
          "    - cron: '0 0 * * *'"
        ].join("\n") },
        { tip: "Boshlash uchun <code>on: [push, pull_request]</code> yetarli — har bir push va har bir Pull Request'da tekshiruv ishga tushadi." },

        { h2: "jobs va runner" },
        { p: "<code>jobs</code> ichida bir yoki bir nechta <strong>job</strong> (vazifa) bo'ladi. Har bir job alohida, toza virtual mashinada — <strong>runner</strong>da ishga tushadi." },
        { ul: [
          "<code>runs-on: ubuntu-latest</code> — eng ko'p ishlatiladigan runner (Linux). Tez va bepul.",
          "<code>runs-on: windows-latest</code> — Windows kerak bo'lsa.",
          "<code>runs-on: macos-latest</code> — macOS (masalan iOS build uchun)."
        ]},
        { p: "Har bir job <em>toza</em> mashinada boshlanadi: hech qanday oldingi fayl yo'q, hatto sizning kodingiz ham yo'q. Shuning uchun birinchi qadam odatda kodni yuklab olish bo'ladi." },
        { note: "Bir workflow'da bir nechta job bo'lsa, ular <strong>parallel</strong> (bir vaqtda) ishlaydi. Agar ketma-ketlik kerak bo'lsa, <code>needs:</code> kaliti bilan bog'lanadi." },

        { h2: "steps va actions/checkout" },
        { p: "Har bir job ichida <code>steps</code> — ketma-ket qadamlar bo'ladi. Qadam ikki xil bo'ladi:" },
        { ul: [
          "<code>uses:</code> — tayyor <strong>action</strong>ni ishlatadi (boshqalar yozgan qayta ishlatiladigan qadam).",
          "<code>run:</code> — terminal buyrug'ini bajaradi (masalan <code>npm test</code>)."
        ]},
        { p: "Eng muhim tayyor action — <code>actions/checkout</code>. U repodagi kodni runner mashinasiga yuklab oladi. Deyarli har bir workflow shundan boshlanadi:" },
        { code: [
          "steps:",
          "  - name: Kodni yuklab olish",
          "    uses: actions/checkout@v4",
          "",
          "  - name: Fayllarni ko'rish",
          "    run: ls -la",
          "",
          "  - name: Bir nechta buyruq",
          "    run: |",
          "      echo \"Bir necha qatorli buyruq\"",
          "      pwd",
          "      node --version"
        ].join("\n") },
        { p: "E'tibor bering: <code>@v4</code> — bu action'ning versiyasi. Versiyani ko'rsatish tavsiya etiladi, chunki keyingi versiyalar o'zgarib ketishi mumkin." },
        { tip: "<code>run: |</code> (quvur belgisi) bir nechta qatorli buyruqlarni yozishga imkon beradi. Har bir qator alohida bajariladi." },

        { h2: "Birinchi to'liq workflow" },
        { p: "Endi hamma qismlarni birlashtiramiz. Quyidagi fayl <code>.github/workflows/ci.yml</code> ga saqlanadi:" },
        { code: [
          "name: CI",
          "",
          "on:",
          "  push:",
          "    branches: [ main ]",
          "  pull_request:",
          "    branches: [ main ]",
          "",
          "jobs:",
          "  hello:",
          "    runs-on: ubuntu-latest",
          "    steps:",
          "      - name: Kodni yuklab olish",
          "        uses: actions/checkout@v4",
          "",
          "      - name: Node versiyasini ko'rsatish",
          "        run: node --version",
          "",
          "      - name: Loyiha fayllari",
          "        run: ls -la"
        ].join("\n") },
        { p: "Bu faylni repoga qo'shib, <code>git push</code> qilganingizdan so'ng GitHub'da <strong>Actions</strong> yorlig'iga o'ting — workflow'ning ishga tushganini va har bir qadamning natijasini ko'rasiz." },

        { h2: "Natijani qayerda ko'rish" },
        { ul: [
          "GitHub repo &rarr; yuqoridagi <strong>Actions</strong> yorlig'i.",
          "Har bir ishga tushish (run) alohida ro'yxatda ko'rinadi.",
          "Ustiga bosib, har bir job va qadamning loglarini ochish mumkin.",
          "Yashil belgi &rarr; muvaffaqiyat; qizil belgi &rarr; xato (logdan sababni topasiz)."
        ]},

        { h2: "Xulosa" },
        { ul: [
          "Workflow fayllari <code>.github/workflows/</code> papkasida <code>.yml</code> ko'rinishida yashaydi.",
          "Tuzilma: <code>name</code>, <code>on</code> (hodisa), <code>jobs</code> (vazifalar), <code>steps</code> (qadamlar).",
          "<code>runs-on: ubuntu-latest</code> — toza virtual runner mashinasi.",
          "<code>uses:</code> tayyor action ishlatadi, <code>run:</code> terminal buyrug'ini bajaradi.",
          "Deyarli har doim <code>actions/checkout@v4</code> bilan boshlanadi.",
          "Natijalarni <strong>Actions</strong> yorlig'ida kuzatasiz."
        ]}
      ]
    },

    {
      slug: "actions-test",
      title: "Avtomatik test va build",
      blurb: "Node o'rnatish, npm ci, npm test, build, matrix (bir nechta Node versiyasi), kesh va status badge.",
      body: [
        { lead: "Endi workflow'ni haqiqiy foydali qilamiz: Node.js loyihasini o'rnatib, testlarni ishga tushirib, build qilamiz. Bu — har bir Node loyihasining CI asosini tashkil qiladi." },

        { h2: "Node.js muhitini o'rnatish (setup-node)" },
        { p: "Runner mashinasida Node bo'lishi mumkin, lekin biz aniq versiyani nazorat qilmoqchimiz. Buning uchun <code>actions/setup-node</code> action ishlatiladi:" },
        { code: [
          "steps:",
          "  - name: Kodni yuklab olish",
          "    uses: actions/checkout@v4",
          "",
          "  - name: Node.js o'rnatish",
          "    uses: actions/setup-node@v4",
          "    with:",
          "      node-version: '20'"
        ].join("\n") },
        { p: "<code>with:</code> — action'ga parametr uzatish usuli. Bu yerda <code>node-version: '20'</code> deb Node'ning 20-versiyasini o'rnatamiz." },
        { note: "Versiyani tirnoq ichida (<code>'20'</code>) yozing. YAML <code>20.10</code> kabi sonlarni noto'g'ri o'qishi mumkin, tirnoq esa buni oldini oladi." },

        { h2: "npm ci — bog'liqliklarni o'rnatish" },
        { p: "CI muhitida <code>npm install</code> emas, <code>npm ci</code> ishlatiladi. Farqi muhim:" },
        { ul: [
          "<code>npm ci</code> aniq <code>package-lock.json</code> asosida o'rnatadi — takrorlanadigan, bir xil natija beradi.",
          "<code>node_modules</code> papkasini avval tozalab, keyin toza o'rnatadi.",
          "<code>package.json</code> va lock fayl mos kelmasa, xato beradi (bu yaxshi — muammoni erta topadi).",
          "Tezroq va CI uchun maxsus mo'ljallangan."
        ]},
        { code: [
          "  - name: Bog'liqliklarni o'rnatish",
          "    run: npm ci"
        ].join("\n") },
        { warn: "<code>npm ci</code> ishlashi uchun repoda <code>package-lock.json</code> bo'lishi <strong>shart</strong>. Uni <code>.gitignore</code> ga qo'ymang — lock fayl repoda bo'lishi kerak." },

        { h2: "Test va build qadamlari" },
        { p: "Bog'liqliklar o'rnatilgach, testlar va build ishga tushadi. Bu <code>package.json</code>dagi skriptlarga bog'liq:" },
        { code: [
          "// package.json ichida:",
          "\"scripts\": {",
          "  \"test\": \"jest\",",
          "  \"build\": \"vite build\",",
          "  \"lint\": \"eslint .\"",
          "}"
        ].join("\n") },
        { p: "Endi workflow'da shu skriptlarni chaqiramiz:" },
        { code: [
          "  - name: Linter",
          "    run: npm run lint",
          "",
          "  - name: Testlar",
          "    run: npm test",
          "",
          "  - name: Build",
          "    run: npm run build"
        ].join("\n") },
        { p: "Agar biror qadam noldan farqli chiqish kodi (exit code) qaytarsa — masalan test buzilsa — job to'xtaydi va keyingi qadamlar ishlamaydi. Aynan shu bizga kerak." },

        { h2: "To'liq CI workflow" },
        { p: "Barcha qadamlarni <code>.github/workflows/ci.yml</code> ga birlashtiramiz:" },
        { code: [
          "name: CI",
          "",
          "on:",
          "  push:",
          "    branches: [ main ]",
          "  pull_request:",
          "",
          "jobs:",
          "  test:",
          "    runs-on: ubuntu-latest",
          "    steps:",
          "      - uses: actions/checkout@v4",
          "",
          "      - name: Node.js o'rnatish",
          "        uses: actions/setup-node@v4",
          "        with:",
          "          node-version: '20'",
          "",
          "      - name: Bog'liqliklar",
          "        run: npm ci",
          "",
          "      - name: Linter",
          "        run: npm run lint",
          "",
          "      - name: Testlar",
          "        run: npm test",
          "",
          "      - name: Build",
          "        run: npm run build"
        ].join("\n") },

        { h2: "Matrix — bir nechta Node versiyasi" },
        { p: "Loyihangiz Node 18, 20 va 22 da ishlashini tekshirmoqchimisiz? <strong>Matrix</strong> yordamida bitta job'ni har bir versiya uchun avtomatik takrorlaysiz:" },
        { code: [
          "jobs:",
          "  test:",
          "    runs-on: ubuntu-latest",
          "    strategy:",
          "      matrix:",
          "        node-version: [18, 20, 22]",
          "    steps:",
          "      - uses: actions/checkout@v4",
          "",
          "      - name: Node ${{ matrix.node-version }} o'rnatish",
          "        uses: actions/setup-node@v4",
          "        with:",
          "          node-version: ${{ matrix.node-version }}",
          "",
          "      - run: npm ci",
          "      - run: npm test"
        ].join("\n") },
        { p: "Bu workflow uchta parallel job yaratadi: biri Node 18 uchun, biri 20, biri 22. Ular bir vaqtda ishlaydi. <code>${{ matrix.node-version }}</code> — matrix'dagi joriy qiymatga murojaat." },
        { tip: "Matrix faqat Node versiyasi uchun emas — operatsion tizim (<code>os: [ubuntu-latest, windows-latest]</code>) yoki boshqa o'zgaruvchilar uchun ham ishlatiladi. Ular kombinatsiyalarga bo'linadi." },

        { h2: "Kesh (cache) — tezlashtirish" },
        { p: "Har safar <code>npm ci</code> bog'liqliklarni noldan yuklab oladi — bu sekin. <code>actions/setup-node</code> o'rnatilgan keshni qo'llab-quvvatlaydi:" },
        { code: [
          "  - name: Node.js o'rnatish (kesh bilan)",
          "    uses: actions/setup-node@v4",
          "    with:",
          "      node-version: '20'",
          "      cache: 'npm'"
        ].join("\n") },
        { p: "<code>cache: 'npm'</code> qatori npm keshini saqlaydi va keyingi ishga tushirishlarda qayta ishlatadi. <code>package-lock.json</code> o'zgarmasa, bog'liqliklar keshdan olinadi — bu ancha tez." },
        { note: "Kesh avtomatik <code>package-lock.json</code> hash'i asosida boshqariladi. Lock fayl o'zgarsa, kesh yangilanadi. Siz hech narsa qilmaysiz — faqat <code>cache: 'npm'</code> qatorini qo'shasiz." },

        { h2: "Status badge — README'da nishon" },
        { p: "CI holatini README'da ko'rsatuvchi <strong>badge</strong> (nishon) qo'shishingiz mumkin. U yashil (o'tdi) yoki qizil (buzildi) bo'ladi. Markdown ko'rinishi:" },
        { code: [
          "![CI](https://github.com/USER/REPO/actions/workflows/ci.yml/badge.svg)"
        ].join("\n") },
        { p: "<code>USER</code> — GitHub foydalanuvchi nomi, <code>REPO</code> — repo nomi, <code>ci.yml</code> — workflow fayl nomi. Badge har doim asosiy shoxchaning oxirgi holatini ko'rsatadi." },
        { tip: "Badge'ni GitHub'da Actions &rarr; workflow &rarr; o'ng yuqoridagi \"...\" menyusidan \"Create status badge\" orqali avtomatik yaratib olishingiz mumkin." },

        { h2: "Xulosa" },
        { ul: [
          "<code>actions/setup-node@v4</code> bilan aniq Node versiyasini o'rnatasiz.",
          "CI'da <code>npm install</code> emas, <code>npm ci</code> ishlating (takrorlanadigan, lock faylga bog'liq).",
          "<code>npm run lint</code>, <code>npm test</code>, <code>npm run build</code> — asosiy tekshiruv qadamlari.",
          "<strong>Matrix</strong> bir workflow'ni bir nechta Node versiyasi/OS uchun parallel takrorlaydi.",
          "<code>cache: 'npm'</code> bog'liqliklarni keshlab, ishni tezlashtiradi.",
          "<strong>Badge</strong> README'da CI holatini ko'rsatadi."
        ]}
      ]
    },

    {
      slug: "actions-deploy",
      title: "Avtomatik deploy",
      blurb: "Secrets, ${{ secrets.X }}, environment, shartli ishga tushirish, deploy qadami (GitHub Pages / SSH) va CI+CD birga.",
      body: [
        { lead: "CI kodni tekshiradi, endi <strong>CD</strong> uni serverga chiqaradi. Deploy paytida parol, kalit va tokenlar kerak bo'ladi — ularni kodda ochiq yozib bo'lmaydi. Buning uchun <strong>secrets</strong> ishlatiladi." },

        { h2: "Secrets — maxfiy ma'lumotlar" },
        { p: "Server paroli, API kalit, SSH kalit — bularni hech qachon YAML faylga yoki kodga ochiq yozmang. GitHub'da ular <strong>Secrets</strong> sifatida shifrlangan holda saqlanadi." },
        { p: "Qo'shish yo'li: GitHub repo &rarr; <strong>Settings</strong> &rarr; <strong>Secrets and variables</strong> &rarr; <strong>Actions</strong> &rarr; <strong>New repository secret</strong>." },
        { ul: [
          "Har bir secret'ga nom (masalan <code>SSH_PRIVATE_KEY</code>) va qiymat berasiz.",
          "Bir marta saqlangach, qiymatini <em>hech kim</em> (siz ham) qayta ko'ra olmaysiz — faqat yangilash mumkin.",
          "Loglarda secret qiymati avtomatik <code>***</code> bilan yashiriladi."
        ]},
        { warn: "Secret'ni hech qachon <code>echo</code> yoki <code>console.log</code> bilan chiqarmang. GitHub yashirishga harakat qiladi, lekin kodlangan (base64) ko'rinishda oshkor bo'lib qolishi mumkin." },

        { h2: "${{ secrets.X }} — secret'ni ishlatish" },
        { p: "Workflow ichida secret'ga <code>${{ secrets.NOM }}</code> ifodasi orqali murojaat qilinadi:" },
        { code: [
          "steps:",
          "  - name: Serverga ulanish",
          "    run: deploy-tool --token \"$DEPLOY_TOKEN\"",
          "    env:",
          "      DEPLOY_TOKEN: ${{ secrets.DEPLOY_TOKEN }}"
        ].join("\n") },
        { p: "Bu yerda secret <code>env:</code> orqali muhit o'zgaruvchisiga uzatiladi, so'ng buyruqda <code>$DEPLOY_TOKEN</code> sifatida ishlatiladi. Bu — eng xavfsiz usul." },
        { note: "<code>${{ ... }}</code> — GitHub Actions ifodasi. U workflow ishga tushishidan oldin haqiqiy qiymat bilan almashtiriladi. Faqat <code>secrets</code> emas, <code>github</code>, <code>matrix</code>, <code>env</code> kabi kontekstlarga ham murojaat qiladi." },

        { h2: "Shartli ishga tushirish — faqat main'ga deploy" },
        { p: "Deploy har PR'da emas, faqat asosiy shoxchaga (main) push bo'lganda ishga tushishi kerak. Buni ikki usulda qilamiz." },
        { p: "1-usul — workflow darajasida <code>on</code> orqali:" },
        { code: [
          "on:",
          "  push:",
          "    branches: [ main ]"
        ].join("\n") },
        { p: "2-usul — job darajasida <code>if</code> sharti orqali (bitta workflow ichida ham test, ham deploy bo'lsa):" },
        { code: [
          "jobs:",
          "  deploy:",
          "    if: github.ref == 'refs/heads/main'",
          "    runs-on: ubuntu-latest",
          "    steps:",
          "      - run: echo \"Faqat main da ishga tushdim\""
        ].join("\n") },
        { tip: "<code>github.ref</code> — joriy shoxcha/teg havolasi. <code>refs/heads/main</code> asosiy shoxcha degani. Bu shart PR'larda deploy'ni bloklaydi." },

        { h2: "Environment — muhitlar va himoya" },
        { p: "GitHub <strong>Environment</strong> tushunchasi deploy muhitlarini (masalan <code>production</code>, <code>staging</code>) ajratish va himoyalash uchun ishlatiladi. Settings &rarr; Environments'da yaratiladi." },
        { code: [
          "jobs:",
          "  deploy:",
          "    runs-on: ubuntu-latest",
          "    environment: production",
          "    steps:",
          "      - run: echo \"Production ga deploy\""
        ].join("\n") },
        { ul: [
          "Har bir environment'ning o'z secret'lari bo'lishi mumkin (production va staging uchun har xil kalitlar).",
          "<strong>Required reviewers:</strong> deploy oldidan qo'lda tasdiqlash talab qilinadi (Continuous Delivery).",
          "<strong>Wait timer:</strong> deploy oldidan kutish vaqti qo'yish mumkin."
        ]},

        { h2: "Deploy misoli 1 — GitHub Pages" },
        { p: "Statik saytni (React, Vite, oddiy HTML) GitHub Pages'ga deploy qilish eng sodda holat. Rasmiy action'lar buni oson qiladi:" },
        { code: [
          "name: Deploy to Pages",
          "",
          "on:",
          "  push:",
          "    branches: [ main ]",
          "",
          "permissions:",
          "  contents: read",
          "  pages: write",
          "  id-token: write",
          "",
          "jobs:",
          "  build-and-deploy:",
          "    runs-on: ubuntu-latest",
          "    environment:",
          "      name: github-pages",
          "    steps:",
          "      - uses: actions/checkout@v4",
          "",
          "      - uses: actions/setup-node@v4",
          "        with:",
          "          node-version: '20'",
          "          cache: 'npm'",
          "",
          "      - run: npm ci",
          "      - run: npm run build",
          "",
          "      - name: Pages sozlash",
          "        uses: actions/configure-pages@v5",
          "",
          "      - name: Artefaktni yuklash",
          "        uses: actions/upload-pages-artifact@v3",
          "        with:",
          "          path: ./dist",
          "",
          "      - name: Deploy",
          "        uses: actions/deploy-pages@v4"
        ].join("\n") },
        { p: "<code>permissions</code> bloki Pages'ga yozish huquqini beradi. <code>path: ./dist</code> — build natijasi papkasi (Vite'da <code>dist</code>, boshqa vositalarda farq qilishi mumkin)." },
        { note: "GitHub Pages'ni yoqish kerak: Settings &rarr; Pages &rarr; Source &rarr; \"GitHub Actions\". Shundan keyin workflow deploy qila oladi." },

        { h2: "Deploy misoli 2 — SSH orqali serverga" },
        { p: "O'z serveringizga (VPS) SSH orqali deploy qilish uchun tayyor action ishlatamiz. SSH maxfiy kalit secret sifatida saqlanadi:" },
        { code: [
          "  - name: Serverga SSH orqali deploy",
          "    uses: appleboy/ssh-action@v1",
          "    with:",
          "      host: ${{ secrets.SERVER_HOST }}",
          "      username: ${{ secrets.SERVER_USER }}",
          "      key: ${{ secrets.SSH_PRIVATE_KEY }}",
          "      script: |",
          "        cd /var/www/myapp",
          "        git pull origin main",
          "        npm ci --production",
          "        npm run build",
          "        pm2 restart myapp"
        ].join("\n") },
        { p: "<code>script:</code> ichidagi buyruqlar <em>uzoq server</em>da bajariladi: kod yangilanadi, bog'liqliklar o'rnatiladi, build qilinadi va ilova qayta ishga tushiriladi. Hamma maxfiy ma'lumot secrets'dan olinadi." },
        { warn: "SSH maxfiy kalitni (<code>SSH_PRIVATE_KEY</code>) juda ehtiyot bo'lib saqlang. U server'ga to'liq kirish huquqini beradi. Faqat deploy uchun alohida cheklangan kalit yaratish yaxshi amaliyot." },

        { h2: "CI va CD birga — to'liq pipeline" },
        { p: "Amalda CI (test) va CD (deploy) ko'pincha bitta workflow'da bog'lanadi. <code>needs</code> kaliti deploy'ni test muvaffaqiyatli tugagandan keyingina ishga tushiradi:" },
        { code: [
          "name: CI/CD",
          "",
          "on:",
          "  push:",
          "    branches: [ main ]",
          "  pull_request:",
          "",
          "jobs:",
          "  test:",
          "    runs-on: ubuntu-latest",
          "    steps:",
          "      - uses: actions/checkout@v4",
          "      - uses: actions/setup-node@v4",
          "        with:",
          "          node-version: '20'",
          "          cache: 'npm'",
          "      - run: npm ci",
          "      - run: npm test",
          "      - run: npm run build",
          "",
          "  deploy:",
          "    needs: test",
          "    if: github.ref == 'refs/heads/main'",
          "    runs-on: ubuntu-latest",
          "    environment: production",
          "    steps:",
          "      - uses: actions/checkout@v4",
          "      - name: Serverga deploy",
          "        uses: appleboy/ssh-action@v1",
          "        with:",
          "          host: ${{ secrets.SERVER_HOST }}",
          "          username: ${{ secrets.SERVER_USER }}",
          "          key: ${{ secrets.SSH_PRIVATE_KEY }}",
          "          script: |",
          "            cd /var/www/myapp",
          "            git pull origin main",
          "            npm ci --production",
          "            pm2 restart myapp"
        ].join("\n") },
        { p: "Mana bu haqiqiy CI/CD! Mantiq:" },
        { ul: [
          "<strong>test</strong> job har push va har PR'da ishlaydi (tekshiruv).",
          "<strong>deploy</strong> job <code>needs: test</code> tufayli faqat test o'tgach ishlaydi.",
          "<code>if: github.ref == 'refs/heads/main'</code> tufayli deploy faqat main'ga push'da bo'ladi — PR'larda emas.",
          "Buzuq kod hech qachon serverga chiqmaydi: testlar buzilsa, deploy umuman boshlanmaydi."
        ]},

        { h2: "Xavfsizlik va yaxshi amaliyotlar" },
        { ul: [
          "Maxfiy ma'lumotlarni <strong>doimo secrets</strong>'da saqlang, kodda emas.",
          "Deploy job'ni <code>if</code> va <code>needs</code> bilan himoyalang.",
          "<code>environment</code> orqali production uchun qo'lda tasdiqlash qo'ying (muhim loyihalarda).",
          "Deploy uchun <em>eng kam huquqli</em> kalit/token ishlating.",
          "Har bir deploy'ni Actions logida kuzatib boring — muammo bo'lsa tez orqaga qayting (rollback)."
        ]},

        { h2: "Xulosa" },
        { ul: [
          "<strong>Secrets</strong> (Settings &rarr; Secrets) maxfiy ma'lumotni shifrlangan saqlaydi; <code>${{ secrets.X }}</code> bilan olinadi.",
          "<strong>Shartli deploy:</strong> <code>on: push: branches: [main]</code> yoki job'da <code>if: github.ref == 'refs/heads/main'</code>.",
          "<strong>Environment</strong> muhitlarni ajratadi va qo'lda tasdiqlash/himoya qo'shadi.",
          "Deploy tayyor action'lar bilan qilinadi: GitHub Pages yoki SSH (<code>appleboy/ssh-action</code>).",
          "<code>needs: test</code> deploy'ni test o'tgach ishga tushiradi — CI va CD birga to'liq pipeline hosil qiladi.",
          "Buzuq kod hech qachon production'ga chiqmaydi — bu CI/CD ning asosiy va'dasi."
        ]}
      ]
    }
  ]
};
