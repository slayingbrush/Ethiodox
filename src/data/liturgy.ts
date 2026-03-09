export interface LiturgySection {
  id: string;
  title: string;
  description: string;
  english: string;
  amharicTransliteration: string;
  amharic: string;
  geez: string;
  role: "priest" | "deacon" | "congregation" | "all";
}

export const liturgyIntro = {
  title: "The Divine Liturgy (Kidase)",
  description: `The Divine Liturgy — **Kidase** (ቅዳሴ) — is the central act of worship in the Ethiopian Orthodox Tewahedo Church. It is the service in which the Holy Eucharist is consecrated and distributed to the faithful.

The Ethiopian Church possesses **14 anaphoras** (Eucharistic prayers) — more than any other Christian tradition. The most commonly used is the Anaphora of the Apostles.

The Kidase is celebrated in **Ge'ez**, the ancient liturgical language of the Ethiopian Church, though elements may be read in Amharic for the congregation's understanding.`,
  structure: [
    {
      name: "Preparation (Ser'ata Kidase)",
      description: "The priest and deacon prepare the bread and wine for the Eucharist. Prayers of preparation are offered.",
    },
    {
      name: "Liturgy of the Word",
      description: "Readings from the Epistles, Acts, and the Gospels. A homily may be preached.",
    },
    {
      name: "Liturgy of the Faithful",
      description: "The Creed is recited. The great Eucharistic prayer (Anaphora) begins.",
    },
    {
      name: "The Anaphora",
      description: "The central prayer of thanksgiving and consecration. The bread and wine become the Body and Blood of Christ.",
    },
    {
      name: "Communion",
      description: "The faithful who have prepared through fasting and confession receive the Holy Eucharist.",
    },
    {
      name: "Dismissal",
      description: "The congregation is blessed and sent forth to live the faith in the world.",
    },
  ],
};

