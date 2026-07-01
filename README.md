# JavaScript.info — O'zbekcha variant

Zamonaviy JavaScript dasturlash tilini **o'zbek tilida** noldan o'rgatuvchi
interaktiv o'quv sayti. [javascript.info](https://javascript.info) uslubidan
ilhomlangan, mustaqil (framework va build talab qilmaydigan) statik veb-sayt.

## Xususiyatlari

- 🇺🇿 To'liq o'zbek tilida yozilgan darslar;
- ▶️ **Interaktiv kod maydonchalari** — misollarni to'g'ridan-to'g'ri brauzerda
  tahrirlab, ishga tushirish mumkin (`console.log` natijalari ko'rsatiladi);
- 📱 Moslashuvchan (responsive) dizayn — telefon va kompyuterda ishlaydi;
- ⚡ Hech qanday tashqi kutubxona yoki o'rnatish talab qilinmaydi — sof
  HTML, CSS va JavaScript.

## Darslar

| # | Dars | Mavzu |
|---|------|-------|
| 1 | [Kirish](lessons/kirish.html) | JavaScript nima, birinchi dastur |
| 2 | [O'zgaruvchilar](lessons/ozgaruvchilar.html) | `let`, `const`, `var` |
| 3 | [Ma'lumot turlari](lessons/malumot-turlari.html) | Number, String, Boolean |
| 4 | [Operatorlar](lessons/operatorlar.html) | Arifmetik, taqqoslash, mantiqiy |
| 5 | [Shart operatorlari](lessons/shartlar.html) | `if`, `else`, `switch` |
| 6 | [Sikllar](lessons/sikllar.html) | `for`, `while`, `break`, `continue` |
| 7 | [Funksiyalar](lessons/funksiyalar.html) | Parametrlar, `return`, strelka funksiyalari |
| 8 | [Massivlar](lessons/massivlar.html) | Ro'yxatlar, `map`, `filter` |

## Ishga tushirish

Loyiha statik sayt bo'lgani uchun uni ishga tushirishning bir necha usuli bor:

**1. Oddiy usul** — `index.html` faylini brauzerda ochish kifoya.

**2. Mahalliy server** (tavsiya etiladi):

```bash
# Python bilan
python3 -m http.server 8000

# yoki Node.js bilan
npx serve
```

So'ngra brauzerda `http://localhost:8000` manzilini oching.

## Loyiha tuzilishi

```
JavaScript-info/
├── index.html          # Bosh sahifa (darslar mundarijasi)
├── css/
│   └── style.css       # Umumiy uslublar
├── js/
│   └── main.js         # Interaktiv playground va menyu logikasi
├── lessons/            # Dars sahifalari
│   ├── kirish.html
│   ├── ozgaruvchilar.html
│   ├── malumot-turlari.html
│   ├── operatorlar.html
│   ├── shartlar.html
│   ├── sikllar.html
│   ├── funksiyalar.html
│   └── massivlar.html
└── README.md
```

## Interaktiv kod maydonchasi

Har bir darsdagi kod bloklarini tahrirlab, **"Ishga tushirish"** tugmasini
bosish (yoki `Ctrl+Enter`) orqali natijani darhol ko'rishingiz mumkin.
Kod izolyatsiya qilingan muhitda ishlaydi va `console.log` chiqishi
maydoncha ostida ko'rsatiladi.

## Litsenziya

Ta'lim maqsadida yaratilgan ochiq loyiha.
