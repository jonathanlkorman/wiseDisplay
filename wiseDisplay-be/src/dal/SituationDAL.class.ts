import { INFLPlay, NFLPlayModel } from "../db/models/nflPlay";

interface IType {
    id: string | undefined;
    text: string | undefined;
    abbreviation: string | undefined;
}

export class SituationDAL {
    public static async saveNFLSituations(data: any) {
        data.events.forEach(async (event: any) => {
            const info = event.competitions[0];
            const type: IType = info?.situation?.lastPlay?.type;

            try {
                if (type && type?.id) {
                    const result = await this.addTypeIfNotExists({
                        id: type.id,
                        text: type.text ?? "",
                        abbreviation: type.abbreviation ?? ""
                    });
                            



                    if (result.added) {
                        console.log('New type added:', JSON.stringify(result.type));
                    } else {
                        console.log('Type already exists');
                    }
                }
            } catch (error) {
                console.error('Error:', error);
            }
        });
    }

    private static async addTypeIfNotExists(typeData: IType): Promise<{ added: boolean; type: any }> {
        try {

            let existingType = await NFLPlayModel.findById(typeData.id);

            if (existingType) {
                return {
                    added: false,
                    type: existingType
                };
            } else {
                const newPlay = new NFLPlayModel({
                    _id: typeData.id,
                    text: typeData.text,
                    abbreviation: typeData.abbreviation
                });

                const savedType = await newPlay.save();

                return {
                    added: true,
                    type: savedType
                };
            }

        } catch (error) {
            console.error('Error in addTypeIfNotExists:', error);
            throw error;
        }
    }

    public static async saveNFLPlay(typeData: { id: string; text: string; abbreviation: string }): Promise<INFLPlay> {
        const newType = new NFLPlayModel({
            _id: typeData.id,
            text: typeData.text,
            abbreviation: typeData.abbreviation
        });
        return await newType.save();
    }

    public static async getNFLPlayById(id: string): Promise<INFLPlay | null> {
        return await NFLPlayModel.findById(id);
    }

    public static async getAllNFLPlays(): Promise<INFLPlay[]> {
        return await NFLPlayModel.find();
    }

    public static async updateNFLPlay(id: string, updateData: Partial<INFLPlay>): Promise<INFLPlay | null> {
        return await NFLPlayModel.findByIdAndUpdate(id, updateData, { new: true });
    }

    public static async deleteNFLPlay(id: string): Promise<INFLPlay | null> {
        return await NFLPlayModel.findByIdAndDelete(id);
    }
}