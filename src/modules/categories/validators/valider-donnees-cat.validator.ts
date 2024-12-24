// valider-donnees-production.validator.ts
import { IsNotEmpty } from 'class-validator';

export class ValiderDonneesCategCommandValidator {
    @IsNotEmpty()
    id: string;
}
