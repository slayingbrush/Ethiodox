export interface Lesson {
  id: string;
  title: string;
  slug: string;
  category: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  overview: string;
  content: string;
  scriptureRefs: string[];
  misconceptions: { claim: string; response: string }[];
  reflectionQuestions: string[];
  nextLessonSlug: string | null;
}

export const lessons: Lesson[] = [
  {
    id: "1",
    title: "Who is God?",
    slug: "who-is-god",
    category: "Foundations of Faith",
    difficulty: "beginner",
    overview:
      "An introduction to the Orthodox understanding of the one true God — eternal, uncreated, and incomprehensible in essence yet known through His energies and self-revelation.",
    content: `
## The God of the Ethiopian Orthodox Tewahedo Church

The Ethiopian Orthodox Tewahedo Church confesses one God — the Almighty Creator of heaven and earth, of all things visible and invisible. This is the God revealed in the Holy Scriptures and proclaimed by the Holy Fathers.

### God is One

"Hear, O Israel: The LORD our God, the LORD is one" (Deuteronomy 6:4). The Church firmly holds to the absolute oneness of God. There is no other god beside Him. He alone is eternal, self-existent, and the source of all being.

### God is Beyond Comprehension

While God reveals Himself to humanity, His essence remains beyond human understanding. As St. Gregory of Nyssa taught, God's nature is infinite and cannot be contained by finite minds. We can know God truly, but we cannot know Him exhaustively.

The Ethiopian tradition emphasizes this mystery through its rich liturgical language. The Ge'ez prayers often address God with titles that express both His transcendence and His nearness: **Egziabher** (Lord of the Universe), **Amlak** (God), and **Medhane Alem** (Savior of the World).

### God's Attributes

Orthodox theology speaks of God's attributes not as parts of God, but as ways we experience His one, simple, undivided nature:

- **Eternal** — God has no beginning and no end
- **Omnipresent** — God is everywhere present and fills all things
- **Omniscient** — God knows all things, past, present, and future
- **Omnipotent** — God is all-powerful; nothing is impossible for Him
- **Holy** — God is utterly pure, separate from all sin and corruption
- **Love** — "God is love" (1 John 4:8) — love is not merely what God does, but who He is

### The Living God

Unlike the abstract "god" of philosophy, the God of Orthodoxy is personal, living, and active. He speaks, He acts, He loves, He saves. The entire narrative of Scripture is the story of God reaching out to humanity — from creation, through the patriarchs and prophets, and ultimately through the Incarnation of His Son.

### Knowing God

The Ethiopian Orthodox tradition teaches that God is known through:

1. **Scripture** — The written Word of God
2. **Tradition** — The living faith handed down from the Apostles
3. **Prayer** — Personal encounter with the living God
4. **The Sacraments** — Especially the Holy Eucharist
5. **Creation** — "The heavens declare the glory of God" (Psalm 19:1)
6. **The Saints** — Those who have been transformed by God's grace

### The Fear of God

Ethiopian spirituality places great emphasis on the **fear of God** (ፍርሃተ እግዚአብሔር). This is not terror, but a profound reverence, awe, and awareness of God's holiness. "The fear of the LORD is the beginning of wisdom" (Proverbs 9:10). This holy fear leads to repentance, humility, and a deeper love for God.
    `,
    scriptureRefs: [
      "Deuteronomy 6:4",
      "1 John 4:8",
      "Psalm 19:1",
      "Proverbs 9:10",
      "Isaiah 40:28",
      "Jeremiah 23:24",
    ],
    misconceptions: [
      {
        claim: "God is unknowable, so it doesn't matter what we believe about Him.",
        response:
          "While God's essence is beyond full comprehension, He has revealed Himself truly through Scripture, Tradition, and above all through Jesus Christ. What we believe about God matters immensely — it shapes our worship, our prayers, and our entire spiritual life.",
      },
      {
        claim: "The Orthodox God is different from the God of the Bible.",
        response:
          "The Orthodox Church has preserved the biblical faith from the time of the Apostles. The God we worship is the God of Abraham, Isaac, and Jacob — the Father revealed by Jesus Christ.",
      },
    ],
    reflectionQuestions: [
      "How does the Orthodox understanding of God differ from how you previously thought about God?",
      "What does it mean to you that God is both beyond comprehension and personally knowable?",
      "How can you cultivate a deeper 'fear of God' in your daily life?",
    ],
    nextLessonSlug: "the-holy-trinity",
  },
  {
    id: "2",
    title: "The Holy Trinity",
    slug: "the-holy-trinity",
    category: "Foundations of Faith",
    difficulty: "beginner",
    overview:
      "The Orthodox doctrine of the Holy Trinity — one God in three Persons: Father, Son, and Holy Spirit — co-eternal, co-equal, and undivided.",
    content: `
## The Holy Trinity in Ethiopian Orthodox Teaching

The mystery of the Holy Trinity is the central doctrine of the Christian faith. The Ethiopian Orthodox Tewahedo Church confesses: **One God in Trinity, and Trinity in Unity** — neither confounding the Persons nor dividing the substance.

### One God, Three Persons

The Creed of the Church declares faith in:

- **God the Father** — the unbegotten source, the fountain of deity
- **God the Son** — eternally begotten of the Father, "Light of Light, true God of true God"
- **God the Holy Spirit** — who proceeds from the Father, the Giver of life

These three Persons are not three gods, but one God. They share one divine nature, one will, one power, and one glory.

### The Ethiopian Expression of the Trinity

The Ethiopian Church has a unique and beautiful way of expressing Trinitarian theology. The concept of **Selassie** (ሥላሴ) — meaning "Trinity" — is deeply embedded in Ethiopian Christian culture and worship.

The traditional Ethiopian formula expresses it this way:
- The Father is God (**Amlak**)
- The Son is God (**Amlak**)
- The Holy Spirit is God (**Amlak**)
- Yet there are not three Gods, but **one God** (**Ahadu Amlak** — One God)

### Biblical Foundation

The Trinity is revealed throughout Scripture:

**Old Testament Hints:**
- "Let **Us** make man in **Our** image" (Genesis 1:26)
- The Trisagion of Isaiah: "Holy, Holy, Holy is the LORD of hosts" (Isaiah 6:3)
- The three visitors to Abraham at Mamre (Genesis 18)

**New Testament Revelation:**
- The Baptism of Christ — the Father speaks, the Son is baptized, the Spirit descends (Matthew 3:16-17)
- The Great Commission — "baptizing them in the name of the Father and of the Son and of the Holy Spirit" (Matthew 28:19)
- "The grace of the Lord Jesus Christ, and the love of God, and the communion of the Holy Spirit" (2 Corinthians 13:14)

### The Trinitarian Life

The Trinity is not merely a doctrine to be believed — it is the pattern of the Christian life:

- We pray **to the Father**
- **Through the Son**
- **In the Holy Spirit**

Every Orthodox prayer, every liturgical act, every sacrament is Trinitarian in structure. When we cross ourselves, we invoke the Trinity. When we receive the Eucharist, we commune with the Triune God.

### Against Heresies

The Church has defended the Trinity against many errors:

- **Modalism** (Sabellianism) — the error that Father, Son, and Spirit are merely three "modes" or masks of one Person
- **Tritheism** — the error that there are three separate gods
- **Arianism** — the error that the Son is a created being, not truly God
- **Subordinationism** — the error that the Son or Spirit is inferior to the Father

The Ethiopian Church, following the Council of Nicaea (325 AD) and subsequent councils, rejects all these errors and confesses the full equality and co-eternity of the three Persons.
    `,
    scriptureRefs: [
      "Genesis 1:26",
      "Isaiah 6:3",
      "Matthew 3:16-17",
      "Matthew 28:19",
      "2 Corinthians 13:14",
      "John 1:1",
      "John 14:26",
    ],
    misconceptions: [
      {
        claim: "The Trinity is a contradiction — you can't have three and one at the same time.",
        response:
          "The Trinity is not three gods in one god (that would be a contradiction). It is one God who exists as three distinct Persons. The Persons are not the same as each other, but they share one divine nature. It is a mystery, but not a contradiction.",
      },
      {
        claim: "The word 'Trinity' isn't in the Bible, so it's a man-made invention.",
        response:
          "While the word 'Trinity' was coined later to describe what the Bible teaches, the reality of the Trinity is thoroughly biblical. The Father, Son, and Holy Spirit are all called God and all shown to be distinct Persons in Scripture.",
      },
    ],
    reflectionQuestions: [
      "How does the doctrine of the Trinity shape your understanding of God's nature?",
      "In what ways do you experience the three Persons of the Trinity in your prayer life?",
      "Why is it important that the Son is 'true God of true God' and not a created being?",
    ],
    nextLessonSlug: "who-is-jesus-christ",
  },
  {
    id: "3",
    title: "Who is Jesus Christ?",
    slug: "who-is-jesus-christ",
    category: "Christology and Tewahedo",
    difficulty: "beginner",
    overview:
      "The Tewahedo Christology — Jesus Christ is fully God and fully man, united in one nature without confusion, mixture, or separation.",
    content: `
## Jesus Christ in Tewahedo Theology

The name **Tewahedo** (ተዋሕዶ) itself comes from the Ge'ez word meaning "being made one" or "unified." It refers to the Church's distinctive Christological teaching about the person of Jesus Christ.

### True God and True Man

The Ethiopian Orthodox Tewahedo Church confesses that Jesus Christ is:

- **Fully God** — the eternal Son of the Father, the Second Person of the Holy Trinity, "Light of Light, true God of true God," begotten before all ages
- **Fully Man** — born of the Virgin Mary, taking real human nature — body, soul, and mind — in all things like us except sin

### The Tewahedo Union

The word **Tewahedo** describes how the divine and human natures are united in Christ. After the Incarnation:

- The two natures — divine and human — are united in **one nature** of God the Word Incarnate
- This union is **without confusion** — the divine nature did not absorb the human, nor was it diminished
- This union is **without separation** — the two natures cannot be divided after the union
- This union is **without change** — neither nature was altered or transformed

This teaching follows the great St. Cyril of Alexandria, who spoke of **"Mia Physis tou Theou Logou Sesarkomene"** — "One incarnate nature of God the Word."

### The Incarnation

"And the Word became flesh and dwelt among us" (John 1:14).

The Incarnation is the central event of human history. God the Son, without ceasing to be God, took upon Himself human nature from the Virgin Mary by the power of the Holy Spirit. He was born in Bethlehem, grew as a child, lived among us, taught, performed miracles, suffered, died, rose again, and ascended to heaven.

### Why the Incarnation Matters

The Church Fathers taught: **"What is not assumed is not healed."** Christ took full human nature so that He might save the whole human person:

- He took a human **body** to redeem our bodies
- He took a human **soul** to heal our souls
- He took a human **mind** to sanctify our minds

### The Names of Christ

Ethiopian tradition uses many beautiful names for Christ:

- **Iyesus Kristos** (ኢየሱስ ክርስቶስ) — Jesus Christ
- **Medhane Alem** (መድኃኔ ዓለም) — Savior of the World
- **Emanu'el** (ኢማኑኤል) — God with Us
- **Kidus** (ቅዱስ) — The Holy One
- **Negusse Negest** (ንጉሠ ነገሥት) — King of Kings

### Christ in Ethiopian Devotion

Ethiopian Christians have a deep, personal devotion to Jesus Christ. The prayers of the Church are filled with praise, adoration, and love for the Incarnate Lord. The Kidase (Divine Liturgy) is centered on Christ's sacrifice on the Cross, made present in the Holy Eucharist.

The traditional greeting **"In the name of Jesus Christ"** reflects the centrality of Christ in Ethiopian Orthodox life.
    `,
    scriptureRefs: [
      "John 1:1",
      "John 1:14",
      "Philippians 2:5-11",
      "Colossians 1:15-20",
      "Hebrews 1:1-4",
      "Luke 1:35",
      "1 Timothy 3:16",
    ],
    misconceptions: [
      {
        claim: "Tewahedo Christology is Monophysite — it denies Christ's human nature.",
        response:
          "This is a common misunderstanding. The Tewahedo Church is Miaphysite, not Monophysite. We confess that Christ is fully God and fully man. The 'one nature' (mia physis) refers to the united nature of the Incarnate Word — both divine and human — without confusion or separation. We reject Eutychianism, which truly denies the human nature.",
      },
      {
        claim: "Jesus was just a good teacher or prophet.",
        response:
          "Jesus Christ is not merely a teacher or prophet — He is God the Son incarnate. He Himself said, 'I and the Father are one' (John 10:30). The Church confesses Him as 'true God of true God.'",
      },
    ],
    reflectionQuestions: [
      "What does 'Tewahedo' (being made one) tell you about how God relates to humanity?",
      "How does the Incarnation change the way you think about your own body and human experience?",
      "Why is it important that Christ is both fully God and fully man?",
    ],
    nextLessonSlug: "what-tewahedo-means",
  },
  {
    id: "4",
    title: "What Tewahedo Means",
    slug: "what-tewahedo-means",
    category: "Christology and Tewahedo",
    difficulty: "intermediate",
    overview:
      "A deeper exploration of the Tewahedo Christological formula and its significance for Ethiopian Orthodox identity and theology.",
    content: `
## Understanding Tewahedo

The word **Tewahedo** (ተዋሕዶ) is the theological heart of the Ethiopian Orthodox Church. It is not merely a denominational label — it is a confession of faith about who Jesus Christ is.

### The Meaning of the Word

**Tewahedo** comes from the Ge'ez root ወሐደ (wehade), meaning "to unite" or "to make one." It describes the **hypostatic union** — the coming together of the divine and human natures in the one Person of Jesus Christ.

When we say "Tewahedo," we are confessing: In the Incarnation, the divine nature and the human nature were united in one — **perfectly, completely, inseparably, and without confusion**.

### The Historical Context

The Christological debates of the 4th and 5th centuries produced several formulas:

**The Council of Chalcedon (451 AD)** spoke of Christ in "two natures" (dyophysite formula).

**The Non-Chalcedonian Churches** — including the Ethiopian, Coptic, Syrian, Armenian, and Eritrean Orthodox Churches — preferred the formula of **St. Cyril of Alexandria**: "One incarnate nature of God the Word."

This is the **Miaphysite** position:
- **Mia** = one (united)
- **Physis** = nature

It is crucial to understand that Miaphysite is NOT Monophysite:
- **Monophysitism** (the heresy of Eutyches) says the human nature was absorbed into the divine — we **reject** this
- **Miaphysitism** says the two natures are united in one composite nature without confusion, without separation — we **confess** this

### What Tewahedo is NOT

- It is **not** the denial of Christ's humanity
- It is **not** the confusion of the divine and human natures
- It is **not** the absorption of one nature into another
- It is **not** a compromise between divinity and humanity

### What Tewahedo IS

- It is the confession that Christ is **one** — not divided, not split
- It is the affirmation that God truly became man **without ceasing to be God**
- It is the teaching that humanity was truly taken into God **without being destroyed**
- It is the mystery of salvation: God and man united forever

### The Analogy of Iron and Fire

The Church Fathers used the analogy of iron placed in fire:

When iron is placed in fire, it becomes red-hot. The fire and the iron are united — the iron glows with the fire's heat and light. Yet the iron remains iron and the fire remains fire. They are united without confusion.

So in Christ: the divine and human natures are united. The humanity is "filled" with divinity. Yet each nature remains what it is — they are one without confusion.

### Why This Matters

The Tewahedo understanding is not abstract theology — it has profound implications:

1. **For Salvation** — If the natures are separated, salvation is incomplete. Only a truly united Christ can bridge the gap between God and humanity.
2. **For the Eucharist** — The bread and wine become the true Body and Blood of the united Christ — fully divine and fully human.
3. **For Worship** — When we worship Christ, we worship one Person, not a divided being.
4. **For Identity** — "Tewahedo" is not just a theological term — it is the spiritual identity of the Ethiopian Church.
    `,
    scriptureRefs: [
      "John 1:14",
      "Colossians 2:9",
      "1 Timothy 2:5",
      "Hebrews 2:14-17",
      "Philippians 2:6-8",
    ],
    misconceptions: [
      {
        claim: "The Chalcedonian and Non-Chalcedonian positions are irreconcilable.",
        response:
          "Modern ecumenical dialogues have shown that both traditions affirm the same faith — that Christ is fully God and fully man — using different theological language. The disagreement is more terminological than substantial.",
      },
      {
        claim: "Tewahedo is a uniquely Ethiopian invention.",
        response:
          "The Miaphysite Christology is shared by all Oriental Orthodox Churches — Coptic, Syrian, Armenian, Eritrean, and Indian (Malankara). It is rooted in the theology of St. Cyril of Alexandria, one of the greatest Church Fathers.",
      },
    ],
    reflectionQuestions: [
      "How does the meaning of 'Tewahedo' deepen your understanding of who Jesus is?",
      "Why do you think the Ethiopian Church chose this particular word as its name?",
      "How does the union of divine and human in Christ give you hope for your own life?",
    ],
    nextLessonSlug: "the-eucharist",
  },
  {
    id: "5",
    title: "The Holy Eucharist",
    slug: "the-eucharist",
    category: "Sacraments",
    difficulty: "intermediate",
    overview:
      "The Orthodox teaching on the Holy Eucharist — the Body and Blood of Christ, the center of Orthodox worship and spiritual life.",
    content: `
## The Holy Eucharist (Kidus Kurban)

The Holy Eucharist — known in Ge'ez as **Kidus Kurban** (ቅዱስ ቁርባን) — is the most sacred sacrament of the Ethiopian Orthodox Tewahedo Church. It is the true Body and true Blood of our Lord Jesus Christ, given for the life of the world.

### "This is My Body"

At the Last Supper, our Lord Jesus Christ took bread, blessed it, broke it, and gave it to His disciples, saying:

> "Take, eat; this is My Body which is broken for you. Do this in remembrance of Me." (1 Corinthians 11:24)

And taking the cup, He said:

> "This cup is the new covenant in My Blood. Do this, as often as you drink it, in remembrance of Me." (1 Corinthians 11:25)

The Church takes these words literally and absolutely. The bread and wine truly **become** the Body and Blood of Christ through the prayer of the priest and the descent of the Holy Spirit.

### Not a Symbol

The Ethiopian Orthodox Church emphatically teaches that the Eucharist is **not** a mere symbol, representation, or memorial. It is the **real, true, actual** Body and Blood of Jesus Christ.

St. Cyril of Jerusalem taught: "Do not regard the bread and wine as simply that; for they are, according to the Master's declaration, the Body and Blood of Christ. Even though the senses suggest to you the other, let faith make you firm."

### The Liturgy (Kidase)

The Eucharist is celebrated within the **Kidase** (ቅዳሴ) — the Divine Liturgy. The Ethiopian Church has **14 anaphoras** (Eucharistic prayers), more than any other Orthodox tradition:

1. The Anaphora of the Apostles
2. The Anaphora of Our Lord Jesus Christ
3. The Anaphora of Our Lady Mary
4. The Anaphora of St. John Son of Thunder
5. The Anaphora of the 318 Orthodox (Nicene Fathers)
6. And nine others...

Each anaphora has its own character and beauty, used on different occasions throughout the liturgical year.

### Preparation for Communion

The Ethiopian Church requires careful preparation before receiving Holy Communion:

- **Fasting** — Complete abstinence from food and drink from midnight
- **Confession** — Confessing sins to a priest
- **Prayer** — Preparing the heart through prayer
- **Purity** — Marital abstinence before communion
- **Reverence** — Approaching with fear, faith, and love

### The Effects of Communion

Through Holy Communion, the faithful receive:

- **Union with Christ** — "He who eats My flesh and drinks My blood abides in Me, and I in him" (John 6:56)
- **Forgiveness of sins** — The Blood of Christ cleanses from all sin
- **Spiritual nourishment** — The Eucharist feeds the soul
- **Healing** — Both spiritual and physical healing
- **Eternal life** — "Whoever eats My flesh and drinks My blood has eternal life" (John 6:54)
- **Unity with the Church** — Communion unites all believers as one body

### The Eucharist and Ethiopian Identity

The Eucharist is the heartbeat of Ethiopian Orthodox life. Churches are built with the **Mekdes** (Holy of Holies) at the center, where the Tabot (Ark) rests and the Eucharist is celebrated. The entire rhythm of Ethiopian Christian life — fasting, prayer, confession — revolves around worthy reception of Holy Communion.

The reverence with which Ethiopian Christians approach the Eucharist — removing shoes, prostrating, covering the head — reflects the deep faith that this is truly the Body and Blood of the Lord.
    `,
    scriptureRefs: [
      "Matthew 26:26-28",
      "1 Corinthians 11:23-26",
      "John 6:51-58",
      "Acts 2:42",
      "1 Corinthians 10:16-17",
    ],
    misconceptions: [
      {
        claim: "The Eucharist is just a symbolic memorial meal.",
        response:
          "Jesus said 'This IS My Body' — not 'this represents My Body.' The early Church unanimously understood these words literally. The Orthodox Church has maintained this teaching for 2,000 years. The Eucharist is the real presence of Christ.",
      },
      {
        claim: "You don't need the Eucharist — faith alone is enough.",
        response:
          "Jesus Himself said, 'Unless you eat the flesh of the Son of Man and drink His blood, you have no life in you' (John 6:53). The Eucharist is not optional — it is essential to the Christian life, as Christ commanded.",
      },
    ],
    reflectionQuestions: [
      "How does believing in the real presence of Christ in the Eucharist change the way you approach the Liturgy?",
      "What steps can you take to better prepare yourself for Holy Communion?",
      "How does the Eucharist connect you to the whole body of Christ — the Church across time and space?",
    ],
    nextLessonSlug: "scripture-and-tradition",
  },
  {
    id: "6",
    title: "Scripture and Holy Tradition",
    slug: "scripture-and-tradition",
    category: "Scripture and Tradition",
    difficulty: "intermediate",
    overview:
      "How Ethiopian and Oriental Orthodox Christianity receives Scripture inside the living Tradition of the Church, not apart from it.",
    content: `
## Scripture in the Life of the Church

Orthodox Christians do not oppose Scripture and Tradition. Scripture is the heart of Tradition, and Tradition is the life in which Scripture is read, prayed, interpreted, and obeyed.

### What Holy Tradition Means

Holy Tradition is the apostolic faith handed down in:

- Scripture
- Liturgy
- Creeds
- Councils
- Patristic teaching
- Canonical life
- The witness of saints and martyrs

Tradition is not human custom added to the Gospel. It is the Church's faithful transmission of the same Gospel through time.

### Why Scripture Needs the Church

The Bible is inspired and true. But private interpretation can produce contradiction and fragmentation. The Ethiopian Orthodox approach is ecclesial:

1. Scripture is read in worship.
2. Scripture is interpreted with the Fathers.
3. Scripture is lived in repentance and sacramental life.

### Ethiopian Biblical Heritage

The Ethiopian Church preserves one of the oldest continuous biblical traditions in Christianity. Ge'ez translation, liturgical reading cycles, and feast-day readings all form believers in a biblical worldview.

### Practical Rule for Study

When reading difficult passages:

- Begin with prayer.
- Read the Church's liturgical context.
- Compare parallel passages.
- Check patristic consensus where available.
- Ask: "How does this call me to holiness?"

The goal is not information only, but transformation.
    `,
    scriptureRefs: [
      "2 Thessalonians 2:15",
      "2 Timothy 3:16-17",
      "Acts 8:30-31",
      "1 Timothy 3:15",
      "Luke 24:27",
    ],
    misconceptions: [
      {
        claim: "Tradition means extra rules that were added later.",
        response:
          "Orthodox Tradition is not an addition to apostolic faith. It is the way apostolic faith is preserved and lived in the Church.",
      },
      {
        claim: "If you have a Bible, you do not need the Church to understand it.",
        response:
          "The same Spirit who inspired Scripture also guides the Church in guarding and interpreting it. Scripture is read most safely within the worshiping body that received it.",
      },
    ],
    reflectionQuestions: [
      "How has your own Bible reading been shaped by worship?",
      "What is one passage you should revisit through patristic and liturgical context?",
      "How can your study become more prayerful and less purely academic?",
    ],
    nextLessonSlug: "oriental-orthodox-family",
  },
  {
    id: "7",
    title: "Oriental Orthodox Family and Ethiopian Distinctives",
    slug: "oriental-orthodox-family",
    category: "Oriental Orthodox Theology",
    difficulty: "intermediate",
    overview:
      "A map of the Oriental Orthodox communion and what is especially Ethiopian in theology, worship, and spirituality.",
    content: `
## One Family, Many Local Churches

The Ethiopian Orthodox Tewahedo Church belongs to the Oriental Orthodox communion, alongside:

- Coptic Orthodox Church
- Syriac Orthodox Church
- Armenian Apostolic Church
- Eritrean Orthodox Tewahedo Church
- Malankara (Indian) Orthodox Syriac Church

These churches share the same core Christological confession: one incarnate nature of God the Word, without confusion, change, division, or separation.

### Shared Oriental Orthodox Features

- Strong liturgical continuity with early Christianity
- Centrality of fasting and ascetic discipline
- High sacramental theology
- Deep veneration of saints and martyrs
- Patristic interpretation of Scripture

### Ethiopian Distinctives

The Ethiopian Church has unique elements that enrich world Christianity:

- Ge'ez liturgical heritage
- Broad and ancient biblical tradition
- Extensive fasting calendar
- Tabot-centered liturgical architecture
- Rich hymnography and chant tradition
- Strong monastic witness and local saint traditions

### Unity Without Uniformity

Oriental Orthodox unity is doctrinal and sacramental, not cultural uniformity. Local churches keep their language, music, and discipline while sharing one apostolic faith.
    `,
    scriptureRefs: [
      "Ephesians 4:4-6",
      "1 Corinthians 12:12-27",
      "Galatians 3:28",
      "John 17:21",
    ],
    misconceptions: [
      {
        claim: "Oriental Orthodox means each church teaches a different faith.",
        response:
          "Local practice differs, but the doctrinal center is shared. Diversity of rite is not diversity of faith.",
      },
      {
        claim: "Ethiopian practice is isolated from wider Christian history.",
        response:
          "Ethiopian Christianity is deeply rooted in apostolic and patristic history and remains in full communion with sister Oriental Orthodox churches.",
      },
    ],
    reflectionQuestions: [
      "Which Ethiopian distinctive most helps you understand the Gospel?",
      "How does unity in faith differ from cultural sameness?",
      "What can you learn from another Oriental Orthodox church without losing Ethiopian identity?",
    ],
    nextLessonSlug: "history-apostolic-to-nicaea",
  },
  {
    id: "8",
    title: "History Module I: Apostolic Christianity to Nicaea (33-325)",
    slug: "history-apostolic-to-nicaea",
    category: "Church History",
    difficulty: "beginner",
    overview:
      "From Pentecost to the first ecumenical council: the apostolic mission, persecution, canon formation, and defense of Christ's divinity.",
    content: `
## Stage One: Birth and Expansion

Christianity begins in the resurrection of Christ, the coming of the Holy Spirit at Pentecost, and apostolic mission.

### Core Timeline

1. **33-64**: Apostolic preaching in Jerusalem, Judea, Samaria, and beyond.
2. **1st century**: Churches planted across the Roman world; Eucharistic worship and episcopal order emerge clearly.
3. **64-313**: Periodic imperial persecutions; martyrs become teachers of the Church by witness.
4. **Early 4th century**: Persecution ends under Constantine; public church life expands.
5. **325**: Council of Nicaea condemns Arianism and confesses the Son as true God.

### Why Nicaea Matters

The question was not abstract: Is Jesus truly God, or a supreme creature? Nicaea answered with precision so salvation would not be reduced.

- If Christ is not truly God, He cannot truly save.
- If Christ is not truly man, humanity is not truly healed.

### Ethiopian Connection

Ethiopian Christian memory strongly connects early Christianity with Acts 8 and later organized church life through Frumentius (Abba Selama). Whether one studies details critically or devotionally, the Church sees itself as apostolic in identity.
    `,
    scriptureRefs: [
      "Acts 2:1-42",
      "Acts 8:26-39",
      "Matthew 28:18-20",
      "John 1:1",
      "Colossians 2:9",
    ],
    misconceptions: [
      {
        claim: "Christian doctrine was invented by councils centuries later.",
        response:
          "Councils did not invent new faith; they defended apostolic faith against new distortions.",
      },
      {
        claim: "Early Christianity had no structure, only private belief.",
        response:
          "From earliest sources we see bishops, presbyters, deacons, sacraments, and shared worship.",
      },
    ],
    reflectionQuestions: [
      "Why is martyrdom central to early church identity?",
      "How does Nicaea protect both worship and salvation?",
      "What does apostolic continuity mean for your church life today?",
    ],
    nextLessonSlug: "history-nicaea-to-chalcedon",
  },
  {
    id: "9",
    title: "History Module II: Nicaea, Ephesus, Chalcedon, and Oriental Orthodox Continuity (325-700)",
    slug: "history-nicaea-to-chalcedon",
    category: "Church History",
    difficulty: "intermediate",
    overview:
      "A focused history of the Christological controversies and how Oriental Orthodox churches understood themselves as preserving Cyrillian orthodoxy.",
    content: `
## Stage Two: Christological Clarification

After Nicaea, the Church continued to refine language about Christ's person.

### Councils and Controversies

1. **Nicaea (325)**: Son is consubstantial with the Father.
2. **Constantinople (381)**: fuller creed language, including clear confession of the Holy Spirit.
3. **Ephesus (431)**: defends unity of Christ's person and Theotokos language for St. Mary.
4. **Chalcedon (451)**: formulates Christ "in two natures."

### Why Division Happened

The split between Chalcedonian and non-Chalcedonian churches involved theology, language, politics, and imperial pressure. Oriental Orthodox churches maintained that their confession followed St. Cyril faithfully and rejected both Nestorian division and Eutychian confusion.

### Oriental Orthodox Self-Understanding

Oriental Orthodox churches describe themselves as:

- Apostolic
- Patristic
- Liturgical
- Miaphysite in Cyrillian sense

Modern dialogue has shown that many disputes were intensified by terminology and historical conflict, not always by contradictory faith.
    `,
    scriptureRefs: [
      "John 1:14",
      "1 Timothy 3:16",
      "Hebrews 2:14-17",
      "Philippians 2:5-11",
    ],
    misconceptions: [
      {
        claim: "The post-Chalcedon divide was only about politics and had no theology.",
        response:
          "Politics mattered, but theology was real and deeply consequential. The language used to confess Christ shapes worship and salvation.",
      },
      {
        claim: "Oriental Orthodox churches deny Christ's humanity.",
        response:
          "Oriental Orthodox churches explicitly confess Christ as fully divine and fully human in true union.",
      },
    ],
    reflectionQuestions: [
      "Why is theological language worth defending carefully?",
      "How can modern Christians learn from past conflicts without repeating them?",
      "What does fidelity to the Fathers look like in your context?",
    ],
    nextLessonSlug: "history-ethiopia-aksum-to-modern",
  },
  {
    id: "10",
    title: "History Module III: Ethiopian Christianity from Aksum to the Modern Era",
    slug: "history-ethiopia-aksum-to-modern",
    category: "Church History",
    difficulty: "advanced",
    overview:
      "An in-depth Ethiopian-focused history: early roots, Aksumite consolidation, monastic expansion, liturgical growth, reform pressures, and modern global presence.",
    content: `
## Stage Three: Ethiopian Christian Development

This module tracks major periods in Ethiopian Christian history with a focus on theology, liturgy, and church life.

### 1. Early Foundations

- Apostolic memory linked with Acts 8.
- Institutional consolidation associated with Frumentius (Abba Selama).
- Royal support for Christianity within Aksumite civilization.

### 2. Translation, Liturgy, and Formation

- Ge'ez biblical and liturgical culture becomes foundational.
- Monastic movements shape doctrine, mission, education, and social life.
- Feast cycles, fasting discipline, and local saints deepen public piety.

### 3. Medieval and Early Modern Pressures

- Internal theological debates and regional political tensions.
- External contact and pressure from Latin and later Protestant influences.
- Ongoing effort to preserve Orthodox identity while responding pastorally.

### 4. Modern Era and Global Diaspora

- New educational institutions and publishing efforts.
- Expanded catechesis in vernacular languages.
- Growing diaspora communities preserving Ethiopian Orthodox worship globally.

### Why This History Matters

Ethiopian Christian history is not a museum narrative. It is a living continuity of:

- apostolic confession,
- sacramental life,
- ascetic discipline,
- and public witness under changing political realities.
    `,
    scriptureRefs: [
      "Acts 8:26-39",
      "2 Timothy 2:2",
      "Psalm 78:4-7",
      "Hebrews 13:7-8",
    ],
    misconceptions: [
      {
        claim: "Ethiopian Christianity is a local ethnic religion, not fully catholic.",
        response:
          "The Ethiopian Church is locally rooted and universally Christian, confessing the apostolic faith in communion with sister Oriental Orthodox churches.",
      },
      {
        claim: "Tradition means no development.",
        response:
          "Orthodox history shows faithful continuity and real development in language, institutions, and mission without abandoning doctrine.",
      },
    ],
    reflectionQuestions: [
      "Which era of Ethiopian church history most shapes today's church challenges?",
      "How should historical memory influence mission in diaspora communities?",
      "What parts of Ethiopian tradition are essential to preserve in your generation?",
    ],
    nextLessonSlug: "orthodox-spiritual-life",
  },
  {
    id: "11",
    title: "Orthodox Spiritual Life: Prayer, Fasting, and Almsgiving",
    slug: "orthodox-spiritual-life",
    category: "Christian Life",
    difficulty: "beginner",
    overview:
      "A practical module on daily discipleship in Ethiopian and Oriental Orthodox spirituality.",
    content: `
## The Threefold Discipline

Orthodox spiritual life is often summarized through three inseparable practices:

1. Prayer
2. Fasting
3. Almsgiving

None of these is optional decoration. Together, they train the heart in communion with Christ.

### Prayer

Prayer is not only asking. It includes:

- praise,
- thanksgiving,
- repentance,
- intercession,
- silence before God.

The goal is steady remembrance of God across the whole day.

### Fasting

Fasting is not diet culture. It is ascetic medicine:

- healing disordered desires,
- restoring watchfulness,
- opening generosity toward others.

Without repentance and mercy, fasting becomes empty ritual.

### Almsgiving

Almsgiving is concrete love. It includes money, time, labor, and hospitality. It is not secondary to theology; it is theology enacted.

### Integration in Ethiopian Practice

Ethiopian Orthodox spirituality joins these disciplines with:

- frequent liturgical participation,
- confession and Eucharistic preparation,
- veneration of saints,
- communal seasons of repentance and joy.
    `,
    scriptureRefs: [
      "Matthew 6:1-18",
      "Isaiah 58:6-10",
      "James 2:14-17",
      "1 Thessalonians 5:17",
      "Matthew 25:31-46",
    ],
    misconceptions: [
      {
        claim: "As long as doctrine is right, spiritual discipline is optional.",
        response:
          "Orthodoxy is right belief and right worship and right living. Doctrine without ascetic life becomes sterile.",
      },
      {
        claim: "Fasting is legalism and has no value today.",
        response:
          "Christ Himself fasted and instructed His disciples to fast. The issue is not whether to fast, but how to fast with humility and love.",
      },
    ],
    reflectionQuestions: [
      "Which of the three disciplines is weakest in your current life?",
      "What is one weekly practice you can begin immediately?",
      "How can your private piety become visible mercy for others?",
    ],
    nextLessonSlug: null,
  },
];

export function getLesson(slug: string): Lesson | undefined {
  return lessons.find((l) => l.slug === slug);
}

export function getLessonsByCategory(): Record<string, Lesson[]> {
  return lessons.reduce(
    (acc, lesson) => {
      if (!acc[lesson.category]) acc[lesson.category] = [];
      acc[lesson.category].push(lesson);
      return acc;
    },
    {} as Record<string, Lesson[]>
  );
}