export const liturgySections: LiturgySection[] = [
  {
    id: "1",
    title: "Opening Blessing",
    description: "The priest begins the Liturgy with the Trinitarian blessing.",
    english: `Priest: Blessed be God the Father Almighty.
People: Amen.
Priest: Blessed be His only-begotten Son, Jesus Christ our Lord.
People: Amen.
Priest: Blessed be the Holy Spirit, the Comforter.
People: Amen.`,
    amharicTransliteration: `Kahin: Yitbarek Egziabher Ab Hulu Yemichil.
Hizb: Amen.
Kahin: Yitbarek Wahid Liju Iyesus Kristos Egziabherachin.
Hizb: Amen.
Kahin: Yitbarek Menfes Kidus Menichamin.
Hizb: Amen.`,
    amharic: `ካህን: ይትባረክ እግዚአብሔር አብ ሁሉ የሚችል።
ህዝብ: አሜን።
ካህን: ይትባረክ ዋሒድ ልጁ ኢየሱስ ክርስቶስ እግዚአብሔራችን።
ህዝብ: አሜን።
ካህን: ይትባረክ መንፈስ ቅዱስ መንቻምን።
ህዝብ: አሜን።`,
    geez: `ካህን: ቡሩክ፡ እግዚአብሔር፡ አብ፡ ኵሉ፡ ይትከል፡
ሕዝብ: አሜን፡
ካህን: ቡሩክ፡ ወልዱ፡ ዋሕድ፡ ኢየሱስ፡ ክርስቶስ፡ እግዚእነ፡
ሕዝብ: አሜን፡
ካህን: ቡሩክ፡ መንፈስ፡ ቅዱስ፡ ፓራቅሊጦስ፡
ሕዝብ: አሜን።`,
    role: "all",
  },
  {
    id: "2",
    title: "The Trisagion",
    description: "The thrice-holy hymn, echoing the angelic worship described in Isaiah 6:3.",
    english: `Holy God, Holy Mighty, Holy Immortal,
have mercy upon us. (×3)

Glory to the Father, and to the Son,
and to the Holy Spirit,
now and always and unto the ages of ages. Amen.`,
    amharicTransliteration: `Kidus Egziabher, Kidus Hayyaw, Kidus Zelealemawi,
imahireyin. (×3)

Kibir leAb, leWeld,
enna leMenfes Kidus,
ahun enna huligize lezelealem. Amen.`,
    amharic: `ቅዱስ እግዚአብሔር፣ ቅዱስ ኃያው፣ ቅዱስ ዘለዓለማዊ፣
ምሕረትከ ይኩን ላዕሌነ። (×3)

ክብር ለአብ፣ ለወልድ፣
እና ለመንፈስ ቅዱስ፣
አሁን እና ሁልጊዜ ለዘለዓለም። አሜን።`,
    geez: `ቅዱስ፡ እግዚአብሔር፡ ቅዱስ፡ ኃያል፡ ቅዱስ፡ ሕያው፡
ዘኢይመውት፡ ተሣሃለነ፡ (×3)

ስብሐት፡ ለአብ፡ ወለወልድ፡
ወለመንፈስ፡ ቅዱስ፡
ይእዜኒ፡ ወዘልፈኒ፡ ወለዓለመ፡ ዓለም፡ አሜን።`,
    role: "all",
  },
  {
    id: "3",
    title: "The Creed (Wemen)",
    description: "The Nicene Creed — the confession of faith proclaimed at every Liturgy.",
    english: `We believe in one God, the Father Almighty,
Maker of heaven and earth,
and of all things visible and invisible.

And in one Lord Jesus Christ,
the only-begotten Son of God,
begotten of the Father before all ages;
Light of Light, true God of true God,
begotten, not made,
of one substance with the Father,
by whom all things were made.

Who for us men and for our salvation
came down from heaven,
and was incarnate by the Holy Spirit
of the Virgin Mary, and was made man.

And was crucified also for us under Pontius Pilate.
He suffered and was buried.

And the third day He rose again
according to the Scriptures.

And ascended into heaven,
and sits on the right hand of the Father.

And He shall come again with glory
to judge the living and the dead,
whose kingdom shall have no end.

And we believe in the Holy Spirit,
the Lord, the Giver of Life,
who proceeds from the Father,
who with the Father and the Son together
is worshiped and glorified,
who spoke through the prophets.

And we believe in one Holy, Catholic,
and Apostolic Church.

We acknowledge one baptism
for the remission of sins.

And we look for the resurrection of the dead,
and the life of the age to come. Amen.`,
    amharicTransliteration: `Naamin beahadu Amlak, Ab Hulu Yemichil,
Fatari yesemay enna yemidirin,
yemitayenna yemaytayim hulu.

Enna beahadu Egziabher Iyesus Kristos,
yeEgziabher Ab wahid Lij,
kequdme kulu alem keAb yetewelde;
Birhan keBirhan, iwnetegna Amlak keiwnetegna Amlak,
yetewelde iyyi yetesera,
keAb gar begibr and yehone,
behullu behirsu yetesera.

Lenin lesibawoch enna ledihnetachin
kesemay yewerede,
beMenfes Kidus
keDingilin Maryam siga nesito sew hone.

Befilatos zemen lesiboten tasqilwal.
tamimo tekeberem.

Besostegna ken endik Mezhaf yikidish
kemutin tensawal.

Wesemay aerege,
bekegni Ab tegmetoalech.

Enna dagim bekibir
hiyawaninna mutiwan lifered yimetal,
lemengistum mecheresha yelem.

Enna beMenfes Kidus naamin,
Egziabher, Hiwot Sachi,
keAb yemiweta,
keAb enna keWeld gar behad
yemisteged enna yemikeber,
benebiyat yetenaggere.

Enna beand Kidist,
Hawariat, enna Hawariat yetesera yetikul Betikristian naamin.

And timkitin namawalleen
lehatiat seryat.

Yemutan tensae initsibiqalen,
yemimetaw alemim hiwot. Amen.`,
    amharic: `ናአምን በአሐዱ አምላክ፣ አብ ሁሉ የሚችል፣
ፈጣሪ የሰማይ እና የምድር፣
የሚታይና የማይታይም ሁሉ።

እና በአሐዱ እግዚአብሔር ኢየሱስ ክርስቶስ፣
የእግዚአብሔር አብ ዋሒድ ልጅ፣
ከቁድሜ ኩሉ ዓለም ከአብ የተወለደ፤
ብርሃን ከብርሃን፣ እውነተኛ አምላክ ከእውነተኛ አምላክ፣
የተወለደ እይ የተሠራ፣
ከአብ ጋር በግብር አንድ የሆነ፣
በሁሉ በእርሱ የተሠራ።

ለኒን ለሰባዎች እና ለድኅነታችን
ከሰማይ የወረደ፣
በመንፈስ ቅዱስ
ከድንግልን ማሪያም ሥጋ ነስቶ ሰው ሆነ።

በፊላጦስ ዘመን ለሰቦትን ታሰቅልዋል።
ታምሞ ተቀበረም።

በሶስተኛ ቀን እንዲክ መጽሐፍ ይቅዲሽ
ከሙትን ተንሣዋል።

ወሰማይ አአረገ፣
በቀኝ አብ ተግመጦዋለች።

እና ዳግም በክብር
ሕያዋንና ሙቲዋን ልፈርድ ይመጣል፣
ለመንግሥቱም መጨረሻ የለም።

እና በመንፈስ ቅዱስ ናአምን፣
እግዚአብሔር፣ ሕይወት ሳጭ፣
ከአብ የሚወጣ፣
ከአብ እና ከወልድ ጋር በሐድ
የሚሰጥገድ እና የሚከበር፣
በነቢያት የተናገረ።

እና በአንድ ቅድስት፣
ሐዋርያት፣ እና ሐዋርያት የተሠራ የትኩል ቤተክርስቲያን ናአምን።

አንድ ጥምቅትን ናማዋልን
ለኃጢአት ስርየት።

የሙታን ትንሣኤ እንጽብቃለን፣
የሚመጣው ዓለምም ሕይወት። አሜን።`,
    geez: `ናአምን፡ በአሐዱ፡ አምላክ፡ አብ፡ ኵሉ፡ ይትከል፡
ገባሬ፡ ሰማይ፡ ወምድር፡
ዘያስተርኢ፡ ወዘኢያስተርኢ፡

ወበአሐዱ፡ እግዚእ፡ ኢየሱስ፡ ክርስቶስ፡
ወልደ፡ እግዚአብሔር፡ ዋሕድ፡
ዘተወልደ፡ እማብ፡ ቅድመ፡ ኵሉ፡ ዓለም፡
ብርሃን፡ እምብርሃን፡ አምላክ፡ ዘጽድቅ፡ እምአምላክ፡ ዘጽድቅ፡
ዘተወልደ፡ ወኢተገብረ፡
ዘበአሐዱ፡ ምስለ፡ አብ፡
ዘቦቱ፡ ኵሉ፡ ኮነ፡

ዘበእንቲአነ፡ ለሰብእ፡ ወበእንተ፡ ድኅነትነ፡
ወረደ፡ እምሰማያት፡
ወተሰብአ፡ እመንፈስ፡ ቅዱስ፡
ወእማሪያም፡ ድንግል፡ ወኮነ፡ ሰብአ፡

ወተሰቅለ፡ በእንቲአነ፡ ላዕለ፡ መስቀል፡ በመዋዕለ፡ ጲላጦስ፡
ተሣቀየ፡ ወተቀብረ፡

ወተንሥአ፡ እሙታን፡ አመ፡ ሣልስት፡ ዕለት፡
በከመ፡ ይብል፡ መጻሕፍት፡

ወዐርገ፡ ሰማያተ፡
ወነበረ፡ በየማነ፡ አቡሁ፡

ወካዕበ፡ ይመጽእ፡ በስብሐቲሁ፡
ይኰንን፡ ሕያዋነ፡ ወሙታነ፡
ዘመንግሥቱ፡ አልቦ፡ ማኅለቅት፡

ወናአምን፡ በመንፈስ፡ ቅዱስ፡
እግዚእ፡ ዘያሕዩ፡
ዘይሠርፅ፡ እማብ፡
ዘምስለ፡ አብ፡ ወወልድ፡
ይሰገዱ፡ ሎቱ፡ ወያሰብሑ፡ ሎቱ፡
ዘነበበ፡ በነቢያት፡

ወናአምን፡ በአሐቲ፡ ቅድስት፡
ጉባኤ፡ ሐዋርያዊት፡

ንአምን፡ በአሐቲ፡ ጥምቀት፡
ለሥርየተ፡ ኃጢአት፡

ወንጽበ፡ ትንሣኤ፡ ሙታን፡
ወሕይወተ፡ ዘይመጽእ፡ ዓለም፡ አሜን።`,
    role: "all",
  },
  {
    id: "4",
    title: "The Sanctus",
    description: "The angelic hymn sung before the consecration — the climax of the Liturgy approaches.",
    english: `Holy, Holy, Holy, Lord God of Hosts,
heaven and earth are full of Your holy glory.
Hosanna in the highest.
Blessed is He who comes in the name of the Lord.
Hosanna in the highest.`,
    amharicTransliteration: `Kidus, Kidus, Kidus, Egziabher Tsebaot,
semayinna midrin kidus kibrihhin yetemoialech.
Hosiana bealiyaw.
Yitbarek besime Egziabher yemimetah.
Hosiana bealiyaw.`,
    amharic: `ቅዱስ፣ ቅዱስ፣ ቅዱስ፣ እግዚአብሔር ጸባኦት፣
ሰማይና ምድርን ቅዱስ ክብርህን የተሞዋለች።
ሆሳዕና በአልየው።
ይትባረክ በስመ እግዚአብሔር የሚመጣህ።
ሆሳዕና በአልየው።`,
    geez: `ቅዱስ፡ ቅዱስ፡ ቅዱስ፡ እግዚአብሔር፡ ጸባኦት፡
ምሉእ፡ ሰማያት፡ ወምድር፡ ቅዱስ፡ ስብሐቲከ፡
ሆሣዕና፡ በአርያም፡
ቡሩክ፡ ዘይመጽእ፡ በስመ፡ እግዚአብሔር፡
ሆሣዕና፡ በአርያም።`,
    role: "congregation",
  },
  {
    id: "5",
    title: "Words of Institution",
    description: "Christ's own words at the Last Supper, recited by the priest over the bread and wine.",
    english: `Priest: Take, eat, this is My Body
which is broken for you and for many,
for the remission of sins.
This do in remembrance of Me.

People: Amen. Amen. Amen. We believe and we confess,
we glorify You, our Lord and our God.

Priest: Drink of it, all of you.
This is My Blood of the new covenant,
which is shed for you and for many,
for the remission of sins.
This do in remembrance of Me.

People: Amen. Amen. Amen.
We believe and we confess,
we glorify You, our Lord and our God.
This is in truth. Amen.`,
    amharicTransliteration: `Kahin: Nessu bilu, yizih sigaye new
lesiboten enna lebizu yemitseberew,
lehatiat seryat.
Yihinnim leiniyen tizita adirgutt.

Hizb: Amen. Amen. Amen. Naamin enna inamistalen,
nikebrihalen, Egziabherachin enna Amlakachin.

Kahin: Kemiyim hulachihu tetiitt.
Yizih yeni yehaddis kidan demiyen new,
lesiboten enna lebizu yemifisew,
lehatiat seryat.
Yihinnim leiniyen tizita adirgutt.

Hizb: Amen. Amen. Amen.
Naamin enna inamistalen,
nikebrihalen, Egziabherachin enna Amlakachin.
Yizih bewinet new. Amen.`,
    amharic: `ካህን: ንሰው ብሉ፣ ይዚህ ሥጋዬ ነው
ለሰቦትን እና ለብዙ የሚጸበረው፣
ለኃጢአት ስርየት።
ይህንም ለእኔየን ትዝታ አድርጉት።

ህዝብ: አሜን። አሜን። አሜን። ናአምን እና እናምስታለን፣
ንከብርሃለን፣ እግዚአብሔራችን እና አምላካችን።

ካህን: ከምየም ሁላቸሁ ጠጡት።
ይዚህ የኒ የሐዲስ ኪዳን ደምየን ነው፣
ለሰቦትን እና ለብዙ የሚፍሰው፣
ለኃጢአት ስርየት።
ይህንም ለእኔየን ትዝታ አድርጉት።

ህዝብ: አሜን። አሜን። አሜን።
ናአምን እና እናምስታለን፣
ንከብርሃለን፣ እግዚአብሔራችን እና አምላካችን።
ይዚህ በውነት ነው። አሜን።`,
    geez: `ካህን: ንሥኡ፡ ብልዑ፡ ዝንቱ፡ ውእቱ፡ ሥጋየ፡
ዘበእንቲአክሙ፡ ዘይትሰበር፡
ወበእንተ፡ ብዙኃን፡
ለሥርየተ፡ ኃጢአት፡
ዘንተ፡ ግበሩ፡ ለተዝካርየ፡

ሕዝብ: አሜን፡ አሜን፡ አሜን፡ ናአምን፡ ወንእመን፡
ንሴብሕ፡ ለከ፡ እግዚእነ፡ ወአምላክነ፡

ካህን: ስተዩ፡ እምኔሁ፡ ኵልክሙ፡
ዝንቱ፡ ውእቱ፡ ደምየ፡ ዘሐዲስ፡ ኪዳን፡
ዘበእንቲአክሙ፡ ወበእንተ፡ ብዙኃን፡ ዘይትከዐው፡
ለሥርየተ፡ ኃጢአት፡
ዘንተ፡ ግበሩ፡ ለተዝካርየ፡

ሕዝብ: አሜን፡ አሜን፡ አሜን፡
ናአምን፡ ወንእመን፡
ንሴብሕ፡ ለከ፡ እግዚእነ፡ ወአምላክነ፡
ዝንቱ፡ ውእቱ፡ በአማን፡ አሜን።`,
    role: "all",
  },
];
