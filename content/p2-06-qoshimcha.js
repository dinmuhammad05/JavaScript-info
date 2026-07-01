"use strict";

module.exports = {
  part: "2-qism: Brauzer — hujjat, hodisalar, interfeyslar",
  chapter: "Qo'shimcha brauzer mavzulari",
  lessons: [
    {
      slug: "mutation-observer",
      title: "Mutation observer",
      blurb: "MutationObserver bilan DOM daraxtidagi o'zgarishlarni — element qo'shilishi, o'chirilishi, atribut va matn o'zgarishlarini — kuzatish.",
      body: [
        { lead: "<code>MutationObserver</code> — bu DOM daraxtini kuzatib turuvchi va unda <strong>o'zgarish</strong> ro'y berganda (element qo'shilganda yoki o'chirilganda, atribut o'zgarganda, matn tahrirlanganda) sizga xabar beruvchi maxsus obyekt. U ayniqsa sahifaga tashqaridan kelgan kodni (masalan, uchinchi tomon skriptlari yoki reklama bloklari) nazorat qilishda, redaktorlarni yozishda va kutubxonalarni integratsiya qilishda juda qadrli." },

        { h2: "Nima uchun kerak" },
        { p: "Tasavvur qiling, siz sahifaga uchinchi tomon skriptini qo'shdingiz — u foydali kontent bilan birga o'zining reklamasini yoki keraksiz <code>&lt;div&gt;</code>larini ham qo'shadi. Bu skriptning ichiga kira olmaysiz. Lekin uning DOMga qanday o'zgarish kiritishini kuzatib, keraksiz elementni darhol o'chirib tashlashingiz mumkin. Aynan shu vazifani <code>MutationObserver</code> bajaradi." },
        { p: "Yana bir keng tarqalgan holat — sintaksisni ranglaydigan kutubxonalar (<code>Prism.js</code>, <code>highlight.js</code> kabi). Yangi kod bloki sahifaga qo'shilganda uni avtomatik ravishda bo'yash kerak bo'ladi. Buni <code>MutationObserver</code> orqali eshitib turish mumkin." },

        { h2: "Sintaksis" },
        { p: "Avval kuzatuvchi yaratamiz, so'ng uni biror tugunga (node) bog'laymiz:" },
        { code: "let observer = new MutationObserver(callback);\n\nobserver.observe(node, config);" },
        { p: "<code>callback</code> — o'zgarish ro'y berganda chaqiriladigan funksiya. U ikkita argument oladi: o'zgarishlar ro'yxati (<code>mutationRecords</code>) va kuzatuvchining o'zi." },
        { p: "<code>observe(node, config)</code> — qaysi tugunni va aynan qanday o'zgarishlarni kuzatishni belgilaydi. <code>config</code> — bu mantiqiy (boolean) bayroqlar to'plami:" },
        { ul: [
          "<code>childList</code> — <code>node</code>ning bevosita bolalari (child) qo'shilishi/o'chirilishi;",
          "<code>subtree</code> — <code>node</code>ning nafaqat bolalari, balki barcha avlodlari (nabiralari va h.k.);",
          "<code>attributes</code> — <code>node</code> atributlaridagi o'zgarishlar;",
          "<code>attributeFilter</code> — faqat sanab o'tilgan atributlar massivini kuzatish;",
          "<code>characterData</code> — <code>node.data</code> (matn tugunidagi matn) o'zgarishi;",
          "<code>attributeOldValue</code> — atributning eski qiymatini ham yozib berish;",
          "<code>characterDataOldValue</code> — matnning eski qiymatini ham yozib berish."
        ] },
        { warn: "<code>config</code>da kamida <code>childList</code>, <code>attributes</code> yoki <code>characterData</code>dan bittasi <code>true</code> bo'lishi shart. Aks holda <code>observe</code> xatolik beradi — chunki nima kuzatilishi noaniq bo'lib qoladi." },

        { h2: "Oddiy misol" },
        { p: "Quyida biror <code>&lt;div&gt;</code>ning ichidagi barcha o'zgarishlarni (butun poddaraxtni) kuzatamiz. E'tibor bering, bu kod brauzerda ishlaydi — bu yerda u statik namuna sifatida keltirilgan:" },
        { code: "let elem = document.getElementById('kuzatiladigan');\n\nlet observer = new MutationObserver(mutationRecords => {\n  console.log(mutationRecords); // o'zgarishlar ro'yxati\n});\n\n// har qanday o'zgarishni kuzatishni boshlaymiz\nobserver.observe(elem, {\n  childList: true,        // to'g'ridan-to'g'ri bolalar\n  subtree: true,          // barcha avlodlar ham\n  characterData: true,    // matn o'zgarishlari\n  attributes: true        // atributlar\n});\n\n// endi elem ichini o'zgartiramiz\nelem.innerHTML = '<b>Salom</b> dunyo';" },
        { p: "Kod ishlaganda konsolga <code>MutationRecord</code> obyektlaridan iborat massiv chiqadi." },

        { h2: "MutationRecord obyekti" },
        { p: "<code>callback</code>ga tushadigan har bir o'zgarish yozuvi (record) quyidagi asosiy xususiyatlarga ega:" },
        { ul: [
          "<code>type</code> — o'zgarish turi: <code>'attributes'</code>, <code>'characterData'</code> yoki <code>'childList'</code>;",
          "<code>target</code> — o'zgarish qaysi tugunda ro'y berdi (atribut uchun element, matn uchun matn tuguni);",
          "<code>addedNodes</code> / <code>removedNodes</code> — qo'shilgan va olib tashlangan tugunlar ro'yxati;",
          "<code>previousSibling</code> / <code>nextSibling</code> — qo'shilgan tugunlarning yonidagi tugunlar;",
          "<code>attributeName</code> — o'zgargan atribut nomi;",
          "<code>oldValue</code> — eski qiymat (faqat <code>attributeOldValue</code> yoki <code>characterDataOldValue</code> yoqilgan bo'lsa)."
        ] },
        { p: "Masalan, atribut o'zgarishini eski qiymati bilan qo'lga olamiz:" },
        { code: "let observer = new MutationObserver(records => {\n  for (let record of records) {\n    if (record.type === 'attributes') {\n      console.log(\n        record.attributeName + ' atributi o'zgardi. ' +\n        'Eski qiymat: ' + record.oldValue\n      );\n    }\n  }\n});\n\nobserver.observe(elem, {\n  attributes: true,\n  attributeOldValue: true\n});" },
        { note: "Bir <code>callback</code> chaqiruvida bir nechta o'zgarish yig'ilib kelishi mumkin. Shuning uchun <code>records</code> — bu massiv. Brauzer o'zgarishlarni to'plab, keyin bir yo'la yetkazadi (mikrovazifa sifatida — bu haqda uchinchi darsda gaplashamiz)." },

        { h2: "Qo'llanish: keraksiz elementni o'chirish" },
        { p: "Sahifaga qo'shilayotgan reklama <code>&lt;div&gt;</code>larini avtomatik o'chiruvchi kuzatuvchi. <code>childList</code> va <code>subtree</code> yordamida yangi qo'shilgan tugunlarni ko'ramiz:" },
        { code: "let observer = new MutationObserver(records => {\n  for (let record of records) {\n    for (let node of record.addedNodes) {\n      // faqat elementlar bilan ishlaymiz (matn tugunlarini o'tkazamiz)\n      if (!(node instanceof HTMLElement)) continue;\n\n      if (node.classList.contains('reklama')) {\n        node.remove();\n        console.log('Reklama olib tashlandi');\n      }\n    }\n  }\n});\n\nobserver.observe(document.body, {\n  childList: true,\n  subtree: true\n});" },

        { h2: "Qo'llanish: kutubxona integratsiyasi" },
        { p: "Faraz qilaylik, bizda <code>highlight()</code> funksiyasi bor — u <code>&lt;pre&gt;</code> ichidagi kodni bo'yaydi. Yangi kod bloki sahifaga qanday yo'l bilan qo'shilishidan qat'i nazar (<code>innerHTML</code>, <code>append</code> yoki boshqa skript orqali), biz uni avtomatik bo'yashni istaymiz:" },
        { code: "function highlight(block) {\n  // ... kodni bo'yash mantig'i ...\n  console.log('Bloklandi va bo'yaldi');\n}\n\nlet observer = new MutationObserver(records => {\n  for (let record of records) {\n    for (let node of record.addedNodes) {\n      if (!(node instanceof HTMLElement)) continue;\n\n      // qo'shilgan tugunning o'zi <pre> bo'lsa\n      if (node.matches('pre[class*=\"language-\"]')) {\n        highlight(node);\n      }\n\n      // yoki uning ichida <pre>lar bo'lsa\n      for (let pre of node.querySelectorAll('pre[class*=\"language-\"]')) {\n        highlight(pre);\n      }\n    }\n  }\n});\n\nobserver.observe(document.body, { childList: true, subtree: true });" },
        { tip: "Bu usul juda kuchli: sahifaga kim va qanday kod qo'shishidan qat'i nazar, siz uni bir joyda \"ushlab\" qayta ishlaysiz. Redaktor, chat, dinamik ro'yxatlar — hammasi bilan ishlaydi." },

        { h2: "observe konfiguratsiya kombinatsiyalari" },
        { p: "Ba'zi keng tarqalgan sozlamalar:" },
        { ul: [
          "Faqat bolalarning kelib-ketishi: <code>{ childList: true }</code>;",
          "Butun ichki daraxt (istalgan chuqurlikda): <code>{ childList: true, subtree: true }</code>;",
          "Faqat <code>class</code> va <code>style</code> atributlari: <code>{ attributes: true, attributeFilter: ['class', 'style'] }</code>;",
          "Matn tahrirlarini eski qiymati bilan: <code>{ characterData: true, characterDataOldValue: true }</code>."
        ] },

        { h2: "disconnect va takeRecords" },
        { p: "Kuzatishni to'xtatish uchun <code>disconnect()</code> chaqiriladi:" },
        { code: "observer.disconnect();" },
        { p: "<code>takeRecords()</code> — hali <code>callback</code>ga yetkazilmagan, ammo qayd etilgan o'zgarishlar ro'yxatini oladi va navbatni bo'shatadi. Bu odatda <code>disconnect()</code>dan oldin, \"oxirgi paytida\" yig'ilib qolgan o'zgarishlarni ham qo'lda qayta ishlash uchun ishlatiladi:" },
        { code: "// hali qayta ishlanmagan o'zgarishlarni olamiz\nlet pending = observer.takeRecords();\nprocess(pending);\n\n// keyin kuzatishni to'xtatamiz\nobserver.disconnect();" },
        { warn: "<code>disconnect()</code> chaqirilgach, <code>takeRecords()</code> endi bo'sh massiv qaytaradi — chunki navbat allaqachon bo'shatilgan bo'ladi. Shu bois <code>takeRecords()</code>ni <code>disconnect()</code>dan <strong>oldin</strong> chaqiring." },
        { note: "<code>MutationObserver</code> kuzatuvchi obyekti kuzatilayotgan tugunlarga <em>kuchsiz</em> (weak) bog'lanmaydi — u tugunga qattiq ishora saqlaydi. Kuzatuvchini <code>disconnect()</code> qilmasangiz, u va u ushlab turgan tugunlar xotirada qolib ketishi mumkin (xotira sizib chiqishi). Kerak bo'lmaganda albatta uzib qo'ying." },

        { h2: "Xotira boshqaruvi" },
        { p: "Muhim jihat: kuzatuvchi kuzatayotgan tugunlar DOMdan olib tashlansa ham, ular xotirada saqlanib qolishi mumkin — chunki kuzatuvchi ularga ishora saqlaydi. Element endi kerak bo'lmasa, uni kuzatishdan to'xtatish yaxshi amaliyot. Odatda komponent \"o'chirilganda\" (unmount) <code>disconnect()</code> chaqiriladi." },

        { h2: "Xulosa" },
        { ul: [
          "<code>MutationObserver</code> — DOM daraxtidagi o'zgarishlarni kuzatuvchi obyekt;",
          "<code>observer.observe(node, config)</code> bilan kuzatish boshlanadi; <code>config</code> nimani kuzatishni belgilaydi (<code>childList</code>, <code>subtree</code>, <code>attributes</code>, <code>characterData</code> va h.k.);",
          "<code>callback</code>ga <code>MutationRecord</code> obyektlari massivi keladi: <code>type</code>, <code>target</code>, <code>addedNodes</code>, <code>removedNodes</code>, <code>oldValue</code> va boshqalar;",
          "Asosiy qo'llanishlar: keraksiz elementlarni tozalash, kutubxonalarni integratsiya qilish, DOM o'zgarishlarini kuzatib turish;",
          "<code>disconnect()</code> kuzatishni to'xtatadi; <code>takeRecords()</code> qayta ishlanmagan o'zgarishlarni oladi;",
          "Xotira sizishining oldini olish uchun kerak bo'lmaganda kuzatuvchini uzing."
        ] }
      ]
    },

    {
      slug: "selection-range",
      title: "Tanlash va Range",
      blurb: "Range obyekti bilan hujjatning bir qismini belgilash, Selection obyekti orqali foydalanuvchi tanlagan matnni o'qish va dastur orqali tanlash o'rnatish.",
      body: [
        { lead: "Hujjatdagi matn yoki elementlarni tanlash brauzerda ikki bosqichli tushuncha bilan ifodalanadi: <code>Range</code> — hujjatning ma'lum bir <strong>qismi</strong> (boshlanish va tugash nuqtalari bilan), <code>Selection</code> esa — foydalanuvchi yoki dastur belgilagan <strong>joriy tanlov</strong>. Ushbu darsda ular qanday ishlashini va dastur orqali qanday boshqarilishini ko'ramiz." },

        { h2: "Range obyekti" },
        { p: "<code>Range</code> — hujjatdagi ikki nuqta orasidagi qismni ifodalaydi. Har bir nuqta ikkita qiymat bilan beriladi: <em>tugun</em> (node) va uning ichidagi <em>siljish</em> (offset)." },
        { code: "let range = new Range();" },
        { p: "Boshlanish va tugash nuqtalari <code>setStart</code> va <code>setEnd</code> bilan o'rnatiladi:" },
        { ul: [
          "<code>range.setStart(node, offset)</code> — boshlanish nuqtasini o'rnatadi;",
          "<code>range.setEnd(node, offset)</code> — tugash nuqtasini o'rnatadi."
        ] },
        { p: "Bu yerda <code>offset</code> ikki xil ma'noga ega:" },
        { ul: [
          "Agar <code>node</code> — matn tuguni bo'lsa, <code>offset</code> matn ichidagi <strong>belgi (harf) pozitsiyasi</strong>;",
          "Agar <code>node</code> — element bo'lsa, <code>offset</code> uning <strong>bola tugunlari</strong> orasidagi pozitsiya."
        ] },

        { h2: "setStart va setEnd" },
        { p: "Aytaylik, sahifada <code>&lt;p id=\"matn\"&gt;Salom, dunyo!&lt;/p&gt;</code> bor. Matndagi <code>'Salom'</code> so'zini tanlaymiz — bu <code>&lt;p&gt;</code>ning birinchi matn tuguni ichidagi 0-belgidan 5-belgigacha:" },
        { code: "let p = document.getElementById('matn');\nlet textNode = p.firstChild; // matn tuguni: 'Salom, dunyo!'\n\nlet range = new Range();\nrange.setStart(textNode, 0);  // 0-belgidan\nrange.setEnd(textNode, 5);    // 5-belgigacha (S-a-l-o-m)\n\nconsole.log(range.toString()); // 'Salom'" },
        { p: "<code>range.toString()</code> tanlangan qismning matnli ko'rinishini qaytaradi." },
        { note: "<code>setEnd(textNode, 5)</code> — bu \"5-belgidan keyin\" degani. Ya'ni <code>'Salom'</code> so'zining beshta harfi (indekslari 0..4) tanlanadi, tugash nuqtasi esa 5-pozitsiyada turadi. Nuqtalar belgilar <em>orasida</em> joylashadi." },

        { h2: "Elementlarni qamrab olish" },
        { p: "Nuqta faqat matn ichida emas, elementlar orasida ham bo'lishi mumkin. Masalan, <code>&lt;p&gt;</code> ichida <code>&lt;i&gt;</code> va <code>&lt;b&gt;</code> teglari bor deylik. Ularning bir qismini tanlash uchun <code>offset</code> bola tugun indeksini bildiradi:" },
        { code: "// <p>Bu <i>muhim</i> va <b>qalin</b> matn</p>\nlet p = document.getElementById('matn');\n\nlet range = new Range();\nrange.setStart(p, 0);  // birinchi bola tugundan oldin\nrange.setEnd(p, 2);    // ikkinchi bola tugungacha\n\n// natijada 'Bu <i>muhim</i>' qismi tanlanadi\nconsole.log(range.toString());" },
        { p: "Yana qulay usullar mavjud:" },
        { ul: [
          "<code>range.selectNode(node)</code> — tugunni butunlay (o'zi bilan birga) tanlaydi;",
          "<code>range.selectNodeContents(node)</code> — tugunning faqat ichini tanlaydi;",
          "<code>range.setStartBefore(node)</code> / <code>setStartAfter(node)</code> — tugundan oldin/keyin boshlaydi;",
          "<code>range.setEndBefore(node)</code> / <code>setEndAfter(node)</code> — tugundan oldin/keyin tugatadi;",
          "<code>range.collapse(toStart)</code> — Range'ni bir nuqtaga siqadi (bo'sh qiladi)."
        ] },

        { h2: "Range xususiyatlari" },
        { p: "<code>Range</code> obyekti quyidagi asosiy xususiyatlarga ega:" },
        { ul: [
          "<code>startContainer</code>, <code>startOffset</code> — boshlanish tuguni va siljishi;",
          "<code>endContainer</code>, <code>endOffset</code> — tugash tuguni va siljishi;",
          "<code>collapsed</code> — agar boshlanish va tugash bir xil bo'lsa (bo'sh Range) <code>true</code>;",
          "<code>commonAncestorContainer</code> — barcha tanlangan tugunlarning eng yaqin umumiy ajdodi."
        ] },

        { h2: "Range bilan amallar" },
        { p: "<code>Range</code> orqali tanlangan qismni nusxalash, o'chirish yoki chiqarib olish mumkin:" },
        { ul: [
          "<code>range.deleteContents()</code> — tanlangan qismni hujjatdan o'chiradi;",
          "<code>range.extractContents()</code> — o'chiradi va <code>DocumentFragment</code> sifatida qaytaradi;",
          "<code>range.cloneContents()</code> — hujjatga tegmasdan nusxasini <code>DocumentFragment</code> qilib qaytaradi;",
          "<code>range.insertNode(node)</code> — Range boshiga yangi tugun kiritadi;",
          "<code>range.surroundContents(node)</code> — tanlangan qismni berilgan tugun ichiga o'raydi."
        ] },
        { code: "let range = new Range();\nrange.setStart(textNode, 0);\nrange.setEnd(textNode, 5);\n\n// tanlangan 'Salom' qismini <mark> ichiga o'raymiz\nlet mark = document.createElement('mark');\nrange.surroundContents(mark);" },
        { warn: "<code>surroundContents</code> talabchan: agar Range tugunlarni \"yarim\" kessa (masalan, bir elementning boshi tanlansa-yu, oxiri boshqa elementda qolsa), u xatolik beradi. Bunday holatda <code>extractContents</code> + <code>insertNode</code> kombinatsiyasini qo'llash kerak." },

        { h2: "Selection obyekti" },
        { p: "<code>Range</code> — bu shunchaki hujjatning bir qismi; u hali ekranda ko'rinmaydi. Foydalanuvchi ko'rgan haqiqiy tanlovni <code>Selection</code> obyekti ifodalaydi. Uni <code>window.getSelection()</code> yoki <code>document.getSelection()</code> orqali olamiz:" },
        { code: "let selection = window.getSelection();" },
        { p: "Nazariy jihatdan bir tanlov bir nechta Range'dan iborat bo'lishi mumkin (masalan, Firefox'da <code>Ctrl</code> bilan bir nechta qismni tanlash mumkin), ammo amalda ko'pchilik brauzerlarda bitta Range bo'ladi." },
        { p: "<code>Selection</code>ning asosiy xususiyatlari:" },
        { ul: [
          "<code>anchorNode</code>, <code>anchorOffset</code> — tanlov <strong>boshlangan</strong> nuqta (foydalanuvchi bosgan joy);",
          "<code>focusNode</code>, <code>focusOffset</code> — tanlov <strong>tugagan</strong> nuqta (kursor hozir turgan joy);",
          "<code>isCollapsed</code> — tanlov bo'shmi (faqat kursor turibdimi);",
          "<code>rangeCount</code> — tanlovdagi Range'lar soni."
        ] },
        { note: "<code>anchor</code> (langar) va <code>focus</code> — tanlovning boshi va oxiri, lekin ular hujjat tartibida oldinma-keyin bo'lishi <em>shart emas</em>. Agar foydalanuvchi o'ngdan chapga tanlasa, <code>focus</code> <code>anchor</code>dan oldinda turadi. <code>Range</code>da esa doim <code>start</code> hujjat bo'yicha <code>end</code>dan oldin keladi." },

        { h2: "getSelection va matnni o'qish" },
        { p: "Foydalanuvchi tanlagan matnni olishning eng oson yo'li — <code>Selection</code>ni matnga aylantirish:" },
        { code: "document.onselectionchange = function() {\n  let selection = document.getSelection();\n  console.log('Tanlangan matn: ' + selection.toString());\n};" },
        { p: "<code>selectionchange</code> hodisasi tanlov har o'zgarganda ishga tushadi. Bu tanlangan matnni real vaqtda kuzatish uchun qulay." },
        { p: "Agar Range darajasida ishlash kerak bo'lsa:" },
        { code: "let selection = document.getSelection();\n\nif (selection.rangeCount > 0) {\n  let range = selection.getRangeAt(0);\n  console.log(range.startContainer, range.startOffset);\n  console.log(range.endContainer, range.endOffset);\n}" },

        { h2: "Dastur orqali tanlash" },
        { p: "Tanlovni faqat o'qibgina qolmay, dastur orqali o'rnatish ham mumkin. Buning uchun avval Range tuzamiz, keyin uni tanlovga qo'shamiz:" },
        { code: "let p = document.getElementById('matn');\nlet textNode = p.firstChild;\n\n// 'Salom' so'zini qamrab oluvchi Range\nlet range = new Range();\nrange.setStart(textNode, 0);\nrange.setEnd(textNode, 5);\n\nlet selection = window.getSelection();\nselection.removeAllRanges();  // avvalgi tanlovni tozalaymiz\nselection.addRange(range);    // yangi tanlovni o'rnatamiz" },
        { p: "<code>Selection</code>da bir necha qulay metodlar bor:" },
        { ul: [
          "<code>selection.addRange(range)</code> — tanlovga Range qo'shadi;",
          "<code>selection.removeAllRanges()</code> — barcha tanlovni olib tashlaydi;",
          "<code>selection.collapse(node, offset)</code> — tanlovni bir nuqtaga siqadi;",
          "<code>selection.selectAllChildren(node)</code> — tugunning barcha bolalarini tanlaydi;",
          "<code>selection.setBaseAndExtent(anchorNode, anchorOffset, focusNode, focusOffset)</code> — anchor va focusni bir yo'la o'rnatadi;",
          "<code>selection.deleteFromDocument()</code> — tanlangan matnni hujjatdan o'chiradi."
        ] },
        { tip: "Butun bir elementning matnini bir bosishda tanlash kerak bo'lsa, eng oson yo'l — <code>selection.selectAllChildren(elem)</code>. Bu, masalan, \"kod bo'lagini bosganda hammasini tanlansin\" xatti-harakati uchun juda qulay." },

        { h2: "Form maydonlaridagi tanlash" },
        { p: "Muhim istisno: <code>&lt;input&gt;</code> va <code>&lt;textarea&gt;</code> maydonlarida yuqoridagi <code>Range</code>/<code>Selection</code> ishlamaydi. Ular oddiy matndan iborat bo'lgani uchun o'zining alohida, soddaroq API'siga ega:" },
        { ul: [
          "<code>input.selectionStart</code>, <code>input.selectionEnd</code> — tanlovning boshi va oxiri (belgi indekslari);",
          "<code>input.selectionDirection</code> — tanlov yo'nalishi;",
          "<code>input.select()</code> — barcha matnni tanlaydi;",
          "<code>input.setSelectionRange(start, end)</code> — tanlovni o'rnatadi;",
          "<code>input.setRangeText(replacement, start, end)</code> — tanlangan qismni matn bilan almashtiradi."
        ] },
        { code: "let input = document.getElementById('maydon');\n\ninput.onclick = function() {\n  // birinchi 5 ta belgini tanlaymiz\n  input.setSelectionRange(0, 5);\n  input.focus();\n};" },

        { h2: "Xulosa" },
        { ul: [
          "<code>Range</code> — hujjatning bir qismi; <code>setStart(node, offset)</code> va <code>setEnd(node, offset)</code> bilan nuqtalari belgilanadi;",
          "<code>offset</code> matn tugunida — belgi indeksi, elementda — bola tugun indeksi;",
          "<code>Range</code> orqali qismni o'chirish, nusxalash, o'rash mumkin: <code>deleteContents</code>, <code>extractContents</code>, <code>surroundContents</code> va h.k.;",
          "<code>Selection</code> — foydalanuvchi ko'rgan joriy tanlov; <code>window.getSelection()</code> orqali olinadi;",
          "<code>selection.toString()</code> — tanlangan matn; <code>getRangeAt(0)</code> — Range darajasi;",
          "Dastur orqali tanlash: <code>removeAllRanges()</code> + <code>addRange(range)</code>, yoki <code>selectAllChildren(node)</code>;",
          "<code>&lt;input&gt;</code>/<code>&lt;textarea&gt;</code> uchun alohida API: <code>selectionStart</code>, <code>setSelectionRange</code> va boshqalar."
        ] }
      ]
    },

    {
      slug: "event-loop",
      title: "Hodisalar tsikli: mikro va makrovazifalar",
      blurb: "Event loop — brauzer va Node.js kodni qanday tartibda bajarishi; makrovazifa va mikrovazifa navbatlari, render, setTimeout(0) va og'ir hisob-kitobni bo'lish.",
      body: [
        { lead: "JavaScript'ning bajarilish tartibini tushunish uchun eng muhim tushuncha — <strong>hodisalar tsikli</strong> (event loop). U brauzer (yoki Node.js) kelib tushgan vazifalarni qanday navbatga qo'yishini, qaysi biri oldin bajarilishini va render qachon bo'lishini boshqaradi. Ushbu darsda makrovazifa va mikrovazifa navbatlarini, ularning tartibini va amaliy oqibatlarini chuqur ko'rib chiqamiz." },

        { h2: "Hodisalar tsikli tushunchasi" },
        { p: "JavaScript dvigateli (engine) juda oddiy tamoyil asosida ishlaydi: <em>bajariladigan vazifa bo'lsa — bajaradi, bo'lmasa — kutadi</em>. Bu cheksiz aylanuvchi algoritm quyidagicha ta'riflanadi:" },
        { ol: [
          "Navbatdagi eng eski vazifa bor bo'lsa — uni <strong>to'liq</strong> bajaradi;",
          "So'ng barcha to'plangan <strong>mikrovazifalarni</strong> bajaradi;",
          "Kerak bo'lsa <strong>render</strong> qiladi (ekranni yangilaydi);",
          "Vazifa yo'q bo'lsa — yangi vazifa kelguncha kutadi;",
          "Yangi vazifa kelsa — 1-qadamdan boshlab qaytaradi."
        ] },
        { p: "Bu yerda kalit tushuncha shuki, JavaScript <strong>bir oqimli</strong> (single-threaded): bir vaqtning o'zida faqat bitta vazifa bajariladi. Vazifa boshlanganda, u tugamaguncha boshqa hech narsa (hatto foydalanuvchi bosishlari ham) qayta ishlanmaydi." },
        { warn: "Agar biror vazifa juda uzoq davom etsa (masalan, og'ir tsikl), brauzer boshqa hech narsani bajara olmaydi: bosishlarga javob bermaydi, ekranni yangilamaydi. Foydalanuvchi \"sahifa qotib qoldi\" degan xabarni ko'radi. Shu bois og'ir hisob-kitobni bo'lish kerak (bu haqda quyida)." },

        { h2: "Makrovazifalar navbati" },
        { p: "<strong>Makrovazifa</strong> (macrotask) — event loop bajaradigan asosiy, yirik vazifa. Makrovazifalarga quyidagilar kiradi:" },
        { ul: [
          "Skriptning o'zi (dastlabki kodni ishga tushirish);",
          "<code>setTimeout</code> va <code>setInterval</code> chaqiruvlari;",
          "Foydalanuvchi hodisalarini qayta ishlash (<code>click</code>, <code>keydown</code> va h.k.);",
          "Tarmoq so'rovi tugaganda ishlaydigan kod (masalan, hodisa sifatida)."
        ] },
        { p: "Makrovazifalar navbatda (queue) turadi va event loop ularni <strong>birma-bir</strong>, kelgan tartibida bajaradi (FIFO — First In, First Out)." },

        { h2: "Mikrovazifalar navbati" },
        { p: "<strong>Mikrovazifa</strong> (microtask) — asosan <code>Promise</code>lardan kelib chiqadigan mayda vazifa. Mikrovazifalar quyidagilar orqali hosil bo'ladi:" },
        { ul: [
          "<code>.then</code>, <code>.catch</code>, <code>.finally</code> ishlovchilari;",
          "<code>async/await</code> ichida <code>await</code>dan keyingi kod;",
          "<code>queueMicrotask(fn)</code> — mikrovazifani qo'lda navbatga qo'yish."
        ] },
        { p: "Eng muhim qoida: <strong>har bir makrovazifa tugagach, event loop navbatdagi keyingi makrovazifaga o'tishdan oldin BARCHA to'plangan mikrovazifalarni bajaradi</strong>. Agar mikrovazifalar ichida yana yangi mikrovazifalar paydo bo'lsa, ular ham darhol, shu yerda bajariladi." },
        { note: "Ya'ni tartib shunday: <em>bitta makrovazifa → butun mikrovazifalar navbati (bo'shatilguncha) → (kerak bo'lsa render) → keyingi makrovazifa</em>. Mikrovazifalar makrovazifalardan <strong>oldin</strong> ustunlikka ega." },

        { h2: "Tartibga oid misol" },
        { p: "Quyidagi kod nima chiqaradi? Bu klassik savol. Kodni o'ylab ko'ring:" },
        { code: "console.log('1: skript boshi');\n\nsetTimeout(() => console.log('2: setTimeout'), 0);\n\nPromise.resolve().then(() => console.log('3: promise'));\n\nconsole.log('4: skript oxiri');" },
        { p: "Natija tartibi:" },
        { code: "1: skript boshi\n4: skript oxiri\n3: promise\n2: setTimeout" },
        { p: "Sababi:" },
        { ol: [
          "<code>'1'</code> va <code>'4'</code> — bular joriy makrovazifa (skript) ichida sinxron bajariladi;",
          "<code>'3'</code> (promise) — mikrovazifa. U skript tugagach, keyingi makrovazifadan <strong>oldin</strong> bajariladi;",
          "<code>'2'</code> (setTimeout) — yangi makrovazifa, u navbatning oxirida, mikrovazifalardan keyin bajariladi."
        ] },
        { tip: "<code>setTimeout(fn, 0)</code> \"darhol bajar\" degani emas — u \"joriy makrovazifa va barcha mikrovazifalar tugagach, keyingi makrovazifa sifatida bajar\" degani. Shuning uchun <code>Promise.then</code> undan doim oldin ishlaydi." },

        { h2: "Faqat sinxron tartibli playground misol" },
        { p: "Quyidagi misolda hech qanday kechikish yo'q — barchasi sinxron, shu bois tartib aniq va tekshirsa bo'ladi. Bu event loop emas, balki oddiy chaqiruvlar steki (call stack) tartibi:" },
        { pg: "function ichki() {\n  console.log('2: ichki funksiya');\n}\n\nfunction tashqi() {\n  console.log('1: tashqi boshi');\n  ichki();\n  console.log('3: tashqi oxiri');\n}\n\ntashqi();\nconsole.log('4: eng oxir');", file: "sinxron-tartib.js" },
        { p: "Chiqish: <code>1, 2, 3, 4</code> — chunki funksiya chaqiruvlari steki sinxron ishlaydi; hech narsa navbatga qo'yilmaydi." },

        { h2: "queueMicrotask bilan tartib" },
        { p: "Sof mikrovazifa tartibini <code>queueMicrotask</code> orqali ham ko'rsatish mumkin. Mikrovazifa hozirgi sinxron kod tugagach ishlaydi:" },
        { code: "console.log('A: boshi');\n\nqueueMicrotask(() => console.log('C: mikrovazifa'));\n\nconsole.log('B: oxiri');\n\n// Chiqish: A, B, C" },
        { p: "Ya'ni <code>queueMicrotask</code> kodni \"joriy sinxron blok tugagandan keyin, lekin har qanday <code>setTimeout</code>dan oldin\" bajarilishga qo'yadi." },

        { h2: "Render — ekran qachon yangilanadi" },
        { p: "Brauzer ekranni har bir makrovazifadan keyin (va barcha mikrovazifalar tugagach) yangilashi <strong>mumkin</strong>. Lekin muhimi shundaki, render <em>hech qachon vazifa o'rtasida bo'lmaydi</em>. Agar vazifa uzoq davom etsa, uning ichida DOMni necha marta o'zgartirsangiz ham, foydalanuvchi faqat vazifa tugagach oxirgi holatni ko'radi." },
        { code: "// bu kod ekranda faqat oxirgi rangni ko'rsatadi\nelem.style.color = 'red';\nelem.style.color = 'green';\nelem.style.color = 'blue';\n// render faqat kod tugagach bo'ladi -> ko'k rang ko'rinadi" },
        { note: "Animatsiyalarni brauzer render tsikliga moslash uchun <code>requestAnimationFrame(fn)</code> ishlatiladi — u <code>fn</code>ni keyingi render'dan oldin chaqiradi. Bu <code>setTimeout</code>dan aniqroq va silliqroq animatsiya beradi." },

        { h2: "Og'ir hisob-kitobni bo'lish: setTimeout usuli" },
        { p: "Faraz qilaylik, bizda juda katta hisob-kitob bor — u bir necha soniya davom etadi. Uni bitta makrovazifada bajarsak, brauzer shu vaqt davomida qotib qoladi. Yechim — ishni kichik bo'laklarga bo'lib, har bir bo'lakni <code>setTimeout</code> orqali alohida makrovazifada bajarish. Bu boshqa hodisalarga (bosishlar, render) \"nafas olish\" imkonini beradi:" },
        { code: "let i = 0;\nlet natija = 0;\n\nfunction hisobla() {\n  do {\n    i++;\n    natija += i;\n  } while (i % 1000000 !== 0); // har safar 1 mln qadam\n\n  if (i < 1000000000) {\n    setTimeout(hisobla, 0); // navbatning oxirida davom etamiz\n  } else {\n    console.log('Tayyor: ' + natija);\n  }\n}\n\nhisobla();" },
        { p: "Bu yerda har <code>setTimeout(hisobla, 0)</code> chaqiruvi orasida event loop boshqa makrovazifalarni (foydalanuvchi hodisalari, render) bajarishga ulguradi. Natijada brauzer \"tirik\" qoladi." },
        { warn: "Ammo <code>setTimeout(fn, 0)</code> tez-tez chaqirilsa ham, brauzer minimal kechikishni (odatda joylashish darajasi 5 dan oshsa ~4 ms) qo'shadi. Shuning uchun ko'p kichik bo'laklar sekinlashuvga olib kelishi mumkin. Shu bois har bo'lakni juda kichik qilmang — masalan, yuqoridagi kabi katta blok bilan ishlang." },

        { h2: "Og'ir hisob-kitob va mikrovazifa farqi" },
        { p: "Muhim: og'ir ishni <code>Promise.then</code> yoki <code>queueMicrotask</code> orqali bo'lish <strong>foyda bermaydi</strong>. Chunki mikrovazifalar joriy makrovazifadan keyin, lekin <em>render'dan oldin</em> bajariladi. Agar siz ishni mikrovazifalar orqali bo'lsangiz, brauzer ular hammasi tugamaguncha renderga o'ta olmaydi — sahifa baribir qotib qoladi." },
        { tip: "Qoida: <strong>foydalanuvchi interfeysini bloklamaslik kerak bo'lsa — ishni makrovazifalar (<code>setTimeout</code>) orqali bo'ling</strong>, mikrovazifalar orqali emas. Mikrovazifalar renderni orqaga surmaydi, ular renderdan oldin turadi." },
        { note: "Zamonaviy usul — haqiqatan og'ir hisob-kitobni <strong>Web Worker</strong>ga chiqarish. U alohida oqimda (thread) ishlaydi va asosiy oqimni umuman bloklamaydi. <code>setTimeout</code> bilan bo'lish esa sof JavaScript darajasidagi yechim."},

        { h2: "Amaliy foyda: progressni ko'rsatish" },
        { p: "Ishni <code>setTimeout</code> bilan bo'lishning yana bir foydasi — jarayon davomida <strong>progressni yangilash</strong>. Har bir bo'lakdan keyin render bo'lgani uchun, foydalanuvchi \"progress bar\"ning harakatini real vaqtda ko'radi. Agar hammasi bitta makrovazifada bo'lganida, faqat oxirida to'satdan 100% ko'rinardi." },

        { h2: "Xulosa" },
        { ul: [
          "Event loop — vazifalarni birma-bir bajaruvchi cheksiz tsikl; JavaScript bir oqimli;",
          "<strong>Makrovazifalar</strong>: skript, <code>setTimeout</code>/<code>setInterval</code>, hodisalar. Navbatda birma-bir bajariladi;",
          "<strong>Mikrovazifalar</strong>: <code>Promise.then/catch/finally</code>, <code>await</code>dan keyingi kod, <code>queueMicrotask</code>;",
          "Tartib: bitta makrovazifa → barcha mikrovazifalar → (render) → keyingi makrovazifa. Mikrovazifalar ustunlikka ega;",
          "<code>setTimeout(fn, 0)</code> — \"darhol\" emas, \"navbatning oxirida keyingi makrovazifa sifatida\" degani;",
          "Render vazifa o'rtasida bo'lmaydi — faqat vazifa tugagach ekran yangilanadi;",
          "Og'ir hisob-kitobni interfeysni bloklamasdan bajarish uchun uni <code>setTimeout</code> orqali makrovazifalarga bo'ling (mikrovazifalarga emas), yoki Web Worker'dan foydalaning."
        ] }
      ]
    }
  ]
};
