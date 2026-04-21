import PublicQuiz from "../PublicQuiz";

const questions = [
  {
    id: 1,
    question: "What was the name of Moses' brother?",
    options: ["Aaron", "Joshua", "Caleb", "Miriam"],
    answer: 0,
    explanation: "Exodus 4:14 - Then the Lord's anger burned against Moses and he said, 'What about your brother, Aaron the Levite? I know he can speak well.'"
  },
  {
    id: 2,
    question: "How many plagues did God send upon Egypt?",
    options: ["Seven", "Nine", "Ten", "Twelve"],
    answer: 2,
    explanation: "Exodus 7-12 - God sent ten plagues upon Egypt to convince Pharaoh to let the Israelites go."
  },
  {
    id: 3,
    question: "What was the first plague?",
    options: ["Frogs", "Blood", "Locusts", "Darkness"],
    answer: 1,
    explanation: "Exodus 7:17 - This is what the Lord says: By this you will know that I am the Lord: With the staff that is in my hands I will strike the water of the Nile, and it will be changed into blood."
  },
  {
    id: 4,
    question: "How many years did the Israelites wander in the wilderness?",
    options: ["30 years", "40 years", "50 years", "60 years"],
    answer: 1,
    explanation: "Numbers 14:33 - Your children will be shepherds here for forty years, suffering for your unfaithfulness, until the last of your bodies lies in the wilderness."
  },
  {
    id: 5,
    question: "What did God provide for the Israelites to eat in the wilderness?",
    options: ["Bread and meat", "Manna and quail", "Fish and bread", "Fruit and vegetables"],
    answer: 1,
    explanation: "Exodus 16:13-15 - That evening quail came and covered the camp, and in the morning there was a layer of dew around the camp. When the dew was gone, thin flakes like frost on the ground appeared on the desert floor."
  },
  {
    id: 6,
    question: "Where did God give Moses the Ten Commandments?",
    options: ["Mount Sinai", "Mount Horeb", "Mount Zion", "Mount Carmel"],
    answer: 0,
    explanation: "Exodus 19:20 - The Lord descended to the top of Mount Sinai and called Moses to the top of the mountain."
  },
  {
    id: 7,
    question: "What was the name of Moses' wife?",
    options: ["Miriam", "Zipporah", "Deborah", "Hannah"],
    answer: 1,
    explanation: "Exodus 2:21 - Moses agreed to stay with the man, who gave his daughter Zipporah to Moses in marriage."
  },
  {
    id: 8,
    question: "What did the Israelites build while Moses was on Mount Sinai?",
    options: ["A temple", "A golden calf", "An altar", "A tabernacle"],
    answer: 1,
    explanation: "Exodus 32:4 - He took what they handed him and made it into an idol cast in the shape of a calf, fashioning it with a tool."
  },
  {
    id: 9,
    question: "How many commandments did God give Moses?",
    options: ["Seven", "Ten", "Twelve", "Fifteen"],
    answer: 1,
    explanation: "Exodus 20:1-17 - God gave Moses the Ten Commandments on Mount Sinai."
  },
  {
    id: 10,
    question: "What was the name of the sea that the Israelites crossed?",
    options: ["Red Sea", "Dead Sea", "Mediterranean Sea", "Sea of Galilee"],
    answer: 0,
    explanation: "Exodus 14:21 - Then Moses stretched out his hand over the sea, and all that night the Lord drove the sea back with a strong east wind and turned it into dry land."
  }
];

export default function ExodusPublicQuiz({ canonicalPath }: { canonicalPath?: string }) {
  return (
    <PublicQuiz 
      title="Exodus Quiz - The Great Deliverance"
      questions={questions}
      bookName="Exodus"
      canonicalPath={canonicalPath}
    />
  );
}
