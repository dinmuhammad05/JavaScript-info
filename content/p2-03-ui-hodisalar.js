"use strict";

module.exports = {
  part: "2-qism: Brauzer — hujjat, hodisalar, interfeyslar",
  chapter: "UI hodisalari",
  lessons: [

    // ==================================================================
    // 1-DARS
    // ==================================================================
    {
      slug: "sichqoncha-hodisalari",
      title: "Sichqoncha hodisalari",
      blurb: "mousedown/up, click, dblclick, contextmenu tartibi; qaysi tugma bosilgani (button), koordinatalar clientX/Y va pageX/Y, hamda shiftKey, ctrlKey, altKey, metaKey modifikator tugmalari.",
      body: [
        { lead: "Sichqoncha hodisalari nafaqat haqiqiy sichqoncha (mouse) uchun, balki sensorli ekranlar va planshetlar uchun ham ishlaydi — u yerda ular moslashtirilgan tarzda emulyatsiya qilinadi. Ushbu darsda sichqonchaning asosiy hodisalarini, ular qaysi tartibda yuzaga kelishini va har birida qanday ma'lumot borligini chuqur o'rganamiz." },

        { warn: "Diqqat: bu bo'limdagi UI/DOM hodisalari kurs sahifasidagi interaktiv maydonchada (playground) ishlamaydi. Sabab: bu yerda haqiqiy DOM va brauzer oynasi yo'q. Shuning uchun quyidagi barcha misollar <strong>statik</strong> — ularni o'zingizning HTML faylingizda sinab ko'rishingiz kerak." },

        { h2: "Sichqonchaning asosiy hodisalari" },
        { p: "Sichqoncha bilan bog'liq eng ko'p ishlatiladigan hodisalarni ikki guruhga bo'lish mumkin." },
        { h3: "Oddiy hodisalar" },
        { ul: [
          "<code>mousedown</code> / <code>mouseup</code> — element ustida sichqoncha tugmasi bosildi / qo'yib yuborildi.",
          "<code>mouseover</code> / <code>mouseout</code> — sichqoncha kursori element ustiga keldi / undan chiqib ketdi.",
          "<code>mousemove</code> — element ustida sichqonchaning har bir harakati bu hodisani chaqiradi.",
          "<code>click</code> — bir xil element ustida <code>mousedown</code>, so'ng <code>mouseup</code> chap tugma bilan sodir bo'lgach ishga tushadi.",
          "<code>dblclick</code> — bir element ustida qisqa vaqt ichida ikki marta bosilganda ishga tushadi.",
          "<code>contextmenu</code> — o'ng tugma bosilganda ishga tushadi. Boshqa usullar bilan ham (masalan, klaviaturaning maxsus tugmasi) menyu chaqirilishi mumkin, shuning uchun bu aynan sichqoncha hodisasi emas."
        ] },
        { p: "Bu hodisalar orasida ikkitasi — <code>click</code> va <code>dblclick</code> — <strong>murakkab (composite)</strong> hodisalar, ya'ni ular boshqa oddiy hodisalar ketma-ketligidan tashkil topadi." },

        { h2: "Hodisalar tartibi" },
        { p: "Bir amal bir nechta hodisani yuzaga keltirishi mumkin. Masalan, chap tugmani bosish avval <code>mousedown</code>ni (tugma pastga tushganda), so'ng <code>mouseup</code> va <code>click</code>ni (tugma yuqoriga qaytganda) chaqiradi." },
        { p: "Bitta amaldan bir nechta hodisa kelib chiqsa, ularning tartibi qat'iy belgilangan. Ya'ni ishlov beruvchilar (handler) quyidagi tartibda chaqiriladi: <code>mousedown</code> → <code>mouseup</code> → <code>click</code>." },
        { note: "Har bir hodisa alohida ishlov beruvchida qayta ishlanadi, lekin ularning ketma-ketligi barqaror. Shu sabab, agar tugmani bosish jarayonini kuzatmoqchi bo'lsangiz, <code>mousedown</code> va <code>mouseup</code>ni ishlating; \"bosildi\" degan yakuniy amal uchun esa <code>click</code>ni afzal ko'ring." },

        { h2: "Qaysi tugma bosildi: button" },
        { p: "Sichqoncha bilan bog'liq hodisalarda qaysi tugma bosilganini bilish uchun <code>event.button</code> xossasi ishlatiladi. Odatda bu bizga <code>click</code> va <code>contextmenu</code> uchun kerak bo'lmaydi — chunki chap tugma <code>click</code>ni, o'ng tugma esa <code>contextmenu</code>ni chaqiradi. Lekin <code>mousedown</code> va <code>mouseup</code> ishlov beruvchilarida bu zarur bo'lishi mumkin." },
        { p: "<code>event.button</code> ning mumkin bo'lgan qiymatlari:" },
        { ul: [
          "<code>0</code> — chap tugma (asosiy tugma).",
          "<code>1</code> — o'rta tugma (g'ildirak).",
          "<code>2</code> — o'ng tugma (ikkilamchi tugma).",
          "<code>3</code> — X1 tugmasi (odatda \"orqaga\" tugmasi).",
          "<code>4</code> — X2 tugmasi (odatda \"oldinga\" tugmasi)."
        ] },
        { p: "Aksariyat sichqonchalarda faqat chap, o'ng va o'rta tugmalar mavjud, shuning uchun amalda 0, 1 va 2 qiymatlari eng ko'p ishlatiladi." },
        { code: "elem.onmousedown = function(event) {\n  if (event.button === 0) {\n    alert('Chap tugma bosildi');\n  }\n  if (event.button === 2) {\n    alert('O\\'ng tugma bosildi');\n  }\n};" },
        { warn: "Eski qo'llanmalarda <code>event.which</code> xossasini uchratishingiz mumkin: <code>1</code> — chap, <code>2</code> — o'rta, <code>3</code> — o'ng. <code>event.which</code> eskirgan (deprecated) hisoblanadi va endi ishlatilmasligi kerak. Uning o'rniga <code>event.button</code>dan foydalaning." },

        { h3: "buttons xossasi" },
        { p: "Bundan tashqari <code>event.buttons</code> xossasi ham bor — u ayni damda <strong>bosib turilgan barcha tugmalarni</strong> bit-maska (bitmask) sifatida saqlaydi. Chap tugma uchun 1, o'ng uchun 2, o'rta uchun 4. Bir vaqtning o'zida bir nechta tugma bosilsa, ularning yig'indisi qaytadi. Bu kamdan-kam ishlatiladi." },

        { h2: "Koordinatalar: clientX/Y, pageX/Y" },
        { p: "Barcha sichqoncha hodisalari ikki xil koordinata to'plamini beradi:" },
        { ul: [
          "Oynaga nisbatan (window-relative): <code>clientX</code> va <code>clientY</code>. Bular kursorning brauzer ko'rinadigan sohasi (viewport) yuqori chap burchagiga nisbatan koordinatalari. Sahifa skroll qilinsa ham ular o'zgarmaydi.",
          "Hujjatga nisbatan (document-relative): <code>pageX</code> va <code>pageY</code>. Bular butun hujjatning yuqori chap burchagiga nisbatan koordinatalar. Sahifa skroll qilinganda ular skroll miqdoriga qo'shiladi."
        ] },
        { p: "Masalan, agar oyna 500x500 o'lchamda bo'lib, kursor chap yuqori burchakda tursa, <code>clientX</code> va <code>clientY</code> ikkalasi ham 0 bo'ladi. Agar kursor markazda bo'lsa, ular 250 ni ko'rsatadi — sahifa qancha skroll qilingan bo'lishidan qat'i nazar." },
        { code: "elem.onmousemove = function(event) {\n  console.log('Oynaga nisbatan: ' + event.clientX + ', ' + event.clientY);\n  console.log('Hujjatga nisbatan: ' + event.pageX + ', ' + event.pageY);\n};" },
        { tip: "Odatda \"suzib yuruvchi\" (fixed) elementni kursor yoniga qo'ymoqchi bo'lsangiz — masalan, maslahat oynasini (tooltip) — <code>clientX/Y</code> va <code>position: fixed</code> ishlating. Agar element sahifa bilan birga skroll qilinishi kerak bo'lsa — <code>pageX/Y</code> va <code>position: absolute</code>." },

        { h2: "Matn belgilanishini oldini olish" },
        { p: "Sichqonchani ikki marta bosish ko'pincha matnni belgilaydi, bu esa interfeysga xalaqit berishi mumkin. Masalan, tugmada dblclick bo'lsa, tugma matni belgilanib qolishi mumkin. Buni oldini olish uchun brauzerning standart harakatini bekor qilamiz." },
        { p: "Muammo shundaki, matn belgilanishi <code>mousedown</code> paytida boshlanadi. Shuning uchun standart harakatni aynan <code>mousedown</code>da bekor qilish kerak:" },
        { code: "<b ondblclick=\"alert('dblclick')\" onmousedown=\"return false\">\n  Meni ikki marta bosing\n</b>" },
        { p: "Endi qalin (bold) matn ikki marta bosilganda belgilanmaydi, o'ng tugmani bosish esa CSS orqali ham nazorat qilinishi mumkin (<code>user-select: none</code>). Lekin ba'zan foydalanuvchi baribir matnni nusxalab olishi kerak bo'ladi, shuning uchun bu texnikadan ehtiyotkorlik bilan foydalaning." },
        { warn: "Standart harakatni bekor qilish (<code>return false</code> yoki <code>event.preventDefault()</code>) foydalanuvchi tajribasiga ta'sir qilishi mumkin. Faqat haqiqatan zarur bo'lganda ishlating." },

        { h2: "Modifikator tugmalar: shift, alt, ctrl, meta" },
        { p: "Barcha sichqoncha hodisalari qaysi \"modifikator\" (o'zgartiruvchi) tugmalari ushlab turilganini aks ettiruvchi mantiqiy (boolean) xossalarni o'z ichiga oladi:" },
        { ul: [
          "<code>event.shiftKey</code> — <code>Shift</code> tugmasi bosib turilganmi.",
          "<code>event.altKey</code> — <code>Alt</code> tugmasi (yoki Mac'da <code>Opt</code>).",
          "<code>event.ctrlKey</code> — <code>Ctrl</code> tugmasi.",
          "<code>event.metaKey</code> — <code>Cmd</code> tugmasi (Mac'da) yoki <code>Win</code> tugmasi (Windows'da)."
        ] },
        { p: "Masalan, quyidagi tugma faqat <code>Alt</code>+<code>Shift</code>+bosish bilan ishlaydi:" },
        { code: "button.onclick = function(event) {\n  if (event.altKey && event.shiftKey) {\n    alert('Yashasin, Alt+Shift+Bosish!');\n  }\n};" },
        { warn: "Mac'da odatda <code>Cmd</code> tugmasi Windows'dagi <code>Ctrl</code> o'rnida ishlatiladi. Windows va Linux foydalanuvchilari <code>Ctrl</code> bosgan joyda, Mac foydalanuvchisi <code>Cmd</code> bosishi tabiiy. Shuning uchun barcha platformalarda qulay bo'lishi uchun ko'pincha <code>ctrlKey || metaKey</code> shartini yozadilar:" },
        { code: "if (event.ctrlKey || event.metaKey) {\n  // Windows/Linux'da Ctrl, Mac'da Cmd\n}" },
        { note: "Modifikator tugmalarga tayanadigan qulayliklar (shortcut) uchun har doim muqobil yo'l ham qoldiring. Ba'zi foydalanuvchilar sensorli qurilmadan foydalanadi yoki jismoniy imkoniyatlari cheklangan bo'lishi mumkin — ular modifikator+bosishni bajara olmasligi ehtimol." },

        { h2: "Xulosa" },
        { p: "Sichqoncha hodisalari quyidagi xossalarga ega:" },
        { ul: [
          "Tugma: <code>event.button</code> (0 — chap, 1 — o'rta, 2 — o'ng).",
          "Modifikator tugmalar: <code>shiftKey</code>, <code>altKey</code>, <code>ctrlKey</code>, <code>metaKey</code>.",
          "Koordinatalar: oynaga nisbatan <code>clientX/clientY</code>, hujjatga nisbatan <code>pageX/pageY</code>."
        ] },
        { p: "Bir amaldan bir nechta hodisa kelib chiqsa, ular qat'iy tartibda yuzaga keladi: <code>mousedown</code> → <code>mouseup</code> → <code>click</code>. Matn belgilanishini oldini olish uchun <code>mousedown</code>da standart harakatni bekor qiling." }
      ]
    },

    // ==================================================================
    // 2-DARS
    // ==================================================================
    {
      slug: "mouseover-out",
      title: "mouseover/out, mouseenter/leave",
      blurb: "mouseover/mouseout hodisalari va relatedTarget xossasi; kursor bolalar elementlar ustidan o'tganda yuzaga keladigan muammolar; bubbling qilmaydigan mouseenter/mouseleave hodisalari.",
      body: [
        { lead: "Kursor elementga kirib-chiqishini kuzatuvchi hodisalarni ko'rib chiqamiz. Ular ikki juftlikda keladi: <code>mouseover/mouseout</code> va <code>mouseenter/mouseleave</code>. Farqlarini tushunmaslik ko'p xatoliklarga sabab bo'ladi." },

        { warn: "Bu darsdagi barcha misollar statik — DOM hodisalari playground'da ishlamaydi. Ularni HTML faylingizda sinang." },

        { h2: "mouseover va mouseout hodisalari" },
        { p: "<code>mouseover</code> hodisasi kursor element ustiga kelganda, <code>mouseout</code> esa undan chiqib ketganda yuzaga keladi." },
        { code: "elem.onmouseover = function(event) {\n  console.log('Kursor keldi, kelib chiqqan element: ' + event.target.tagName);\n};\n\nelem.onmouseout = function(event) {\n  console.log('Kursor ketdi');\n};" },
        { p: "Bu hodisalar maxsus <code>relatedTarget</code> xossasiga ega. U <code>target</code>ni to'ldiradi:" },
        { ul: [
          "<code>mouseover</code> uchun: <code>event.target</code> — kursor kelgan element; <code>event.relatedTarget</code> — kursor <strong>qayerdan</strong> kelgani (avvalgi element).",
          "<code>mouseout</code> uchun: <code>event.target</code> — kursor tark etgan element; <code>event.relatedTarget</code> — kursor <strong>qayerga</strong> ketgani (yangi element)."
        ] },
        { warn: "<code>relatedTarget</code> qiymati <code>null</code> bo'lishi mumkin. Bu normal holat: masalan, kursor oyna tashqarisidan kelgan yoki oyna tashqarisiga chiqib ketgan bo'lsa, kelib chiqqan/borgan element bo'lmaydi. Kodingizda <code>relatedTarget</code> bilan ishlaganda uni tekshirishni unutmang, aks holda <code>Cannot read property 'tagName' of null</code> kabi xatolik olishingiz mumkin." },

        { h2: "Harakatlarni o'tkazib yuborish (skip)" },
        { p: "<code>mousemove</code> hodisasi kursor har harakatlanganda ishga tushadi. Lekin bu har bir pikselni kuzatishni anglatmaydi — brauzer kursor pozitsiyasini vaqti-vaqti bilan tekshiradi. Shuning uchun kursor tez harakat qilsa, ba'zi oraliq DOM elementlari o'tkazib yuborilishi mumkin." },
        { p: "Masalan, kursor sahifa markazidan boshqa tomonga tez o'tsa, orada joylashgan elementlar (yoki hatto butun oyna) e'tiborga olinmasligi mumkin. Bunday holatda <code>mouseover</code> to'g'ridan-to'g'ri chetdagi elementga tegishli bo'ladi." },
        { note: "Bu qulay xususiyat: agar bir vaqtning o'zida ko'p elementlarni qayta ishlashga to'g'ri kelmasa, brauzer resurslarni tejaydi. Lekin natijada ba'zi <code>mouseover</code>/<code>mouseout</code> juftliklari \"yo'qolib qolishi\" mumkin. Agar biror element uchun <code>mouseover</code> ishga tushgan bo'lsa, uning uchun mos <code>mouseout</code> ham kafolatlanadi." },

        { h2: "\"Bolalar\" elementlarga o'tishdagi muammo" },
        { p: "Muhim va ko'pincha kutilmagan xatti-harakat: <code>mouseover</code> element ustiga kelganda ishga tushadi, biroq kursor <strong>bola</strong> (child) elementga o'tsa ham <code>mouseout</code> ota-elementda ishga tushib qoladi!" },
        { p: "Brauzer nuqtai nazaridan mantiq shunday: kursor bir vaqtning o'zida faqat bitta eng chuqur (topmost) element ustida bo'la oladi — bu eng ichkaridagi va eng ustunlik (z-index) bo'yicha tepadagi element. Shuning uchun kursor ota-elementdan uning ichidagi bola elementga kirsa, texnik jihatdan u ota-elementni tark etib, bolaga kirgan hisoblanadi." },
        { code: "// #parent ichida #child bor deylik.\n// Kursor #parent'dan #child'ga o'tsa, bu hodisalar ishga tushadi:\n// 1) #parent uchun mouseout (target=#parent, relatedTarget=#child)\n// 2) #child uchun mouseover (target=#child, relatedTarget=#parent)" },
        { p: "Bu shuni anglatadiki, agar <code>onmouseout</code> ishlov beruvchisida elementni yashirsak yoki uni \"kursor ketdi\" deb hisoblasak, kursor aslida hali ota-element ichida (uning bolasida) bo'lsa ham, yolg'on \"ketish\" hodisasini olamiz. Bu miltillash (flicker) va noto'g'ri xatti-harakatlarga olib keladi." },
        { tip: "Agar shunchaki \"kursor elementga (bolalari bilan birga) kirdi/chiqdi\" faktini kuzatmoqchi bo'lsangiz, quyidagi <code>mouseenter/mouseleave</code>dan foydalaning — ular aynan shu muammoni hal qiladi." },

        { h2: "mouseenter va mouseleave hodisalari" },
        { p: "<code>mouseenter</code> va <code>mouseleave</code> hodisalari <code>mouseover/mouseout</code>ga o'xshaydi: ular ham kursor kirib-chiqishida ishga tushadi. Biroq ikki muhim farq bor:" },
        { ol: [
          "Element ichidagi o'tishlar (masalan, ota-elementdan bolasiga o'tish) hisobga <strong>olinmaydi</strong>. <code>mouseenter</code> faqat kursor butun elementga (bolalari bilan birga) birinchi marta kirganda ishga tushadi; <code>mouseleave</code> esa kursor uni butunlay tark etganda.",
          "Bu hodisalar <strong>ko'tarilmaydi (bubbling qilmaydi)</strong>."
        ] },
        { p: "Bu ikki farq ishlashni ancha soddalashtiradi. Kursor element ichidagi bolalar ustidan qanchalik o'tmasin, <code>mouseenter</code> faqat bir marta kirishda, <code>mouseleave</code> esa bir marta to'liq chiqishda ishga tushadi:" },
        { code: "elem.onmouseenter = function(event) {\n  // Faqat kursor 'elem' (va uning bolalari) ichiga kirganda.\n  // relatedTarget bu yerda ham mavjud.\n};\n\nelem.onmouseleave = function(event) {\n  // Faqat kursor 'elem'ni butunlay tark etganda.\n};" },
        { warn: "<code>mouseenter/mouseleave</code> bubbling qilmagani uchun, ularni hodisa delegatsiyasi (event delegation) bilan ishlata olmaysiz. Ya'ni bitta ota-elementga ishlov beruvchi qo'yib, uning ichidagi ko'plab bolalarni bittada kuzatib bo'lmaydi. Har bir kerakli elementga alohida ishlov beruvchi qo'yish kerak. Bunday delegatsiya zarur bo'lsa, <code>mouseover/mouseout</code> va <code>relatedTarget</code> tekshiruvi bilan ishlashga to'g'ri keladi." },

        { h2: "Qaysi birini tanlash kerak?" },
        { p: "Amaliy tavsiya:" },
        { ul: [
          "Agar shunchaki \"kursor bu elementga kirdimi/chiqdimi\" degan oddiy holatni kuzatmoqchi bo'lsangiz — <code>mouseenter/mouseleave</code> ishlating. Ular ishonchli va soddaroq.",
          "Agar hodisa delegatsiyasi kerak bo'lsa (masalan, katta jadval kataklarini bittada kuzatish) — <code>mouseover/mouseout</code> va <code>relatedTarget</code> tekshiruvidan foydalaning."
        ] },

        { h2: "Xulosa" },
        { ul: [
          "<code>mouseover/mouseout</code> — kursor element yoki uning bolalari ustidan o'tganda ham ishga tushadi, bubbling qiladi, <code>relatedTarget</code> beradi. Bolalar bilan muammoga duch keladi.",
          "<code>mouseenter/mouseleave</code> — faqat elementga to'liq kirish/chiqishda ishga tushadi, ichki o'tishlarni e'tiborsiz qoldiradi, lekin bubbling qilmaydi (delegatsiya ishlamaydi).",
          "<code>relatedTarget</code> <code>null</code> bo'lishi mumkin — har doim tekshiring."
        ] }
      ]
    },

    // ==================================================================
    // 3-DARS
    // ==================================================================
    {
      slug: "drag-drop",
      title: "Drag'n'Drop (sichqoncha bilan)",
      blurb: "mousedown → mousemove → mouseup algoritmi asosida element sudrash; brauzerning standart ondragstart harakatini o'chirish; pointer-events va document.elementFromPoint yordamida nishonlarni (droppable) aniqlash.",
      body: [
        { lead: "Drag'n'Drop (sudrab tashlash) — foydalanuvchiga qulay interfeys usuli. Faylni papkaga sudrash, savatga mahsulot tashlash, elementlar tartibini o'zgartirish — bularning barchasi shu texnikaga asoslanadi. Bu darsda sof sichqoncha hodisalari asosidagi Drag'n'Drop'ni chuqur ko'rib chiqamiz." },

        { note: "Brauzerda \"tug'ma\" Drag Events API ham mavjud (<code>dragstart</code>, <code>dragend</code> va h.k.). U fayllarni tashqi ilovalardan sudrab kirtish uchun qulay, lekin cheklovlari bor: gorizontal/vertikal harakatni cheklash yoki maxsus animatsiyalar qilish qiyin. Shuning uchun ko'p hollarda oddiy sichqoncha hodisalari afzal ko'riladi — biz shuni o'rganamiz." },

        { warn: "Bu darsdagi kod misollari statik — DOM hodisalari playground'da ishlamaydi. Ularni haqiqiy HTML sahifada sinang." },

        { h2: "Asosiy algoritm" },
        { p: "Drag'n'Drop algoritmi juda sodda ko'rinadi — u uch hodisaga asoslanadi:" },
        { ol: [
          "<code>mousedown</code> — elementni bosganda sudrashni boshlaymiz.",
          "<code>mousemove</code> — kursor harakatlanganda elementni ko'chiramiz (uni <code>position: absolute</code> qilib, koordinatalarini yangilaymiz).",
          "<code>mouseup</code> — tugma qo'yib yuborilganda sudrashni to'xtatamiz."
        ] },
        { p: "Muhim nuqta: <code>mousemove</code>ni <strong>elementga emas, balki butun hujjatga</strong> (<code>document</code>ga) bog'lash kerak. Chunki kursor tez harakatlanganda element kursordan orqada qolishi va <code>mousemove</code> element ustida bo'lmasligi mumkin. Agar hodisani faqat elementga bog'lasak, sudrash \"uzilib\" qoladi." },
        { code: "let ball = document.getElementById('ball');\n\nball.onmousedown = function(event) {\n  // Elementni body'ga to'g'ridan-to'g'ri joylashtiramiz\n  ball.style.position = 'absolute';\n  ball.style.zIndex = 1000;\n  document.body.append(ball);\n\n  function moveAt(pageX, pageY) {\n    ball.style.left = pageX - ball.offsetWidth / 2 + 'px';\n    ball.style.top = pageY - ball.offsetHeight / 2 + 'px';\n  }\n\n  // Elementni kursor markaziga joylashtiramiz\n  moveAt(event.pageX, event.pageY);\n\n  function onMouseMove(event) {\n    moveAt(event.pageX, event.pageY);\n  }\n\n  // mousemove'ni HUJJATGA bog'laymiz\n  document.addEventListener('mousemove', onMouseMove);\n\n  // Qo'yib yuborilganda tozalaymiz\n  ball.onmouseup = function() {\n    document.removeEventListener('mousemove', onMouseMove);\n    ball.onmouseup = null;\n  };\n};" },

        { h2: "Standart ondragstart harakatini o'chirish" },
        { p: "Agar yuqoridagi kodni sinasangiz, tuval (canvas) yoki rasm (image) elementlarida g'alati holat kuzatiladi: sudrash o'rniga brauzer o'zining \"native\" drag-and-drop harakatini ishga tushiradi. Bu bizga xalaqit beradi." },
        { p: "Yechim — brauzerning standart <code>dragstart</code> harakatini bekor qilish:" },
        { code: "ball.ondragstart = function() {\n  return false;\n};" },
        { p: "Endi brauzer o'zining drag harakatini boshlamaydi va bizning kodimiz to'sqinliksiz ishlaydi." },
        { note: "Bu bitta qator ko'pincha unutiladi va \"nega mening drag'n'drop'im ba'zi elementlarda buziladi?\" degan savolga sabab bo'ladi. Rasm va havolalar (link) uchun bu ayniqsa muhim." },

        { h2: "Sudrash markazini to'g'rilash" },
        { p: "Yuqorida biz elementni kursor markaziga joylashtirdik. Lekin haqiqiy interfeyslarda foydalanuvchi elementning istalgan joyidan ushlashi mumkin. Agar shunda elementni har doim markazga ko'chirsak, u \"sakrab\" ketadi." },
        { p: "To'g'ri yechim: <code>mousedown</code> paytida kursor bilan element chekkasi orasidagi masofani (siljish, shift) hisoblab, keyingi harakatlarda uni saqlab qolish kerak:" },
        { code: "ball.onmousedown = function(event) {\n  // Kursor bilan element chap-yuqori burchagi orasidagi masofa\n  let shiftX = event.clientX - ball.getBoundingClientRect().left;\n  let shiftY = event.clientY - ball.getBoundingClientRect().top;\n\n  function moveAt(pageX, pageY) {\n    ball.style.left = pageX - shiftX + 'px';\n    ball.style.top = pageY - shiftY + 'px';\n  }\n  // ...qolgan qismi yuqoridagidek\n};" },
        { tip: "<code>getBoundingClientRect()</code> elementning oynaga nisbatan koordinatalarini beradi. Shu sabab bu yerda <code>clientX/Y</code> ishlatiladi (ikkalasi ham oynaga nisbatan). Keyin joylashtirishda esa hujjatga nisbatan <code>pageX/Y</code> va <code>left/top</code> (absolute) ishlatiladi." },

        { h2: "pointer-events bilan nishonni aniqlash muammosi" },
        { p: "Sudralayotgan element kursor tagida turadi. Bu bir muammo tug'diradi: kursor ostidagi <strong>haqiqiy nishon</strong> (masalan, savat yoki papka) qaysi element ekanini bilmoqchi bo'lsak, <code>event.target</code> har doim sudralayotgan elementning o'zini qaytaradi — chunki u kursor tagida yotibdi!" },
        { p: "Yechim ikkita. Birinchisi — CSS <code>pointer-events: none</code>. Bu xossa elementni sichqoncha hodisalari uchun \"ko'rinmas\" qiladi — hodisalar undan o'tib, ostidagi elementga yetadi:" },
        { code: "// Sudrayotgan element sichqoncha hodisalarini o'tkazib yuboradi:\n// ball.style.pointerEvents = 'none';\n// Endi event.target ostidagi haqiqiy elementni qaytaradi." },
        { warn: "<code>pointer-events: none</code> oddiy va tez, lekin cheklovi bor: agar sudralayotgan elementda ham sichqoncha hodisalari kerak bo'lsa, bu ishlamaydi. Bunday holatda quyidagi <code>elementFromPoint</code> usuli afzal." },

        { h2: "document.elementFromPoint bilan nishonni aniqlash" },
        { p: "Ikkinchi, universal yechim — <code>document.elementFromPoint(clientX, clientY)</code> metodi. U berilgan oyna koordinatalaridagi eng ustki (topmost) elementni qaytaradi. Sudrash paytida sudralayotgan elementni vaqtincha yashirib, ostidagi nishonni topamiz:" },
        { code: "// mousemove ichida:\nfunction onMouseMove(event) {\n  moveAt(event.pageX, event.pageY);\n\n  // Sudralayotgan elementni yashiramiz\n  ball.hidden = true;\n  let elemBelow = document.elementFromPoint(event.clientX, event.clientY);\n  ball.hidden = false;\n\n  // elemBelow null bo'lishi mumkin (kursor oyna tashqarisida bo'lsa)\n  if (!elemBelow) return;\n\n  // Nishon (droppable) elementni topamiz\n  let droppableBelow = elemBelow.closest('.droppable');\n  // ...droppableBelow ustida ekanmizmi, tekshiramiz\n}" },
        { warn: "<code>elementFromPoint(clientX, clientY)</code> aynan <strong>oyna koordinatalarini</strong> (client), <strong>hujjat koordinatalarini emas</strong> (page) kutadi. Agar adashib <code>pageX/pageY</code> bersangiz va sahifa skroll qilingan bo'lsa — noto'g'ri element qaytadi. Shuningdek, agar koordinatalar oyna tashqarisida bo'lsa, metod <code>null</code> qaytaradi." },
        { note: "Sudralayotgan elementni <code>ball.hidden = true</code> bilan bir lahzaga yashirib, so'ng darhol <code>ball.hidden = false</code> qilish miltillash chaqirmaydi, chunki brauzer bu ikki o'zgarish orasida ekranni qayta chizmaydi (repaint)." },

        { h2: "Nishonlarni kuzatish: onDragEnter/onDragLeave" },
        { p: "Yuqoridagi <code>elemBelow</code>ni har <code>mousemove</code>da hisoblab, oldingi qiymat bilan solishtirib, o'zimizning \"nishonga kirdi / nishondan chiqdi\" mantig'ini yozamiz. Bu bizga nishonni yoritish (highlight) yoki boshqa vizual javob berish imkonini beradi:" },
        { code: "let currentDroppable = null;\n\nfunction onMouseMove(event) {\n  // ...moveAt va elemBelow ni hisoblaymiz...\n  let droppableBelow = elemBelow ? elemBelow.closest('.droppable') : null;\n\n  if (currentDroppable !== droppableBelow) {\n    if (currentDroppable) {\n      // Oldingi nishondan chiqdik\n      leaveDroppable(currentDroppable);\n    }\n    currentDroppable = droppableBelow;\n    if (currentDroppable) {\n      // Yangi nishonga kirdik\n      enterDroppable(currentDroppable);\n    }\n  }\n}" },

        { h2: "Xulosa" },
        { p: "Sichqoncha asosidagi Drag'n'Drop algoritmi:" },
        { ol: [
          "<code>mousedown</code>: sudrashni boshlash, <code>shiftX/shiftY</code> ni hisoblash, standart <code>ondragstart</code>ni <code>return false</code> bilan o'chirish.",
          "<code>mousemove</code> (hujjatga bog'langan): elementni ko'chirish va <code>elementFromPoint</code> yoki <code>pointer-events: none</code> orqali nishonni aniqlash.",
          "<code>mouseup</code>: sudrashni to'xtatish va ishlov beruvchilarni tozalash (<code>removeEventListener</code>)."
        ] },
        { tip: "Chinakam kutubxonalar (masalan, Sortable.js, jQuery UI Draggable) shu asosda qurilgan, lekin ular tekislik (accessibility), sensorli qurilma va ko'plab chekka holatlarni ham hisobga oladi. Amaliy loyihalarda tayyor kutubxonadan foydalanish ko'pincha oqilona." }
      ]
    },

    // ==================================================================
    // 4-DARS
    // ==================================================================
    {
      slug: "pointer-events",
      title: "Pointer hodisalari",
      blurb: "pointerdown/move/up va boshqa Pointer Events; pointerId, pointerType, isPrimary xossalari; setPointerCapture; sichqoncha, sensor va qalam (stylus) hodisalarini yagona API'da birlashtirish.",
      body: [
        { lead: "Pointer hodisalari (Pointer Events) — sichqoncha, sensorli ekran va qalam (stylus) kabi turli ko'rsatuvchi qurilmalar bilan ishlashning zamonaviy va yagona usuli. Ular sichqoncha hodisalarining o'rnini bosishga mo'ljallangan va bugungi kunda barcha zamonaviy brauzerlarda qo'llab-quvvatlanadi." },

        { warn: "Bu darsdagi kod misollari statik — pointer hodisalari playground'da ishlamaydi. Ularni haqiqiy sahifada sinang." },

        { h2: "Qisqacha tarix" },
        { p: "Uzoq vaqt faqat sichqoncha hodisalari mavjud edi. Keyin sensorli qurilmalar (telefon, planshet) tarqaldi va ular uchun <code>touchstart</code>, <code>touchmove</code>, <code>touchend</code> kabi Touch Events paydo bo'ldi. Muammo shundaki, dasturchilarga bir vaqtda ikki xil (sichqoncha va sensor) API'ni qo'llab-quvvatlashga to'g'ri kelardi — bu ko'p takroriy kod demakdir." },
        { p: "Buni hal qilish uchun <strong>Pointer Events</strong> standarti yaratildi. U barcha turdagi ko'rsatuvchi qurilmalarni bitta yagona API ostida birlashtiradi. Bugun eng so'nggi versiya — Pointer Events Level 2 — barcha asosiy brauzerlarda ishlaydi." },

        { h2: "Pointer hodisalari turlari" },
        { p: "Pointer hodisalarining nomlari sichqoncha hodisalariga o'xshaydi — faqat <code>mouse</code> o'rniga <code>pointer</code>:" },
        { ul: [
          "<code>pointerdown</code> — sichqonchaning <code>mousedown</code>iga o'xshash.",
          "<code>pointerup</code> — <code>mouseup</code>ga o'xshash.",
          "<code>pointermove</code> — <code>mousemove</code>ga o'xshash.",
          "<code>pointerover</code> / <code>pointerout</code> — <code>mouseover/mouseout</code>ga o'xshash.",
          "<code>pointerenter</code> / <code>pointerleave</code> — <code>mouseenter/mouseleave</code>ga o'xshash.",
          "<code>pointercancel</code> — ko'rsatish uzilganda (masalan, tizim harakatni o'z zimmasiga olganda).",
          "<code>gotpointercapture</code> / <code>lostpointercapture</code> — pointer ushlash (capture) olinganda/yo'qolganda."
        ] },
        { note: "Ko'p hollarda mavjud <code>mouse...</code> hodisa nomlarini <code>pointer...</code>ga almashtirishning o'zi kifoya qiladi — kod sichqoncha, sensor va qalamda barobar ishlay boshlaydi. Bu Pointer Events'ning eng katta afzalligi." },

        { h2: "pointerType: qurilma turini aniqlash" },
        { p: "Pointer hodisalari sichqoncha hodisalarining barcha xossalarini (<code>clientX/Y</code>, <code>target</code>, <code>button</code> va h.k.) meros qilib oladi. Bundan tashqari o'ziga xos yangi xossalar bor. Eng foydalisi — <code>pointerType</code>. U qaysi turdagi qurilma hodisani chaqirganini bildiradi:" },
        { ul: [
          "<code>'mouse'</code> — sichqoncha.",
          "<code>'pen'</code> — qalam (stylus).",
          "<code>'touch'</code> — barmoq (sensorli ekran)."
        ] },
        { code: "elem.onpointerdown = function(event) {\n  if (event.pointerType === 'touch') {\n    // Barmoq bilan bosildi\n  } else if (event.pointerType === 'pen') {\n    // Qalam bilan\n  } else {\n    // Sichqoncha bilan\n  }\n};" },
        { p: "Bu bizga qurilma turiga qarab turlicha xatti-harakat qilish imkonini beradi — bir xil kod ichida, ikkita alohida API'siz." },

        { h2: "pointerId: bir nechta barmoqni ajratish" },
        { p: "Har bir ko'rsatuvchining o'ziga xos identifikatori bor — <code>pointerId</code>. Sichqoncha bilan ishlaganda bu odatda muhim emas (bitta kursor). Lekin sensorli ekranlarda ko'p barmoqli (multi-touch) harakatlar bo'lishi mumkin — masalan, ikki barmoq bilan kattalashtirish (pinch-zoom)." },
        { p: "Har bir barmoqqa alohida <code>pointerId</code> beriladi. Shu tufayli bir vaqtning o'zida bir nechta ko'rsatuvchini alohida-alohida kuzatish mumkin:" },
        { code: "elem.onpointerdown = function(event) {\n  console.log('Yangi pointer, ID: ' + event.pointerId);\n  // Har bir barmoq uchun turli pointerId keladi\n};" },
        { tip: "Ko'p barmoqli interfeyslar (masalan, virtual pianino yoki multi-touch chizma dasturi) yaratishda <code>pointerId</code> markaziy rol o'ynaydi — u har bir barmoqni alohida obyekt sifatida boshqarishga yordam beradi. Bu Touch Events bilan ancha mashaqqatliroq edi." },

        { h3: "isPrimary xossasi" },
        { p: "Bir nechta ko'rsatuvchi bir vaqtda bo'lsa (masalan, bir nechta barmoq), <code>event.isPrimary</code> xossasi \"birlamchi\" (asosiy) ko'rsatuvchi uchun <code>true</code> qaytaradi — bu odatda birinchi tegilgan barmoq. Bu bilan asosiy harakatni ikkilamchilaridan ajratish mumkin." },

        { h2: "setPointerCapture: pointer'ni ushlab qolish" },
        { p: "Pointer Events'ning kuchli imkoniyatlaridan biri — <code>elem.setPointerCapture(pointerId)</code> metodi. U berilgan <code>pointerId</code>ga tegishli barcha kelgusi hodisalarni shu <code>elem</code>ga \"biriktirib qo'yadi\" (bind qiladi)." },
        { p: "Ya'ni <code>setPointerCapture</code> chaqirilgandan so'ng, ko'rsatuvchi qayerda bo'lishidan qat'i nazar (hatto element chegarasidan tashqariga chiqsa ham), barcha pointer hodisalari maqsad qilingan elementga yo'naltiriladi — <code>event.target</code> har doim o'sha element bo'ladi." },
        { code: "// Slayder (slider) yasashda foydali:\nslider.onpointerdown = function(event) {\n  // Endi bu pointer'ning barcha hodisalari slider'ga keladi,\n  // kursor slider tashqarisiga chiqib ketsa ham.\n  slider.setPointerCapture(event.pointerId);\n};\n\nslider.onpointermove = function(event) {\n  // Slayder tashqarisida ham ishlaydi!\n};" },
        { note: "Capture avtomatik ravishda <code>pointerup</code> yoki <code>pointercancel</code> yuzaga kelganda bekor qilinadi. Uni qo'lda bekor qilish uchun <code>elem.releasePointerCapture(pointerId)</code> ishlatiladi." },
        { tip: "Oldingi darsdagi Drag'n'Drop yoki slayder misolini eslang: u yerda <code>mousemove</code>ni <code>document</code>ga bog'lashimiz kerak edi, aks holda kursor element tashqarisiga chiqsa hodisa yo'qolardi. <code>setPointerCapture</code> bilan bu muammo o'z-o'zidan hal bo'ladi — ishlov beruvchilarni hujjatga ko'chirish shart emas, kod ancha toza bo'ladi." },

        { h2: "gotpointercapture va lostpointercapture" },
        { p: "Capture olingan va yo'qolgan paytlarni kuzatish uchun ikki hodisa bor: <code>gotpointercapture</code> (element pointer'ni ushlaganda) va <code>lostpointercapture</code> (ushlash tugaganda). Odatda ular kamdan-kam kerak bo'ladi, lekin murakkab holatlarni to'g'ri boshqarishda yordam beradi." },

        { h2: "Xulosa" },
        { ul: [
          "Pointer Events sichqoncha, sensor va qalam hodisalarini <strong>bitta API'da</strong> birlashtiradi — kod barcha qurilmalarda ishlaydi.",
          "<code>mouse...</code> nomlarini <code>pointer...</code>ga almashtirishning o'zi ko'pincha kifoya.",
          "<code>pointerType</code> qurilma turini (mouse/pen/touch) bildiradi.",
          "<code>pointerId</code> har bir ko'rsatuvchini alohida ajratadi — ko'p barmoqli interfeyslar uchun zarur.",
          "<code>setPointerCapture</code> pointer hodisalarini elementga biriktiradi — slayder va sudrash uchun juda qulay."
        ] },
        { p: "Zamonaviy loyihalarda interaktivlik uchun Touch Events yoki alohida sichqoncha hodisalari o'rniga Pointer Events'dan foydalanish tavsiya etiladi." }
      ]
    },

    // ==================================================================
    // 5-DARS
    // ==================================================================
    {
      slug: "klaviatura",
      title: "Klaviatura: keydown va keyup",
      blurb: "keydown va keyup hodisalari; event.key (belgi) va event.code (fizik tugma) o'rtasidagi farq; avto-takror (auto-repeat); standart harakatlar va ularni oldini olish; amaliy qiyosiy misollar.",
      body: [
        { lead: "Klaviatura hodisalari foydalanuvchi tugmalarni bosganda kuzatiladi. Zamonaviy qurilmalarda matn kiritishning boshqa usullari ham bor (ovoz orqali kiritish, nusxa-joylashtirish), shuning uchun \"matn kiritishini kuzatish\" istasangiz, <code>input</code> hodisasi ko'pincha afzalroq. Klaviatura hodisalari esa aynan jismoniy tugmalar bilan ishlash kerak bo'lganda ishlatiladi — masalan, o'yin boshqaruvi yoki tez tugmalar (hotkey)." },

        { warn: "Bu darsdagi misollar statik — klaviatura hodisalari playground'da ishlamaydi. Ularni haqiqiy sahifada sinang." },

        { h2: "keydown va keyup hodisalari" },
        { p: "Ikki asosiy hodisa bor:" },
        { ul: [
          "<code>keydown</code> — tugma bosilganda (pastga tushganda).",
          "<code>keyup</code> — tugma qo'yib yuborilganda (yuqoriga qaytganda)."
        ] },
        { code: "document.addEventListener('keydown', function(event) {\n  console.log('Bosildi. key: ' + event.key + ', code: ' + event.code);\n});\n\ndocument.addEventListener('keyup', function(event) {\n  console.log('Qo\\'yib yuborildi');\n});" },

        { h2: "event.key va event.code: asosiy farq" },
        { p: "Har bir klaviatura hodisasida ikkita muhim xossa bor: <code>event.key</code> va <code>event.code</code>. Ularning farqini tushunish klaviatura bilan ishlashning asosidir." },
        { ul: [
          "<code>event.key</code> — bu <strong>belgi (character)</strong>ning o'zi, ya'ni bosilgan natijada nima chiqishi. U tildan/registrdan/modifikatorlardan qat'i o'zgaradi.",
          "<code>event.code</code> — bu <strong>fizik tugma kodi</strong>, ya'ni klaviaturada qaysi jismoniy tugma bosilgani. U qaysi belgi chiqishidan qat'i nazar bir xil bo'lib qoladi."
        ] },
        { p: "Masalan, <code>Z</code> tugmasini bosganda:" },
        { code: "// z tugmasi (kichik harf):     key = 'z',  code = 'KeyZ'\n// Shift+Z (katta harf):        key = 'Z',  code = 'KeyZ'\n// Boshqa til (masalan, rus tili) yoqilganda:\n//                              key = boshqa harf, code = 'KeyZ'" },
        { p: "Ko'rib turganingizdek, <code>event.code</code> aynan qaysi jismoniy tugmaga bog'liq va til/registrdan mustaqil. Shuning uchun \"aynan shu tugma\" muhim bo'lganda (masalan, o'yinda <code>W A S D</code> harakat tugmalari) <code>event.code</code> ishlatiladi. Aksincha, \"foydalanuvchi qaysi harfni yozdi\" muhim bo'lganda <code>event.key</code> ishlatiladi." },
        { code: "document.addEventListener('keydown', function(event) {\n  // O'yinda 'W' tugmasi (klaviatura tilidan qat'i nazar)\n  if (event.code === 'KeyW') {\n    // oldinga harakat\n  }\n});" },
        { warn: "Xat/raqam tugmalari uchun kod naqshlari: harflar — <code>KeyA</code>...<code>KeyZ</code>, raqamlar — <code>Digit0</code>...<code>Digit9</code>. Diqqat: <code>event.code</code> katta-kichik harfga sezgir. <code>'keyZ'</code> emas, aynan <code>'KeyZ'</code>. Bu tez-tez adashtiradigan xato." },
        { note: "Maxsus tugmalar uchun <code>event.key</code> tavsiflovchi nom qaytaradi: <code>'Enter'</code>, <code>'Escape'</code>, <code>'Backspace'</code>, <code>'Shift'</code>, <code>'ArrowLeft'</code>, <code>'Tab'</code>, <code>'F1'</code> va h.k. Bu holatda <code>key</code> va <code>code</code> ko'pincha o'xshash bo'ladi (masalan, key='Tab', code='Tab'), lekin har doim emas." },

        { h2: "Avto-takror (auto-repeat)" },
        { p: "Agar tugma uzoq bosib turilsa, avto-takror ishga tushadi: <code>keydown</code> hodisasi qayta-qayta chaqiriladi. Va nihoyat tugma qo'yib yuborilganda bitta <code>keyup</code> keladi." },
        { p: "Shunday holatda <code>event.repeat</code> xossasi <code>true</code> bo'ladi — bu bizga takroriy hodisalarni birinchi bosishdan ajratish imkonini beradi:" },
        { code: "document.addEventListener('keydown', function(event) {\n  if (event.repeat) {\n    // Bu avto-takror (tugma bosib turibdi)\n    return;\n  }\n  // Bu birinchi bosish\n});" },
        { tip: "O'yinlarda avto-takror foydali (belgi tinimsiz harakatlanadi). Ammo ba'zi amallarda (masalan, \"Enter bosilsa yubor\") takrorni e'tiborsiz qoldirish uchun <code>event.repeat</code>ni tekshirish kerak bo'ladi." },

        { h2: "Standart harakatlar" },
        { p: "Ko'p klaviatura amallari brauzerning standart harakatiga bog'langan. Masalan:" },
        { ul: [
          "Belgi tugmasi bosilsa — matn maydoniga belgi chiqadi.",
          "<code>Delete</code> bosilsa — belgi o'chiriladi.",
          "<code>PageDown</code> bosilsa — sahifa pastga skroll qilinadi.",
          "<code>Ctrl+S</code> bosilsa — brauzer sahifani saqlash oynasini ochadi."
        ] },
        { p: "Bu standart harakatlarni <code>event.preventDefault()</code> bilan bekor qilish mumkin. Masalan, matn maydonini faqat raqamlar qabul qiladigan qilib cheklashda:" },
        { code: "input.addEventListener('keydown', function(event) {\n  // Faqat raqamlar va boshqaruv tugmalariga ruxsat\n  if (!checkPhoneKey(event.key)) {\n    event.preventDefault();\n  }\n});" },
        { warn: "Ba'zi maxsus tugmalarni <code>preventDefault()</code> bilan to'xtatib bo'lmaydi — ular operatsion tizim darajasida ishlaydi. Masalan, ko'p brauzerlarda <code>F5</code> (yangilash), <code>Ctrl+Tab</code> (yorliqlar orasida o'tish) yoki <code>Alt+F4</code> (oynani yopish) JavaScript'ga bo'ysunmaydi. Bu foydalanuvchi xavfsizligi uchun ataylab shunday qilingan." },

        { h2: "Qiyosiy amaliy misol: hotkey" },
        { p: "Amaliy misol — <code>Ctrl+B</code> (yoki Mac'da <code>Cmd+B</code>) tez tugmasini ushlash. Modifikatorlar uchun (dars 1'da ko'rganimizdek) mos xossalar bor:" },
        { code: "document.addEventListener('keydown', function(event) {\n  // Windows/Linux'da Ctrl, Mac'da Cmd (metaKey)\n  if ((event.ctrlKey || event.metaKey) && event.code === 'KeyB') {\n    event.preventDefault(); // brauzer standartini to'xtatamiz\n    // o'zimizning amalimiz, masalan matnni qalinlashtirish\n  }\n});" },
        { note: "Bu yerda <code>event.code === 'KeyB'</code> ishlatildi (fizik tugma), chunki hotkey odatda klaviatura tilidan mustaqil bo'lishi kerak. Agar <code>event.key === 'b'</code> ishlatsangiz, boshqa til yoqilganda hotkey ishlamay qolishi mumkin." },

        { h2: "Eskirgan xossalar" },
        { p: "Eski kodda quyidagi xossalarni uchratasiz — ularni <strong>ishlatmang</strong>:" },
        { ul: [
          "<code>event.keyCode</code>, <code>event.charCode</code>, <code>event.which</code> — hammasi eskirgan (deprecated). Ularning o'rniga <code>event.key</code> va <code>event.code</code> ishlating."
        ] },

        { h2: "Xulosa" },
        { ul: [
          "<code>keydown</code> tugma bosilganda, <code>keyup</code> qo'yib yuborilganda ishga tushadi.",
          "<code>event.key</code> — belgining o'zi (til/registrga bog'liq); <code>event.code</code> — fizik tugma kodi (mustaqil).",
          "\"Aynan shu tugma\" kerak bo'lsa <code>event.code</code>, \"qaysi harf\" kerak bo'lsa <code>event.key</code> ishlating.",
          "Tugma bosib turilsa <code>keydown</code> takrorlanadi, <code>event.repeat</code> bilan buni aniqlash mumkin.",
          "Standart harakatni <code>event.preventDefault()</code> bekor qiladi, ammo ba'zi OT-darajasidagi tugmalar bunga bo'ysunmaydi."
        ] }
      ]
    },

    // ==================================================================
    // 6-DARS
    // ==================================================================
    {
      slug: "scroll",
      title: "Skroll",
      blurb: "scroll hodisasi; skrollni event bilan to'xtatib bo'lmasligi va uni oldini olishning to'g'ri usullari; \"cheksiz sahifa\" (infinite scroll) g'oyasi va uni amalga oshirish yondashuvi.",
      body: [
        { lead: "<code>scroll</code> hodisasi foydalanuvchi sahifani yoki elementni skroll qilganda ishga tushadi. Bundan foydali narsalar qilish mumkin: skroll pozitsiyasiga qarab qo'shimcha kontent yuklash, \"yuqoriga\" tugmasini ko'rsatish, yoki skroll bo'yicha animatsiyalar qilish. Bu darsda skrollning o'ziga xosliklarini chuqur ko'rib chiqamiz." },

        { warn: "Bu darsdagi misollar statik — skroll hodisasi playground'da ishlamaydi. Ularni haqiqiy sahifada sinang." },

        { h2: "scroll hodisasi" },
        { p: "<code>scroll</code> hodisasi <code>window</code>da (butun sahifa skrolli uchun) yoki istalgan skrollanadigan elementda ishlaydi:" },
        { code: "window.addEventListener('scroll', function() {\n  console.log('Skroll pozitsiyasi: ' + window.pageYOffset);\n});" },
        { p: "Joriy skroll miqdorini bir necha usul bilan bilish mumkin:" },
        { ul: [
          "<code>window.pageYOffset</code> / <code>window.pageXOffset</code> — sahifaning vertikal/gorizontal skroll miqdori (faqat o'qish uchun).",
          "<code>window.scrollY</code> / <code>window.scrollX</code> — yuqoridagilarning zamonaviy nomlari (bir xil qiymat).",
          "Element uchun: <code>elem.scrollTop</code> / <code>elem.scrollLeft</code>."
        ] },
        { code: "window.addEventListener('scroll', function() {\n  // Sahifa oxiriga qanchalik yaqinligini hisoblaymiz\n  let scrolledToBottom =\n    window.pageYOffset + window.innerHeight >=\n    document.documentElement.scrollHeight - 100;\n  if (scrolledToBottom) {\n    console.log('Sahifa oxiriga yaqinlashdik');\n  }\n});" },
        { tip: "<code>scroll</code> hodisasi juda tez-tez ishga tushadi (foydalanuvchi skroll qilganda har lahzada). Shuning uchun ishlov beruvchi ichida og'ir hisob-kitob qilmang. Zarur bo'lsa, throttle (chastotani cheklash) yoki <code>requestAnimationFrame</code> texnikasini qo'llang — aks holda sahifa \"sekinlashadi\" (lag)." },

        { h2: "Skrollni scroll hodisasi bilan to'xtatib bo'lmaydi" },
        { p: "Muhim va ko'pincha adashtiradigan nuqta: <code>scroll</code> hodisasida <code>event.preventDefault()</code> chaqirsangiz ham, skroll <strong>to'xtamaydi</strong>." },
        { p: "Sabab: <code>scroll</code> hodisasi skroll <strong>allaqachon sodir bo'lgandan keyin</strong> ishga tushadi — ya'ni u \"xabar berish\" (reaksiya) hodisasi, boshqarish hodisasi emas. Uni bekor qilib skrollni orqaga qaytarib bo'lmaydi." },
        { code: "// BU ISHLAMAYDI — skroll baribir sodir bo'ladi:\nwindow.addEventListener('scroll', function(event) {\n  event.preventDefault(); // hech qanday ta'sir yo'q\n});" },

        { h3: "Skrollni to'g'ri oldini olish usullari" },
        { p: "Skrollning oldini olish uchun uni <strong>keltirib chiqaruvchi</strong> hodisani to'xtatish kerak. Masalan, klaviatura yoki sichqoncha g'ildiragi (wheel) hodisasini:" },
        { ul: [
          "<code>keydown</code> hodisasida <code>PageDown</code>, <code>ArrowDown</code> kabi skroll qiluvchi tugmalarni <code>preventDefault()</code> bilan to'xtatish.",
          "<code>wheel</code> hodisasida (sichqoncha g'ildiragi) <code>preventDefault()</code> ishlatish."
        ] },
        { p: "Eng ishonchli va oddiy yechim esa CSS orqali: elementga <code>overflow: hidden</code> berish skrollni butunlay o'chiradi. Modal oynalar ochilganda tagdagi sahifa skrollini bloklashda aynan shu ishlatiladi:" },
        { code: "// Modal ochilganda tagdagi sahifa skrollini bloklash:\ndocument.body.style.overflow = 'hidden';\n\n// Modal yopilganda tiklash:\ndocument.body.style.overflow = '';" },
        { note: "Yana bir zamonaviy CSS xossasi — <code>overscroll-behavior</code>. U skroll bir elementdan otasiga \"o'tib ketishini\" (scroll chaining) nazorat qiladi. Masalan, ichki panel oxiriga yetganda butun sahifaning skroll bo'lib ketishini oldini olishda foydali." },

        { h2: "Amaliy misol: \"Yuqoriga\" tugmasi" },
        { p: "Skrollga qarab tugmani ko'rsatish/yashirishning oddiy misoli. Foydalanuvchi ma'lum masofaga pastga tushganda \"yuqoriga qaytish\" tugmasi paydo bo'ladi:" },
        { code: "window.addEventListener('scroll', function() {\n  if (window.pageYOffset > 500) {\n    upButton.style.display = 'block';\n  } else {\n    upButton.style.display = 'none';\n  }\n});\n\nupButton.onclick = function() {\n  window.scrollTo({ top: 0, behavior: 'smooth' });\n};" },

        { h2: "Cheksiz sahifa (infinite scroll)" },
        { p: "\"Cheksiz sahifa\" — bu ko'p ijtimoiy tarmoqlarda ko'radigan xatti-harakat: foydalanuvchi pastga skroll qilgani sari yangi kontent avtomatik yuklanadi va sahifa \"tugamaydi\". Bunga <code>scroll</code> hodisasi asosida erishiladi." },
        { p: "G'oya sodda: har bir skrollda hujjat oxiriga qancha yaqin qolganini tekshiramiz. Agar yetarlicha yaqin bo'lsak — yangi kontent bo'lagini yuklab, sahifa oxiriga qo'shamiz:" },
        { code: "window.addEventListener('scroll', function() {\n  // Hujjatning ko'rinmas (past) qismi 100px dan kam qolsa\n  let windowRelativeBottom =\n    document.documentElement.getBoundingClientRect().bottom;\n\n  if (windowRelativeBottom < document.documentElement.clientHeight + 100) {\n    // Yangi kontent yuklaymiz va qo'shamiz\n    loadMoreContent();\n  }\n});" },
        { p: "Bu yerda mantiq:" },
        { ul: [
          "<code>document.documentElement.getBoundingClientRect().bottom</code> — hujjat pastki chegarasining oynaga nisbatan pozitsiyasi. Skroll qilinsa, u kichrayadi.",
          "<code>document.documentElement.clientHeight</code> — oynaning ko'rinadigan balandligi.",
          "Ular yaqinlashsa — foydalanuvchi sahifa oxiriga yaqinlashgan degani."
        ] },
        { warn: "Cheksiz skrollda ehtiyot bo'lish kerak: <code>loadMoreContent</code> bir necha marta ketma-ket chaqirilmasligi uchun \"yuklanmoqda\" bayrog'ini (flag) qo'ying, aks holda bir skrollda o'nlab so'rov jo'natilib ketishi mumkin:" },
        { code: "let isLoading = false;\n\nwindow.addEventListener('scroll', function() {\n  if (isLoading) return; // allaqachon yuklanmoqda\n  // ...oxiriga yaqin ekanligini tekshiramiz...\n  if (nearBottom) {\n    isLoading = true;\n    loadMoreContent().then(function() {\n      isLoading = false;\n    });\n  }\n});" },
        { tip: "Zamonaviy loyihalarda cheksiz skroll uchun <code>scroll</code> hodisasi o'rniga ko'pincha <code>IntersectionObserver</code> ishlatiladi — u sahifa oxiriga qo'yilgan \"nishon\" element ko'rinishga kirganini samaraliroq va tejamli kuzatadi. <code>scroll</code> hodisasidan farqli, u har lahzada ishga tushmaydi." },

        { h2: "Xulosa" },
        { ul: [
          "<code>scroll</code> hodisasi <code>window</code>da yoki skrollanadigan elementda skrolldan <strong>keyin</strong> ishga tushadi.",
          "Uni <code>preventDefault()</code> bilan to'xtatib bo'lmaydi — skrollni oldini olish uchun uni keltirib chiqaruvchi hodisani (<code>keydown</code>, <code>wheel</code>) yoki CSS'ni (<code>overflow: hidden</code>) ishlating.",
          "<code>scroll</code> juda tez-tez ishga tushadi — og'ir hisob-kitobdan saqlaning, throttle yoki <code>requestAnimationFrame</code> qo'llang.",
          "Cheksiz sahifa (infinite scroll) — sahifa oxiriga yaqinlashganda kontent yuklab qo'shish; yuklanish bayrog'i bilan takroriy so'rovlarni oldini oling.",
          "Zamonaviy muqobil — <code>IntersectionObserver</code>, u samaraliroq."
        ] }
      ]
    }

  ]
};
