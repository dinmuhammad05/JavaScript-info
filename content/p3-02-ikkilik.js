"use strict";

module.exports = {
  part: "3-qism: Qo'shimcha bo'limlar",
  chapter: "Ikkilik ma'lumot va fayllar",
  lessons: [
    {
      slug: "arraybuffer",
      title: "ArrayBuffer, TypedArray",
      blurb: "Ikkilik ma'lumotning asosi: ArrayBuffer xotira bloki, uning ustidagi ko'rinishlar (Uint8Array, Int32Array va boshqalar), indeks bilan ishlash, TypedArray metodlari va DataView.",
      body: [
        { lead: "Web-ishlab chiqishda biz ko'pincha ikkilik (binary) ma'lumot bilan ishlashga to'g'ri kelamiz — rasm fayllari, tarmoqdan kelgan baytlar, arxivlar va hokazo. JavaScriptda bularning barchasi zamirida <code>ArrayBuffer</code> turadi: bu — belgilangan uzunlikdagi <strong>xom baytlar</strong> saqlanadigan xotira bloki. Buferning o'zi bilan bevosita ishlab bo'lmaydi — uning ustiga <em>ko'rinish</em> (view), ya'ni <code>TypedArray</code> yoki <code>DataView</code> qo'yiladi." },

        { h2: "ArrayBuffer — xom xotira bloki" },
        { p: "<code>ArrayBuffer</code> — konstruktor bo'lib, u belgilangan baytlar sonidan iborat, nol bilan to'ldirilgan uzluksiz xotira maydonini yaratadi:" },
        { pg: "let buffer = new ArrayBuffer(16); // 16 baytlik blok\n\nconsole.log(buffer.byteLength); // 16", file: "buffer-yaratish.js" },
        { p: "Bu yerda 16 baytlik maydon ajratildi va u nollar bilan to'ldirildi. <code>byteLength</code> xususiyati buferning uzunligini (baytlarda) qaytaradi." },
        { warn: "<code>ArrayBuffer</code> — bu <strong>oddiy massiv emas</strong>! Uni <code>Array</code> bilan aralashtirmang. Muhim farqlar: uning uzunligi qat'iy belgilangan (o'zgartirib bo'lmaydi), u aynan shuncha baytni band qiladi, va uning elementiga <code>buffer[0]</code> deb murojaat qilib bo'lmaydi. <code>ArrayBuffer</code> — bu shunchaki xotira bo'lagi, unda nima saqlanayotgani noma'lum, u faqat baytlar ketma-ketligi." },
        { p: "Buferdagi baytlarga kirish uchun bizga <em>ko'rinish obyekti</em> kerak. Ko'rinish o'zida hech qanday ma'lumot saqlamaydi — u faqat buferdagi baytlarni qanday <strong>talqin qilishni</strong> belgilaydigan \"oyna\"dir." },

        { h2: "TypedArray ko'rinishlari" },
        { p: "Ko'rinishlarning umumiy nomi — <code>TypedArray</code> (turlangan massiv). Bu bitta konstruktor emas, balki bir necha konstruktorlarning umumiy nomi. Ular buferdagi baytlarni turli formatlarda talqin qiladi:" },
        { ul: [
          "<code>Uint8Array</code> — har bir element bitta bayt (8 bit), 0..255 oralig'idagi butun son;",
          "<code>Uint16Array</code> — har bir element 2 bayt (16 bit), 0..65535;",
          "<code>Uint32Array</code> — har bir element 4 bayt (32 bit), 0..4294967295;",
          "<code>Int8Array</code>, <code>Int16Array</code>, <code>Int32Array</code> — ishorali (musbat/manfiy) butun sonlar;",
          "<code>Uint8ClampedArray</code> — 0..255, lekin chegaradan chiqqan qiymatni \"kesib\" chegaraga tenglaydi (rasm bilan ishlashda qulay);",
          "<code>Float32Array</code>, <code>Float64Array</code> — kasrli (suzuvchi nuqtali) sonlar, 4 va 8 bayt."
        ] },
        { p: "Nomdagi son bitlar sonini bildiradi. Masalan, <code>Uint16Array</code> — har bir raqamga 16 bit (2 bayt) ajratadi. Shu sabab 16 baytlik bufer <code>Uint16Array</code> orqali 8 ta element, <code>Uint32Array</code> orqali 4 ta element bo'lib ko'rinadi:" },
        { pg: "let buffer = new ArrayBuffer(16);\n\nlet view8 = new Uint8Array(buffer);\nconsole.log(view8.length);  // 16 (16 bayt / 1 bayt)\n\nlet view16 = new Uint16Array(buffer);\nconsole.log(view16.length); // 8 (16 bayt / 2 bayt)\n\nlet view32 = new Uint32Array(buffer);\nconsole.log(view32.length); // 4 (16 bayt / 4 bayt)", file: "korinishlar.js" },
        { note: "<code>length</code> — ko'rinishdagi <strong>elementlar</strong> soni, <code>byteLength</code> esa <strong>baytlar</strong> soni. Ular har xil ko'rinishlar uchun turlicha bo'ladi, chunki har bir element turli miqdorda bayt egallaydi." },

        { h2: "Indeks bilan ishlash" },
        { p: "TypedArray oddiy massivga juda o'xshaydi: unga indeks orqali murojaat qilish, qiymat yozish va o'qish mumkin:" },
        { pg: "let arr = new Uint8Array(4); // 4 baytlik ko'rinish (buferi bilan)\n\narr[0] = 10;\narr[1] = 20;\narr[2] = 250;\narr[3] = 300; // e'tibor bering: 300 > 255!\n\nconsole.log(arr[0]); // 10\nconsole.log(arr[2]); // 250\nconsole.log(arr[3]); // 44  (300 modul 256 = 44)", file: "indeks-yozish.js" },
        { warn: "<code>Uint8Array</code> faqat 0..255 saqlaydi. Agar chegaradan chiqqan qiymat yozsangiz, u <strong>xatolik bermaydi</strong>, balki ortiqcha bitlar tashlanadi. Yuqorida 300 sonining faqat quyi 8 biti saqlanib, natija 44 bo'ldi (300 - 256 = 44). Bu \"o'ralib qolish\" (overflow) deyiladi." },
        { p: "Agar <code>Uint8ClampedArray</code> ishlatilsa, chegaradan chiqqan qiymat kesiladi (0 dan pastini 0 ga, 255 dan yuqorisini 255 ga):" },
        { pg: "let clamped = new Uint8ClampedArray(3);\n\nclamped[0] = 300;  // 255 ga \"kesiladi\"\nclamped[1] = -50;  // 0 ga \"kesiladi\"\nclamped[2] = 100;  // o'zgarishsiz\n\nconsole.log(clamped[0]); // 255\nconsole.log(clamped[1]); // 0\nconsole.log(clamped[2]); // 100", file: "clamped.js" },

        { h2: "Bufer va ko'rinish bir xotirani baham ko'radi" },
        { p: "Bu — eng muhim tushunchalardan biri. Bir xil buferga bir nechta ko'rinish qo'yish mumkin. Ular <strong>bitta xotirani</strong> ko'rsatadi, shuning uchun biri orqali yozilgan bayt boshqasi orqali darhol ko'rinadi:" },
        { pg: "let buffer = new ArrayBuffer(4);\n\nlet bytes = new Uint8Array(buffer);  // baytma-bayt ko'rinish\nlet asInt = new Uint32Array(buffer); // bitta 32-bitli son sifatida\n\nbytes[0] = 255;\nbytes[1] = 255;\nbytes[2] = 0;\nbytes[3] = 0;\n\n// aynan shu 4 baytni bitta son sifatida o'qiymiz\nconsole.log(asInt[0]); // 65535  (255 + 255*256)", file: "bir-xotira.js" },
        { p: "Har bir TypedArrayning <code>buffer</code> xususiyati orqali uning asosidagi <code>ArrayBuffer</code>ga yetib borish mumkin. Shu bilan bir buferga yangi ko'rinish qo'shsa bo'ladi:" },
        { pg: "let a = new Uint8Array(8); // bu ham buferni yaratadi\na[0] = 5;\n\n// a.buffer orqali asosdagi ArrayBufferga kiramiz\nlet b = new Uint16Array(a.buffer);\n\nconsole.log(b[0]); // 5 (a[0]=5 bo'lgani uchun)", file: "buffer-xususiyat.js" },
        { note: "TypedArrayni yaratishning ikki yo'li bor: (1) mavjud buferni berish — <code>new Uint8Array(buffer)</code>; (2) uzunlik berish — <code>new Uint8Array(8)</code>, bunda ichida yangi bufer avtomatik yaratiladi. Ikkinchi holatda ham <code>arr.buffer</code> mavjud bo'ladi." },

        { h2: "TypedArray metodlari" },
        { p: "TypedArray oddiy <code>Array</code>ning deyarli barcha metodlarini qo'llab-quvvatlaydi: <code>map</code>, <code>forEach</code>, <code>filter</code>, <code>reduce</code>, <code>find</code>, <code>slice</code>, <code>indexOf</code> va hokazo:" },
        { pg: "let arr = new Uint8Array([10, 20, 30, 40]);\n\nlet ikkiBaravar = arr.map(x => x * 2);\nconsole.log(ikkiBaravar[0], ikkiBaravar[3]); // 20 80\n\nlet yigindi = arr.reduce((s, x) => s + x, 0);\nconsole.log(yigindi); // 100\n\nconsole.log(arr.indexOf(30)); // 2", file: "typedarray-metodlar.js" },
        { p: "Lekin ba'zi metodlar <strong>yo'q</strong>: <code>push</code>, <code>pop</code>, <code>shift</code>, <code>unshift</code>, <code>splice</code> — chunki bular massiv uzunligini o'zgartiradi, TypedArray uzunligi esa qat'iy (buferga bog'liq)." },
        { p: "Muhim maxsus metod — <code>set</code>. U bitta TypedArrayning barcha qiymatlarini boshqasiga (yoki oddiy massivni) berilgan pozitsiyadan boshlab ko'chiradi:" },
        { pg: "let arr = new Uint8Array(6); // [0,0,0,0,0,0]\n\narr.set([1, 2, 3]);    // boshidan yozish\narr.set([9, 9], 4);    // 4-indeksdan boshlab yozish\n\nconsole.log(arr.join(\",\")); // 1,2,3,0,9,9", file: "typedarray-set.js" },
        { p: "Yana bir metod — <code>subarray</code>. U ma'lumotni nusxalamasdan, xuddi shu buferning bir qismiga <strong>yangi ko'rinish</strong> qaytaradi (ular xotirani baham ko'radi):" },
        { pg: "let arr = new Uint8Array([10, 20, 30, 40, 50]);\n\nlet qism = arr.subarray(1, 4); // 1..3 indekslar\nconsole.log(qism.join(\",\")); // 20,30,40\n\nqism[0] = 99;          // qism orqali o'zgartiramiz\nconsole.log(arr[1]);   // 99 (asl massiv ham o'zgardi!)", file: "subarray.js" },
        { tip: "<code>slice</code> va <code>subarray</code> farqi: <code>slice</code> ma'lumotni <strong>nusxalaydi</strong> (yangi bufer), <code>subarray</code> esa faqat yangi <strong>oyna</strong> beradi (bir xil bufer). Xotira tejash kerak bo'lsa <code>subarray</code> tezroq va arzonroq." },

        { h2: "DataView — moslashuvchan ko'rinish" },
        { p: "<code>DataView</code> — buferga eng past darajadagi, eng moslashuvchan kirish usuli. TypedArraydan farqi: DataViewda format oldindan qat'iy belgilanmaydi. Aksincha, har bir o'qish/yozishda formatni siz o'zingiz aytasiz — <code>getUint8</code>, <code>getInt32</code>, <code>getFloat64</code> va hokazo:" },
        { pg: "let buffer = new ArrayBuffer(8);\nlet view = new DataView(buffer);\n\n// 0-baytga 1 baytli son yozamiz\nview.setUint8(0, 200);\n\n// 4-baytga 4 baytli son yozamiz\nview.setUint32(4, 123456);\n\nconsole.log(view.getUint8(0));   // 200\nconsole.log(view.getUint32(4));  // 123456", file: "dataview.js" },
        { p: "DataViewning asosiy afzalligi — bitta buferda turli formatdagi ma'lumotlarni aralash saqlash mumkin. Masalan, tarmoq protokoli yoki fayl formati sarlavhasi: dastlabki 2 bayt — versiya (Uint16), keyingi 4 bayt — o'lcham (Uint32) va hokazo. Bunday holatda DataView ideal." },
        { p: "DataView metodlarida yana bir muhim parametr bor — <em>little-endian</em> / <em>big-endian</em> (baytlar tartibi). Ko'p baytli sonlar xotirada ikki xil tartibda saqlanishi mumkin. Uchinchi argument <code>true</code> berilsa little-endian ishlatiladi:" },
        { pg: "let buffer = new ArrayBuffer(4);\nlet view = new DataView(buffer);\n\nview.setUint32(0, 0x12345678, true); // little-endian\n\n// baytma-bayt tekshiramiz\nlet bytes = new Uint8Array(buffer);\nconsole.log(bytes[0].toString(16)); // 78 (kichik bayt oldinda)\nconsole.log(bytes[3].toString(16)); // 12", file: "dataview-endian.js" },
        { note: "Ko'p platformalarda xotira <strong>little-endian</strong> (kichik bayt oldinda) tartibida saqlanadi. Tarmoq protokollarida esa ko'pincha <strong>big-endian</strong> ishlatiladi. Fayl yoki tarmoq formati bilan ishlaganda tartibni albatta tekshiring — noto'g'ri tartib qiymatlarni buzadi." },

        { h2: "Xulosa" },
        { ul: [
          "<code>ArrayBuffer</code> — belgilangan uzunlikdagi xom baytlar bloki; u bilan bevosita ishlab bo'lmaydi;",
          "Ma'lumotga kirish uchun <strong>ko'rinish</strong> kerak: <code>TypedArray</code> yoki <code>DataView</code>;",
          "<code>Uint8Array</code>, <code>Int32Array</code>, <code>Float64Array</code> va boshqalar — baytlarni ma'lum formatda talqin qiladi;",
          "Bir buferga bir nechta ko'rinish qo'yilsa, ular <strong>bitta xotirani</strong> baham ko'radi;",
          "TypedArrayda <code>map</code>, <code>set</code>, <code>subarray</code> bor, lekin <code>push</code>/<code>pop</code> yo'q;",
          "<code>DataView</code> — har bir amalda formatni tanlash imkonini beruvchi eng moslashuvchan ko'rinish."
        ] }
      ]
    },

    {
      slug: "textdecoder",
      title: "TextDecoder va TextEncoder",
      blurb: "Ikkilik ma'lumotni matnga aylantirish: TextDecoder baytlarni satrga o'giradi, TextEncoder esa satrni baytlarga. UTF-8 kodlash bilan amaliy ishlash.",
      body: [
        { lead: "Ikkilik ma'lumot bilan ishlaganda tez-tez matnga aylantirish kerak bo'ladi. Masalan, faylni o'qiganingizda baytlar keladi, ularni esa odam o'qiy oladigan satrga o'girish kerak. Buning uchun ikkita o'rnatilgan obyekt bor: <code>TextDecoder</code> (baytlardan matnga) va <code>TextEncoder</code> (matndan baytlarga). Ular <strong>Node.js va brauzerda</strong> mavjud." },

        { h2: "TextDecoder: baytlardan matnga" },
        { p: "<code>TextDecoder</code> berilgan bayt ketma-ketligini (buffer yoki TypedArray) satrga o'giradi. Avval dekoder yaratiladi, so'ng <code>decode</code> metodi chaqiriladi:" },
        { code: "let decoder = new TextDecoder(kodlash, {options});\nlet str = decoder.decode(bytesBuffer);" },
        { ul: [
          "<code>kodlash</code> — kodlash turi, standarti <code>\"utf-8\"</code> (eng keng tarqalgan);",
          "<code>options</code> — ixtiyoriy obyekt; masalan <code>{fatal: true}</code> — noto'g'ri baytlarda xatolik tashlash, <code>{ignoreBOM: true}</code>."
        ] },
        { p: "Oddiy misol: baytlarni matnga o'giramiz. \"Hi\" so'zi ASCII kodlarida 72 (H) va 105 (i):" },
        { pg: "let bytes = new Uint8Array([72, 105]); // H, i\n\nlet decoder = new TextDecoder();\nlet str = decoder.decode(bytes);\n\nconsole.log(str);        // Hi\nconsole.log(str.length); // 2", file: "decoder-oddiy.js" },
        { note: "<code>decode</code>ga <code>Uint8Array</code>, boshqa TypedArray yoki <code>ArrayBuffer</code>ni berish mumkin. Standart holda kodlash — UTF-8, shuning uchun ko'p hollarda argument yozish shart emas." },

        { h2: "UTF-8 va ko'p baytli belgilar" },
        { p: "ASCII belgilar (lotin harflari, raqamlar) UTF-8da bitta bayt egallaydi. Lekin boshqa alifbolar — o'zbekcha (kirill), arab, emoji — bir necha bayt egallaydi. Masalan, o'zbekcha kirill harflari odatda 2 baytdan iborat:" },
        { pg: "// \"Salom\" so'zining UTF-8 baytlari (lotin)\nlet bytes = new Uint8Array([83, 97, 108, 111, 109]);\nconsole.log(new TextDecoder().decode(bytes)); // Salom\n\n// ko'p baytli belgi (evro belgisi) 3 bayt egallaydi\nlet euro = new Uint8Array([226, 130, 172]);\nconsole.log(new TextDecoder().decode(euro)); // (evro belgisi)", file: "decoder-utf8.js" },
        { warn: "Ko'p baytli belgini <strong>o'rtasidan bo'lib</strong> dekodlash muammo tug'diradi. Agar buferni bo'laklab (masalan tarmoqdan qism-qism kelganda) dekodlasangiz, bir belgining baytlari ikki bo'lakka bo'linib qolishi mumkin. Bunday oqim (streaming) uchun <code>decode</code>ga <code>{stream: true}</code> berish kerak — u tugallanmagan baytlarni keyingi chaqiruvgacha saqlab turadi." },
        { p: "Oqimli dekodlash misoli:" },
        { pg: "let decoder = new TextDecoder();\n\n// evro belgisi 3 baytini ikki bo'lakka bo'lamiz\nlet qism1 = new Uint8Array([226, 130]); // yetarli emas\nlet qism2 = new Uint8Array([172]);      // qolgan bayt\n\nlet s1 = decoder.decode(qism1, {stream: true}); // bo'sh yoki qisman\nlet s2 = decoder.decode(qism2, {stream: true}); // to'liq belgi\n\nconsole.log(\"Natija uzunligi: \" + (s1 + s2).length); // 1", file: "decoder-stream.js" },

        { h2: "TextEncoder: matndan baytlarga" },
        { p: "<code>TextEncoder</code> teskari ishni bajaradi — satrni UTF-8 baytlariga o'giradi. U doim <strong>faqat UTF-8</strong> bilan ishlaydi (boshqa kodlashni qo'llab-quvvatlamaydi), shuning uchun argument olmaydi:" },
        { pg: "let encoder = new TextEncoder();\nlet bytes = encoder.encode(\"Hi\");\n\nconsole.log(bytes instanceof Uint8Array); // true\nconsole.log(bytes[0]); // 72  (H)\nconsole.log(bytes[1]); // 105 (i)\nconsole.log(bytes.length); // 2", file: "encoder-oddiy.js" },
        { p: "<code>encode</code> natijasi — <code>Uint8Array</code>. Ko'p baytli belgilar bir nechta bayt beradi, shuning uchun bayt soni belgilar sonidan ko'p bo'lishi mumkin:" },
        { pg: "let encoder = new TextEncoder();\n\nlet bytes = encoder.encode(\"A\\u20AC\"); // A + evro belgisi\n\nconsole.log(bytes.length); // 4  (A=1 bayt, evro=3 bayt)\nconsole.log(bytes[0]);     // 65  (A)", file: "encoder-utf8.js" },
        { note: "TextEncoderda yana <code>encodeInto(str, uint8Array)</code> metodi bor — u yangi massiv yaratmasdan, natijani mavjud <code>Uint8Array</code>ga to'g'ridan-to'g'ri yozadi. Bu tez-tez kodlash kerak bo'lganda xotira tejaydi." },

        { h2: "Aylantirishning to'liq davri" },
        { p: "Matnni baytga, so'ng qaytadan matnga o'girib, natija bir xilligiga ishonch hosil qilaylik:" },
        { pg: "let asl = \"Salom, dunyo!\";\n\nlet encoder = new TextEncoder();\nlet bytes = encoder.encode(asl);\nconsole.log(\"Baytlar soni: \" + bytes.length);\n\nlet decoder = new TextDecoder();\nlet qayta = decoder.decode(bytes);\nconsole.log(qayta);          // Salom, dunyo!\nconsole.log(qayta === asl);  // true", file: "toliq-davr.js" },

        { h2: "Qachon ishlatiladi" },
        { p: "TextDecoder/TextEncoder amaliyotda quyidagi holatlarda kerak bo'ladi:" },
        { ul: [
          "<strong>Fayl o'qish</strong>: <code>ArrayBuffer</code> ko'rinishida kelgan matnli faylni satrga o'girish;",
          "<strong>Tarmoq</strong>: <code>fetch</code> orqali kelgan ikkilik javobni matnga aylantirish;",
          "<strong>WebSocket</strong>: ikkilik xabarlarni o'qish;",
          "<strong>Kriptografiya</strong>: matnni baytga o'girib, hash yoki shifrlashga uzatish;",
          "<strong>Fayl formatlari</strong>: sarlavha (header)dan matnli qismlarni ajratib olish."
        ] },
        { tip: "Agar sizda oddiy ASCII matn bo'lsa va tezkorlik muhim bo'lmasa, <code>String.fromCharCode(...bytes)</code> bilan ham ishlash mumkin. Lekin <strong>UTF-8 va ko'p tilli matn</strong> uchun doim <code>TextDecoder</code> ishlating — u ko'p baytli belgilarni to'g'ri qayta ishlaydi." },

        { h2: "Xulosa" },
        { ul: [
          "<code>TextDecoder</code> — baytlarni (Uint8Array/ArrayBuffer) satrga o'giradi;",
          "<code>TextEncoder</code> — satrni UTF-8 baytlariga (Uint8Array) o'giradi;",
          "Standart kodlash — <strong>UTF-8</strong>; TextEncoder faqat UTF-8 bilan ishlaydi;",
          "Ko'p baytli belgilar bir nechta bayt egallaydi — bayt soni belgi soniga teng emas;",
          "Oqimli (bo'laklab kelgan) ma'lumot uchun <code>decode(..., {stream: true})</code> ishlating;",
          "Ular Node.js va brauzerda mavjud — fayl, tarmoq va kriptografiyada ko'p qo'llaniladi."
        ] }
      ]
    },

    {
      slug: "blob",
      title: "Blob",
      blurb: "Blob obyekti — ikkilik katta obyektlar bilan ishlash: konstruktor, type (MIME turi), slice bilan bo'laklash, URL.createObjectURL orqali havola yaratish, fayl yuklab olish va rasmga aylantirish.",
      body: [
        { lead: "<code>Blob</code> (Binary Large Object — ikkilik katta obyekt) — brauzerdagi ikkilik ma'lumotni tasvirlash uchun mo'ljallangan obyekt. <code>ArrayBuffer</code>dan farqi shundaki, Blob nafaqat baytlarni, balki ularning <strong>turini</strong> (MIME type, masalan <code>image/png</code>) ham saqlaydi. Aynan shu tur Blobni fayl sifatida yuklab olish yoki rasm sifatida ko'rsatishga imkon beradi. Blob — brauzer obyekti, shuning uchun quyidagi misollar brauzer muhitiga oid." },

        { h2: "Blob konstruktori" },
        { p: "Blob ikkita argument bilan yaratiladi: bo'laklar (blobParts) massivi va sozlamalar obyekti:" },
        { code: "let blob = new Blob(blobParts, options);" },
        { ul: [
          "<code>blobParts</code> — massiv bo'lib, uning elementlari <code>String</code>, <code>ArrayBuffer</code>, <code>TypedArray</code>, <code>DataView</code> yoki boshqa <code>Blob</code> bo'lishi mumkin — barchasi ketma-ket birlashtiriladi;",
          "<code>options</code> — ixtiyoriy obyekt; asosiy xususiyati <code>type</code> — Blob ma'lumotining MIME turi (masalan <code>text/plain</code>, <code>image/png</code>)."
        ] },
        { p: "Matndan Blob yaratamiz:" },
        { code: "// matnli bo'laklardan Blob yasaymiz\nlet blob = new Blob([\"Salom, \", \"dunyo!\"], { type: \"text/plain\" });\n\nconsole.log(blob.size); // 13  (baytlar soni)\nconsole.log(blob.type); // text/plain" },
        { p: "<code>size</code> — Blobdagi baytlar soni, <code>type</code> — uning MIME turi. E'tibor bering: bo'laklar avtomatik birlashtiriladi, xuddi bitta uzluksiz ma'lumotdek." },
        { note: "Blob <strong>o'zgarmas</strong> (immutable) obyekt. Uning ichidagi ma'lumotni to'g'ridan-to'g'ri o'zgartira olmaysiz — indeks orqali bayt yozish mumkin emas. Lekin Blobni <em>bo'laklab</em> undan yangi Blob yasash mumkin (<code>slice</code>)." },

        { h2: "ArrayBufferdan Blob" },
        { p: "Blobni faqat matndan emas, ikkilik ma'lumotdan ham yasash mumkin. Masalan, TypedArray yordamida:" },
        { code: "// ikkilik baytlardan Blob\nlet bytes = new Uint8Array([72, 101, 108, 108, 111]); // Hello\nlet blob = new Blob([bytes], { type: \"application/octet-stream\" });\n\nconsole.log(blob.size); // 5" },
        { p: "Bu usul rasm, audio yoki boshqa ikkilik ma'lumotni fayl formatida qadoqlashda ishlatiladi." },

        { h2: "slice bilan bo'laklash" },
        { p: "<code>blob.slice(start, end, contentType)</code> — Blobning bir qismidan yangi Blob qaytaradi. Xuddi massiv <code>slice</code>iga o'xshaydi:" },
        { ul: [
          "<code>start</code> — boshlang'ich bayt indeksi (standarti 0);",
          "<code>end</code> — tugash bayti (kirmaydi, standarti oxirigacha);",
          "<code>contentType</code> — yangi Blobning MIME turi (standarti bo'sh)."
        ] },
        { code: "let blob = new Blob([\"Hello world\"], { type: \"text/plain\" });\n\nlet qism = blob.slice(0, 5); // dastlabki 5 bayt\nconsole.log(qism.size);      // 5\n// qism ichida \"Hello\" saqlanadi" },
        { tip: "<code>slice</code> katta fayllarni <strong>bo'laklab yuklashda</strong> (chunked upload) juda qo'l keladi. Katta faylni bir necha Blob bo'lakka bo'lib, har birini alohida serverga jo'natish mumkin." },

        { h2: "URL.createObjectURL: Blobga havola" },
        { p: "Blobni brauzerda ko'rsatish yoki yuklab olish uchun unga <em>URL</em> kerak. <code>URL.createObjectURL(blob)</code> Blobga ishoruvchi maxsus qisqa havola yaratadi (<code>blob:</code> bilan boshlanadi):" },
        { code: "let blob = new Blob([\"Fayl mazmuni\"], { type: \"text/plain\" });\n\nlet url = URL.createObjectURL(blob);\nconsole.log(url);\n// blob:https://example.com/1e8b4a2c-...\n\n// bu URLni <a href> yoki <img src>da ishlatish mumkin" },
        { warn: "Har bir <code>URL.createObjectURL</code> chaqiruvi brauzer xotirasida Blobga <strong>ishora</strong> saqlaydi. Blob bu ishora tirik ekan, xotiradan tozalanmaydi — bu <em>xotira sizishi</em>ga (memory leak) olib keladi. Ishlatib bo'lgach, albatta <code>URL.revokeObjectURL(url)</code> chaqiring." },
        { code: "let url = URL.createObjectURL(blob);\n\n// ... url ishlatildi ...\n\nURL.revokeObjectURL(url); // xotirani bo'shatamiz" },

        { h2: "Faylni yuklab olish" },
        { p: "Blob va object URL yordamida foydalanuvchiga faylni yuklab olishni taklif qilish mumkin. Buning uchun <code>&lt;a&gt;</code> elementiga <code>download</code> atributini qo'yamiz va uni dasturiy bosamiz:" },
        { code: "function faylniYuklab(matn, faylNomi) {\n  let blob = new Blob([matn], { type: \"text/plain\" });\n  let url = URL.createObjectURL(blob);\n\n  let a = document.createElement(\"a\");\n  a.href = url;\n  a.download = faylNomi; // yuklab olinadigan fayl nomi\n\n  document.body.appendChild(a);\n  a.click();               // dasturiy bosamiz\n  document.body.removeChild(a);\n\n  URL.revokeObjectURL(url); // tozalaymiz\n}\n\nfaylniYuklab(\"Salom, dunyo!\", \"salom.txt\");" },
        { note: "<code>download</code> atributi mavjud bo'lsa, brauzer havolani ochish o'rniga faylni yuklab oladi. Atribut qiymati — taklif qilinadigan fayl nomi. Bu usul serverga murojaat qilmasdan, mijoz tomonda fayl yaratishning eng oddiy yo'li." },

        { h2: "Blobni rasmga aylantirish" },
        { p: "Blobning katta ustunligi — undan bevosita rasm ko'rsatish mumkin. Object URLni <code>&lt;img&gt;</code>ga bersangiz kifoya:" },
        { code: "// masalan, fetch orqali kelgan rasm Blob'i\nlet response = await fetch(\"rasm.png\");\nlet blob = await response.blob();\n\nlet img = document.createElement(\"img\");\nimg.src = URL.createObjectURL(blob);\ndocument.body.appendChild(img);\n\n// rasm yuklangach URLni tozalash\nimg.onload = () => URL.revokeObjectURL(img.src);" },
        { p: "Teskari yo'nalish ham mumkin: <code>&lt;canvas&gt;</code> tarkibini <code>canvas.toBlob(callback, type)</code> orqali Blobga aylantirib, so'ng yuklab olish yoki serverga jo'natish mumkin:" },
        { code: "canvas.toBlob(function(blob) {\n  let url = URL.createObjectURL(blob);\n\n  let a = document.createElement(\"a\");\n  a.href = url;\n  a.download = \"rasm.png\";\n  a.click();\n\n  URL.revokeObjectURL(url);\n}, \"image/png\");" },
        { tip: "<code>canvas.toBlob</code> asinxron (callback bilan), <code>canvas.toDataURL</code> esa sinxron va base64 satr qaytaradi. Katta rasmlar uchun <code>toBlob</code> tejamkorroq, chunki base64 ma'lumotni ~33% ga kattalashtiradi." },

        { h2: "Blob va ArrayBuffer o'zaro" },
        { p: "Blob va past darajali <code>ArrayBuffer</code> o'rtasida oson o'tish mumkin. Blobdan baytlarni olish uchun uning metodlari ishlatiladi:" },
        { ul: [
          "<code>await blob.arrayBuffer()</code> — Blob mazmunini <code>ArrayBuffer</code> ko'rinishida qaytaradi;",
          "<code>await blob.text()</code> — Blob mazmunini matn (UTF-8) sifatida qaytaradi;",
          "<code>blob.stream()</code> — Blobni o'qish oqimi (ReadableStream) sifatida beradi."
        ] },
        { code: "let blob = new Blob([\"Hello\"], { type: \"text/plain\" });\n\nlet buffer = await blob.arrayBuffer();\nlet bytes = new Uint8Array(buffer);\nconsole.log(bytes[0]); // 72 (H)\n\nlet matn = await blob.text();\nconsole.log(matn); // Hello" },

        { h2: "Xulosa" },
        { ul: [
          "<code>Blob</code> — ikkilik ma'lumot + MIME turini saqlovchi brauzer obyekti;",
          "<code>new Blob(parts, {type})</code> — satr, ArrayBuffer, TypedArray yoki boshqa Bloblardan yasaladi;",
          "<code>blob.size</code> va <code>blob.type</code> — asosiy xususiyatlar; Blob o'zgarmas;",
          "<code>blob.slice(...)</code> — bo'laklash (masalan chunked upload uchun);",
          "<code>URL.createObjectURL(blob)</code> — Blobga <code>blob:</code> havola; <code>revokeObjectURL</code> bilan tozalash <strong>shart</strong>;",
          "<code>download</code> atributi bilan fayl yuklab olish, <code>&lt;img&gt;</code>ga URL berib rasm ko'rsatish mumkin;",
          "<code>blob.arrayBuffer()</code>, <code>blob.text()</code> — Blobdan past darajali ma'lumotga o'tish."
        ] }
      ]
    },

    {
      slug: "file-filereader",
      title: "File va FileReader",
      blurb: "Foydalanuvchi tanlagan fayllar bilan ishlash: File obyekti (input.files), FileReader bilan faylni o'qish (readAsText, readAsDataURL, readAsArrayBuffer) va yuklash jarayonini kuzatish.",
      body: [
        { lead: "Foydalanuvchi kompyuteridagi faylni brauzerga yuklaganida (masalan <code>&lt;input type=\"file\"&gt;</code> orqali), biz <code>File</code> obyektini olamiz. <code>File</code> — bu <code>Blob</code>ning kengaytirilgan ko'rinishi bo'lib, unga fayl nomi va o'zgartirilgan sanasi qo'shilgan. Fayl mazmunini o'qish uchun esa <code>FileReader</code> ishlatiladi. Bularning barchasi brauzerga xos, shuning uchun quyidagi misollar brauzer muhitiga oid." },

        { h2: "File obyekti" },
        { p: "<code>File</code> — <code>Blob</code>dan meros oladi, shuning uchun uning barcha xususiyatlari (<code>size</code>, <code>type</code>, <code>slice</code>) mavjud, plyus qo'shimchalari:" },
        { ul: [
          "<code>name</code> — fayl nomi (masalan <code>rasm.png</code>);",
          "<code>lastModified</code> — oxirgi o'zgartirilgan vaqt (timestamp, millisekundlarda);",
          "<code>size</code> — fayl hajmi baytlarda (Blobdan meros);",
          "<code>type</code> — MIME turi (Blobdan meros)."
        ] },
        { p: "File obyektini konstruktor orqali ham yasash mumkin, lekin amaliyotda ko'proq foydalanuvchi tanlovi orqali olinadi:" },
        { code: "// File ni to'g'ridan-to'g'ri yaratish (kam ishlatiladi)\nlet file = new File([\"salom\"], \"hello.txt\", {\n  type: \"text/plain\",\n  lastModified: Date.now()\n});\n\nconsole.log(file.name);         // hello.txt\nconsole.log(file.size);         // 5\nconsole.log(file.type);         // text/plain" },

        { h2: "input.files orqali fayl olish" },
        { p: "Amaliyotda File obyektlari <code>&lt;input type=\"file\"&gt;</code> elementidan olinadi. Foydalanuvchi fayl tanlagach, <code>input.files</code> — <code>FileList</code> (fayllar ro'yxati) to'ldiriladi:" },
        { code: "// HTML: <input type=\"file\" id=\"tanlov\" multiple>\n\nlet input = document.getElementById(\"tanlov\");\n\ninput.addEventListener(\"change\", function() {\n  let files = input.files; // FileList\n\n  console.log(\"Tanlangan fayllar: \" + files.length);\n\n  for (let file of files) {\n    console.log(file.name + \" - \" + file.size + \" bayt\");\n  }\n});" },
        { note: "<code>multiple</code> atributi bir nechta fayl tanlashga imkon beradi. <code>files</code> — <code>FileList</code> obyekti, u massivga o'xshaydi (indeks va <code>length</code> bor), lekin toza massiv emas. Kerak bo'lsa <code>Array.from(files)</code> bilan massivga o'giring." },
        { tip: "Fayllarni <em>tortib tashlash</em> (drag and drop) orqali ham olish mumkin: <code>drop</code> hodisasida <code>event.dataTransfer.files</code> ham <code>FileList</code> qaytaradi — xuddi <code>input.files</code>dek ishlaydi." },

        { h2: "FileReader: faylni o'qish" },
        { p: "<code>File</code> (yoki <code>Blob</code>) mazmunini o'qish uchun <code>FileReader</code> ishlatiladi. Bu — asinxron obyekt bo'lib, faylni o'qib bo'lgach hodisa (event) chaqiradi:" },
        { code: "let reader = new FileReader();" },
        { p: "FileReaderning o'qish metodlari fayl mazmunini turli formatda beradi:" },
        { ul: [
          "<code>readAsText(file, [encoding])</code> — faylni matn (satr) sifatida o'qiydi (standart UTF-8);",
          "<code>readAsArrayBuffer(file)</code> — faylni ikkilik <code>ArrayBuffer</code> sifatida o'qiydi;",
          "<code>readAsDataURL(file)</code> — faylni base64 <code>data:</code> URL sifatida o'qiydi;",
          "<code>readAsBinaryString(file)</code> — har bir baytni belgi sifatida o'qiydi (eskirgan, ishlatmang)."
        ] },
        { p: "O'qish asinxron bo'lgani uchun natija to'g'ridan-to'g'ri qaytarilmaydi — u <em>hodisalar</em> orqali keladi:" },
        { ul: [
          "<code>load</code> — o'qish muvaffaqiyatli tugadi; natija <code>reader.result</code>da;",
          "<code>error</code> — o'qishda xatolik; sabab <code>reader.error</code>da;",
          "<code>progress</code> — o'qish davomida vaqti-vaqti bilan chaqiriladi;",
          "<code>loadend</code> — o'qish tugadi (muvaffaqiyat yoki xatolikdan qat'i nazar)."
        ] },

        { h2: "readAsText: matnli faylni o'qish" },
        { p: "Matnli faylni o'qishning to'liq misoli:" },
        { code: "let input = document.getElementById(\"tanlov\");\n\ninput.addEventListener(\"change\", function() {\n  let file = input.files[0];\n  let reader = new FileReader();\n\n  reader.onload = function() {\n    // o'qish tugadi, natija reader.result da\n    console.log(reader.result);\n  };\n\n  reader.onerror = function() {\n    console.log(\"Xatolik: \" + reader.error);\n  };\n\n  reader.readAsText(file); // o'qishni boshlaymiz\n});" },
        { warn: "<code>readAsText</code> (va boshqa <code>readAs...</code>) metodlari <strong>darhol natija qaytarmaydi</strong>. Ular o'qishni boshlaydi va tugagach <code>onload</code>ni chaqiradi. Natijaga <code>onload</code> ichida murojaat qiling — <code>readAsText</code> chaqiruvidan keyin darhol <code>reader.result</code> hali <code>null</code> bo'ladi." },

        { h2: "readAsDataURL: rasmni ko'rsatish" },
        { p: "<code>readAsDataURL</code> faylni <code>data:</code> URL (base64) ko'rinishida beradi. Bu, ayniqsa, tanlangan rasmni yuklashdan oldin <em>oldindan ko'rsatish</em> (preview) uchun qulay:" },
        { code: "let input = document.getElementById(\"rasmTanlov\");\n\ninput.addEventListener(\"change\", function() {\n  let file = input.files[0];\n  let reader = new FileReader();\n\n  reader.onload = function() {\n    // natija: data:image/png;base64,iVBORw0KGgo...\n    let img = document.createElement(\"img\");\n    img.src = reader.result;\n    document.body.appendChild(img);\n  };\n\n  reader.readAsDataURL(file);\n});" },
        { note: "<code>data:</code> URL rasmni to'liq base64 satr sifatida saqlaydi — serverga murojaat qilmaydi. Kichik rasmlar uchun qulay, lekin base64 ma'lumot hajmini ~33% oshiradi. Katta fayllar uchun <code>URL.createObjectURL(file)</code> tejamkorroq (u ham to'g'ridan-to'g'ri File bilan ishlaydi)." },

        { h2: "readAsArrayBuffer: ikkilik o'qish" },
        { p: "Fayl baytlarini past darajada qayta ishlash kerak bo'lsa (masalan, fayl formatini tahlil qilish, sarlavhani o'qish), <code>readAsArrayBuffer</code> ishlatiladi:" },
        { code: "let file = input.files[0];\nlet reader = new FileReader();\n\nreader.onload = function() {\n  let buffer = reader.result;      // ArrayBuffer\n  let bytes = new Uint8Array(buffer);\n\n  // masalan, PNG sarlavhasini tekshiramiz\n  // PNG fayllari 0x89 0x50 0x4E 0x47 bilan boshlanadi\n  let isPng = bytes[0] === 0x89 &&\n              bytes[1] === 0x50 &&\n              bytes[2] === 0x4E &&\n              bytes[3] === 0x47;\n\n  console.log(\"PNG fayli: \" + isPng);\n};\n\nreader.readAsArrayBuffer(file);" },
        { tip: "Katta faylning faqat bir qismini o'qish kerak bo'lsa, avval <code>file.slice(0, 100)</code> bilan bo'lak oling, so'ng shu Blobni <code>readAsArrayBuffer</code>ga bering. Butun faylni o'qish shart emas — bu tezroq va xotira tejaydi." },

        { h2: "Yuklash jarayonini kuzatish (progress)" },
        { p: "Katta faylni o'qiganda foydalanuvchiga jarayon foizini ko'rsatish uchun <code>progress</code> hodisasi ishlatiladi. Uning obyektida <code>loaded</code> (o'qilgan baytlar) va <code>total</code> (jami baytlar) bor:" },
        { code: "let reader = new FileReader();\n\nreader.onprogress = function(event) {\n  if (event.lengthComputable) {\n    let foiz = Math.round((event.loaded / event.total) * 100);\n    console.log(\"O'qildi: \" + foiz + \"%\");\n  }\n};\n\nreader.onload = function() {\n  console.log(\"Tugadi!\");\n};\n\nreader.readAsArrayBuffer(file);" },
        { note: "<code>event.lengthComputable</code> — jami hajm oldindan ma'lummi degan bayroq. Agar u <code>false</code> bo'lsa, foizni hisoblab bo'lmaydi (<code>total</code> noaniq). Lokal fayllar uchun odatda <code>true</code> bo'ladi." },

        { h2: "O'qishni to'xtatish" },
        { p: "Boshlangan o'qishni <code>reader.abort()</code> bilan bekor qilish mumkin. Bu, masalan, foydalanuvchi katta faylni tanlab, so'ng fikridan qaytganda kerak bo'ladi:" },
        { code: "let reader = new FileReader();\nreader.readAsArrayBuffer(katta_fayl);\n\n// keyinroq, kerak bo'lmay qolsa:\nreader.abort(); // o'qishni to'xtatamiz\n\nreader.onabort = function() {\n  console.log(\"O'qish bekor qilindi\");\n};" },

        { h2: "FileReader va Blob" },
        { p: "<code>FileReader</code> nafaqat <code>File</code>, balki har qanday <code>Blob</code>ni o'qiy oladi — chunki <code>File</code> Blobdan meros oladi. Shuning uchun <code>fetch</code>dan kelgan Blobni ham FileReader bilan o'qish mumkin. Lekin zamonaviy kodda Blobning o'z <code>await blob.text()</code> / <code>await blob.arrayBuffer()</code> metodlari qulayroq — ular Promise qaytaradi va <code>async/await</code> bilan toza yoziladi." },
        { tip: "Yangi kodda faylni o'qish uchun ko'pincha <code>await file.text()</code> yoki <code>await file.arrayBuffer()</code> yetarli — FileReader shart emas. FileReader esa <code>progress</code> hodisasi kerak bo'lganda yoki eski brauzerlarni qo'llab-quvvatlashda foydali bo'lib qoladi." },

        { h2: "Xulosa" },
        { ul: [
          "<code>File</code> — <code>Blob</code>ning kengaytmasi; qo'shimcha <code>name</code> va <code>lastModified</code> xususiyatlari bor;",
          "Fayllar <code>input.files</code> (FileList) yoki drag-and-drop orqali olinadi;",
          "<code>FileReader</code> — faylni asinxron o'qiydi; natija hodisalar orqali keladi;",
          "<code>readAsText</code>, <code>readAsDataURL</code>, <code>readAsArrayBuffer</code> — turli formatlarda o'qish;",
          "Natija <code>reader.result</code>da, faqat <code>onload</code> ishlagach mavjud bo'ladi;",
          "<code>progress</code> hodisasi bilan yuklash foizini kuzatish, <code>abort()</code> bilan to'xtatish mumkin;",
          "Zamonaviy kodda ko'pincha <code>await file.text()</code> / <code>file.arrayBuffer()</code> yetarli."
        ] }
      ]
    }
  ]
};
