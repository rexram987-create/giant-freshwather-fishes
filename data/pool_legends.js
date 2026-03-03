<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>אגדות האגם המפלצתי - OFR</title>
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;700;900&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Heebo', sans-serif;
            background-color: #0f172a; /* Slate 900 - Deep Dark Mode */
            color: #f8fafc;
        }
        /* Custom scrollbar for webkit */
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #1e293b; }
        ::-webkit-scrollbar-thumb { background: #3b82f6; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: #60a5fa; }

        /* Image hover effect */
        .img-container {
            cursor: pointer;
            overflow: hidden;
        }
        .img-container img {
            transition: transform 0.5s ease;
        }
        .img-container:hover img {
            transform: scale(1.05);
        }
        .img-overlay {
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        .img-container:hover .img-overlay {
            opacity: 1;
        }
    </style>
</head>
<body class="antialiased pb-12">

    <!-- Header -->
    <header class="bg-slate-800 p-6 mb-8 border-b border-slate-700">
        <div class="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
                <h1 class="text-2xl md:text-3xl font-black text-cyan-400 tracking-tight">האגם המפלצתי (OFR)</h1>
                <p class="text-slate-400 text-sm mt-1">קטלוג דיירים מעודכן ומורחב • מותאם ל-Samsung S25 Ultra</p>
            </div>
            <div class="text-sm bg-slate-800 px-4 py-2 rounded-full border border-slate-700 text-cyan-200 shadow-inner">
                סה"כ דיירים מתועדים: <span id="fishCount" class="font-bold text-white">0</span>
            </div>
        </div>
    </header>

    <!-- Main Content Grid -->
    <main class="max-w-4xl mx-auto px-4 space-y-8" id="fishContainer">
        <!-- Fish Cards will be injected here by JS -->
    </main>

    <!-- Image Modal (Lightbox) -->
    <div id="imageModal" class="fixed inset-0 z-50 bg-black/95 hidden flex-col items-center justify-center p-4 transition-opacity duration-300 opacity-0" onclick="closeModal()">
        <button class="absolute top-6 right-6 text-slate-400 hover:text-white text-4xl font-light focus:outline-none" onclick="closeModal()">&times;</button>
        <div class="relative max-w-full max-h-full flex flex-col items-center">
            <img id="modalImg" src="" alt="Enlarged Image" class="max-w-full max-h-[80vh] object-contain rounded-xl shadow-2xl border border-slate-700" onclick="event.stopPropagation()">
            <div class="mt-6 text-center" onclick="event.stopPropagation()">
                <h3 id="modalTitle" class="text-2xl font-bold text-cyan-400"></h3>
                <p id="modalCredit" class="text-slate-400 mt-1"></p>
            </div>
        </div>
    </div>

    <script>
        // Data Source - All 10 Items Maintained with EXPANDED lore and research backgrounds
        const fishData_PoolLegends = [
            {
                id: 4, name: `אראפאימה ענקית`, scientificName: `Arapaima Gigas`, image: `https://i.postimg.cc/gJgw8k8g/1770654217606.png`,
                etymology: `השם "אראפאימה" מקורו בשפות הילידים של גיאנה והוא הלחם של המילים "ארא" (תוכי מקאו אדום) ו-"פאימה" (דג). בברזיל הוא מכונה "פירארוקו" (Pirarucu), שמשמעותו בשפת הטופי "דג אדום" (Pira=דג, Urucu=אדום). תוספת השם המדעי "Gigas" מגיעה מיוונית ופירושה "ענק", מה שמעיד על הממדים העצומים שאליו הדג מגיע ומבדיל אותו ממיני אראפאימה קטנים יותר.`,
                expeditionBackground: `בתחילת המאה ה-19, אירופה חוותה תור זהב של חקר יבשת אמריקה הדרומית. משלחות מומנו על ידי מוסדות לאומיים במטרה למפות את עולם החי הלא-נודע של אגן האמזונס, אזור שנחשב באותה תקופה לגן עדן פראי, מסוכן ומסתורי ביותר.`,
                expeditionGoal: `המטרה העיקרית של המשלחת שסיפקה את הדגימות הייתה לקטלג מגה-פאונה (חיות ענק) בעולם החדש, ולמצוא הוכחות למינים קדומים שהצליחו לשרוד בסביבות מבודדות, במטרה להעשיר את אוספי המוזיאונים הלאומיים באירופה.`,
                childhood: `בשלבי החיים הראשונים, הדגיגים תלויים לחלוטין בהוריהם בסביבה העוינת של הנהר. הזכר מפריש מבלוטות מיוחדות בראשו נוזל לבן וסמיך דמוי חלב המכיל פרומונים. נוזל זה משמש כסמן כימי המושך את הדגיגים ומנחה אותם להישאר צמודים לראשו של האב, אשר מגן עליהם באגרסיביות מפני כל איום פוטנציאלי.`,
                behavior: `מדובר בשורד קיצוני המותאם לחיים במים דלים בחמצן ובביצות עכורות. לדג יש שלפוחית אוויר מפותחת שמתפקדת ממש כמו ריאה פרימיטיבית. כתוצאה מכך, הוא נאלץ לעלות לפני המים בכל 10 עד 20 דקות כדי לשאוב אוויר אטמוספרי בקול נשיפה אדיר שנשמע למרחקים וחושף את מיקומו.`,
                achievements: `מעבר להיותו אחד מדגי המים המתוקים הגדולים בעולם, האראפאימה מציג פלא הנדסי-ביולוגי: קשקשיו בנויים משכבה חיצונית מינרלית קשה ושכבה פנימית גמישה של קולגן. מבנה זה הופך אותם לחסינים לחלוטין לנשיכות פיראנות, וכיום הם משמשים מודל ביו-מימטי לפיתוח אפודי מגן מתקדמים לכוחות ביטחון.`,
                discoveryCircumstances: `הדג תואר מדעית לראשונה בשנת 1822 על ידי הזואולוג השוויצרי היינריך רודולף שיינץ, שהיה המום מממדי הדגימה שהובאה אליו. בתחילה, עקב יכולת נשימת האוויר שלו והקשקשים דמויי השריון, הוא נחשב על ידי חוקרים מסוימים כחוליה מקשרת אבולוציונית מסתורית בין דגים קדומים לזוחלים.`,
                size: `4.5 מטרים`, weight: `200 קילוגרם`, lifespan: `20 שנים`, origin: `אגן האמזונס`, discoverer: `Heinrich Rudolf Schinz`, year: `1822`, eggs: `50,000`, conservation: `DD`, diet: `דגים, רכיכות ויונקים קטנים`, hunting: `שאיבת ואקום עוצמתית ממארב`, reproduction: `בניית קני ענק בחול הרדוד ושמירה אגרסיבית`
            },
            {
                id: 2, name: `אליגטור גאר`, scientificName: `Atractosteus spatula`, image: `https://i.postimg.cc/Wt538744/1770700430718.png`,
                etymology: `שמו העממי ניתן לו עקב הדמיון המובהק של הלסתות הארוכות ומשובצות השיניים שלו לאלו של אליגטור אמריקאי. המילה "Gar" מגיעה מאנגלית עתיקה ומשמעותה חנית או רומח. במישור המדעי, Atractosteus מורכב מהמילים היווניות "אטרקטוס" (פלך/חץ) ו-"אוסטאון" (עצם). המילה Spatula בלטינית מתארת צורה שטוחה דמוית כף, המתייחסת למבנה החרטום הייחודי שלו.`,
                expeditionBackground: `לאחר רכישת לואיזיאנה בשנת 1803, ממשלת צרפת והקהילה המדעית הבינלאומית גילו עניין עצום במיפוי וסיווג החי והצומח בשטחי הפרא העצומים של צפון אמריקה ואגן נהר המיסיסיפי.`,
                expeditionGoal: `חוקרי הטבע של התקופה שמו לעצמם למטרה לתעד את המינים ה"מפלצתיים" והזרים שדווחו על ידי מתיישבים וציידים מקומיים. המטרה הייתה יצירת קטלוג אנטומי מקיף של טורפי המים המתוקים של העולם החדש.`,
                childhood: `ההישרדות בשלבים הראשונים מובטחת באמצעות מנגנון הגנה כימי קיצוני - ביצי האליגטור גאר הן רעילות ביותר ליונקים וציפורים. לאחר הבקיעה, הדגיגים הזעירים מצוידים בדיסקית דביקה וייחודית בראשם, בעזרתה הם נצמדים בחוזקה לצמחיית מים בימיהם הראשונים כדי לא להיסחף בזרם.`,
                behavior: `טורף מארב פסיבי וקר רוח להחריד. הוא מסוגל לצוף בסמוך לפני המים במשך שעות ארוכות ללא נוע, נראה בדיוק כמו בול עץ צף או ענף מת. כמו כן, בזכות שלפוחית אוויר ייחודית, הוא מסוגל לנשום אוויר אטמוספרי, מה שמאפשר לו לשגשג בבריכות חמות ודלות בחמצן.`,
                achievements: `זהו מאובן חי אמיתי ושריד פרהיסטורי מרשים שהצליח לשרוד למעלה מ-100 מיליון שנה כמעט ללא שום שינוי אבולוציוני. גופו עטוף בקשקשי גנואיד קשים כיהלום ומשתלבים כמעוינים, שבעבר שימשו שבטים ילידים באמריקה להכנת ראשי חצים חודרניים, כלים ולשריון גוף.`,
                discoveryCircumstances: `תואר לראשונה באופן פורמלי ב-1803 על ידי המלומד הצרפתי ברנאר ז'רמן דה לאספד. לאספד ביסס את מחקרו על דגימות שנשלחו למוזיאון הלאומי בפריז, והיה מרותק מהמבנה הגרמי הקדום של הדג שלא דמה לאף דג אירופאי מוכר.`,
                size: `3 מטרים`, weight: `160 קילוגרם`, lifespan: `50+ שנים`, origin: `אגן המיסיסיפי ומפרץ מקסיקו`, discoverer: `Bernard Germain de Lacépède`, year: `1803`, eggs: `150,000 (ביצים רעילות)`, conservation: `LC`, diet: `דגים איטיים, עופות מים וצבים זעירים`, hunting: `מארב דומם ותקיפה צידית מהירה`, reproduction: `הטלה המונית במים רדודים וצמחייה צפופה`
            },
            {
                id: 21, name: `כריש פרון`, scientificName: `Pangasius sanitwongsei`, image: `https://i.postimg.cc/Y0G0RFWb/Pangasius-sanitwongsei-1.jpg`,
                etymology: `הכינוי "כריש" ניתן לו בטעות על ידי סוחרי דגים עקב סנפיר הגב העליון והמחודד שלו שמזכיר מאוד סנפיר של כריש אמיתי, על אף שהוא בכלל ממשפחת השפמנונים. השם המדעי הפותח, Pangasius, הוא וריאציה על שם מקומי ווייטנאמי/תאילנדי למשפחת דגים זו. השם הספציפי sanitwongsei הוענק כאות כבוד והוקרה לנסיך והמלומד התאילנדי, פראיה סניטוואנגסה, על תרומתו לחקר הטבע במדינתו.`,
                expeditionBackground: `בשנות ה-30 של המאה ה-20, ממשלת תאילנד (אז סיאם) הזמינה מומחי דיג אמריקאים מובילים למפות את משאבי הטבע והמים של הממלכה, מתוך הבנה שהנהרות מספקים את עיקר מקור החלבון של התושבים.`,
                expeditionGoal: `המטרה המרכזית של המשלחת הייתה ביצוע סקר מקיף של הדגה באגן נהר המקונג, סיווג מדעי של מינים כלכליים חשובים, ופיתוח תוכניות מודרניות לחקלאות מים ודיג בר-קיימא בנהרות סיאם.`,
                childhood: `כדי לשרוד בזרמים האדירים והמסוכנים של נהר המקונג, הדגיגים מתאגדים ונודדים בלהקות צפופות וענקיות. הם חווים פרץ גדילה מואץ וחסר תקדים בחודשים הראשונים לחייהם, במטרה להפוך לגדולים מספיק כדי לא להוות טרף לטורפים האחרים בנהר.`,
                behavior: `שחיין פלאגי (של מים פתוחים) אקטיבי, תזזיתי וחסר מנוחה לחלוטין. הוא נמצא בתנועה מתמדת, סורק את מרחבי המים. בבריכת ה-OFR שלנו, נוכחותם של כרישי הפרון מכתיבה את הקצב ומוסיפה תנועה דינמית ובלתי פוסקת במרכז הבריכה, המונעת מהמים לקפוא על שמריהם.`,
                achievements: `נחשב לאחד המינים החזקים, המהירים והעוצמתיים ביותר מבין דגי המים המתוקים של יבשת אסיה. למרבה הצער, הישגו השלילי הוא היותו אחד הדגים המאוימים בעולם; הוא סובל מדיג יתר מסיבי ומהקמת סכרים שחוסמים את צירי הנדידה שלו, ונמצא כיום בסכנת הכחדה קריטית בטבע.`,
                discoveryCircumstances: `תואר וקוטלג באופן רשמי בשנת 1931 על ידי חוקר הטבע יו מקורמיק סמית', ששימש כיועץ הדיג הראשי לממשלת תאילנד. סמית' גילה את מין הענק במהלך סיוריו בשוקי הדגים המקומיים שלאורך המקונג, שם ראה פרטים עצומים שטרם תוארו בספרות המדעית.`,
                size: `3 מטרים`, weight: `300 קילוגרם`, lifespan: `20+ שנים`, origin: `אגן נהר המקונג והצ'או פראיה`, discoverer: `Hugh McCormick Smith`, year: `1931`, eggs: `100,000`, conservation: `CR`, diet: `דגים קטנים, סרטנים ופגרי חיות`, hunting: `מרדף אקטיבי ומהיר במים הפתוחים`, reproduction: `נדידה ארוכה ורבת-סיכונים במעלה הזרם`
            },
            {
                id: 27, name: `שפמנון אדום-זנב`, scientificName: `Phractocephalus hemioliopterus`, image: `https://i.postimg.cc/XJsZd7dg/1770654204024.png`,
                etymology: `שמו העממי "אדום זנב" ניתן לו עקב הצבע האדום העז והבולט של סנפיר הזנב וסנפירי הגחון שלו. מבחינה מדעית, השם סבוך ומעיד על מאפייניו: Phractocephalus מורכב מהמילים היווניות "פרקטוס" (מגודר/משוריין) ו-"קפלוס" (ראש), המתארות את הלוחות הגרמיים שעל ראשו. המילה hemioliopterus משלבת את "המי" (חצי), "הולוס" (שלם) ו-"פטרון" (סנפיר).`,
                expeditionBackground: `המעבר מהמאה ה-18 למאה ה-19 אופיין בניסיון עולמי ליצור שיטות מיון בוטניות וזואולוגיות אוניברסליות. חוקרים אירופאים קיבלו מימון כבד כדי לאסוף נתונים ודגימות מכל קצוות תבל ליצירת האנציקלופדיות הזואולוגיות הראשונות.`,
                expeditionGoal: `המטרה של צמד החוקרים בלוך ושניידר הייתה שאפתנית להחריד: איסוף וקיטלוג של כל מיני הדגים הידועים לאדם במסגרת פרויקט הדגל שלהם "Systema Ichthyologiae". הם שאפו ליצור תמונת מצב ביולוגית עולמית כוללת, הכוללת את המינים האקזוטיים של דרום אמריקה.`,
                childhood: `הדג הצעיר מסתמך על אסטרטגיית הישרדות של "כמויות על פני איכות". הנקבה מטילה מאות אלפי ביצים חסרות הגנה בקרקעית הנהר. מרבית הדגיגים שבוקעים נטרפים תוך ימים ספורים, אך הכמות העצומה מבטיחה שמעטים וחזקים יצליחו לשרוד ולגדול לממדי ענק בסבך השורשים.`,
                behavior: `זהו צייד לילה מובהק שמתעורר לחיים כשהשמש שוקעת. הוא משתמש בשפמות (בינים) הארוכים והרגישים שלו כמעין רדאר טקטי, המאפשר לו לאתר ולחוש תנודות קלילות, שינויים בזרם ופולסים חשמליים של טרף שמסתתר בחושך מוחלט בקרקעית הנהר העכורה.`,
                achievements: `השפמנון האדום-זנב הפך לסמל סטטוס. בזכות הניגודיות המרהיבה של צבעיו (גב כהה, בטן לבנה וזנב אדום-אש), הוא נחשב לאחד השפמנונים היפים והאהובים ביותר בתחביב האקווריומים הציבוריים והפרטיים הענקיים ברחבי העולם, על אף שהוא דורש נפחי מים עצומים.`,
                discoveryCircumstances: `תואר מדעית ב-1801 על ידי צמד הזואולוגים הגרמנים מרקוס אליעזר בלוך ויוהאן גוטלוב שניידר. הם לא ביקרו באמזונס בעצמם, אלא ביצעו את הסיווג המדוקדק שלהם על סמך דגימות כבושות ואיורים מדויקים שנשלחו אליהם ממשלחות מחקר מוקדמות יותר בברזיל.`,
                size: `1.8 מטר`, weight: `80 קילוגרם`, lifespan: `20 שנים`, origin: `אגן האמזונס והאורינוקו`, discoverer: `Bloch & Schneider`, year: `1801`, eggs: `מאות אלפי ביצים קטנות`, conservation: `NE`, diet: `טורף אוכל-כל (דגים, סרטנים ופירות שנפלו)`, hunting: `חישה לילית בקרקעית הנהר`, reproduction: `הטלה המונית ופתוחה ללא שמירה הורית`
            },
            {
                id: 20, name: `חתול-דג טיגריסי (שפמנון)`, scientificName: `Pseudoplatystoma tigrinum`, image: `https://i.postimg.cc/PNSxyMqx/1770700441960.png`,
                etymology: `השם "טיגריסי" ניתן לו עקב דוגמת הפסים והכתמים דמוית הטיגריס המעטרת את פלג גופו העליון, ומשמשת לו כהסוואה שוברת-צורה. בבחינה של השם המדעי: הקידומת "Pseudo" משמעותה 'מדומה' או 'שקרי', "Platy" משמעו 'שטוח', ו-"Stoma" משמעו 'פה' או 'פתח'. השם הספציפי "tigrinum" מחזק בלטינית את מוטיב הפסים הטיגריסיים.`,
                expeditionBackground: `אמצע המאה ה-18 הייתה תקופה של מהפכה מדעית בארגון הידע, בהובלתו של קארולוס ליניאוס. משלחות ומלקטים שוגרו לכל קצוות האימפריות הקולוניאליות כדי לאסוף דגימות מכל תחומי החי והצומח ולהביאן לזיהוי אקדמי באירופה.`,
                expeditionGoal: `המטרה המרכזית הייתה להרחיב ולהשלים את ה"Systema Naturae" - מפעל חייו של ליניאוס. המשלחות שאפו להחיל את שיטת המיון הבינומית (שם סוג ושם מין) החדשנית על עולם החי המורכב של דרום אמריקה, ולתת סדר בתוהו ובוהו של השמות המקומיים הרבים.`,
                childhood: `דגיגי השפמנון הטיגריסי נולדים עם יכולת הסוואה מושלמת. הצעירים מבלים את שנותיהם הראשונות בתוך סבך עבות של שורשי עצים שקועים באזורים המוצפים של יערות האמזונס. הדוגמה המפוספסת שלהם והמבנה המוארך גורמים להם להיראות בדיוק כמו ענפים קטנים שנישאים בזרם, מה שמונע מטורפים לזהות אותם.`,
                behavior: `צייד מארב חרישי וקטלני שמעדיף לפעול במעמקי הנהר. הוא שוכב ללא תנועה בין סלעים או גזעים, תוך שהוא פורס את השפמות (בינים) הארוכים להפליא שלו קדימה. השפמות משמשים כרשת חיישנים כימיים ומכניים מדויקת ביותר לניווט במים עכורים ולזיהוי תנועות זעירות של טרף בחושך.`,
                achievements: `השפמנון הטיגריסי מציג שילוב נדיר ויוצא דופן בטבע: יופי ויזואלי מהפנט המבוקש מאוד בקרב חובבי אקווריומים ברחבי העולם, יחד עם חושים אלקטרו-כימיים חדים כתער שהופכים אותו למכונת ציד משוכללת שלא מותירה סיכוי רב לטרף שלה.`,
                discoveryCircumstances: `מין זה זכה להיסווג ולהיכלל במהדורה השתים-עשרה והמפורסמת של הספר Systema Naturae על ידי אבי הטקסונומיה המודרנית, קארולוס ליניאוס, בשנת 1766. ליניאוס השתמש בדגימות שהובאו אליו כדי לתת לו את השם המדעי התקף עד היום.`,
                size: `1.3 מטר`, weight: `30 קילוגרם`, lifespan: `20 שנים`, origin: `אגני האמזונס והאורינוקו`, discoverer: `Carl Linnaeus`, year: `1766`, eggs: `עשרות אלפי ביצים דביקות`, conservation: `NE`, diet: `דגים קטנים, סרטנים וחסרי חוליות`, hunting: `מארב לילי חרישי זינוק פתאומי`, reproduction: `נדידה עונתית ארוכה לאזורי הצפה`
            },
            {
                id: 22, name: `פאקו`, scientificName: `Piaractus brachypomus`, image: `https://i.postimg.cc/bD2NjP6Z/1770654199713.png`,
                etymology: `השם "פאקו" מקורו בשפות האינדיאניות של ילידי ברזיל ומתייחס לדג בעל גוף עגול ופחוס. לעיתים הוא מכונה בתקשורת "הדג עם שיני האדם" בגלל מבנה השיניים הטוחנות המרובעות והשטוחות שלו, שמזכיר להפליא מערכת שיניים אנושית. השם המדעי Piaractus בא מיוונית ("פיאר" - שמן/עבה, ו-"אקטיס" - קרן/סנפיר). "brachypomus" משמעו קצר מכסה (brachys=קצר, poma=מכסה זימים).`,
                expeditionBackground: `לאחר המהפכה הצרפתית, המוזיאון הלאומי להיסטוריה של הטבע בפריז (Muséum national d'histoire naturelle) הפך למרכז המחקר המוביל בעולם. המדינה מימנה משלחות מקיפות שהביאו מאות שלדים ודגימות כדי להבין את הקשרים האנטומיים בין המינים.`,
                expeditionGoal: `המטרה של האנטומאים והזואולוגים הייתה לבצע ניתוח השוואתי מדוקדק של מינים לא מוכרים. באותה תקופה, חוקרים ניסו להבין את מגוון צורות החיים המוזרות של קרובי משפחתם של דגי הפיראנה, וכיצד הם הסתגלו לתזונה שונה.`,
                childhood: `הדגיגים מבלים את שנותיהם הראשונות ביערות הגשם המוצפים של האמזונס. בשלב זה, תזונתם מורכבת בעיקר מחרקים זעירים, זחלים וזואופלנקטון. רק עם ההתבגרות, גדילת השיניים והתחזקות הלסתות, הם עוברים לתזונה הבוגרת והמפורסמת שלהם המבוססת על אגוזים קשים ופירות.`,
                behavior: `דג צמחוני שהוא מומחה בנישה שלו. יש לו חוש שמיעה חד ורגיש באופן יוצא דופן. הוא מסוגל לשמוע מרחוק את ה"פלוף" – צליל הנפילה של פירות ואגוזים מענפי העצים אל תוך מי הנהר – ולשחות במהירות אל המקור כדי להשיג את הארוחה לפני המתחרים שלו.`,
                achievements: `הפאקו נחשב בקרב אקולוגים ל"גנן הראשי של יערות האמזונס". מאחר שהוא בולע פירות שלמים ונודד למרחקים ארוכים, הוא מפריש את הזרעים במקומות חדשים לאורך הנהר, ובכך משמש כמפיץ זרעים חיוני וקריטי להישרדותם של עצי יער הגשם ולחידוש הצמחייה.`,
                discoveryCircumstances: `תואר בפירוט מדעי בשנת 1816 על ידי ז'ורז' קיווייה, מחשובי חוקרי האנטומיה ההשוואתית. קיווייה נדהם מהממצא האנטומי – כמעט ולא היה נתפס בעיניו שדג כל כך קרוב משפחתית לפיראנה צמאת הדם, מציג שיניים טוחנות שטוחות שמותאמות לחלוטין לפיצוח אגוזים וזרעים.`,
                size: `1.1 מטר`, weight: `40 קילוגרם`, lifespan: `25 שנים`, origin: `אגן נהר האמזונס`, discoverer: `Georges Cuvier`, year: `1816`, eggs: `150,000`, conservation: `NE`, diet: `אגוזים קשים, זרעים, פירות וצמחיית מים`, hunting: `ליקוט סבלני ופיצוח בעזרת לסתות אימתניות`, reproduction: `נדידה עונתית בעקבות שיטפונות ועליית מפלס הנהר`
            },
            {
                id: 8, name: `באקו סלע (שפמנון ניז'ר)`, scientificName: `Lithodoras dorsalis`, image: `https://i.postimg.cc/JhCGJmYM/Rock_Bacu_Catfish.png`,
                etymology: `שם הסוג Lithodoras מתאר בדיוק את מראהו ומרקמו: "Litho" ביוונית משמעו אבן או סלע, ו-"doras" משמעו עור, כלומר – הדג בעל עור האבן. התוספת dorsalis מלטינית (גבי) מתייחסת לרכס הבולט על גבו. הוא מכונה לעיתים שפמנון ניז'ר על שם הצבע השחור-פחם או אפור-כהה של גופו, והעובדה שכל גופו עטוף בשריון של לוחות עצם משוננים כמעין מסור.`,
                expeditionBackground: `בשנות ה-30 וה-40 של המאה ה-19, ממשלת צרפת המשיכה לתמוך במפעל האדיר של פרסום "Histoire Naturelle des Poissons" – סדרת כרכים שנועדה לתאר את כל הדגים בעולם, פרויקט שהחל קיווייה והומשך על ידי תלמידיו ושותפיו.`,
                expeditionGoal: `החוקרים שמו להם למטרה להשלים את החסר ולתעד בצורה מדוקדקת את דגי הקרקעית ושוכני הבוץ של המערכות האקולוגיות הניאוטרופיות, שעד כה זכו להתעלמות בשל חזותם המגושמת וקושי לכידתם במים העמוקים והעכורים.`,
                childhood: `דגיגי הבאקו נולדים לתוך מציאות של קרקעית הנהר שורצת הטורפים. מכיוון שאין להם את המהירות לברוח, ההישרדות שלהם מסתמכת על התפתחות מואצת של לוחות שריון העצם. העור שלהם מתקשה מהר מאוד לאחר הבקיעה ומצמיח דוקרנים שהופכים אותם לבלתי אכילים לרוב הטורפים הקטנים.`,
                behavior: `שורד פסיבי, עקשן ומשוריין בכבדות. במקום לברוח, באקו הסלע מעדיף להיאחז בקרקעית או להיתקע בין סלעים. בבריכת ה-OFR שלנו, אלו הם ה"טנקים" השחורים והשלווים שחורשים את הקרקעית באיטיות, מנקים אותה משאריות, ואינם נרתעים מדגים גדולים מהם הודות לשריונם.`,
                achievements: `ההישג האבולוציוני הגדול ביותר של הדג הוא מערכת ההגנה המשוכללת שלו. לאורך צדי גופו וסנפיריו פרוסים לוחות עם קוצים חדים ומשוננים הפונים אחורה. ברגע סכנה, הוא מסוגל לנעול את סנפירי החזה שלו למצב פתוח, דבר המונע לחלוטין מטורפי ענק (כמו האליגטור גאר או השפמנונים הגדולים) לבלוע אותו.`,
                discoveryCircumstances: `תואר ב-1840 על ידי האנטומאי הצרפתי אשיל ולנסיין. ולנסיין בחן בקפידה את הדגימות והתפעל מלוחות העצם החיצוניים המשתלבים, שהזכירו לו שריון של אביר מימי הביניים יותר מאשר עור של דג. הוא פרסם את ממצאיו בכרך ה-15 של סדרת מדריכי הדגים הצרפתית.`,
                size: `1 מטר`, weight: `15 קילוגרם`, lifespan: `25 שנים`, origin: `אגן האמזונס ונהרות גינאה`, discoverer: `Achille Valenciennes`, year: `1840`, eggs: `אלפי ביצים בודדות`, conservation: `NE`, diet: `אוכל-כל סינון (תולעים, חרקים, רפש ושאריות)`, hunting: `סינון וחיטוט איטי ושיטתי בקרקעית החול והבוץ`, reproduction: `נדידה ארוכה ומעייפת לכיוון שפך הנהר בעונת הגשמים`
            },
            {
                id: 11, name: `גונץ' (שפמנון השטן)`, scientificName: `Bagarius yarrelli`, image: `https://i.postimg.cc/m2ccYQJz/1771088073700.png`,
                etymology: `השם העממי "גונץ'" נובע מהשפות ההודיות המקומיות לאורך הנהרות. הוא זכה לכינוי המטריד "שפמנון השטן" עקב המראה המבעית שלו – פה רחב מלא בשיניים מחודדות, עיניים קטנות, ועור מחוספס, עמוס גבשושיות ודמוי סלע. השם הסוגי Bagarius נגזר מהמילה ההודית 'Vaghari' (שם מקומי לדגים דומים), ואילו השם הספציפי yarrelli ניתן כהוקרה לחוקר הטבע האנגלי ויליאם יארל (William Yarrell).`,
                expeditionBackground: `במהלך המאה ה-19, חברת הודו המזרחית הבריטית שלטה בהודו. במסגרת שלטונה, קציני צבא בריטים בעלי נטייה מדעית ערכו סקרים גאוגרפיים, טופוגרפיים וביולוגיים אדירים ברחבי תת-היבשת, מהרי ההימלאיה ועד למפרץ בנגל.`,
                expeditionGoal: `המטרות של סקרים אלו היו הערכת משאבי טבע, מיפוי נתיבי סחר בנהרות, במקביל לתיעוד מדעי של מפלצות הנהר הענקיות והמסוכנות שהופיעו בפולקלור המקומי והיוו איום או מקור מזון עבור האוכלוסייה.`,
                childhood: `הדגיגים של הגונץ' גדלים בסביבה קיצונית מאין כמותה. הם בוקעים באזורים בעלי זרמים אדירים ושוצפים לרגלי הרי ההימלאיה. מגיל צעיר מאוד, הם נאלצים לאמן ולפתח את מבנה גופם השטוח כדי להצמיד את עצמם בכוח אל הסלעים החלקים, ולהימנע מסחיפה למורד הנהר או פגיעה מסלעים מידרדרים.`,
                behavior: `זהו צייד מארב סלעי וקשוח להפליא. הודות להסוואה המושלמת שלו, הוא משתלב לחלוטין עם אבני הקרקעית. בבריכת ה-OFR שלנו, מבקרים לעיתים קרובות חושבים שמדובר בפסל אבן או שקע בקרקעית, שכן הוא מסוגל לשכב ללא שום תנועה במשך שעות, ממתין בשקט שטרף יחלוף על פניו.`,
                achievements: `ההישג הבולט של הגונץ' הוא יכולת ההישרדות חסרת התקדים שלו בזרמים כה עזים ששום דג ענק אחר לא מסוגל לשחות בהם. גופו מותאם אווירודינמית (או הידרודינמית) לזרימת מים קיצונית. לצערנו, עקב אובדן בתי גידול וזיהום נהרות בהודו, אוכלוסייתו מידלדלת משמעותית.`,
                discoveryCircumstances: `הדג תואר לראשונה באופן מדעי בשנת 1839 על ידי הקולונל הבריטי ויליאם הנרי סייקס, במהלך סקר עולם החי שערך בהודו עבור חברת הודו המזרחית. סייקס שמע סיפורים מקומיים על דגי ענק ש"בולעים מתרחצים", וכשראה את הדגימה המפלצתית והמסועפת, הבין שמצא טורף עליון מרשים.`,
                size: `2 מטרים`, weight: `90 קילוגרם`, lifespan: `20 שנים`, origin: `נהרות דרום אסיה והודו`, discoverer: `William Henry Sykes`, year: `1839`, eggs: `עשרות אלפי ביצים קטנות`, conservation: `VU`, diet: `דגים, חסרי חוליות, צפרדעים וסרטנים עיוורים`, hunting: `מארב פסיבי והתפרצות קטלנית חטופה`, reproduction: `הטלה בזרם מים חזק במיוחד בין סלעים ובולדרים`
            },
            {
                id: 17, name: `וואלאגו אטו`, scientificName: `Wallago attu`, image: `https://i.postimg.cc/0rVQnCNM/1770700454603.png`,
                etymology: `לעיתים הוא זוכה לכינוי המשעשע אך המטעה "חתול הליקופטר" עקב תנועות שפמותיו (הבינים). שני חלקי השם המדעי, Wallago והמין attu, מקורם בשמות וניבים הינדיים או טלוגו מקומיים מאזור דרום אסיה. שמות אלו מצינים באזורי הגידול הטבעיים שלו דג בעל כוח רב, תוקפנות מתפרצת ופה מפלצתי המסוגל לבלוע טרף גדול.`,
                expeditionBackground: `אותה משלחת מדעית ומחקרית כבירה בראשות בלוך ושניידר (שתיארו גם את האדום-זנב), עסקה בניתוח דגימות שנשלחו לא רק מדרום אמריקה, אלא גם מהמושבות ויחסי הסחר בדרום מזרח אסיה, בעיקר מאזור סיאם (תאילנד) והודו.`,
                expeditionGoal: `הצורך היה לסווג לא רק דגי נוי, אלא בעיקר לקטלג בצורה אקדמית את טורפי העל והדגים המסחריים ששלטו בנתיבי המים החשובים של אסיה, מתוך ניסיון ליצור הרמוניה וסדר מדעי גלובלי.`,
                childhood: `דגיגי הוואלאגו אטו ידועים בקניבליזם מוקדם ואכזרי. מיד לאחר הבקיעה מהביצים, הצעירים תוקפניים מאוד ומתחילים לטרוף זה את זה בתוך האזור הרדוד שבו בקעו. זוהי אסטרטגיית הישרדות אבולוציונית קשוחה המבטיחה שרק הפרטים החזקים, המהירים והאגרסיביים ביותר ישרדו את שלב הילדות ויגיעו לבגרות בנהר.`,
                behavior: `טורף חסר פחד ובעל מזג סוער. בניגוד לשפמנונים רבים שמעדיפים להתחבא, הוא תוקף כמעט כל דבר שזז בטריטוריה שלו. יש לו פה רחב באופן יוצא מן הכלל המעוטר במאות שיניים קטנות, חדות כתער והפונות כלפי פנים, מה שמבטיח שכל טרף שנלכד בלסתותיו לא יוכל להשתחרר.`,
                achievements: `השליטה המוחלטת שלו בנהרות העכורים ביותר והמזוהמים של דרום מזרח אסיה היא ההישג המרכזי שלו. הוא מסוגל לשרוד ולצוד היטב בסביבות קשות. בנוסף, הוא נחשב לדג נערץ, ולעיתים מפחיד מאוד, בסיפורי הפולקלור המקומיים, שם נטען לעיתים כי פרטי ענק תקפו חיות משק או אף מתרחצים.`,
                discoveryCircumstances: `תואר ב-1801 על ידי בלוך ושניידר. עקב הדיווחים המקומיים על אופיו התוקפני ומראהו הדק והארוך שלא אפיין שפמנונים אירופאיים, הוא עורר סקרנות רבה כמודל לאנטומיה של דג טורף מהיר ואגרסיבי.`,
                size: `2.4 מטרים`, weight: `100 קילוגרם`, lifespan: `15 שנים`, origin: `נהרות דרום מזרח אסיה (הודו עד אינדונזיה)`, discoverer: `Bloch & Schneider`, year: `1801`, eggs: `כ-4,000 ביצים בלבד (איכות על פני כמות)`, conservation: `VU`, diet: `אוכל-כל אגרסיבי במיוחד - דגים, עופות מים ודו-חיים`, hunting: `תקיפה ישירה ואלימה מטווח קצר`, reproduction: `הטלה במים רדודים סמוך לגדות נהר בוציות`
            },
            {
                id: 31, name: `שפמנון ג'או (Zungaro)`, scientificName: `Zungaro zungaro`, image: `https://i.postimg.cc/wB9TGJfv/1771088122779.png`,
                etymology: `במדינות דרום אמריקה הוא מוכר לרוב בשם "Jau" (ג'או), שהוא שם ברזילאי/פורטוגזי מקומי, הנהגה לעיתים כ"ז'או". השם המדעי Zungaro zungaro הוא כפילות (טאוטונימים) המגיעה משם ילידי עתיק באזור האמזונס שניתן לשפמנונים כבדים, עבים ושמנים במיוחד, שמשקלם הופך אותם למאתגרים במיוחד לדיג.`,
                expeditionBackground: `בין השנים 1799 ל-1804, חוקר הטבע הפרוסי הדגול אלכסנדר פון הומבולדט יצא לאחת ממשלחות החקר המפורסמות בהיסטוריה המדעית לדרום אמריקה. במסעו בן החמש שנים, חקר הומבולדט את נהר האורינוקו וגילה חיבורים נסתרים בין מערכות הנהרות.`,
                expeditionGoal: `מטרתו של הומבולדט לא הייתה רק קטלוג ביולוגי, אלא הבנה הוליסטית של הטבע. הוא שאף למפות את רשת נהרות האורינוקו, למדוד זרמים, טמפרטורות, ולהבין כיצד התנאים הסביבתיים הקיצוניים של הנהרות תומכים בצורות חיים ענקיות המאכלסות את המעמקים.`,
                childhood: `חייהם מתחילים בסביבה התובענית ביותר: בעומקים חשוכים ובתוך זרמים תת-מימיים חזקים במיוחד של נהרות דרום אמריקה. הם נאלצים ללמוד כיצד להיצמד לקרקעית בעזרת משקל גופם וצורת ראשם הפחוסה, כדי לא להיסחף באשדות המסוכנים אל אזורים שבהם ייטרפו.`,
                behavior: `הג'או הוא התגלמות של כוח ברוטאלי סטטי. בניגוד לטורפים שוחים, הוא תופס חזקה על נקודה אסטרטגית עמוקה, לרוב ממש מתחת למפלים או בבורות עמוקים בנהר, ופשוט לא זז משם. הוא הופך לשליט הבלתי מעורער של הטריטוריה התת-מימית שלו ומגן עליה בתקיפות.`,
                achievements: `נחשב באופן חד משמעי לאחד השפמנונים הכבדים, העבים והשריריים ביותר בעולם. דייגים מקומיים וספורטיביים מתארים את חווית ההיתקלות בו או הניסיון למשוך אותו מהמים כמאבק שמרגיש כמו "למשוך צוללת טבועה" ממעמקי הנהר, בשל משקלו העצום וכוח ההתנגדות הסטטי שלו.`,
                discoveryCircumstances: `הדג תואר לראשונה מדעית ב-1821 בעקבות יומניו ורשימותיו של אלכסנדר פון הומבולדט ממסעו באורינוקו. הומבולדט ציין את התפעלותו מדג הנהר הכבד שהיווה מקור תזונה מרכזי לילידים, אך כמעט והיה בלתי אפשרי לתפיסה בכלים אירופאיים רגילים.`,
                size: `2 מטרים`, weight: `150 קילוגרם`, lifespan: `20 שנים`, origin: `אגני האמזונס והאורינוקו`, discoverer: `Alexander von Humboldt`, year: `1821`, eggs: `עשרות אלפי ביצים המוצמדות לסלעים`, conservation: `NE`, diet: `מבוסס בעיקר על טריפת דגים כבדים אחרים`, hunting: `פתיחת לוע אדיר היוצר ואקום השואב את הטרף`, reproduction: `מבוצעת בחשאיות בעומק הנהר בין בולדרים ענקיים`
            }
        ];

        // Dictionary for Conservation Status (Colors and Text)
        const conservationDict = {
            'CR': { label: 'סכנת הכחדה קריטית', style: 'bg-red-500/20 border-red-500/50 text-red-400' },
            'EN': { label: 'סכנת הכחדה', style: 'bg-orange-500/20 border-orange-500/50 text-orange-400' },
            'VU': { label: 'פגיע (עתיד בסיכון)', style: 'bg-yellow-500/20 border-yellow-500/50 text-yellow-300' },
            'LC': { label: 'ללא חשש', style: 'bg-green-500/20 border-green-500/50 text-green-400' },
            'DD': { label: 'חסר מידע (Data Deficient)', style: 'bg-slate-700/50 border-slate-600 text-slate-300' },
            'NE': { label: 'לא הוערך (Not Evaluated)', style: 'bg-slate-700/50 border-slate-600 text-slate-300' }
        };

        // Render Cards
        function renderCards() {
            const container = document.getElementById('fishContainer');
            document.getElementById('fishCount').innerText = fishData_PoolLegends.length;
            container.innerHTML = '';

            fishData_PoolLegends.forEach(fish => {
                const status = conservationDict[fish.conservation] || conservationDict['NE'];
                
                // Card Template
                const cardHTML = `
                    <article class="bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 shadow-md mb-8">
                        
                        <!-- Top Section: Image & Basic Info -->
                        <div class="flex flex-col md:flex-row">
                            
                            <!-- Image Container with Zoom hint -->
                            <div class="md:w-2/5 relative img-container border-b md:border-b-0 md:border-l border-slate-700 h-64 md:h-auto bg-slate-900" 
                                 onclick="openModal('${fish.image}', '${fish.name}', '${fish.discoverer} - ${fish.year}')">
                                <img src="${fish.image}" alt="${fish.name}" class="w-full h-full object-cover opacity-90 hover:opacity-100">
                                
                                <!-- Conservation Badge -->
                                <div class="absolute top-4 right-4 px-3 py-1.5 rounded bg-slate-900/90 border border-slate-600 text-sm font-bold ${status.style}">
                                    מצב שימור: ${status.label}
                                </div>
                                
                                <!-- Zoom Icon Overlay -->
                                <div class="img-overlay absolute inset-0 bg-slate-900/60 flex items-center justify-center pointer-events-none">
                                    <div class="bg-black/80 text-white px-4 py-2 rounded-full flex items-center gap-2">
                                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"></path></svg>
                                        <span>לחץ להגדלה</span>
                                    </div>
                                </div>
                            </div>

                            <!-- Title and Grid Info -->
                            <div class="md:w-3/5 p-6 md:p-8 flex flex-col justify-center">
                                <h2 class="text-3xl font-bold text-white mb-1">${fish.name}</h2>
                                <h3 class="text-lg text-cyan-400 mb-4 font-serif">${fish.scientificName}</h3>
                                
                                <!-- Etymology - EXPANDED -->
                                <div class="bg-slate-900 rounded-xl p-4 border border-slate-700 mb-6">
                                    <h4 class="text-sm text-slate-400 font-bold mb-2">אטימולוגיה ומקור השם</h4>
                                    <p class="text-slate-200 text-base leading-relaxed">${fish.etymology}</p>
                                </div>

                                <!-- Quick Stats Grid -->
                                <div class="grid grid-cols-2 gap-4 text-base border-t border-slate-700 pt-5 mt-auto">
                                    <div><span class="text-slate-400">גודל:</span> <span class="font-bold text-white">${fish.size}</span></div>
                                    <div><span class="text-slate-400">משקל:</span> <span class="font-bold text-white">${fish.weight}</span></div>
                                    <div><span class="text-slate-400">תוחלת חיים:</span> <span class="font-bold text-white">${fish.lifespan}</span></div>
                                    <div><span class="text-slate-400">מקור:</span> <span class="font-bold text-white">${fish.origin}</span></div>
                                </div>
                            </div>
                        </div>

                        <!-- Structured Research Content (A, B, C) - Massively Expanded -->
                        <div class="p-6 md:p-8 bg-slate-800 border-t border-slate-700 space-y-8">
                            
                            <!-- A. נסיבות הגילוי -->
                            <div>
                                <h4 class="text-xl font-bold text-cyan-400 mb-3 border-b border-cyan-500/30 pb-1 inline-block">א. נסיבות הגילוי</h4>
                                <ul class="text-slate-300 space-y-3 text-base mt-2">
                                    <li><strong class="text-slate-100">מגלה ושנת גילוי:</strong> התגלה ותואר על ידי ${fish.discoverer} בשנת ${fish.year}.</li>
                                    <li><strong class="text-slate-100">תיאור היסטורי:</strong> ${fish.discoveryCircumstances}</li>
                                    <li><strong class="text-slate-100">רקע משלחת המחקר:</strong> ${fish.expeditionBackground}</li>
                                    <li><strong class="text-slate-100">מטרת המשלחת:</strong> ${fish.expeditionGoal}</li>
                                </ul>
                            </div>

                            <!-- B. ילדות ומחזור חיים -->
                            <div>
                                <h4 class="text-xl font-bold text-purple-400 mb-3 border-b border-purple-500/30 pb-1 inline-block">ב. ילדות ומחזור חיים</h4>
                                <ul class="text-slate-300 space-y-3 text-base mt-2">
                                    <li><strong class="text-slate-100">שנות הילדות והתפתחות:</strong> ${fish.childhood}</li>
                                    <li><strong class="text-slate-100">אסטרטגיית רבייה:</strong> ${fish.reproduction}</li>
                                    <li><strong class="text-slate-100">כמות ותנאי ביצים:</strong> ${fish.eggs}</li>
                                </ul>
                            </div>

                            <!-- C. הישגים וייחודיות -->
                            <div>
                                <h4 class="text-xl font-bold text-emerald-400 mb-3 border-b border-emerald-500/30 pb-1 inline-block">ג. הישגים וייחודיות</h4>
                                <ul class="text-slate-300 space-y-3 text-base mt-2">
                                    <li><strong class="text-slate-100">הישגים בולטים:</strong> ${fish.achievements}</li>
                                    <li><strong class="text-slate-100">התנהגות ודפוסי פעולה:</strong> ${fish.behavior}</li>
                                    <li><strong class="text-slate-100">תזונה עיקרית:</strong> ${fish.diet}</li>
                                    <li><strong class="text-slate-100">שיטת ציד אופיינית:</strong> ${fish.hunting}</li>
                                </ul>
                            </div>

                        </div>
                    </article>
                `;
                container.innerHTML += cardHTML;
            });
        }

        // Modal Functions for zooming
        const modal = document.getElementById('imageModal');
        const modalImg = document.getElementById('modalImg');
        const modalTitle = document.getElementById('modalTitle');
        const modalCredit = document.getElementById('modalCredit');

        function openModal(imgSrc, title, credit) {
            modalImg.src = imgSrc;
            modalTitle.innerText = title;
            modalCredit.innerText = `נתוני גילוי: ${credit}`;
            
            modal.classList.remove('hidden');
            // Small timeout to allow display:block to apply before transition
            setTimeout(() => {
                modal.classList.remove('opacity-0');
                modal.classList.add('opacity-100');
            }, 10);
            
            // Prevent body scroll on Samsung/Mobile
            document.body.style.overflow = 'hidden';
        }

        function closeModal() {
            modal.classList.remove('opacity-100');
            modal.classList.add('opacity-0');
            
            setTimeout(() => {
                modal.classList.add('hidden');
                // Restore body scroll
                document.body.style.overflow = '';
                modalImg.src = '';
            }, 300); // Matches transition duration
        }

        // Initialize App
        window.addEventListener('DOMContentLoaded', renderCards);

        // Allow closing modal with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
                closeModal();
            }
        });
    </script>
</body>
</html>
