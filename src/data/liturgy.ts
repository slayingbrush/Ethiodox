export type VerificationStatus = "needs_review" | "reviewed";

export interface LiturgySection {
  id: string;
  order: number;
  title: string;
  description: string;
  english: string;
  amharicTransliteration: string;
  amharic: string;
  geez: string;
  role: "priest" | "deacon" | "congregation" | "all";
  scriptureRefs: string[];
  studyNotes: string[];
  verificationStatus: VerificationStatus;
}

export const liturgyIntro = {
  title: "The Divine Liturgy (Kidase)",
  description: `The Divine Liturgy, Kidase, is the center of Ethiopian Orthodox worship and the service in which the Holy Eucharist is celebrated.

This study edition is organized section by section so a learner can search, read, and study the flow of worship from preparation to dismissal.

Important: the Ethiopian Church has 14 anaphoras and local usage can vary by feast, parish, and celebrant. This page follows the common public order used for learning.`,
  structure: [
    {
      name: "Preparation",
      description:
        "Priest and deacon prepare the offerings and begin with prayers of blessing.",
    },
    {
      name: "Liturgy of the Word",
      description:
        "Readings, psalmody, gospel proclamation, and confession of faith.",
    },
    {
      name: "Liturgy of the Faithful",
      description:
        "Anaphora, consecration, intercession, fraction, and preparation for communion.",
    },
    {
      name: "Communion and Dismissal",
      description:
        "Communion of the faithful, thanksgiving, blessing, and sending forth.",
    },
  ],
  accuracyPolicy: [
    "Texts marked reviewed have been normalized against the current project prayer/liturgy corpus.",
    "Texts marked needs_review still require direct checking against an authorized EOTC service book used by your parish.",
    "Primary extracted references used here: eotcDivineLit.pdf (185 pages) and Tselot-zezeweTerBOOK-English-5.pdf (9 pages).",
    "The file 'geez ethiopic mass.pdf' is image-only (no embedded text), so line-level verification from it must be done by OCR or manual clergy review.",
    "For strict publication, parish clergy/text custodians should complete final line-by-line verification.",
  ],
};

