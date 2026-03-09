export interface Saint {
  id: string;
  name: string;
  slug: string;
  category: string;
  title: string;
  biography: string;
  significance: string;
  feastDay: string;
  associatedPrayers: string[];
  relatedArticles: string[];
}

export const saintCategories = [
  "St Mary",
  "Archangels",
  "Apostles",
  "Ethiopian Saints",
  "Martyrs",
];

export const saints: Saint[] = [
  {
    id: "1",
    name: "The Blessed Virgin Mary (Kidist Maryam)",
    slug: "virgin-mary",
    category: "St Mary",
    title: "Theotokos — Mother of God",
    biography: `The Blessed Virgin Mary holds a uniquely exalted position in Ethiopian Orthodox theology and devotion. She is called **Kidist Maryam** (ቅድስት ማሪያም) — Holy Mary — and **Waldita Amlak** (ወላዲተ አምላክ) — Mother of God.

Born to the righteous Joachim and Anna, Mary was dedicated to God from her youth. She grew up in the Temple, nurtured by the angels. When the time came for God's plan of salvation to be fulfilled, the Archangel Gabriel was sent to announce that she would conceive and bear the Son of God by the power of the Holy Spirit.

Mary said "yes" to God — "Behold the handmaid of the Lord; be it unto me according to your word" (Luke 1:38). Through her obedience and faith, the Eternal Word became flesh and dwelt among us.

After the Ascension of Christ, Mary remained with the Apostles, supporting the early Church with her prayers. According to Ethiopian tradition, she fell asleep (was assumed) and was taken up body and soul to heaven, where she continues to intercede for all who call upon her.`,
    significance: `In Ethiopian Orthodoxy, the Virgin Mary is venerated above all saints. She is:

- **The New Eve** — whose obedience reversed Eve's disobedience
- **The Ark of the New Covenant** — who carried God within her womb
- **The Queen of Heaven** — exalted by her Son above all creation
- **The Intercessor** — whose prayers are powerful before God

The Ethiopian Church dedicates **33 feast days** to the Virgin Mary throughout the liturgical year — more than any other Christian tradition. The most important include:

- **Kidane Mihret** (Covenant of Mercy) — celebrating Christ's promise to honor Mary's intercessions
- **Filseta** (Assumption) — commemorating her bodily assumption into heaven (August 15)
- **Hidar Tsion** — celebrating the Ark of the Covenant's connection to Mary

Ethiopian Christians have a deeply personal relationship with the Virgin Mary, calling upon her as a mother, protector, and advocate.`,
    feastDay: "33 feast days throughout the year; principal: Hidar 21 (Presentation), Tahsas 29 (Nativity), Ginbot 1 (Assumption/Filseta)",
    associatedPrayers: ["Prayer to the Virgin Mary", "Magnificat", "Prayer of the Covenant of Mercy"],
    relatedArticles: [],
  },
  {
    id: "2",
    name: "St. Michael the Archangel (Kidus Mikael)",
    slug: "st-michael",
    category: "Archangels",
    title: "Chief of the Heavenly Hosts",
    biography: `St. Michael the Archangel — **Kidus Mikael** (ቅዱስ ሚካኤል) — is the chief of the heavenly hosts, the leader of God's angelic army. His name means "Who is like God?" — a declaration of God's supreme power.

In Scripture, Michael is described as "one of the chief princes" (Daniel 10:13) and "the great prince who stands for the children of your people" (Daniel 12:1). In the Book of Revelation, it is Michael who leads the heavenly army against the dragon: "And there was war in heaven: Michael and his angels fought against the dragon" (Revelation 12:7).

According to Ethiopian tradition, Michael has been God's faithful servant since before creation. He cast Satan out of heaven, he guided the Israelites through the wilderness, he appeared to Joshua before the battle of Jericho, and he continues to protect the faithful from the attacks of the evil one.

The Ethiopian Church teaches that Michael intercedes for souls at the time of judgment and carries the prayers of the faithful before the throne of God.`,
    significance: `St. Michael holds a position of supreme honor among the angels in Ethiopian Orthodoxy:

- **Protector of the Church** — he guards the faithful from spiritual and physical dangers
- **Warrior against evil** — he fights the battles of God's people against the forces of darkness
- **Intercessor at judgment** — he advocates for souls before the throne of God
- **Leader of worship** — he leads the heavenly worship before God's throne

Ethiopian Christians have a profound devotion to St. Michael. Many churches are dedicated to him, and his icon is displayed prominently in homes and businesses. His feast day on the 12th of every Ethiopian month is widely observed with fasting, prayer, and church attendance.

The traditional belief is that Michael accompanies the faithful throughout life, especially at the hour of death, guiding the soul safely to God.`,
    feastDay: "12th of every Ethiopian month (Hidar 12 is the principal feast)",
    associatedPrayers: ["Prayer to St. Michael the Archangel"],
    relatedArticles: [],
  },
  {
    id: "3",
    name: "St. Gabriel the Archangel (Kidus Gebriel)",
    slug: "st-gabriel",
    category: "Archangels",
    title: "Messenger of God",
    biography: `St. Gabriel the Archangel — **Kidus Gebriel** (ቅዱስ ገብርኤል) — is the great messenger of God. His name means "Strength of God" or "God is my strength."

Gabriel appears throughout Scripture as God's chosen messenger for the most important announcements:

- He appeared to the prophet Daniel to explain visions (Daniel 8:16, 9:21)
- He appeared to Zechariah to announce the birth of John the Baptist (Luke 1:11-20)
- He was sent to the Virgin Mary in Nazareth to announce the Incarnation — the most momentous message in human history: "Hail, full of grace, the Lord is with you" (Luke 1:28)

In Ethiopian tradition, Gabriel is also associated with many miraculous interventions. He is believed to have:
- Guided the Holy Family during their flight to Egypt (and their sojourn in Ethiopia)
- Protected Ethiopian kings and churches throughout history
- Appeared to saints and holy people to deliver God's messages

Gabriel is especially honored as the angel who brought the good news of salvation to the Virgin Mary, making the Incarnation possible through her consent.`,
    significance: `Gabriel holds a place of deep love in Ethiopian Orthodox hearts:

- **Bearer of Good News** — he brings God's messages of hope and salvation
- **Protector of the faithful** — he guards those who call upon his name
- **Companion of the Virgin Mary** — he has a special connection to the Theotokos
- **Angel of mercy** — he is associated with God's compassion and grace

The devotion to St. Gabriel is immense in Ethiopian culture. The church of Kidus Gebriel in Kulubi (eastern Ethiopia) is one of the most visited pilgrimage sites in the country. Twice a year, hundreds of thousands of pilgrims travel to Kulubi to celebrate his feast and seek his intercession.

Many Ethiopian Christians name their children after Gabriel (Gebriel, Gebru) and consider him a personal guardian and intercessor.`,
    feastDay: "19th of every Ethiopian month (Tahsas 19 is the principal feast — coinciding with the Annunciation)",
    associatedPrayers: ["Prayer to St. Gabriel the Archangel"],
    relatedArticles: [],
  },
  {
    id: "4",
    name: "St. Yared",
    slug: "st-yared",
    category: "Ethiopian Saints",
    title: "Father of Ethiopian Sacred Music",
    biography: `St. Yared — **Kidus Yared** (ቅዱስ ያሬድ) — is one of the most beloved Ethiopian saints and is revered as the father of Ethiopian sacred music and hymnography. He lived in the 6th century AD in the ancient city of Aksum.

According to tradition, Yared was initially a poor student who struggled in his studies. One day, while resting under a tree, he observed a caterpillar trying repeatedly to climb the trunk. Despite falling many times, the caterpillar persevered and finally reached the top. Inspired by this, Yared returned to his studies with renewed determination.

Through divine inspiration, Yared created the entire system of Ethiopian liturgical music, known as **Zema** (ዜማ). He composed three modes of chanting:

- **Ge'ez** (ግዕዝ) — the solemn, contemplative mode
- **Izil** (ዕዝል) — the gentle, meditative mode
- **Araray** (አራራይ) — the joyful, festive mode

Legend says that when Yared sang before King Gebre Meskel of Aksum, his music was so beautiful that the king, entranced, accidentally stepped on Yared's foot with his spear without either of them noticing — so transported were they by the heavenly music.

Yared is also credited with developing the Ethiopian system of musical notation using special characters, making the Ethiopian Church one of the few ancient traditions with a written musical system.`,
    significance: `St. Yared's contribution to Ethiopian Orthodox Christianity is immeasurable:

- **Creator of Zema** — the entire liturgical music tradition of the Ethiopian Church flows from his inspiration
- **Author of the Degua** — the hymnbook used throughout the liturgical year
- **Developer of musical notation** — creating a unique system for preserving sacred music
- **Model of perseverance** — his story of the caterpillar inspires generations

Every Ethiopian Orthodox service — from the daily prayers to the great feasts — uses the musical system created by St. Yared. His work has been preserved for over 1,400 years, making it one of the oldest continuous musical traditions in the world.

The Debteras (church scholars/chanters) who perform this music today are the spiritual descendants of Yared, keeping his legacy alive through their mastery of the ancient chants.`,
    feastDay: "Sene 11 (May 19) — Feast of St. Yared",
    associatedPrayers: [],
    relatedArticles: [],
  },
  {
    id: "5",
    name: "The Nine Saints (Tis'atu Kiddusan)",
    slug: "the-nine-saints",
    category: "Ethiopian Saints",
    title: "Founders of Ethiopian Monasticism",
    biography: `The Nine Saints — **Tis'atu Kiddusan** (ትስዓቱ ቅዱሳን) — are a group of missionary monks who came to Ethiopia in the late 5th century and played a foundational role in establishing monasticism and deepening the Christian faith in the Ethiopian highlands.

According to tradition, the Nine Saints came from various parts of the Roman Empire (Syria, Constantinople, Cilicia, and Rome) and arrived in Ethiopia during the reign of King Ella Amida. They are:

1. **Abba Aregawi** (Za-Mikael) — founder of Debre Damo monastery
2. **Abba Pantelewon** — who settled near Aksum
3. **Abba Gerima** (Yisehaq) — founder of Debre Gerima
4. **Abba Aftse** — who settled in Yeha
5. **Abba Guba** — who worked in various locations
6. **Abba Alef** — who settled in Hamus
7. **Abba Yimata** — who settled in Ger'alta
8. **Abba Liqanos** — who worked in the north
9. **Abba Sehma** — who established communities in various places

The Nine Saints are credited with:
- **Translating the Bible into Ge'ez** — making Scripture accessible to Ethiopian Christians
- **Establishing monasteries** — creating the monastic tradition that would shape Ethiopian Christianity
- **Strengthening the faith** — teaching, preaching, and converting many to Christianity
- **Developing liturgical texts** — translating and composing prayers and hymns

Their monasteries became centers of learning, prayer, and manuscript production that preserved and transmitted the faith for centuries.`,
    significance: `The Nine Saints are among the most important figures in Ethiopian Church history:

- **Fathers of Ethiopian Monasticism** — they established the monastic tradition that remains central to Ethiopian Orthodoxy
- **Bible Translators** — their translation of Scripture into Ge'ez gave Ethiopia its own Bible tradition
- **Missionaries** — they spread Christianity beyond the urban centers into the rural highlands
- **Bridge between traditions** — they brought the wider Orthodox tradition to Ethiopia, connecting it to the universal Church

The monasteries they founded — especially Debre Damo — continue to function today, making them among the oldest continuously operating monasteries in the world. Their legacy lives on in every Ethiopian monastery, every Ge'ez Bible, and every liturgical celebration.

The Nine Saints are a powerful reminder that Ethiopian Christianity, while uniquely African, is deeply connected to the wider Christian tradition through these holy missionaries who brought their faith across continents.`,
    feastDay: "Tikmt 5 (October 15) — Collective feast; individual feasts throughout the year",
    associatedPrayers: [],
    relatedArticles: [],
  },
];

export function getSaint(slug: string): Saint | undefined {
  return saints.find((s) => s.slug === slug);
}
