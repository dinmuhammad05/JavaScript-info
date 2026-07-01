"use strict";

module.exports = {
  part: "2-qism: Brauzer — hujjat, hodisalar, interfeyslar",
  chapter: "Formalar va boshqaruv elementlari",
  lessons: [
    {
      slug: "form-xossalari",
      title: "Forma xossalari va metodlari",
      blurb: "document.forms, form.elements, input/textarea/select/option bilan ishlash: value, checked, selectedIndex va options orqali qiymatlarni o'qish va yozish.",
      body: [
        { lead: "Formalar (<code>&lt;form&gt;</code>) va ular ichidagi boshqaruv elementlari (<code>input</code>, <code>textarea</code>, <code>select</code> va boshqalar) foydalanuvchi bilan ma'lumot almashishning asosiy vositasi. Ular DOM'da o'ziga xos xossa va metodlarga ega bo'lib, ularni oddiy DOM elementlaridan qulayroq topish va boshqarish imkonini beradi. Ushbu darsda formalarga navigatsiya qilishni va boshqaruv elementlari bilan ishlashni chuqur o'rganamiz." },

        { h2: "Formalarga navigatsiya: document.forms" },
        { p: "Formalar hujjatdagi maxsus to'plam — <code>document.forms</code>ning bir qismidir. Bu \"nomlangan to'plam\" (named collection): unga ham tartib raqami, ham forma <code>name</code> atributi orqali murojaat qilish mumkin." },
        { code: "document.forms.my;   // name=\"my\" bo'lgan forma\ndocument.forms[0];   // hujjatdagi birinchi forma" },
        { p: "Formani olganimizdan so'ng, uning ichidagi istalgan elementga <code>form.elements</code> to'plami orqali yetib boramiz:" },
        { code: "&lt;form name=\"my\"&gt;\n  &lt;input name=\"one\" value=\"1\"&gt;\n  &lt;input name=\"two\" value=\"2\"&gt;\n&lt;/form&gt;\n\n&lt;script&gt;\n  // formani olamiz\n  let form = document.forms.my;\n\n  // element olamiz\n  let elem = form.elements.one;\n\n  alert(elem.value); // 1\n&lt;/script&gt;" },
        { p: "Bir nechta element bir xil <code>name</code>ga ega bo'lishi mumkin (masalan, radio tugmalar). Bunday holatda <code>form.elements[name]</code> to'plam (collection) qaytaradi:" },
        { code: "&lt;form&gt;\n  &lt;input type=\"radio\" name=\"age\" value=\"10\"&gt;\n  &lt;input type=\"radio\" name=\"age\" value=\"20\"&gt;\n&lt;/form&gt;\n\n&lt;script&gt;\n  let form = document.forms[0];\n\n  let ageElems = form.elements.age;\n\n  alert(ageElems[0]); // [object HTMLInputElement]\n&lt;/script&gt;" },
        { note: "Bu navigatsiya xossalari HTML tuzilmasining chuqurligiga bog'liq emas. Element nechanchi darajada joylashganidan qat'i nazar, <code>form.elements</code> orqali barcha boshqaruv elementlari to'g'ridan-to'g'ri mavjud bo'ladi." },

        { h2: "Fieldset \"kichik forma\" sifatida" },
        { p: "Forma ichida bir yoki bir nechta <code>&lt;fieldset&gt;</code> elementi bo'lishi mumkin. Ular ham <code>elements</code> xossasiga ega bo'lib, o'z ichidagi boshqaruv elementlarini saqlaydi:" },
        { code: "&lt;form id=\"form\"&gt;\n  &lt;fieldset name=\"userFields\"&gt;\n    &lt;legend&gt;info&lt;/legend&gt;\n    &lt;input name=\"login\" type=\"text\"&gt;\n  &lt;/fieldset&gt;\n&lt;/form&gt;\n\n&lt;script&gt;\n  alert(form.elements.login); // input orqali\n\n  let fieldset = form.elements.userFields;\n  alert(fieldset); // HTMLFieldSetElement\n\n  // login ni ham forma orqali, ham fieldset orqali olsak bo'ladi\n  alert(fieldset.elements.login === form.elements.login); // true\n&lt;/script&gt;" },

        { h2: "Qisqa yozuv: form.name" },
        { p: "Uzun <code>form.elements.login</code> o'rniga qisqaroq <code>form.login</code> yozuvi ham ishlaydi — forma o'zi ham o'z elementlariga nom orqali kirishga imkon beradi:" },
        { code: "&lt;form id=\"form\"&gt;\n  &lt;input name=\"login\"&gt;\n&lt;/form&gt;\n\n&lt;script&gt;\n  // ikkalasi bir xil elementga ishora qiladi\n  alert(form.elements.login == form.login); // true\n\n  form.login.name = 'username'; // name ni o'zgartiramiz\n\n  // form.login endi ishlamaydi, chunki name o'zgardi!\n  alert(form.elements.username); // input\n  alert(form.login); // undefined\n&lt;/script&gt;" },
        { warn: "Qisqa yozuv (<code>form.login</code>) qulay, lekin bitta \"nozik\" kamchiligi bor: elementning <code>name</code>ini kodda o'zgartirsak, u eski nom orqali darhol topilmay qoladi. Bu odatiy holat, lekin nomni dinamik o'zgartirganda esda tutish kerak. Aksincha, <code>form.elements</code> to'plami esa o'zgargan yangi nomni to'g'ri qaytaradi." },

        { h2: "Orqaga havola: element.form" },
        { p: "Har bir forma elementi o'zi tegishli bo'lgan formaga <code>element.form</code> xossasi orqali murojaat qila oladi. Ya'ni forma o'z elementlariga ishora qiladi, elementlar esa formaga qaytadan ishora qiladi:" },
        { code: "&lt;form id=\"form\"&gt;\n  &lt;input type=\"text\" name=\"login\"&gt;\n&lt;/form&gt;\n\n&lt;script&gt;\n  // form -> element\n  let login = form.login;\n\n  // element -> form\n  alert(login.form); // HTMLFormElement\n&lt;/script&gt;" },
        { tip: "<code>element.form</code> hodisa ishlovchilarida juda qulay: masalan, tugma bosilganda uning <code>event.target.form</code> orqali qaysi formaga tegishli ekanligini darhol bilib olish mumkin — DOM bo'ylab qidirish shart emas." },

        { h2: "Elementlar bilan ishlash: input va textarea" },
        { p: "Matnli input va <code>textarea</code>ning qiymatiga <code>input.value</code> (string) orqali kiramiz yoki checkbox/radio uchun <code>input.checked</code> (boolean) orqali:" },
        { code: "input.value = 'Yangi qiymat';\ntextarea.value = 'Yangi matn';\n\ninput.checked = true; // checkbox yoki radio uchun" },
        { warn: "<code>textarea</code>ning qiymatini o'qish uchun har doim <code>textarea.value</code>dan foydalaning, <code>textarea.innerHTML</code>dan emas! <code>innerHTML</code> faqat sahifa dastlab yuklangandagi HTML'ni saqlaydi va foydalanuvchi kiritgan yangi matnni <em>aks ettirmaydi</em>." },

        { h2: "select va option bilan ishlash" },
        { p: "<code>&lt;select&gt;</code> elementi (ochiladigan ro'yxat) uch muhim xossaga ega:" },
        { ul: [
          "<code>select.options</code> — <code>&lt;option&gt;</code> elementlari to'plami;",
          "<code>select.value</code> — hozir tanlangan <code>&lt;option&gt;</code>ning qiymati (value);",
          "<code>select.selectedIndex</code> — hozir tanlangan <code>&lt;option&gt;</code>ning tartib raqami."
        ] },
        { p: "Ular <code>&lt;select&gt;</code> uchun qiymat belgilashning uch xil usulini beradi:" },
        { ol: [
          "Kerakli <code>&lt;option&gt;</code>ning tartib raqamini toping va <code>select.selectedIndex</code>ga bering;",
          "Kerakli qiymatni <code>select.value</code>ga to'g'ridan-to'g'ri bering;",
          "Kerakli <code>&lt;option&gt;</code>ning <code>option.selected</code> xossasiga <code>true</code> bering."
        ] },
        { code: "&lt;select id=\"select\"&gt;\n  &lt;option value=\"apple\"&gt;Olma&lt;/option&gt;\n  &lt;option value=\"pear\"&gt;Nok&lt;/option&gt;\n  &lt;option value=\"banana\"&gt;Banan&lt;/option&gt;\n&lt;/select&gt;\n\n&lt;script&gt;\n  // uch usul ham \"Nok\" ni tanlaydi:\n  select.selectedIndex = 1;\n  select.value = 'pear';\n  select.options[1].selected = true;\n&lt;/script&gt;" },
        { p: "Boshqa boshqaruv elementlaridan farqli, <code>&lt;select&gt;</code> <code>multiple</code> atributi bilan bir nechta qiymatni tanlashga ruxsat beradi (garchi kamdan-kam ishlatilsa ham). Bu holatda tanlangan qiymatlarni olish uchun <code>option.selected</code>ni tekshirib chiqish kerak:" },
        { code: "&lt;select id=\"select\" multiple&gt;\n  &lt;option value=\"blues\" selected&gt;Blyuz&lt;/option&gt;\n  &lt;option value=\"rock\" selected&gt;Rok&lt;/option&gt;\n  &lt;option value=\"classic\"&gt;Klassik&lt;/option&gt;\n&lt;/select&gt;\n\n&lt;script&gt;\n  // barcha tanlangan qiymatlarni yig'amiz\n  let selected = Array.from(select.options)\n    .filter(option =&gt; option.selected)\n    .map(option =&gt; option.value);\n\n  alert(selected); // blues,rock\n&lt;/script&gt;" },

        { h2: "new Option" },
        { p: "<code>&lt;option&gt;</code> elementlarini dinamik yaratish uchun qisqa maxsus sintaksis mavjud — <code>new Option</code> konstruktori:" },
        { code: "let option = new Option(text, value, defaultSelected, selected);" },
        { ul: [
          "<code>text</code> — <code>&lt;option&gt;</code> ichidagi ko'rinadigan matn;",
          "<code>value</code> — <code>&lt;option&gt;</code>ning qiymati;",
          "<code>defaultSelected</code> — <code>true</code> bo'lsa, <code>selected</code> HTML-atributi qo'yiladi;",
          "<code>selected</code> — <code>true</code> bo'lsa, <code>&lt;option&gt;</code> tanlanadi."
        ] },
        { code: "// oddiy holat: matn va value bilan\nlet option = new Option('Matn', 'value');\n\n// tanlangan holatda\nlet option2 = new Option('Matn', 'value', true, true);\n\n// keyin uni select ichiga qo'shamiz\nselect.append(option);" },
        { note: "<code>&lt;option&gt;</code> elementlari yana bir necha foydali xossaga ega: <code>option.selected</code> (tanlanganmi?), <code>option.index</code> (ro'yxatdagi raqami), <code>option.text</code> (ko'rinadigan matni)." },

        { h2: "Xulosa" },
        { ul: [
          "Formalarga navigatsiya: <code>document.forms</code> — barcha formalar; <code>form.elements</code> — forma ichidagi elementlar; <code>fieldset.elements</code> — kichik guruh elementlari;",
          "Qisqa yozuv <code>form.name</code> ishlaydi, lekin element <code>name</code>i o'zgarsa eski nom orqali topilmay qoladi;",
          "Orqaga havola <code>element.form</code> — element o'z formasiga ishora qiladi;",
          "Matnli input/textarea qiymati — <code>value</code> (har doim <code>value</code>, <code>innerHTML</code> emas!); checkbox/radio holati — <code>checked</code>;",
          "<code>&lt;select&gt;</code> uchun uch usul: <code>selectedIndex</code>, <code>value</code>, yoki <code>option.selected</code>; <code>options</code> — barcha optionlar to'plami;",
          "Yangi <code>&lt;option&gt;</code>ni <code>new Option(text, value, defaultSelected, selected)</code> bilan tez yaratish mumkin."
        ] }
      ]
    },
    {
      slug: "focus-blur",
      title: "Fokuslash: focus/blur",
      blurb: "focus()/blur() metodlari, focus/blur hodisalari, tabindex bilan fokusni boshqarish, focusin/focusout orqali delegatsiya va validatsiya misoli.",
      body: [
        { lead: "Element foydalanuvchi u bilan ishlashga tayyorlanganda \"fokus\" oladi — masalan, matn kiritish maydoniga bosilganda. Fokuslash va uni yo'qotish (\"blur\") ma'lumot kiritilib bo'lgan payni belgilash, tekshirishlarni ishga tushirish yoki interfeys holatini o'zgartirish uchun ishlatiladi. Ushbu darsda fokus bilan bog'liq metodlar, hodisalar va delegatsiyani chuqur o'rganamiz." },

        { h2: "focus/blur hodisalari" },
        { p: "<code>focus</code> hodisasi element fokus olganda, <code>blur</code> hodisasi esa uni yo'qotganda (masalan, foydalanuvchi boshqa joyga bosganda) ishga tushadi. Ular yordamida qiymatni tekshirish yoki interfeysni o'zgartirish mumkin. Masalan, email maydonini fokus yo'qolganda tekshiramiz:" },
        { code: "&lt;style&gt;\n  .invalid { border-color: red; }\n  #error { color: red }\n&lt;/style&gt;\n\nEmail: &lt;input type=\"email\" id=\"input\"&gt;\n&lt;div id=\"error\"&gt;&lt;/div&gt;\n\n&lt;script&gt;\n  input.onblur = function() {\n    // manzil noto'g'ri bo'lsa xatolikni ko'rsatamiz\n    if (!input.value.includes('@')) {\n      input.classList.add('invalid');\n      error.innerHTML = 'Iltimos, to'g'ri email kiriting.';\n    }\n  };\n\n  input.onfocus = function() {\n    // foydalanuvchi qayta kiritmoqchi bo'lsa, xatolikni o'chiramiz\n    if (this.classList.contains('invalid')) {\n      this.classList.remove('invalid');\n      error.innerHTML = '';\n    }\n  };\n&lt;/script&gt;" },
        { p: "Bu yerda <code>onblur</code> foydalanuvchi maydonni tark etganda qiymatni tekshiradi, <code>onfocus</code> esa u qaytib kelganda avvalgi xatolik belgisini olib tashlaydi." },

        { h2: "focus/blur metodlari" },
        { p: "<code>elem.focus()</code> va <code>elem.blur()</code> metodlari elementga fokusni dasturiy ravishda berish yoki undan olib qo'yish imkonini beradi. Masalan, qiymat noto'g'ri bo'lsa, foydalanuvchini maydondan chiqarmaymiz — fokusni qaytaramiz:" },
        { code: "Email: &lt;input type=\"email\" id=\"input\"&gt;\n&lt;input type=\"text\" style=\"width:220px\" placeholder=\"noto'g'ri kiriting, keyin bu yerga o'ting\"&gt;\n\n&lt;script&gt;\n  input.onblur = function() {\n    if (!this.value.includes('@')) {\n      // xatolikni ko'rsatamiz\n      this.classList.add('error');\n      // ...va fokusni qaytaramiz\n      input.focus();\n    } else {\n      this.classList.remove('error');\n    }\n  };\n&lt;/script&gt;" },
        { warn: "Fokusni bunday \"majburiy ushlab qolish\" (foydalanuvchini maydondan chiqarmaslik) UX nuqtai nazaridan yomon amaliyot hisoblanadi. Foydalanuvchi keyinroq to'g'rilashni xohlashi mumkin. Xatolikni ko'rsatish yaxshiroq, lekin foydalanuvchini majburan ushlab turmaslik kerak. Bundan tashqari, JavaScript sabab bo'lgan <code>focus()</code> chaqiruvi ba'zi brauzerlarda <code>blur</code> hodisasi ichida ishlamasligi ham mumkin." },
        { note: "Ko'p hodisalar odatda JavaScriptdan <code>focus()</code>/<code>blur()</code> chaqirilganda ham ishga tushadi. Lekin qiziq holat bor: agar <code>onblur</code> ishlovchisi ichida yana <code>focus()</code> chaqirsangiz, brauzer ba'zan uni e'tiborsiz qoldirishi mumkin." },

        { h2: "Istalgan elementga fokus: tabindex" },
        { p: "Standart holatda ko'p elementlar fokus qabul qilmaydi. Fokus qabul qiladigan elementlar — foydalanuvchi ular bilan ishlashi mumkin bo'lganlar: <code>&lt;input&gt;</code>, <code>&lt;button&gt;</code>, <code>&lt;a href&gt;</code> va boshqalar. Aksincha, <code>&lt;div&gt;</code>, <code>&lt;span&gt;</code>, <code>&lt;table&gt;</code> kabi elementlar standart holatda fokuslanmaydi — ular uchun <code>elem.focus()</code> ishlamaydi va <code>focus</code>/<code>blur</code> hodisalari yuz bermaydi." },
        { p: "Buni <code>tabindex</code> HTML-atributi o'zgartiradi. <code>tabindex</code> qiymatiga ega istalgan element fokuslanadigan bo'ladi. Bundan tashqari, atribut qiymati foydalanuvchi <kbd>Tab</kbd> bosganda o'tish tartibini ham belgilaydi:" },
        { ul: [
          "<code>tabindex=\"1\"</code>, <code>\"2\"</code> va h.k. — bunday elementlar birinchi bo'lib, o'z raqamlari tartibida fokuslanadi (avval 1, keyin 2, ...);",
          "<code>tabindex=\"0\"</code> — element odatiy elementlar bilan bir qatorda, hujjatdagi tartibda fokuslanadi. Bu eng ko'p ishlatiladigan qiymat;",
          "<code>tabindex=\"-1\"</code> — element <kbd>Tab</kbd> orqali fokuslanmaydi, lekin dasturiy <code>focus()</code> orqali fokuslanishi mumkin."
        ] },
        { code: "&lt;ul&gt;\n  &lt;li tabindex=\"1\"&gt;Bir&lt;/li&gt;\n  &lt;li tabindex=\"0\"&gt;Nol&lt;/li&gt;\n  &lt;li tabindex=\"2\"&gt;Ikki&lt;/li&gt;\n  &lt;li tabindex=\"-1\"&gt;Minus bir&lt;/li&gt;\n&lt;/ul&gt;\n\n&lt;!-- Tab bosish tartibi: 1 -&gt; 2 -&gt; 0 (va boshqa odatiy elementlar) --&gt;\n&lt;!-- \"Minus bir\" Tab bilan olinmaydi, lekin focus() bilan olinadi --&gt;" },
        { tip: "Amalda <code>tabindex=\"0\"</code> eng foydali qiymatdir: u elementni fokuslanadigan qiladi, lekin tabiiy o'tish tartibini buzmaydi. JavaScriptda ham xuddi shunday: <code>elem.tabIndex = 0</code> yozish mumkin." },

        { h2: "Delegatsiya: focusin/focusout" },
        { p: "<code>focus</code> va <code>blur</code> hodisalarining muhim xususiyati bor: ular <strong>ko'tarilmaydi (bubble)</strong>. Ya'ni ular ota-elementga tarqalmaydi. Bu delegatsiyani qiyinlashtiradi — masalan, butun forma uchun bitta ishlovchi qo'yib, ichidagi maydonlarni kuzatib bo'lmaydi:" },
        { code: "&lt;form onfocus=\"this.className='focused'\"&gt;\n  &lt;input type=\"text\" name=\"name\" value=\"Ismingiz\"&gt;\n  &lt;input type=\"text\" name=\"surname\" value=\"Familiyangiz\"&gt;\n&lt;/form&gt;\n\n&lt;!-- Bu ISHLAMAYDI, chunki input fokuslansa,\n     focus hodisasi form'ga ko'tarilmaydi --&gt;" },
        { p: "Buni ikki yo'l bilan hal qilish mumkin." },
        { p: "<strong>Birinchi yo'l</strong> — <code>focus</code>/<code>blur</code> ko'tarilmasa ham, ular <em>tutish fazasida</em> (capturing phase) yuqoridan pastga o'tadi. Shuning uchun <code>addEventListener</code>ni uchinchi argumenti <code>true</code> bilan (capturing) ishlatamiz:" },
        { code: "&lt;form id=\"form\"&gt;\n  &lt;input type=\"text\" name=\"name\" value=\"Ismingiz\"&gt;\n  &lt;input type=\"text\" name=\"surname\" value=\"Familiyangiz\"&gt;\n&lt;/form&gt;\n\n&lt;script&gt;\n  // capturing fazasida ushlaymiz (uchinchi argument true)\n  form.addEventListener('focus', () =&gt; form.classList.add('focused'), true);\n  form.addEventListener('blur', () =&gt; form.classList.remove('focused'), true);\n&lt;/script&gt;" },
        { p: "<strong>Ikkinchi yo'l</strong> — <code>focusin</code> va <code>focusout</code> hodisalaridan foydalanish. Ular <code>focus</code>/<code>blur</code> bilan aynan bir xil, lekin farqi shundaki, ular <strong>ko'tariladi (bubble)</strong>:" },
        { code: "&lt;form id=\"form\"&gt;\n  &lt;input type=\"text\" name=\"name\" value=\"Ismingiz\"&gt;\n  &lt;input type=\"text\" name=\"surname\" value=\"Familiyangiz\"&gt;\n&lt;/form&gt;\n\n&lt;script&gt;\n  // focusin/focusout ko'tariladi, shuning uchun oddiy delegatsiya\n  form.addEventListener('focusin', () =&gt; form.classList.add('focused'));\n  form.addEventListener('focusout', () =&gt; form.classList.remove('focused'));\n&lt;/script&gt;" },
        { warn: "Muhim jihat: <code>focusin</code>/<code>focusout</code>ni faqat <code>addEventListener</code> orqali ulash kerak, <code>on&lt;event&gt;</code> xossasi (masalan, <code>elem.onfocusin</code>) orqali emas — bu ishlamaydi. Aksincha, <code>focus</code>/<code>blur</code>ni capturing orqali ushlash ham, <code>focusin</code>/<code>focusout</code>ni ishlatish ham to'g'ri yechim." },

        { h2: "Validatsiya misoli" },
        { p: "Fokus hodisalarining amaliy qo'llanilishi — forma maydonlarini foydalanuvchi ular bilan ishlab bo'lgach tekshirish. Delegatsiya orqali butun forma uchun bir joyda validatsiya yozamiz:" },
        { code: "&lt;form id=\"form\"&gt;\n  Login: &lt;input name=\"login\"&gt;\n  Parol: &lt;input name=\"password\" type=\"password\"&gt;\n&lt;/form&gt;\n\n&lt;script&gt;\n  // focusout ko'tarilgani uchun formada bitta ishlovchi bilan\n  // har qanday maydonni tekshira olamiz\n  form.addEventListener('focusout', function(event) {\n    let input = event.target;\n\n    if (input.value.trim() === '') {\n      input.style.borderColor = 'red';\n    } else {\n      input.style.borderColor = '';\n    }\n  });\n&lt;/script&gt;" },
        { p: "Bu yerda <code>event.target</code> — fokusni yo'qotgan aynan o'sha maydon. Bitta ishlovchi barcha maydonlar uchun ishlaydi — bu delegatsiyaning kuchi." },

        { h2: "Xulosa" },
        { ul: [
          "<code>focus</code> hodisasi element fokus olganda, <code>blur</code> — uni yo'qotganda ishga tushadi;",
          "<code>elem.focus()</code> va <code>elem.blur()</code> metodlari fokusni dasturiy boshqaradi;",
          "Standart holatda faqat interaktiv elementlar (<code>input</code>, <code>button</code>, <code>a href</code>) fokuslanadi. Boshqalarga <code>tabindex</code> qo'yish orqali fokus berish mumkin;",
          "<code>tabindex=\"0\"</code> — tabiiy tartibda fokuslash, <code>tabindex=\"-1\"</code> — faqat dasturiy fokus;",
          "<code>focus</code>/<code>blur</code> <strong>ko'tarilmaydi</strong>. Delegatsiya uchun capturing (<code>addEventListener</code>, uchinchi argument <code>true</code>) yoki ko'tariladigan <code>focusin</code>/<code>focusout</code> hodisalaridan foydalaning;",
          "<code>focusin</code>/<code>focusout</code>ni faqat <code>addEventListener</code> orqali ulash mumkin."
        ] }
      ]
    },
    {
      slug: "form-hodisalari",
      title: "Hodisalar: change, input, cut, copy, paste",
      blurb: "change va input hodisalarining farqi, matn kiritishni kuzatish, cut/copy/paste va ClipboardEvent bilan almashish buferini boshqarish.",
      body: [
        { lead: "Ma'lumot o'zgarishi va almashish buferi (clipboard) bilan bog'liq hodisalar formalar bilan ishlashda muhim o'rin tutadi. <code>change</code> va <code>input</code> qiymat o'zgarishini kuzatsa, <code>cut</code>/<code>copy</code>/<code>paste</code> nusxalash-joylashtirish amallarini boshqaradi. Ushbu darsda ularni chuqur ko'rib chiqamiz." },

        { h2: "change hodisasi" },
        { p: "<code>change</code> hodisasi element o'zgartirilib bo'lgach ishga tushadi. Matnli maydonlar uchun bu element fokusni <em>yo'qotganda</em> yuz beradi — ya'ni har bir belgi kiritilganda emas, balki foydalanuvchi kiritishni tugatib, boshqa joyga o'tganda:" },
        { code: "&lt;input type=\"text\" onchange=\"alert(this.value)\"&gt;\n&lt;input type=\"button\" value=\"Tugma\"&gt;\n\n&lt;!-- input'ga matn yozib, tugmaga bossangiz,\n     alert kiritilgan qiymatni ko'rsatadi --&gt;" },
        { p: "<code>select</code>, <code>input type=checkbox</code> va <code>input type=radio</code> uchun esa <code>change</code> tanlov o'zgarishi bilan darhol ishga tushadi — fokus yo'qolishini kutmaydi:" },
        { code: "&lt;select onchange=\"alert(this.value)\"&gt;\n  &lt;option value=\"\"&gt;Tanlang&lt;/option&gt;\n  &lt;option value=\"1\"&gt;Bir&lt;/option&gt;\n  &lt;option value=\"2\"&gt;Ikki&lt;/option&gt;\n&lt;/select&gt;" },

        { h2: "input hodisasi" },
        { p: "<code>input</code> hodisasi qiymat har qanday yo'l bilan o'zgargan har safar ishga tushadi. <code>change</code>dan farqli, u foydalanuvchi klaviaturadan belgi kiritganda ham, sichqoncha bilan matn joylashtirganda ham, ovoz orqali kiritganda ham darhol yuz beradi:" },
        { code: "&lt;input type=\"text\" id=\"input\"&gt;\nO'zgardi: &lt;span id=\"result\"&gt;&lt;/span&gt;\n\n&lt;script&gt;\n  input.oninput = function() {\n    result.innerHTML = input.value;\n  };\n&lt;/script&gt;" },
        { note: "Agar biz foydalanuvchi kiritayotgan matnni <strong>real vaqtda</strong> kuzatmoqchi bo'lsak, aynan <code>input</code> — eng to'g'ri tanlov. U foydalanuvchi kiritishni tugatishini kutmaydi." },
        { warn: "<code>input</code> hodisasi ichida <code>event.preventDefault()</code> ishlamaydi — chunki hodisa qiymat <em>allaqachon o'zgargandan keyin</em> yuz beradi. Kiritishni oldindan to'sish uchun <code>keydown</code> yoki <code>beforeinput</code> kabi boshqa hodisalar kerak bo'ladi." },

        { h2: "change va input: solishtirma" },
        { ul: [
          "<code>input</code> — har bir o'zgarishda (belgi yozilganda, matn joylashtirilganda) <strong>darhol</strong> ishga tushadi. Real vaqtda kuzatish uchun ideal;",
          "<code>change</code> — matnli maydonlarda fokus yo'qolganda, tanlov elementlarida (select, checkbox, radio) esa tanlov o'zgarishi bilan ishga tushadi. \"Yakuniy\" qiymatni olish uchun qulay."
        ] },
        { tip: "Ko'p hollarda tirik (real-time) reaksiya kerak bo'lsa — <code>input</code>, faqat foydalanuvchi kiritishni yakunlagach ish qilmoqchi bo'lsangiz (masalan, server so'rovi) — <code>change</code> yoki <code>input</code> + kechiktirish (debounce) ishlatiladi." },

        { h2: "cut, copy, paste hodisalari" },
        { p: "Bu hodisalar mos ravishda ma'lumotni kesish, nusxalash va joylashtirish (cut/copy/paste) amallarida yuz beradi. Ular <code>ClipboardEvent</code> sinfiga tegishli bo'lib, <code>event.clipboardData</code> xossasi orqali almashish buferi ma'lumotiga kirish imkonini beradi." },
        { p: "Ushbu amallarni <code>event.preventDefault()</code> bilan <strong>to'sib qo'yish</strong> ham mumkin. Masalan, matn nusxalash yoki joylashtirishni butunlay taqiqlaymiz:" },
        { code: "&lt;input type=\"text\" id=\"input\"&gt;\n\n&lt;script&gt;\n  input.onpaste = function(event) {\n    alert('joylashtirilmoqda: ' + event.clipboardData.getData('text/plain'));\n    event.preventDefault(); // joylashtirishni to'saylik\n  };\n\n  input.oncut = input.oncopy = function(event) {\n    alert(event.type + ' - ' + document.getSelection());\n    event.preventDefault(); // amalni to'saylik\n  };\n&lt;/script&gt;" },
        { p: "E'tibor bering: <code>cut</code>/<code>copy</code>da nusxalanayotgan matnni <code>document.getSelection()</code> orqali, <code>paste</code>da esa joylashtirilayotgan matnni <code>event.clipboardData.getData('text/plain')</code> orqali olamiz." },

        { h2: "ClipboardData: nafaqat matn" },
        { p: "<code>event.clipboardData</code> orqali biz nafaqat matn, balki boshqa formatdagi ma'lumotlarni ham o'qish/yozishimiz mumkin. Almashish buferi bir vaqtning o'zida turli formatlarda ma'lumot saqlashi mumkin:" },
        { code: "// matnni olish\nlet text = event.clipboardData.getData('text/plain');\n\n// buferga yozish (masalan, copy hodisasida)\nevent.clipboardData.setData('text/plain', 'Maxsus matn');\nevent.preventDefault(); // brauzerning odatiy nusxalashini to'saylik" },
        { warn: "Xavfsizlik sabablari tufayli almashish buferiga kirish cheklangan. <code>event.clipboardData</code> faqat <code>cut</code>/<code>copy</code>/<code>paste</code> hodisalari ishlovchisi ichida ishlaydi. Bu hodisalardan tashqarida (masalan, oddiy <code>setTimeout</code> ichida) buferga to'g'ridan-to'g'ri kirib bo'lmaydi. Umumiy dasturiy buferga kirish uchun esa alohida <code>navigator.clipboard</code> API'si mavjud." },
        { note: "<code>navigator.clipboard</code> — buferga kirishning zamonaviy asinxron API'si (masalan, <code>navigator.clipboard.writeText('matn')</code>). Lekin u xavfsizlik cheklovlariga ega: HTTPS talab qiladi va ko'pincha foydalanuvchi ruxsatini so'raydi." },

        { h2: "Xavfsizlik cheklovlari" },
        { p: "Almashish buferi — tizim darajasidagi (system-wide) resurs. Foydalanuvchi bir ilovada nusxalab, boshqasida joylashtirishi mumkin. Shuning uchun brauzerlar unga kirishni jiddiy cheklaydi:" },
        { ul: [
          "<code>clipboardData</code> faqat <code>cut</code>/<code>copy</code>/<code>paste</code> hodisalarida mavjud;",
          "Buferni foydalanuvchi harakatisiz (masalan, sahifa yuklanganda avtomatik) o'qib yoki o'zgartirib bo'lmaydi;",
          "Zamonaviy <code>navigator.clipboard</code> API ruxsat va HTTPS talab qiladi."
        ] },

        { h2: "Xulosa" },
        { ul: [
          "<code>change</code> — o'zgarish yakunlangach ishga tushadi: matnli maydonlarda fokus yo'qolganda, tanlov elementlarida darhol;",
          "<code>input</code> — qiymat o'zgargan har safar darhol ishga tushadi. Real vaqtda kuzatish uchun ideal, lekin unda <code>preventDefault()</code> ishlamaydi;",
          "<code>cut</code>/<code>copy</code>/<code>paste</code> — almashish buferi amallari hodisalari. <code>ClipboardEvent</code> sinfiga tegishli;",
          "<code>event.clipboardData</code> orqali buferga kirish mumkin, lekin faqat shu hodisalar ichida va xavfsizlik cheklovlari bilan;",
          "Bu amallarni <code>event.preventDefault()</code> bilan to'sib qo'yish mumkin;",
          "Umumiy dasturiy kirish uchun zamonaviy <code>navigator.clipboard</code> API ishlatiladi."
        ] }
      ]
    },
    {
      slug: "form-submit",
      title: "Forma yuborish: submit hodisasi va metod",
      blurb: "submit hodisasi, Enter bilan yuborish, form.submit() metodi, yuborishdan oldingi validatsiya va preventDefault bilan oldini olish.",
      body: [
        { lead: "Forma yuborilganda (submit) <code>submit</code> hodisasi ishga tushadi. Odatda u ma'lumot serverga jo'natilishidan oldin uni tekshirish (validatsiya) yoki yuborishni to'xtatib, ma'lumotni JavaScript orqali qayta ishlash uchun ishlatiladi. Ushbu darsda forma yuborishning barcha jihatlarini chuqur o'rganamiz." },

        { h2: "submit hodisasi" },
        { p: "Forma yuborishning ikki asosiy usuli bor:" },
        { ol: [
          "<code>&lt;input type=\"submit\"&gt;</code> yoki <code>&lt;input type=\"image\"&gt;</code> tugmasini bosish;",
          "Matn maydonida <kbd>Enter</kbd> tugmasini bosish."
        ] },
        { p: "Ikkala usul ham formada <code>submit</code> hodisasini keltirib chiqaradi. Ishlovchi ma'lumotni tekshirishi va agar xatolik bo'lsa, <code>event.preventDefault()</code> bilan yuborishni to'xtatishi mumkin:" },
        { code: "&lt;form onsubmit=\"alert('yuborildi!'); return false\"&gt;\n  Birinchi: &lt;input type=\"text\" name=\"one\"&gt;\n  &lt;input type=\"submit\" value=\"Yuborish\"&gt;\n&lt;/form&gt;\n\n&lt;!-- Enter yoki tugma bosilsa, alert chiqadi.\n     return false yuborishni to'xtatadi (sahifa yangilanmaydi) --&gt;" },
        { note: "<code>on&lt;event&gt;</code> ichida <code>return false</code> yozish — <code>event.preventDefault()</code>ning eski, lekin haligacha ishlaydigan muqobili. Zamonaviy koddagi ravshanlik uchun <code>event.preventDefault()</code>ni afzal ko'ring." },

        { h2: "Enter bilan yuborish" },
        { p: "Matn maydonida <kbd>Enter</kbd> bosilishi ham formani yuboradi (agar bir nechta matn maydoni bo'lsa). Bu foydalanuvchilarga tanish qulaylik: qidiruv maydoniga yozib, <kbd>Enter</kbd> bosish odatiy holat." },
        { p: "Qiziq nozik jihat: <kbd>Enter</kbd> bosilganda avval yuboruvchi tugmada <code>click</code> hodisasi generatsiya qilinadi — hatto foydalanuvchi tugmani bosmagan bo'lsa ham. Ya'ni brauzer tugma bosilgandek imitatsiya qiladi:" },
        { code: "&lt;form&gt;\n  Matn: &lt;input type=\"text\" name=\"text\"&gt;\n  &lt;input type=\"submit\" value=\"Yuborish\" onclick=\"alert('click hodisasi ishladi!')\"&gt;\n&lt;/form&gt;\n\n&lt;!-- Matn maydonida Enter bossangiz, tugmaning\n     onclick ishlovchisi ham ishga tushadi --&gt;" },

        { h2: "submit va click bog'liqligi" },
        { p: "Formani dasturiy yuborish uchun tugmada <code>button.click()</code> yoki <code>button.dispatchEvent(...)</code>ni chaqirsak, forma yuboriladi. Chunki <code>click</code> tugmada <code>submit</code>ni keltirib chiqaradi:" },
        { code: "let form = document.getElementById('form');\n\n// form.dispatchEvent orqali submit generatsiya qilish\nlet event = new Event('submit', { bubbles: true, cancelable: true });\nform.dispatchEvent(event);" },
        { note: "<code>button</code> yoki <code>input type=submit</code> ustida <code>click()</code> chaqirilsa, forma tabiiy yo'l bilan (submit hodisasi bilan) yuboriladi. Bu tabiiy imkoniyat: interfeys elementini bosishni imitatsiya qilish." },

        { h2: "form.submit() metodi" },
        { p: "Formani dasturiy yuborishning to'g'ridan-to'g'ri yo'li — <code>form.submit()</code> metodi. Uni chaqirganda ma'lumot serverga jo'natiladi:" },
        { code: "let form = document.createElement('form');\nform.action = 'https://example.com/search';\nform.method = 'GET';\n\nform.innerHTML = '&lt;input name=\"q\" value=\"salom\"&gt;';\n\n// forma DOM'da bo'lishi kerak\ndocument.body.append(form);\n\nform.submit();" },
        { warn: "Muhim va ko'pincha unutiladigan jihat: <code>form.submit()</code> metodi chaqirilganda <strong>submit hodisasi generatsiya qilinmaydi</strong>! Ya'ni <code>onsubmit</code> ishlovchisi ishga tushmaydi. Buning mantiqi shuki, dasturchi <code>form.submit()</code>ni ataylab chaqirgan, demak barcha kerakli tekshiruvlarni allaqachon o'zi bajargan deb hisoblanadi. Agar validatsiya kerak bo'lsa, uni <code>submit()</code>ni chaqirishdan oldin qo'lda bajaring." },

        { h2: "Yuborishdan oldin validatsiya" },
        { p: "Amaliyotda <code>submit</code> hodisasi eng ko'p validatsiya uchun ishlatiladi. Agar ma'lumot noto'g'ri bo'lsa, <code>event.preventDefault()</code> bilan yuborishni to'xtatib, foydalanuvchiga xatolikni ko'rsatamiz:" },
        { code: "&lt;form id=\"form\"&gt;\n  Email: &lt;input type=\"text\" name=\"email\" id=\"email\"&gt;\n  &lt;div id=\"error\" style=\"color:red\"&gt;&lt;/div&gt;\n  &lt;input type=\"submit\" value=\"Yuborish\"&gt;\n&lt;/form&gt;\n\n&lt;script&gt;\n  form.onsubmit = function(event) {\n    let email = form.email.value;\n\n    if (!email.includes('@')) {\n      // xatolik: yuborishni to'xtatamiz\n      event.preventDefault();\n      error.innerHTML = 'Iltimos, to'g'ri email kiriting.';\n      return;\n    }\n\n    // hammasi joyida bo'lsa, forma yuboriladi\n    error.innerHTML = '';\n  };\n&lt;/script&gt;" },
        { p: "Bu yerda <code>event.preventDefault()</code> brauzerning odatiy harakatini — formani serverga yuborib, sahifani yangilashni — to'xtatadi. Xatolik tuzatilib, qaytadan yuborilganda esa forma normal jo'natiladi." },

        { h2: "AJAX bilan yuborish" },
        { p: "Ko'p zamonaviy ilovalarda forma umuman odatiy yo'l bilan yuborilmaydi. Aksincha, <code>preventDefault()</code> bilan brauzer yuborishini to'sib, ma'lumot JavaScript orqali (masalan, <code>fetch</code>) jo'natiladi. Bu sahifani yangilamasdan ma'lumot almashish imkonini beradi:" },
        { code: "&lt;form id=\"form\"&gt;\n  &lt;input name=\"login\"&gt;\n  &lt;input type=\"submit\" value=\"Yuborish\"&gt;\n&lt;/form&gt;\n\n&lt;script&gt;\n  form.onsubmit = async function(event) {\n    event.preventDefault(); // odatiy yuborishni to'saylik\n\n    // ma'lumotni to'playmiz va fetch bilan jo'natamiz\n    let data = new FormData(form);\n\n    let response = await fetch('/submit', {\n      method: 'POST',\n      body: data\n    });\n\n    let result = await response.json();\n    alert(result.message);\n  };\n&lt;/script&gt;" },
        { tip: "<code>new FormData(form)</code> — formadagi barcha maydonlarni avtomatik yig'ib beruvchi qulay obyekt. Uni to'g'ridan-to'g'ri <code>fetch</code>ning <code>body</code>siga berish mumkin — brauzer ma'lumotni to'g'ri formatlaydi." },

        { h2: "Xulosa" },
        { ul: [
          "Forma <code>submit</code> hodisasi tugma bosilganda yoki matn maydonida <kbd>Enter</kbd> bosilganda ishga tushadi;",
          "<kbd>Enter</kbd> bosilganda yuboruvchi tugmada <code>click</code> hodisasi ham generatsiya qilinadi;",
          "Yuborishni to'xtatish uchun <code>event.preventDefault()</code> (yoki <code>on&lt;event&gt;</code>da <code>return false</code>) ishlatiladi;",
          "<code>form.submit()</code> metodi formani dasturiy yuboradi, lekin <strong>submit hodisasini generatsiya qilmaydi</strong>;",
          "<code>submit</code> hodisasi ko'pincha validatsiya uchun ishlatiladi — xato bo'lsa <code>preventDefault()</code> bilan to'xtatiladi;",
          "Zamonaviy ilovalarda forma ko'pincha <code>preventDefault()</code> + <code>fetch</code> orqali AJAX bilan yuboriladi; <code>new FormData(form)</code> ma'lumotni qulay yig'adi."
        ] }
      ]
    }
  ]
};
