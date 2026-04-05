const fs = require('fs');
const path = require('path');

const storiesPath = '/Users/stevenmathew/Downloads/Projects/BibleQuizCompetition/quiz-master-admin-boost/src/data/kids-stories.json';
const stories = JSON.parse(fs.readFileSync(storiesPath, 'utf8'));

const updatedStories = stories.map(story => {
  // Story 1: The Brave Shepherd Boy (David & Goliath)
  if (story.slug === 'the-brave-shepherd-boy') {
    story.fullStory = `Long ago, in the peaceful rolling hills of Bethlehem, there lived a young boy named David. David was the youngest of eight brothers, and while his older brothers were strong and brave soldiers in the army of King Saul, David had a very different job. He was a shepherd. His days were spent watching over his father Jesse's sheep, making sure they had green grass to eat and cool water to drink.

Being a shepherd might sound like a quiet job, but it was often very dangerous! When a hungry lion or a growling bear tried to steal a lamb from the flock, David didn't run away. He trusted in God to give him strength. Using his simple shepherd's sling, he would protect his sheep with incredible bravery. Even in the lonely fields, David was never really alone. He would play his harp and sing beautiful songs, which we now call Psalms, to praise the Lord.

One morning, David's father asked him to take some roasted grain and bread to his brothers at the battle camp. When David arrived, he saw something that made him stop in his tracks. A giant man named Goliath, nearly ten feet tall and covered in heavy bronze armor, stood on a hill. Goliath was a champion of the Philistine army, and his voice boomed like thunder across the valley. He was shouting mean things at David's people and making fun of their faith in God.

All the soldiers in King Saul's army were shaking with fear. They looked at Goliath's massive spear and thought he was far too big to ever defeat. But when David heard the giant's insults, he wasn't afraid. He knew that God was bigger than any giant! "Who is this man that he thinks he can defy the army of the living God?" David asked.

King Saul heard about David's courage and called for him. "You are just a boy," the King said, looking at David's small frame. "How can you fight this warrior?" David replied, "The Lord who rescued me from the paw of the lion and the paw of the bear will rescue me from the hand of this Philistine."

Saul tried to give David his own heavy armor and a giant sword, but David could barely walk in them! "I cannot wear these," David said. Instead, he went to a nearby stream and chose five smooth, round stones. Putting them in his pouch and taking his shepherd's sling in his hand, he walked out to meet the giant.

When Goliath saw David, he laughed. "Am I a dog that you come at me with sticks?" he mocked. But David looked him right in the eye and shouted, "You come against me with sword and spear and javelin, but I come against you in the name of the Lord Almighty!"

David took a stone from his bag, placed it in his sling, and swung it with all his might. The stone flew like an arrow, hitting Goliath right in the forehead. The giant fell face-first onto the ground! With one small stone and a heart full of trust, David had won the battle. That day, everyone learned that with God on your side, no challenge is too big to overcome.`;
    story.biblicalMeaning = "This story from 1 Samuel 17 is more than just a battle between a boy and a giant. It shows us that God does not look at the things people look at. While others saw a small shepherd boy, God saw a future king with a heart of faith. David's victory wasn't because he was strong or had the best weapons, but because he knew that the battle belonged to the Lord. It teaches us that God uses the humble and the small to accomplish His great plans.";
    story.lifeLesson = "In our lives today, we all face 'giants.' A giant might be a difficult test at school, a fear of the dark, or someone being a bully. David teaches us that we don't have to be the biggest or strongest person in the room to reach our goals. When we feel small, we can remember that God is with us. True courage isn't about having no fear; it's about trusting God even when we are afraid.";
    story.discussionQuestions = [
      "Why wasn't David afraid of the giant Goliath?",
      "Can you think of a 'giant' or a scary problem in your life that you can ask God to help with?",
      "David was small but brave. What does that tell us about where true strength comes from?",
      "How did David's experience protecting his sheep help him against Goliath?"
    ];
  }

  // Story 2: Noah's Special Boat
  if (story.slug === 'noahs-special-boat') {
    story.fullStory = `Long, long ago, when the world was still very young, there lived a man named Noah. Noah was different from almost everyone else around him. While many people had forgotten to be kind and helpful, Noah loved God with all his heart. He walked with God every single day, listening for His voice and doing what was right.

One afternoon, a very special thing happened. God spoke to Noah and told him a secret. "Noah," God said, "The world has become full of unkindness. A very big rain is coming, a flood that will cover the earth. I want you to build a massive boat, called an Ark, to keep your family and the animals safe."

Now, building an Ark was no small task! God gave Noah exact instructions. It had to be three stories high, longer than a football field, and made of strong gopher wood. There wasn't a raindrop in sight, and Noah lived in a very dry land, but he didn't argue. He and his sons began to saw wood and hammer nails, day after day. People came by and laughed at them. "Why are you building a boat in the desert, Noah?" they teased. But Noah just smiled and kept working. He chose to obey God rather than listen to the crowd.

As the years passed, the Ark grew taller and wider. Finally, it was finished! Then, a miracle began to happen. From the deep forests and the high mountains, animals began to march toward the Ark. Imagine the sight! Two by two they came: tall giraffes, heavy elephants, slow turtles, and even tiny ants. Lions walked beside lambs, and birds of every color soared into their new home. Once everyone was safe inside, God himself shut the giant door.

Suddenly, the sky turned dark and it began to rain harder than anyone had ever seen. For forty days and forty nights, water poured from the clouds and bubbled up from the ground. The Ark lifted off the earth and floated safely on the rising water. For months, Noah and his family cared for the animals as they waited for the land to dry.

Finally, Noah sent out a dove. When it returned with a green olive leaf, Noah knew the trees were growing again. In the sky, God placed a magnificent rainbow—red, orange, yellow, green, blue, and purple. God made a beautiful promise: "Never again will a flood cover the whole earth. Every time you see a rainbow, remember My promise." Noah's obedience saved his family, and every rainbow we see is a reminder that God always keeps His word.`;
    story.biblicalMeaning = "The story of Noah (Genesis 6-9) is about justice and mercy. While the world had turned away from God, Noah chose to be 'righteous' by listening and obeying. The Ark represents God's protection for His people, and the rainbow is the first 'covenant' or promise God made with humans, showing His faithfulness to all generations.";
    story.lifeLesson = "Noah teaches us that it's important to do the right thing, even if everyone else is doing the wrong thing and laughing at us. Obedience means listening to God's instructions even when they seem strange or difficult. When we follow God's path, He keeps us safe. Just like the rainbow in the sky, we can trust that God's promises are always true.";
    story.discussionQuestions = [
      "Why did Noah build a boat even when it wasn't raining?",
      "If you were on the Ark, which animal would you have liked to care for the most?",
      "What does a rainbow remind us about God's promises?",
      "How can we be like Noah and choose to do the right thing when others are making fun of us?"
    ];
  }

  // Story 3: The Good Samaritan (The Kind Neighbor)
  if (story.slug === 'the-kind-neighbor') {
    story.fullStory = `One day, a man was walking down a very long, dusty road that went from Jerusalem down to Jericho. The road was full of big rocks and steep hills where robbers used to hide. As the man was walking, suddenly, some mean men jumped out and attacked him! They took his money, his clothes, and left him hurt on the side of the road.

The poor man lay in the dust, hoping and praying that someone would help him. After a little while, he heard footsteps. A Priest was walking down the road. Priests were very important people who worked in God's temple. Surely he would help! But when the Priest saw the hurt man, he crossed to the other side of the road and walked right past him. He was too busy to stop.

Then, another man called a Levite came by. Levites also knew a lot about God's laws. The hurt man looked up, but the Levite did the same thing. He looked at the man, walked away, and hurried on his way. He didn't want to get involved.

Finally, a third man came riding on a donkey. This man was a Samaritan. In those days, Samaritans and the people from Jerusalem usually didn't get along. They didn't talk and weren't friends. But when the Samaritan saw the hurt man, he didn't see an enemy—he only saw someone who needed love.

The Samaritan stopped his donkey immediately. He knelt in the dust and cleaned the man's wounds with oil and wine. He carefully bandaged them and lifted the man onto his own donkey. He walked beside him all the way to a nearby inn. The Samaritan stayed with the man all night, making sure he was safe.

The next morning, the Samaritan gave two silver coins to the innkeeper. "Take care of him," he said. "If you need more money, I will pay you when I come back."

Jesus told this story to teach us that our "neighbor" is anyone who needs our help, no matter who they are or where they come from. The Samaritan was the true neighbor because he showed mercy and kindness. Jesus wants us to go and do the same, showing love to everyone we meet.`;
    story.biblicalMeaning = "In Luke 10, Jesus told this parable to challenge the idea of 'neighborly love.' The Priest and Levite represent religious people who follow rules but forget to have compassion. By making the Samaritan—someone his audience would have disliked—the hero, Jesus was teaching that God's love has no borders. It emphasizes that mercy is more important than status.";
    story.lifeLesson = "Compassion means seeing someone who is hurting and choosing to help them, even if it's inconvenient or if that person is different from you. You can be a 'Kind Neighbor' by sharing your snack with someone who has none, helping a friend on the playground, or speaking up when someone is being left out. Kindness is how we show God's love to the world.";
    story.discussionQuestions = [
      "Why do you think the first two men didn't stop to help?",
      "Who was the hero of the story, and why was that surprising?",
      "Can you think of someone at school or in your neighborhood who could use a 'Kind Neighbor'?",
      "How does it feel when someone shows you kindness when you are having a hard day?"
    ];
  }

  // Story 4: The Feeding of the Five Thousand (The Lunch That Grew)
  if (story.slug === 'the-lunch-that-grew') {
    story.fullStory = `On a very sunny day in Galilee, thousands of people had gathered on a beautiful green hillside. They had traveled from many miles away to see Jesus. They wanted to hear Him speak about God's love and watch Him heal the sick. There were moms, dads, and lots of children just like you!

The hours went by, and the sun began to sink lower in the sky. Everyone was having a wonderful time, but there was one big problem: everyone was getting very, very hungry. They were far away from any town, and no one had brought a picnic basket.

Jesus' disciples looked at the huge crowd and started to worry. "Jesus," they said, "We should send the people home so they can buy food. We have nothing to give them!" But Jesus looked at His friends and said, "You give them something to eat." The disciples were confused. They only had a few coins!

Just then, a young boy stepped forward. He reached into his small bag and pulled out his lunch. It wasn't much—just five small loaves of barley bread and two little fish. He could have easily kept it all for himself. But this boy was different. He walked up to the disciple named Andrew and offered his lunch to Jesus.

Jesus took the boy's small gift. He held the bread and fish up toward heaven and thanked God for the food. Then, a miracle happened! As the disciples handed out pieces of bread and fish, the baskets never ran out. Every time they reached in, there was more! They handed out pieces to over five thousand people.

The people ate until they were full and happy. When everyone was finished, Jesus told the disciples to gather the leftovers so nothing would be wasted. Guess what? They filled twelve whole baskets with leftovers! From one little boy's small lunch, God had fed a massive crowd. The boy must have been so surprised to see how Jesus turned his small gift into a giant feast. It reminds us that when we give what we have to God, He can do amazing miracles with it.`;
    story.biblicalMeaning = "This miracle (Matthew 14, Mark 6, Luke 9, John 6) shows that Jesus is the 'Bread of Life' who provides for all our needs. It highlights that God values small offerings and can multiply them beyond our imagination. The twelve baskets symbolize that God's provision for the twelve tribes of Israel (and for us!) is always abundance.";
    story.lifeLesson = "Sometimes we look at what we have—maybe a small toy, a little bit of money, or just a little bit of time—and think, 'I don't have enough to help anyone.' But the boy with the loaves and fish shows us that God doesn't need 'a lot'; He just needs a heart that is willing to share. When you give what you have to Jesus, He can use it to help a lot of people.";
    story.discussionQuestions = [
      "What was in the little boy's lunch?",
      "How many baskets of food were left over after everyone was full?",
      "If you were that boy, how would you have felt seeing your lunch feed thousands of people?",
      "What is something small you have that you could 'give to Jesus' to help others?"
    ];
  }

  // Story 5: The Lost Sheep Adventure
  if (story.slug === 'the-lost-sheep-adventure') {
    story.fullStory = `Imagine a beautiful green valley where the sun is always warm. In this valley lived a kind Shepherd who had one hundred woolly sheep. He knew each of them by name. He knew who was fast, who was sleepy, and who was the most curious. The Shepherd loved his sheep very much and kept them safe every day.

Every evening, as the sun began to hide behind the mountains, the Shepherd would lead his sheep back to the safe fold. "One, two, three..." he would count them as they walked through the gate. But one night, he reached "ninety-seven, ninety-eight, ninety-nine..." and then he stopped. Ninety-nine? One sheep was missing!

The Shepherd could have said, "Well, ninety-nine is still a lot. I'll just stay here and rest." But that's not what a good shepherd does. To him, that one lost sheep was just as important as all the others.

The Shepherd left the ninety-nine sheep in a safe place and went out into the dark, chilly night. He walked over rocky hills and through deep, scary valleys. He called out, "Here, little sheep! Where are you?" He listened carefully for a tiny "Baaa!"

The little sheep had wandered away because it saw a pretty flower and forgot to stay close to the flock. Now, it was stuck in some sharp bushes, feeling very scared and alone. Suddenly, it heard a familiar voice. It was the Shepherd! When he found the sheep, he didn't yell or act angry. Instead, he gently untangled the sheep from the thorns and lifted it up onto his strong shoulders.

The Shepherd carried the tired sheep all the way back home. He was so happy that he called his friends together and said, "Rejoice with me, for I have found my lost sheep!"

Jesus told this story to show us that He is our Good Shepherd. Even if we wander away or make mistakes, He never stops looking for us. He loves every single one of us personally, and there is a big party in heaven whenever someone comes back to Him. You are never too lost for the Shepherd to find you!`;
    story.biblicalMeaning = "In Luke 15, Jesus used this parable to describe God's persistent love for individuals. It illustrates that God is not content with having 'most' of us; He pursues every single 'lost' person with compassion. It reveals that the character of God is one of a seeker, who rejoices deeply over one life being restored.";
    story.lifeLesson = "Have you ever felt lost, lonely, or like you made a mistake that made you want to hide? This story tells us that Jesus knows your name and He is always looking for you with love. You are very valuable to God. Just like the shepherd carried the sheep home, Jesus wants to help you when you are tired or scared. You are never alone.";
    story.discussionQuestions = [
      "Why did the Shepherd leave ninety-nine sheep to find just one?",
      "How did the lost sheep feel when it saw the Shepherd coming?",
      "How does it feel to know that Jesus knows your name exactly like the Shepherd?",
      "What did the Shepherd do when he finally got home?"
    ];
  }

  // Story 6: Joseph's Colorful Coat
  if (story.slug === 'josephs-colorful-coat') {
    story.fullStory = `In the land of Canaan, there lived a man named Jacob who had twelve sons. Jacob loved all his children, but he had a very special place in his heart for his son Joseph. To show Joseph how much he loved him, Jacob gave him a magnificent gift: a coat of many colors. It was bright red, deep blue, sunny yellow, and royal purple. Joseph loved his coat, but his ten older brothers were very jealous.

It didn't help that Joseph had special dreams from God. In one dream, he saw his brothers' bundles of grain bowing down to his bundle. In another, the sun, moon, and stars were bowing to him! His brothers became very angry. One day, while they were far away in the fields, they did a very mean thing. They sold Joseph to some travelers going to Egypt and told their father that a wild animal had attacked him.

In Egypt, life was very hard for Joseph. He was a servant, and later, he was even put in prison for something he didn't do. But the Bible says, "The Lord was with Joseph." Even in the dark prison, Joseph was kind and trusted God. Eventually, the King of Egypt—the Pharaoh—had some confusing dreams about cows and grain. Only Joseph could explain that God was warning of a time when there would be no food.

Pharaoh was so impressed that he made Joseph the second most powerful leader in all of Egypt! Joseph was in charge of storing up food so the people wouldn't go hungry. Many years later, a famine came to the land where Joseph's brothers lived. They had no food, so they traveled to Egypt to buy some. When they stood before the great leader, they didn't realize it was their brother!

Joseph could have been very angry and punished them for their meanness. But instead, Joseph chose to forgive them with all his heart. He wept with joy and told them, "Do not be afraid. You intended to harm me, but God intended it for good." Joseph brought his whole family to live with him in Egypt and kept them safe. Joseph's story shows us that even when bad things happen, God is working out a big, beautiful plan.`;
    story.biblicalMeaning = "The life of Joseph (Genesis 37-50) is a story of 'Divine Providence.' It teaches that God is in control even in the darkest moments. Joseph is often seen as a 'type' of Jesus: rejected by his brothers, sold for silver, and eventually becoming the savior of his people. His life proves that God can turn any evil into a greater good.";
    story.lifeLesson = "Have you ever been treated unfairly or had something 'bad' happen that you didn't understand? Joseph teaches us that God never leaves us, whether we are in a 'pit' or a 'palace.' We can choose to be kind and forgive others even when they were mean to us. When we trust God, He can turn our hard times into something that helps many people.";
    story.discussionQuestions = [
      "Why were Joseph's brothers so jealous of him?",
      "How did Joseph help the King of Egypt?",
      "Was it hard for Joseph to forgive his brothers? Why did he do it?",
      "What does 'God intended it for good' mean in your own life?"
    ];
  }

  // Story 7: Marching Around Jericho
  if (story.slug === 'marching-around-jericho') {
    story.fullStory = `After many years of traveling through the desert, God's people reached the beautiful land God had promised them. But there was one big obstacle in their way: a giant city called Jericho. Jericho had massive, thick stone walls. The gates were shut tight, and no one could get in or out. How would the Israelites ever get inside?

God spoke to their leader, Joshua, and gave him a very unusual plan. God didn't tell them to build a giant ladder or use big hammers. Instead, He said, "March around the city once a day for six days with the priests blowing trumpets. On the seventh day, march around seven times, and then have everyone shout as loud as they can!"

So, the Israelites began to march. Step, step, step. They didn't say a word. All that could be heard was the sound of the ram's horn trumpets blowing. The people on top of the walls must have laughed. "What are they doing?" they probably wondered. But the Israelites kept marching. They trusted God's plan even when it seemed strange.

On the seventh day, the sun rose, and the army began to march. One, two, three... all the way to seven times! On the last lap, the priests gave a long blast on their trumpets. Joshua shouted, "Shout! For the Lord has given you the city!"

Thousands of people let out a massive shout: "AAAAAAHHH!" Suddenly, the ground began to shake. Rumble, rumble, crack! The giant stone walls of Jericho didn't just break—they fell down flat! The people entered the city and won the victory. With no weapons but their trumpets and their voices, and a whole lot of faith, God had won the battle. It reminded everyone that God's way is always the best way.`;
    story.biblicalMeaning = "The fall of Jericho (Joshua 6) is a testament to the power of liturgical praise and absolute obedience. In military terms, the strategy was illogical, but spiritually, it was a display of God's supremacy. The number seven is used throughout the story, symbolizing completeness and God's perfect timing.";
    story.lifeLesson = "Sometimes we face 'walls' in our lives—problems that look way too big for us to solve. It might be a hard subject at school or an argument with a friend. Jericho teaches us that we don't have to be the ones to break the walls; we just have to be the ones to follow God. Trusting God's timing is important. Even when you don't see results on 'Day One,' keep trusting and keep doing what is right.";
    story.discussionQuestions = [
      "Why do you think God told the people to be quiet while they marched?",
      "How many times did they march on the final day?",
      "What is a 'big wall' (hard problem) in your life that you need God's help with?",
      "How did the Israelites feel when the walls finally fell down?"
    ];
  }

  // Story 8: Daniel and the Sleepy Lions
  if (story.slug === 'daniel-and-the-sleepy-lions') {
    story.fullStory = `In the kingdom of Babylon, there lived a man named Daniel. Daniel was very wise and honest, and the King liked him so much that he wanted to put him in charge of the whole land! But some of the other leaders were jealous. They tried to find something Daniel was doing wrong, but Daniel always did his best and loved God.

They eventually tricked the King into signing a new law: for thirty days, everyone must only pray to the King. If anyone prayed to any other god, they would be thrown into a den of hungry lions. When Daniel heard the law, he didn't stop praying. He went home, opened his windows, and prayed to God three times a day, just as he had always done. He knew that loving God was more important than anything else.

The jealous leaders told the King, and the King was very sad. He had to follow his own law. As the sun set, Daniel was thrown into the dark den full of roaring lions. The King said, "May your God rescue you!" A stone was rolled over the entrance.

The King couldn't sleep all night. Early the next morning, he ran to the den and called out, "Daniel! Was your God able to save you?" To his amazement, Daniel answered, "O King, live forever! My God sent His angel, and he shut the mouths of the lions. They have not hurt me at all."

The King was overjoyed! He had Daniel pulled out of the den, and there wasn't a single scratch on him. Because Daniel trusted God when it was hard, God protected him. The King then made a new law that everyone should respect the God of Daniel, the living God who rescues and saves. Daniel's courage reminds us that we never have to be afraid when we put God first.`;
    story.biblicalMeaning = "Daniel in the Lions' Den (Daniel 6) highlights the contrast between the laws of men and the unchanging laws of God. It shows that Daniel's strength came from his consistent prayer life. The 'closed mouths' of the lions are a miraculous sign that God reigns over even the fiercest forces in the world.";
    story.lifeLesson = "Daniel teaches us that our relationship with God is the most important thing we have. Sometimes people might make fun of us for praying or going to church. Sometimes it might feel like we are 'in the lions' den' when we are facing something scary. But just like Daniel, we can choose to be brave. When we are faithful to God, He gives us peace and protection.";
    story.discussionQuestions = [
      "How many times a day did Daniel pray to God?",
      "Were the lions hungry? Why didn't they eat Daniel?",
      "Have you ever been scared for doing the right thing? What happened?",
      "What can we do to show that we put God first, just like Daniel did?"
    ];
  }

  // Story 9: The Wise Ants (Wise Little Workers)
  if (story.slug === 'wise-ants') {
    story.fullStory = `If you look very closely at the ground in your garden, you might see a tiny, busy world. It is the world of the ant. Ants are so small we can accidentally step on them, but did you know the Bible says we can learn a lot from them? The wisest man ever, King Solomon, said, "Go to the ant... consider its ways and be wise!"

Imagine a sunny summer afternoon. While other bugs might be napping or just playing games, the ants are working very hard. They march in long lines, each carrying a tiny seed or a crumb that is bigger than they are! They know a secret: winter is coming. They know that soon it will be too cold and frosty to find food.

The ants work together like a big team. If a piece of food is too heavy for one ant, they don't give up. They go and find their friends! Together, they push and pull the heavy crumb all the way home to their underground storehouse. They are patient, careful, and they never give up.

God made even the tiniest ant with a brain that knows how to prepare for the future. By working hard when they have the chance, they are safe and full when the hard times come. They don't need a boss to tell them to start; they just see the work and do it!

We can be like the wise ants too. Being wise means thinking ahead. It means doing our chores and homework even when we'd rather be playing, because we know it helps us later. It means being a good team player. Most importantly, it means gathering God's Word in our hearts now, so we have strength stored up for whenever we feel sad or scared.`;
    story.biblicalMeaning = "Inspired by Proverbs 6:6-8 and Proverbs 30:24-25, this lesson is about 'Stewardship' and 'Diligence.' God values hard work and preparation. By highlighting a tiny insect, the Bible teaches that wisdom isn't about being big or strong, but about using the time and resources God has given us wisely.";
    story.lifeLesson = "Don't wait for someone to tell you to be kind or to help at home—be like the ant and just start doing it! Diligence means doing your best work even when no one is watching. When we are wise little workers, we find that life is much easier because we aren't rushing at the last minute. Every small step you take today helps you become the person God wants you to be.";
    story.discussionQuestions = [
      "Why do the ants work during the summer when they could be playing?",
      "What happens if one ant tries to carry something too heavy?",
      "How can we 'gather' God's Word in our hearts like the ants gather seeds?",
      "What is one chore you can do today without being asked?"
    ];
  }

  // Story 10: Queen Esther's Big Choice
  if (story.slug === 'queen-esther-big-choice') {
    story.fullStory = `In the massive, glittering palace of Persia, there lived a young woman named Esther. Esther was an orphan raised by her kind cousin Mordecai. Esther was beautiful, but she was also very humble and brave. One day, the King chose Esther to be his new Queen! He placed a golden crown on her head, but Esther kept a secret: she was one of God's people—a Jew.

In the palace lived a proud man named Haman who wanted everyone to bow to him. But Mordecai refused because he only bowed to God. This made Haman so angry that he tricked the King into signing a terrible law to hurt all of Esther's people. Mordecai sent a message to Esther: "You must go to the King and ask for help!"

Esther was scared. In those days, no one could go to the King unless invited. If someone went without being called, they could be in big trouble unless the King held out his golden scepter. Mordecai told her, "Who knows but that you have come to your position for such a time as this?" Esther realized God had made her Queen for this very reason.

She asked her people to pray with her for three days. Then, she put on her royal robes and walked into the King's court. Her heart was beating fast, but her faith was strong. The King looked up, smiled, and held out his golden scepter! Esther was safe. She wisely invited the King to a special dinner, where she bravely told him about Haman's mean plan.

The King was furious at Haman and saved Esther's people. Because of Esther's bravery and her trust in God, all her people were kept safe. Esther showed the world that being a Queen is about using your voice and courage to help others. You don't need a crown to be reach out and do something brave for God!`;
    story.biblicalMeaning = "The Book of Esther shows God's 'Divine Providence.' Even though God's name isn't mentioned, His fingerprints are everywhere. It teaches us that God places people in specific positions of influence 'for such a time as this.' It's a story of fasting, prayer, and how one person's courage can change history.";
    story.lifeLesson = "God has put you where you are—in your family, your school, and your town—for a reason. You might not have a literal crown, but you can be brave like Esther and speak up when something is wrong. When faced with a big choice, we can pray for wisdom. One person who chooses to do the right thing can make a difference for everyone!";
    story.discussionQuestions = [
      "Why was Esther afraid to talk to the King?",
      "What does 'for such a time as this' mean?",
      "What did Esther do before she went to see the King?",
      "How can you use your voice to help someone else this week?"
    ];
  }

  return story;
});

fs.writeFileSync(storiesPath, JSON.stringify(updatedStories, null, 2));
console.log('Successfully updated all 10 stories!');
