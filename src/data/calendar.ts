/**
 * Ethiopian Orthodox Tewahedo Church Liturgical Calendar
 *
 * The EOTC follows the Ge'ez calendar (Ethiopian calendar), which has
 * 13 months: 12 months of 30 days each + Pagume (5 or 6 days).
 *
 * Months: Meskerem, Tikimt, Hidar, Tahsas, Tir, Yekatit, Megabit,
 *         Miyazia, Ginbot, Sene, Hamle, Nehase, Pagume
 */

export interface FastingPeriod {
  id: string;
  name: string;
  geezName: string;
  duration: string;
  description: string;
  rules: string[];
  type: "major" | "weekly" | "minor";
  approximateGregorian: string;
}

export interface FeastDay {
  id: string;
  name: string;
  geezName: string;
  month: string;
  day: number;
  type: "major" | "minor" | "monthly" | "moveable";
  description: string;
  prayers: string[];
  fasting: string;
  wazema: string;
}

export interface MonthlyCommemoration {
  day: number;
  commemorations: string[];
}

// ==========================================
// FASTING PERIODS
// ==========================================

export const fastingPeriods: FastingPeriod[] = [
  {
    id: "hudade",
    name: "Great Lent (Hudade / Abiye Tsom)",
    geezName: "ሁዳዴ / ዐቢየ ጾም",
    duration: "55 days (including Holy Week)",
    description:
      "The longest and strictest fast of the Ethiopian Orthodox Church, commemorating Christ's 40-day fast in the wilderness, with 15 additional days added by the Church (the week of Heraclius, and the days of Holy Week). It begins on Monday after Zewerede Sunday and ends on Easter (Fasika). During this fast, the faithful abstain from all animal products. No food is eaten until after the 9th hour (3:00 PM) on weekdays, and after the 6th hour (noon) on Saturdays and Sundays. The Liturgy (Kidase) is served later than usual during this period.",
    rules: [
      "Complete abstinence from all animal products (meat, dairy, eggs)",
      "No food until 3:00 PM on weekdays (after the 9th hour)",
      "No food until noon on Saturdays and Sundays",
      "Increased prayer and church attendance",
      "Prostrations (metania) are performed during services",
      "The Liturgy is celebrated later in the day",
      "Confession is expected before Easter Communion",
      "Acts of charity and almsgiving are emphasized",
    ],
    type: "major",
    approximateGregorian: "February/March – April (varies with Easter)",
  },
  {
    id: "tsome-filseta",
    name: "Fast of the Assumption (Tsome Filseta)",
    geezName: "ጾመ ፍልሰታ",
    duration: "15 days (Nehase 1–15 / August 7–22)",
    description:
      "A 15-day fast commemorating the passing (dormition) and bodily assumption of the Blessed Virgin Mary into heaven. This is one of the most widely observed fasts in Ethiopia. The faithful gather daily for prayer and liturgy, and many make pilgrimages to Marian shrines. The fast ends with the great feast of Filseta (Assumption) on Nehase 16.",
    rules: [
      "Complete abstinence from all animal products",
      "No food until noon",
      "Daily church attendance encouraged",
      "Special Marian prayers and hymns",
      "Many faithful observe this fast even if they skip others",
      "Pilgrimage to Marian churches is common",
    ],
    type: "major",
    approximateGregorian: "August 7–22",
  },
  {
    id: "tsome-gahad",
    name: "Advent Fast (Tsome Gahad / Tsome Lidet)",
    geezName: "ጾመ ገሐድ / ጾመ ልደት",
    duration: "40 days (Hidar 15 – Tahsas 28 / November 24 – January 6)",
    description:
      "The 40-day fast before Christmas (Genna/Lidet), commemorating the period of preparation before the birth of Christ. The name 'Gahad' means 'dawn' or 'revelation,' pointing to the coming of Christ as the Light of the World. This fast is less strict than Great Lent but still requires abstinence from all animal products.",
    rules: [
      "Complete abstinence from all animal products",
      "No food until noon (less strict than Great Lent)",
      "Special Advent hymns and readings",
      "The liturgy focuses on Old Testament prophecies of Christ's coming",
      "The fast intensifies in the final week before Christmas",
    ],
    type: "major",
    approximateGregorian: "November 24 – January 6",
  },
  {
    id: "tsome-hawariat",
    name: "Fast of the Apostles (Tsome Hawariat)",
    geezName: "ጾመ ሐዋርያት",
    duration: "Variable (15–49 days, depending on Easter)",
    description:
      "A fast commemorating the apostles' preparation before going out to preach the Gospel after Pentecost. The duration varies each year because it depends on the date of Easter. It begins the Monday after Pentecost (Paraklitos) and always ends on Hamle 5 (July 12), the feast of Sts. Peter and Paul. In some years it can be very short (about 15 days) or very long (about 49 days).",
    rules: [
      "Complete abstinence from all animal products",
      "No food until noon",
      "Readings from the Acts of the Apostles",
      "Emphasis on evangelism and the apostolic mission",
    ],
    type: "major",
    approximateGregorian: "June – July 12 (varies with Easter)",
  },
  {
    id: "tsome-nineveh",
    name: "Fast of Nineveh (Tsome Nineveh)",
    geezName: "ጾመ ነነዌ",
    duration: "3 days",
    description:
      "A strict 3-day fast commemorating the repentance of the people of Nineveh after the preaching of the prophet Jonah. This fast falls on a Monday, Tuesday, and Wednesday, two weeks before Great Lent begins. It is one of the strictest fasts — no food at all until the evening on these three days. This fast is unique to the Oriental Orthodox churches and is not observed by the Eastern Orthodox or Western churches.",
    rules: [
      "Complete abstinence from all animal products",
      "No food until evening (very strict)",
      "Intensive prayer and repentance",
      "Reading of the Book of Jonah",
      "Prostrations during services",
      "Some faithful eat nothing for the entire 3 days",
    ],
    type: "major",
    approximateGregorian: "February (varies — 2 weeks before Great Lent)",
  },
  {
    id: "wednesday-friday",
    name: "Wednesday and Friday Weekly Fast",
    geezName: "ረቡዕ እና ዓርብ ጾም",
    duration: "Every Wednesday and Friday year-round",
    description:
      "Every Wednesday and Friday throughout the year are fasting days. Wednesday commemorates the day Judas conspired to betray Christ, and Friday commemorates the day of Christ's crucifixion. These weekly fasts have been observed since the earliest days of Christianity — the Didache (1st century) already mentions Wednesday and Friday fasting. The only exception is the 50 days between Easter and Pentecost, when fasting is relaxed.",
    rules: [
      "Complete abstinence from all animal products",
      "No food until noon",
      "Observed every week throughout the year",
      "Exemption during the 50 days of Pentecost (Easter to Pentecost)",
      "This is the minimum fasting obligation for all Orthodox Christians",
    ],
    type: "weekly",
    approximateGregorian: "Every Wednesday and Friday",
  },
  {
    id: "tsome-dhenet",
    name: "Paramone (Gahad Lidet / Gahad Timkat)",
    geezName: "ጋሐድ",
    duration: "1 day each (eve of Christmas and eve of Epiphany)",
    description:
      "Paramone (from Greek 'preparation') refers to the strict fasting vigils on the eves of Christmas (Genna) and Epiphany (Timkat). On these days, the faithful fast strictly — eating nothing until the evening or until after the liturgy — in preparation for the great feasts.",
    rules: [
      "Complete abstinence from all animal products",
      "No food until evening or after the liturgy",
      "Vigil services held in the evening/night",
      "Special hymns and readings for the feast",
    ],
    type: "minor",
    approximateGregorian: "January 6 (eve of Genna), January 18 (eve of Timkat)",
  },
  {
    id: "tsome-mikael",
    name: "Fast of the Covenant (Kidane Mihret fast days)",
    geezName: "ጾመ ኪዳነ ምሕረት",
    duration: "Various single-day fasts",
    description:
      "In addition to the major fasts, Ethiopian Orthodox Christians may observe additional fasting days connected to particular devotions, such as the 16th of each month (dedicated to the Covenant of Mercy / Kidane Mihret) and other commemorative days.",
    rules: [
      "Complete abstinence from all animal products",
      "No food until noon or until after church services",
      "Associated with specific devotional practices",
    ],
    type: "minor",
    approximateGregorian: "Various dates throughout the year",
  },
];

