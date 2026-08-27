"use strict";
module.exports = {
  part: "8-qism: Algoritmlar va ma'lumotlar tuzilmalari",
  chapter: "Ilg'or texnikalar",
  lessons: [
    {
      slug: "backtracking",
      title: "Backtracking (orqaga qaytish)",
      blurb: "Barcha variantlarni tizimli sinab, boshi berk ko'chadan orqaga qaytish: kombinatsiyalar, o'rin almashtirishlar va klassik masalalar.",
      body: [
        { lead: "Ba'zan masalada bitta to'g'ri javob emas, balki barcha mumkin bo'lgan variantlarni topish so'raladi. Backtracking — bu yechimni bosqichma-bosqich qurib, agar boshi berk ko'chaga kirib qolsak, bir qadam orqaga qaytib boshqa yo'lni sinaydigan sabrli qidiruv uslubi. Keling, bu chiroyli g'oyani birga o'rganamiz." },

        { h2: "G'oyaning mohiyati" },
        { p: "Backtracking so'zma-so'z <strong>orqaga qaytish</strong> degani. Biz yechimni bir bo'lakdan boshlab quramiz: bitta qaror qabul qilamiz, keyingisini, yana keyingisini. Agar biror joyda tanlovimiz masalaning shartlarini buzsa yoki hech qanday davomi qolmasa, biz oxirgi qarorni bekor qilib, boshqa variantni sinaymiz." },
        { p: "Bu xuddi labirintda yurishga o'xshaydi: bir yo'lni tanlaysan, devorga borib taqalsang, kelgan joyingga qaytib boshqa burilishni sinaysan. Hech qanday yo'lni nazardan qochirmaysan, lekin baribir tartib bilan harakat qilasan." },
        { p: "Backtracking uch klassik masalada eng ko'p uchraydi: <strong>qism to'plamlar</strong> (subsets), <strong>o'rin almashtirishlar</strong> (permutations) va <strong>kombinatsiyalar</strong>. Ularning barchasi bir xil skelet ustiga qurilgan." },

        { h2: "Qaror daraxti (decision tree)" },
        { p: "Backtracking jarayonini <strong>qaror daraxti</strong> sifatida tasavvur qilish juda foydali. Daraxtning har bir tugunida biz bitta tanlov qilamiz, har bir shox esa alohida variantga olib boradi. Barglar (eng pastdagi tugunlar) — bu tayyor yechimlar." },
        { p: "Masalan, <code>[1, 2, 3]</code> massivi uchun o'rin almashtirishlarni qurayotganda: birinchi qadamda 1, 2 yoki 3 ni tanlaymiz — daraxtning uch shoxi. Keyin qolganlaridan yana birini, va hokazo. Har bir to'liq yo'l bitta o'rin almashtirishni beradi." },
        { p: "Daraxt bo'ylab <strong>chuqurlikka qarab</strong> (depth-first) yuramiz: bir yo'lni oxirigacha borib, keyin orqaga qaytib qo'shni shoxga o'tamiz. Aynan shu \"oxirigacha bor, keyin qayt\" harakati backtracking deb ataladi." },

        { h2: "Umumiy shablon: choose, explore, unchoose" },
        { p: "Deyarli barcha backtracking yechimlari bir xil uch qadamli ritmga bo'ysunadi. Buni yodda tutsangiz, yangi masalani ham osongina yechasiz:" },
        { ol: [
          "<strong>Choose (tanla)</strong> — hozirgi holatga bitta element qo'sh yoki qaror qabul qil.",
          "<strong>Explore (o'rgan)</strong> — shu tanlov bilan rekursiya orqali chuqurroq kir.",
          "<strong>Unchoose (bekor qil)</strong> — qaytib kelganda tanlovni orqaga ol, holatni avvalgi ko'rinishga qaytar."
        ] },
        { code: [
          "function backtrack(holat, natijalar) {",
          "  if (bazaviyShart(holat)) {",
          "    natijalar.push(holat.slice()); // nusxasini saqla",
          "    return;",
          "  }",
          "  for (const variant of mumkinVariantlar(holat)) {",
          "    holat.push(variant);      // choose",
          "    backtrack(holat, natijalar); // explore",
          "    holat.pop();              // unchoose",
          "  }",
          "}"
        ].join("\n") },
        { warn: "Yechimni saqlaganda albatta uning <strong>nusxasini</strong> oling (masalan <code>holat.slice()</code>). Aks holda keyin <code>pop()</code> bilan o'zgartiradigan bir xil massivga havolani saqlab qo'yasiz va oxirida hammasi bo'sh yoki noto'g'ri chiqadi." },

        { h2: "Misol: qism to'plamlar (subsets)" },
        { p: "Berilgan massivning barcha qism to'plamlarini topaylik. Har bir element uchun ikki yo'l bor: uni <strong>olamiz</strong> yoki <strong>olmaymiz</strong>. Shu ikki tanlov qaror daraxtini hosil qiladi." },
        { pg: [
          "function subsets(nums) {",
          "  const natija = [];",
          "  const yol = [];",
          "",
          "  function backtrack(boshlanish) {",
          "    // har bir tugun o'zi bir qism to'plam",
          "    natija.push(yol.slice());",
          "    for (let i = boshlanish; i < nums.length; i++) {",
          "      yol.push(nums[i]);        // choose",
          "      backtrack(i + 1);         // explore",
          "      yol.pop();                // unchoose",
          "    }",
          "  }",
          "",
          "  backtrack(0);",
          "  return natija;",
          "}",
          "",
          "const barchasi = subsets([1, 2, 3]);",
          "console.log('Jami qism to\\'plamlar:', barchasi.length);",
          "for (const t of barchasi) {",
          "  console.log('[' + t.join(', ') + ']');",
          "}"
        ].join("\n"), file: "subsets.js" },
        { p: "<code>n</code> ta elementli massivda aynan <code>2^n</code> ta qism to'plam bor (chunki har biri uchun ikki tanlov). <code>[1, 2, 3]</code> uchun bu 8 ta — jumladan bo'sh to'plam va to'liq to'plam." },

        { h2: "Misol: o'rin almashtirishlar (permutations)" },
        { p: "Endi massivning barcha <strong>o'rin almashtirishlarini</strong> — elementlarning barcha tartiblarini — quramiz. Bu yerda har bir yechimda hamma element qatnashadi, faqat tartibi farq qiladi. Shuning uchun qaysi elementlar allaqachon ishlatilganini belgilab boramiz." },
        { pg: [
          "function permutations(nums) {",
          "  const natija = [];",
          "  const yol = [];",
          "  const ishlatilgan = new Array(nums.length).fill(false);",
          "",
          "  function backtrack() {",
          "    if (yol.length === nums.length) {",
          "      natija.push(yol.slice());",
          "      return;",
          "    }",
          "    for (let i = 0; i < nums.length; i++) {",
          "      if (ishlatilgan[i]) continue; // bu element band",
          "      ishlatilgan[i] = true;",
          "      yol.push(nums[i]);            // choose",
          "      backtrack();                  // explore",
          "      yol.pop();                    // unchoose",
          "      ishlatilgan[i] = false;",
          "    }",
          "  }",
          "",
          "  backtrack();",
          "  return natija;",
          "}",
          "",
          "const hammasi = permutations([1, 2, 3]);",
          "console.log('Jami o\\'rin almashtirishlar:', hammasi.length);",
          "for (const p of hammasi) {",
          "  console.log(p.join(' '));",
          "}"
        ].join("\n"), file: "permutations.js" },
        { p: "<code>n</code> ta elementning o'rin almashtirishlari soni <code>n!</code> (n faktorial) ga teng: birinchi joyga <code>n</code> ta nomzod, ikkinchisiga <code>n-1</code>, va hokazo. <code>[1, 2, 3]</code> uchun bu <code>3! = 6</code>." },

        { h2: "Misol: to'g'ri qavslar generatsiyasi" },
        { p: "Yana bir klassik masala: <code>n</code> juft qavs bilan barcha <strong>to'g'ri joylashgan</strong> qavs ketma-ketliklarini yaratish. Bu yerda backtracking pruning bilan chiroyli birlashadi." },
        { pg: [
          "function qavslar(n) {",
          "  const natija = [];",
          "",
          "  function backtrack(joriy, ochilgan, yopilgan) {",
          "    if (joriy.length === 2 * n) {",
          "      natija.push(joriy);",
          "      return;",
          "    }",
          "    // faqat mantiqiy tanlovlarni sinaymiz (pruning)",
          "    if (ochilgan < n) {",
          "      backtrack(joriy + '(', ochilgan + 1, yopilgan);",
          "    }",
          "    if (yopilgan < ochilgan) {",
          "      backtrack(joriy + ')', ochilgan, yopilgan + 1);",
          "    }",
          "  }",
          "",
          "  backtrack('', 0, 0);",
          "  return natija;",
          "}",
          "",
          "const q = qavslar(3);",
          "console.log('Jami:', q.length);",
          "for (const s of q) console.log(s);"
        ].join("\n"), file: "qavslar.js" },
        { p: "Diqqat qiling: biz <code>)</code> ni faqat ochilgan qavslar hali yopilmaganidagina qo'shamiz. Shu bilan noto'g'ri variantlar umuman qurilmaydi — bu <strong>pruning</strong>." },

        { h2: "Pruning: keraksiz shoxlarni kesish" },
        { p: "<strong>Pruning</strong> (butash) — bu qaror daraxtining aniq foydasiz shoxlarini oldindan kesib tashlash. Agar biz hozirning o'zida yechim bo'la olmasligini bilsak, o'sha yo'lni umuman o'rganmaymiz. Bu backtracking tezligini keskin oshiradi." },
        { p: "Qavslar misolida <code>yopilgan &lt; ochilgan</code> shartisiz biz avval barcha <code>2^(2n)</code> ketma-ketlikni qurib, keyin noto'g'rilarni tashlab yuborardik. Pruning bilan esa faqat haqiqiy nomzodlar quriladi." },
        { tip: "Har safar tanlov qilishdan oldin o'zingizga savol bering: \"Bu shoxda umuman yechim bo'lishi mumkinmi?\" Agar javob yo'q bo'lsa — shoxni keskin. Bu ko'pincha eksponensial ishni amalda juda tez qiladi." },

        { h2: "Murakkablik va yana bir bor N-Queens" },
        { p: "Backtracking tabiatan barcha variantlarni sinagani uchun uning murakkabligi odatda <strong>eksponensial</strong> bo'ladi. Qism to'plamlar uchun <code>O(2^n)</code>, o'rin almashtirishlar uchun <code>O(n!)</code>. Pruning bularni amalda tezlashtiradi, lekin nazariy chegara o'zgarmaydi." },
        { p: "Mashhur <strong>N-Queens</strong> (shohmot taxtasiga bir-birini urmaydigan N ta farzin joylash) va <strong>Sudoku yechuvchi</strong> masalalari ham xuddi shu shablon ustiga qurilgan: har katakka nomzod qo'yib ko'r, agar qoidani buzsa — orqaga qayt. Bu yerda ularni faqat mashhur misol sifatida eslatib o'tamiz — mohiyat esa bir xil choose-explore-unchoose." },
        { warn: "Eksponensial murakkablik tufayli backtracking faqat <strong>kichik n</strong> uchun amaliy. <code>n = 20</code> da <code>2^20</code> ~ million, bu qiyin emas. Lekin <code>n = 50</code> da <code>2^50</code> allaqachon amalda hisoblab bo'lmaydigan katta son. Katta n uchun boshqa texnika (masalan dinamik dasturlash) izlang." },

        { tip: "Masala matnida \"<strong>barcha mumkin variantlarni top</strong>\", \"barcha kombinatsiyalar\", \"barcha yo'llar\" degan so'zlarni ko'rsangiz — deyarli har doim backtracking haqida o'ylang. Choose, explore, unchoose ritmini eslang." }
      ]
    },

    {
      slug: "dynamic-programming",
      title: "Dinamik dasturlash (DP)",
      blurb: "Takrorlanuvchi qism masalalarni eslab qolish: memoizatsiya va tabulyatsiya, Fibonacci, tanga va bosqichlar masalasi.",
      body: [
        { lead: "Dinamik dasturlash — bu qo'rqinchli nomga ega, lekin aslida juda sodda va nafis g'oyaga tayanadigan texnika: bir marta hisoblagan javobingni yana qayta hisoblama, uni eslab qol. Keling, bu \"eslab qolish\" san'atini birga o'zlashtiramiz." },

        { h2: "DP nima va nega kerak" },
        { p: "<strong>Dinamik dasturlash</strong> (DP) — katta masalani kichikroq <strong>qism masalalarga</strong> bo'lib, ularning javoblarini bir marta hisoblab, eslab qolib, keyin qayta ishlatadigan yondashuv. \"Dinamik\" so'zi bu yerda \"o'zgaruvchan\" degani emas — bu shunchaki tarixiy nom, undan cho'chimang." },
        { p: "DP ning yuragi bitta oddiy kuzatuvda: ko'p rekursiv masalalarda <strong>bir xil qism masala qayta-qayta hisoblanadi</strong>. Agar biz javobni birinchi marta hisoblaganda saqlab qo'ysak, keyingi safar uni bir zumda o'qib olamiz." },

        { h2: "Ikki majburiy shart" },
        { p: "Har qanday masalada DP ishlamaydi. U ishlashi uchun ikki xususiyat kerak:" },
        { ul: [
          "<strong>Optimal substruktura</strong> — masalaning optimal yechimi uning qism masalalari optimal yechimlaridan quriladi. Ya'ni kichik javoblardan katta javobni yig'ish mumkin.",
          "<strong>Qism masalalar takrorlanishi</strong> (overlapping subproblems) — bir xil qism masala hisoblash davomida qayta-qayta uchraydi. Aynan shu takror bizga eslab qolishdan foyda beradi."
        ] },
        { p: "Agar qism masalalar takrorlanmasa (masalan oddiy \"bo'l va hukmronlik qil\" saralashda), DP dan foyda yo'q. Takror bor joyda esa DP mo'jiza yaratadi." },

        { h2: "Muammo: naive rekursiv Fibonacci" },
        { p: "Klassik misol — Fibonacci sonlari. Har bir son o'zidan oldingi ikkitasining yig'indisi: <code>F(n) = F(n-1) + F(n-2)</code>. To'g'ridan-to'g'ri rekursiya bilan yozsak, chiroyli ko'rinadi, lekin sekin:" },
        { pg: [
          "let chaqiruvlar = 0;",
          "",
          "function fib(n) {",
          "  chaqiruvlar++;",
          "  if (n < 2) return n;",
          "  return fib(n - 1) + fib(n - 2);",
          "}",
          "",
          "console.log('fib(10) =', fib(10));",
          "console.log('Funksiya chaqiruvlari:', chaqiruvlar);",
          "",
          "chaqiruvlar = 0;",
          "console.log('fib(20) =', fib(20));",
          "console.log('Funksiya chaqiruvlari:', chaqiruvlar);"
        ].join("\n"), file: "fib-naive.js" },
        { p: "Chaqiruvlar soniga qarang — u portlab ketadi! Sababi: <code>fib(20)</code> hisoblanayotganda <code>fib(18)</code> ikki marta, <code>fib(17)</code> uch marta, <code>fib(10)</code> esa yuzlab marta qayta hisoblanadi. Bu <strong>O(2^n)</strong> murakkablik — eksponensial." },
        { warn: "Naive Fibonacci <code>fib(50)</code> da kompyuteringizni bir necha daqiqaga muzlatib qo'yadi, chunki taxminan <code>2^50</code> ta chaqiruv kerak bo'ladi. Bu aynan takroriy hisoblash isrofi." },

        { h2: "Yechim 1: Top-down (memoizatsiya)" },
        { p: "<strong>Memoizatsiya</strong> — bu \"esdalik\" (memo) so'zidan. Biz rekursiyani saqlab qolamiz, lekin har bir hisoblangan javobni keshga (obyekt yoki massivga) yozamiz. Keyingi safar o'sha qism masala so'ralsa, qayta hisoblamay keshdan o'qiymiz." },
        { pg: [
          "let chaqiruvlar = 0;",
          "",
          "function fib(n, kesh = {}) {",
          "  chaqiruvlar++;",
          "  if (n < 2) return n;",
          "  if (kesh[n] !== undefined) return kesh[n]; // eslab qolgan javob",
          "  kesh[n] = fib(n - 1, kesh) + fib(n - 2, kesh);",
          "  return kesh[n];",
          "}",
          "",
          "console.log('fib(20) =', fib(20));",
          "console.log('Funksiya chaqiruvlari:', chaqiruvlar);",
          "",
          "chaqiruvlar = 0;",
          "console.log('fib(50) =', fib(50));",
          "console.log('Funksiya chaqiruvlari:', chaqiruvlar);"
        ].join("\n"), file: "fib-memo.js" },
        { p: "Chaqiruvlar soniga yana qarang — endi u <code>n</code> ga chiziqli. Har bir <code>fib(k)</code> faqat bir marta haqiqiy hisoblanadi, qolgani keshdan keladi. Bu <strong>O(n)</strong>. <code>fib(50)</code> endi bir zumda hisoblanadi." },
        { p: "Bu yondashuv <strong>top-down</strong> (yuqoridan pastga) deyiladi, chunki biz kattadan (<code>fib(50)</code>) boshlab, rekursiya bilan kichiklarga tushamiz." },

        { h2: "Yechim 2: Bottom-up (tabulyatsiya)" },
        { p: "<strong>Tabulyatsiya</strong> — bu \"jadval\" (table) so'zidan. Bu yerda rekursiya umuman yo'q. Biz eng kichik javoblardan boshlab, jadvalni (massivni) pastdan yuqoriga tartib bilan to'ldiramiz, toki kerakli katta javobga yetguncha." },
        { pg: [
          "function fib(n) {",
          "  if (n < 2) return n;",
          "  const jadval = new Array(n + 1);",
          "  jadval[0] = 0;",
          "  jadval[1] = 1;",
          "  for (let i = 2; i <= n; i++) {",
          "    jadval[i] = jadval[i - 1] + jadval[i - 2]; // pastdan to'ldirish",
          "  }",
          "  return jadval[n];",
          "}",
          "",
          "console.log('fib(10) =', fib(10));",
          "console.log('fib(20) =', fib(20));",
          "console.log('fib(50) =', fib(50));"
        ].join("\n"), file: "fib-tab.js" },
        { p: "Bu ham <strong>O(n)</strong> vaqt. Bu yondashuv <strong>bottom-up</strong> (pastdan yuqoriga) deyiladi: eng kichik holatlardan boshlab yuqoriga chiqamiz. Rekursiya bo'lmagani uchun stek to'lib ketish xavfi ham yo'q." },
        { note: "Fibonacci uchun bizga faqat oxirgi ikki qiymat kerak, shuning uchun jadval o'rniga ikki o'zgaruvchi bilan xotirani <code>O(n)</code> dan <code>O(1)</code> ga tushirish mumkin. DP da ko'pincha xotirani shunday siqish imkoni bo'ladi." },

        { h2: "Ikki yondashuvni taqqoslash" },
        { ul: [
          "<strong>Memoizatsiya (top-down)</strong>: yozish tabiiy va oson, chunki naive rekursiyaga bir necha qator qo'shamiz xolos. Lekin rekursiya stekidan foydalanadi va faqat kerakli qism masalalarni hisoblaydi.",
          "<strong>Tabulyatsiya (bottom-up)</strong>: rekursiya yo'q, stek xavfsiz, ko'pincha tezroq va xotira jihatidan tejamli. Lekin barcha qism masalalarni tartib bilan hisoblash kerak va hisoblash tartibini o'ylab topish biroz mashq talab qiladi."
        ] },
        { p: "Ikkalasining ham vaqt murakkabligi bir xil — bu yerda <code>O(n)</code>. Qaysi birini tanlash ko'pincha did va masala shakliga bog'liq. Boshlash uchun memoizatsiya ko'pincha osonroq." },

        { h2: "Klassik misol: zinapoya (climbing stairs)" },
        { p: "Siz zinapoyaning tepasiga chiqmoqchisiz. Har qadamda 1 yoki 2 pog'ona ko'tarilishingiz mumkin. <code>n</code> pog'onali zinaga necha xil usulda chiqasiz? Bu masala aslida yashirin Fibonacci!" },
        { pg: [
          "function zinapoya(n) {",
          "  // n-pog'onaga chiqish uchun: (n-1)dan 1 qadam yoki (n-2)dan 2 qadam",
          "  if (n <= 2) return n;",
          "  let ikkiOldin = 1; // 1-pog'ona",
          "  let birOldin = 2;  // 2-pog'ona",
          "  for (let i = 3; i <= n; i++) {",
          "    const joriy = birOldin + ikkiOldin;",
          "    ikkiOldin = birOldin;",
          "    birOldin = joriy;",
          "  }",
          "  return birOldin;",
          "}",
          "",
          "for (let n = 1; n <= 6; n++) {",
          "  console.log(n + ' pog\\'ona -> ' + zinapoya(n) + ' xil usul');",
          "}"
        ].join("\n"), file: "zinapoya.js" },
        { p: "Bu yerda holat oddiy: <code>usullar(n) = usullar(n-1) + usullar(n-2)</code>. Har bir pog'onaga faqat undan bir yoki ikki past pog'onadan kelish mumkin. Biz xotirani <code>O(1)</code> ga siqib, ikki o'zgaruvchi bilan yechdik." },

        { h2: "Yana ikki mashhur masala va DP qadamlari" },
        { p: "<strong>Tanga masalasi</strong> (coin change): berilgan nominallar bilan ma'lum summani yig'ish uchun eng kam tanga sonini top. Bu yerda holat — \"shu summani yig'ishning eng kam tanga soni\", va har bir tanga qiymatini ayirib qism masalaga o'tamiz. Ushbu masalada, keyingi darsda ko'ramizki, ochko'z yondashuv har doim to'g'ri javob bermaydi, DP esa beradi." },
        { p: "<strong>Eng uzun umumiy qism ketma-ketlik</strong> (Longest Common Subsequence, LCS): ikki satrning ikkalasida ham bir xil tartibda uchraydigan eng uzun qism ketma-ketlik uzunligini top. Bu ikki o'lchovli DP jadvali bilan yechiladigan klassik masala." },
        { p: "Har qanday DP masalasini yechishning umumiy qadamlari:" },
        { ol: [
          "<strong>Holatni aniqlang</strong> — <code>dp[i]</code> (yoki <code>dp[i][j]</code>) aynan nimani anglatishini so'z bilan aniq ayting.",
          "<strong>Rekurrent formulani yozing</strong> — joriy holat qism holatlardan qanday hisoblanishini toping (masalan <code>dp[i] = dp[i-1] + dp[i-2]</code>).",
          "<strong>Baza holatlarini bering</strong> — eng kichik holatlarning javobini to'g'ridan-to'g'ri belgilang (masalan <code>dp[0]</code>, <code>dp[1]</code>).",
          "<strong>Hisoblash tartibini tanlang</strong> — top-down memoizatsiya yoki bottom-up tabulyatsiya."
        ] },

        { tip: "Agar rekursiv yechimingiz eksponensial sekin bo'lsa va siz bir xil qism masala qayta-qayta hisoblanayotganini sezsangiz — bu memoizatsiya qo'shish uchun aniq belgi. Bir kesh obyekti ko'pincha <code>O(2^n)</code> ni <code>O(n)</code> ga aylantiradi." }
      ]
    },

    {
      slug: "greedy",
      title: "Ochko'z algoritmlar (Greedy)",
      blurb: "Har qadamda mahalliy eng yaxshi tanlov: qachon ishlaydi, qachon aldaydi, va klassik ochko'z masalalar.",
      body: [
        { lead: "Ba'zan eng oddiy strategiya g'alaba keltiradi: har qadamda ayni damdagi eng yaxshi ko'rinadigan tanlovni qilib, orqaga qaramaslik. Bu ochko'z (greedy) yondashuv — tez va nafis, lekin ehtiyotkorlik talab qiladi. Keling, uning kuchi va aldamchiligini birga ko'raylik." },

        { h2: "G'oyaning mohiyati" },
        { p: "<strong>Ochko'z algoritm</strong> har qadamda faqat <strong>ayni damdagi eng yaxshi</strong> tanlovni qiladi va bu tanlovni keyin hech qachon qayta ko'rib chiqmaydi. U kelajakni o'ylamaydi, o'tmishga qaytmaydi — shunchaki mahalliy eng yaxshini oladi va oldinga yuradi." },
        { p: "Bu inson intuitsiyasiga o'xshaydi: qaytim berishda avval eng katta tangani bering, jadval tuzayotganda eng erta tugaydigan ishni oling. Ko'p hollarda bu ishlaydi va juda tez. Lekin — va bu muhim — <strong>har doim emas</strong>." },

        { h2: "Qachon ochko'z yondashuv to'g'ri ishlaydi" },
        { p: "Ochko'z algoritm to'g'ri javob berishi uchun masalada ikki xususiyat bo'lishi kerak:" },
        { ul: [
          "<strong>Greedy choice property</strong> (ochko'z tanlov xususiyati) — har bir mahalliy eng yaxshi tanlov global optimal yechimning bir qismi bo'la oladi. Ya'ni ochko'zlik bizni to'g'ri yo'ldan chalg'itmaydi.",
          "<strong>Optimal substruktura</strong> — global yechim qism masalalarning optimal yechimlaridan quriladi (bu xususiyatni DP darsidan tanaysiz)."
        ] },
        { p: "Agar bu ikki shart bajarilsa, ochko'z yondashuv nafaqat ishlaydi, balki ko'pincha DP dan tezroq. Muammo shundaki, bu shartlarni <strong>isbotlash</strong> kerak — shunchaki \"ishlaydiganga o'xshaydi\" deyish yetarli emas." },

        { h2: "Misol: tangalar bilan qaytim" },
        { p: "Mijozga qaytim berish uchun eng kam tanga sonini topaylik. Ochko'z g'oya oddiy: har safar summadan kichik yoki teng bo'lgan eng katta tangani oling." },
        { pg: [
          "function qaytim(summa, nominallar) {",
          "  // nominallarni kattadan kichikka saralaymiz",
          "  const tangalar = [...nominallar].sort((a, b) => b - a);",
          "  const natija = [];",
          "  for (const tanga of tangalar) {",
          "    while (summa >= tanga) {",
          "      summa -= tanga; // eng katta tangani ochko'zlik bilan olamiz",
          "      natija.push(tanga);",
          "    }",
          "  }",
          "  return natija;",
          "}",
          "",
          "const t = qaytim(63, [1, 5, 10, 25]);",
          "console.log('Tangalar:', t.join(', '));",
          "console.log('Jami tanga soni:', t.length);"
        ].join("\n"), file: "qaytim.js" },
        { p: "AQSh yoki O'zbekiston kabi \"yaxshi tuzilgan\" tanga tizimlarida bu ochko'z usul har doim eng kam tanga sonini beradi. <code>63</code> uchun: 25 + 25 + 10 + 1 + 1 + 1 = 6 ta tanga. Bu optimal." },

        { h2: "Misol: faoliyat rejalashtirish (activity selection)" },
        { p: "Sizda bir nechta tadbir bor, har biri boshlanish va tugash vaqtiga ega. Bir vaqtda faqat bitta tadbirda qatnashish mumkin. Maksimal nechta tadbirga ulgurasiz? Ochko'z yechim: har safar <strong>eng erta tugaydigan</strong> mos tadbirni oling." },
        { pg: [
          "function tadbirlar(ishlar) {",
          "  // tugash vaqti bo'yicha saralaymiz",
          "  const saralangan = [...ishlar].sort((a, b) => a.tugash - b.tugash);",
          "  const tanlangan = [];",
          "  let oxirgiTugash = -Infinity;",
          "  for (const ish of saralangan) {",
          "    if (ish.boshlanish >= oxirgiTugash) {",
          "      tanlangan.push(ish);          // ochko'z tanlov",
          "      oxirgiTugash = ish.tugash;",
          "    }",
          "  }",
          "  return tanlangan;",
          "}",
          "",
          "const ishlar = [",
          "  { nom: 'A', boshlanish: 1, tugash: 4 },",
          "  { nom: 'B', boshlanish: 3, tugash: 5 },",
          "  { nom: 'C', boshlanish: 0, tugash: 6 },",
          "  { nom: 'D', boshlanish: 5, tugash: 7 },",
          "  { nom: 'E', boshlanish: 8, tugash: 9 }",
          "];",
          "",
          "const natija = tadbirlar(ishlar);",
          "console.log('Tanlangan tadbirlar:', natija.map(i => i.nom).join(', '));",
          "console.log('Jami:', natija.length);"
        ].join("\n"), file: "tadbirlar.js" },
        { p: "Eng erta tugaydigan tadbirni tanlash kelasi tadbirlar uchun eng ko'p joy qoldiradi — bu yerda ochko'z tanlov isbotlangan tarzda optimal. Natija: A, D, E — uch tadbir." },

        { h2: "Ochko'z QACHON aldaydi" },
        { p: "Endi eng muhim saboqqa keldik. Ochko'z yondashuv har doim ham to'g'ri javob bermaydi. Xuddi tanga masalasini olaylik, lekin \"noqulay\" nominallar bilan: <code>[1, 3, 4]</code> va summa <code>6</code>." },
        { pg: [
          "// Ochko'z yondashuv",
          "function ochkozQaytim(summa, nominallar) {",
          "  const tangalar = [...nominallar].sort((a, b) => b - a);",
          "  const natija = [];",
          "  for (const tanga of tangalar) {",
          "    while (summa >= tanga) {",
          "      summa -= tanga;",
          "      natija.push(tanga);",
          "    }",
          "  }",
          "  return natija;",
          "}",
          "",
          "// To'g'ri (DP) yondashuv: eng kam tanga soni",
          "function dpQaytim(summa, nominallar) {",
          "  const dp = new Array(summa + 1).fill(Infinity);",
          "  dp[0] = 0;",
          "  for (let s = 1; s <= summa; s++) {",
          "    for (const t of nominallar) {",
          "      if (t <= s && dp[s - t] + 1 < dp[s]) {",
          "        dp[s] = dp[s - t] + 1;",
          "      }",
          "    }",
          "  }",
          "  return dp[summa];",
          "}",
          "",
          "const nominallar = [1, 3, 4];",
          "const ochkoz = ochkozQaytim(6, nominallar);",
          "console.log('Ochko\\'z:', ochkoz.join(' + '), '=>', ochkoz.length, 'tanga');",
          "console.log('DP (eng kam):', dpQaytim(6, nominallar), 'tanga');"
        ].join("\n"), file: "ochkoz-aldaydi.js" },
        { warn: "Natijaga qarang! Ochko'z yondashuv <code>6 = 4 + 1 + 1</code> deb uch tanga beradi. Lekin to'g'ri javob <code>6 = 3 + 3</code> — bor-yo'g'i ikki tanga! Ochko'z eng katta tangani (4) olishga shoshib, optimal yechimni boy berdi. Bunday holda DP kerak." },

        { h2: "Greedy va DP farqi" },
        { p: "Ochko'z va dinamik dasturlash bir xil turdagi optimallashtirish masalalariga qo'llaniladi, lekin ular boshqacha ishlaydi:" },
        { ul: [
          "<strong>Greedy</strong> har qadamda bitta tanlovni qiladi va uni hech qachon qayta ko'rmaydi. Tez (ko'pincha bir o'tishda), lekin faqat greedy choice property bajarilsagina to'g'ri.",
          "<strong>DP</strong> barcha imkoniyatlarni qism masalalar orqali ko'rib chiqadi va eng yaxshisini tanlaydi. Sekinroq, lekin har doim optimal (agar masala DP ga mos bo'lsa).",
          "Ishonchsiz bo'lsangiz DP ga tayaning: u ehtiyotkorroq. Greedy ni esa faqat to'g'riligiga ishonchingiz komil bo'lsa ishlating."
        ] },

        { h2: "Misol: fraksion ryukzak (Fractional Knapsack)" },
        { p: "Sizda sig'imi cheklangan ryukzak va bir nechta narsa bor — har birining vazni va qiymati ma'lum. <strong>Fraksion</strong> variantda narsaning bir qismini ham olsa bo'ladi (masalan oltin kukunini). Maksimal qiymatni yig'ish uchun ochko'z tanlov: har kilogrammga eng ko'p qiymat beradigan narsani (ya'ni <code>qiymat / vazn</code> nisbati eng kattasini) birinchi oling." },
        { pg: [
          "function fraksionRyukzak(narsalar, sigim) {",
          "  // qiymat/vazn nisbati bo'yicha kamayish tartibida saralaymiz",
          "  const saralangan = [...narsalar].sort(",
          "    (a, b) => (b.qiymat / b.vazn) - (a.qiymat / a.vazn)",
          "  );",
          "  let jamiQiymat = 0;",
          "  let qolgan = sigim;",
          "  for (const n of saralangan) {",
          "    if (qolgan <= 0) break;",
          "    const olinadi = Math.min(n.vazn, qolgan); // qismini olish mumkin",
          "    jamiQiymat += n.qiymat * (olinadi / n.vazn);",
          "    qolgan -= olinadi;",
          "  }",
          "  return jamiQiymat;",
          "}",
          "",
          "const narsalar = [",
          "  { nom: 'oltin',  vazn: 10, qiymat: 60 },  // nisbat 6.0",
          "  { nom: 'kumush', vazn: 20, qiymat: 100 }, // nisbat 5.0",
          "  { nom: 'bronza', vazn: 30, qiymat: 120 }  // nisbat 4.0",
          "];",
          "console.log('Maksimal qiymat:', fraksionRyukzak(narsalar, 50));"
        ].join("\n"), file: "ryukzak.js" },
        { p: "Sig'im 50: to'liq oltin (10) va kumush (20) olinadi, qolgan 20 ga bronzaning uchdan ikki qismi. Jami qiymat = 60 + 100 + 80 = <strong>240</strong>. Bu yerda ochko'z tanlov isbotlangan tarzda optimal." },
        { warn: "Diqqat: agar narsani <strong>bo'lish mumkin bo'lmasa</strong> (0/1 knapsack — yo butun olasan, yo umuman olmaysan), ochko'z yondashuv aldaydi va DP kerak bo'ladi. \"Fraksion\" so'zi bu yerda kalit — u ochko'zlikni to'g'ri qiladi." },

        { h2: "Misol: sakrash o'yini (Jump Game)" },
        { p: "Massiv berilgan; har katakdagi son — o'sha katakdan oldinga qancha sakrash mumkinligi. Birinchi katakdan oxirigacha yetib borish mumkinmi? Ochko'z g'oya: har qadamda <strong>hozirgacha yetib borish mumkin bo'lgan eng uzoq indeks</strong>ni kuzatib borish yetarli." },
        { pg: [
          "function yetibBoradimi(nums) {",
          "  let engUzoq = 0; // shu paytgacha yetsa bo'ladigan eng uzoq indeks",
          "  for (let i = 0; i < nums.length; i++) {",
          "    if (i > engUzoq) return false; // bu katakka umuman yetib bo'lmaydi",
          "    engUzoq = Math.max(engUzoq, i + nums[i]);",
          "  }",
          "  return true;",
          "}",
          "",
          "console.log(yetibBoradimi([2, 3, 1, 1, 4])); // true",
          "console.log(yetibBoradimi([3, 2, 1, 0, 4])); // false (indeks 3 da qotib qolamiz)"
        ].join("\n"), file: "jump-game.js" },
        { p: "Bu yerda barcha yo'llarni sinab ko'rish (backtracking) <code>O(2^n)</code> bo'lardi. Ochko'z yechim esa bitta o'tishda — <code>O(n)</code> vaqt, <code>O(1)</code> xotira. Har qadamda faqat \"eng uzoq yeta oladigan joy\"ni yangilash kifoya." },

        { h2: "Ochko'z tanlovni qanday isbotlash mumkin" },
        { p: "Ochko'z algoritmning eng qiyin qismi — kod emas, balki uning <strong>to'g'riligini isbotlash</strong>. Amaliyotda eng ko'p qo'llaniladigan usul — <em>almashtirish argumenti</em> (exchange argument):" },
        { ol: [
          "Faraz qiling, qandaydir optimal yechim bor, lekin u ochko'z tanlovdan farq qiladi.",
          "Ko'rsating: optimal yechimdagi birinchi \"farqli\" qadamni ochko'z tanlovga <strong>almashtirsak</strong>, yechim yomonlashmaydi (balki shunchalik yaxshi qoladi).",
          "Demak ochko'z tanlovni o'z ichiga olgan optimal yechim ham mavjud — ya'ni ochko'zlik xato qilmaydi."
        ] },
        { p: "Agar bunday almashtirishni asoslay olsangiz — ochko'z ishlaydi. Asoslay olmasangiz, ehtimol masala DP ni talab qiladi. Amalda tez tekshiruv: bir nechta kichik va \"noqulay\" misolda ochko'z javobini brute-force yoki DP javobi bilan solishtiring." },

        { h2: "Chegaraviy holatlar va tipik xatolar" },
        { ul: [
          "<strong>Bo'sh kirish:</strong> narsalar/tadbirlar ro'yxati bo'sh bo'lsa, natija 0 yoki bo'sh ro'yxat bo'lishi kerak — sikl umuman ishlamaydi, bu odatda to'g'ri.",
          "<strong>Bitta element:</strong> har doim tanlanadi — alohida tekshiring.",
          "<strong>Teng qiymatlar (ties):</strong> saralashda teng nisbat/vaqtli elementlar tartibi natijaga ta'sir qilishi mumkin — masala shartiga qarab hal qiling.",
          "<strong>Saralashni unutish:</strong> ko'p ochko'z algoritm avval saralashga tayanadi; saralamasangiz noto'g'ri javob olasiz."
        ] },
        { warn: "Eng keng tarqalgan xato — <strong>noto'g'ri mezon bo'yicha saralash</strong>. Masalan faoliyat rejalashtirishda boshlanish vaqti bo'yicha saralash noto'g'ri; <strong>tugash</strong> vaqti bo'yicha saralash kerak. Ryukzakda esa alohida vazn yoki alohida qiymat emas, aynan <code>qiymat/vazn</code> nisbati bo'yicha." },

        { h2: "Murakkablik" },
        { p: "Ochko'z algoritmlar ko'pincha juda tez, chunki ular ma'lumot ustidan bir marta o'tadi. Odatda asosiy narx <strong>saralash</strong>dan keladi: tadbirlarni tugash vaqti bo'yicha, tangalarni kattaligi bo'yicha saralash <code>O(n log n)</code> ni oladi, keyin bitta chiziqli o'tish <code>O(n)</code>." },
        { p: "Shuning uchun tipik ochko'z algoritm murakkabligi <strong>O(n log n)</strong>. Bu ko'p DP yechimlaridan (masalan <code>O(n * summa)</code>) tezroq — agar greedy to'g'ri ishlasa, bu katta yutuq." },

        { h2: "Qachon greedy haqida o'ylash kerak" },
        { p: "Intervyu yoki real masalada quyidagi belgilar ochko'z yondashuvga ishora qilishi mumkin:" },
        { ul: [
          "Masalada \"<strong>maksimal</strong>\" yoki \"<strong>minimal</strong>\" nimadir so'ralsa va har qadamda mustaqil tanlov qilish mumkin bo'lsa.",
          "\"Eng erta tugaydigan\", \"eng katta\", \"eng arzon\" kabi <strong>tabiiy tartiblash</strong> mezoni ko'rinib tursa (ko'pincha avval saralash kerak).",
          "Qismini olish mumkin bo'lgan (fraksion) resurs taqsimoti.",
          "Bir o'tishda hal bo'ladigan, orqaga qaytish shart bo'lmagan masala."
        ] },
        { note: "Agar ochko'z tanlovni isbotlay olmasangiz yoki kichik misolda u aldasa — bu DP masalasi bo'lishi ehtimoli katta. Ikkalasi ham optimallashtirish uchun, lekin greedy tezroq va faqat ba'zi masalalarda to'g'ri." },
        { tip: "Ochko'z algoritm tez va chiroyli, lekin har doim to'g'ri emas. Kod yozishdan oldin uning to'g'riligini isbotlang, yoki kichik misollarda DP javobi bilan solishtirib tekshiring. \"Ishlaydiganga o'xshaydi\" — bu hali isbot emas." }
      ]
    },

    {
      slug: "intervyu-strategiya",
      title: "Intervyu masalalarini yechish strategiyasi",
      blurb: "Algoritm intervyusiga tayyorlanish: masalani tahlil qilish qadamlari, texnika tanlash, murakkablikni baholash va amaliyot yo'l xaritasi.",
      body: [
        { lead: "Mana biz bu bo'lim yakuniga keldik. Endi o'rgangan hamma narsani — qidiruv, saralash, ma'lumotlar tuzilmalari, backtracking, DP, greedy — bitta amaliy mahoratga birlashtiramiz: algoritm intervyusini ishonch bilan yechish. Bu dars sizga tizimli fikrlash xaritasini beradi." },

        { h2: "Nega strategiya kerak" },
        { p: "Intervyuda eng katta xato — masalani o'qib, darrov kod yozishga tashlanish. Bu ko'pincha chalkash, xatoli va noto'g'ri yo'nalishga olib boradi. Yaxshi nomzod esa <strong>tizimli qadamlar</strong> bilan ishlaydi va har bir qadamda ovoz chiqarib fikrlaydi." },
        { p: "Intervyuchi sizning <strong>fikrlash jarayoningizni</strong> ko'rmoqchi, faqat tayyor javobni emas. Shuning uchun strategiya — bu nafaqat to'g'ri yechim topish, balki uni chiroyli, tushunarli yo'l bilan topib ko'rsatish san'ati." },

        { h2: "Masalani yechishning 6 qadami" },
        { p: "Har qanday algoritm masalasini quyidagi tartibda yeching. Bu ritm sizni chalkashlikdan asraydi:" },
        { ol: [
          "<strong>Savolni tushuning</strong> — masalani qayta o'z so'zingiz bilan ayting va aniqlashtiruvchi savollar bering: kirish qanday? sonlar musbatmi? bo'sh bo'lishi mumkinmi? natija qanday shaklda?",
          "<strong>Misollar va chegaraviy holatlar</strong> — bir-ikki oddiy misol yozing, keyin chegaraviy holatlarni o'ylang: bo'sh kirish, bitta element, juda katta n, takroriy qiymatlar, manfiy sonlar.",
          "<strong>Sodda (brute force) yechimni ayting</strong> — avval eng sodda ishlaydigan yechimni tasvirlang va uning Big O murakkabligini baholang. Bu sizga tayanch nuqta beradi.",
          "<strong>Optimallashtiring</strong> — qaysi texnika bu yerda yordam beradi? (pastdagi jadvalga qarang.) Takror hisob bormi? Saralash yordam beradimi? Qo'shimcha xotira ishlatib tezlashtira olamizmi?",
          "<strong>Kod yozing</strong> — endi, faqat endi, toza va o'qiladigan kod yozing. O'zgaruvchilarga mazmunli nom bering.",
          "<strong>Test qiling</strong> — kodni misollaringiz va chegaraviy holatlar bilan qo'lda \"yuguriting\". Xato topsangiz, tinch tuzating."
        ] },
        { tip: "To'g'ri (optimal) yechimni topishdan oldin ISHLAYDIGAN sodda yechimni ayting. Ishlaydigan brute force + \"buni shunday optimallashtirsam bo'ladi\" degan reja — bu hech qanday kod yozmasdan qotib qolishdan ancha yaxshi." },

        { h2: "Kalit so'zlardan texnikani tanish" },
        { p: "Intervyu masalalari ko'pincha yashirin ishoralarga ega. Masala matnidagi ba'zi so'zlar deyarli har doim ma'lum bir texnikaga ishora qiladi. Bu \"kalit -> texnika\" xaritasini yodda tuting:" },
        { ul: [
          "<strong>\"Saralangan massivda qidirish\"</strong> -> Binary search (O(log n))",
          "<strong>\"Juftlik topish, saralangan massiv\"</strong> -> Two pointers (ikki ko'rsatkich)",
          "<strong>\"Ketma-ket qism massiv/satr\"</strong> -> Sliding window (siljuvchi oyna)",
          "<strong>\"Tez qidirish, chastota sanash, takror aniqlash\"</strong> -> HashMap / HashSet (O(1) qidiruv)",
          "<strong>\"Barcha variant / kombinatsiya / o'rin almashtirish\"</strong> -> Backtracking",
          "<strong>\"Takror hisob, optimal son, minimal/maksimal yo'l\"</strong> -> Dinamik dasturlash (DP)",
          "<strong>\"Grafda eng qisqa yo'l (vaznsiz)\"</strong> -> BFS (kenglikka qarab qidirish)",
          "<strong>\"Iyerarxiya, ota-bola, daraxt bo'ylab yurish\"</strong> -> Tree traversal (DFS/BFS)",
          "<strong>\"Har qadamda eng yaxshi mahalliy tanlov\"</strong> -> Greedy (ehtiyot bo'lib)"
        ] },
        { p: "Bu jadval sehr emas — u shunchaki tajriba to'plami. Qancha ko'p masala yechsangiz, bu ishoralarni shuncha tez ilg'aysiz." },

        { h2: "Big O ni intervyuda qanday aytish" },
        { p: "Har bir yechimingiz uchun <strong>vaqt</strong> va <strong>xotira</strong> murakkabligini aytishga tayyor bo'ling. Intervyuchi buni deyarli har doim so'raydi, ba'zan siz aytmasangiz ham." },
        { p: "Kichik namunaviy hisoblash bilan Big O tushunchasini eslaylik:" },
        { pg: [
          "// n ga bog'liq operatsiyalar sonini taqqoslaymiz",
          "function taqqosla(n) {",
          "  let chiziqli = 0;",
          "  for (let i = 0; i < n; i++) chiziqli++;           // O(n)",
          "",
          "  let kvadratik = 0;",
          "  for (let i = 0; i < n; i++)",
          "    for (let j = 0; j < n; j++) kvadratik++;        // O(n^2)",
          "",
          "  let logarifmik = 0;",
          "  for (let i = 1; i < n; i *= 2) logarifmik++;       // O(log n)",
          "",
          "  console.log('n =', n);",
          "  console.log('  O(log n) ~', logarifmik, 'qadam');",
          "  console.log('  O(n)     ~', chiziqli, 'qadam');",
          "  console.log('  O(n^2)   ~', kvadratik, 'qadam');",
          "}",
          "",
          "taqqosla(8);",
          "taqqosla(64);"
        ].join("\n"), file: "bigo-taqqos.js" },
        { p: "<code>n</code> ni 8 dan 64 ga (8 barobar) oshirsangiz: <code>O(log n)</code> deyarli o'zgarmaydi, <code>O(n)</code> 8 barobar, <code>O(n^2)</code> esa 64 barobar o'sadi. Aynan shu farq nega optimallashtirish muhimligini ko'rsatadi. Big O ni aytganda eng katta hadga e'tibor bering va konstantalarni tashlab yuboring." },

        { h2: "Keng tarqalgan xatolar" },
        { p: "Intervyuda (va umuman kodlashda) quyidagi xatolar eng ko'p uchraydi. Ularni oldindan bilsangiz, oldini olasiz:" },
        { ul: [
          "<strong>Off-by-one xatolar</strong> — sikl chegarasida <code>&lt;</code> va <code>&lt;=</code> ni chalkashtirish, oxirgi yoki birinchi elementni o'tkazib yuborish.",
          "<strong>Bo'sh kirishni tekshirmaslik</strong> — bo'sh massiv yoki bo'sh satr kelganda kod qulaydi. Har doim shu holatni oldindan o'ylang.",
          "<strong>Chegaralarni tekshirmaslik</strong> — massiv indeksidan tashqariga chiqish, bir element yoki juda katta kirish holatlari.",
          "<strong>Integer to'lib ketishi</strong> — juda katta sonlar bilan ishlaganda (garchi JS da bu kamroq muammo, lekin mantiqan yodda tuting).",
          "<strong>Havolani nusxa deb o'ylash</strong> — massiv yoki obyektni saqlaganda uning nusxasi emas, havolasini saqlab qo'yish (backtracking darsidagi ogohlantirishni eslang)."
        ] },

        { h2: "Amaliyot yo'l xaritasi" },
        { p: "Intervyuga tayyorlanish — bu marafon, sprint emas. Quyidagi tamoyillar sizga barqaror o'sish beradi:" },
        { ul: [
          "<strong>Osondan boshlab, o'rtaga o'ting</strong> — LeetCode yoki shunga o'xshash platformada avval oson masalalar bilan ishonch hosil qiling, keyin o'rta darajaga o'ting. Qiyin masalalarga birdan sakramang.",
          "<strong>Kuniga oz-ozdan, muntazam</strong> — bir kunda 20 ta masala yechib, keyin bir oy dam olishdan ko'ra, har kuni 1-2 masala yechish ancha samarali.",
          "<strong>Patternlarni tushunish, yodlash emas</strong> — javobni yodlab olish foydasiz. Har masaladan keyin \"bu qaysi patternga tegishli, nega bu texnika ishladi?\" deb so'rang.",
          "<strong>Yechganingizni qayta ko'ring</strong> — masalani yechgandan keyin boshqalarning yechimini ko'rib, o'zingiznikini yaxshilang. Xatolaringizdan o'rganish eng tez o'sish yo'li.",
          "<strong>Vaqt bilan mashq qiling</strong> — haqiqiy intervyu vaqt bosimi ostida bo'ladi, shuning uchun ba'zan taymer bilan yeching."
        ] },

        { h2: "Ruhiy tayyorgarlik va ovoz chiqarib fikrlash" },
        { p: "Texnik mahorat muhim, lekin intervyuda <strong>qanday</strong> fikrlashingiz ham xuddi shunday muhim. Ovoz chiqarib fikrlash (think aloud) — bu intervyuchiga o'z fikr jarayoningizni ko'rsatish san'ati." },
        { p: "Jimgina o'tirib, bir zumda mukammal yechim yozishga urinmang. Buning o'rniga: \"Men avval brute force haqida o'ylayapman... bu O(n^2) bo'ladi... uni hash map bilan O(n) ga tushirsam bo'lar ekan...\" deb ovoz chiqarib gapiring. Bu intervyuchiga sizga yordam berish va yo'naltirish imkonini beradi." },
        { p: "Agar qotib qolsangiz, bu dahshatli emas — bu tabiiy. Sokin qoling, misolga qayting, sodda holatdan boshlang. \"Bir daqiqa o'ylab olay\" deyish mutlaqo normal. Vahima qilmaslik — bu ham mahorat." },

        { note: "Bu bo'limda o'rgangan barcha texnikalar — binary search, two pointers, sliding window, hash map, backtracking, DP, greedy, BFS/DFS va daraxtlar — birgalikda tipik algoritm intervyularining taxminan 80% ini qoplaydi. Ularni chuqur tushunsangiz, ko'p masalalar tanish patternga aylanadi. Sizga omad tilaymiz — endi mashq navbati!" }
      ]
    }
  ]
};
