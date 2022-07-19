export interface Color{
    id: number;
    name: string;
    year: number;
    color: string;
    pantone_value: string;
}

export interface ColorList{
    data: Color[];
}