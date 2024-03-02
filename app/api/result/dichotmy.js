const dichotomy = (categoryScore)=>{
    
    const value = [];
    const dichotmies = [["Energetic","Reflective"],["Direct","Indirect"],["Confrontational","Avoidant"],["Practical","Romantic"],]
    const dichotmiesAbout= [["Energetic individuals thrive on expressing their emotions vividly and with enthusiasm. They are often seen as vibrant and infectious, bringing a sense of dynamism to their interactions. Their emotional expressiveness enables them to connect easily with others, making their feelings known in an unambiguous way. This approach can foster an environment of openness and immediacy in relationships, where sentiments are shared freely and with vigor",
    " Reflective people tend to process their emotions internally, preferring a more measured and thoughtful expression. They are contemplative, often seeking deeper meaning and understanding in their emotional experiences. This introspective nature leads to a rich inner life, where emotions are carefully examined before being shared. Reflective individuals value depth and sincerity in emotional exchanges, often creating a more nuanced and profound connection with others."],
    ["Direct communicators value clarity and straightforwardness in their interactions. They express their thoughts and feelings openly, ensuring that their message is understood without ambiguity. This approach promotes honesty and efficiency in communication, reducing the likelihood of misunderstandings. Direct communicators are often appreciated for their transparency and ability to address issues promptly.",
    "Indirect communicators prefer a more subtle approach, using nuance and context to convey their messages. They may rely on body language, tone of voice, and implication rather than explicit statements. This method can be particularly effective in cultures or situations where directness is less valued or might lead to confrontation. Indirect communication requires a high level of sensitivity and interpretive skill, both in expressing and understanding messages."],
    [" Confrontational individuals do not shy away from addressing conflicts directly. They believe in tackling disagreements head-on to find a resolution. This approach is characterized by a willingness to engage in difficult conversations and a belief that through confrontation, clarity and progress can be achieved. Confrontational people are often assertive in expressing their needs and seeking solutions, valuing truth and resolution over temporary peace.",
    "Avoidant individuals prefer to steer clear of conflicts, valuing harmony and stability in their relationships. They may choose to overlook disagreements or seek compromise to maintain peace. This approach can prevent escalation and preserve relationships, but it may also lead to unresolved issues. Avoidant people prioritize emotional comfort and the overall well-being of the relationship over the need to address every conflict."],
    ["Practical individuals prioritize the tangible aspects of relationships, such as shared goals, stability, and mutual responsibilities. They value a solid foundation built on reliability and pragmatism, believing that these elements are essential for a lasting relationship. Practicality in relationships often leads to a focus on planning for the future, managing resources efficiently, and working together to achieve common objectives.",
    "Romantic individuals place the emotional and passionate aspects of relationships at the forefront. They cherish deep connections, spontaneous expressions of love, and the ongoing pursuit of intimacy. Romantics believe in the importance of keeping the flame alive through gestures, affection, and emotional support. Their approach to relationships is characterized by an emphasis on love, beauty, and the shared experience of profound emotional bonds."]]
    const highLow = [];
    const about = [];
    categoryScore.forEach((data,index) => {
        const position = ["",""];
        if(data<50){
            value.push(100-data);
            about.push(dichotmiesAbout[index][0]);
            position[0]= dichotmies[index][0];
            position[1]= dichotmies[index][1]
        }
        else{
            value.push(data)
            about.push(dichotmiesAbout[index][1]);
            position[0]= dichotmies[index][1];
            position[1]= dichotmies[index][0]
        }
        highLow.push(position);

    });
    console.log(value,"High Value");
    console.log(highLow)
    return [value,highLow,about];
}

export default dichotomy;