// ==========================================
// MONTHLY COMMEMORATIONS
// (Recurring saints/events on each day of every Ethiopian month)
// ==========================================

export const monthlyCommemorations: MonthlyCommemoration[] = [
  { day: 1, commemorations: ["Lideta Mariam (Birth of the Virgin Mary)", "St. Bartholomew", "Beginning of each month"] },
  { day: 2, commemorations: ["St. John the Baptist (Yohannes Matmik)"] },
  { day: 3, commemorations: ["Covenant of Mercy (Kidane Mihret) — sometimes observed on the 16th", "St. Theodore"] },
  { day: 4, commemorations: ["St. Andrew the Apostle", "St. John the Theologian (Yohannes the Evangelist)"] },
  { day: 5, commemorations: ["Abune Gebre Menfes Kidus", "St. Abo"] },
  { day: 6, commemorations: ["Selassie (Holy Trinity)", "St. Cyriacus"] },
  { day: 7, commemorations: ["Kidist Selassie (Holy Trinity) — Trinity Sunday variant", "St. Thomas the Apostle"] },
  { day: 8, commemorations: ["The Four Living Creatures (Arba'itu Insisa)", "St. James the Apostle"] },
  { day: 9, commemorations: ["Covenant of Mercy alternate", "St. Simon"] },
  { day: 10, commemorations: ["Nativity of Our Lord alternate remembrance", "St. Matthias"] },
  { day: 11, commemorations: ["St. Hanna (Mother of the Virgin Mary)", "St. Yared"] },
  { day: 12, commemorations: ["St. Michael the Archangel (Kidus Mikael)"] },
  { day: 13, commemorations: ["St. Rufael (Archangel Raphael)", "Egziabher Ab (God the Father)"] },
  { day: 14, commemorations: ["Abune Aregawi", "St. Philip the Apostle"] },
  { day: 15, commemorations: ["Kidist Mariam (The Virgin Mary)", "Qirqos (St. Cyriacus)"] },
  { day: 16, commemorations: ["Kidane Mihret (Covenant of Mercy)"] },
  { day: 17, commemorations: ["St. Stephen (Kidus Estifanos)", "St. Gebre Kristos"] },
  { day: 18, commemorations: ["St. Gabriel the Archangel alternate"] },
  { day: 19, commemorations: ["St. Gabriel the Archangel (Kidus Gebriel)"] },
  { day: 20, commemorations: ["Entrance of the Virgin Mary into the Temple"] },
  { day: 21, commemorations: ["Presentation of the Virgin Mary (Kidist Mariam) / Beata Mariam"] },
  { day: 22, commemorations: ["St. Uriel the Archangel"] },
  { day: 23, commemorations: ["St. George (Kidus Giyorgis)"] },
  { day: 24, commemorations: ["Abune Tekle Haymanot"] },
  { day: 25, commemorations: ["St. Mercurius (Kidus Merkurios)"] },
  { day: 26, commemorations: ["St. Joseph (Kidus Yosef)"] },
  { day: 27, commemorations: ["Medhane Alem (Savior of the World)"] },
  { day: 28, commemorations: ["Emmanuel", "St. Mary Magdalene"] },
  { day: 29, commemorations: ["Lideta Egziabher (Nativity of our Lord) — on Tahsas", "Bale Wold"] },
  { day: 30, commemorations: ["St. Mark the Evangelist", "St. John Chrysostom"] },
];

