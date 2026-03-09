export interface Prayer {
  id: string;
  title: string;
  slug: string;
  category: string;
  english: string;
  amharicTransliteration: string;
  amharic: string;
  geez: string;
  description: string;
  tags: string[];
}

export const prayerCategories = [
  "Daily Prayers",
  "Morning Prayers",
  "Evening Prayers",
  "Repentance Prayers",
  "Communion Prayers",
  "Saint Prayers",
  "Psalms",
  "Feast Prayers",
  "Marian Prayers",
];

export const prayers: Prayer[] = [
  {
    id: "1",
    title: "In the Name of the Father",
    slug: "in-the-name-of-the-father",
    category: "Daily Prayers",
    english:
      "In the name of the Father, and of the Son, and of the Holy Spirit, one God. Amen.",
    amharicTransliteration:
      "Besme Ab, we Weld, we Menfes Kidus, Ahadu Amlak. Amen.",
    amharic: "በስመ አብ ወወልድ ወመንፈስ ቅዱስ አሐዱ አምላክ። አሜን።",
    geez: "በስመ፡ አብ፡ ወወልድ፡ ወመንፈስ፡ ቅዱስ፡ አሐዱ፡ አምላክ፡ አሜን።",
    description:
      "The opening invocation of the Holy Trinity, used at the beginning of every prayer and every action in the life of an Orthodox Christian. By invoking the Trinity, we dedicate our prayers and our lives to the Triune God.",
    tags: ["trinity", "daily", "foundational"],
  },
  {
    id: "2",
    title: "The Lord's Prayer",
    slug: "the-lords-prayer",
    category: "Daily Prayers",
    english: `Our Father, who art in heaven,
hallowed be Thy name.
Thy kingdom come,
Thy will be done,
on earth as it is in heaven.
Give us this day our daily bread,
and forgive us our trespasses,
as we forgive those who trespass against us.
And lead us not into temptation,
but deliver us from evil.
For Thine is the kingdom, and the power, and the glory,
forever and ever. Amen.`,
    amharicTransliteration: `Abatachin hoy besemayat yemitinor,
simih yikedesh,
mengistih timta,
fekadih besemay endehone bemidrim yihun.
Yezerezachinin ingidachin zare sitenin,
ibakeh badilachinnim imirin,
innihem lebasadilu yimirimirilen inna,
wedefikera attasgaban,
kezemetiyaw ahun arbanya kisera benegn.
Mengist yante nat, hayl yante nat,
kibir yante nat, lezelealem. Amen.`,
    amharic: `አባታችን ሆይ በሰማያት የምትኖር፣
ስምህ ይቀደስ፣
መንግሥትህ ትምጣ፣
ፈቃድህ በሰማይ እንደሆነ በምድርም ይሁን።
የዕለት ጉርሻችንን ዛሬ ስጠን፣
እባክህ በደላችንንም ይቅር በለን፣
እኛም ለበደሉን ይቅር እንላለን ና፣
ወደ ፈተና አታስገባን፣
ከዘመቲያው አሁን አርባንያ ክሰራ በኝ።
መንግሥት ያንተ ናት፣ ኃይል ያንተ ናት፣
ክብር ያንተ ናት፣ ለዘለዓለም። አሜን።`,
    geez: `አቡነ፡ ዘበሰማያት፡
ይትቀደስ፡ ስምከ፡
ትምጻእ፡ መንግሥትከ፡
ይኩን፡ ፈቃድከ፡
በከመ፡ በሰማይ፡ ከማሁ፡ በምድር፡
ሲሳየነ፡ ዘየዓልት፡ ሀበነ፡ ዮም፡
ኅድግ፡ ለነ፡ አበሳነ፡ ወጌጋየነ፡
በከመ፡ ንሕነ፡ ኅድግናሆሙ፡ ለእለ፡ አበሱ፡ ለነ፡
ኢታብአነ፡ ውስተ፡ መንሱት፡
አላ፡ አድኅነነ፡ እምእኩይ፡
እስመ፡ ዚአከ፡ ይእቲ፡ መንግሥት፡ ወኃይል፡ ወስብሐት፡
ለዓለመ፡ ዓለም፡ አሜን።`,
    description:
      "The prayer taught by our Lord Jesus Christ Himself to His disciples. It is the foundation of all Christian prayer and is recited in every Orthodox service.",
    tags: ["daily", "foundational", "Jesus"],
  },
  {
    id: "2b",
    title: "Hail Mary (After the Lord's Prayer)",
    slug: "hail-mary-after-lords-prayer",
    category: "Marian Prayers",
    english: `O Our Lady, Virgin Saint Mary! In Saint Gabriel's greetings, peace be unto you.
Holy and pure, O mother of the almighty God! Peace be unto you.
Blessed are thou amongst women and blessed is the fruit of thy womb.
Hail Mary, full of grace, the Lord is with thee.
Pray for us before our Lord Jesus Christ that he may forgive us our sins.`,
    amharicTransliteration: `Imebétachin Qidist Dingil Mariam hoy! bemelaku beqidus Gebri'el selamta selam inilishalen.
behasabish dingil nesh. besigashim dingil nesh.
ye'ashenafee ye'Igzee'abihér inat hoy! selamta lanchee yigebashal.
kesétoch hulu teleyitesh anchee yetebarekish nesh yemahiÍenish firé yetebareke new.
Íegan yetemelash hoy! des yibelish Igzee'abihér kanchee gar newina.
ketewededew lijish kegétachin kemedihaneetachin ke'Eeyesus Kiristos zend yiqirtan lemiñeelin haÊeeatachinin`,
    amharic: `Imebétachin Qidist Dingil Mariam hoy! bemelaku beqidus Gebri'el selamta selam inilishalen.
behasabish dingil nesh. besigashim dingil nesh.
ye'ashenafee ye'Igzee'abihér inat hoy! selamta lanchee yigebashal.
kesétoch hulu teleyitesh anchee yetebarekish nesh yemahiÍenish firé yetebareke new.
Íegan yetemelash hoy! des yibelish Igzee'abihér kanchee gar newina.
ketewededew lijish kegétachin kemedihaneetachin ke'Eeyesus Kiristos zend yiqirtan lemiñeelin haÊeeatachinin`,
    geez: `O Igzietena Maryam, be-selamte Gebriel, "Selam laki." Buruk anti em-setat, buruk fire kebdiki. O tsemua sega, tseliyi leWeldki, yisir yebelena hatiatena.`,
    description:
      "The Hail Mary text listed in your liturgy source (frequently used prayers section, eotcDivineLit.pdf page 173), cross-checked against Tselot-zezeweTerBOOK-English-5.pdf (pages 3-4). The Eritrean Geez source is image-only and should be manually/OCR verified line-by-line.",
    tags: ["mary", "hail mary", "daily", "intercession"],
  },
  {
    id: "3",
    title: "Holy God (Trisagion)",
    slug: "holy-god-trisagion",
    category: "Daily Prayers",
    english: `Holy God, Holy Mighty, Holy Immortal,
have mercy upon us.
Holy God, Holy Mighty, Holy Immortal,
have mercy upon us.
Holy God, Holy Mighty, Holy Immortal,
have mercy upon us.`,
    amharicTransliteration: `Kidus Egziabher, Kidus Hayyaw, Kidus Zelealemawi,
imahireyin.
Kidus Egziabher, Kidus Hayyaw, Kidus Zelealemawi,
imahireyin.
Kidus Egziabher, Kidus Hayyaw, Kidus Zelealemawi,
imahireyin.`,
    amharic: `ቅዱስ እግዚአብሔር፣ ቅዱስ ኃያው፣ ቅዱስ ዘለዓለማዊ፣
ምሕረትከ ይኩን ላዕሌነ።
ቅዱስ እግዚአብሔር፣ ቅዱስ ኃያው፣ ቅዱስ ዘለዓለማዊ፣
ምሕረትከ ይኩን ላዕሌነ።
ቅዱስ እግዚአብሔር፣ ቅዱስ ኃያው፣ ቅዱስ ዘለዓለማዊ፣
ምሕረትከ ይኩን ላዕሌነ።`,
    geez: `ቅዱስ፡ እግዚአብሔር፡ ቅዱስ፡ ኃያል፡ ቅዱስ፡ ሕያው፡
ዘኢይመውት፡ ተሣሃለነ፡
ቅዱስ፡ እግዚአብሔር፡ ቅዱስ፡ ኃያል፡ ቅዱስ፡ ሕያው፡
ዘኢይመውት፡ ተሣሃለነ፡
ቅዱስ፡ እግዚአብሔር፡ ቅዱስ፡ ኃያል፡ ቅዱስ፡ ሕያው፡
ዘኢይመውት፡ ተሣሃለነ።`,
    description:
      "The Trisagion (Thrice-Holy) hymn, one of the most ancient prayers of the Church. It echoes the angelic hymn of Isaiah 6:3 and is recited three times to honor the Holy Trinity.",
    tags: ["daily", "foundational", "trinity", "liturgical"],
  },
  {
    id: "4",
    title: "Morning Prayer of Thanksgiving",
    slug: "morning-prayer-of-thanksgiving",
    category: "Morning Prayers",
    english: `I thank You, O Lord my God,
for You have brought me safely through the night
and granted me to see the light of this new day.
Make me worthy to live this day in Your fear,
without sin, without stumbling.
Guard me from all evil and temptation.
Direct my steps according to Your word.
Let Your mercy and Your truth be my protection.
Through the intercession of the Holy Virgin Mary,
and all Your saints. Amen.`,
    amharicTransliteration: `Amlakiye Egziabher hoy, amesginikalehu,
lelitin beselam asalefkenh,
yezih ahun ken birhan enaytih abeqahenh.
Yezihin ken befirhatih endanor yatibilenh,
kale hatiat, kale mawtak.
Kekfulan hulu arbanya kistarenh.
Endak qalih higotiye imra.
Mihiretih enna iwinetih yitshinan yihunilign.
Bekidist Dingilin Maryam amilakinnet,
enna bekidusanih hulu. Amen.`,
    amharic: `አምላኬ እግዚአብሔር ሆይ፣ አመሰግንሃለሁ፣
ሌሊቱን በሰላም አሳልፈኸኝ፣
የዚህ አሁን ቀን ብርሃን እናይት አበቃኸኝ።
የዚህን ቀን በፍርሃትህ እንዳኖር ያጥብልኝ፣
ካለ ኃጢአት፣ ካለ ማወታክ።
ከክፉዋን ሁሉ አርባንያ ክስታረኝ።
እንደቃልህ ሕጎቲየ ኢምራ።
ምህረትህ እና እውነትህ ይጸናን ይሁንልኝ።
በቅድስት ድንግልን ማሪያም አማላክነት፣
እና በቅዱሳንህ ሁሉ። አሜን።`,
    geez: `አመሰግነከ፡ እግዚኦ፡ አምላኪየ፡
እስመ፡ ደኃን፡ አብጻሕከኒ፡ ውስተ፡ ሌሊት፡
ወአርአይከኒ፡ ብርሃነ፡ ዛቲ፡ ዕለት፡
ገብርኒ፡ ከመ፡ እንበር፡ ዛቲ፡ ዕለት፡ በፍርሃትከ፡
ዘእንበለ፡ ኃጢአት፡
ወዘእንበለ፡ ማዕተት፡
ዕቀበኒ፡ እምኵሉ፡ እኩይ፡
ወመስተ፡ ፈተና፡
አቅንዕ፡ ኮነኒየ፡ በቃልከ፡ አሜን።`,
    description:
      "A morning prayer of gratitude for God's protection through the night and a petition for guidance through the new day.",
    tags: ["morning", "thanksgiving", "daily"],
  },
  {
    id: "5",
    title: "Evening Prayer",
    slug: "evening-prayer",
    category: "Evening Prayers",
    english: `O Lord, as the day comes to an end,
I give You thanks for all Your mercies.
Forgive me for all the sins I have committed this day,
in thought, word, and deed.
Send Your holy angels to guard me through the night.
Grant me peaceful sleep and a blameless awakening.
Through the prayers of our holy Mother,
the Virgin Mary, and all Your saints. Amen.`,
    amharicTransliteration: `Egziabher hoy, ken siyaleg,
lemihiretih hulu amesginalehu.
Yezihin ken besiboten hulu yikirta bileyn,
behasab, beqal, enna begibar.
Kidus malaektihni lelitin enitstireny lakih.
Yeselam inikulfi enna nesha tinssa sitenyi.
Bekidist innatachin,
Dingilin Maryam silot,
enna bekidusanih hulu. Amen.`,
    amharic: `እግዚአብሔር ሆይ፣ ቀን ሲያልግ፣
ለምህረትህ ሁሉ አመሰግናለሁ።
የዚህን ቀን በስቦተን ሁሉ ይቅርታ ብለኝ፣
በሃሳብ፣ በቃል፣ እና በግባር።
ቅዱስ መላእክትህን ሌሊቱን እንጽትረኝ ላክህ።
የሰላም እንቁልፊ እና ነጻ ትንሣ ስጠኝ።
በቅድስት እናታችን፣
ድንግልን ማሪያም ጸሎት፣
እና በቅዱሳንህ ሁሉ። አሜን።`,
    geez: `እግዚኦ፡ ሶበ፡ ተፈጸመት፡ ዕለት፡
አመሰግነከ፡ በእንተ፡ ኵሉ፡ ምሕረትከ፡
ኅድግ፡ ሊተ፡ ኵሎ፡ ኃጢአትየ፡ ዘገበርኩ፡ ዛቲ፡ ዕለት፡
በአእምሮ፡ በቃል፡ ወበገብር፡
ፈኑ፡ መላእክቲከ፡ ቅዱሳን፡ ይዕቀቡኒ፡ በሌሊት፡
ሀበኒ፡ ንዋመ፡ ሰላም፡
ወትንሣኤ፡ ዘእንበለ፡ ዕድ፡ አሜን።`,
    description:
      "An evening prayer asking for God's forgiveness for the sins of the day and His protection through the night.",
    tags: ["evening", "repentance", "protection"],
  },
  {
    id: "6",
    title: "Prayer of Repentance",
    slug: "prayer-of-repentance",
    category: "Repentance Prayers",
    english: `O Lord my God, I have sinned against You
and against my neighbor.
I have sinned in thought, in word, and in deed.
I have sinned knowingly and unknowingly.
Forgive me, O Lord, for I am a sinner.
Have mercy upon me according to Your loving-kindness.
Wash me thoroughly from my iniquity
and cleanse me from my sin.
Create in me a clean heart, O God,
and renew a right spirit within me.
Do not cast me away from Your presence
and do not take Your Holy Spirit from me.
Restore unto me the joy of Your salvation. Amen.`,
    amharicTransliteration: `Amlakiye Egziabher hoy, beante lay hatiat serchalehu,
bebalderesayem lay.
Behasab, beqal, enna begibar hatiat serchalehu.
Aweqe enna salawek hatiat serchalehu.
Yikirta bileyn Egziabher hoy, hatiegna neny.
Endak mihiretih imahireyin.
Kebedelaye atireny.
Kehatiatiyen antsiheny.
Nitsuh libin ftera Amlak hoy,
tikkil menfessinnim ahadisleyn.
Kefitihih atagileyn,
Menfes Kidusihinin keinie aitwesd.
Yedihihetih desta melisleyn. Amen.`,
    amharic: `አምላኬ እግዚአብሔር ሆይ፣ በአንተ ላይ ኃጢአት ሠራሁአለሁ፣
በባልደረሳየም ላይ።
በሃሳብ፣ በቃል፣ እና በግባር ኃጢአት ሠራሁአለሁ።
አውቄ እና ሳላውቅ ኃጢአት ሠራሁአለሁ።
ይቅርታ ብለኝ እግዚአብሔር ሆይ፣ ኃጢአተኛ ነኝ።
እንደ ምህረትህ ኢማሂረይን።
ከበደላየ አጥረኝ።
ከኃጢአቴን አንጽሄኝ።
ንጹህ ልብን ፍጠራ አምላክ ሆይ፣
ትክክል መንፈስንም አሐድስለኝ።
ከፊትህ አታግለኝ፣
መንፈስ ቅዱስህንም ከእኔ አይትውሰድ።
የድኅነትህ ደስታ መልስለኝ። አሜን።`,
    geez: `እግዚኦ፡ አምላኪየ፡ አበስኩ፡ ቅድሜከ፡
ወቅድመ፡ ቢጸየ፡
አበስኩ፡ በአእምሮ፡ በቃል፡ ወበገብር፡
አበስኩ፡ ዐዊቀ፡ ወዘእንበለ፡ ያእምር፡
ኅድግ፡ ሊተ፡ እግዚኦ፡ እስመ፡ ኃጥእ፡ አነ፡
ተሣሃለኒ፡ በከመ፡ ምሕረትከ፡
ኅፅበኒ፡ ፈድፋድ፡ እምአበሳየ፡
ወእማዕፆየ፡ አንጽሐኒ፡
ልበ፡ንጹሐ፡ ፍጠር፡ ሊተ፡ አምላኪየ፡
ወመንፈሰ፡ ርቱዐ፡ አሐድስ፡ ውስጤትየ፡
ኢትገፍዐኒ፡ እምቅድመ፡ ገጽከ፡
ወመንፈስ፡ ቅዱሰከ፡ ኢትነሥአ፡ እምኔየ፡
ሀበኒ፡ ፍሥሐ፡ ዘድኅነትከ፡ አሜን።`,
    description:
      "A prayer of deep repentance drawing from Psalm 51, asking God for forgiveness and spiritual renewal.",
    tags: ["repentance", "psalm 51", "forgiveness"],
  },
  {
    id: "7",
    title: "Before Communion Prayer",
    slug: "before-communion-prayer",
    category: "Communion Prayers",
    english: `I believe, O Lord, and I confess
that You are truly the Christ,
the Son of the living God,
who came into the world to save sinners,
of whom I am the chief.
I believe that this is truly Your holy Body
and this is truly Your precious Blood.
I pray You, have mercy upon me
and forgive me my trespasses,
voluntary and involuntary,
in word and in deed,
in knowledge and in ignorance.
Make me worthy to partake of Your holy Mysteries
without condemnation,
for the remission of sins
and for life everlasting. Amen.`,
    amharicTransliteration: `Amiinalehu Egziabher hoy, enna amiistalehu,
ante bewinet Kristos nehih,
yehiyaw Amlak Lij,
hatiategnawin lemadihin wede alem yemetah,
kehuluem Talagahu ine neny.
Amiinalehu yizih bewinet Kidus Sigahih yihone,
yizihim bewinet Kiburin Demih yihone.
Elbihalehu imahireyin,
ibadeleynenim yikirta bileyin,
yetawekutin yaltawekutin,
beqalin begibbirin,
aweqe enna salawek.
Yante Kidus Mistir endibiqah argeyn,
iyalteferdedebin,
lehatiat siryat,
enna lezelealem hiwot. Amen.`,
    amharic: `አምናለሁ እግዚአብሔር ሆይ፣ እና አምስታለሁ፣
አንተ በውነት ክርስቶስ ነህ፣
የሕያው አምላክ ልጅ፣
ኃጢአተኛውን ለማዳህን ወደ ዓለም የመጣህ፣
ከሁሉም ታላጋሁ እኔ ነኝ።
አምናለሁ ይዚህ በውነት ቅዱስ ሥጋህ ይሆን፣
ይዚህም በውነት ክቡርን ደምህ ይሆን።
እልብሃለሁ ኢማሂረይን፣
ኢባደለየንንም ይቅርታ ብለይን፣
የታወቁትን የልታወቁትን፣
በቃልን በግብርን፣
አውቄ እና ሳላውቅ።
ያንተ ቅዱስ ምሥጢር እንድብቃህ አርገኝ፣
እያልተፈረደድብን፣
ለኃጢአት ስርየት፣
እና ለዘለዓለም ሕይወት። አሜን።`,
    geez: `አአምን፡ እግዚኦ፡ ወእትአመን፡
ከመ፡ አንተ፡ ውእቱ፡ በአማን፡ ክርስቶስ፡
ወልደ፡ እግዚአብሔር፡ ሕያው፡
ዘመጻእከ፡ ውስተ፡ ዓለም፡ ከመ፡ ታድኅን፡ ኃጥአን፡
ዘእምኵሎሙ፡ ቀዳሚ፡ አነ፡ ውእቱ፡
አአምን፡ ከመ፡ ዝንቱ፡ ውእቱ፡ በአማን፡ ሥጋከ፡ ቅዱስ፡
ወዝንቱ፡ ውእቱ፡ በአማን፡ ደምከ፡ ክቡር፡
እስእለከ፡ ተሣሃለኒ፡
ወኅድግ፡ ሊተ፡ አበሳየ፡ አሜን።`,
    description:
      "The prayer of faith recited before receiving Holy Communion, confessing belief in the real presence of Christ in the Eucharist.",
    tags: ["communion", "eucharist", "confession of faith"],
  },
  {
    id: "8",
    title: "Prayer to the Virgin Mary",
    slug: "prayer-to-the-virgin-mary",
    category: "Marian Prayers",
    english: `Hail Mary, full of grace,
the Lord is with you.
Blessed are you among women,
and blessed is the fruit of your womb, Jesus Christ.
Holy Mary, Mother of God,
pray for us sinners,
now and at the hour of our death. Amen.

O Virgin Mary, Mother of God,
you are the golden censer
who carried the burning coal of divinity.
You are the Ark of the Covenant,
overlaid within and without with gold.
Intercede for us before your beloved Son,
that He may forgive us our sins. Amen.`,
    amharicTransliteration: `Tena yistilign Maryam, sigatun yetemolaash,
Egziabher kaanti gar new.
Kezenawin hulu yetabarekshuall,
yemahtsennishim fere Iyesus Kristos yitabarkal.
Kidist Maryam, Yegziabher Innat,
lesiboten silyi,
ahun enna beseatih. Amen.

Dingilin Maryam, Yegziabher Innat,
ante yewerq istsan nesh,
yeasmlakinnet fichel yeteseketash.
Ante yekidanih tabot nesh.
Kewist kewech bewerq yetelewbesash.
Bewedu Lijish fit amilikilinyin,
hatiatachinenin yisiriyelan. Amen.`,
    amharic: `ጤና ይስጥልኝ ማሪያም፣ ጸጋውን የተሞላሽ፣
እግዚአብሔር ካንቲ ጋር ነው።
ከዘናዊን ሁሉ የታባረክሹዋል፣
የማህፀንሽም ፍሬ ኢየሱስ ክርስቶስ ይታባራካል።
ቅድስት ማሪያም፣ የእግዚአብሔር እናት፣
ለሰቦትን ስልይ፣
አሁን እና በሰዓትህ። አሜን።

ድንግልን ማሪያም፣ የእግዚአብሔር እናት፣
አንቲ የወርቅ እስፃን ነሽ፣
የአስምላክነት ፍሕል የተሰቀጣሽ።
አንቲ የኪዳንህ ታቦት ነሽ።
ከውስጥ ከውጭ በወርቅ የተለበሳሽ።
በወዱ ልጅሽ ፊት አማልክልኝን፣
ኃጢአታችንንም ይስርየልን። አሜን።`,
    geez: `ተፈሥሒ፡ ማሪያም፡ ፍጽምተ፡ ጸጋ፡
እግዚአብሔር፡ ምስሌኪ፡
ብፅዕት፡ አንቲ፡ እምአንስት፡
ወብፁዕ፡ ፍሬ፡ ከርሥኪ፡ ኢየሱስ፡ ክርስቶስ፡
ቅድስት፡ ማሪያም፡ ወላዲተ፡ አምላክ፡
ጸልዪ፡ በእንቲአነ፡ ኃጥአን፡
ይእዜ፡ ወበጊዜ፡ ሞትነ፡ አሜን።`,
    description:
      "Prayers honoring the Blessed Virgin Mary, the Theotokos (God-bearer). Ethiopian Orthodoxy holds a deep devotion to St. Mary, dedicating 33 feast days to her throughout the year.",
    tags: ["mary", "theotokos", "intercession"],
  },
  {
    id: "9",
    title: "Psalm 51 (Prayer of David)",
    slug: "psalm-51",
    category: "Psalms",
    english: `Have mercy upon me, O God,
according to Your loving-kindness;
according to the multitude of Your tender mercies,
blot out my transgressions.
Wash me thoroughly from my iniquity,
and cleanse me from my sin.
For I acknowledge my transgressions,
and my sin is always before me.
Against You, You only, have I sinned,
and done this evil in Your sight.
Create in me a clean heart, O God,
and renew a steadfast spirit within me.
Do not cast me away from Your presence,
and do not take Your Holy Spirit from me.
Restore to me the joy of Your salvation,
and uphold me by Your generous Spirit.`,
    amharicTransliteration: `Amlak hoy, endak mihiretih imahireyin;
endak bizu irhamnetih,
ibadeleyen demisissileyn.
Kebadelaye enqa atibeny,
kehatiatiyen antsiheny.
Ibadeleyen aweqalehu,
hatiatiyen huligize befitiyen new.
Beante beante bichana hatiat serchalehu,
bezih ikuyet befitih serchalehu.
Nitsuh libin ftera Amlak hoy,
tikkil menfessinem ahadisileyin.
Kefitihih atagileyin,
Menfes Kidusihinin keinie aitwesd.
Yedihihetih desta melisileyin,
betolaqhi Menfes yadirgeyin.`,
    amharic: `አምላክ ሆይ፣ እንደ ምህረትህ ኢማሂረይን፤
እንደ ብዙ ርኅራኄ ነትህ፣
ኢባደለየን ደምሲስለይን።
ከበደላየ እንቃ አጥበኝ፣
ከኃጢአቴን አንጽሄኝ።
ኢባደለየን አውቃለሁ፣
ኃጢአቴየን ሁልግዜ በፊቴን ነው።
በአንተ በአንተ ብቻና ኃጢአት ሠራሁአለሁ፣
በዚህ ኢኵየት በፊትህ ሠራሁአለሁ።
ንጹህ ልብን ፍጠራ አምላክ ሆይ፣
ትክክል መንፈስንም አሐድስለይን።
ከፊትህ አታግለይን፣
መንፈስ ቅዱስህንም ከእኔ አይትውሰድ።
የድኅነትህ ደስታ መልስለይን፣
በቶላቅህ መንፈስ ያድርገይን።`,
    geez: `ተሣሃለኒ፡ አምላኪየ፡
በከመ፡ ዐቢይ፡ ምሕረትከ፡
ወበከመ፡ ብዙኅ፡ ሣህልከ፡
ደምሥስ፡ አበሳየ፡
ኅፅበኒ፡ ፈድፋደ፡ እምአበሳየ፡
ወእማዕፆየ፡ አንጽሐኒ፡
እስመ፡ አበሳየ፡ አነ፡ አአምር፡
ወኃጢአትየ፡ ትቅዕ፡ ቅድሜየ፡ ኵልጊዜ፡
ለከ፡ ባሕቲትከ፡ አበስኩ፡
ወእኩየ፡ በቅድሜከ፡ ገበርኩ፡
ልበ፡ ንጹሐ፡ ፍጠር፡ ሊተ፡ አምላኪየ፡
ወመንፈሰ፡ ርቱዐ፡ አሐድስ፡ ውስጤትየ፡
ኢትገፍአኒ፡ እምቅድመ፡ ገጽከ፡
ወመንፈስ፡ ቅዱሰከ፡ ኢትነሥአ፡ እምኔየ፡
ሀበኒ፡ ፍሥሐ፡ ዘድኅነትከ፡
ወበመንፈስ፡ መኰንን፡ አጽንዐኒ።`,
    description:
      "The great penitential Psalm of King David, prayed after his sin with Bathsheba. It is one of the most frequently recited prayers in Ethiopian Orthodox devotion.",
    tags: ["psalm", "repentance", "david", "foundational"],
  },
  {
    id: "10",
    title: "Prayer to St. Michael the Archangel",
    slug: "prayer-to-st-michael",
    category: "Saint Prayers",
    english: `O Holy Archangel Michael,
captain of the heavenly hosts,
defender of the faith,
protector of the people of God,
intercede for us before the throne of the Most High.
By your power, cast down the enemies of the Church.
By your prayer, shield us from all evil.
Guard our coming in and our going out,
from this time forth and forevermore.
Through your intercession,
may we be found worthy of the kingdom of heaven. Amen.`,
    amharicTransliteration: `Kidus Liqa Malaekt Mikael hoy,
yesemay serawit alebqa,
yehaimanot atstabaki,
yeEgziabher hizb atsibaki,
beAllahi zufan fit amilikilin.
behaylih yebetkristianin tsalat agudem.
besilotih kekulu ekuy tsibin.
mewitachinnim megbitachinnim atshibin,
keahun jemiro lezelealem.
Beamilakinnetih,
yesemay mengist endinibiqah argeny. Amen.`,
    amharic: `ቅዱስ ሊቃ መላእክት ሚካኤል ሆይ፣
የሰማይ ሠራዊት አለበቃ፣
የሃይማኖት አጽጣባቂ፣
የእግዚአብሔር ህዝብ አጽባቂ፣
በአላሒ ዙፋን ፊት አማልክልን።
በኃይልህ የቤትክርስቲያንን ጸላት አጉደም።
በጸሎትህ ከኩሉ ኢኩይ ጽብን።
መውጫችንንም መግቢያችንንም አጽህብን፣
ከአሁን ጀምሮ ለዘለዓለም።
በአማላክነትህ፣
የሰማይ መንግሥት እንድንብቃህ አርገኝ። አሜን።`,
    geez: `ቅዱስ፡ ሊቀ፡ መላእክት፡ ሚካኤል፡
መኰንን፡ ዘሰማያዊያን፡ ሠራዊት፡
ዕቀበነ፡ ወአማልድ፡ ለነ፡
ቅድመ፡ መንበሩ፡ ለልዑል፡
ስዱድ፡ ፀርነ፡ በኃይልከ፡
ዕቀበነ፡ እምኵሉ፡ እኩይ፡ በጸሎትከ፡ አሜን።`,
    description:
      "A prayer to the Archangel Michael, the chief of the heavenly hosts. Ethiopian Christians have a special devotion to St. Michael, celebrating his feast on the 12th of every Ethiopian month.",
    tags: ["archangel", "michael", "protection", "intercession"],
  },
  {
    id: "11",
    title: "Prayer to St. Gabriel the Archangel",
    slug: "prayer-to-st-gabriel",
    category: "Saint Prayers",
    english: `O Holy Archangel Gabriel,
messenger of the Most High God,
you who announced the Incarnation to the Virgin Mary,
you who brought glad tidings to Zechariah,
intercede for us before the Lord our God.
Deliver us from all tribulation and danger.
Bring us the good news of God's mercy.
May your prayers be a shield around us. Amen.`,
    amharicTransliteration: `Kidus Malaekt Gebriel hoy,
yeAllahi Amlak meliektegna,
leDingilin Maryam silesetotegna yenegirhiat,
leZekaryas yedesta werie yametahit,
beEgziabher Amlakachin fit amilikilin.
Kekullu mechegager enna aedega adnin.
YeEgziabher mihiret yedista werie amtsilinyin.
Silotih bezebibachin megeniya yihun. Amen.`,
    amharic: `ቅዱስ መላእክት ገብርኤል ሆይ፣
የአላሒ አምላክ መልእክተኛ፣
ለድንግልን ማሪያም ስለስቶተኛ የነግርሒአት፣
ለዘካርያስ የደስታ ወሬ ያመጣህት፣
በእግዚአብሔር አምላካችን ፊት አማልክልን።
ከኩሉ መቸጋጋር እና አኢደጋ አድንን።
የእግዚአብሔር ምህረት የድስታ ወሬ አምጽልኝን።
ጸሎትህ በዘቢባችን መገንያ ይሁን። አሜን።`,
    geez: `ቅዱስ፡ መልአክ፡ ገብርኤል፡
መልእክተኛ፡ ዘልዑል፡ እግዚአብሔር፡
ዘአብሠርከ፡ ለማሪያም፡ ድንግል፡
ዘበእንተ፡ ሥጋዌ፡
አማልድ፡ ለነ፡ ቅድመ፡ እግዚአብሔር፡ አምላክነ፡
አድኅነነ፡ እምኵሉ፡ ምንዳቤ፡ ወሕማም፡ አሜን።`,
    description:
      "A prayer to the Archangel Gabriel, the messenger who announced the Incarnation to the Virgin Mary. His feast is celebrated on the 19th of every Ethiopian month.",
    tags: ["archangel", "gabriel", "intercession"],
  },
  {
    id: "12",
    title: "Magnificat (Song of Mary)",
    slug: "magnificat",
    category: "Marian Prayers",
    english: `My soul magnifies the Lord,
and my spirit has rejoiced in God my Savior.
For He has regarded the lowly state of His maidservant;
for behold, henceforth all generations will call me blessed.
For He who is mighty has done great things for me,
and holy is His name.
And His mercy is on those who fear Him
from generation to generation.
He has shown strength with His arm;
He has scattered the proud in the imagination of their hearts.
He has put down the mighty from their thrones,
and exalted the lowly.
He has filled the hungry with good things,
and the rich He has sent away empty.`,
    amharicTransliteration: `Nefsiye Egziabherin tabikalech,
menfesiyem beMadiniye Egziabher teseftalech.
Yegeredawin tihut yaleyn amahiyawun aytoalina;
eney keahun jemiro hullum tiwild yitlalal yiluiyal.
Hayyaw tiliq neger adirigolignalina;
simum kidus new.
Mihiretum yemifiruhutinn,
ketiwiild esketiwiild new.
Behaylunna bekiraun amlakttoalall;
tiabiyanun belib hasabaciw betinawallall.
Hayyawaninn keminfastoachew awoirdoalall,
tihutaninn keafitoalall.
Yetarabulitinin bemelkam neger shamuwalall,
habittamunnin bado ittawalall.`,
    amharic: `ነፍሴ እግዚአብሔርን ታቢካለች፣
መንፈሴም በማዳኝየ እግዚአብሔር ተሰፍታለች።
የገረዳዊን ትሁት ያልየን አማሒያውን አይቶዋልና፤
እኔ ከአሁን ጀምሮ ሁሉም ትውልድ ይጠላአል ይሉኝዋል።
ኃያው ትልቅ ነገር አድርጎልኛልና፤
ስሙም ቅዱስ ነው።
ምህረቱም የሚፈሩሁትን፣
ከትውልድ እስከትውልድ ነው።
በኃይሉና በክራኡን አምላክቶዋልል፤
ትዕቢያኑን በልብ ሃሳባቸው በትንዋለልል።
ኃያዋንን ከመንፈስቶአቸው አውርዶዋልል፣
ትሁታንን ከፍቶዋልል።
የታራቡልትንን በመልካም ነገር ሻሙዋልል፣
ሃብታሙንን ባዶ ኢትታዋልል።`,
    geez: `ታዐቢ፡ ነፍስየ፡ ለእግዚአብሔር፡
ወተፈሥሐ፡ መንፈስየ፡ በአምላኪየ፡ መድኃኒየ፡
እስመ፡ ርእየ፡ ትሕትናሃ፡ ለአመቱ፡
ናሁ፡ እምይእዜ፡ ያስተብፅዑኒ፡ ኵሉ፡ ትውልድ፡
እስመ፡ ገብረ፡ ሊተ፡ ዐቢየ፡ ኃያል፡
ወቅዱስ፡ ስሙ፡
ወምሕረቱ፡ ለእለ፡ ይፈርሁ፡
እምትውልድ፡ እስከ፡ ትውልድ።`,
    description:
      "The Magnificat, the song of the Blessed Virgin Mary recorded in Luke 1:46-55, expressing her joy and gratitude upon learning she would bear the Son of God.",
    tags: ["mary", "song", "praise", "scripture"],
  },
  {
    id: "13",
    title: "Prayer Before Meals",
    slug: "prayer-before-meals",
    category: "Daily Prayers",
    english: `Bless us, O Lord, and these Your gifts
which we are about to receive from Your bounty.
Through Christ our Lord. Amen.

The eyes of all look to You,
and You give them their food in due season.
You open Your hand
and satisfy the desire of every living thing.`,
    amharicTransliteration: `Egziabher hoy barkilin, yizihinnim sigaotihhin,
kemihiretihin yeminitisitih,
beKristos Amlakachin. Amen.

Yehullu ayin wedante yitayetal,
migbaciwenym begizew titisitalesh.
Ijihhin tikefitalesh,
yehulunm hiyaw fitot timoiwalesh.`,
    amharic: `እግዚአብሔር ሆይ ባርክልን፣ ይዚህንም ስጋኦትህን፣
ከምህረትህን የምንጥስጥህ፣
በክርስቶስ አምላካችን። አሜን።

የሁሉ ዓይን ወዳንተ ይጠያያጣል፣
ምግባቸውንም በጊዜው ትስጣጣለሽ።
እጅህን ትከፍታለሽ፣
የሁሉንም ሕያው ፍቶት ትሞዋዋለሽ።`,
    geez: `ባርከነ፡ እግዚኦ፡ ወዘንተ፡ ጸጋከ፡
ዘንነሥእ፡ እምሠናይትከ፡
በክርስቶስ፡ እግዚእነ፡ አሜን።`,
    description:
      "A prayer said before meals to bless the food and give thanks to God for His provision.",
    tags: ["daily", "meals", "thanksgiving"],
  },
  {
    id: "14",
    title: "Prayer After Meals",
    slug: "prayer-after-meals",
    category: "Daily Prayers",
    english: `We give You thanks, Almighty God,
for all Your benefits,
who lives and reigns forever and ever.
May the souls of the faithful departed,
through the mercy of God, rest in peace. Amen.`,
    amharicTransliteration: `Hulu yemitchil Amlak hoy,
amesginalenin lehulu mihiretih,
lezelealem yeminor enna yeminegs.
Yehaimanot mutiwan nefsoch,
bemihiretih beselam yianirfu. Amen.`,
    amharic: `ሁሉ የምትችል አምላክ ሆይ፣
አመሰግናለን ለሁሉ ምህረትህ፣
ለዘለዓለም የምትኖር እና የምትነግሥ።
የሃይማኖት ሙቲዋን ነፍሶች፣
በምህረትህ በሰላም ያንርፉ። አሜን።`,
    geez: `ንሴብሕ፡ ለከ፡ ኵሉ፡ ይትከል፡ አምላክ፡
በእንተ፡ ኵሉ፡ ጸጋከ፡
ዘትነብር፡ ወትነግሥ፡ ለዓለመ፡ ዓለም፡ አሜን።`,
    description:
      "A prayer of thanksgiving said after meals, including a remembrance of the faithful departed.",
    tags: ["daily", "meals", "thanksgiving", "departed"],
  },
  {
    id: "15",
    title: "Feast of the Nativity Prayer",
    slug: "feast-of-nativity-prayer",
    category: "Feast Prayers",
    english: `Glory to God in the highest,
and on earth peace, goodwill toward men.
Today the Virgin has given birth to the Eternal.
Today the earth offers a cave to the Unapproachable.
Angels and shepherds give glory.
Wise men journey with a star.
For unto us is born a Savior,
who is Christ the Lord.

O Christ our God, who was born in Bethlehem,
grant us to celebrate Your Nativity with purity of heart,
that we may glorify You with the angels,
singing: Glory to God in the highest. Amen.`,
    amharicTransliteration: `Kibir leEgziabher bealiyaw semay,
bemidrim selam, lemisawoch melkam fiqad.
Zare dingilin lezelealemawin weldialech.
Zare midrin lemaliqerebew ziqaba tisitiwalech.
Malaekkitinna irebagnoch kibir yisetallu.
Tibebegnoch bekoikob yigizallu.
Lenin Madihaniye tewuldonalinna,
irsu Kristos Egziabher new.

Kristos Amlakachin hoy, beBetilihem yeteweldeh,
lildetihhin benitsuh lib enasebih sitenin,
kemalaekkit gar endinikebrihin,
eyyezefenin: Kibir leEgziabher bealiyaw semay. Amen.`,
    amharic: `ክብር ለእግዚአብሔር በአልየው ሰማይ፣
በምድርም ሰላም፣ ለሚሳዎች መልካም ፍቃድ።
ዛሬ ድንግልን ለዘለዓለማዊን ወልድዋለች።
ዛሬ ምድርን ለማልቅረበው ዝቃባ ትሰትዋለች።
መላእክትና እረቦኞች ክብር ይሰጣሉ።
ጥበበኞች በኮከብ ይግዛሉ።
ለኒን ማድሃኒየ ተውልዶናልና፣
እርሱ ክርስቶስ እግዚአብሔር ነው።

ክርስቶስ አምላካችን ሆይ፣ በቤትልሔም የተወለድህ፣
ልድትህን በንጹህ ልብ እናሰብህ ስጠንን፣
ከመላእክት ጋር እንድንከብርህን፣
እየዘፈንን: ክብር ለእግዚአብሔር በአልየው ሰማይ። አሜን።`,
    geez: `ስብሐት፡ ለእግዚአብሔር፡ በሰማያት፡ ልዑላት፡
ወበምድር፡ ሰላም፡ ለሰብእ፡ ሠናይት፡ ፈቃድ፡
ዮም፡ ድንግል፡ ወለደት፡ ዘለዓለም፡
ዮም፡ ምድር፡ ወሀበት፡ በዐት፡ ለዘኢይትቀረብ፡
መላእክት፡ ወመሳጥር፡ ያመስግኑ፡
ጠቢባን፡ ይጐዐዙ፡ ምስለ፡ ኮከብ፡
እስመ፡ ተወልደ፡ ለነ፡ መድኃኒት፡
ውእቱ፡ ክርስቶስ፡ እግዚአብሔር፡ አሜን።`,
    description:
      "A prayer for the Feast of the Nativity (Genna/Christmas), celebrating the birth of Jesus Christ in Bethlehem. Ethiopian Christmas is celebrated on January 7th (Tahsas 29).",
    tags: ["feast", "nativity", "christmas", "genna"],
  },
  {
    id: "16",
    title: "Prayer of St. Ephrem",
    slug: "prayer-of-st-ephrem",
    category: "Repentance Prayers",
    english: `O Lord and Master of my life,
take from me the spirit of sloth,
faint-heartedness, lust of power, and idle talk.
But give rather the spirit of chastity,
humility, patience, and love to Your servant.
Yes, O Lord and King,
grant me to see my own sins
and not to judge my brother,
for You are blessed unto ages of ages. Amen.`,
    amharicTransliteration: `Yehiwotiye Egziabher enna Alebqa hoy,
yesinfna menfes keinie awagid,
yefirhat maselot, yesiltsan fiqad, enna yebado neger.
Yenitsihina menfes gibba sitenyi,
yetihitina, yetibibiqe, enna yefiqir.
Awo Egziabher enna Nigus hoy,
yirasiye hatiat enaytih sitenyi,
wendimiyenim endalifired,
ante yetabarekeh nehih lezelealem. Amen.`,
    amharic: `የሕይወቴ እግዚአብሔር እና አለብቃ ሆይ፣
የስንፍና መንፈስ ከእኔ አውጋድ፣
የፍርሃት ማሰለት፣ የሥልጣን ፍቃድ፣ እና የባዶ ነገር።
የንጽሕና መንፈስ ግባ ስጠኝ፣
የትሕትና፣ የትብብቄ፣ እና የፍቅር።
አዎ እግዚአብሔር እና ንጉሥ ሆይ፣
ይራሴ ኃጢአት እናይት ስጠኝ፣
ወንድሜንም እንዳልፈርድ፣
አንተ የታባረከህ ነህ ለዘለዓለም። አሜን።`,
    geez: `እግዚኦ፡ ወመኰንን፡ ዘሕይወትየ፡
መንፈሰ፡ ስንፍና፡ ነሢአ፡ እምኔየ፡
ወፍሥሐ፡ ከንቱ፡ ወፍትወተ፡ ሥልጣን፡
ወነገረ፡ ከንቱ፡
ወሀበኒ፡ መንፈሰ፡ ንጽሕና፡
ትሕትና፡ ትዕግሥት፡ ወፍቅር፡
ለገብርከ፡
ኦ፡ እግዚኦ፡ ንጉሥ፡
ሀበኒ፡ ከመ፡ እርአይ፡ ኃጢአትየ፡
ወኢይኰንን፡ እኁየ፡
እስመ፡ ብፁዕ፡ አንተ፡ ለዓለመ፡ ዓለም፡ አሜን።`,
    description:
      "The Prayer of St. Ephrem the Syrian, one of the most beloved Lenten prayers in the Orthodox tradition. It is a prayer for spiritual transformation and humility.",
    tags: ["repentance", "lent", "humility", "st ephrem"],
  },
  {
    id: "17",
    title: "Kidus Kidus Kidus (Sanctus)",
    slug: "kidus-kidus-kidus",
    category: "Feast Prayers",
    english: `Holy, Holy, Holy, Lord God of hosts,
heaven and earth are full of Your glory.
Hosanna in the highest.
Blessed is He who comes in the name of the Lord.
Hosanna in the highest.`,
    amharicTransliteration: `Kidus, Kidus, Kidus, Egziabher Tsebaot,
semayinna midrin kibrihin yetemoialech.
Hosiana bealiyaw.
Yetabareke besime Egziabher yemimetah.
Hosiana bealiyaw.`,
    amharic: `ቅዱስ፣ ቅዱስ፣ ቅዱስ፣ እግዚአብሔር ጸባኦት፣
ሰማይና ምድርን ክብርህ የተሞዋለች።
ሆሳዕና በአልየው።
የታባረከ በስመ እግዚአብሔር የሚመጣህ።
ሆሳዕና በአልየው።`,
    geez: `ቅዱስ፡ ቅዱስ፡ ቅዱስ፡ እግዚአብሔር፡ ጸባኦት፡
ምሉእ፡ ሰማያት፡ ወምድር፡ ስብሐቲከ፡
ሆሣዕና፡ በአርያም፡
ቡሩክ፡ ዘይመጽእ፡ በስመ፡ እግዚአብሔር፡
ሆሣዕና፡ በአርያም።`,
    description:
      "The Sanctus (Kidus Kidus Kidus), the hymn of the angels from Isaiah 6:3, sung during the Divine Liturgy before the consecration of the Eucharist.",
    tags: ["liturgical", "sanctus", "angels", "eucharist"],
  },
  {
    id: "18",
    title: "Prayer for the Departed",
    slug: "prayer-for-the-departed",
    category: "Evening Prayers",
    english: `O God of spirits and of all flesh,
who has trampled down death
and overthrown the devil
and given life to Your world:
Give rest, O Lord, to the souls of Your departed servants,
in a place of light, a place of happiness,
a place of peace,
where there is no pain, no grief, no sighing.
And since You are a merciful God who loves mankind,
forgive them every transgression
committed by them in word or deed or thought.
For there is no one who lives and does not sin.
You alone are without sin.
Your righteousness is an everlasting righteousness
and Your word is truth. Amen.`,
    amharicTransliteration: `YeMenfesochin enna yehulu siga Amlak hoy,
motin yeregeteh,
seyitanin yagedeleh,
lealemih hiwot yeseteteh:
Egziabher hoy, yeteleyut agelgayocihin nefsoch ireft sitih,
bebirhan sifra, bedesta sifra,
beselam sifra,
himim, hazin, enna tenichit yelelew bota.
Mihireten Amlak sihonih, sewin yemiwod,
hulu ibadilaciwinn yikirta bilachew,
beqal, begibar, behasab yisretutin.
Hiyaw huno yalabese yelem.
Ante bichaha kale hatiat nehih.
Tsidiqih lezelealem tsidiq new.
Qalihim iwinet new. Amen.`,
    amharic: `የመንፈሶችን እና የሁሉ ሥጋ አምላክ ሆይ፣
ሞትን የረገጥህ፣
ሰይጣንን ያገደልህ፣
ለዓለምህ ሕይወት የሰጠጥህ፤
እግዚአብሔር ሆይ፣ የተለዩት አገልጋዮችህን ነፍሶች ዕረፍት ስጥህ፣
በብርሃን ስፍራ፣ በደስታ ስፍራ፣
በሰላም ስፍራ፣
ሕምም፣ ሃዘን፣ እና ተንችት የለለው ቦታ።
ምህረተን አምላክ ስሆንህ፣ ሰውን የሚውድ፣
ሁሉ ኢባድላቸውን ይቅርታ ብላቸው፣
በቃል፣ በግባር፣ በሃሳብ ይስረቱትን።
ሕያው ሁኖ ያላበሰ የለም።
አንተ ብቻሃ ካለ ኃጢአት ነህ።
ጽድቅህ ለዘለዓለም ጽዱቅ ነው።
ቃልህም እውነት ነው። አሜን።`,
    geez: `አምላከ፡ መናፍስት፡ ወኵሉ፡ ሥጋ፡
ዘሞተ፡ ረገጽከ፡
ወዲያብሎስ፡ ሰበርከ፡
ወሕይወተ፡ ወሀብከ፡ ለዓለምከ፡
ሀብ፡ እግዚኦ፡ ዕረፍተ፡ ለነፍሳቲሆሙ፡ ለአግብርቲከ፡ ሙታን፡
ውስተ፡ መካን፡ ዘብርሃን፡ መካን፡ ዘፍሥሐ፡
መካን፡ ዘሰላም፡
ኀበ፡ አልቦ፡ ሕማም፡ ወኀዘን፡ ወተንሥኦት፡ አሜን።`,
    description:
      "A prayer for the repose of the faithful departed, asking God to grant them rest in a place of light, joy, and peace.",
    tags: ["departed", "memorial", "rest", "mercy"],
  },
  {
    id: "19",
    title: "Prayer of the Covenant of Mercy",
    slug: "prayer-of-the-covenant-of-mercy",
    category: "Marian Prayers",
    english: `O my Lady, the Holy Virgin Mary,
Mother of God, full of grace,
the joy of the whole world,
the honor of our race,
you are higher than the heavens,
purer than the light of the sun.
You have found grace before God.
Through your prayers and intercessions,
and through the love of your Son our Lord Jesus Christ,
grant us forgiveness of our sins.
O Mother of God, intercede for us.
O Lady of us all, our Queen,
our support and our boast,
deliver us from all distress. Amen.`,
    amharicTransliteration: `Igzitiye kidist Dingilin Maryam,
Yegziabher Innat, sigatun yetemolaash,
yealem hulu desta,
yezegachin kibir,
kesemay yemitileki,
keyetsehay birhan yemitinetsahi.
BeEgziabher fit sigat aginyitesh.
Besilotishinna beamilakinnetish,
bewedij Lijish beEgziabherachin Iyesus Kristos fiqir,
hatiatichininn yikirta yibelelan.
Yegziabher Innat hoy, amilikilinyin.
Igzitiye yehulachin, Nigist,
migibarachin enna tirmizachin,
kekulu chigir adniny. Amen.`,
    amharic: `እግዝትየ ቅድስት ድንግልን ማሪያም፣
የእግዚአብሔር እናት፣ ጸጋውን የተሞላሽ፣
የዓለም ሁሉ ደስታ፣
የዘጋችን ክብር፣
ከሰማይ የምትልቂ፣
ከፀሐይ ብርሃን የምትንፀሒ።
በእግዚአብሔር ፊት ጸጋት አግኝተሽ።
በጸሎትሽና በአማላክነትሽ፣
በወድጅ ልጅሽ በእግዚአብሔራችን ኢየሱስ ክርስቶስ ፍቅር፣
ኃጢአታችንን ይቅርታ ይበለልን።
የእግዚአብሔር እናት ሆይ፣ አማልክልኝን።
እግዝትየ የሁላችን፣ ንግሥት፣
ምግባራችን እና ትርምዛችን፣
ከኩሉ ችግር አድንኝ። አሜን።`,
    geez: `እግዝእትየ፡ ቅድስት፡ ድንግል፡ ማሪያም፡
ወላዲተ፡ አምላክ፡ ፍጽምተ፡ ጸጋ፡
ፍሥሐ፡ ለኵሉ፡ ዓለም፡
ክብር፡ ዘዘርእነ፡
ልዕልት፡ እምሰማያት፡
ንጽሕት፡ እምብርሃነ፡ ፀሐይ፡
ረከብኪ፡ ጸጋ፡ ቅድመ፡ እግዚአብሔር፡
በጸሎትኪ፡ ወበስእለትኪ፡
ወበፍቅረ፡ ወልድኪ፡ እግዚእነ፡ ኢየሱስ፡ ክርስቶስ፡
ኅድግ፡ ለነ፡ ኃጢአትነ፡
ወላዲተ፡ አምላክ፡ ጸልዪ፡ በእንቲአነ፡ አሜን።`,
    description:
      "A prayer invoking the Covenant of Mercy (Kidane Mihret), the promise Christ made to honor the intercessions of His mother. This devotion is central to Ethiopian Orthodox Marian piety.",
    tags: ["mary", "kidane mihret", "covenant", "intercession"],
  },
  {
    id: "20",
    title: "Prayer of the Cross",
    slug: "prayer-of-the-cross",
    category: "Daily Prayers",
    english: `By the power of the Cross of Jesus Christ our Lord,
let all evil be vanquished.
By the Cross, we are saved.
By the Cross, we are sanctified.
By the Cross, we are protected.
O Lord, by Your Holy Cross,
guard us and protect us from all evil.
Through the intercession of all Your saints,
have mercy upon us and save us. Amen.

We bow before Your Cross, O Lord,
and we glorify Your Holy Resurrection.
For by the Cross, joy has come to the whole world.`,
    amharicTransliteration: `BeMesikelu hayil, yeEgziabherachin Iyesus Kristos,
yekulu ikuyet yishenef.
BeMesikel, inidinaleen.
BeMesikel, inikidesaleen.
BeMesikel, inititsibiqaleen.
Egziabher hoy, beKidus Meskelih,
itsibikenu enna kekulu ikuyet arbinya kistireny.
Bekidusan huulu amilakinnet,
imahireyin enna adneny. Amen.

Leante Meskelih insigdaleen, Egziabher hoy,
Kidus tinsa'iehinin nikebralleen.
BeMesikel desta lekulu alem mettoalinna.`,
    amharic: `በመስቀሉ ኃይል፣ የእግዚአብሔራችን ኢየሱስ ክርስቶስ፣
የኩሉ ኢኩየት ይሸነፍ።
በመስቀል፣ እንድናለን።
በመስቀል፣ እንቅደሳለን።
በመስቀል፣ እንትጥብቃለን።
እግዚአብሔር ሆይ፣ በቅዱስ መስቀልህ፣
እጥብቀኑ እና ከኩሉ ኢኩየት አርብንያ ክስትረኝ።
በቅዱሳን ሁሉ አማላክነት፣
ኢማሂረይን እና አድነኝ። አሜን።

ለአንተ መስቀልህ እንስግዳለን፣ እግዚአብሔር ሆይ፣
ቅዱስ ትንሣኤህንም ንከብራልን።
በመስቀል ደስታ ለኩሉ ዓለም መጥቶዋልና።`,
    geez: `በኃይለ፡ መስቀሉ፡ ለእግዚእነ፡ ኢየሱስ፡ ክርስቶስ፡
ይስተሐቅ፡ ኵሉ፡ እኩይ፡
በመስቀል፡ ድኅንነ፡
በመስቀል፡ ተቀደስነ፡
በመስቀል፡ ተዐቀብነ፡
እግዚኦ፡ በቅዱስ፡ መስቀልከ፡
ዕቀበነ፡ ወአድኅነነ፡ እምኵሉ፡ እኩይ፡
በአማላዲሆሙ፡ ለኵሎሙ፡ ቅዱሳንከ፡
ተሣሃለነ፡ ወአድኅነነ፡ አሜን።`,
    description:
      "A prayer invoking the power of the Holy Cross, one of the most cherished symbols in Ethiopian Orthodox Christianity. The Meskel (Finding of the True Cross) is one of the greatest Ethiopian Orthodox feasts.",
    tags: ["cross", "meskel", "protection", "daily"],
  },
];

export function getPrayer(slug: string): Prayer | undefined {
  return prayers.find((p) => p.slug === slug);
}

export function getPrayersByCategory(): Record<string, Prayer[]> {
  return prayers.reduce(
    (acc, prayer) => {
      if (!acc[prayer.category]) acc[prayer.category] = [];
      acc[prayer.category].push(prayer);
      return acc;
    },
    {} as Record<string, Prayer[]>
  );
}
