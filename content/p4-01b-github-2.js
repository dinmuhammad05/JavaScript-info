"use strict";

module.exports = {
  part: "4-qism: Amaliy vositalar",
  chapter: "Git va GitHub",
  lessons: [
    {
      slug: "git-branch-merge",
      title: "Branch va birlashtirish (merge)",
      blurb: "Branch (shox) nima va nega kerak, git branch, git checkout, zamonaviy git switch, git checkout -b bilan yangi branch yaratish, branch'larni git merge bilan birlashtirish, merge konflikti va uni hal qilish, keraksiz branch'ni git branch -d bilan o'chirish.",
      body: [
        { lead: "Branch (o'zbekcha: <em>shox</em> yoki <em>tarmoq</em>) — Git'ning eng kuchli imkoniyatlaridan biri. U sizga asosiy kodga tegmasdan, alohida yo'nalishda ishlashga imkon beradi. Yangi funksiya yozmoqchimisiz, yoki xatoni tuzatmoqchimisiz — buni alohida branch'da qilib, tayyor bo'lgach asosiy kodga birlashtirasiz. Ushbu darsda branch yaratish, ular orasida o'tish, birlashtirish (merge) va merge konfliktini hal qilishni chuqur o'rganamiz." },

        { note: "Bu darsdagi barcha buyruqlar terminalda (buyruq qatorida) ishga tushiriladi. Ular Git o'rnatilgan mahalliy kompyuteringizda ishlaydi. Kurs sahifasidagi playground'da terminal buyruqlari ishlamaydi — shuning uchun quyidagi bloklar <strong>statik misol</strong> sifatida keltiriladi. Ularni o'z kompyuteringizdagi haqiqiy Git omborida sinab ko'ring." },

        { h2: "Branch nima va nega kerak?" },
        { p: "Har bir Git ombori (repository) kamida bitta branch'ga ega. An'anaviy nomi <code>master</code> edi, hozirgi zamonaviy loyihalarda esa ko'pincha <code>main</code> deb ataladi. Bu — asosiy, ishonchli kod turadigan yo'nalish." },
        { p: "Branch — bu commitlar (o'zgarishlar tarixi) ustidagi <strong>siljib boruvchi ko'rsatkich</strong> (pointer). Har safar yangi commit qilganingizda, joriy branch avtomatik ravishda oxirgi commit'ga siljiydi. Yangi branch ochsangiz, siz shu paytdagi commit'dan yangi mustaqil yo'nalish boshlaysiz." },
        { p: "Branch nima uchun kerak? Bir nechta amaliy sabab:" },
        { ul: [
          "<strong>Xavfsiz eksperiment.</strong> Yangi g'oyani asosiy kodga zarar bermasdan sinab ko'rasiz. Ishlamasa — branch'ni o'chirasiz, asosiy kod toza qoladi.",
          "<strong>Parallel ishlash.</strong> Bir vaqtning o'zida bir necha funksiya (masalan, bittasi <code>login</code>, boshqasi <code>profil</code>) alohida branch'larda mustaqil rivojlanadi.",
          "<strong>Jamoaviy tartib.</strong> Har bir dasturchi o'z branch'ida ishlaydi, bir-birining kodini buzmaydi. Tayyor bo'lgach hamma o'zinikini <code>main</code>ga birlashtiradi.",
          "<strong>Barqaror asosiy kod.</strong> <code>main</code> branch doim ishlaydigan, chiqarishga tayyor holatda saqlanadi. Yarim tayyor kod alohida branch'larda turadi."
        ] },

        { h2: "Mavjud branch'larni ko'rish: git branch" },
        { p: "Omborda qanday branch'lar borligini va hozir qaysi biridasiz — buni <code>git branch</code> buyrug'i ko'rsatadi. Joriy branch oldida yulduzcha (<code>*</code>) turadi:" },
        { code: "$ git branch\n* main" },
        { p: "Bu omborda hozircha bitta <code>main</code> branch bor va biz aynan undamiz. Barcha branch'larni (masofaviylarni ham) batafsil ko'rish uchun:" },
        { code: "$ git branch -a\n* main\n  feature-login\n  remotes/origin/main" },
        { p: "Bu yerda mahalliy <code>main</code> va <code>feature-login</code>, hamda masofaviy (GitHub'dagi) <code>origin/main</code> ko'rinadi." },

        { h2: "Yangi branch yaratish: git branch nomi" },
        { p: "Yangi branch yaratish uchun uning nomini beramiz. Masalan, <code>feature-login</code> nomli branch ochamiz:" },
        { code: "$ git branch feature-login" },
        { p: "Diqqat: bu buyruq branch'ni faqat <strong>yaratadi</strong>, lekin sizni unga <em>o'tkazmaydi</em>. Siz hali ham eski branch'dasiz. Buni <code>git branch</code> bilan tekshiring:" },
        { code: "$ git branch\n  feature-login\n* main" },
        { p: "Ko'rib turganingizdek, <code>feature-login</code> yaratildi, lekin yulduzcha hali <code>main</code>da." },
        { tip: "Branch nomlarida bo'sh joy ishlatmang. Ko'p so'zlarni chiziqcha bilan bog'lang: <code>feature-login</code>, <code>fix-header-bug</code>, <code>update-readme</code>. Ko'plab jamoalar nomlarda prefiks ishlatadi: <code>feature/</code>, <code>fix/</code>, <code>hotfix/</code> — masalan <code>feature/user-profile</code>." },

        { h2: "Branch'lar orasida o'tish: git checkout va git switch" },
        { p: "Yaratilgan branch'ga o'tish uchun ikki xil yo'l bor. Eskiroq va universal usul — <code>git checkout</code>:" },
        { code: "$ git checkout feature-login\nSwitched to branch 'feature-login'" },
        { p: "Endi <code>git branch</code> yulduzchani <code>feature-login</code>da ko'rsatadi. Bu branch'da qilgan har bir commit faqat shu branch tarixiga tushadi." },
        { p: "Zamonaviy Git (2.23-versiyadan boshlab) yanada tushunarli buyruq taqdim etdi — <code>git switch</code>. U <em>faqat</em> branch almashtirish uchun mo'ljallangan (chalkashlik kamroq):" },
        { code: "$ git switch feature-login\nSwitched to branch 'feature-login'" },
        { note: "<code>git checkout</code> juda ko'p vazifani bajaradi: branch almashtirish, fayllarni tiklash, ma'lum commit'ni ko'rish. Bu chalkashlikka olib kelardi. Shuning uchun Git jamoasi uni ikkiga bo'ldi: branch almashtirish uchun <code>git switch</code>, fayllarni tiklash uchun esa <code>git restore</code>. Yangi loyihalarda <code>switch</code> va <code>restore</code>ni afzal ko'ring, lekin <code>checkout</code> ham hamma joyda ishlaydi." },

        { h2: "Yaratish va o'tishni bir buyruqda: -b va -c" },
        { p: "Ko'pincha branch'ni yaratib, darhol unga o'tmoqchi bo'lasiz. Har safar ikki buyruq yozish shart emas — buni bitta buyruqda qilish mumkin. <code>checkout</code> uchun <code>-b</code> bayrog'i:" },
        { code: "$ git checkout -b feature-login\nSwitched to a new branch 'feature-login'" },
        { p: "Zamonaviy <code>switch</code>da xuddi shu narsa <code>-c</code> (create) bayrog'i bilan qilinadi:" },
        { code: "$ git switch -c feature-login\nSwitched to a new branch 'feature-login'" },
        { p: "Ikkalasi ham: yangi <code>feature-login</code> branch'ini yaratadi va sizni darhol unga o'tkazadi. Bu — amaliyotda eng ko'p ishlatiladigan usul." },

        { h2: "Branch'da ishlash: to'liq amaliy misol" },
        { p: "Keling, to'liq oqimni ko'rib chiqamiz. <code>main</code>da turibmiz, yangi funksiya uchun branch ochamiz, o'zgartiramiz va commit qilamiz:" },
        { code: "# 1. Yangi branch yaratib, unga o'tamiz\n$ git switch -c feature-login\nSwitched to a new branch 'feature-login'\n\n# 2. Fayllarni tahrirlaymiz (masalan, login.js yaratamiz)\n# ... kod yozamiz ...\n\n# 3. O'zgarishni saqlaymiz\n$ git add login.js\n$ git commit -m 'Login sahifasini qoshdim'\n[feature-login 1a2b3c4] Login sahifasini qoshdim\n 1 file changed, 40 insertions(+)" },
        { p: "Endi <code>login.js</code> faqat <code>feature-login</code> branch'ida mavjud. Agar <code>main</code>ga qaytsangiz, u fayl u yerda ko'rinmaydi (chunki commit boshqa branch'da):" },
        { code: "$ git switch main\nSwitched to branch 'main'\n\n$ ls\nindex.html   style.css\n# login.js bu yerda yoq — u feature-login branchida qoldi" },
        { warn: "Branch almashtirishdan oldin joriy o'zgarishlaringizni commit qiling (yoki <code>git stash</code> bilan vaqtincha yashiring). Aks holda saqlanmagan o'zgarishlar bilan branch almashtirmoqchi bo'lsangiz, Git ogohlantirish beradi va ba'zan almashtirishga yo'l qo'ymaydi. <code>git stash</code>ni keyingi darsda ko'ramiz." },

        { h2: "Branch'larni birlashtirish: git merge" },
        { p: "Branch'da ish tugagach, uni asosiy kodga qo'shish kerak. Bu jarayon <strong>merge</strong> (birlashtirish) deb ataladi. Muhim qoida: siz <em>qaysi branch'ga birlashtirmoqchi bo'lsangiz, avval o'sha branch'ga o'tasiz</em>, keyin kerakli branch'ni unga tortasiz." },
        { p: "Masalan, <code>feature-login</code>ni <code>main</code>ga birlashtiramiz. Avval <code>main</code>ga o'tamiz, keyin <code>feature-login</code>ni birlashtiramiz:" },
        { code: "# 1. Maqsad branchiga (main) otamiz\n$ git switch main\nSwitched to branch 'main'\n\n# 2. feature-login ni main ga birlashtiramiz\n$ git merge feature-login\nUpdating a1b2c3d..1a2b3c4\nFast-forward\n login.js | 40 ++++++++++++++++++++++\n 1 file changed, 40 insertions(+)" },
        { p: "Endi <code>login.js</code> va uning barcha o'zgarishlari <code>main</code>ga qo'shildi. Merge muvaffaqiyatli tugadi." },
        { note: "Yuqoridagi natijada <strong>Fast-forward</strong> yozuvini ko'rdingiz. Bu — merge'ning eng oddiy turi. U shunda sodir bo'ladiki, <code>main</code> branch <code>feature-login</code> ajralib chiqqandan beri o'zgarmagan bo'lsa. Bu holda Git shunchaki <code>main</code> ko'rsatkichini oldinga suradi — yangi commit yaratmaydi." },
        { p: "Agar ikkala branch ham parallel o'zgargan bo'lsa, Git <strong>merge commit</strong> deb ataladigan maxsus commit yaratadi. Bu ikki tarixni bittaga bog'laydigan tugun. Bunda tahrirlagich ochilib, sizdan birlashtirish xabarini so'raydi (yoki <code>-m</code> bilan berasiz):" },
        { code: "$ git merge feature-login\nMerge made by the 'ort' strategy.\n login.js | 40 ++++++++++++++++++++++\n 1 file changed, 40 insertions(+)" },

        { h2: "Merge konflikti nima?" },
        { p: "Merge har doim ham silliq o'tmaydi. <strong>Merge konflikti</strong> — bu ikkala branch'da <em>bir xil faylning bir xil qatori</em> turli xil tarzda o'zgartirilganda yuz beradi. Git qaysi versiyani tanlashni bilmaydi va sizdan qo'lda hal qilishni so'raydi." },
        { p: "Masalan, <code>main</code>da kimdir <code>index.html</code>ning 1-qatorini o'zgartirdi, siz esa <code>feature-login</code>da xuddi shu qatorni boshqacha o'zgartirdingiz. Merge qilganda:" },
        { code: "$ git merge feature-login\nAuto-merging index.html\nCONFLICT (content): Merge conflict in index.html\nAutomatic merge failed; fix conflicts and then commit the result." },
        { p: "Git to'xtaydi va aytadi: konfliktni o'zingiz hal qiling. Hozirgi holatni <code>git status</code> ham ko'rsatadi:" },
        { code: "$ git status\nOn branch main\nYou have unmerged paths.\n  (fix conflicts and run 'git commit')\n\nUnmerged paths:\n  (use 'git add <file>...' to mark resolution)\n        both modified:   index.html" },

        { h2: "Merge konfliktini hal qilish" },
        { p: "Konfliktli faylni matn tahrirlagichda ochsangiz, Git maxsus belgilar qo'yganini ko'rasiz. Ular ikkala versiyani ko'rsatadi:" },
        { code: "<<<<<<< HEAD\n<h1>Bosh sahifa</h1>\n=======\n<h1>Xush kelibsiz!</h1>\n>>>>>>> feature-login" },
        { p: "Bu belgilarni tushunamiz:" },
        { ul: [
          "<code>&lt;&lt;&lt;&lt;&lt;&lt;&lt; HEAD</code> — joriy branch (siz turgan, ya'ni <code>main</code>) versiyasining boshi;",
          "<code>=======</code> — ikki versiyani ajratuvchi chiziq;",
          "<code>&gt;&gt;&gt;&gt;&gt;&gt;&gt; feature-login</code> — birlashtirilayotgan branch versiyasining oxiri."
        ] },
        { p: "Konfliktni hal qilish — bu shu belgilarni o'chirib, faylni <strong>to'g'ri yakuniy holatga</strong> keltirish demakdir. Siz bir versiyani tanlashingiz, yoki ikkalasini birlashtirishingiz mumkin. Masalan, quyidagi variantni qoldiramiz:" },
        { code: "<h1>Xush kelibsiz!</h1>" },
        { p: "Barcha <code>&lt;&lt;&lt;</code>, <code>===</code>, <code>&gt;&gt;&gt;</code> belgilarini butunlay olib tashlaganingizga ishonch hosil qiling. Keyin faylni saqlab, hal qilinganini Git'ga bildiramiz:" },
        { code: "# konflikt hal qilingan faylni belgilaymiz\n$ git add index.html\n\n# birlashtirishni yakunlaymiz\n$ git commit -m 'index.html dagi merge konfliktini hal qildim'\n[main 5f6g7h8] index.html dagi merge konfliktini hal qildim" },
        { tip: "Konfliktlarni qo'rqmang — ular normal holat, ayniqsa jamoada ishlaganda. Zamonaviy tahrirlagichlar (masalan, VS Code) konfliktli faylni chiroyli ko'rsatadi va \"Accept Current\", \"Accept Incoming\", \"Accept Both\" tugmalarini taqdim etadi. Bu qo'lda belgilar bilan ishlashdan ancha qulay." },
        { note: "Agar merge o'rtasida hamma narsani bekor qilib, boshlang'ich holatga qaytmoqchi bo'lsangiz: <code>git merge --abort</code>. Bu birlashtirishni to'liq to'xtatadi va omborni merge boshlanishidan oldingi holatga qaytaradi." },

        { h2: "Keraksiz branch'ni o'chirish: git branch -d" },
        { p: "Branch birlashtirilib, endi kerak bo'lmasa, uni o'chirib tozalik saqlash yaxshi odat. Muvaffaqiyatli birlashtirilgan branch'ni <code>-d</code> (delete) bilan o'chiramiz:" },
        { code: "$ git branch -d feature-login\nDeleted branch feature-login (was 1a2b3c4)." },
        { p: "Agar branch hali <strong>hech qayerga birlashtirilmagan</strong> bo'lsa, <code>-d</code> uni o'chirmaydi — Git ish yo'qolib qolishidan ogohlantiradi:" },
        { code: "$ git branch -d feature-test\nerror: The branch 'feature-test' is not fully merged.\nIf you are sure you want to delete it, run 'git branch -D feature-test'." },
        { p: "Agar rostdan ham keraksiz bo'lsa va birlashtirilmagan ishni yo'qotishga rozimisiz — katta <code>-D</code> (majburiy o'chirish) ishlatiladi:" },
        { code: "$ git branch -D feature-test\nDeleted branch feature-test (was 9z8y7x6)." },
        { warn: "<code>-D</code> (katta harf) branch'ni birlashtirilmagan bo'lsa ham majburan o'chiradi. Undagi commitlar boshqa branch'da bo'lmasa — <strong>butunlay yo'qoladi</strong>. Shuning uchun <code>-D</code>ni faqat o'zgarishlar kerak emasligiga to'liq ishonganingizda ishlating." },

        { h2: "Xulosa" },
        { p: "Ushbu darsda branch bilan ishlashning to'liq davrini o'rgandik:" },
        { ul: [
          "<strong>Branch</strong> — commitlar ustidagi siljib boruvchi ko'rsatkich; alohida, xavfsiz yo'nalishda ishlash imkoni;",
          "<code>git branch</code> — branch'larni ko'rish, <code>git branch nomi</code> — yaratish;",
          "<code>git checkout nomi</code> yoki zamonaviy <code>git switch nomi</code> — branch'ga o'tish;",
          "<code>git checkout -b nomi</code> yoki <code>git switch -c nomi</code> — yaratib, darhol o'tish;",
          "<code>git merge nomi</code> — branch'ni joriy branch'ga birlashtirish (avval maqsad branch'ga o'tib olasiz);",
          "<strong>merge konflikti</strong> — bir xil qator ikki xil o'zgarganda yuzaga keladi; belgilarni qo'lda hal qilib, <code>git add</code> + <code>git commit</code> bilan yakunlanadi;",
          "<code>git branch -d nomi</code> — birlashtirilgan branch'ni o'chirish, <code>-D</code> — majburiy o'chirish."
        ] },
        { p: "Branch'lar Git ish oqimining yuragidir. Keyingi darsda mahalliy omborni GitHub bilan bog'lab, kodni internetga yuborishni o'rganamiz." }
      ]
    },

    {
      slug: "github-remote",
      title: "GitHub bilan ishlash: clone, push, pull",
      blurb: "Remote (masofaviy ombor) tushunchasi, git remote add origin, mavjud omborni git clone bilan nusxalash, git push -u origin main bilan kodni yuborish, git pull bilan yangilanishlarni olish, git fetch va git pull farqi, mahalliy va masofaviy omborlarni sinxronlash.",
      body: [
        { lead: "Hozirgacha Git bilan faqat o'z kompyuteringizda ishladingiz. Endi kodni internetga chiqaramiz. GitHub — bu Git omborlarini bulutda saqlaydigan eng mashhur platforma. U kodni zaxiralash, boshqa qurilmalarda ochish va jamoa bilan hamkorlik qilish imkonini beradi. Ushbu darsda mahalliy va masofaviy (remote) omborlarni bog'lash, kodni yuborish (push), olish (pull) va sinxronlashni chuqur o'rganamiz." },

        { note: "Bu darsdagi buyruqlar terminalda ishlaydi va haqiqiy GitHub akkaunti hamda internet aloqasini talab qiladi. Kurs sahifasidagi playground'da ular ishlamaydi — quyidagi bloklar <strong>statik misol</strong>. Ularni o'z kompyuteringizda, github.com'da yaratgan ombor bilan sinab ko'ring." },

        { h2: "Remote (masofaviy ombor) nima?" },
        { p: "<strong>Remote</strong> — bu sizning omboringizning internetdagi (yoki boshqa serverdagi) nusxasi. Mahalliy ombor sizning kompyuteringizda, remote esa GitHub kabi serverda turadi. Ular bir-biriga bog'lanadi va o'zgarishlar ular o'rtasida ikki tomonlama ko'chiriladi." },
        { p: "Remote'ning odatiy nomi — <strong>origin</strong>. Bu — shunchaki qulay taxallus (alias) bo'lib, uzun URL manzilni har safar yozmaslik uchun ishlatiladi. Ya'ni <code>origin</code> so'zi \"asosiy masofaviy ombor URL'i\"ni bildiradi." },
        { p: "Ikki asosiy vaziyat bor:" },
        { ul: [
          "<strong>Yangi mahalliy ombor</strong> yaratdingiz va uni GitHub'ga chiqarmoqchisiz — bunda <code>git remote add</code> ishlatasiz;",
          "<strong>GitHub'da mavjud ombor</strong>ni kompyuteringizga tushirmoqchisiz — bunda <code>git clone</code> ishlatasiz."
        ] },
        { p: "Ikkalasini ham navbat bilan ko'ramiz." },

        { h2: "Remote'larni ko'rish: git remote" },
        { p: "Ombor qanday remote'larga bog'langanini <code>git remote</code> ko'rsatadi. URL'lari bilan ko'rish uchun <code>-v</code> (verbose) qo'shamiz:" },
        { code: "$ git remote -v\norigin  https://github.com/foydalanuvchi/loyiha.git (fetch)\norigin  https://github.com/foydalanuvchi/loyiha.git (push)" },
        { p: "Bu yerda <code>origin</code> nomli remote ikki yo'nalishga bog'langan: <strong>fetch</strong> (olish) va <strong>push</strong> (yuborish). Hozircha bitta remote yetarli — deyarli barcha oddiy loyihalarda faqat <code>origin</code> bo'ladi." },

        { h2: "Mahalliy omborni remote'ga bog'lash: git remote add origin" },
        { p: "Faraz qilaylik, kompyuteringizda tayyor ombor bor (siz <code>git init</code> qilib, commitlar ham qilgansiz). Endi uni GitHub'ga chiqarmoqchisiz. Avval github.com'da <strong>bo'sh ombor</strong> yaratasiz (README'siz), keyin uni mahalliy omborga bog'laysiz:" },
        { code: "$ git remote add origin https://github.com/foydalanuvchi/loyiha.git" },
        { p: "Bu buyruq shuni bildiradi: \"<code>origin</code> nomli remote yarat va uni ushbu URL'ga ishora qildir\". Endi bog'lanishni tekshiring:" },
        { code: "$ git remote -v\norigin  https://github.com/foydalanuvchi/loyiha.git (fetch)\norigin  https://github.com/foydalanuvchi/loyiha.git (push)" },
        { note: "GitHub omborining URL'i ikki xil bo'ladi: <strong>HTTPS</strong> (<code>https://github.com/...</code>) va <strong>SSH</strong> (<code>git@github.com:...</code>). HTTPS oddiyroq va yangi boshlovchilarga qulay (login/parol yoki token so'raydi). SSH esa kalit sozlangach parolsiz ishlaydi va professional foydalanishda qulay. Boshlash uchun HTTPS'dan foydalaning." },
        { warn: "Agar remote'ni noto'g'ri URL bilan qo'shsangiz, uni o'zgartirish uchun: <code>git remote set-url origin YANGI-URL</code>. Butunlay o'chirish uchun: <code>git remote remove origin</code>. \"remote origin already exists\" xatosini olsangiz — demak origin allaqachon bor, uni qayta qo'shish o'rniga <code>set-url</code> bilan yangilang." },

        { h2: "Kodni yuborish: git push -u origin main" },
        { p: "Endi mahalliy commitlarni GitHub'ga jo'natamiz. Buni <strong>push</strong> deb ataymiz. Birinchi marta yuborishda maxsus <code>-u</code> bayrog'ini ishlatamiz:" },
        { code: "$ git push -u origin main\nEnumerating objects: 5, done.\nWriting objects: 100% (5/5), 480 bytes, done.\nTo https://github.com/foydalanuvchi/loyiha.git\n * [new branch]      main -> main\nbranch 'main' set up to track 'origin/main'." },
        { p: "Buyruqni qismlarga ajratamiz:" },
        { ul: [
          "<code>git push</code> — o'zgarishlarni remote'ga yuborish;",
          "<code>-u</code> (yoki <code>--set-upstream</code>) — mahalliy <code>main</code>ni masofaviy <code>origin/main</code>ga <strong>bog'laydi</strong> (kuzatuv, tracking o'rnatadi);",
          "<code>origin</code> — qaysi remote'ga (bizning taxallusimiz);",
          "<code>main</code> — qaysi branch'ni yuborayapmiz."
        ] },
        { p: "<code>-u</code> tufayli keyingi safar shunchaki <code>git push</code> yozsangiz kifoya — Git qayerga yuborishni allaqachon eslab qoladi:" },
        { code: "# keyingi push'lar oddiy:\n$ git push\nEnumerating objects: 3, done.\nTo https://github.com/foydalanuvchi/loyiha.git\n   1a2b3c4..5d6e7f8  main -> main" },
        { tip: "Odatiy ish oqimi shunday: <code>git add .</code> &rarr; <code>git commit -m 'xabar'</code> &rarr; <code>git push</code>. Ya'ni avval o'zgarishni saqlaysiz (commit), keyin uni internetga yuborasiz (push). Commit — mahalliy, push — masofaviy. Bu ikkisi <strong>alohida</strong> qadamlar." },

        { h2: "Mavjud omborni nusxalash: git clone" },
        { p: "Agar GitHub'da tayyor ombor bo'lsa (masalan, birov yaratgan yoki siz avval chiqargan), uni butunlay kompyuteringizga tushirish uchun <code>git clone</code> ishlatiladi:" },
        { code: "$ git clone https://github.com/foydalanuvchi/loyiha.git\nCloning into 'loyiha'...\nremote: Enumerating objects: 25, done.\nReceiving objects: 100% (25/25), 4.20 KiB, done.\nResolving deltas: 100% (8/8), done." },
        { p: "Bu buyruq juda ko'p ishni bir zumda bajaradi:" },
        { ul: [
          "GitHub'dan barcha fayllarni va butun commit tarixini yuklab oladi;",
          "<code>loyiha</code> nomli papka yaratadi;",
          "<code>origin</code> remote'ini avtomatik sozlaydi (qo'lda <code>git remote add</code> shart emas);",
          "asosiy branch'ni kuzatuvga o'rnatadi — darhol <code>push</code>/<code>pull</code>ga tayyor."
        ] },
        { p: "Klonlangan papkaga kirib, darhol ishlashni boshlashingiz mumkin:" },
        { code: "$ cd loyiha\n$ git remote -v\norigin  https://github.com/foydalanuvchi/loyiha.git (fetch)\norigin  https://github.com/foydalanuvchi/loyiha.git (push)" },
        { note: "Boshqa nom bilan klonlash uchun URL oxiriga papka nomini qo'shing: <code>git clone URL yangi-nom</code>. Bunda <code>loyiha</code> o'rniga <code>yangi-nom</code> papkasi yaratiladi." },

        { h2: "Yangilanishlarni olish: git pull" },
        { p: "Jamoada ishlaganda yoki boshqa qurilmadan o'zgartirganda, GitHub'dagi kod sizning mahalliy nusxangizdan yangiroq bo'lishi mumkin. Masofaviy o'zgarishlarni o'z kompyuteringizga tortish uchun <code>git pull</code>:" },
        { code: "$ git pull\nremote: Enumerating objects: 4, done.\nUpdating 5d6e7f8..9a8b7c6\nFast-forward\n README.md | 3 +++\n 1 file changed, 3 insertions(+)" },
        { p: "<code>git pull</code> ikki ishni birga bajaradi: GitHub'dan yangi commitlarni <strong>yuklab oladi</strong> (fetch) va ularni sizning joriy branch'ingizga <strong>birlashtiradi</strong> (merge). Natijada mahalliy nusxangiz yangilanadi." },
        { tip: "Yaxshi odat: har kuni ishni boshlashdan oldin <code>git pull</code> qiling. Bu sizni jamoadagi eng so'nggi o'zgarishlar bilan sinxron holatda ushlaydi va push qilganda konflikt ehtimolini kamaytiradi." },

        { h2: "git fetch va git pull farqi" },
        { p: "Ko'pchilik <code>fetch</code> va <code>pull</code>ni chalkashtiradi. Farqi juda muhim:" },
        { ul: [
          "<code>git fetch</code> — GitHub'dan yangi commitlarni <strong>faqat yuklab oladi</strong>, lekin sizning ishchi fayllaringizga <em>tegmaydi</em>. O'zgarishlar <code>origin/main</code>da \"kutib\" turadi. Siz avval ularni ko'rib, keyin birlashtirishingiz mumkin.",
          "<code>git pull</code> — bu aslida <strong>fetch + merge</strong>. Ya'ni yuklab oladi <em>va darhol</em> sizning branch'ingizga qo'shadi."
        ] },
        { p: "Ya'ni sodda formula:" },
        { code: "git pull  =  git fetch  +  git merge origin/main" },
        { p: "Ehtiyotkor ish oqimi — avval fetch, keyin ko'rib, so'ng merge:" },
        { code: "# 1. Faqat yuklab olamiz (ishchi fayllar o'zgarmaydi)\n$ git fetch origin\n\n# 2. Nima o'zgarganini ko'ramiz\n$ git log main..origin/main --oneline\n9a8b7c6 README yangilandi\n\n# 3. Rozimiz — birlashtiramiz\n$ git merge origin/main" },
        { note: "<code>fetch</code> xavfsizroq: u hech narsani buzmaydi, faqat ma'lumot keltiradi. Katta yoki muhim o'zgarishlardan oldin fetch qilib, nima kelayotganini ko'rib olish — professional odat. Kundalik oddiy ishda esa <code>git pull</code> yetarli va qulay." },

        { h2: "Mahalliy va masofaviy sinxronizatsiya" },
        { p: "Endi umumiy manzarani jamlaymiz. Ikki ombor (mahalliy va masofaviy) o'rtasida o'zgarishlar shunday harakatlanadi:" },
        { ul: [
          "<strong>push</strong> — mahalliy &rarr; masofaviy (sizning commitlaringizni GitHub'ga yuborasiz);",
          "<strong>pull</strong> — masofaviy &rarr; mahalliy (GitHub'dagi o'zgarishlarni olasiz);",
          "<strong>fetch</strong> — masofaviy &rarr; mahalliy (lekin birlashtirmasdan, faqat yuklab)."
        ] },
        { p: "Tipik kunlik oqim quyidagicha ko'rinadi:" },
        { code: "# ishni boshlash: eng so'nggi holatni olamiz\n$ git pull\n\n# ... kod yozamiz, fayllarni o'zgartiramiz ...\n\n# o'zgarishni saqlaymiz\n$ git add .\n$ git commit -m 'Yangi funksiya qoshildi'\n\n# internetga yuboramiz\n$ git push" },
        { warn: "Agar push qilmoqchi bo'lganingizda \"Updates were rejected\" xatosini olsangiz — demak GitHub'da siz bilmagan yangi commitlar bor (masalan, jamoadoshingiz push qilgan). Yechim: avval <code>git pull</code> qiling (kerak bo'lsa konfliktni hal qiling), keyin qaytadan <code>git push</code>. Git avval masofaviy o'zgarishlarni olishni talab qiladi, aks holda ular yo'qolib qolar edi." },

        { h2: "Xulosa" },
        { ul: [
          "<strong>Remote</strong> — omboringizning masofaviy (GitHub'dagi) nusxasi; odatiy nomi <code>origin</code>;",
          "<code>git remote add origin URL</code> — mahalliy omborni GitHub'ga bog'lash;",
          "<code>git clone URL</code> — GitHub'dagi tayyor omborni butunlay nusxalash (remote avtomatik sozlanadi);",
          "<code>git push -u origin main</code> — birinchi yuborish (kuzatuv o'rnatadi); keyin oddiy <code>git push</code>;",
          "<code>git pull</code> — masofaviy o'zgarishlarni olish va birlashtirish (= fetch + merge);",
          "<code>git fetch</code> — faqat yuklab olish, ishchi fayllarga tegmasdan;",
          "kunlik oqim: <code>pull</code> &rarr; ishlash &rarr; <code>add</code> &rarr; <code>commit</code> &rarr; <code>push</code>."
        ] },
        { p: "Endi kodni internetga chiqarishni bilasiz. Keyingi darsda jamoa bilan ishlash — fork va Pull Request oqimini o'rganamiz." }
      ]
    },

    {
      slug: "github-jamoa",
      title: "Jamoa bilan ishlash: fork va Pull Request",
      blurb: "Fork (o'zingizga nusxa ochish) tushunchasi, Pull Request (PR) nima va uning to'liq jarayoni, issue (muammo) yaratish, kod ko'rib chiqish (code review), branch'da ishlab PR ochish oqimi, upstream bilan sinxronlash.",
      body: [
        { lead: "Ochiq kodli (open source) loyihalar va professional jamoalar bir necha dasturchi bir kod ustida ishlashini talab qiladi. Buning uchun GitHub maxsus ish oqimini taklif etadi: <strong>fork</strong>, <strong>branch</strong>, <strong>Pull Request</strong> va <strong>code review</strong>. Ushbu darsda ushbu jamoaviy oqimni bosqichma-bosqich o'rganamiz — bu bilan har qanday loyihaga hissa qo'sha olasiz." },

        { note: "Fork, Pull Request, issue va code review — bular asosan <strong>GitHub veb-saytida</strong> (brauzerda) bajariladigan amallar. Terminaldagi <code>git</code> buyruqlari ular bilan birga ishlatiladi. Kurs playground'ida bu amallar ishlamaydi — quyidagi bloklar statik misol va bosqichma-bosqich tavsif sifatida keltiriladi." },

        { h2: "Fork nima?" },
        { p: "<strong>Fork</strong> — bu boshqa birovning GitHub omborini <em>o'z akkauntingizga</em> to'liq nusxalash. Fork qilinganda, o'sha loyihaning aynan nusxasi sizning GitHub profilingizda paydo bo'ladi va u <strong>butunlay sizga tegishli</strong> bo'ladi — istagancha o'zgartirasiz, asl loyihaga ta'sir qilmaydi." },
        { p: "Fork nima uchun kerak? Chunki ochiq kodli loyihalarga har kim to'g'ridan-to'g'ri push qila olmaydi — faqat loyiha egalari. Fork esa quyidagi imkonni beradi:" },
        { ul: [
          "Loyihaning o'z nusxangizni olasiz va unga bemalol o'zgartirasiz;",
          "O'zgarishlaringizni <strong>Pull Request</strong> orqali asl loyihaga taklif qilasiz;",
          "Asl loyiha egalari sizning taklifingizni ko'rib chiqadi, muhokama qiladi va ma'qul bo'lsa qabul qiladi."
        ] },
        { p: "Fork qilish oson: GitHub'da loyiha sahifasining o'ng yuqorisidagi <strong>Fork</strong> tugmasini bosasiz. Bir necha soniyada nusxa <code>github.com/sizning-nomingiz/loyiha</code> manzilida paydo bo'ladi." },

        { h2: "upstream va origin: ikki remote" },
        { p: "Fork bilan ishlaganda ikki masofaviy ombor bilan aloqada bo'lasiz. Bu tushunchalar dastlab chalkash tuyulishi mumkin, shuning uchun aniq ajratamiz:" },
        { ul: [
          "<strong>origin</strong> — sizning fork'ingiz (<code>github.com/sizning-nomingiz/loyiha</code>). Bunga siz push qilasiz;",
          "<strong>upstream</strong> — asl (original) loyiha (<code>github.com/asl-muallif/loyiha</code>). Bundan siz yangilanishlarni olasiz, lekin push qila olmaysiz."
        ] },
        { p: "Fork'ingizni klonlaganingizdan so'ng, asl loyihani <code>upstream</code> nomi bilan qo'shasiz:" },
        { code: "# 1. O'z fork'ingizni klonlaymiz (origin avtomatik sozlanadi)\n$ git clone https://github.com/sizning-nomingiz/loyiha.git\n$ cd loyiha\n\n# 2. Asl loyihani upstream sifatida qo'shamiz\n$ git remote add upstream https://github.com/asl-muallif/loyiha.git\n\n# 3. Tekshiramiz\n$ git remote -v\norigin    https://github.com/sizning-nomingiz/loyiha.git (fetch)\norigin    https://github.com/sizning-nomingiz/loyiha.git (push)\nupstream  https://github.com/asl-muallif/loyiha.git (fetch)\nupstream  https://github.com/asl-muallif/loyiha.git (push)" },
        { note: "Nomlarning ma'nosi: <em>origin</em> — \"kelib chiqish joyi\" (sizniki), <em>upstream</em> — \"oqim boshlanadigan yuqori joy\" (asosiy loyiha). Bu nomlar shartli kelishuv (konvensiya), lekin deyarli barcha loyihalarda shunday ishlatiladi." },

        { h2: "Issue (muammo) yaratish" },
        { p: "<strong>Issue</strong> — bu loyihada biror muammoni, xatoni yoki takliﬂni muhokama qilish uchun ochiladigan yozuv. Kod yozishdan oldin ko'pincha issue orqali muammoni bayon qilish yaxshi odat — bu jamoaga nima ustida ishlayotganingizni bildiradi." },
        { p: "Issue GitHub'ning <strong>Issues</strong> bo'limida yaratiladi. Yaxshi issue quyidagilarni o'z ichiga oladi:" },
        { ul: [
          "<strong>Aniq sarlavha</strong> — masalan \"Login tugmasi mobil ekranda ko'rinmayapti\";",
          "<strong>Muammoning tavsifi</strong> — nima kutilgan va nima sodir bo'lyapti;",
          "<strong>Takrorlash qadamlari</strong> — muammoni qanday qayta hosil qilish mumkin;",
          "<strong>Muhit</strong> — brauzer, operatsion tizim, versiya (agar tegishli bo'lsa)."
        ] },
        { tip: "Issue'lar shunchaki xatolar uchun emas. Ular yangi funksiya taklif qilish, savol berish yoki muhokama boshlash uchun ham ishlatiladi. Ko'p loyihalarda kod (PR) yozishdan oldin issue ochib, muallif bilan kelishib olish talab qilinadi." },

        { h2: "Pull Request (PR) nima?" },
        { p: "<strong>Pull Request</strong> (qisqacha <strong>PR</strong>) — bu \"iltimos, mening o'zgarishlarimni loyihangizga qabul qiling\" degan rasmiy so'rov. Siz o'z branch'ingizda kod yozasiz, uni fork'ingizga push qilasiz va GitHub'da asl loyihaga PR ochasiz." },
        { p: "PR — jamoaviy ishning markaziy vositasi. U shunchaki kodni birlashtirish emas, balki:" },
        { ul: [
          "<strong>Muhokama maydoni</strong> — muallif va boshqalar o'zgarishlaringizni izohlaydi, savol beradi;",
          "<strong>Kod ko'rib chiqish (review)</strong> — tajribali dasturchilar kodni tekshiradi va yaxshilash taklif qiladi;",
          "<strong>Avtomatik tekshiruvlar</strong> — testlar va tekshiruvlar (CI) avtomatik ishga tushadi;",
          "<strong>Tarix</strong> — nima uchun, qachon va kim tomonidan o'zgartirilgani saqlanadi."
        ] },

        { h2: "PR ochish oqimi: to'liq bosqichma-bosqich" },
        { p: "Endi butun jarayonni boshidan oxirigacha ko'ramiz. Faraz qilaylik, siz ochiq kodli loyihaga xato tuzatishini qo'shmoqchisiz:" },
        { p: "<strong>1-qadam.</strong> Loyihani GitHub'da <strong>Fork</strong> qiling (fork tugmasini bosing)." },
        { p: "<strong>2-qadam.</strong> Fork'ingizni kompyuteringizga klonlang va upstream'ni qo'shing:" },
        { code: "$ git clone https://github.com/sizning-nomingiz/loyiha.git\n$ cd loyiha\n$ git remote add upstream https://github.com/asl-muallif/loyiha.git" },
        { p: "<strong>3-qadam.</strong> O'zgarish uchun <strong>yangi branch</strong> yarating. Hech qachon to'g'ridan-to'g'ri <code>main</code>da ishlamang — har bir ish alohida branch'da:" },
        { code: "$ git switch -c fix-login-button\nSwitched to a new branch 'fix-login-button'" },
        { p: "<strong>4-qadam.</strong> Kodni o'zgartiring, so'ng commit qiling:" },
        { code: "# ... kodni tuzatamiz ...\n$ git add .\n$ git commit -m 'Login tugmasi mobil ekrandagi xatosini tuzatdim'" },
        { p: "<strong>5-qadam.</strong> Branch'ni o'z fork'ingizga (origin) push qiling:" },
        { code: "$ git push -u origin fix-login-button\nTo https://github.com/sizning-nomingiz/loyiha.git\n * [new branch]      fix-login-button -> fix-login-button" },
        { p: "<strong>6-qadam.</strong> GitHub'ga o'ting. Push'dan keyin GitHub odatda <strong>\"Compare &amp; pull request\"</strong> tugmasini ko'rsatadi. Uni bosing, PR uchun aniq sarlavha va tavsif yozing, so'ng <strong>Create pull request</strong> tugmasini bosing." },
        { p: "<strong>7-qadam.</strong> PR ochildi. Endi loyiha egalari uni ko'rib chiqadi. Ular izoh qoldirishi, o'zgartirish so'rashi yoki darhol qabul qilishi mumkin." },
        { note: "PR ochilgandan keyin ham unga qo'shimcha commitlar qo'sha olasiz. Xuddi shu branch'ga yangi commit push qilsangiz, ular avtomatik ravishda ochiq PR'ga qo'shiladi. Bu review davomida tuzatishlarni kiritishni qulay qiladi." },

        { h2: "Kod ko'rib chiqish (code review)" },
        { p: "<strong>Code review</strong> (kod ko'rib chiqish) — bu PR'dagi kodni boshqa dasturchilar tomonidan tekshirilishi. Bu — sifatli dasturchilikning muhim qismi. Review paytida:" },
        { ul: [
          "Ko'rib chiquvchi kodning har bir qatoriga izoh qoldira oladi;",
          "Xatolar, yaxshilash imkoniyatlari yoki uslub muammolari ko'rsatiladi;",
          "Muallif izohlarga javob beradi va kerakli tuzatishlarni kiritadi;",
          "Hammasi joyida bo'lsa, ko'rib chiquvchi PR'ni <strong>Approve</strong> (ma'qullash) qiladi."
        ] },
        { p: "GitHub'da review uch xil xulosaga ega bo'ladi:" },
        { ul: [
          "<strong>Approve</strong> — kod yaxshi, birlashtirishga tayyor;",
          "<strong>Request changes</strong> — o'zgartirish kerak, birlashtirishdan oldin tuzatilsin;",
          "<strong>Comment</strong> — shunchaki fikr bildirish, aniq qaror bermasdan."
        ] },
        { tip: "Yaxshi code review — bu tanqid emas, hamkorlik. Izohlarga xafa bo'lmang: ular kodni yaxshilash uchun. O'zingiz ham review qilganda muloyim va aniq bo'ling — muammoni ko'rsating va yaxshilash yo'lini taklif qiling." },
        { p: "Review muvaffaqiyatli tugagach, muallif <strong>Merge pull request</strong> tugmasini bosadi va sizning kodingiz asl loyihaga qo'shiladi. Tabriklaymiz — siz loyihaga hissa qo'shdingiz!" },

        { h2: "upstream bilan sinxronlash" },
        { p: "Vaqt o'tishi bilan asl loyiha (upstream) rivojlanadi — boshqalar yangi kod qo'shadi. Sizning fork'ingiz esa eskiradi. Yangi ishga kirishishdan oldin fork'ingizni asl loyiha bilan sinxronlash muhim. Bu quyidagicha qilinadi:" },
        { code: "# 1. main branch'ga o'tamiz\n$ git switch main\n\n# 2. Asl loyihadan (upstream) yangilanishlarni olamiz\n$ git fetch upstream\n\n# 3. upstream/main ni o'z main'imizga birlashtiramiz\n$ git merge upstream/main\n\n# 4. Yangilangan main'ni o'z fork'imizga (origin) yuboramiz\n$ git push origin main" },
        { p: "Endi fork'ingizning <code>main</code>i asl loyiha bilan bir xil holatda. Yangi funksiya uchun branch ochishdan oldin doim shu sinxronlashni bajaring — bu keyingi konfliktlarni kamaytiradi." },
        { warn: "Yangi ish uchun branch'ni <strong>doim yangilangan main'dan</strong> oching. Eski main'dan ochilgan branch keyinchalik PR qilganda ko'p konfliktga sabab bo'ladi. To'g'ri tartib: upstream'dan sinxronlang &rarr; keyin <code>git switch -c yangi-branch</code>." },
        { note: "GitHub'da fork sahifasida <strong>\"Sync fork\"</strong> tugmasi ham bor — u brauzer orqali fork'ni upstream bilan sinxronlaydi. Bu terminaldan foydalanishga muqobil oson yo'l. Lekin terminal usulini bilish murakkabroq holatlarda foydali." },

        { h2: "Xulosa" },
        { ul: [
          "<strong>Fork</strong> — boshqa loyihaning o'z akkauntingizdagi to'liq nusxasi;",
          "<strong>origin</strong> — sizning fork'ingiz (push qilasiz), <strong>upstream</strong> — asl loyiha (yangilanish olasiz);",
          "<strong>Issue</strong> — muammo, xato yoki taklifni muhokama qilish uchun yozuv;",
          "<strong>Pull Request (PR)</strong> — o'zgarishlaringizni asl loyihaga qabul qilishni so'rovchi rasmiy taklif;",
          "<strong>Code review</strong> — kodni boshqalar tekshiradi: Approve, Request changes yoki Comment;",
          "PR oqimi: fork &rarr; clone &rarr; yangi branch &rarr; commit &rarr; push &rarr; PR ochish &rarr; review &rarr; merge;",
          "<code>git fetch upstream</code> + <code>git merge upstream/main</code> — fork'ni asl loyiha bilan sinxronlash."
        ] },
        { p: "Jamoaviy ish oqimini o'rgandingiz — endi dunyodagi istalgan ochiq kodli loyihaga hissa qo'sha olasiz. Keyingi darsda Git'ning foydali vositalarini — .gitignore, undo va stash'ni o'rganamiz." }
      ]
    },

    {
      slug: "git-foydali",
      title: "Foydali vositalar: .gitignore, undo, stash",
      blurb: ".gitignore fayli va namunasi, allaqachon kuzatilayotgan faylni git rm --cached bilan chiqarish, o'zgarishni bekor qilish (git restore, git reset, git revert farqi), git stash bilan ishni vaqtincha yashirish, git tag qisqacha, yaxshi commit xabari yozish qoidalari.",
      body: [
        { lead: "Git kundalik ishda bir qancha juda foydali vositalarga ega: keraksiz fayllarni e'tiborsiz qoldirish (<code>.gitignore</code>), xatolarni orqaga qaytarish (undo), ishni vaqtincha yashirish (stash) va versiyalarni belgilash (tag). Ushbu darsda ushbu amaliy vositalarni va yaxshi commit xabari yozish qoidalarini chuqur o'rganamiz. Bular sizning ishingizni ancha tozaroq va xavfsizroq qiladi." },

        { note: "Bu darsdagi buyruqlar terminalda, mahalliy Git omborida ishlaydi. Kurs playground'ida ular ishlamaydi — quyidagi bloklar statik misol sifatida keltiriladi. Ularni o'z kompyuteringizdagi haqiqiy omborda sinab ko'ring." },

        { h2: ".gitignore fayli nima?" },
        { p: "Har bir loyihada Git kuzatishi <strong>shart bo'lmagan</strong> fayllar bo'ladi: vaqtinchalik fayllar, o'rnatilgan kutubxonalar, maxfiy parollar, tahrirlagich sozlamalari. Bularni omborga qo'shish keraksiz — ular joyni to'ldiradi, xavfsizlikka putur yetkazadi va boshqa kompyuterlarda muammo tug'diradi." },
        { p: "<strong>.gitignore</strong> — bu maxsus fayl bo'lib, unda Git e'tiborsiz qoldirishi kerak bo'lgan fayl va papkalar ro'yxati yoziladi. U loyihaning ildiz (root) papkasida joylashadi. Bu faylda ko'rsatilgan narsalar <code>git status</code>da umuman ko'rinmaydi va tasodifan commit qilib bo'lmaydi." },

        { h2: ".gitignore namunasi" },
        { p: "Mana tipik <code>.gitignore</code> fayli namunasi. Har bir qator — bir naqsh (pattern):" },
        { code: "# Node.js bog'liqliklari (juda katta, kuzatilmaydi)\nnode_modules/\n\n# Muhit o'zgaruvchilari va maxfiy ma'lumotlar\n.env\n.env.local\n\n# Log fayllari\n*.log\nlogs/\n\n# Operatsion tizim yaratadigan fayllar\n.DS_Store\nThumbs.db\n\n# Tahrirlagich sozlamalari\n.vscode/\n.idea/\n\n# Yig'ish (build) natijalari\ndist/\nbuild/" },
        { p: "Naqsh qoidalarini tushunamiz:" },
        { ul: [
          "<code>node_modules/</code> — oxiridagi <code>/</code> bu <strong>papka</strong> ekanligini bildiradi;",
          "<code>*.log</code> — yulduzcha (<code>*</code>) istalgan nomga mos keladi; bu <em>barcha</em> <code>.log</code> bilan tugaydigan fayllarni e'tiborsiz qoldiradi;",
          "<code># bilan boshlanadigan qator</code> — bu <strong>izoh</strong>, Git uni o'qimaydi;",
          "<code>.env</code> — aniq fayl nomi; xavfsizlik uchun parol va kalitlar shu yerda saqlanib, hech qachon commit qilinmaydi."
        ] },
        { tip: "Har bir dasturlash tili va vositasi uchun tayyor <code>.gitignore</code> shablonlari bor. github.com/github/gitignore omborida yuzlab tilga mos namunalar mavjud. Yangi loyiha ochganingizda o'z tilingizga mos shablonni oling va kerakli qatorlarni qo'shing." },
        { warn: "<strong>Maxfiy ma'lumotlarni</strong> (parol, API kalitlari, tokenlar) hech qachon commit qilmang! Ularni <code>.env</code>ga yozib, <code>.env</code>ni <code>.gitignore</code>ga qo'shing. Agar tasodifan maxfiy ma'lumot GitHub'ga tushib qolsa — uni darhol <strong>bekor qiling (o'zgartiring)</strong>, chunki commit tarixidan uni butunlay o'chirish qiyin va u allaqachon ko'rilgan bo'lishi mumkin." },

        { h2: "Allaqachon kuzatilayotgan faylni chiqarish: git rm --cached" },
        { p: "Muhim nuance: <code>.gitignore</code> faqat <strong>hali kuzatilmagan</strong> (Git bilmaydigan) fayllarga ta'sir qiladi. Agar fayl allaqachon commit qilingan bo'lsa, uni <code>.gitignore</code>ga qo'shish yetarli emas — Git uni kuzatishda davom etadi." },
        { p: "Masalan, siz <code>.env</code>ni adashib commit qildingiz, keyin <code>.gitignore</code>ga qo'shdingiz — lekin u hali ham kuzatilmoqda. Uni kuzatuvdan chiqarish uchun <code>git rm --cached</code>:" },
        { code: "# faylni kuzatuvdan chiqaramiz, lekin diskda saqlaymiz\n$ git rm --cached .env\nrm '.env'\n\n# endi o'zgarishni commit qilamiz\n$ git commit -m '.env faylini kuzatuvdan chiqardim'" },
        { p: "Muhim: <code>--cached</code> bayrog'i faylni <strong>faqat Git kuzatuvidan</strong> chiqaradi, diskdagi haqiqiy faylga tegmaydi. Agar oddiy <code>git rm .env</code> (--cached'siz) yozsangiz — fayl diskdan ham o'chib ketadi!" },
        { p: "Papka uchun <code>-r</code> (recursive) qo'shiladi:" },
        { code: "# butun papkani kuzatuvdan chiqarish\n$ git rm -r --cached node_modules/" },

        { h2: "O'zgarishni bekor qilish: restore, reset, revert" },
        { p: "Xatolar bo'ladi — Git ularni orqaga qaytarishning uch xil vositasini beradi. Ularni chalkashtirmaslik juda muhim, chunki ular <strong>turli darajada</strong> ishlaydi:" },
        { ul: [
          "<code>git restore</code> — <strong>saqlanmagan</strong> (commit qilinmagan) o'zgarishlarni bekor qiladi;",
          "<code>git reset</code> — commitlarni <strong>orqaga suradi</strong> (tarixni o'zgartiradi);",
          "<code>git revert</code> — mavjud commit'ni bekor qiluvchi <strong>yangi commit</strong> yaratadi (tarixni saqlaydi)."
        ] },
        { p: "Har birini alohida ko'ramiz." },

        { h3: "git restore — saqlanmagan o'zgarishni tashlash" },
        { p: "Faylni o'zgartirdingiz-u, lekin bu o'zgarish yoqmadi va oxirgi commit holatiga qaytarmoqchisiz. <code>git restore</code>:" },
        { code: "# bitta faylni oxirgi commit holatiga qaytarish\n$ git restore index.html\n\n# barcha o'zgarishlarni bekor qilish\n$ git restore ." },
        { warn: "<code>git restore</code> saqlanmagan o'zgarishlarni <strong>butunlay yo'qotadi</strong> — ularni qaytarib bo'lmaydi. Faqat rostdan kerak emasligiga ishonganingizda ishlating. Agar faylni <code>git add</code> qilib bo'lgan bo'lsangiz, uni staging'dan chiqarish uchun: <code>git restore --staged fayl</code>." },

        { h3: "git reset — commitni orqaga surish" },
        { p: "<code>git reset</code> branch ko'rsatkichini oldingi commit'ga qaytaradi. Uch rejim bor:" },
        { ul: [
          "<code>--soft</code> — commit bekor qilinadi, lekin o'zgarishlar staging'da (add qilingan holatda) qoladi;",
          "<code>--mixed</code> (standart) — commit bekor qilinadi, o'zgarishlar saqlanadi lekin staging'dan chiqadi;",
          "<code>--hard</code> — commit ham, o'zgarishlar ham <strong>butunlay o'chadi</strong>."
        ] },
        { code: "# oxirgi commit'ni bekor qilib, o'zgarishlarni saqlash\n$ git reset --soft HEAD~1\n\n# oxirgi commit'ni va barcha o'zgarishlarni o'chirish (xavfli!)\n$ git reset --hard HEAD~1" },
        { p: "Bu yerda <code>HEAD~1</code> \"oxirgi commit'dan bitta oldingisi\" degani." },
        { warn: "<code>git reset</code> tarixni o'zgartiradi. <strong>Allaqachon push qilingan</strong> commitlarga <code>reset</code> qilmang — bu jamoadoshlaringiz uchun katta muammo tug'diradi. Push qilingan o'zgarishni bekor qilish uchun <code>git revert</code>dan foydalaning." },

        { h3: "git revert — xavfsiz bekor qilish" },
        { p: "<code>git revert</code> eski commit'ni o'chirmaydi — uning ta'sirini bekor qiluvchi <strong>yangi commit</strong> yaratadi. Bu tarixni saqlaydi va push qilingan commitlar uchun xavfsiz:" },
        { code: "# ma'lum bir commit'ni bekor qiluvchi yangi commit yaratish\n$ git revert 1a2b3c4\n[main 8h9i0j1] Revert 'Xato funksiya qoshildi'" },
        { note: "Amaliy qoida: <strong>mahalliy</strong>, hali push qilinmagan xatolar uchun <code>reset</code> qulay. <strong>Push qilingan</strong> (jamoa ko'rgan) commitlar uchun esa <strong>doim</strong> <code>revert</code> ishlating — u tarixni buzmaydi va hamma xavfsiz sinxron qoladi." },

        { h2: "Ishni vaqtincha yashirish: git stash" },
        { p: "Ba'zan yarim tayyor ish ustida turasiz-u, to'satdan boshqa narsaga o'tishga to'g'ri keladi (masalan, shoshilinch xato tuzatish). Lekin yarim ishni commit qilishni istamaysiz. <strong>git stash</strong> — o'zgarishlarni vaqtincha <em>yashiradi</em> va ish stolini tozalaydi:" },
        { code: "# joriy o'zgarishlarni yashiramiz\n$ git stash\nSaved working directory and index state WIP on main: 5d6e7f8 oxirgi commit\n\n# endi ish stoli toza — boshqa branch'ga o'tsa bo'ladi\n$ git status\nnothing to commit, working tree clean" },
        { p: "Boshqa ishni bajarib bo'lgach, yashirilgan o'zgarishlarni qaytarib olasiz:" },
        { code: "# yashirilgan o'zgarishni qaytarib, ro'yxatdan o'chirish\n$ git stash pop\n\n# yashirilganlar ro'yxatini ko'rish\n$ git stash list\nstash@{0}: WIP on main: 5d6e7f8 oxirgi commit" },
        { p: "Asosiy stash buyruqlari:" },
        { ul: [
          "<code>git stash</code> — joriy o'zgarishlarni yashirish;",
          "<code>git stash list</code> — yashirilganlar ro'yxati;",
          "<code>git stash pop</code> — oxirgi yashiringanni qaytarish va ro'yxatdan o'chirish;",
          "<code>git stash apply</code> — qaytarish, lekin ro'yxatda saqlab qolish;",
          "<code>git stash drop</code> — yashirilganni o'chirish;",
          "<code>git stash clear</code> — barcha yashiringanlarni tozalash."
        ] },
        { tip: "Stash — vaqtinchalik yechim. Uni uzoq muddat saqlamang, aks holda unutib qolasiz. Agar ish jiddiyroq bo'lsa, stash o'rniga alohida branch ochib, u yerda commit qilgan ma'qul." },

        { h2: "Versiyalarni belgilash: git tag qisqacha" },
        { p: "<strong>Tag</strong> — bu ma'lum bir commit'ga qo'yilgan doimiy nom (yorliq). U ko'pincha loyiha versiyalarini belgilash uchun ishlatiladi: <code>v1.0.0</code>, <code>v2.1.3</code> va h.k. Branch'dan farqli, tag siljimaydi — u doim bir commit'ga ishora qiladi." },
        { code: "# joriy commit'ga versiya tegi qo'yish\n$ git tag v1.0.0\n\n# izohli tag (tavsiya etiladi)\n$ git tag -a v1.0.0 -m 'Birinchi barqaror versiya'\n\n# barcha teglarni ko'rish\n$ git tag\nv1.0.0\n\n# teglarni GitHub'ga yuborish (push ularni avtomatik yubormaydi!)\n$ git push origin v1.0.0" },
        { note: "Oddiy <code>git push</code> teglarni <strong>yubormaydi</strong> — ularni alohida push qilish kerak. Barcha teglarni birdan yuborish uchun: <code>git push origin --tags</code>. Teglar ko'pincha GitHub'da \"Releases\" (chiqarilishlar) yaratish uchun asos bo'ladi." },

        { h2: "Yaxshi commit xabari yozish qoidalari" },
        { p: "Commit xabari — bu kelajakdagi o'zingiz va jamoadoshlaringiz uchun izoh. Yaxshi xabar kodni tushunishni osonlashtiradi. Mana asosiy qoidalar:" },
        { ul: [
          "<strong>Qisqa va aniq sarlavha</strong> — 50 belgidan oshmasin; nima qilinganini aniq bildirsin;",
          "<strong>Buyruq ohangi</strong> — \"Login xatosini tuzatdim\" yoki \"Fix login bug\" kabi; \"tuzatilyapti\" emas;",
          "<strong>Nimani va nima uchun</strong> — sarlavhada nima o'zgargani, kerak bo'lsa tavsifda nima uchun o'zgargani;",
          "<strong>Bitta commit — bitta mantiqiy o'zgarish</strong> — bir nechta bog'liq bo'lmagan o'zgarishni bitta commit'ga aralashtirmang;",
          "<strong>Ma'nosiz xabarlardan qoching</strong> — \"tuzatildi\", \"o'zgarish\", \"asdf\" kabilar keyinchalik hech narsa aytmaydi."
        ] },
        { p: "Yomon va yaxshi misollarni solishtiring:" },
        { code: "# Yomon xabarlar:\ngit commit -m 'tuzatildi'\ngit commit -m 'o'zgarish'\ngit commit -m 'asdfgh'\n\n# Yaxshi xabarlar:\ngit commit -m 'Login formasidagi validatsiya xatosini tuzatdim'\ngit commit -m 'Bosh sahifaga qidiruv paneli qoshdim'\ngit commit -m 'README ga o'rnatish yoriqnomasini qoshdim'" },
        { p: "Uzunroq izoh kerak bo'lsa, ko'p qatorli commit ham yozish mumkin — sarlavhadan keyin bo'sh qator qoldirib, batafsil tavsif yoziladi:" },
        { code: "$ git commit\n# tahrirlagich ochiladi, quyidagicha yoziladi:\n\nQidiruv funksiyasini optimallashtirdim\n\nAvvalgi qidiruv har bir bosishda serverga so'rov yuborardi,\nbu esa yukni oshirardi. Endi 300ms kechikish (debounce)\nqo'shildi — so'rovlar soni sezilarli kamaydi." },
        { tip: "Ko'p jamoalar <strong>Conventional Commits</strong> kelishuviga amal qiladi: <code>feat:</code> (yangi funksiya), <code>fix:</code> (xato tuzatish), <code>docs:</code> (hujjat), <code>refactor:</code> (qayta yozish). Masalan: <code>feat: qidiruv paneli qoshildi</code>. Bu tarixni o'qishni va avtomatlashtirishni osonlashtiradi." },

        { h2: "Xulosa" },
        { ul: [
          "<strong>.gitignore</strong> — kuzatilishi shart bo'lmagan fayllar (node_modules, .env, *.log) ro'yxati;",
          "<code>git rm --cached fayl</code> — allaqachon kuzatilayotgan faylni kuzatuvdan chiqarish (diskda qoldirib);",
          "<code>git restore</code> — saqlanmagan o'zgarishni bekor qilish;",
          "<code>git reset</code> — commitni orqaga surish (mahalliy, push qilinmagan uchun);",
          "<code>git revert</code> — bekor qiluvchi yangi commit (push qilingan uchun xavfsiz);",
          "<code>git stash</code> — ishni vaqtincha yashirish, <code>git stash pop</code> — qaytarish;",
          "<code>git tag v1.0.0</code> — versiyalarni belgilash (push uchun <code>--tags</code>);",
          "<strong>yaxshi commit xabari</strong> — qisqa, aniq, buyruq ohangida, ma'noli."
        ] },
        { p: "Ushbu vositalar bilan siz Git'ni ishonchli va toza tarzda ishlata olasiz. Bu — professional dasturchining kundalik asboblar to'plami. Tabriklaymiz, Git va GitHub bo'limini yakunladingiz!" }
      ]
    }
  ]
};
