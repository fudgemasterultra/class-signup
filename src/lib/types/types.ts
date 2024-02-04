export namespace Types{
    type User = {
        email : String;
    }

    export type Parent = {
        userID : string;
        fName : string;
        lName : string;
        phone: string;
        textAlerts: boolean;
    }
    type GradeLevel = "Pre-K/Nursery" | "Kindergarten" | "1st" | "2nd" 
    | "3rd" | "4th" | "5th" | "6th" | "7th" | "8th" | "9th" | "10th" 
    | "11th" | "12th" ;

    export type Child = {
        userID : string;
        fName: string;
        lName : string;
        birthData : Date;
        pronouns : string;
        grade : GradeLevel;
        bathroomBySelf : boolean;
        allergies: string;
        learningDisabled: string;
        calmChild: string;
        teachKnowDisable: boolean;
        extraInfo: string;
    }
}