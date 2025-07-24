export enum FactType {
    Math = 'math',
    Trivia = 'trivia',
    Date = 'date',
    Year = 'year'
}

export interface Fact {
    found: boolean;
    number: number;
    text: string;
    type: FactType;
}