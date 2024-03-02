const Personality = (score)=>{
    let personalityType = "";
    let personalitySymbol = "";

    score[0]<50?personalitySymbol +="E":personalitySymbol+="R";
    score[1]<50?personalitySymbol +="D":personalitySymbol+="I";
    score[2]<50?personalitySymbol +="C":personalitySymbol+="A";
    score[3]<50?personalitySymbol +="P":personalitySymbol+="R";

    

    switch (personalitySymbol) {
        case "EDCP":
            personalityType = "Dynamic Doers";
            break;
        case "EDCR":
            personalityType = "Passionate Advocates";
            break;
        case "EDAP":
            personalityType = "Efficient Motivators";
            break;
        case "EDAR":
            personalityType = "Charismatic Charmers";
            break;
        case "EICP":
            personalityType = "Innovative Problem-Solvers";
            break;
        case "EICR":
            personalityType = "Expressive Idealists";
            break;
        case "EIAP":
            personalityType = "Creative Planners";
            break;
        case "EIAR":
            personalityType = "Dreamy Enthusiasts";
            break;
        case "RDCP":
            personalityType = "Determined Realists";
            break;
        case "RDCR":
            personalityType = "Intense Connectors";
            break;
        case "RDAP":
            personalityType = "Pragmatic Observers";
            break;
        case "RDAR":
            personalityType = "Sincere Romantics";
            break;
        case "RICP":
            personalityType = "Strategic Thinkers";
            break;
        case "RICR":
            personalityType = "Deep Feelers";
            break;
        case "RIAP":
            personalityType = "Thoughtful Innovators";
            break;
        case "RIAR":
            personalityType = "Gentle Dreamers";
            break;
        default:
            personalityType = "Unknown";
            break;
    }

    console.log(personalityType, personalitySymbol);
    return {personalityType, personalitySymbol}; // Return an object with the personality type and symbol
};

export default Personality; // Export the Personality function