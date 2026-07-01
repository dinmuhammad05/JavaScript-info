# JavaScript.info — O'zbekcha variant

Zamonaviy JavaScript'ni **o'zbek tilida** noldan, chuqur va batafsil o'rgatuvchi
interaktiv o'quv sayti. [javascript.info](https://javascript.info) o'quv dasturi
tuzilishiga asoslangan; mustaqil (framework va build talab qilmaydigan) statik
veb-sayt bo'lib, oddiy Node.js generatoridan foydalanadi.

## Xususiyatlari

- 🇺🇿 **165 ta dars**, to'liq o'zbek tilida, to'rt qismga bo'lingan;
- ▶️ **559 ta interaktiv kod maydonchasi** — misollarni to'g'ridan-to'g'ri
  brauzerda tahrirlab, ishga tushirish mumkin (`console.log` natijalari
  ko'rsatiladi);
- 📱 Moslashuvchan (responsive) dizayn, bob bo'yicha yig'iladigan yon menyu,
  breadcrumb va oldingi/keyingi dars navigatsiyasi;
- ⚡ Tashqi kutubxonasiz — sof HTML, CSS va JavaScript;
- 🛠 **Ma'lumotga asoslangan generator**: darslar `content/` papkasidagi blok
  formatli fayllarda saqlanadi, `build.js` ulardan bir xil dizaynli sahifalar
  yasaydi. Yangi mavzu qo'shish oson.

## O'quv dasturi

### 1-qism: JavaScript tili (14 bob, 91 dars)
Kirish · JavaScript asoslari · Kod sifati · Obyektlar (asoslar) · Ma'lumot
turlari · Funksiyalar bilan chuqur ishlash · Obyekt xossalari konfiguratsiyasi ·
Prototiplar va meros · Klasslar · Xatoliklarni boshqarish · Promise, async/await ·
Generatorlar · Modullar · Qo'shimcha mavzular (Proxy, BigInt, Unicode...).

### 2-qism: Brauzer — hujjat, hodisalar, interfeyslar (7 bob)
Hujjat (DOM) · Hodisalarga kirish · UI hodisalari · Formalar · Hujjat va resurs
yuklanishi · Qo'shimcha (event loop, mutation observer...).

### 3-qism: Qo'shimcha bo'limlar (6 bob)
Oynalar va freymlar · Ikkilik ma'lumot va fayllar · Tarmoq so'rovlari
(fetch, WebSocket) · Brauzerda ma'lumot saqlash (cookie, localStorage,
IndexedDB) · Muntazam ifodalar (RegExp).

### 4-qism: Amaliy vositalar (DevOps)
**Git va GitHub** (versiya nazorati, o'rnatish, asosiy buyruqlar, branch/merge,
remote/push/pull, jamoa bilan ishlash — fork va Pull Request, .gitignore/stash) ·
**Docker** (konteynerlar, o'rnatish, buyruqlar, Dockerfile, Docker Compose,
volume/network) · **Nginx** (veb-server, o'rnatish, konfiguratsiya, statik sayt,
reverse proxy va load balancing, SSL/HTTPS).

## Ishga tushirish

Sayt statik bo'lgani uchun `index.html` ni brauzerda ochish kifoya. Mahalliy
server orqali (tavsiya etiladi):

```bash
python3 -m http.server 8000
# yoki
npx serve
```

So'ng brauzerda `http://localhost:8000` manzilini oching.

## Saytni qayta yaratish (build)

Darslar `content/` papkasidagi ma'lumot fayllaridan generatsiya qilinadi:

```bash
node build.js
```

Bu `index.html` va `lessons/*.html` sahifalarini qaytadan yasaydi.

## Loyiha tuzilishi

```
JavaScript-info/
├── index.html          # Bosh sahifa (generatsiya qilinadi)
├── build.js            # Statik sayt generatori
├── content/            # Dars ma'lumotlari (bob fayllari)
│   ├── p1-*.js         #   1-qism boblari
│   ├── p2-*.js         #   2-qism boblari
│   └── p3-*.js         #   3-qism boblari
├── lessons/            # Generatsiya qilingan dars sahifalari
├── css/style.css       # Uslublar
├── js/main.js          # Playground va menyu logikasi
└── README.md
```

## Kontent formati

Har bir bob fayli — Node.js moduli. Dars tanasi bloklar massivi sifatida
yoziladi (`{h2}`, `{p}`, `{code}`, `{pg}` interaktiv kod, `{note}`/`{tip}`/
`{warn}` va h.k.), generator esa ularni HTML'ga aylantiradi. Bu yangi dars yoki
mavzu qo'shishni ancha soddalashtiradi.

## Litsenziya

Ta'lim maqsadida yaratilgan ochiq loyiha. javascript.info o'quv dasturi
tuzilishidan ilhomlangan.
