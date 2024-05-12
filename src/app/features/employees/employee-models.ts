import { LocationDto } from "../users/users-models";

export interface Employee extends LocationDto {
    id?: number;
    firstName: string;
    lastName: string;
    filePath?: File;
    salaryNet?: number;
    salaryBrut?: number;
    taxes?: number;
}