export const liturgySections: LiturgySection[] = [
  {
    id: "opening-blessing",
    order: 1,
    title: "Opening Blessing",
    description:
      "The priest begins with the Trinitarian blessing and the people respond Amen.",
    english: `Priest: Blessed be God the Father Almighty.
People: Amen.
Priest: Blessed be His only-begotten Son, Jesus Christ our Lord.
People: Amen.
Priest: Blessed be the Holy Spirit, the Comforter.
People: Amen.`,
    amharicTransliteration: `Kahin: Yitbarek Egziabher Ab hulu yemichil.
Hizb: Amen.
Kahin: Yitbarek wahid Lij Iyesus Kristos Egziabherachin.
Hizb: Amen.
Kahin: Yitbarek Menfes Kidus, Menacham.
Hizb: Amen.`,
    amharic: `Kahin: Yitbarek Egziabher Ab hulu yemichil.
Hizb: Amen.
Kahin: Yitbarek wahid Lij Iyesus Kristos Egziabherachin.
Hizb: Amen.
Kahin: Yitbarek Menfes Kidus, Menacham.
Hizb: Amen.`,
    geez: `Kahin: Buruk Egziabher Ab.
Hizb: Amen.
Kahin: Buruk Weld wahid Iyesus Kristos.
Hizb: Amen.
Kahin: Buruk Menfes Kidus.
Hizb: Amen.`,
    role: "all",
    scriptureRefs: ["Matthew 28:19", "2 Corinthians 13:14"],
    studyNotes: [
      "This opening establishes that all worship is explicitly Trinitarian.",
      "The people respond with active assent, not passive attendance.",
    ],
    verificationStatus: "reviewed",
  },
  {
    id: "trisagion",
    order: 2,
    title: "The Trisagion",
    description: "The thrice-holy hymn in continuity with angelic worship.",
    english: `Holy God, Holy Mighty, Holy Immortal,
have mercy upon us. (x3)

Glory to the Father, and to the Son,
and to the Holy Spirit,
now and always and unto the ages of ages. Amen.`,
    amharicTransliteration: `Kidus Egziabher, Kidus Hayyal, Kidus Zelealemawi,
imahireyin. (x3)

Kibir leAb, leWeld,
enna leMenfes Kidus,
ahun enna hul gize lezelealem. Amen.`,
    amharic: `Kidus Egziabher, Kidus Hayyal, Kidus Zelealemawi,
imahireyin. (x3)

Kibir leAb, leWeld,
enna leMenfes Kidus,
ahun enna hul gize lezelealem. Amen.`,
    geez: `Kidus Egziabher, Kidus Hayyal, Kidus Zelealemawi,
te-sehalene. (x3)

Sibhate leAb, leWeld,
weleMenfes Kidus,
zare ena zelalem. Amen.`,
    role: "all",
    scriptureRefs: ["Isaiah 6:3", "Revelation 4:8"],
    studyNotes: [
      "The repeated holiness language mirrors heavenly worship.",
      "The ending doxology links the hymn to the Church's Trinitarian faith.",
    ],
    verificationStatus: "reviewed",
  },
  {
    id: "liturgy-of-the-word",
    order: 3,
    title: "Liturgy of the Word",
    description:
      "Readings from apostolic writings and the Holy Gospel for instruction and repentance.",
    english: `Reader/Deacon: A reading from the Apostolic writings...
People: Thanks be to God.

Deacon: Stand in the fear of God and listen to the Holy Gospel.
People: Glory to You, O Lord.`,
    amharicTransliteration: `Qari/Diakon: Nibab keHawaryat...
Hizb: Amlak yimesgen.

Diakon: Befirhat Egziabher qumu, wengel kidus listen.
Hizb: Kibir leAnte Egziabher.`,
    amharic: `Qari/Diakon: Nibab keHawaryat...
Hizb: Amlak yimesgen.

Diakon: Befirhat Egziabher qumu, wengel kidus listen.
Hizb: Kibir leAnte Egziabher.`,
    geez: `Diakon: Qumu befirhate Egziabher.
Hizb: Sibhate leEgziabher.`,
    role: "deacon",
    scriptureRefs: ["1 Timothy 4:13", "Luke 4:16-21"],
    studyNotes: [
      "The Word prepares the people for the Mysteries.",
      "Listening is treated as a liturgical act of obedience.",
    ],
    verificationStatus: "needs_review",
  },
  {
    id: "creed",
    order: 4,
    title: "The Creed",
    description:
      "The confession of orthodox faith before entering the Eucharistic core.",
    english: `We believe in one God, the Father Almighty...
And in one Lord Jesus Christ...
And we believe in the Holy Spirit...
We acknowledge one baptism for the remission of sins.
And we look for the resurrection of the dead
and the life of the age to come. Amen.`,
    amharicTransliteration: `Naamin beAhadu Amlak, Ab hulu yemichil...
Enna beAhadu Egziabher Iyesus Kristos...
Enna beMenfes Kidus naamin...
And timqit lehatyat seriat naamin.
Yemutan tinsae enitsibikalen,
yeAlam yemimetaw hiwot. Amen.`,
    amharic: `Naamin beAhadu Amlak, Ab hulu yemichil...
Enna beAhadu Egziabher Iyesus Kristos...
Enna beMenfes Kidus naamin...
And timqit lehatyat seriat naamin.
Yemutan tinsae enitsibikalen,
yeAlam yemimetaw hiwot. Amen.`,
    geez: `Naamen beAhadu Amlak...
Naamen beWeld...
Naamen beMenfes Kidus...
Naqbel ahati timqit...
Nitsabbek tinsae mutan. Amen.`,
    role: "all",
    scriptureRefs: ["John 3:16", "Ephesians 4:4-6"],
    studyNotes: [
      "The Creed guards Eucharistic worship from private belief.",
      "In liturgy, doctrine is prayed, not only studied.",
    ],
    verificationStatus: "reviewed",
  },
  {
    id: "anaphora-dialogue",
    order: 5,
    title: "Anaphora Opening Dialogue",
    description:
      "The classic exchange before thanksgiving and consecration begins.",
    english: `Priest: The Lord be with you all.
People: And with your spirit.
Priest: Lift up your hearts.
People: We lift them up to the Lord.
Priest: Let us give thanks to the Lord our God.
People: It is meet and right.`,
    amharicTransliteration: `Kahin: Egziabher kemulum gar yihun.
Hizb: Ke-menfesih garim.
Kahin: Libochachihu raise.
Hizb: Wede Egziabher anesahachew.
Kahin: LeEgziabher Amlakachin amesgen.
Hizb: Yigeba enna tsidik new.`,
    amharic: `Kahin: Egziabher kemulum gar yihun.
Hizb: Ke-menfesih garim.
Kahin: Libochachihu raise.
Hizb: Wede Egziabher anesahachew.
Kahin: LeEgziabher Amlakachin amesgen.
Hizb: Yigeba enna tsidik new.`,
    geez: `Kahin: Egziabher yikun miskelachihu.
Hizb: Weke-menfesika.
Kahin: Arkiu libawikum.
Hizb: Nanseom wede Egziabher.`,
    role: "all",
    scriptureRefs: ["Lamentations 3:41", "Colossians 3:1-2"],
    studyNotes: [
      "The people are commanded to actively raise the heart toward God.",
      "Thanksgiving is not optional; it defines Eucharistic worship.",
    ],
    verificationStatus: "needs_review",
  },
  {
    id: "sanctus",
    order: 6,
    title: "Sanctus (Kidus Kidus Kidus)",
    description:
      "The congregation joins the angels before the narrative of consecration.",
    english: `Holy, Holy, Holy, Lord God of Hosts,
heaven and earth are full of Your glory.
Hosanna in the highest.
Blessed is He who comes in the name of the Lord.
Hosanna in the highest.`,
    amharicTransliteration: `Kidus, Kidus, Kidus, Egziabher Tsebaot,
semay ena midir be-kibrih yetemolalu.
Hosiana be'aliyaw.
Yitbarek besime Egziabher yemimetah.
Hosiana be'aliyaw.`,
    amharic: `Kidus, Kidus, Kidus, Egziabher Tsebaot,
semay ena midir be-kibrih yetemolalu.
Hosiana be'aliyaw.
Yitbarek besime Egziabher yemimetah.
Hosiana be'aliyaw.`,
    geez: `Kidus, Kidus, Kidus, Egziabher Tsebaot.
Mulu semayat wemedr kibrih.
Hosiana be'aliyaw.`,
    role: "congregation",
    scriptureRefs: ["Isaiah 6:3", "Matthew 21:9"],
    studyNotes: [
      "This is where earthly worship is explicitly united with heavenly worship.",
      "Many parishes sing this slowly to mark the gravity of consecration.",
      "Source alignment: Tselot-zezeweTerBOOK-English-5.pdf, page 5.",
    ],
    verificationStatus: "reviewed",
  },
  {
    id: "institution",
    order: 7,
    title: "Words of Institution",
    description:
      "Christ's own words at the Last Supper proclaimed over bread and cup.",
    english: `Priest: Take, eat, this is My Body, broken for you and for many for the remission of sins.
People: Amen. Amen. Amen. We believe and we confess.

Priest: Drink of it, all of you. This is My Blood of the new covenant, shed for you and for many for the remission of sins.
People: Amen. Amen. Amen. This is true. Amen.`,
    amharicTransliteration: `Kahin: Nesu bilu, yih sigaye new... lehatyat seriat.
Hizb: Amen. Amen. Amen. Naamin enna inameseginalen.

Kahin: Tetu hulachihu, yih demiye new... lehatyat seriat.
Hizb: Amen. Amen. Amen. Be'ewnet new. Amen.`,
    amharic: `Kahin: Nesu bilu, yih sigaye new... lehatyat seriat.
Hizb: Amen. Amen. Amen. Naamin enna inameseginalen.

Kahin: Tetu hulachihu, yih demiye new... lehatyat seriat.
Hizb: Amen. Amen. Amen. Be'ewnet new. Amen.`,
    geez: `Kahin: Nesu, belu... zeweetu sega-ye.
Hizb: Amen. Amen. Amen.
Kahin: Seteyu emnehu... zeweetu demiye.
Hizb: Amen. Amen. Amen.`,
    role: "all",
    scriptureRefs: ["Matthew 26:26-28", "1 Corinthians 11:23-26"],
    studyNotes: [
      "The Church receives and repeats Christ's words, not a human substitute.",
      "The people's repeated Amen is confession, not a mere cue.",
    ],
    verificationStatus: "reviewed",
  },
  {
    id: "epiclesis-intercession",
    order: 8,
    title: "Epiclesis and Intercessions",
    description:
      "Invocation of the Holy Spirit and prayer for the Church, world, and departed.",
    english: `Priest: Send down Your Holy Spirit upon us and upon these gifts.
Make this bread the holy Body of Christ, and this cup the precious Blood of Christ.

Remember, O Lord, Your holy Church, our fathers, mothers, the sick, the travelers, the living, and the departed.`,
    amharicTransliteration: `Kahin: Menfes Kidusihin ersendalen, be-ehnna qurbanat lay.
Yih enjera Kidus sega Kristos yihun, yih cup kibur dem Kristos yihun.

Egziabher hoy, Kidist Betekristianihin asib,
abatoch, enatoch, bememamoch, beguzo, behiyawoch ena bemutan lay.`,
    amharic: `Kahin: Menfes Kidusihin ersendalen, be-ehnna qurbanat lay.
Yih enjera Kidus sega Kristos yihun, yih cup kibur dem Kristos yihun.

Egziabher hoy, Kidist Betekristianihin asib,
abatoch, enatoch, bememamoch, beguzo, behiyawoch ena bemutan lay.`,
    geez: `Kahin: Fenu Menfesika Kidus.
Qeddes qurbanat hullu.
Asib kidist beteKristiyan, hiyawan we mutan.`,
    role: "priest",
    scriptureRefs: ["Acts 2:42", "1 Timothy 2:1-2"],
    studyNotes: [
      "Intercession in the anaphora reflects communion across the whole Body of Christ.",
      "This section teaches both sacrifice and pastoral memory.",
    ],
    verificationStatus: "needs_review",
  },
  {
    id: "fraction",
    order: 9,
    title: "Fraction and Confession",
    description:
      "The consecrated bread is fractioned and the faithful confess before communion.",
    english: `Priest: Holy things for the holy.
People: One is Holy, One is Lord, Jesus Christ, to the glory of God the Father. Amen.`,
    amharicTransliteration: `Kahin: Kidusanat leKidusan.
Hizb: And Kidus, And Egziabher, Iyesus Kristos, leKibir Egziabher Ab. Amen.`,
    amharic: `Kahin: Kidusanat leKidusan.
Hizb: And Kidus, And Egziabher, Iyesus Kristos, leKibir Egziabher Ab. Amen.`,
    geez: `Kahin: Qidusat leQidusan.
Hizb: Ahadu Qidus, Ahadu Egziabher, Iyesus Kristos. Amen.`,
    role: "all",
    scriptureRefs: ["1 Corinthians 10:16-17", "Hebrews 12:14"],
    studyNotes: [
      "Holiness here means communion in Christ, not private merit.",
      "Confession before communion guards reverence and discernment.",
    ],
    verificationStatus: "needs_review",
  },
  {
    id: "lords-prayer",
    order: 10,
    title: "The Lord's Prayer",
    description:
      "The prayer of Christ taught directly to the disciples and recited before communion.",
    english: `Our Father Who art in heaven,
hallowed be Thy name.
Thy kingdom come,
Thy will be done on earth as it is in heaven.
Give us this day our daily bread.
And forgive us our debts as we forgive our debtors.
Even lead us, lest we enter into temptation,
but deliver us from the evil one.
For Thine is the kingdom and the power and the glory,
of the Father, Son, and Holy Spirit,
now and ever and unto the ages of ages. Amen.`,
    amharicTransliteration: `Abatachin hoy besemayat yemitinor,
simih yikedesh,
mengistih timta,
fekadih besemay endehone bemidrim yihun.
Yezerezachinin ingidachin zare sitenin,
ibakeh badilachinnim imirin,
innihem lebasadilu yimirimirilen inna,
wedefikera attasgaban,
kezemetiyaw adinen.
Mengist yante nat, hayl yante nat, kibir yante nat,
lezelealem. Amen.`,
    amharic: `Abatachin hoy besemayat yemitinor,
simih yikedesh,
mengistih timta,
fekadih besemay endehone bemidrim yihun.
Yezerezachinin ingidachin zare sitenin,
ibakeh badilachinnim imirin,
innihem lebasadilu yimirimirilen inna,
wedefikera attasgaban,
kezemetiyaw adinen.
Mengist yante nat, hayl yante nat, kibir yante nat,
lezelealem. Amen.`,
    geez: `Abune zebe-semayat,
yitqedes simka.
Timtsa mengistka.
Yikun fekadka.
Hebene yom sisa-yene zeyelelt.
Hidg lena abesane.
Wala tabena wuste mensut.
Ala adhenena em-ekuy.
Amen.`,
    role: "all",
    scriptureRefs: ["Matthew 6:9-13", "Luke 11:2-4"],
    studyNotes: [
      "This prayer directly prepares the Church for Eucharistic communion.",
      "Forgiveness and communion are inseparable in Orthodox practice.",
      "Source alignment: eotcDivineLit.pdf, page 173.",
      "Cross-check: Tselot-zezeweTerBOOK-English-5.pdf, page 3.",
      "Wording may vary between 'deliver us from the evil one' and 'deliver us from all evil' by book tradition.",
    ],
    verificationStatus: "needs_review",
  },
  {
    id: "st-mary-prayer",
    order: 11,
    title: "Prayer of Saint Mary (After the Lord's Prayer)",
    description:
      "A Marian prayer commonly said in Ethiopian Orthodox practice after the Lord's Prayer.",
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
    geez: `Selam laki Maryam.
Tsemua sega, Egziabher misleki.
Buruk anti em-setat.
Buruk fire kebdiki.
Qidist Dingel, waladite Amlak,
tseliyi be'entina hatan.
Zare welezelalem,
we-besa'ate motina. Amen.`,
    role: "all",
    scriptureRefs: ["Luke 1:28", "Luke 1:42"],
    studyNotes: [
      "This line is included because many EOTC communities place it after the Lord's Prayer.",
      "Parish wording can vary; keep your local text as the final reference.",
      "Source alignment: eotcDivineLit.pdf, page 173.",
      "Cross-check: Tselot-zezeweTerBOOK-English-5.pdf, pages 3-4.",
      "Additional Geez witness provided by 'geez ethiopic mass.pdf' (manual/OCR review required).",
    ],
    verificationStatus: "needs_review",
  },
  {
    id: "communion",
    order: 12,
    title: "Communion",
    description:
      "The faithful receive the Holy Mysteries with reverence and preparation.",
    english: `Priest: The Body and Blood of Christ, for life and salvation.
Communicant: Amen.

People: We have seen the true light, we have received the heavenly Spirit.`,
    amharicTransliteration: `Kahin: Sega ena Dem Kristos, lehiwot ena ledihnet.
Miteqebal: Amen.

Hizb: Ye'ewnet birhan aytenal, semayawi menfes teqeblenal.`,
    amharic: `Kahin: Sega ena Dem Kristos, lehiwot ena ledihnet.
Miteqebal: Amen.

Hizb: Ye'ewnet birhan aytenal, semayawi menfes teqeblenal.`,
    geez: `Kahin: Sega weDem Kristos.
Miteqebal: Amen.
Hizb: Re'ina birhan ze'emet.`,
    role: "all",
    scriptureRefs: ["John 6:53-56", "1 Corinthians 10:16"],
    studyNotes: [
      "Fasting, confession, and reconciliation remain essential preparation.",
      "Communion is the culmination, not a symbolic appendix.",
    ],
    verificationStatus: "needs_review",
  },
  {
    id: "dismissal",
    order: 13,
    title: "Thanksgiving and Dismissal",
    description:
      "Final thanksgiving, blessing, and sending forth to live what was received.",
    english: `Priest: Depart in peace. May the Lord be with you all.
People: Amen.

Priest: Through the prayers of Saint Mary and all the saints, may God have mercy on us.
People: Amen.`,
    amharicTransliteration: `Kahin: Beselam hidu. Egziabher kemulum gar yihun.
Hizb: Amen.

Kahin: BeKidist Maryam ena beKidusan hulu silot, Amlak yimarene.
Hizb: Amen.`,
    amharic: `Kahin: Beselam hidu. Egziabher kemulum gar yihun.
Hizb: Amen.

Kahin: BeKidist Maryam ena beKidusan hulu silot, Amlak yimarene.
Hizb: Amen.`,
    geez: `Kahin: Hidu beselam.
Hizb: Amen.
Kahin: Beselote Kidist Maryam, yimarena Egziabher.
Hizb: Amen.`,
    role: "all",
    scriptureRefs: ["Philippians 4:7", "James 1:22"],
    studyNotes: [
      "The liturgy ends by sending the faithful into practical obedience.",
      "Dismissal is mission, not simply exit.",
    ],
    verificationStatus: "needs_review",
  },
];
