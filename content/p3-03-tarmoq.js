"use strict";

module.exports = {
  part: "3-qism: Qo'shimcha bo'limlar",
  chapter: "Tarmoq so'rovlari",
  lessons: [
    {
      slug: "fetch",
      title: "Fetch",
      blurb: "Zamonaviy fetch() metodi bilan serverga so'rov yuborish: response.status/ok, javobni o'qish (json/text), async/await va xatoliklarni boshqarish.",
      body: [
        { lead: "JavaScript brauzerdan serverga so'rovlar yuborib, ma'lumot olib kelishi mumkin. Buning zamonaviy usuli — <strong>fetch()</strong> metodi. U sahifani qayta yuklamasdan serverdan ma'lumot olishga imkon beradi (bu yondashuv AJAX deb ataladi). Ushbu darsda <code>fetch</code> qanday ishlashini, javobni qanday o'qishni va xatoliklarni qanday boshqarishni chuqur o'rganamiz." },

        { note: "Muhim: <code>fetch</code>, XMLHttpRequest va WebSocket — bular <strong>brauzer</strong> muhitiga xos (yoki Node.js'da alohida sozlanadigan) asinxron mexanizmlardir. Shu sababli ushbu bobdagi kod misollari asosan <strong>statik</strong> — ularni playground darhol ishga tushirib natija bermaydi, chunki ular haqiqiy tarmoq va brauzer API'lariga bog'liq. Har bir misolni tushunib o'qing." },

        { h2: "fetch(url) sintaksisi" },
        { p: "Eng sodda ko'rinishda <code>fetch</code>ga faqat URL beriladi:" },
        { code: "let promise = fetch(url, [options]);" },
        { ul: [
          "<code>url</code> — so'rov yuboriladigan manzil;",
          "<code>options</code> — ixtiyoriy parametr: metod (GET/POST), sarlavhalar (headers), tana (body) va boshqalar. Berilmasa, oddiy <code>GET</code> so'rovi yuboriladi."
        ] },
        { p: "<code>fetch</code> chaqirilishi bilanoq brauzer tarmoq so'rovini boshlaydi va <strong>promise</strong> qaytaradi. Bu promise ikki bosqichda hal bo'ladi." },

        { h2: "Ikki bosqichli javob" },
        { p: "<code>fetch</code>ning eng muhim xususiyati — javob <strong>ikki bosqichda</strong> keladi." },
        { p: "<strong>Birinchi bosqich:</strong> server sarlavhalar (headers) bilan javob berishi bilanoq, <code>fetch</code> qaytargan promise <code>Response</code> obyekti bilan bajariladi. Bu bosqichda javobning HTTP holatini (status) tekshirishimiz mumkin, ammo tana (body) hali kelib bo'lmagan bo'lishi mumkin." },
        { code: "let response = await fetch(url);\n\nif (response.ok) {\n  // HTTP holati 200-299 oralig'ida bo'lsa\n  let json = await response.json();\n} else {\n  alert('HTTP xatolik: ' + response.status);\n}" },
        { p: "<strong>Ikkinchi bosqich:</strong> javob tanasini (body) olish uchun qo'shimcha metod chaqiramiz. Bu metod ham asinxron va promise qaytaradi, chunki katta hajmdagi ma'lumot tarmoq orqali asta-sekin kelishi mumkin." },
        { note: "Nima uchun ikki bosqich? Chunki sarlavhalar tez keladi, tana esa katta bo'lishi mumkin (masalan, katta rasm yoki fayl). Sarlavhalarni oldindan olib, javob turi va holatini bilgan holda, tanani o'qishni boshlashimiz mumkin." },

        { h2: "Response holati: status va ok" },
        { p: "<code>Response</code> obyektining holatini bildiruvchi ikkita muhim xossasi bor:" },
        { ul: [
          "<code>status</code> — HTTP holat kodi (masalan, <code>200</code>, <code>404</code>, <code>500</code>);",
          "<code>ok</code> — mantiqiy (boolean) qiymat: agar HTTP holati <code>200-299</code> oralig'ida bo'lsa <code>true</code>, aks holda <code>false</code>."
        ] },
        { code: "let response = await fetch('https://example.com/data');\n\nconsole.log(response.status); // masalan, 200\nconsole.log(response.ok);     // true (agar 200-299 bo'lsa)" },
        { warn: "Diqqat: <code>fetch</code> HTTP xatolik holatlarida (masalan, 404 yoki 500) promise'ni <strong>rad etmaydi</strong> (reject qilmaydi)! Server javob bergani — muvaffaqiyat deb hisoblanadi. Promise faqat tarmoq umuman ishlamasa (server topilmasa, internet uzilsa) rad etiladi. Shuning uchun HTTP holatini o'zimiz <code>response.ok</code> orqali tekshirishimiz shart." },

        { h2: "Javob tanasini o'qish metodlari" },
        { p: "<code>Response</code> obyekti tanani turli formatlarda o'qish uchun bir nechta metod taqdim etadi. Har biri promise qaytaradi:" },
        { ul: [
          "<code>response.text()</code> — javobni oddiy matn (string) sifatida o'qiydi;",
          "<code>response.json()</code> — javobni JSON deb tahlil qilib, JavaScript obyektiga aylantiradi;",
          "<code>response.formData()</code> — javobni <code>FormData</code> obyekti sifatida qaytaradi;",
          "<code>response.blob()</code> — javobni binar Blob (masalan, rasm) sifatida;",
          "<code>response.arrayBuffer()</code> — javobni past darajali <code>ArrayBuffer</code> sifatida."
        ] },
        { warn: "Muhim cheklov: tanani <strong>faqat bitta</strong> metod bilan o'qish mumkin. Agar <code>response.text()</code> chaqirsak, keyin <code>response.json()</code> ishlamaydi, chunki tana allaqachon o'qib bo'lingan. Ikkalasi kerak bo'lsa, birini tanlab, kerak bo'lsa qayta ishlang." },

        { h2: "JSON javobni o'qish" },
        { p: "Amalda eng ko'p ishlatiladigan format — JSON. <code>response.json()</code> tanani o'qib, uni JavaScript obyektiga aylantiradi:" },
        { code: "let response = await fetch('https://api.example.com/users/1');\nlet user = await response.json();\n\nconsole.log(user.name);  // obyektning maydonlariga kira olamiz\nconsole.log(user.email);" },
        { p: "Bu yerda ikkita <code>await</code> bor: birinchisi javob sarlavhalarini kutadi, ikkinchisi tanani to'liq o'qib, JSON'ni tahlil qiladi." },

        { h2: "Matnli javobni o'qish" },
        { p: "Agar server oddiy matn qaytarsa (masalan, HTML yoki oddiy qator), <code>response.text()</code>dan foydalanamiz:" },
        { code: "let response = await fetch('https://example.com/hello.txt');\nlet text = await response.text();\n\nconsole.log(text); // faylning matn mazmuni" },

        { h2: ".then() bilan yozish" },
        { p: "<code>fetch</code> promise qaytargani uchun uni <code>.then()</code> zanjiri bilan ham ishlatish mumkin. Quyidagi ikkala usul teng:" },
        { code: "// .then() zanjiri bilan\nfetch('https://api.example.com/data')\n  .then(function (response) {\n    if (!response.ok) {\n      throw new Error('HTTP xatolik: ' + response.status);\n    }\n    return response.json();\n  })\n  .then(function (data) {\n    console.log(data);\n  })\n  .catch(function (error) {\n    console.log('So\\'rov muvaffaqiyatsiz: ' + error.message);\n  });" },
        { tip: "Zamonaviy koda odatda <code>async/await</code> afzal ko'riladi — u tekis va o'qishga oson. <code>.then()</code> esa eski kodda yoki ba'zi maxsus holatlarda uchraydi." },

        { h2: "async/await bilan xatoliklarni boshqarish" },
        { p: "Amaliy koda so'rovni <code>try...catch</code> ichiga o'rab, ikki turdagi xatolikni ham qamrab olamiz: tarmoq xatoligi (fetch reject bo'ladi) va HTTP xatoligi (o'zimiz tekshiramiz)." },
        { code: "async function malumotOl(url) {\n  try {\n    let response = await fetch(url);\n\n    // HTTP holatini tekshiramiz\n    if (!response.ok) {\n      throw new Error('HTTP xatolik! Holat: ' + response.status);\n    }\n\n    let data = await response.json();\n    return data;\n\n  } catch (error) {\n    // Bu yerga ikki holatda tushamiz:\n    // 1) tarmoq ishlamadi (fetch reject bo'ldi)\n    // 2) yuqorida o'zimiz throw qildik (HTTP xatolik)\n    console.log('Xatolik: ' + error.message);\n    throw error; // xatolikni yuqoriga uzatamiz (ixtiyoriy)\n  }\n}\n\n// Foydalanish:\nmalumotOl('https://api.example.com/users')\n  .then(function (users) {\n    console.log('Foydalanuvchilar soni: ' + users.length);\n  })\n  .catch(function () {\n    console.log('Ma\\'lumot olib bo\\'lmadi');\n  });" },
        { note: "Bu shabloni yaxshi eslab qoling: <strong>await fetch → response.ok tekshirish → await response.json()</strong>, hammasini <code>try...catch</code> ichida. Bu real loyihalarda deyarli har doim shunday yoziladi." },

        { h2: "Response sarlavhalari (headers)" },
        { p: "Javob bilan kelgan sarlavhalarni <code>response.headers</code> orqali o'qish mumkin. Bu Map'ga o'xshash maxsus obyekt:" },
        { code: "let response = await fetch(url);\n\n// Bitta sarlavhani olish\nconsole.log(response.headers.get('Content-Type'));\n// masalan: application/json; charset=utf-8\n\n// Barcha sarlavhalarni aylanib chiqish\nfor (let [key, value] of response.headers) {\n  console.log(key + ': ' + value);\n}" },

        { h2: "Xulosa" },
        { ul: [
          "<code>fetch(url, options)</code> tarmoq so'rovini boshlaydi va promise qaytaradi;",
          "Javob <strong>ikki bosqichda</strong> keladi: avval <code>Response</code> (sarlavhalar), keyin tana;",
          "<code>response.status</code> — HTTP kodi, <code>response.ok</code> — 200-299 bo'lsa <code>true</code>;",
          "Tanani o'qish uchun: <code>response.json()</code>, <code>response.text()</code>, <code>response.blob()</code> va boshqalar — har biri promise qaytaradi va faqat <strong>bir marta</strong> chaqirilishi mumkin;",
          "<code>fetch</code> HTTP xatoliklarida (404, 500) reject <strong>qilmaydi</strong> — buni <code>response.ok</code> orqali o'zimiz tekshiramiz;",
          "Amaliy shablon: <code>async/await</code> + <code>try...catch</code> tarmoq va HTTP xatoliklarini birga boshqaradi."
        ] }
      ]
    },

    {
      slug: "fetch-json",
      title: "Fetch: so'rovlar va JSON",
      blurb: "POST so'rov yuborish: method, headers, body parametrlari; JSON.stringify bilan ma'lumot yuborish; Content-Type sarlavhasining ahamiyati.",
      body: [
        { lead: "Oldingi darsda <code>fetch</code> bilan ma'lumot <em>olishni</em> ko'rdik. Endi serverga ma'lumot <em>yuborishni</em> — POST, PUT, DELETE kabi so'rovlarni o'rganamiz. Buning uchun <code>fetch</code>ning ikkinchi argumenti — <code>options</code> obyekti ishlatiladi." },

        { h2: "options obyekti" },
        { p: "So'rovni sozlash uchun <code>fetch</code>ga ikkinchi argument sifatida obyekt beramiz. Uning eng muhim maydonlari:" },
        { ul: [
          "<code>method</code> — HTTP metodi: <code>GET</code> (standart), <code>POST</code>, <code>PUT</code>, <code>PATCH</code>, <code>DELETE</code>;",
          "<code>headers</code> — so'rov sarlavhalari (obyekt ko'rinishida);",
          "<code>body</code> — so'rov tanasi: yuboriladigan ma'lumot (matn, JSON qatori, FormData, Blob va h.k.)."
        ] },
        { code: "let response = await fetch(url, {\n  method: 'POST',\n  headers: {\n    'Content-Type': 'application/json;charset=utf-8'\n  },\n  body: JSON.stringify(data)\n});" },

        { h2: "POST so'rovi bilan JSON yuborish" },
        { p: "Serverga JSON ma'lumot yuborishning to'liq misoli. Biz avval JavaScript obyektini <code>JSON.stringify</code> bilan matnga aylantiramiz, so'ng uni <code>body</code>ga joylashtiramiz:" },
        { code: "let user = {\n  name: 'Ali',\n  email: 'ali@example.com'\n};\n\nlet response = await fetch('https://api.example.com/users', {\n  method: 'POST',\n  headers: {\n    'Content-Type': 'application/json;charset=utf-8'\n  },\n  body: JSON.stringify(user)\n});\n\nlet result = await response.json();\nconsole.log(result.message); // serverning javobi" },
        { note: "<code>body</code> — bu tarmoq orqali yuboriladigan xom ma'lumot (odatda matn). JavaScript obyektini to'g'ridan-to'g'ri yubora olmaymiz — uni avval <code>JSON.stringify(obyekt)</code> bilan JSON matniga aylantirishimiz kerak." },

        { h2: "Content-Type sarlavhasi" },
        { p: "<code>Content-Type</code> sarlavhasi serverga <strong>qanday formatdagi</strong> ma'lumot yuborayotganimizni bildiradi. JSON yuborayotganda uni <code>application/json</code> qilib belgilash muhim, aks holda server ma'lumotni noto'g'ri talqin qilishi mumkin." },
        { code: "headers: {\n  'Content-Type': 'application/json;charset=utf-8'\n}" },
        { warn: "Agar <code>Content-Type</code>ni yubormasangiz, brauzer <code>body</code> matn bo'lganda uni <code>text/plain</code> deb belgilashi mumkin. Ko'p serverlar JSON'ni to'g'ri qabul qilishi uchun aynan <code>application/json</code>ni kutadi. Shuning uchun JSON yuborganda bu sarlavhani doim qo'shing." },

        { h2: "Turli HTTP metodlari" },
        { p: "RESTful API'larda turli amallar uchun turli metodlar ishlatiladi:" },
        { ul: [
          "<code>GET</code> — ma'lumot olish (tanasiz);",
          "<code>POST</code> — yangi ma'lumot yaratish;",
          "<code>PUT</code> — mavjud ma'lumotni to'liq almashtirish;",
          "<code>PATCH</code> — ma'lumotning bir qismini yangilash;",
          "<code>DELETE</code> — ma'lumotni o'chirish."
        ] },
        { code: "// PUT: foydalanuvchini yangilash\nawait fetch('https://api.example.com/users/1', {\n  method: 'PUT',\n  headers: { 'Content-Type': 'application/json' },\n  body: JSON.stringify({ name: 'Vali', email: 'vali@example.com' })\n});\n\n// DELETE: foydalanuvchini o'chirish\nawait fetch('https://api.example.com/users/1', {\n  method: 'DELETE'\n});" },
        { note: "<code>GET</code> va <code>DELETE</code> so'rovlarida odatda <code>body</code> bo'lmaydi. <code>GET</code> so'rovida <code>body</code> berish umuman xatolikka olib keladi." },

        { h2: "To'liq amaliy misol: xatoliklar bilan" },
        { p: "Real koda POST so'rovni ham xatoliklardan himoyalaymiz — xuddi oldingi darsdagidek:" },
        { code: "async function foydalanuvchiYarat(user) {\n  try {\n    let response = await fetch('https://api.example.com/users', {\n      method: 'POST',\n      headers: {\n        'Content-Type': 'application/json;charset=utf-8'\n      },\n      body: JSON.stringify(user)\n    });\n\n    if (!response.ok) {\n      throw new Error('Server xatoligi: ' + response.status);\n    }\n\n    let created = await response.json();\n    return created;\n\n  } catch (error) {\n    console.log('Yaratib bo\\'lmadi: ' + error.message);\n    throw error;\n  }\n}\n\nfoydalanuvchiYarat({ name: 'Salim', email: 'salim@example.com' })\n  .then(function (u) {\n    console.log('Yaratildi, ID: ' + u.id);\n  })\n  .catch(function () {\n    console.log('Amal bajarilmadi');\n  });" },

        { h2: "JSON.stringify eslatmasi" },
        { p: "<code>JSON.stringify</code> JavaScript obyektini JSON matniga aylantiradi. U obyekt, massiv, son, satr, boolean va <code>null</code> bilan ishlaydi:" },
        { code: "let obj = {\n  name: 'Ali',\n  age: 25,\n  active: true,\n  roles: ['admin', 'user']\n};\n\nconsole.log(JSON.stringify(obj));\n// {\"name\":\"Ali\",\"age\":25,\"active\":true,\"roles\":[\"admin\",\"user\"]}" },
        { warn: "<code>JSON.stringify</code> <code>undefined</code>, funksiyalar va <code>Symbol</code>larni <strong>tashlab yuboradi</strong> (obyekt maydonlarida). Shuning uchun faqat oddiy ma'lumot (data) yuboring — metodlar yoki funksiyalar JSON'ga kirmaydi." },

        { h2: "Xulosa" },
        { ul: [
          "Ma'lumot yuborish uchun <code>fetch(url, options)</code>ning ikkinchi argumentidan foydalanamiz;",
          "<code>method</code> — HTTP metodi (POST, PUT, PATCH, DELETE);",
          "<code>headers</code> — so'rov sarlavhalari, JSON uchun <code>Content-Type: application/json</code> muhim;",
          "<code>body</code> — yuboriladigan ma'lumot; JavaScript obyektini <code>JSON.stringify()</code> bilan matnga aylantirish shart;",
          "Server javobini <code>await response.json()</code> bilan qayta o'qib olamiz;",
          "POST so'rovlarni ham <code>try...catch</code> va <code>response.ok</code> bilan himoyalash kerak."
        ] }
      ]
    },

    {
      slug: "formdata",
      title: "FormData",
      blurb: "FormData obyekti bilan forma ma'lumotlarini yuborish: HTML formadan yaratish, append/set/delete metodlari, fayl yuklash va fetch bilan jo'natish.",
      body: [
        { lead: "Ko'pincha serverga oddiy ma'lumot emas, balki <strong>forma</strong> ma'lumotlarini yoki hatto <strong>fayllarni</strong> yuborish kerak bo'ladi. Buning uchun <code>FormData</code> maxsus obyekti mavjud. U forma maydonlarini tarmoqqa mos formatda avtomatik tayyorlaydi." },

        { h2: "FormData nima?" },
        { p: "<code>FormData</code> — bu forma maydonlari va ularning qiymatlarini saqlaydigan maxsus obyekt. Uni <code>fetch</code>ning <code>body</code>siga to'g'ridan-to'g'ri berish mumkin — brauzer avtomatik ravishda to'g'ri <code>Content-Type</code> (<code>multipart/form-data</code>) sarlavhasini qo'yadi." },
        { code: "let formData = new FormData([form]);" },
        { p: "Argument sifatida HTML <code>&lt;form&gt;</code> elementini berish mumkin — u holda forma ichidagi barcha maydonlar avtomatik olinadi. Argumentsiz chaqirilsa, bo'sh <code>FormData</code> yaratiladi." },

        { h2: "HTML formadan FormData yaratish" },
        { p: "Agar sahifada forma bo'lsa, uni to'g'ridan-to'g'ri <code>FormData</code>ga uzatib, serverga yuborish mumkin:" },
        { code: "// HTML: <form id=\"myForm\">\n//   <input name=\"name\" value=\"Ali\">\n//   <input name=\"email\" value=\"ali@example.com\">\n// </form>\n\nlet form = document.getElementById('myForm');\nlet formData = new FormData(form);\n\nlet response = await fetch('https://api.example.com/submit', {\n  method: 'POST',\n  body: formData\n});" },
        { note: "Diqqat: bu yerda <code>Content-Type</code> sarlavhasini <strong>o'zimiz qo'ymaymiz</strong>! <code>FormData</code> berilganda brauzer uni avtomatik <code>multipart/form-data</code> qilib, ichiga maxsus chegara (boundary) belgisini ham qo'shadi. Agar o'zimiz qo'ysak, bu buziladi." },

        { h2: "Maydonlarni boshqarish: append, set, delete" },
        { p: "<code>FormData</code> obyektiga maydonlarni dasturiy tarzda qo'shish va o'zgartirish mumkin:" },
        { ul: [
          "<code>formData.append(name, value)</code> — yangi maydon qo'shadi. Bir xil nomli maydon bir necha marta qo'shilishi mumkin;",
          "<code>formData.append(name, blob, fileName)</code> — fayl (Blob) qo'shadi va uning nomini belgilaydi;",
          "<code>formData.set(name, value)</code> — maydon o'rnatadi, agar shunday nom mavjud bo'lsa, barchasini o'chirib, bittasini qoldiradi;",
          "<code>formData.delete(name)</code> — berilgan nomdagi maydonni o'chiradi;",
          "<code>formData.get(name)</code> — maydon qiymatini oladi;",
          "<code>formData.has(name)</code> — shunday maydon bor-yo'qligini tekshiradi (true/false)."
        ] },
        { code: "let formData = new FormData();\n\nformData.append('name', 'Ali');\nformData.append('email', 'ali@example.com');\nformData.append('name', 'Vali'); // ikkinchi 'name' maydoni\n\nconsole.log(formData.get('name')); // 'Ali' (birinchisi)\n\nformData.set('name', 'Salim'); // barcha 'name'larni bittaga almashtiradi\nconsole.log(formData.get('name')); // 'Salim'\n\nformData.delete('email');\nconsole.log(formData.has('email')); // false" },
        { tip: "<code>append</code> va <code>set</code> orasidagi farqni eslang: <code>append</code> bir xil nomdan <strong>bir nechta</strong> qo'shishga ruxsat beradi, <code>set</code> esa har doim faqat <strong>bittasini</strong> qoldiradi. Massiv shaklidagi ma'lumot yuborganda <code>append</code> qulay." },

        { h2: "Fayl yuborish" },
        { p: "<code>FormData</code>ning eng kuchli tomoni — fayllarni yuborish imkoniyati. Foydalanuvchi tanlagan faylni <code>&lt;input type=\"file\"&gt;</code>dan olib yuborishimiz mumkin:" },
        { code: "// HTML: <input type=\"file\" id=\"fileInput\">\n\nlet fileInput = document.getElementById('fileInput');\nlet formData = new FormData();\n\n// Tanlangan faylni qo'shamiz\nformData.append('avatar', fileInput.files[0]);\nformData.append('userId', '123');\n\nlet response = await fetch('https://api.example.com/upload', {\n  method: 'POST',\n  body: formData\n});" },
        { p: "Bu yerda <code>fileInput.files[0]</code> — foydalanuvchi tanlagan birinchi fayl. U <code>File</code> obyekti bo'lib, <code>Blob</code>ning bir turi hisoblanadi." },

        { h2: "Dinamik ravishda Blob yaratib yuborish" },
        { p: "Ba'zan faylni foydalanuvchidan olmasdan, kod ichida yaratib yuborish kerak bo'ladi. Masalan, canvas'dagi rasmni yoki matnli faylni:" },
        { code: "// Matnli 'fayl' yaratib yuborish\nlet content = 'Salom, bu fayl mazmuni!';\nlet blob = new Blob([content], { type: 'text/plain' });\n\nlet formData = new FormData();\nformData.append('file', blob, 'salom.txt');\n\nlet response = await fetch('https://api.example.com/upload', {\n  method: 'POST',\n  body: formData\n});" },
        { note: "Uchinchi argument (<code>'salom.txt'</code>) — fayl nomi. U server tomonida faylni saqlashda ishlatiladi. Blob yuborayotganda fayl nomini berish yaxshi amaliyot." },

        { h2: "FormData'ni aylanib chiqish" },
        { p: "<code>FormData</code> iteratsiyalanadi — barcha maydonlarni ko'rib chiqish mumkin:" },
        { code: "let formData = new FormData();\nformData.append('name', 'Ali');\nformData.append('age', '25');\n\nfor (let [key, value] of formData) {\n  console.log(key + ' = ' + value);\n}\n// name = Ali\n// age = 25" },

        { h2: "To'liq amaliy misol: forma yuborish" },
        { p: "Formani submit qilib, sahifani qayta yuklamasdan serverga yuborishning to'liq namunasi:" },
        { code: "let form = document.getElementById('registerForm');\n\nform.addEventListener('submit', async function (event) {\n  event.preventDefault(); // sahifa qayta yuklanmasin\n\n  try {\n    let formData = new FormData(form);\n\n    let response = await fetch('/register', {\n      method: 'POST',\n      body: formData\n    });\n\n    if (!response.ok) {\n      throw new Error('Xatolik: ' + response.status);\n    }\n\n    let result = await response.json();\n    console.log('Muvaffaqiyat: ', result);\n\n  } catch (error) {\n    console.log('Yuborishda xatolik: ' + error.message);\n  }\n});" },

        { h2: "Xulosa" },
        { ul: [
          "<code>FormData</code> — forma maydonlari va fayllarni tarmoqqa mos formatda saqlaydigan obyekt;",
          "<code>new FormData(form)</code> — HTML formadan avtomatik maydonlarni oladi;",
          "<code>append</code> — maydon qo'shadi (takrorlanishi mumkin), <code>set</code> — bittaga almashtiradi, <code>delete</code> — o'chiradi;",
          "Fayl yuborish uchun <code>append(name, file, fileName)</code> ishlatiladi;",
          "<code>FormData</code>ni <code>fetch</code>ning <code>body</code>siga bersak, <code>Content-Type</code>ni <strong>qo'lda qo'ymaslik</strong> kerak — brauzer o'zi to'g'ri qo'yadi;",
          "Bu yondashuv sahifani qayta yuklamasdan forma va fayl yuborishga imkon beradi."
        ] }
      ]
    },

    {
      slug: "fetch-progress",
      title: "Fetch: yuklanish jarayoni",
      blurb: "Katta javoblarni yuklashda jarayonni (progress) kuzatish: response.body va ReadableStream, getReader(), Content-Length va foizni hisoblash.",
      body: [
        { lead: "Katta hajmdagi ma'lumotni yuklab olayotganda (masalan, katta fayl yoki video), foydalanuvchiga <strong>necha foiz yuklanganini</strong> ko'rsatish foydali. <code>fetch</code> buni <code>response.body</code> orqali — oqim (stream) sifatida o'qish imkonini beradi." },

        { note: "Eslatma: <code>fetch</code> <strong>yuklab olish</strong> (download) jarayonini kuzatishga imkon beradi, ammo <strong>yuklab jo'natish</strong> (upload) jarayonini kuzata olmaydi — buning uchun keyingi darsdagi <code>XMLHttpRequest</code> kerak bo'ladi." },

        { h2: "response.body — ReadableStream" },
        { p: "Oldingi darslarda javob tanasini <code>response.json()</code> yoki <code>response.text()</code> bilan bir martaga o'qidik. Ammo <code>response.body</code> — bu <strong>ReadableStream</strong> obyekti: ma'lumotni bo'lak-bo'lak (chunk) o'qishga imkon beradigan maxsus oqim." },
        { p: "Aynan shu bo'laklarni sanab, umumiy hajmga solishtirib, yuklanish foizini hisoblashimiz mumkin." },

        { h2: "getReader() bilan o'qish" },
        { p: "Oqimdan o'qish uchun undan <strong>reader</strong> (o'quvchi) olamiz va <code>read()</code> metodini takroran chaqiramiz. Har chaqiruv bitta bo'lakni qaytaradi:" },
        { code: "let response = await fetch('https://example.com/big-file');\n\nconst reader = response.body.getReader();\n\nwhile (true) {\n  const { done, value } = await reader.read();\n\n  if (done) {\n    break; // oqim tugadi\n  }\n\n  // value — Uint8Array turidagi navbatdagi bo'lak\n  console.log('Bo\\'lak olindi, bayt: ' + value.length);\n}" },
        { p: "<code>reader.read()</code> promise qaytaradi va u ikki maydonli obyekt bilan bajariladi:" },
        { ul: [
          "<code>done</code> — agar oqim tugagan bo'lsa <code>true</code>, aks holda <code>false</code>;",
          "<code>value</code> — navbatdagi ma'lumot bo'lagi (<code>Uint8Array</code> turidagi baytlar massivi)."
        ] },

        { h2: "Content-Length — umumiy hajm" },
        { p: "Foizni hisoblash uchun umumiy hajmni bilishimiz kerak. Buni server <code>Content-Length</code> sarlavhasida yuboradi:" },
        { code: "let response = await fetch(url);\n\nconst contentLength = response.headers.get('Content-Length');\nconst total = parseInt(contentLength, 10);\n\nconsole.log('Umumiy hajm: ' + total + ' bayt');" },
        { warn: "Diqqat: <code>Content-Length</code> har doim ham mavjud bo'lavermaydi — masalan, server ma'lumotni siqilgan (gzip) yoki chunked ko'rinishda yuborsa, u yo'q yoki noaniq bo'lishi mumkin. Shuning uchun kodda uning yo'qligini ham hisobga oling." },

        { h2: "Progressni to'liq hisoblash" },
        { p: "Endi hammasini birlashtiramiz: umumiy hajmni olamiz, bo'laklarni o'qib, qabul qilingan baytlarni sanaymiz va foizni chiqaramiz:" },
        { code: "async function yuklabOl(url) {\n  let response = await fetch(url);\n\n  const reader = response.body.getReader();\n\n  // Umumiy hajm (agar mavjud bo'lsa)\n  const contentLength = +response.headers.get('Content-Length');\n\n  let receivedLength = 0;    // qabul qilingan baytlar\n  let chunks = [];           // bo'laklar massivi\n\n  while (true) {\n    const { done, value } = await reader.read();\n\n    if (done) {\n      break;\n    }\n\n    chunks.push(value);\n    receivedLength += value.length;\n\n    // Progressni chiqaramiz\n    if (contentLength) {\n      let percent = Math.round((receivedLength / contentLength) * 100);\n      console.log('Yuklandi: ' + percent + '%');\n    } else {\n      console.log('Yuklandi: ' + receivedLength + ' bayt');\n    }\n  }\n\n  return chunks;\n}" },
        { p: "Bu yerda har bir bo'lak <code>chunks</code> massiviga saqlanadi va <code>receivedLength</code> oshib boradi. Foiz — <code>qabul qilingan / umumiy * 100</code> formulasi bilan hisoblanadi." },

        { h2: "Bo'laklarni birlashtirish" },
        { p: "Barcha bo'laklar o'qib bo'lingach, ularni bitta massivga birlashtirib, so'ng matnga (yoki JSON'ga) aylantirishimiz mumkin:" },
        { code: "// chunks — Uint8Array bo'laklari massivi\n\n// 1) Barcha baytlarni bitta massivga birlashtiramiz\nlet chunksAll = new Uint8Array(receivedLength);\nlet position = 0;\n\nfor (let chunk of chunks) {\n  chunksAll.set(chunk, position);\n  position += chunk.length;\n}\n\n// 2) Baytlarni matnga aylantiramiz\nlet result = new TextDecoder('utf-8').decode(chunksAll);\n\n// 3) Agar JSON bo'lsa, tahlil qilamiz\nlet data = JSON.parse(result);\nconsole.log(data);" },
        { note: "<code>TextDecoder</code> — baytlarni (Uint8Array) matnga aylantiradigan o'rnatilgan brauzer vositasi. UTF-8 kodlashda emoji va o'zbekcha harflar to'g'ri o'qiladi." },

        { h2: "Nima uchun oddiy usul yetarli emas?" },
        { p: "Agar progress kerak bo'lmasa, oddiygina <code>await response.json()</code> yozish yetarli — u ancha soddaroq. ReadableStream faqat <strong>yuklanish jarayonini kuzatish</strong> kerak bo'lganda ishlatiladi:" },
        { code: "// Progress kerak bo'lmasa — sodda:\nlet response = await fetch(url);\nlet data = await response.json();\n\n// Progress kerak bo'lsa — reader bilan:\nlet reader = response.body.getReader();\n// ...bo'lak-bo'lak o'qish va foiz hisoblash" },
        { tip: "Amaliyotda ReadableStream katta fayllar, video yoki uzoq davom etadigan yuklashlar uchun ajratilgan. Kichik JSON javoblar uchun oddiy <code>response.json()</code> to'g'ri tanlov." },

        { h2: "Xulosa" },
        { ul: [
          "<code>response.body</code> — javob tanasini bo'lak-bo'lak o'qish imkonini beruvchi <strong>ReadableStream</strong>;",
          "<code>response.body.getReader()</code> — oqimdan o'quvchi (reader) beradi;",
          "<code>reader.read()</code> — har chaqiruvda <code>{ done, value }</code> qaytaradi: <code>value</code> — navbatdagi bo'lak (Uint8Array);",
          "Umumiy hajm <code>Content-Length</code> sarlavhasida keladi (ammo har doim ham mavjud emas);",
          "Foiz = <code>qabul qilingan baytlar / umumiy hajm * 100</code>;",
          "Bo'laklar <code>Uint8Array</code>ga birlashtirilib, <code>TextDecoder</code> bilan matnga aylantiriladi;",
          "<code>fetch</code> faqat <strong>yuklab olish</strong> progressini kuzatadi — yuklab jo'natish (upload) uchun <code>XMLHttpRequest</code> kerak."
        ] }
      ]
    },

    {
      slug: "xhr",
      title: "XMLHttpRequest",
      blurb: "Tarmoq so'rovlarining eski usuli: open/send, onload/onerror/onprogress hodisalari, sinxron va asinxron rejimlar, fetch bilan solishtirish.",
      body: [
        { lead: "<strong>XMLHttpRequest</strong> (qisqacha XHR) — bu tarmoq so'rovlarini yuborishning <em>eski</em>, ammo hali ham amalda uchraydigan usuli. Bugungi kunda <code>fetch</code> afzal ko'riladi, lekin XHR'ni bilish muhim: eski loyihalarda uchraydi va u <code>fetch</code>da yo'q ba'zi imkoniyatlarga (masalan, upload progress) ega." },

        { note: "\"XML\" nomiga qaramay, XHR har qanday turdagi ma'lumot bilan ishlaydi — JSON, matn, binar va boshqalar. Bu nom shunchaki tarixiy sabablarga ko'ra qolgan." },

        { h2: "XHR nima uchun kerak?" },
        { p: "Zamonaviy koda deyarli har doim <code>fetch</code> ishlatiladi. Ammo XHR'ni o'rganishning sabablari bor:" },
        { ul: [
          "<strong>Eski kod:</strong> ko'p mavjud loyihalarda XHR ishlatilgan, ularni tushunish va qo'llab-quvvatlash kerak;",
          "<strong>Upload progress:</strong> <code>fetch</code> yuklab jo'natish (upload) jarayonini kuzata olmaydi, XHR esa buni qila oladi;",
          "<strong>Keng qo'llab-quvvatlash:</strong> XHR juda eski brauzerlarda ham ishlaydi."
        ] },

        { h2: "Asosiy sintaksis: open va send" },
        { p: "XHR bilan so'rov yuborish uch bosqichdan iborat: obyekt yaratish, sozlash (<code>open</code>) va yuborish (<code>send</code>):" },
        { code: "// 1) Obyekt yaratamiz\nlet xhr = new XMLHttpRequest();\n\n// 2) So'rovni sozlaymiz\nxhr.open('GET', 'https://example.com/data', true);\n\n// 3) Yuboramiz\nxhr.send();" },
        { p: "<code>xhr.open(method, url, async)</code> parametrlari:" },
        { ul: [
          "<code>method</code> — HTTP metodi (GET, POST va h.k.);",
          "<code>url</code> — so'rov manzili;",
          "<code>async</code> — <code>true</code> bo'lsa asinxron (tavsiya etiladi), <code>false</code> bo'lsa sinxron."
        ] },
        { warn: "Muhim: <code>open</code> so'rovni <strong>yubormaydi</strong>, faqat sozlaydi. Haqiqiy so'rov <code>send()</code> chaqirilganda boshlanadi." },

        { h2: "Hodisalar: onload, onerror, onprogress" },
        { p: "XHR asinxron ishlagani uchun natijani <strong>hodisalar</strong> (events) orqali olamiz. Eng muhimlari:" },
        { ul: [
          "<code>load</code> (onload) — so'rov tugadi va javob keldi (holat qanday bo'lishidan qat'i nazar);",
          "<code>error</code> (onerror) — so'rov bajarilmadi (masalan, tarmoq uzildi);",
          "<code>progress</code> (onprogress) — javob yuklanayotganda davriy chaqiriladi (progress uchun)."
        ] },
        { code: "let xhr = new XMLHttpRequest();\nxhr.open('GET', '/data.json', true);\n\nxhr.onload = function () {\n  if (xhr.status >= 200 && xhr.status < 300) {\n    // Muvaffaqiyat\n    let data = JSON.parse(xhr.responseText);\n    console.log('Ma\\'lumot: ', data);\n  } else {\n    // HTTP xatolik (404, 500 va h.k.)\n    console.log('HTTP xatolik: ' + xhr.status);\n  }\n};\n\nxhr.onerror = function () {\n  // Tarmoq xatoligi\n  console.log('So\\'rov bajarilmadi (tarmoq xatoligi)');\n};\n\nxhr.send();" },
        { note: "Xuddi <code>fetch</code>dagidek, <code>onload</code> HTTP xatoliklarda (404, 500) ham chaqiriladi — chunki server javob bergan. Shuning uchun <code>xhr.status</code>ni o'zimiz tekshiramiz. <code>onerror</code> esa faqat tarmoq umuman ishlamaganda ishlaydi." },

        { h2: "Javob xossalari" },
        { p: "So'rov tugagach javobni quyidagi xossalar orqali olamiz:" },
        { ul: [
          "<code>xhr.status</code> — HTTP holat kodi (200, 404, 500 ...);",
          "<code>xhr.statusText</code> — holat matni ('OK', 'Not Found' ...);",
          "<code>xhr.responseText</code> — javob tanasi matn sifatida;",
          "<code>xhr.response</code> — javob tanasi (<code>responseType</code>ga qarab turli formatda)."
        ] },
        { code: "xhr.responseType = 'json'; // brauzer JSON'ni avtomatik tahlil qiladi\n\nxhr.onload = function () {\n  // Endi xhr.response — tayyor obyekt (JSON.parse shart emas)\n  console.log(xhr.response.name);\n};" },

        { h2: "Progressni kuzatish" },
        { p: "XHR'ning kuchli tomoni — u ham yuklab olish, ham yuklab jo'natish progressini kuzata oladi:" },
        { code: "let xhr = new XMLHttpRequest();\nxhr.open('GET', '/big-file', true);\n\n// Yuklab olish progressi\nxhr.onprogress = function (event) {\n  if (event.lengthComputable) {\n    let percent = Math.round((event.loaded / event.total) * 100);\n    console.log('Yuklandi: ' + percent + '%');\n  } else {\n    console.log('Yuklandi: ' + event.loaded + ' bayt (umumiy hajm noma\\'lum)');\n  }\n};\n\nxhr.send();" },
        { p: "<code>progress</code> hodisasining obyekti quyidagi maydonlarga ega:" },
        { ul: [
          "<code>event.loaded</code> — hozirgacha yuklangan baytlar soni;",
          "<code>event.total</code> — umumiy baytlar soni;",
          "<code>event.lengthComputable</code> — umumiy hajm ma'lummi (Content-Length bormi)."
        ] },

        { h2: "Upload progress" },
        { p: "Fayl yuklab jo'natishda (upload) progressni kuzatish uchun <code>xhr.upload</code> obyektidan foydalanamiz — bu aynan <code>fetch</code>da yo'q imkoniyat:" },
        { code: "let xhr = new XMLHttpRequest();\nxhr.open('POST', '/upload', true);\n\n// Yuklab jo'natish progressi\nxhr.upload.onprogress = function (event) {\n  let percent = Math.round((event.loaded / event.total) * 100);\n  console.log('Jo\\'natildi: ' + percent + '%');\n};\n\nxhr.upload.onload = function () {\n  console.log('Fayl to\\'liq jo\\'natildi');\n};\n\nlet formData = new FormData();\nformData.append('file', fileInput.files[0]);\nxhr.send(formData);" },
        { tip: "Agar sizga fayl yuklashda progress-bar kerak bo'lsa, bugungi kunda ham ko'pincha XHR ishlatiladi, chunki <code>fetch</code> upload progressini qo'llab-quvvatlamaydi." },

        { h2: "Sinxron vs asinxron" },
        { p: "<code>open</code>ning uchinchi argumenti <code>false</code> bo'lsa, so'rov <strong>sinxron</strong> bajariladi — ya'ni <code>send()</code> javob kelguncha kodni <strong>bloklaydi</strong>:" },
        { code: "let xhr = new XMLHttpRequest();\nxhr.open('GET', '/data', false); // sinxron!\n\nxhr.send(); // bu yerda kod javob kelguncha KUTADI (bloklanadi)\n\nconsole.log(xhr.responseText); // javob tayyor" },
        { warn: "Sinxron so'rovlardan <strong>qochish kerak</strong>! Ular butun brauzerni (sahifani) javob kelguncha muzlatib qo'yadi — foydalanuvchi hech narsa qila olmaydi. Ko'p brauzerlar ularni eskirgan deb belgilagan. Doim asinxron (<code>true</code>) ishlating." },

        { h2: "XHR va fetch: solishtirish" },
        { p: "Ikki usulni qiyoslaymiz:" },
        { ul: [
          "<strong>Sintaksis:</strong> <code>fetch</code> promise'ga asoslangan, tekis va zamonaviy; XHR — hodisalarga asoslangan, ko'proq kod talab qiladi;",
          "<strong>Xatoliklar:</strong> ikkalasi ham HTTP xatoliklarni (404) o'zi tekshirishni talab qiladi;",
          "<strong>Upload progress:</strong> XHR qila oladi (<code>xhr.upload</code>), <code>fetch</code> qila olmaydi;",
          "<strong>Download progress:</strong> ikkalasi ham qila oladi (fetch — ReadableStream bilan);",
          "<strong>Bekor qilish:</strong> <code>fetch</code> — <code>AbortController</code> bilan, XHR — <code>xhr.abort()</code> bilan;",
          "<strong>Zamonaviylik:</strong> yangi kod uchun <code>fetch</code> tavsiya etiladi."
        ] },
        { code: "// Bir xil so'rov, ikki usul:\n\n// fetch bilan (zamonaviy):\nlet response = await fetch('/data.json');\nlet data = await response.json();\n\n// XHR bilan (eski):\nlet xhr = new XMLHttpRequest();\nxhr.open('GET', '/data.json', true);\nxhr.responseType = 'json';\nxhr.onload = function () {\n  let data = xhr.response;\n};\nxhr.send();" },

        { h2: "Xulosa" },
        { ul: [
          "<code>XMLHttpRequest</code> (XHR) — tarmoq so'rovlarining eski, hodisalarga asoslangan usuli;",
          "Uch bosqich: <code>new XMLHttpRequest()</code> → <code>xhr.open(method, url, async)</code> → <code>xhr.send()</code>;",
          "Natija hodisalar orqali: <code>onload</code> (tugadi), <code>onerror</code> (tarmoq xatoligi), <code>onprogress</code> (jarayon);",
          "Javob: <code>xhr.status</code>, <code>xhr.responseText</code>, <code>xhr.response</code>;",
          "<code>xhr.upload</code> — yuklab jo'natish progressini kuzatadi (bu <code>fetch</code>da yo'q);",
          "Sinxron so'rovlar (<code>async = false</code>) brauzerni muzlatadi — <strong>ulardan qoching</strong>;",
          "Yangi koda odatda <code>fetch</code> afzal, ammo upload progress kerak bo'lsa XHR foydali."
        ] }
      ]
    },

    {
      slug: "websocket",
      title: "WebSocket",
      blurb: "Server bilan real vaqtda ikki tomonlama aloqa: new WebSocket, open/message/close/error hodisalari, send, qayta ulanish va fetch bilan farqi.",
      body: [
        { lead: "<strong>WebSocket</strong> — bu server bilan <em>doimiy</em>, <em>ikki tomonlama</em> aloqa kanalini o'rnatuvchi protokol. <code>fetch</code>dan farqli o'laroq, u so'rov-javob modelida ishlamaydi: ulanish bir marta o'rnatiladi va ochiq turadi — server istagan paytda mijozga xabar yubora oladi. Bu real vaqt ilovalari uchun ajralmas: chat, o'yin, jonli bildirishnomalar, birja narxlari va h.k." },

        { h2: "WebSocket nima uchun kerak?" },
        { p: "Oddiy <code>fetch</code> yoki XHR bilan server <strong>faqat so'rovga javob</strong> bera oladi — mijoz so'ramaguncha, server o'zidan xabar yubora olmaydi. Ammo real vaqt ilovalarida server o'zi xabar yuborishi kerak bo'ladi:" },
        { ul: [
          "<strong>Chat:</strong> boshqa foydalanuvchi xabar yozsa, u darhol ko'rinishi kerak;",
          "<strong>Bildirishnomalar:</strong> server yangi voqea haqida darhol xabar berishi kerak;",
          "<strong>Jonli ma'lumotlar:</strong> birja narxlari, sport natijalari, onlayn o'yinlar."
        ] },
        { p: "WebSocket aynan shu muammoni hal qiladi: ulanish ochiq turadi va <strong>ikkala tomon</strong> ham istagan paytda xabar yubora oladi." },

        { h2: "Ulanishni o'rnatish" },
        { p: "WebSocket ulanishi <code>new WebSocket(url)</code> orqali yaratiladi. Manzil <code>http://</code> emas, <code>ws://</code> (yoki xavfsiz <code>wss://</code>) protokoli bilan boshlanadi:" },
        { code: "let socket = new WebSocket('wss://example.com/chat');" },
        { ul: [
          "<code>ws://</code> — oddiy (shifrlanmagan) ulanish;",
          "<code>wss://</code> — xavfsiz, shifrlangan ulanish (HTTPS'ga o'xshab). Doim <code>wss://</code>dan foydalanish tavsiya etiladi."
        ] },
        { note: "<code>wss://</code> — bu shifrlangan WebSocket. U nafaqat xavfsizroq, balki turli proksi-serverlar orqali ham ishonchliroq o'tadi. Amaliyotda deyarli doim <code>wss://</code> ishlatiladi." },

        { h2: "Asosiy hodisalar" },
        { p: "Ulanish o'rnatilgach, uning hayotini <strong>to'rtta hodisa</strong> boshqaradi:" },
        { ul: [
          "<code>open</code> — ulanish muvaffaqiyatli o'rnatildi;",
          "<code>message</code> — serverdan xabar keldi;",
          "<code>error</code> — xatolik yuz berdi;",
          "<code>close</code> — ulanish yopildi."
        ] },
        { code: "let socket = new WebSocket('wss://example.com/chat');\n\nsocket.onopen = function () {\n  console.log('Ulanish o\\'rnatildi');\n};\n\nsocket.onmessage = function (event) {\n  console.log('Serverdan xabar: ' + event.data);\n};\n\nsocket.onerror = function (error) {\n  console.log('Xatolik yuz berdi');\n};\n\nsocket.onclose = function (event) {\n  if (event.wasClean) {\n    console.log('Ulanish toza yopildi');\n  } else {\n    console.log('Ulanish uzildi (masalan, server o\\'chdi)');\n  }\n  console.log('Kod: ' + event.code + ', sabab: ' + event.reason);\n};" },

        { h2: "Xabar yuborish: send" },
        { p: "Serverga xabar yuborish uchun <code>socket.send()</code> ishlatiladi. Uni matn (string) yoki binar ma'lumot (Blob, ArrayBuffer) bilan chaqirish mumkin:" },
        { code: "// Matn yuborish\nsocket.send('Salom, server!');\n\n// Obyektni JSON qilib yuborish\nsocket.send(JSON.stringify({\n  type: 'message',\n  text: 'Assalomu alaykum'\n}));" },
        { warn: "Diqqat: <code>send()</code>ni faqat ulanish ochilgandan <strong>keyin</strong> (ya'ni <code>onopen</code>dan so'ng) chaqiring. Aks holda ulanish hali tayyor emas va xatolik yuz beradi. Ulanish holatini <code>socket.readyState</code> orqali tekshirish mumkin." },
        { code: "socket.onopen = function () {\n  // Endi yuborish xavfsiz\n  socket.send('Ulanish tayyor, salom!');\n};" },

        { h2: "readyState — ulanish holati" },
        { p: "<code>socket.readyState</code> ulanishning hozirgi holatini bildiradi:" },
        { ul: [
          "<code>0</code> (<code>CONNECTING</code>) — ulanmoqda, hali tayyor emas;",
          "<code>1</code> (<code>OPEN</code>) — ulanish ochiq, xabar yuborish mumkin;",
          "<code>2</code> (<code>CLOSING</code>) — yopilmoqda;",
          "<code>3</code> (<code>CLOSED</code>) — yopilgan."
        ] },
        { code: "if (socket.readyState === WebSocket.OPEN) {\n  socket.send('Xabar');\n} else {\n  console.log('Ulanish hali tayyor emas');\n}" },

        { h2: "Ulanishni yopish" },
        { p: "Ulanishni tugatish uchun <code>socket.close()</code> ishlatiladi. Ixtiyoriy ravishda yopilish kodi va sababini berish mumkin:" },
        { code: "// Oddiy yopish\nsocket.close();\n\n// Kod va sabab bilan\nsocket.close(1000, 'Ish tugadi');\n// 1000 — normal yopilish kodi" },
        { note: "<code>close</code> hodisasidagi <code>event.code</code> yopilish sababini bildiradi. <code>1000</code> — normal yopilish. Boshqa kodlar (masalan, <code>1006</code>) g'ayritabiiy uzilishni bildiradi." },

        { h2: "Qayta ulanish (reconnection)" },
        { p: "Real ilovalarda tarmoq uzilishi mumkin. Ulanish uzilganda uni <strong>avtomatik qayta tiklash</strong> muhim. Buning uchun <code>close</code> hodisasida yangi ulanish yaratamiz:" },
        { code: "function ulanish() {\n  let socket = new WebSocket('wss://example.com/chat');\n\n  socket.onopen = function () {\n    console.log('Ulandi');\n  };\n\n  socket.onmessage = function (event) {\n    console.log('Xabar: ' + event.data);\n  };\n\n  socket.onclose = function (event) {\n    if (!event.wasClean) {\n      // Ulanish g'ayritabiiy uzildi — qayta ulanamiz\n      console.log('Ulanish uzildi, 3 sekunddan keyin qayta urinamiz...');\n      setTimeout(ulanish, 3000);\n    }\n  };\n\n  socket.onerror = function () {\n    console.log('Xatolik, ulanish yopiladi');\n  };\n}\n\nulanish();" },
        { tip: "Amaliyotda \"eksponensial kutish\" (exponential backoff) qo'llaniladi: har muvaffaqiyatsiz urinishdan keyin kutish vaqtini oshirib borish (3s, 6s, 12s ...). Bu serverga ortiqcha yuk tushmasligini ta'minlaydi." },

        { h2: "To'liq amaliy misol: oddiy chat" },
        { p: "Xabar qabul qilish va yuborishni birlashtirgan soddalashtirilgan chat mijozi:" },
        { code: "let socket = new WebSocket('wss://example.com/chat');\n\n// Ulanish ochilganda\nsocket.onopen = function () {\n  console.log('Chatga ulandingiz');\n};\n\n// Xabar kelganda\nsocket.onmessage = function (event) {\n  let msg = JSON.parse(event.data);\n  console.log(msg.user + ': ' + msg.text);\n};\n\n// Xabar yuborish funksiyasi\nfunction xabarYubor(matn) {\n  if (socket.readyState === WebSocket.OPEN) {\n    socket.send(JSON.stringify({\n      user: 'Ali',\n      text: matn\n    }));\n  }\n}\n\n// Foydalanish (masalan, tugma bosilganda):\n// xabarYubor('Salom hammaga!');" },

        { h2: "WebSocket va fetch: farqi" },
        { p: "Ikki texnologiya butunlay boshqa maqsadlar uchun:" },
        { ul: [
          "<strong>Aloqa modeli:</strong> <code>fetch</code> — so'rov/javob (mijoz so'raydi, server javob beradi va tugaydi); WebSocket — doimiy ochiq kanal;",
          "<strong>Yo'nalish:</strong> <code>fetch</code> — asosan bir tomonlama (mijoz boshlaydi); WebSocket — ikki tomonlama (ikkalasi ham xabar yuboradi);",
          "<strong>Serverning tashabbusi:</strong> <code>fetch</code>da server o'zi xabar yubora olmaydi; WebSocketda yubora oladi;",
          "<strong>Protokol:</strong> <code>fetch</code> — <code>http/https</code>; WebSocket — <code>ws/wss</code>;",
          "<strong>Qachon ishlatiladi:</strong> <code>fetch</code> — oddiy ma'lumot olish/yuborish; WebSocket — real vaqt (chat, o'yin, jonli yangilanishlar)."
        ] },
        { note: "Qoida oddiy: agar sizga <strong>faqat so'raganda</strong> ma'lumot kerak bo'lsa — <code>fetch</code>. Agar server <strong>o'zi</strong> xabar yuborishi va aloqa <strong>real vaqtda</strong> bo'lishi kerak bo'lsa — WebSocket." },

        { h2: "Xulosa" },
        { ul: [
          "<strong>WebSocket</strong> — server bilan doimiy, ikki tomonlama, real vaqt aloqa kanali;",
          "Ulanish: <code>new WebSocket('wss://...')</code> — <code>wss://</code> xavfsiz variantdir;",
          "To'rt asosiy hodisa: <code>open</code> (ulandi), <code>message</code> (xabar keldi), <code>error</code> (xatolik), <code>close</code> (yopildi);",
          "Xabar yuborish: <code>socket.send(...)</code> — faqat <code>open</code>dan keyin;",
          "<code>socket.readyState</code> — ulanish holatini bildiradi (CONNECTING, OPEN, CLOSING, CLOSED);",
          "Tarmoq uzilsa, <code>close</code> hodisasida <code>setTimeout</code> bilan <strong>qayta ulanish</strong> qo'llaniladi;",
          "<code>fetch</code> — so'rov/javob uchun; WebSocket — real vaqt, ikki tomonlama aloqa uchun."
        ] }
      ]
    }
  ]
};