// ==========================================
// MAJOR FEAST DAYS
// ==========================================

export const feastDays: FeastDay[] = [
  // ---- THE NINE GREAT FEASTS OF THE LORD (Tis'atu A'eyadat Egziabherawi) ----
  {
    id: "lidet",
    name: "Christmas / Genna (Nativity of Christ)",
    geezName: "ልደት / ገና",
    month: "Tahsas",
    day: 29,
    type: "major",
    description:
      "The Nativity of our Lord Jesus Christ, celebrated on Tahsas 29 (January 7). Ethiopian Christmas (Genna) is preceded by the 40-day Advent fast and celebrated with an all-night vigil (Wazema), the Divine Liturgy at dawn, and traditional festivities including the game of Genna (similar to field hockey). The faithful receive Holy Communion after the lengthy fast.",
    prayers: [
      "Wazema of the Nativity — all-night vigil with special hymns of praise celebrating the birth of Christ in Bethlehem",
      "Yederesew Qidase (Dawn Liturgy) — the Anaphora of the Blessed Virgin Mary is traditionally used",
      "'Zare Tewelde Lene' — 'Today is born for us' — the central hymn of the Nativity",
      "'Sebhate LeEgziabher Besemayat' — 'Glory to God in the Highest' — echoing the angelic hymn at Bethlehem",
      "Psalm 110 — 'The LORD said to my Lord' — a messianic psalm read at the Nativity liturgy",
      "Isaiah 9:6 reading — 'For unto us a child is born, unto us a son is given'",
    ],
    fasting: "Strict fast on the eve (Paramone). The 40-day Advent fast ends with Christmas communion.",
    wazema:
      "The Wazema (vigil) of Genna begins on the evening of Tahsas 28. The Debteras (church scholars/chanters) perform elaborate chanting, including the Mezmur (hymns) and Zema (sacred music) of the Nativity. Drums (kebero), sistra (tsenatsel), and prayer staffs (mequamia) are used. The service continues through the night until the dawn liturgy.",
  },
  {
    id: "timkat",
    name: "Epiphany / Timkat (Baptism of Christ)",
    geezName: "ጥምቀት",
    month: "Tir",
    day: 11,
    type: "major",
    description:
      "Timkat celebrates the baptism of Jesus Christ in the Jordan River by John the Baptist. It is the most colorful and public of all Ethiopian feasts. On the eve, the Tabots (Ark replicas) are carried in magnificent processions to a body of water, accompanied by priests, deacons, and thousands of faithful. After an overnight vigil, the water is blessed at dawn, and the people renew their baptismal vows by being sprinkled with the blessed water. UNESCO has recognized Ethiopian Timkat as an Intangible Cultural Heritage of Humanity.",
    prayers: [
      "Wazema of Timkat — processional hymns as the Tabot is carried to the water",
      "'Yordanos Wedeka' — 'O Jordan, turn back' — the central hymn sung during the water blessing",
      "Blessing of the Water (Tselote Mai) — the priest prays over the water, invoking the Holy Spirit",
      "'BeYordanos Wenz' — 'In the River Jordan' — hymn recounting Christ's baptism",
      "Matthew 3:13-17 reading — the Gospel account of Christ's baptism",
      "Renewal of Baptismal Vows — the congregation is sprinkled with blessed water",
    ],
    fasting: "Strict fast on the eve (Paramone/Ketera). No food until after the liturgy on the morning of Timkat.",
    wazema:
      "The Wazema of Timkat is perhaps the most spectacular in the Ethiopian calendar. On the eve (Ketera), the Tabots are removed from each church and carried in procession to the nearest body of water. Thousands of people follow, singing and dancing. The Tabots are placed in tents by the water, and an all-night vigil is held with singing, drumming, and prayer. The procession and blessing at dawn are broadcast nationally.",
  },
  {
    id: "meskel",
    name: "Finding of the True Cross (Meskel)",
    geezName: "መስቀል",
    month: "Meskerem",
    day: 17,
    type: "major",
    description:
      "Meskel commemorates the finding of the True Cross of Christ by Queen Helena (Empress Eleni) in 326 AD. In Ethiopia, it is believed that a fragment of the True Cross was brought to the country and is kept at the monastery of Gishen Mariam. Meskel is celebrated with the lighting of a massive bonfire called 'Demera.' The direction the Demera falls is traditionally believed to foretell the coming year. Meskel also marks the end of the rainy season and the beginning of spring in Ethiopia. UNESCO recognizes it as an Intangible Cultural Heritage.",
    prayers: [
      "'BeHayile Meskelika' — 'By the power of Your Cross' — the central prayer/hymn of the feast",
      "'Elete Meskel' — Special Meskel hymns composed by St. Yared",
      "Blessing of the Demera — the priest blesses the bonfire before it is lit",
      "Processional hymns as the clergy and faithful circle the Demera",
      "Galatians 6:14 reading — 'May I never boast except in the cross of our Lord Jesus Christ'",
      "John 12:32 reading — 'And I, when I am lifted up from the earth, will draw all people to myself'",
    ],
    fasting: "No fasting requirement, but the eve may be observed with prayer.",
    wazema:
      "On the eve of Meskel, small bonfires (Chibo) are lit in homes and neighborhoods. Flowers (the yellow Meskel daisy, Adey Abeba) are gathered and placed on the Demera. At the main celebration (Meskel Square in Addis Ababa is the most famous), clergy in full vestments lead prayers around the Demera before it is ceremonially lit. The crowd sings, drums sound, and when the bonfire collapses, the direction it falls is interpreted as an omen.",
  },
  {
    id: "fasika",
    name: "Easter / Fasika (Resurrection of Christ)",
    geezName: "ፋሲካ",
    month: "Miyazia",
    day: 0, // moveable
    type: "moveable",
    description:
      "Fasika (Easter) is the greatest feast of the Ethiopian Orthodox Church — the 'Feast of Feasts.' It celebrates the Resurrection of Jesus Christ from the dead. It follows the 55-day Great Lent (the longest in Christendom). On the evening of Easter Saturday, the faithful gather in church for the Pascal Vigil. At midnight, the priest announces 'Kristos Tensiwal!' ('Christ is Risen!') and the congregation responds 'Bewinet Tensiwal!' ('Truly He is Risen!'). The church erupts in joy, singing, dancing, and the ringing of bells. After the midnight liturgy, the long fast is broken with a feast.",
    prayers: [
      "'Kristos Tensiwal! Bewinet Tensiwal!' — 'Christ is Risen! Truly He is Risen!' — the Pascal greeting",
      "Easter Vigil (Ye'Fasika Wazema) — the midnight vigil service",
      "'Zare Tensie Kemotan' — 'Today He is risen from the dead' — the central Easter hymn",
      "Easter Kidase — the joyful Liturgy of the Resurrection",
      "Mark 16 / Matthew 28 / John 20 readings — the Resurrection narratives",
      "'Enqwan Aderesachihu LeBeale Fasika' — 'Happy Easter' greeting prayers",
      "Special prayers of the Paschal Anaphora",
    ],
    fasting: "The 55-day Great Lent ends at midnight on Easter Eve when the Resurrection is proclaimed. The fast is broken immediately after the midnight liturgy with a feast of meat, eggs, and dairy.",
    wazema:
      "The Easter Wazema is the most solemn and dramatic of the year. The faithful gather in total darkness on Easter Saturday evening. All lights are extinguished. At midnight, the priest lights a single candle and announces 'Kristos Tensiwal!' The light spreads from candle to candle throughout the darkened church. Drums, sistra, and ululations (ililta) explode as the church transforms from darkness to blazing light. The Debteras perform the most elaborate chants of the year. The celebration continues until dawn.",
  },
  {
    id: "erget",
    name: "Ascension (Erget)",
    geezName: "ዕርገት",
    month: "Ginbot",
    day: 0, // moveable, 40 days after Easter
    type: "moveable",
    description:
      "Erget commemorates the Ascension of Christ into heaven, 40 days after His Resurrection. After appearing to His disciples for 40 days and commissioning them to preach the Gospel to all nations, Christ ascended from the Mount of Olives and was received into a cloud. The angels told the watching disciples: 'This same Jesus, who was taken up from you into heaven, will so come in like manner as you saw Him go into heaven' (Acts 1:11).",
    prayers: [
      "'Arege Wesemay' — 'He ascended into heaven' — the central hymn",
      "Acts 1:1-11 reading — the account of the Ascension",
      "Luke 24:50-53 reading — the blessing and ascension",
      "Special Kidase with Ascension-specific prayers",
      "Prayers affirming Christ's reign at the right hand of the Father",
    ],
    fasting: "No fasting. This falls during the 50-day Paschal season.",
    wazema: "Vigil service on the eve with hymns celebrating Christ's ascension and glorification.",
  },
  {
    id: "paraklitos",
    name: "Pentecost (Paraklitos)",
    geezName: "ጰራቅሊጦስ",
    month: "Sene",
    day: 0, // moveable, 50 days after Easter
    type: "moveable",
    description:
      "Paraklitos (Pentecost) commemorates the descent of the Holy Spirit upon the Apostles, 50 days after the Resurrection. The Holy Spirit descended as tongues of fire, empowering the Apostles to preach in every language. This is considered the birthday of the Church. The 50-day Paschal season of joy (during which no fasting is observed) ends on this day, and the Fast of the Apostles begins the day after.",
    prayers: [
      "'Menfes Kidus Werada' — 'The Holy Spirit descended' — the hymn of Pentecost",
      "Acts 2:1-21 reading — the descent of the Holy Spirit",
      "Joel 2:28-32 reading — 'I will pour out my Spirit on all flesh'",
      "Special prayers invoking the Holy Spirit",
      "The Creed is emphasized — 'We believe in the Holy Spirit, the Lord, the Giver of Life'",
    ],
    fasting: "No fasting on Pentecost itself. The Fast of the Apostles begins the next day.",
    wazema: "Vigil service on the eve with hymns celebrating the Holy Spirit's descent and the empowerment of the Apostles.",
  },
  {
    id: "debre-tabor",
    name: "Transfiguration (Debre Tabor / Buhe)",
    geezName: "ደብረ ታቦር / ቡሄ",
    month: "Nehase",
    day: 13,
    type: "major",
    description:
      "Buhe (Debre Tabor) commemorates the Transfiguration of Christ on Mount Tabor, when His face shone like the sun and His clothes became white as light, and He was seen speaking with Moses and Elijah. The voice of God the Father was heard: 'This is My beloved Son, in whom I am well pleased. Hear Him!' (Matthew 17:5). In Ethiopia, Buhe is celebrated with bonfires and with boys going house to house singing songs and receiving bread (hoya hoye). It also traditionally marks the end of the heavy rains.",
    prayers: [
      "'Bedebre Tabor' — 'On Mount Tabor' — the central hymn of Buhe",
      "Matthew 17:1-8 reading — the Transfiguration account",
      "'Bebirhan Teraeyen' — 'They saw Him in light' — hymn of the revelation of Christ's glory",
      "Special Kidase of the Transfiguration",
    ],
    fasting: "Falls during the Filseta fast, so the fast continues.",
    wazema: "On the eve, boys light torches and bonfires and sing 'Hoya Hoye' songs door to door. The church holds a vigil service.",
  },
  {
    id: "filseta",
    name: "Assumption of the Virgin Mary (Filseta)",
    geezName: "ፍልሰታ",
    month: "Nehase",
    day: 16,
    type: "major",
    description:
      "Filseta commemorates the passing (dormition) and bodily assumption of the Blessed Virgin Mary into heaven. According to Ethiopian tradition, the Apostles were miraculously transported from their various locations around the world to be present at Mary's deathbed. After her passing, her body was assumed (taken up) into heaven. This is the culmination of the 15-day Filseta fast and one of the most beloved feasts in Ethiopia.",
    prayers: [
      "'Filseta Le'Igzitiye Maryam' — 'Assumption of Our Lady Mary' — the central hymn",
      "Marian hymns and prayers of intercession",
      "The Anaphora of Our Lady Mary is used for the Liturgy",
      "Special Magnificat recitation",
      "Prayers recounting the gathering of the Apostles at Mary's deathbed",
    ],
    fasting: "The 15-day Filseta fast ends on this day. The faithful receive communion and then break the fast.",
    wazema: "All-night vigil on the eve with Marian hymns, culminating in the dawn liturgy of Filseta.",
  },
  // ---- OTHER MAJOR FEASTS ----
  {
    id: "enqutatash",
    name: "Ethiopian New Year (Enkutatash)",
    geezName: "እንቁጣጣሽ",
    month: "Meskerem",
    day: 1,
    type: "major",
    description:
      "Enkutatash is the Ethiopian New Year, celebrated on Meskerem 1 (September 11, or September 12 in leap years). The name means 'gift of jewels,' recalling the tradition that the Queen of Sheba returned from visiting King Solomon bearing jewels. It marks the end of the rainy season and the beginning of spring. Girls gather flowers and go door to door singing New Year songs. Special church services are held.",
    prayers: [
      "New Year Kidase — liturgy giving thanks for the past year and asking God's blessing on the new",
      "'Melkam Addis Amet' — 'Happy New Year' — blessing prayers",
      "Psalm 65 — 'You crown the year with Your bounty' — traditionally read",
      "Prayers of thanksgiving for God's mercy throughout the past year",
    ],
    fasting: "No fasting. It is a day of celebration.",
    wazema: "Church services on the eve, with prayers for the new year.",
  },
  {
    id: "hosanna",
    name: "Palm Sunday (Hosanna)",
    geezName: "ሆሳዕና",
    month: "Miyazia",
    day: 0, // moveable
    type: "moveable",
    description:
      "Hosanna celebrates Christ's triumphant entry into Jerusalem, when the crowds spread palm branches and cried 'Hosanna to the Son of David!' In Ethiopian churches, palm branches (tembel) are blessed and distributed. The faithful carry palms in procession, and special hymns are sung. It marks the beginning of Holy Week (Semune Himamat).",
    prayers: [
      "'Hosanna BeDawit Lij' — 'Hosanna to the Son of David' — processional hymn",
      "Blessing of the Palms — the priest blesses palm branches",
      "Matthew 21:1-11 reading — Christ's entry into Jerusalem",
      "John 12:12-19 reading — the people greeting Christ with palms",
      "Procession with palms around the church",
    ],
    fasting: "Great Lent continues. The strict fast of Holy Week is about to begin.",
    wazema: "Vigil on the eve with special preparations for Holy Week.",
  },
  {
    id: "siklet",
    name: "Good Friday (Siklet)",
    geezName: "ስቅለት",
    month: "Miyazia",
    day: 0, // moveable
    type: "moveable",
    description:
      "Siklet (Crucifixion) commemorates the suffering and death of Jesus Christ on the Cross. It is the most solemn day in the Ethiopian Orthodox calendar. The faithful gather in church from early morning for a long service that recounts the Passion narrative. The church is draped in black. A large cross is carried in procession. The faithful mourn, weep, and prostrate themselves. No Kidase (Liturgy) is served on this day because Christ Himself — the true sacrifice — has been offered. It is a day of total fasting — many eat nothing at all.",
    prayers: [
      "'Siklet' — the hymns of the Crucifixion",
      "Reading of the entire Passion narrative from all four Gospels",
      "'Tseome Golgota' — prayers at the foot of the Cross",
      "The Seven Last Words of Christ from the Cross",
      "'Egziabher Hoy Lemene Tehidekenyi' — 'My God, My God, why have You forsaken Me?' — Psalm 22",
      "Procession of the Cross through the church",
      "Prayers of mourning and lamentation",
    ],
    fasting: "The strictest fast of the year. Many faithful eat nothing at all. No Liturgy is celebrated.",
    wazema: "The Wazema of Good Friday begins on Thursday evening (often called 'Thursday of the Mysteries' recalling the Last Supper). The entire night is spent in prayer.",
  },
  {
    id: "kidus-yohannes",
    name: "Feast of St. John the Baptist (Kidus Yohannes)",
    geezName: "ቅዱስ ዮሐንስ",
    month: "Meskerem",
    day: 2,
    type: "major",
    description:
      "The feast of St. John the Baptist (Yohannes Matmik — John the Baptizer) is celebrated on Meskerem 2, the day after the Ethiopian New Year. St. John is deeply honored in the Ethiopian Church as the forerunner of Christ. In some areas, bonfires are lit on the eve of the feast.",
    prayers: [
      "Special Kidase for St. John the Baptist",
      "Luke 1 reading — the birth and prophecy of John",
      "Matthew 3 reading — John's baptism and preaching",
      "Hymns honoring the Forerunner of Christ",
    ],
    fasting: "No special fasting requirement.",
    wazema: "Evening vigil with hymns honoring St. John.",
  },
  {
    id: "ledeta-mariam",
    name: "Nativity of the Virgin Mary (Ledeta Mariam)",
    geezName: "ልደታ ለማርያም",
    month: "Ginbot",
    day: 1,
    type: "major",
    description:
      "The celebration of the birth of the Blessed Virgin Mary, born to the righteous Joachim (Yoakim) and Anna (Hanna). The birth of Mary is seen as the dawn of salvation — through her, God would enter the world. This feast is celebrated with great joy and Marian devotion.",
    prayers: [
      "Marian Kidase — the Liturgy of the Nativity of Mary",
      "The Magnificat (Song of Mary)",
      "Prayers of thanksgiving for the birth of the Theotokos",
      "Hymns recounting the story of Joachim and Anna",
    ],
    fasting: "No special fasting.",
    wazema: "Evening vigil with Marian hymns.",
  },
  {
    id: "hidar-tsion",
    name: "Feast of the Ark of the Covenant (Hidar Tsion)",
    geezName: "ሕዳር ጽዮን",
    month: "Hidar",
    day: 21,
    type: "major",
    description:
      "Hidar Tsion commemorates the bringing of the Ark of the Covenant (Tabot) to the Cathedral of St. Mary of Zion in Aksum. Ethiopian tradition holds that the Ark was brought from Jerusalem to Ethiopia by Menelik I, the son of King Solomon and the Queen of Sheba. This feast is especially grand in Aksum, where the Ark is believed to rest to this day. It also celebrates Mary as the 'Living Ark' who carried God within her.",
    prayers: [
      "Special Kidase celebrating the Ark and its significance",
      "Psalm 132 — 'Arise, O LORD, into Your resting place, You and the ark of Your strength'",
      "Hymns connecting the Ark to the Virgin Mary",
      "Processional hymns with the Tabot",
      "Prayers of the Zion tradition",
    ],
    fasting: "No special fasting.",
    wazema: "Grand vigil in Aksum with processions of the Tabots. Pilgrims gather from all over Ethiopia.",
  },
  {
    id: "giyorgis",
    name: "Feast of St. George (Kidus Giyorgis)",
    geezName: "ቅዱስ ጊዮርጊስ",
    month: "Every month",
    day: 23,
    type: "monthly",
    description:
      "St. George (Giyorgis) is one of the most beloved saints in Ethiopian Christianity. His feast is celebrated on the 23rd of every Ethiopian month, with the principal feast on Miyazia 23 (May 1). He is the patron saint of Ethiopia and his image appears on the national coat of arms. The famous rock-hewn church of Bete Giyorgis in Lalibela is dedicated to him.",
    prayers: [
      "Kidase of St. George — special liturgy",
      "Hymns recounting St. George's martyrdom and dragon-slaying",
      "Prayers asking for St. George's intercession and protection",
      "'Kidus Giyorgis, Semae Tsega' — 'St. George, the martyr of grace'",
    ],
    fasting: "No special fasting, but the day is observed with church attendance.",
    wazema: "Evening services on the eve of the 23rd.",
  },
  {
    id: "tekle-haymanot",
    name: "Feast of Abune Tekle Haymanot",
    geezName: "አቡነ ተክለ ሃይማኖት",
    month: "Every month",
    day: 24,
    type: "monthly",
    description:
      "Abune Tekle Haymanot is the greatest Ethiopian saint. He is credited with restoring the Solomonic dynasty and spreading Christianity throughout southern Ethiopia. According to tradition, he stood on one foot for 7 years in prayer, until his other leg fell off. His feast is celebrated on the 24th of every month, with the principal feast on Nehase 24 (August 30).",
    prayers: [
      "Kidase dedicated to Abune Tekle Haymanot",
      "Gadl (hagiography) readings from his life",
      "Hymns of praise for the saint",
      "Prayers asking his intercession",
    ],
    fasting: "No special fasting.",
    wazema: "Evening services on the eve.",
  },
];

// ==========================================
// HELPER FUNCTIONS
// ==========================================

export function getFeastDay(id: string): FeastDay | undefined {
  return feastDays.find((f) => f.id === id);
}

export function getFastingPeriod(id: string): FastingPeriod | undefined {
  return fastingPeriods.find((f) => f.id === id);
}
