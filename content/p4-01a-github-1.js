"use strict";

module.exports = {
  part: "4-qism: Amaliy vositalar",
  chapter: "Git va GitHub",
  lessons: [
    {
      slug: "git-github-nima",
      title: "Git va GitHub nima?",
      blurb: "Versiya nazorati (version control) nima va nega kerak; Git — mahalliy VCS; GitHub — bulutli platforma; ularning farqi; repozitoriy, commit va branch tushunchalari; muqobil xizmatlar (GitLab, Bitbucket).",
      body: [
        { lead: "Har qanday dasturchi ertami-kechmi kodini <em>saqlash</em>, <em>o'zgarishlarini kuzatish</em> va <em>boshqalar bilan birgalikda ishlash</em> muammosiga duch keladi. Aynan shu muammolarni <strong>Git</strong> nomli versiya nazorati tizimi va <strong>GitHub</strong> nomli bulutli platforma hal qiladi. Bu darsda ular nima ekanini, bir-biridan farqini va asosiy tushunchalarni oddiy tilda o'rganamiz." },

        { h2: "Versiya nazorati (version control) nima?" },
        { p: "<strong>Versiya nazorati tizimi</strong> (inglizcha <em>Version Control System</em>, qisqacha <em>VCS</em>) — bu fayllaringizdagi o'zgarishlarni vaqt bo'ylab kuzatib boruvchi va istalgan oldingi holatga qaytish imkonini beruvchi dasturdir. Oddiy qilib aytganda, u loyihangizning har bir muhim holatini <em>suratga oladi</em> va bularni saqlab qo'yadi." },
        { p: "Ko'pchilik yangi boshlovchilar VCS'siz ishlashga harakat qilib, fayllarni qo'lda nusxalaydi. Natijada papkalar quyidagi ko'rinishga keladi:" },
        { code: "loyiha/\nloyiha-yangi/\nloyiha-yangi-2/\nloyiha-oxirgi/\nloyiha-oxirgi-ROSTDAN-oxirgi/\nloyiha-ishlaydigan-versiya/" },
        { p: "Bu yondashuv juda tez chalkashlikka olib keladi: qaysi papkada nima o'zgargani, qaysi biri ishlayotgani va nima uchun o'zgartirilgani hech kimga ma'lum bo'lmaydi. Versiya nazorati aynan shu muammoni yo'qotadi — barcha versiyalar bitta joyda, izohlar bilan, tartibli saqlanadi." },
        { p: "Versiya nazorati sizga quyidagilarni beradi:" },
        { ul: [
          "<strong>O'zgarishlar tarixi:</strong> kim, qachon va nima uchun kodni o'zgartirganini aniq ko'rasiz;",
          "<strong>Orqaga qaytish:</strong> biror narsani buzib qo'ysangiz, avvalgi ishlaydigan holatga bir buyruq bilan qaytishingiz mumkin;",
          "<strong>Jamoaviy ishlash:</strong> bir nechta dasturchi bitta loyihada bir-birini bezovta qilmasdan ishlashi mumkin;",
          "<strong>Tarmoqlar (branch):</strong> asosiy kodni buzmasdan, alohida joyda yangi imkoniyat ustida ishlash mumkin;",
          "<strong>Zaxira nusxa:</strong> kod bulutda saqlansa, kompyuteringiz buzilsa ham loyihangiz yo'qolmaydi."
        ] },
        { note: "Versiya nazorati faqat dasturchilar uchun emas. Uni kitob yozuvchilar, tarjimonlar, dizaynerlar — matnli fayllar bilan ishlaydigan har kim ishlatishi mumkin. Ammo eng ko'p u dasturlash sohasida qo'llaniladi." },

        { h2: "Git nima?" },
        { p: "<strong>Git</strong> — bugungi kunda dunyodagi eng mashhur versiya nazorati tizimi. Uni 2005-yilda Linux operatsion tizimining yaratuvchisi <em>Linus Torvalds</em> ishlab chiqqan. Git bepul, ochiq kodli va deyarli barcha operatsion tizimlarda ishlaydi." },
        { p: "Git — bu <strong>taqsimlangan</strong> (distributed) versiya nazorati tizimi. Bu shuni anglatadiki, loyihaning to'liq tarixi <em>har bir dasturchining kompyuterida</em> to'liq nusxa sifatida saqlanadi. Ya'ni Git ishlashi uchun internetga ulanish shart emas — buyruqlarning aksariyati mahalliy (lokal) bajariladi." },
        { p: "Git mahalliy dastur bo'lgani uchun quyidagilarni internetsiz qila olasiz:" },
        { ul: [
          "O'zgarishlaringizni <em>commit</em> qilish (saqlash nuqtasini yaratish);",
          "Butun o'zgarishlar tarixini ko'rish;",
          "Yangi tarmoq (branch) yaratish va tarmoqlar orasida almashish;",
          "Oldingi versiyalar bilan farqlarni solishtirish;",
          "Xato holatlarni oldingi commit'ga qaytarish."
        ] },
        { note: "Git — bu kompyuteringizga o'rnatiladigan buyruq qatori (terminal) dasturi. Uni GitHub bilan chalkashtirmang: Git — vosita, GitHub esa shu vositadan foydalanadigan onlayn xizmat. Bu farqni pastda batafsil ko'ramiz." },

        { h2: "GitHub nima?" },
        { p: "<strong>GitHub</strong> — bu Git repozitoriylaringizni internetda (bulutda) saqlaydigan va jamoaviy ishlashni osonlashtiradigan onlayn platforma. U 2008-yilda ishga tushgan va hozirda dunyodagi eng katta dasturiy ta'minot manbasi (source code hosting) xizmatidir. 2018-yildan boshlab GitHub Microsoft kompaniyasiga tegishli." },
        { p: "GitHub'ni Git uchun bir <em>ijtimoiy tarmoq</em> deb tasavvur qilishingiz mumkin. U Git'ning barcha imkoniyatlariga qo'shimcha ravishda quyidagilarni beradi:" },
        { ul: [
          "<strong>Onlayn saqlash:</strong> kodingiz bulutda saqlanadi, istalgan joydan kirish mumkin;",
          "<strong>Hamkorlik:</strong> boshqalar bilan bitta loyihada birga ishlash, o'zgarishlarni ko'rib chiqish (code review);",
          "<strong>Pull request:</strong> o'zgartirishlarni asosiy kodga qo'shishdan oldin muhokama qilish mexanizmi;",
          "<strong>Issues:</strong> xato va vazifalarni kuzatib borish tizimi;",
          "<strong>GitHub Pages:</strong> saytlarni bepul joylashtirish (hosting) imkoniyati;",
          "<strong>Actions:</strong> testlash va joylashtirishni avtomatlashtirish (CI/CD)."
        ] },
        { p: "GitHub, shuningdek, dasturchi uchun bir <em>portfolio</em> vazifasini ham bajaradi. Ish beruvchilar ko'pincha nomzodning GitHub sahifasidagi loyihalarga qarab uning tajribasini baholaydi." },
        { tip: "Talabalar va o'qituvchilar uchun <em>GitHub Student Developer Pack</em> orqali ko'plab pullik vositalar bepul beriladi. Agar universitet yoki maktab pochtangiz bo'lsa, buni tekshirib ko'ring." },

        { h2: "Git va GitHub farqi" },
        { p: "Bu ikki tushuncha eng ko'p chalkashtiriladigan mavzu, shuning uchun ularni aniq ajratib olaylik. <strong>Git</strong> — dastur (vosita), <strong>GitHub</strong> — shu vosita asosida qurilgan xizmat." },
        { code: "Git                          GitHub\n-------------------------     -------------------------\nVosita (dastur)               Onlayn xizmat / platforma\nKompyuteringizga o'rnatiladi   Brauzerda ochiladi (sayt)\nInternetsiz ishlaydi          Internet talab qiladi\nMahalliy (lokal) saqlaydi     Bulutda saqlaydi\nBepul, ochiq kodli            Bepul reja + pullik rejalar\nTerminal buyruqlari           Grafik interfeys + Git" },
        { p: "Oddiy o'xshatish bilan aytadigan bo'lsak: <strong>Git</strong> — bu telefondagi rasm olish ilovasi, <strong>GitHub</strong> esa o'sha rasmlarni saqlaydigan va boshqalar bilan ulashadigan onlayn galereya (masalan, Google Photos'ga o'xshash). Git'siz GitHub deyarli foydasiz, ammo GitHub'siz Git'dan mahalliy ravishda bemalol foydalanish mumkin." },
        { warn: "Ko'p yangi boshlovchilar \"men GitHub o'rnatdim\" deb aytadi. Aslida kompyuterga <strong>Git</strong> o'rnatiladi. GitHub'ga esa brauzer orqali kirasiz — u alohida o'rnatishni talab qilmaydi (garchi qulaylik uchun GitHub Desktop nomli ixtiyoriy ilova mavjud bo'lsa ham)." },

        { h2: "Asosiy tushunchalar: repozitoriy, commit, branch" },
        { p: "Git bilan ishlashda tez-tez uchraydigan uchta muhim atama bor. Ularni hozir umumiy tanishtiramiz, keyingi darslarda esa har birini alohida chuqur o'rganamiz." },
        { h3: "Repozitoriy (repo)" },
        { p: "<strong>Repozitoriy</strong> (qisqacha <em>repo</em>) — bu loyihangiz uchun maxsus papka bo'lib, Git u yerdagi barcha fayllar va ularning to'liq o'zgarishlar tarixini kuzatib boradi. Texnik jihatdan repozitoriy — bu ichida yashirin <code>.git</code> papkasi bo'lgan oddiy loyiha papkasidir. Aynan shu <code>.git</code> papkasida Git barcha tarixni saqlaydi." },
        { p: "Repozitoriy ikki xil bo'ladi: <em>mahalliy</em> (kompyuteringizdagi) va <em>masofaviy</em> (GitHub'dagi). Odatda ular bir-biri bilan bog'lanadi va o'zgarishlar ular orasida almashtiriladi." },
        { h3: "Commit" },
        { p: "<strong>Commit</strong> — bu loyihangizning ma'lum bir vaqtdagi holatining <em>surati</em> (snapshot). Har bir commit'ga qisqa izoh (message) yozasiz, unda nima o'zgarganini tushuntirasiz. Commit'lar ketma-ket zanjir hosil qiladi va shu zanjir loyiha tarixini tashkil etadi." },
        { code: "Commit tarixi (yangidan eskiga):\n\n(c4) \"Kirish formasiga tekshiruv qo'shildi\"\n  |\n(c3) \"Bosh sahifa dizayni yangilandi\"\n  |\n(c2) \"README fayli qo'shildi\"\n  |\n(c1) \"Loyiha yaratildi\"" },
        { p: "Har bir commit noyob identifikatorga (hash) ega bo'ladi va oldingi commit'ga bog'lanadi. Shu tufayli siz istalgan commit'ga qaytib, loyiha o'sha paytda qanday bo'lganini ko'rishingiz mumkin." },
        { h3: "Branch (tarmoq)" },
        { p: "<strong>Branch</strong> (o'zbekcha <em>tarmoq</em>) — bu commit'lar zanjirining alohida yo'nalishi. Tarmoqlar sizga asosiy kodni buzmasdan, alohida joyda ish qilish imkonini beradi. Masalan, yangi imkoniyat ustida ishlayotganda alohida tarmoq ochasiz; u tayyor bo'lgach, asosiy tarmoqqa qo'shasiz (birlashtirish — <em>merge</em>)." },
        { code: "                (yangi-dizayn tarmog'i)\n                    o---o---o\n                   /\n  o---o---o---o---o                  (main tarmog'i)" },
        { p: "Standart holatda asosiy tarmoq <code>main</code> (avval <code>master</code> deb atalgan) deb nomlanadi. Amaliyotda dasturchilar har bir yangi vazifa uchun alohida tarmoq ochib, keyin uni asosiy tarmoqqa qo'shishadi." },
        { note: "Bu uchala tushuncha — repozitoriy, commit va branch — Git'ning poydevoridir. Hozir ularning ma'nosini eslab qolish kifoya; keyingi darslarda amaliy buyruqlar bilan mustahkamlaymiz." },

        { h2: "Oddiy ish oqimi (workflow)" },
        { p: "Git bilan kundalik ishlash odatda quyidagi bosqichlardan iborat. Buni umumiy tasavvur qilish uchun keltiryapmiz — batafsil buyruqlarni keyingi darslarda ko'ramiz:" },
        { code: "1. Fayllarni tahrirlaysiz (kod yozasiz)\n         |\n2. O'zgarishlarni tayyorlaysiz  ->  git add\n         |\n3. Commit qilib saqlaysiz       ->  git commit\n         |\n4. GitHub'ga yuborasiz          ->  git push\n         |\n5. Boshqalarning o'zgarishlarini olasiz  ->  git pull" },
        { p: "Bu oqim dastlab murakkab tuyulishi mumkin, ammo bir necha marta takrorlagandan keyin u avtomatik odatga aylanadi. Keyingi darslarda har bir bosqichni alohida-alohida, real misollar bilan o'rganamiz." },

        { h2: "Muqobil xizmatlar: GitLab, Bitbucket va boshqalar" },
        { p: "GitHub eng mashhur bo'lsa-da, u yagona variant emas. Git'ning o'zi ochiq standart bo'lgani uchun, ko'plab boshqa platformalar ham xuddi shu Git bilan ishlaydi:" },
        { ul: [
          "<strong>GitLab</strong> — GitHub'ga eng kuchli raqib. Uni o'z serveringizga o'rnatish (self-hosted) imkoniyati borligi bilan ajralib turadi. Ko'plab kompaniyalar ichki loyihalar uchun aynan GitLab'ni tanlaydi;",
          "<strong>Bitbucket</strong> — Atlassian kompaniyasiga tegishli. Jira va Trello kabi boshqa Atlassian mahsulotlari bilan yaxshi integratsiyalashadi;",
          "<strong>Gitea</strong> va <strong>Codeberg</strong> — yengil, ochiq kodli muqobillar, o'z serveringizda ishlatish uchun qulay;",
          "<strong>SourceHut</strong> — minimalist va tezkorlikka urg'u beruvchi platforma."
        ] },
        { p: "Muhim jihat shundaki, bu platformalarning barchasi <strong>bir xil Git vositasini</strong> ishlatadi. Ya'ni Git buyruqlarini bir marta o'rgansangiz, ularni GitHub'da ham, GitLab'da ham, Bitbucket'da ham bir xil ishlata olasiz. O'zgaradigan narsa — faqat platformaning veb-interfeysi va qo'shimcha imkoniyatlari." },
        { tip: "Yangi boshlovchi sifatida GitHub'dan boshlash eng oqilona qaror. U eng katta jamiyatga, eng ko'p o'quv materialiga ega va aksariyat ochiq kodli loyihalar aynan shu yerda joylashgan. Keyinchalik boshqa platformalarga o'tish oson bo'ladi." },

        { h2: "Xulosa" },
        { ul: [
          "<strong>Versiya nazorati (VCS)</strong> — fayllardagi o'zgarishlarni vaqt bo'ylab kuzatuvchi va oldingi holatlarga qaytish imkonini beruvchi tizim;",
          "<strong>Git</strong> — kompyuterga o'rnatiladigan, internetsiz ishlaydigan, eng mashhur taqsimlangan versiya nazorati vositasi;",
          "<strong>GitHub</strong> — Git repozitoriylarini bulutda saqlaydigan va jamoaviy ishlashni ta'minlaydigan onlayn platforma;",
          "Git — <em>vosita</em>, GitHub — shu vosita asosidagi <em>xizmat</em>; ularni chalkashtirmaslik kerak;",
          "<strong>Repozitoriy</strong> — loyiha papkasi va uning tarixi; <strong>commit</strong> — loyihaning bir holati sur'ati; <strong>branch</strong> — commit'lar zanjirining alohida yo'nalishi;",
          "GitLab, Bitbucket va boshqa platformalar ham xuddi shu Git bilan ishlaydi — buyruqlar bir xil bo'ladi."
        ] }
      ]
    },

    {
      slug: "git-ornatish",
      title: "Git o'rnatish va sozlash",
      blurb: "Git'ni Windows, macOS va Linux'ga o'rnatish; git --version orqali tekshirish; birinchi sozlash — git config bilan ism va elektron pochta; SSH kalit yaratish (ssh-keygen) va GitHub'ga qo'shish; git config --list.",
      body: [
        { lead: "Git bilan ishlashni boshlashdan oldin uni kompyuteringizga <strong>o'rnatish</strong> va bir marta <strong>sozlash</strong> kerak. Bu darsda barcha operatsion tizimlar uchun o'rnatish yo'llarini, birinchi sozlamalarni va GitHub'ga xavfsiz ulanish uchun SSH kalitini yaratishni bosqichma-bosqich ko'rib chiqamiz." },

        { h2: "Git o'rnatilganini tekshirish" },
        { p: "Ba'zi tizimlarda (ayniqsa macOS va Linux'da) Git avvaldan o'rnatilgan bo'lishi mumkin. Shuning uchun avval tekshirib ko'ramiz. Terminal (buyruqlar qatori) oynasini oching va quyidagini yozing:" },
        { code: "git --version" },
        { p: "Agar Git o'rnatilgan bo'lsa, quyidagiga o'xshash javob chiqadi (raqamlar farq qilishi mumkin):" },
        { code: "git version 2.43.0" },
        { p: "Agar <em>\"command not found\"</em> yoki <em>\"buyruq topilmadi\"</em> kabi xato chiqsa, demak Git hali o'rnatilmagan — quyidagi bo'limlardan o'z tizimingizga mos yo'riqnomani bajaring." },
        { note: "<strong>Terminal</strong> — bu buyruqlarni matn ko'rinishida kiritadigan dastur. Windows'da \"Command Prompt\", \"PowerShell\" yoki Git bilan keladigan \"Git Bash\"; macOS'da \"Terminal\"; Linux'da esa \"Terminal\" deb ataladi." },

        { h2: "Windows'ga o'rnatish" },
        { p: "Windows uchun eng oson yo'l — rasmiy o'rnatuvchini yuklab olish. <a href=\"https://git-scm.com/download/win\">git-scm.com/download/win</a> manziliga kiring, o'rnatuvchi avtomatik yuklab olinadi. Uni ishga tushiring va bosqichlarni bajaring — aksariyat sozlamalarni standart holatida qoldirish mumkin (\"Next\" tugmasini bosaverib)." },
        { p: "O'rnatish tugagach, birga keladigan <strong>Git Bash</strong> dasturidan foydalanish qulay — u Linux'dagi kabi terminal muhitini beradi. Muqobil sifatida <em>winget</em> paket menejeri orqali ham o'rnatish mumkin:" },
        { code: "winget install --id Git.Git -e --source winget" },
        { p: "Yoki <em>Chocolatey</em> paket menejeri o'rnatilgan bo'lsa:" },
        { code: "choco install git" },
        { tip: "O'rnatish jarayonida \"Adjusting your PATH environment\" bosqichida standart variant (\"Git from the command line and also from 3rd-party software\") tanlangan bo'lsin — shunda Git'ni istalgan terminaldan chaqira olasiz." },

        { h2: "macOS'ga o'rnatish" },
        { p: "macOS'da Git'ni o'rnatishning bir necha yo'li bor. Eng oddiy usul — Xcode buyruqlar qatori vositalarini o'rnatishdir. Terminalda quyidagini yozing:" },
        { code: "xcode-select --install" },
        { p: "Ochilgan oynada \"Install\" tugmasini bosing. Bu Git bilan birga boshqa foydali dasturlash vositalarini ham o'rnatadi." },
        { p: "Agar <strong>Homebrew</strong> paket menejeri o'rnatilgan bo'lsa (ko'pchilik dasturchilar ishlatadi), eng yangi Git versiyasini quyidagicha o'rnatishingiz mumkin:" },
        { code: "brew install git" },
        { note: "Homebrew orqali o'rnatilgan Git odatda tizimdagidan yangiroq bo'ladi. Agar Homebrew hali o'rnatilmagan bo'lsa, <a href=\"https://brew.sh\">brew.sh</a> saytidagi ko'rsatmalarga amal qiling." },

        { h2: "Linux'ga o'rnatish" },
        { p: "Linux'da Git deyarli har doim tizimning paket menejeri orqali o'rnatiladi. Buyruq sizning distributivingizga bog'liq." },
        { h3: "Ubuntu / Debian oilasi" },
        { code: "sudo apt update\nsudo apt install git" },
        { h3: "Fedora" },
        { code: "sudo dnf install git" },
        { h3: "Arch Linux / Manjaro" },
        { code: "sudo pacman -S git" },
        { h3: "openSUSE" },
        { code: "sudo zypper install git" },
        { p: "Bu yerda <code>sudo</code> — buyruqni administrator huquqlari bilan bajarish uchun kerak; tizim sizdan parolingizni so'rashi mumkin." },
        { note: "O'rnatishdan so'ng barcha tizimlarda <code>git --version</code> buyrug'ini qayta bajarib, o'rnatish muvaffaqiyatli bo'lganiga ishonch hosil qiling." },

        { h2: "Birinchi sozlash: ism va elektron pochta" },
        { p: "Git o'rnatilgandan keyin qiladigan birinchi ishingiz — o'zingizni tanishtirish. Har bir commit'ga uni kim yaratganini bildiruvchi <strong>ism</strong> va <strong>elektron pochta</strong> yozib qo'yiladi. Buni bir marta sozlab qo'ysangiz, keyin har bir commit'da avtomatik ishlatiladi." },
        { code: "git config --global user.name \"Ali Valiyev\"\ngit config --global user.email \"ali@example.com\"" },
        { p: "Bu buyruqlarni tahlil qilaylik:" },
        { ul: [
          "<code>git config</code> — Git sozlamalarini o'zgartiruvchi buyruq;",
          "<code>--global</code> — bu sozlama shu kompyuterdagi <em>barcha</em> repozitoriylar uchun amal qiladi degani;",
          "<code>user.name</code> va <code>user.email</code> — o'rnatilayotgan sozlamalarning nomi;",
          "Tirnoq ichidagi qism — siz kiritayotgan qiymat."
        ] },
        { warn: "Ismingizni va pochtangizni tirnoq ichida yozing, ayniqsa ismda probel bo'lsa. GitHub'da ro'yxatdan o'tgan pochtangizni ishlatish tavsiya etiladi — shunda commit'lar sizning GitHub profilingizga to'g'ri bog'lanadi." },
        { p: "Alohida bir loyiha uchun boshqa ism/pochta kerak bo'lsa, <code>--global</code>siz, o'sha repozitoriy ichida ishga tushiring — u faqat shu loyihaga ta'sir qiladi:" },
        { code: "git config user.email \"ish.pochtam@company.com\"" },

        { h2: "Foydali qo'shimcha sozlamalar" },
        { p: "Ba'zi sozlamalar ish qulayligini oshiradi. Ular majburiy emas, lekin tavsiya etiladi." },
        { p: "Yangi repozitoriylarda asosiy tarmoq nomini <code>main</code> qilib belgilash (ba'zi eski Git versiyalari standart holatda <code>master</code> ishlatadi):" },
        { code: "git config --global init.defaultBranch main" },
        { p: "Git chiqaradigan matnlarni rangli qilish (o'qishni osonlashtiradi):" },
        { code: "git config --global color.ui auto" },
        { p: "Matn muharririni sozlash — masalan, VS Code'ni Git uchun standart muharrir qilish:" },
        { code: "git config --global core.editor \"code --wait\"" },
        { tip: "Windows va macOS/Linux o'rtasida fayllardagi qator oxiri belgilari (line endings) farq qiladi. Muammolarni oldini olish uchun Windows'da <code>git config --global core.autocrlf true</code>, macOS/Linux'da esa <code>git config --global core.autocrlf input</code> qo'yish tavsiya etiladi." },

        { h2: "SSH kalit nima va nega kerak?" },
        { p: "GitHub'ga kod yuborishning ikki asosiy usuli bor: <strong>HTTPS</strong> va <strong>SSH</strong>. HTTPS'da har safar (yoki token orqali) parol so'raladi. <strong>SSH</strong> esa kompyuteringizni GitHub'ga bir marta ishonchli tarzda bog'lab qo'yadi — keyin har safar parol kiritish shart bo'lmaydi." },
        { p: "SSH kaliti — <em>juftlik</em> ko'rinishida bo'ladi: <strong>maxfiy kalit</strong> (private key, kompyuteringizda qoladi, hech kimga bermaysiz) va <strong>ochiq kalit</strong> (public key, GitHub'ga qo'shasiz). Bular birgalikda sizni xavfsiz tanib olish imkonini beradi." },
        { warn: "Maxfiy (private) kalitni <strong>hech qachon</strong> hech kimga bermang va internetga joylamang. Faqat ochiq (public, <code>.pub</code> bilan tugaydigan) kalitni GitHub'ga qo'shasiz." },

        { h2: "SSH kalit yaratish (ssh-keygen)" },
        { p: "SSH kaliti yaratish uchun quyidagi buyruqdan foydalanamiz. Pochta manzilini o'zingiznikiga o'zgartiring — u shunchaki kalitga izoh (label) sifatida qo'shiladi:" },
        { code: "ssh-keygen -t ed25519 -C \"ali@example.com\"" },
        { p: "Buyruq qismlari:" },
        { ul: [
          "<code>ssh-keygen</code> — SSH kalit juftligini yaratuvchi dastur;",
          "<code>-t ed25519</code> — kalit turi; <em>ed25519</em> — zamonaviy, xavfsiz va tez tur;",
          "<code>-C \"...\"</code> — kalitga izoh (odatda pochta manzili qo'yiladi)."
        ] },
        { note: "Agar tizimingiz eski bo'lib, <em>ed25519</em>ni qo'llab-quvvatlamasa, muqobil sifatida quyidagini ishlating: <code>ssh-keygen -t rsa -b 4096 -C \"ali@example.com\"</code>." },
        { p: "Buyruqni ishga tushirgach, u sizdan bir necha savol so'raydi:" },
        { ul: [
          "<strong>Kalitni saqlash joyi:</strong> shunchaki <em>Enter</em> bosing — standart joy (<code>~/.ssh/id_ed25519</code>) tanlanadi;",
          "<strong>Parol (passphrase):</strong> ixtiyoriy qo'shimcha himoya. Bo'sh qoldirish mumkin (yana <em>Enter</em>) yoki qo'shimcha xavfsizlik uchun parol kiritish mumkin."
        ] },
        { p: "Yaratilgach, ikki fayl paydo bo'ladi: <code>id_ed25519</code> (maxfiy kalit) va <code>id_ed25519.pub</code> (ochiq kalit). Ochiq kalitni ekranga chiqarish uchun:" },
        { code: "cat ~/.ssh/id_ed25519.pub" },
        { p: "Natija <code>ssh-ed25519</code> bilan boshlanadi va sizning pochtangiz bilan tugaydi. Butun shu satrni (bir qatordagi hammasini) nusxa oling — u GitHub'ga qo'shiladigan ochiq kalitdir." },

        { h2: "Ochiq kalitni GitHub'ga qo'shish" },
        { p: "Endi ochiq kalitni GitHub hisobingizga qo'shamiz. Bu bosqich brauzerda bajariladi:" },
        { ol: [
          "GitHub'ga kiring va o'ng yuqoridagi profil rasmiga bosing;",
          "<strong>Settings</strong> (Sozlamalar) bo'limiga o'ting;",
          "Chap menyudan <strong>SSH and GPG keys</strong> ni tanlang;",
          "<strong>New SSH key</strong> tugmasini bosing;",
          "<em>Title</em> maydoniga kalitni tanib oladigan nom yozing (masalan, \"Uy kompyuteri\");",
          "<em>Key</em> maydoniga yuqorida nusxa olgan ochiq kalitni to'liq joylashtiring;",
          "<strong>Add SSH key</strong> tugmasini bosib saqlang."
        ] },
        { p: "Ulanish to'g'ri sozlanganini tekshirish uchun quyidagi buyruqni ishga tushiring:" },
        { code: "ssh -T git@github.com" },
        { p: "Birinchi marta u ishonch haqida so'rashi mumkin — <code>yes</code> deb javob bering. So'ng quyidagiga o'xshash muvaffaqiyatli xabar chiqadi (foydalanuvchi nomingiz bilan):" },
        { code: "Hi aliValiyev! You've successfully authenticated,\nbut GitHub does not provide shell access." },
        { tip: "Bu xabardagi \"does not provide shell access\" (\"terminalga kirish bermaydi\") qismi <em>xato emas</em> — bu normal holat. Muhim qismi \"successfully authenticated\" (\"muvaffaqiyatli tasdiqlandi\") degan iboradir." },

        { h2: "Barcha sozlamalarni ko'rish: git config --list" },
        { p: "Qilingan barcha sozlamalarni bir joyda ko'rish uchun:" },
        { code: "git config --list" },
        { p: "Bu buyruq barcha faol sozlamalarni <code>kalit=qiymat</code> ko'rinishida chiqaradi:" },
        { code: "user.name=Ali Valiyev\nuser.email=ali@example.com\ninit.defaultbranch=main\ncolor.ui=auto" },
        { p: "Faqat bitta sozlama qiymatini bilmoqchi bo'lsangiz, uning nomini ko'rsating:" },
        { code: "git config user.name" },
        { p: "Global sozlamalar joylashgan faylni ko'rish uchun:" },
        { code: "git config --list --show-origin" },
        { note: "Global sozlamalar aslida uy papkangizdagi <code>.gitconfig</code> nomli oddiy matnli faylda saqlanadi. Uni istalgan matn muharririda ochib, qo'lda ham tahrirlash mumkin — ammo yangi boshlovchilar uchun <code>git config</code> buyrug'idan foydalanish xavfsizroq." },

        { h2: "Xulosa" },
        { ul: [
          "Git o'rnatilganini <code>git --version</code> buyrug'i bilan tekshiriladi;",
          "Windows'da git-scm.com yoki winget/choco orqali; macOS'da xcode-select yoki brew orqali; Linux'da paket menejeri (apt, dnf, pacman) orqali o'rnatiladi;",
          "Birinchi ish — <code>git config --global user.name</code> va <code>user.email</code> orqali o'zingizni tanishtirish;",
          "<code>init.defaultBranch main</code> va <code>color.ui auto</code> kabi qo'shimcha sozlamalar ish qulayligini oshiradi;",
          "<strong>SSH kalit</strong> GitHub'ga parolsiz, xavfsiz ulanishni ta'minlaydi; u <code>ssh-keygen -t ed25519</code> bilan yaratiladi;",
          "Faqat <strong>ochiq</strong> (<code>.pub</code>) kalit GitHub'ga qo'shiladi; maxfiy kalit hech qachon ulashilmaydi;",
          "<code>ssh -T git@github.com</code> ulanishni tekshiradi; <code>git config --list</code> barcha sozlamalarni ko'rsatadi."
        ] }
      ]
    },

    {
      slug: "git-asoslar",
      title: "Git asosiy buyruqlari",
      blurb: "git init bilan repozitoriy yaratish; git status; git add (fayl va nuqta); git commit -m; git log va --oneline; ishchi katalog, staging va repozitoriy tushunchalari; faylni o'zgartirish oqimi; git diff bilan farqlarni ko'rish.",
      body: [
        { lead: "Endi Git bilan haqiqiy ish boshlaymiz. Bu darsda kundalik amaliyotda eng ko'p ishlatiladigan buyruqlarni — repozitoriy yaratishdan tortib o'zgarishlarni saqlashgacha — real misollar bilan bosqichma-bosqich o'rganamiz. Har bir buyruqni yozib, natijasini ko'rib chiqamiz." },

        { h2: "Git'ning uch bo'limi: ishchi katalog, staging, repozitoriy" },
        { p: "Git'ni tushunish uchun uning uch asosiy <em>hududini</em> bilish shart. Bir fayl ushbu bo'limlar orasida harakatlanadi:" },
        { ul: [
          "<strong>Ishchi katalog (working directory):</strong> haqiqiy fayllaringiz joylashgan papka — siz tahrirlayotgan joy;",
          "<strong>Staging (indeks, sahna):</strong> keyingi commit'ga <em>tayyorlangan</em> o'zgarishlar to'plami. Bu \"vaqtincha savat\" kabi — nimani saqlashni shu yerda tanlaysiz;",
          "<strong>Repozitoriy (.git):</strong> commit qilingan o'zgarishlar doimiy saqlanadigan tarix."
        ] },
        { code: "Ishchi katalog        Staging            Repozitoriy\n(tahrirlayotgan)  ->  (tayyorlangan)  ->  (saqlangan tarix)\n                 add               commit" },
        { p: "Ya'ni fayl avval <code>git add</code> bilan staging'ga qo'yiladi, so'ng <code>git commit</code> bilan repozitoriyga doimiy yoziladi. Bu ikki bosqichli tizim sizga <em>aynan nimani</em> saqlashni aniq nazorat qilish imkonini beradi." },
        { note: "Nega ikki bosqich? Tasavvur qiling, siz o'nlab faylni o'zgartirdingiz, ammo faqat 2 tasini birga saqlamoqchisiz. Staging aynan shuni imkon beradi: kerakli fayllarni <code>add</code> qilib, faqat ularni commit qilasiz." },

        { h2: "git init — repozitoriy yaratish" },
        { p: "Har qanday papkani Git repozitoriysiga aylantirish uchun <code>git init</code> buyrug'i ishlatiladi. Avval loyiha papkangizga o'ting, so'ng buyruqni bajaring:" },
        { code: "mkdir mening-loyiham\ncd mening-loyiham\ngit init" },
        { p: "Bu yerda <code>mkdir</code> yangi papka yaratadi, <code>cd</code> o'sha papkaga kiradi, <code>git init</code> esa uni repozitoriyga aylantiradi. Muvaffaqiyatli bajarilsa, quyidagiga o'xshash xabar chiqadi:" },
        { code: "Initialized empty Git repository in /home/ali/mening-loyiham/.git/" },
        { p: "Aslida <code>git init</code> qiladigan yagona ish — papka ichida yashirin <code>.git</code> nomli katalog yaratish. Aynan shu katalogda Git barcha tarixni saqlaydi. Uni o'chirsangiz, papka oddiy papkaga aylanadi (fayllar qoladi, lekin tarix yo'qoladi)." },
        { warn: "<code>git init</code>ni uy papkangizda yoki noto'g'ri joyda tasodifan bajarmang. Uni faqat aniq loyiha papkangiz ichida ishga tushiring, aks holda butun kompyuteringizni kuzatishga urinib, chalkashlik yuzaga keladi." },

        { h2: "git status — hozirgi holatni ko'rish" },
        { p: "<code>git status</code> — Git bilan ishlashda eng ko'p ishlatiladigan buyruq. U hozirgi holatni ko'rsatadi: qaysi fayllar o'zgargan, qaysilari staging'da, qaysilari hali kuzatilmayapti. Har bir amaldan oldin va keyin uni ishlatish yaxshi odat." },
        { code: "git status" },
        { p: "Yangi, bo'sh repozitoriyda natija shunday bo'ladi:" },
        { code: "On branch main\n\nNo commits yet\n\nnothing to commit (create/copy files and use \"git add\" to track)" },
        { p: "Endi papkaga bitta fayl qo'shaylik va holatni yana ko'raylik:" },
        { code: "echo \"# Mening loyiham\" > README.md\ngit status" },
        { p: "Bu safar Git yangi faylni <em>kuzatilmayotgan</em> (untracked) deb ko'rsatadi:" },
        { code: "On branch main\n\nNo commits yet\n\nUntracked files:\n  (use \"git add <file>...\" to include in what will be committed)\n        README.md\n\nnothing added to commit but untracked files present" },
        { note: "<strong>Untracked</strong> (kuzatilmagan) fayl — Git hali \"bilmaydigan\" yangi fayl. Uni tarixga qo'shish uchun avval <code>git add</code> qilish kerak. Git chiqarayotgan xabarlar odatda keyingi qadamni ham aytib beradi — ularni o'qish foydali." },

        { h2: "git add — o'zgarishlarni staging'ga qo'shish" },
        { p: "<code>git add</code> fayllarni <em>ishchi katalogdan</em> <em>staging'ga</em> ko'chiradi — ya'ni ularni keyingi commit uchun tayyorlaydi. Bitta faylni qo'shish uchun uning nomini yozing:" },
        { code: "git add README.md" },
        { p: "Endi <code>git status</code> faylni yashil rangda, staging'ga qo'shilgan (\"changes to be committed\") holida ko'rsatadi:" },
        { code: "On branch main\n\nNo commits yet\n\nChanges to be committed:\n  (use \"git rm --cached <file>...\" to unstage)\n        new file:   README.md" },
        { p: "Bir nechta faylni birga qo'shish uchun ularni ketma-ket yozish yoki barchasini <strong>nuqta</strong> (<code>.</code>) bilan qo'shish mumkin:" },
        { code: "git add fayl1.txt fayl2.txt\n\n# yoki barcha o'zgargan fayllarni birdan:\ngit add ." },
        { p: "Bu yerda <code>git add .</code> — joriy papka va uning barcha ostki papkalaridagi o'zgargan/yangi fayllarni bir vaqtda staging'ga qo'shadi. Bu eng ko'p ishlatiladigan shakl." },
        { tip: "<code>git add .</code> qulay, lekin ehtiyot bo'ling — u <em>hamma narsani</em> qo'shadi. Muhim bo'lmagan yoki maxfiy fayllar (masalan parollar) tasodifan qo'shilmasligi uchun <code>.gitignore</code> faylidan foydalaning va vaqti-vaqti bilan <code>git status</code>ni tekshiring." },

        { h2: "git commit — o'zgarishlarni saqlash" },
        { p: "Staging'dagi o'zgarishlarni doimiy tarixga yozish uchun <code>git commit</code> ishlatiladi. Har bir commit'ga qisqa <em>izoh</em> (message) yozish shart — u nima o'zgarganini tushuntiradi. Izohni <code>-m</code> bayrog'i bilan beriladi:" },
        { code: "git commit -m \"Birinchi commit: README qo'shildi\"" },
        { p: "Muvaffaqiyatli bajarilgach, Git commit haqida qisqa ma'lumot chiqaradi:" },
        { code: "[main (root-commit) a1b2c3d] Birinchi commit: README qo'shildi\n 1 file changed, 1 insertion(+)\n create mode 100644 README.md" },
        { p: "Bu yerda:" },
        { ul: [
          "<code>main</code> — commit qilingan tarmoq nomi;",
          "<code>a1b2c3d</code> — commit'ning noyob identifikatori (hash) boshlanishi;",
          "<code>1 file changed, 1 insertion(+)</code> — o'zgarishlar statistikasi (1 fayl, 1 qator qo'shildi)."
        ] },
        { warn: "<code>-m</code> bayrog'isiz <code>git commit</code> yozsangiz, Git izoh yozishingiz uchun matn muharririni ochadi. Agar bilmagan muharrir (masalan Vim) ochilib qolsa, chiqib ketolmay qolishingiz mumkin. Yangi boshlovchilar uchun har doim <code>-m \"izoh\"</code> shaklini ishlatish osonroq." },
        { p: "Yaxshi commit izohi qisqa, aniq va o'zgarish <em>nimani</em> qilishini tushuntiradigan bo'lishi kerak. Yomon va yaxshi misollar:" },
        { code: "# Yomon (ma'nosiz):\ngit commit -m \"o'zgarish\"\ngit commit -m \"tuzatish\"\n\n# Yaxshi (aniq):\ngit commit -m \"Kirish formasiga email tekshiruvi qo'shildi\"\ngit commit -m \"Bosh sahifadagi sarlavha xatosi tuzatildi\"" },

        { h2: "git log — commit tarixini ko'rish" },
        { p: "Qilingan barcha commit'larni ko'rish uchun <code>git log</code> ishlatiladi. U eng yangi commit'dan boshlab, har birining hash'i, muallifi, sanasi va izohini ko'rsatadi:" },
        { code: "git log" },
        { code: "commit a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0\nAuthor: Ali Valiyev <ali@example.com>\nDate:   Tue Jul 1 10:30:00 2026 +0500\n\n    Birinchi commit: README qo'shildi" },
        { p: "To'liq log ba'zan juda uzun bo'ladi. Uni ixchamroq, bir qatorli ko'rinishda ko'rish uchun <code>--oneline</code> bayrog'ini qo'shing:" },
        { code: "git log --oneline" },
        { code: "c4d5e6f Bosh sahifa dizayni yangilandi\nb2c3d4e README fayli yangilandi\na1b2c3d Birinchi commit: README qo'shildi" },
        { p: "Bu ko'rinishda har commit qisqa hash va izoh bilan bir qatorga sig'adi — tarixni tez ko'zdan kechirish uchun juda qulay. Yana bir foydali variant — commit'lar va tarmoqlarni grafik ko'rinishda chiqarish:" },
        { code: "git log --oneline --graph --all" },
        { tip: "<code>git log</code> ochilganda ekran ba'zan \"to'xtab\" qoladi (pager rejimi). Undan chiqish uchun <strong>q</strong> (quit) harfini bosing. Yuqoriga-pastga strelka tugmalari bilan yurish mumkin." },

        { h2: "Faylni o'zgartirish oqimi (to'liq misol)" },
        { p: "Endi barcha buyruqlarni birga, real ish oqimi ko'rinishida ko'raylik. Aytaylik, mavjud <code>README.md</code> faylini o'zgartiramiz:" },
        { code: "# 1. Faylni o'zgartiramiz (yangi qator qo'shamiz)\necho \"Bu loyiha Git o'rganish uchun.\" >> README.md\n\n# 2. Holatni tekshiramiz\ngit status\n\n# 3. O'zgarishni staging'ga qo'yamiz\ngit add README.md\n\n# 4. Commit qilamiz\ngit commit -m \"README'ga loyiha tavsifi qo'shildi\"\n\n# 5. Tarixni ko'ramiz\ngit log --oneline" },
        { p: "2-qadamdagi <code>git status</code> bu safar faylni <em>o'zgartirilgan</em> (modified) deb ko'rsatadi — chunki fayl yangi emas, avval commit qilingan, endi tahrirlangan:" },
        { code: "Changes not staged for commit:\n  (use \"git add <file>...\" to update what will be committed)\n        modified:   README.md" },
        { note: "E'tibor bering: yangi fayl <strong>untracked</strong>, avval commit qilinib keyin o'zgartirilgan fayl esa <strong>modified</strong> deb belgilanadi. Ikkalasi ham <code>git add</code> orqali staging'ga qo'shiladi — jarayon bir xil." },

        { h2: "git diff — farqlarni ko'rish" },
        { p: "<code>git diff</code> fayllardagi <em>aniq nima o'zgarganini</em> qator-qatorlab ko'rsatadi. Bu commit qilishdan oldin \"men nima o'zgartirdim?\" degan savolga javob beradi. Staging'ga qo'yilmagan o'zgarishlarni ko'rish uchun:" },
        { code: "git diff" },
        { p: "Natijada qo'shilgan qatorlar <code>+</code> bilan, o'chirilgan qatorlar esa <code>-</code> bilan ko'rsatiladi:" },
        { code: "diff --git a/README.md b/README.md\nindex 1a2b3c4..5d6e7f8 100644\n--- a/README.md\n+++ b/README.md\n@@ -1,1 +1,2 @@\n # Mening loyiham\n+Bu loyiha Git o'rganish uchun." },
        { p: "Agar o'zgarishlarni allaqachon <code>git add</code> bilan staging'ga qo'ygan bo'lsangiz, oddiy <code>git diff</code> hech nima ko'rsatmaydi. Staging'dagi (commit'ga tayyorlangan) farqlarni ko'rish uchun <code>--staged</code> bayrog'ini qo'shing:" },
        { code: "git diff --staged" },
        { p: "Amaliyotdagi tartib odatda shunday: avval <code>git diff</code> bilan o'zgarishlarni ko'rib chiqasiz, so'ng ishonch hosil qilib, <code>git add</code> va <code>git commit</code> qilasiz." },
        { tip: "Commit qilishdan oldin <code>git diff</code> yoki <code>git status</code>ni ko'rib chiqishni odat qiling. Bu tasodifan kerakmas o'zgarish yoki maxfiy ma'lumotni saqlab qo'yishning oldini oladi." },

        { h2: "Kundalik buyruqlar tartibi (qisqa eslatma)" },
        { p: "Yuqoridagi barcha buyruqlarni bitta ketma-ketlikda jamlaymiz — bu Git bilan har kungi ishning asosiy takrorlanadigan sikli:" },
        { code: "git status                 # nima o'zgarganini ko'rish\ngit diff                   # aniq farqlarni ko'rish\ngit add .                  # o'zgarishlarni tayyorlash\ngit commit -m \"izoh\"        # saqlash\ngit log --oneline          # tarixni tekshirish" },
        { note: "Bu besh buyruq Git ishining 80% ni tashkil etadi. Ularni yaxshi o'zlashtirib olsangiz, keyingi darslardagi murakkabroq mavzular (tarmoqlar, GitHub'ga yuborish) ancha oson tuyuladi." },

        { h2: "Xulosa" },
        { ul: [
          "Git uch hududdan iborat: <strong>ishchi katalog</strong>, <strong>staging</strong> (tayyorlangan o'zgarishlar) va <strong>repozitoriy</strong> (saqlangan tarix);",
          "<code>git init</code> papkani repozitoriyga aylantiradi (yashirin <code>.git</code> katalogini yaratadi);",
          "<code>git status</code> hozirgi holatni ko'rsatadi — eng ko'p ishlatiladigan tekshiruv buyrug'i;",
          "<code>git add fayl</code> yoki <code>git add .</code> o'zgarishlarni staging'ga qo'yadi;",
          "<code>git commit -m \"izoh\"</code> o'zgarishlarni doimiy tarixga aniq izoh bilan saqlaydi;",
          "<code>git log</code> tarixni, <code>git log --oneline</code> esa uni ixcham ko'rinishda ko'rsatadi;",
          "<code>git diff</code> staging'ga qo'yilmagan, <code>git diff --staged</code> esa tayyorlangan farqlarni ko'rsatadi;",
          "Kundalik sikl: <code>status</code> &rarr; <code>diff</code> &rarr; <code>add</code> &rarr; <code>commit</code> &rarr; <code>log</code>."
        ] }
      ]
    }
  ]
};
