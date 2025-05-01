import React from "react";
import Post from "./Post";

export default function MiddlePane()
{
    const desc1 = 
        "\"The July Revolution of Bangladesh: A New Dawn of Democratic Awakening\"\n\n" +
        "Throughout history, revolutions have served as the turning points of nations—moments when ordinary people rise against oppression, demanding justice, equality, and liberty. \n" +
        "The July Revolution of Bangladesh, though not widely chronicled in global narratives, marked a bold chapter in the nation's socio-political journey. It was a time when voices silenced by years of systemic neglect erupted into a unified cry for transformation.\n\n" +
        "Background and Causes:\n" +
        "In the early 21st century, Bangladesh witnessed rising discontent fueled by corruption, youth unemployment, and a faltering education system. \n" +
        "July's flame was lit when widespread frustration found a matchstick in a national scandal involving public sector recruitment and political favoritism. \n" +
        "Students, the heartbeat of the nation, took to the streets demanding transparency, justice, and a voice in shaping their future.\n\n" +
        "The Movement Unfolds:\n" +
        "From the buzzing roads of Dhaka to the quiet campuses of Rajshahi, a wave of protest swept the nation. \n" +
        "Social media became the new battleground—Facebook posts, Twitter hashtags, and viral videos carried the revolution's soul across the globe. \n" +
        "This uprising wasn't violent. It was peaceful, passionate, and poetic. Marches, debates, sit-ins, and candlelight vigils defined its spirit. \n\n" +
        "Government Response and Turning Point:\n" +
        "Initially, the administration responded with silence, then suppression. But neither water cannons nor curfews could extinguish the people's fire. \n" +
        "With international attention building, the government relented. Key officials resigned, and policy discussions began. \n" +
        "A national dialogue was initiated, for the first time including students and civil society at the decision-making table.\n\n" +
        "Legacy and Impact:\n" +
        "The July Revolution did not just alter laws—it reshaped consciousness. \n" +
        "It redefined patriotism, inspired new leaders, and taught an entire generation that peaceful resistance has power. \n" +
        "Universities became hubs of activism, journalism found new courage, and governance slowly shifted toward accountability.\n\n" +
        "Conclusion:\n" +
        "The July Revolution of Bangladesh is a story of courage, clarity, and collective will. \n" +
        "It reminds us that revolutions aren't always violent storms—they can also be powerful tides that rise with hope. \n" +
        "Even today, its echoes remain in every civic act, every youth-led movement, and every Bangladeshi heart that dares to dream of a better tomorrow.\n";
    const desc2=
    "নিঃসন্দেহে ২০০৮-০৯ মৌসুম ছিল এফসি বার্সেলোনার ইতিহাসের সবচেয়ে গৌরবময় এবং স্মরণীয় সময়। এই মৌসুমে ক্লাবটি “সেক্সটপল” বা ছয়টি ট্রফি জয়ের অসাধারণ কীর্তি গড়েছিল, যা ফুটবল ইতিহাসে এক বিরল অর্জন। তৎকালীন নতুন কোচ পেপ গার্দিওলার অধীনে বার্সা জিতেছিল লা লিগা, কোপা দেল রে, উয়েফা চ্যাম্পিয়ন্স লিগ, স্প্যানিশ সুপার কাপ, উয়েফা সুপার কাপ এবং ফিফা ক্লাব বিশ্বকাপ—এই ছয়টি বড় শিরোপা। লিওনেল মেসি, আন্দ্রেস ইনিয়েস্তা, জাভি হার্নান্দেজ এবং কার্লেস পুয়োলদের দুর্দান্ত পারফরম্যান্সে বার্সেলোনা মাঠে শিল্পের মতো ফুটবল খেলেছিল, যার নাম পরে 'টিকি-টাকা' রূপে বিশ্বজুড়ে পরিচিত হয়। ২০০৯ সালের এই হেক্সা জয়ের মৌসুম শুধু ট্রফির সংখ্যাতেই নয়, বরং ফুটবলের সৌন্দর্য, দলগত সমন্বয় এবং শ্রেষ্ঠত্বের একটি অনন্য নিদর্শন হিসেবে ইতিহাসে স্বর্ণাক্ষরে লেখা থাকবে।"
    const hashtags1=["#lorem","#ipsum","#dolor","#sit","#amet","#consectetur"];
    const hashtags2=["#barca","#football","#sports","#history","#legendary","#messi"];
    return(
        <div id="feed">
            <Post title="The July Revolution of Bangladesh: A New Dawn of Democratic Awakening" image="/resources/hasinaflees.webp" username="Nigga" date="hello" description={desc1} hashtags={hashtags1}/>
            <Post image="/resources/sextet.webp" title="বার্সা, একটি ইতিহাস" description={desc2} hashtags={hashtags2}/>
            
        </div>
    );
}