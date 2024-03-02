const Personality = (personalitySymbol)=>{
    let aboutPersonality = "";

    switch (personalitySymbol) {
        case "EDCP":
            aboutPersonality = "They are action-oriented, straightforward in their approach, tackle problems head-on, and focus on the practicalities of what works.";
            break;
        case "EDCR":
            aboutPersonality = "Known for their vibrant energy and directness, they are not afraid of conflict and deeply value romantic and emotional connections.";
            break;
        case "EDAP":
            aboutPersonality = "They communicate directly and prefer to keep things moving smoothly, avoiding conflicts when possible, with a strong emphasis on practical outcomes.";
            break;
        case "EDAR":
            aboutPersonality = " Enthusiastic and straightforward, they prefer to maintain harmony in their relationships while cherishing romantic ideals.";
            break;
        case "EICP":
            aboutPersonality = "They bring a creative and energetic approach to confronting challenges, with a preference for indirect communication and a focus on practical solutions.";
            break;
        case "EICR":
            aboutPersonality = "Vibrant and creative, they're willing to engage in conflicts for their ideals and dreams, often expressing themselves in nuanced ways.";
            break;
        case "EIAP":
            aboutPersonality = "They are full of energy, prefer to avoid conflict through creative and indirect communication, and value practicality and efficiency in planning.";
            break;
        case "EIAR":
            aboutPersonality = "With a lively spirit, they communicate in subtle ways, steer clear of conflict, and are deeply moved by romanticism and emotion.";
            break;
        case "RDCP":
            aboutPersonality = "They are introspective, value directness, confront challenges boldly, and have a pragmatic view of relationships.";
            break;
        case "RDCR":
            aboutPersonality = "Deep thinkers who are straightforward, not shy from confrontations, and deeply value romantic connections.";
            break;
        case "RDAP":
            aboutPersonality = "They prefer clear and direct communication, tend to avoid conflicts, and prioritize practical aspects of life and relationships.";
            break;
        case "RDAR":
            aboutPersonality = "Though they communicate directly and prefer to avoid conflict, their focus is on the depth and romantic aspects of relationships.";
            break;
        case "RICP":
            aboutPersonality = " Known for their reflective nature and strategic approach, they engage in conflicts with a nuanced communication style and focus on practical results.";
            break;
        case "RICR":
            aboutPersonality = "They combine introspection with a preference for indirect communication, are willing to face conflicts for deeper emotional or romantic causes.";
            break;
        case "RIAP":
            aboutPersonality = "With a preference for reflection and indirect communication, they avoid conflicts and focus on innovative and practical solutions.";
            break;
        case "RIAR":
            aboutPersonality = "Quiet and introspective, they communicate subtly, avoid confrontation, and dream of deep, romantic connections.";
            break;
        default:
            aboutPersonality = "Unknown";
            break;
    }

    console.log(aboutPersonality, personalitySymbol);
    return aboutPersonality; // Return an object with the personality type and symbol
};

export default Personality; // Export the Personality function